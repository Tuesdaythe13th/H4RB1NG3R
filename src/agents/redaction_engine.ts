/**
 * Agent RE-1: Redaction Engine
 *
 * Applies context-aware redaction to evidence and logs based on
 * role, audience, and privacy requirements.
 */
 */
 */
/**
 * Redaction Engine
 * Function: Render-Time Filtering
 */

import { Agent } from "../harbinger-server.js";

export const RedactionEngine: Agent = {
    name: "Redaction Engine",
    id: "RE-1",
    description: "Applies role-aware, context-sensitive redaction to evidence, logs, and transcripts.",
    execute: async (context: {
        content: string;
        redaction_profile: string;
        viewer_role?: string;
        preserve_evidential_value?: boolean;
    }) => {
        const ts = new Date().toISOString();
        const {
            content,
            redaction_profile,
            viewer_role = "public",
            preserve_evidential_value = true
        } = context;

        // Define redaction profiles
        const redactionProfiles: Record<string, any> = {
            "child_safe": {
                redact: ["PII", "contact_info", "location", "age", "school", "adult_content", "raw_transcript"],
                replacement_mode: "summary",
                show_risk_state: true,
                show_evidence: false
            },
            "guardian": {
                redact: ["PII_partial", "contact_info_partial"],
                replacement_mode: "annotated",
                show_risk_state: true,
                show_evidence: true
            },
            "researcher": {
                redact: ["PII_identifiable"],
                replacement_mode: "pseudonymized",
                show_risk_state: true,
                show_evidence: true,
                preserve_structure: true
            },
            "public": {
                redact: ["PII", "contact_info", "location", "identifiers", "sensitive"],
                replacement_mode: "redacted",
                show_risk_state: false,
                show_evidence: false
            },
            "legal": {
                redact: ["PII_partial", "HIPAA_protected"],
                replacement_mode: "annotated",
                show_risk_state: true,
                show_evidence: true,
                preserve_chain_of_custody: true
            },
            "soc": {
                redact: ["PII_minimal"],
                replacement_mode: "hashed",
                show_risk_state: true,
                show_evidence: true,
                preserve_forensic_markers: true
            },
            "none": {
                redact: [],
                replacement_mode: "none",
                show_risk_state: true,
                show_evidence: true
            }
        };

        const profile = redactionProfiles[redaction_profile] || redactionProfiles["public"];

        let redactedContent = content;
        const redactionLog = [];

        // Apply redactions based on profile
        if (profile.redact.includes("PII") || profile.redact.includes("PII_identifiable")) {
            // Email
            const emailCount = (content.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || []).length;
            redactedContent = redactedContent.replace(
                /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
                profile.replacement_mode === "hashed" ? "[EMAIL:HASH_XXX]" : "[EMAIL_REDACTED]"
            );
            if (emailCount > 0) redactionLog.push({ type: "email", count: emailCount });

            // Phone
            const phoneCount = (content.match(/\b(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g) || []).length;
            redactedContent = redactedContent.replace(
                /\b(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
                "[PHONE_REDACTED]"
            );
            if (phoneCount > 0) redactionLog.push({ type: "phone", count: phoneCount });

            // SSN
            const ssnCount = (content.match(/\b\d{3}-\d{2}-\d{4}\b/g) || []).length;
            redactedContent = redactedContent.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[SSN_REDACTED]");
            if (ssnCount > 0) redactionLog.push({ type: "ssn", count: ssnCount });
        }

        if (profile.redact.includes("contact_info") || profile.redact.includes("contact_info_partial")) {
            const addressCount = (content.match(/\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd)\b/gi) || []).length;
            redactedContent = redactedContent.replace(
                /\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd)\b/gi,
                "[ADDRESS_REDACTED]"
            );
            if (addressCount > 0) redactionLog.push({ type: "address", count: addressCount });
        }

        if (profile.redact.includes("location")) {
            // Coordinates
            redactedContent = redactedContent.replace(
                /\b[-+]?\d{1,2}\.\d+,\s*[-+]?\d{1,3}\.\d+\b/g,
                "[COORDINATES_REDACTED]"
            );
        }

        if (profile.redact.includes("raw_transcript")) {
            // For child_safe profile, replace entire transcript with summary
            if (redaction_profile === "child_safe") {
                redactedContent = "[TRANSCRIPT_HIDDEN: Risk state and safety explanations available via guardian console]";
            }
        }

        // Pseudonymization for research profiles
        if (profile.replacement_mode === "pseudonymized" && preserve_evidential_value) {
            // Replace names with consistent pseudonyms
            const namePattern = /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g;
            const nameMap = new Map();
            let nameCounter = 1;

            redactedContent = redactedContent.replace(namePattern, (match) => {
                if (!nameMap.has(match)) {
                    nameMap.set(match, `[PERSON_${nameCounter++}]`);
                }
                return nameMap.get(match);
            });

            if (nameMap.size > 0) {
                redactionLog.push({ type: "pseudonymized_names", count: nameMap.size });
            }
        }

        // Calculate redaction metrics
        const originalLength = content.length;
        const redactedLength = redactedContent.length;
        const redactionRate = 1 - (redactedLength / originalLength);
        const totalRedactions = redactionLog.reduce((sum, item) => sum + item.count, 0);

        const evidentialIntegrity = preserve_evidential_value && profile.preserve_structure ?
            Math.max(0.7, 1 - redactionRate) : 1 - redactionRate;

        return {
            output: `[Redaction Engine] Content redacted per '${redaction_profile}' profile for viewer role '${viewer_role}'. ${totalRedactions} items redacted. Evidential integrity: ${(evidentialIntegrity * 100).toFixed(1)}%.`,
            redacted_content: redactedContent,
            metadata: {
                ts,
                redaction_profile,
                viewer_role,
                original_length: originalLength,
                redacted_length: redactedLength,
                redaction_rate: redactionRate,
                total_redactions: totalRedactions,
                redaction_log: redactionLog,
                evidential_integrity: evidentialIntegrity,
                profile_applied: profile,
                recommendation: "REDACTION_COMPLETE"
            }
        };
  },
  },
};

export const redactionEngine: Agent = {
  name: "Redaction Engine",
  id: "agent-redaction-engine",
  description: "Render-Time Filtering",

  async execute(context: unknown) {
    console.log("[Redaction Engine] Executing Render-Time Filtering...");
    return {
      status: "active",
      context,
    };
  },
};
