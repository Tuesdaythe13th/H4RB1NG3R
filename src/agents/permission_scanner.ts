
/**
 * Agent PS-1: Permission Scanner
 *
 * Audits and validates permissions for actions, tools, and resource access.
 * Implements principle of least privilege.
/**
 * Permission Scanner
 * Function: Capability Audit
 */

import { Agent } from "../harbinger-server.js";

export const PermissionScanner: Agent = {
    name: "Permission Scanner",
    id: "PS-1",
    description: "Audits permissions and enforces principle of least privilege for all actions and resource access.",
    execute: async (context: {
        actor: string;
        requested_action: string;
        target_resource?: string;
        policy_context?: any;
    }) => {
        const ts = new Date().toISOString();
        const { actor, requested_action, target_resource = "unknown", policy_context = {} } = context;

        // Define role-based permissions
        const rolePermissions: Record<string, any> = {
            "child": {
                allowed_actions: ["read", "view", "ask"],
                blocked_actions: ["write", "delete", "execute", "external", "admin"],
                max_risk_level: 0.2,
                requires_approval: ["read_sensitive", "download"]
            },
            "guardian": {
                allowed_actions: ["read", "write", "view", "ask", "configure", "approve"],
                blocked_actions: ["delete_system", "admin_override"],
                max_risk_level: 0.8,
                requires_approval: ["delete", "policy_change"]
            },
            "researcher": {
                allowed_actions: ["read", "write", "view", "ask", "analyze", "export", "probe"],
                blocked_actions: ["admin_override", "policy_bypass"],
                max_risk_level: 1.0,
                requires_approval: []
            },
            "system": {
                allowed_actions: ["*"],
                blocked_actions: [],
                max_risk_level: 1.0,
                requires_approval: []
            },
            "soc_operator": {
                allowed_actions: ["read", "view", "analyze", "export", "alert", "block", "investigate"],
                blocked_actions: ["write_evidence", "delete_log"],
                max_risk_level: 1.0,
                requires_approval: ["block_user", "system_shutdown"]
            },
            "teacher": {
                allowed_actions: ["read", "view", "configure_group", "monitor", "report"],
                blocked_actions: ["delete", "admin", "override_guardian"],
                max_risk_level: 0.6,
                requires_approval: ["escalate_to_admin"]
            }
        };

        const actorRole = actor.toLowerCase();
        const permissions = rolePermissions[actorRole] || rolePermissions["child"]; // Default to most restrictive

        // Check if action is explicitly blocked
        const isBlocked = permissions.blocked_actions.includes(requested_action) ||
            permissions.blocked_actions.includes("*");

        // Check if action is explicitly allowed
        const isAllowed = permissions.allowed_actions.includes(requested_action) ||
            permissions.allowed_actions.includes("*");

        // Check if action requires approval
        const requiresApproval = permissions.requires_approval.includes(requested_action);

        // Calculate action risk score
        const actionRiskKeywords = {
            "delete": 0.8,
            "execute": 0.7,
            "external": 0.6,
            "admin": 0.9,
            "override": 0.8,
            "bypass": 0.9,
            "write": 0.4,
            "read": 0.1
        };

        let actionRiskScore = 0;
        for (const [keyword, score] of Object.entries(actionRiskKeywords)) {
            if (requested_action.toLowerCase().includes(keyword)) {
                actionRiskScore = Math.max(actionRiskScore, score);
            }
        }

        // Check if risk exceeds role's max
        const riskExceeded = actionRiskScore > permissions.max_risk_level;

        // Audit resource access patterns
        const resourceAccessLog = {
            actor,
            action: requested_action,
            resource: target_resource,
            timestamp: ts,
            risk_score: actionRiskScore,
            permission_check: {
                is_blocked: isBlocked,
                is_allowed: isAllowed,
                requires_approval: requiresApproval,
                risk_exceeded: riskExceeded
            }
        };

        // Final decision
        const decision = isBlocked || riskExceeded ? "DENY" :
            !isAllowed ? "DENY" :
                requiresApproval ? "REQUIRES_APPROVAL" :
                    "ALLOW";

        const violations = [];
        if (isBlocked) violations.push("action_explicitly_blocked");
        if (riskExceeded) violations.push("risk_threshold_exceeded");
        if (!isAllowed && !isBlocked) violations.push("action_not_in_allowed_list");

        const severity = decision === "DENY" ? "HIGH" : decision === "REQUIRES_APPROVAL" ? "MEDIUM" : "LOW";

        return {
            output: `[Permission Scanner] Actor: ${actor}, Action: ${requested_action}, Resource: ${target_resource}. Decision: ${decision}. ${violations.length > 0 ? `Violations: ${violations.join(', ')}. ` : ''}Risk Score: ${actionRiskScore.toFixed(2)} (Max: ${permissions.max_risk_level}).`,
            decision,
            access_log: resourceAccessLog,
            metadata: {
                ts,
                actor,
                actor_role: actorRole,
                requested_action,
                target_resource,
                decision,
                severity,
                risk_score: actionRiskScore,
                max_risk_level: permissions.max_risk_level,
                violations,
                requires_approval: requiresApproval,
                permissions_applied: permissions,
                recommendation: decision === "DENY" ? "BLOCK_ACTION" :
                    decision === "REQUIRES_APPROVAL" ? "REQUEST_APPROVAL" : "ALLOW"
            }
        };
    }
export const permissionScanner: Agent = {
  name: "Permission Scanner",
  id: "agent-permission-scanner",
  description: "Capability Audit",

  async execute(context: unknown) {
    console.log("[Permission Scanner] Executing Capability Audit...");
    return {
      status: "active",
      context,
    };
  },
};
