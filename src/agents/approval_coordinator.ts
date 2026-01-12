
/**
 * Agent AC-1: Approval Coordinator
 *
 * Manages human-in-the-loop approval workflows for high-risk actions.
 * Implements Star Chamber consensus for multi-agent authorization.
/**
 * Approval Coordinator
 * Function: HiTL Gates
 */

import { Agent } from "../harbinger-server.js";

export const ApprovalCoordinator: Agent = {
    name: "Approval Coordinator",
    id: "AC-1",
    description: "Manages approval workflows and multi-agent consensus for high-risk actions.",
    execute: async (context: {
        action_id: string;
        proposed_action: any;
        approval_type: string;
        required_approvers?: string[];
        timeout_seconds?: number;
    }) => {
        const ts = new Date().toISOString();
        const {
            action_id,
            proposed_action,
            approval_type,
            required_approvers = ["guardian"],
            timeout_seconds = 300
        } = context;

        // Generate approval request
        const approvalRequest = {
            request_id: `approval_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            action_id,
            ts,
            proposed_action,
            approval_type,
            required_approvers,
            timeout_at: new Date(Date.now() + timeout_seconds * 1000).toISOString(),
            status: "pending",
            approvals: [] as any[],
            rejections: [] as any[]
        };

        // Determine approval threshold based on type
        const approvalThresholds: Record<string, any> = {
            "simple": {
                required_count: 1,
                approval_types: ["guardian", "user"]
            },
            "consensus": {
                required_count: Math.ceil(required_approvers.length * 0.67), // 2/3 majority
                approval_types: required_approvers
            },
            "star_chamber": {
                required_count: 3,
                approval_types: ["forensic_pathologist", "ciso", "legal_auditor"],
                unanimous: true
            },
            "emergency": {
                required_count: 2,
                approval_types: ["guardian", "system_admin"],
                max_timeout: 60
            }
        };

        const threshold = approvalThresholds[approval_type] || approvalThresholds["simple"];

        // Calculate risk score for the proposed action
        const actionContent = JSON.stringify(proposed_action).toLowerCase();
        let riskScore = 0;

        const highRiskKeywords = ["delete", "external", "payment", "sensitive", "admin", "override"];
        for (const keyword of highRiskKeywords) {
            if (actionContent.includes(keyword)) riskScore += 0.2;
        }

        riskScore = Math.min(1.0, riskScore);

        // Determine if immediate escalation is needed
        const requiresEscalation = riskScore > 0.8 || approval_type === "star_chamber";

        // Generate approval UI context
        const approvalUI = {
            component: "ApprovalGate",
            props: {
                request_id: approvalRequest.request_id,
                action_summary: `${proposed_action.type || "Unknown action"} requires approval`,
                risk_score: riskScore,
                required_approvers: threshold.approval_types,
                required_count: threshold.required_count,
                timeout_seconds,
                action_details: proposed_action
            }
        };

        const severity = requiresEscalation ? "CRITICAL" : riskScore > 0.5 ? "HIGH" : "MEDIUM";

        return {
            output: `[Approval Coordinator] Approval request ${approvalRequest.request_id} created for action ${action_id}. Type: ${approval_type}, Required approvers: ${threshold.required_count}/${required_approvers.length}, Risk: ${riskScore.toFixed(2)}, Severity: ${severity}. ${requiresEscalation ? 'IMMEDIATE ESCALATION REQUIRED. ' : ''}Awaiting human authorization via A2UI.`,
            approval_request: approvalRequest,
            ui_context: approvalUI,
            metadata: {
                ts,
                request_id: approvalRequest.request_id,
                action_id,
                approval_type,
                severity,
                risk_score: riskScore,
                threshold,
                requires_escalation: requiresEscalation,
                timeout_at: approvalRequest.timeout_at,
                recommendation: "AWAIT_HUMAN_DECISION"
            }
        };
    }
export const approvalCoordinator: Agent = {
  name: "Approval Coordinator",
  id: "agent-approval-coordinator",
  description: "HiTL Gates",

  async execute(context: unknown) {
    console.log("[Approval Coordinator] Executing HiTL Gates...");
    return {
      status: "active",
      context,
    };
  },
};
