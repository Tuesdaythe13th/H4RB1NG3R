
/**
 * Agent MA-1: Mode Enforcer
 *
 * Enforces governance modes (Child Safety, Research, Sovereign, etc.)
 * and ensures interactions comply with active mode constraints.
 */

import { Agent } from "../harbinger-server.js";

export const ModeEnforcer: Agent = {
    name: "Mode Enforcer",
    id: "MA-1",
    description: "Enforces active governance mode constraints and validates interaction compliance.",
    execute: async (context: {
        active_mode: string;
        proposed_action: any;
        user_role?: string;
        interaction_context?: any;
    }) => {
        const ts = new Date().toISOString();
        const { active_mode, proposed_action, user_role = "user", interaction_context = {} } = context;

        // Define mode constraints
        const modeConstraints: Record<string, any> = {
            "child_safety": {
                max_interaction_duration: 30, // minutes
                blocked_topics: ["violence", "adult_content", "financial", "medical"],
                requires_guardian_approval: ["external_link", "file_download", "api_call"],
                transcript_visible: false,
                max_risk_threshold: 0.2
            },
            "sovereign": {
                max_interaction_duration: null,
                blocked_topics: [],
                requires_guardian_approval: ["policy_change", "constitution_edit"],
                transcript_visible: true,
                max_risk_threshold: 0.8
            },
            "research": {
                max_interaction_duration: null,
                blocked_topics: [],
                requires_guardian_approval: [],
                transcript_visible: true,
                max_risk_threshold: 1.0,
                requires_evidence_log: true
            },
            "compliance": {
                max_interaction_duration: 60,
                blocked_topics: [],
                requires_guardian_approval: ["policy_violation"],
                transcript_visible: true,
                max_risk_threshold: 0.5,
                requires_audit_trail: true
            },
            "arena": {
                max_interaction_duration: null,
                blocked_topics: [],
                requires_guardian_approval: ["consensus_override"],
                transcript_visible: true,
                max_risk_threshold: 1.0,
                differential_mode: true
            }
        };

        const constraints = modeConstraints[active_mode.toLowerCase()] || modeConstraints["sovereign"];

        // Validate proposed action against constraints
        const violations = [];
        const warnings = [];

        // Check topic blocking
        if (constraints.blocked_topics && constraints.blocked_topics.length > 0) {
            const actionContent = JSON.stringify(proposed_action).toLowerCase();
            for (const topic of constraints.blocked_topics) {
                if (actionContent.includes(topic)) {
                    violations.push(`blocked_topic:${topic}`);
                }
            }
        }

        // Check approval requirements
        const actionType = proposed_action.type || proposed_action.action_type || "unknown";
        if (constraints.requires_guardian_approval && constraints.requires_guardian_approval.includes(actionType)) {
            if (!proposed_action.guardian_approved) {
                violations.push(`requires_approval:${actionType}`);
            }
        }

        // Check risk threshold
        const actionRisk = proposed_action.risk_score || 0;
        if (constraints.max_risk_threshold && actionRisk > constraints.max_risk_threshold) {
            violations.push(`risk_threshold_exceeded:${actionRisk.toFixed(2)}>${constraints.max_risk_threshold}`);
        }

        // Check duration limits
        const interactionDuration = interaction_context.duration_minutes || 0;
        if (constraints.max_interaction_duration && interactionDuration > constraints.max_interaction_duration) {
            warnings.push(`duration_warning:${interactionDuration}>${constraints.max_interaction_duration}min`);
        }

        // Additional mode-specific checks
        if (active_mode.toLowerCase() === "child_safety") {
            // Extra strict enforcement
            if (actionType === "external_link" || actionType === "file_download") {
                violations.push("child_safety:external_action_blocked");
            }
        }

        if (active_mode.toLowerCase() === "compliance" && !constraints.requires_audit_trail) {
            warnings.push("compliance_mode:missing_audit_trail");
        }

        const isAllowed = violations.length === 0;
        const severity = violations.length > 2 ? "CRITICAL" : violations.length > 0 ? "HIGH" : warnings.length > 0 ? "MEDIUM" : "LOW";

        return {
            output: `[Mode Enforcer] Mode: ${active_mode}. Action ${isAllowed ? "ALLOWED" : "BLOCKED"}. ${violations.length > 0 ? `Violations: ${violations.join(', ')}. ` : ''}${warnings.length > 0 ? `Warnings: ${warnings.join(', ')}.` : ''}`,
            metadata: {
                ts,
                active_mode,
                action_type: actionType,
                is_allowed: isAllowed,
                severity,
                violations,
                warnings,
                constraints_applied: constraints,
                recommendation: !isAllowed ? "BLOCK_ACTION" : warnings.length > 0 ? "WARN_USER" : "ALLOW"
            }
        };
    }
};
