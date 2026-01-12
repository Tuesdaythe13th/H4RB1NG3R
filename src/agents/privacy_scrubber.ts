/**
 * Agent PA-1: Privacy Scrubber
 *
 * Detects and redacts personally identifiable information (PII) and
 * sensitive data from interactions and logs.
 */
 */
/**
 * Privacy Scrubber
 * Function: PII Redaction
 */

import { Agent } from "../harbinger-server.js";

export const PrivacyScrubber: Agent = {
    name: "Privacy Scrubber",
    id: "PA-1",
    description: "Detects and redacts PII, sensitive data, and privacy-compromising information from interactions.",
    execute: async (context: { content: string; redaction_level?: string; preserve_context?: boolean }) => {
        const ts = new Date().toISOString();
        const { content, redaction_level = "standard", preserve_context = true } = context;

        const detectedPII = {
            email_addresses: [] as string[],
            phone_numbers: [] as string[],
            ssn_numbers: [] as string[],
            credit_cards: [] as string[],
            addresses: [] as string[],
            names: [] as string[],
            dates_of_birth: [] as string[]
        };

        let scrubbedContent = content;

        // Email detection and redaction
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const emails = content.match(emailRegex) || [];
        detectedPII.email_addresses = emails;
        scrubbedContent = scrubbedContent.replace(emailRegex, '[EMAIL_REDACTED]');

        // Phone number detection (US format)
        const phoneRegex = /\b(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
        const phones = content.match(phoneRegex) || [];
        detectedPII.phone_numbers = phones;
        scrubbedContent = scrubbedContent.replace(phoneRegex, '[PHONE_REDACTED]');

        // SSN detection (US format)
        const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
        const ssns = content.match(ssnRegex) || [];
        detectedPII.ssn_numbers = ssns;
        scrubbedContent = scrubbedContent.replace(ssnRegex, '[SSN_REDACTED]');

        // Credit card detection (basic)
        const ccRegex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
        const cards = content.match(ccRegex) || [];
        detectedPII.credit_cards = cards;
        scrubbedContent = scrubbedContent.replace(ccRegex, '[CC_REDACTED]');

        // Address detection (basic pattern)
        const addressRegex = /\b\d+\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr)\b/gi;
        const addresses = content.match(addressRegex) || [];
        detectedPII.addresses = addresses;
        scrubbedContent = scrubbedContent.replace(addressRegex, '[ADDRESS_REDACTED]');

        // Name detection (basic - capitalized words that might be names)
        if (redaction_level === "strict") {
            const nameRegex = /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g;
            const names = content.match(nameRegex) || [];
            detectedPII.names = names;
            scrubbedContent = scrubbedContent.replace(nameRegex, '[NAME_REDACTED]');
        }

        // Date of birth detection
        const dobRegex = /\b(0?[1-9]|1[0-2])[/-](0?[1-9]|[12]\d|3[01])[/-](\d{2}|\d{4})\b/g;
        const dobs = content.match(dobRegex) || [];
        detectedPII.dates_of_birth = dobs;
        scrubbedContent = scrubbedContent.replace(dobRegex, '[DOB_REDACTED]');

        const totalPIICount = Object.values(detectedPII).reduce((sum, arr) => sum + arr.length, 0);
        const privacyRisk = totalPIICount > 5 ? "HIGH" : totalPIICount > 2 ? "MEDIUM" : totalPIICount > 0 ? "LOW" : "NONE";

        return {
            output: `[Privacy Scrubber] Scan complete: ${totalPIICount} PII items detected (Risk: ${privacyRisk}). Content redacted per ${redaction_level} policy.`,
            scrubbed_content: scrubbedContent,
            metadata: {
                ts,
                privacy_risk: privacyRisk,
                pii_count: totalPIICount,
                detected_types: detectedPII,
                redaction_level,
                original_length: content.length,
                scrubbed_length: scrubbedContent.length,
                recommendation: totalPIICount > 0 ? "LOG_AND_REDACT" : "ALLOW"
            }
        };
  },
  },
};

export const privacyScrubber: Agent = {
  name: "Privacy Scrubber",
  id: "agent-privacy-scrubber",
  description: "PII Redaction",

  async execute(context: unknown) {
    console.log("[Privacy Scrubber] Executing PII Redaction...");
    return {
      status: "active",
      context,
    };
  },
};
