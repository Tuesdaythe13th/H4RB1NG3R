/**
 * Agent CO-1: Console Orchestrator
 *
 * Manages multi-view console rendering and role-aware UI orchestration.
 * Routes requests to appropriate views based on user role and context.
 */
 */
 */
/**
 * Console Orchestrator
 * Function: Event Coordination
 */

import { Agent } from "../harbinger-server.js";

export const ConsoleOrchestrator: Agent = {
    name: "Console Orchestrator",
    id: "CO-1",
    description: "Orchestrates role-aware console views and manages UI state across different user profiles.",
    execute: async (context: {
        user_role: string;
        view_request: string;
        context_data?: any;
        session_state?: any;
    }) => {
        const ts = new Date().toISOString();
        const { user_role, view_request, context_data = {}, session_state = {} } = context;

        // Define role-specific view configurations
        const roleViewConfigs: Record<string, any> = {
            "child": {
                available_views: ["safe_story", "activity_summary"],
                default_view: "safe_story",
                transcript_visible: false,
                risk_indicators_visible: false,
                controls_visible: false,
                emergency_button_visible: false // Controlled by guardian
            },
            "guardian": {
                available_views: ["dashboard", "activity_log", "risk_timeline", "policy_editor", "approval_queue"],
                default_view: "dashboard",
                transcript_visible: true,
                risk_indicators_visible: true,
                controls_visible: true,
                emergency_button_visible: true,
                child_view_accessible: true
            },
            "teacher": {
                available_views: ["classroom_dashboard", "group_policy", "student_activity", "incident_report"],
                default_view: "classroom_dashboard",
                transcript_visible: true,
                risk_indicators_visible: true,
                controls_visible: true,
                group_management: true
            },
            "researcher": {
                available_views: ["evidence_vault", "forensic_lab", "detector_studio", "export_wizard"],
                default_view: "evidence_vault",
                transcript_visible: true,
                risk_indicators_visible: true,
                raw_data_access: true,
                export_capabilities: ["json", "csv", "pdf", "research_package"]
            },
            "soc_operator": {
                available_views: ["threat_dashboard", "alert_queue", "investigation_board", "siem_console"],
                default_view: "threat_dashboard",
                transcript_visible: true,
                risk_indicators_visible: true,
                raw_data_access: true,
                incident_response_tools: true,
                wazuh_integration: true
            },
            "policy_maker": {
                available_views: ["policy_sandbox", "regulatory_compliance", "impact_simulator", "standards_mapping"],
                default_view: "regulatory_compliance",
                transcript_visible: false,
                risk_indicators_visible: true,
                aggregate_data_only: true,
                anonymized_view: true
            },
            "international": {
                available_views: ["cultural_adaptation", "translation_console", "regional_risk_map", "constitution_templates"],
                default_view: "cultural_adaptation",
                transcript_visible: true,
                multilingual_support: true,
                cultural_context_tools: true
            },
            "elderly": {
                available_views: ["simple_dashboard", "voice_interface"],
                default_view: "simple_dashboard",
                transcript_visible: false,
                large_text: true,
                high_contrast: true,
                voice_control: true,
                simplified_controls: true,
                guardian_connection: true
            }
        };

        const config = roleViewConfigs[user_role.toLowerCase()] || roleViewConfigs["child"]; // Default to most restrictive

        // Validate view request against role permissions
        const requestedView = view_request.toLowerCase();
        const isViewAllowed = config.available_views.includes(requestedView);

        if (!isViewAllowed) {
            return {
                output: `[Console Orchestrator] Access denied: Role '${user_role}' does not have permission to access view '${view_request}'. Available views: ${config.available_views.join(', ')}.`,
                metadata: {
                    ts,
                    user_role,
                    requested_view: view_request,
                    access_granted: false,
                    severity: "MEDIUM",
                    recommendation: "SHOW_DEFAULT_VIEW"
                }
            };
        }

        // Generate view-specific rendering instructions
        const renderingInstructions = {
            view: requestedView,
            role: user_role,
            configuration: config,
            data_sources: [] as string[],
            ui_components: [] as any[],
            access_restrictions: [] as string[]
        };

        // Determine data sources based on view and role
        switch (requestedView) {
            case "dashboard":
            case "threat_dashboard":
            case "classroom_dashboard":
            case "simple_dashboard":
                renderingInstructions.data_sources = ["risk_metrics", "activity_summary", "recent_events"];
                renderingInstructions.ui_components = [
                    { type: "MetricCard", data: "risk_score" },
                    { type: "Timeline", data: "recent_events" },
                    { type: "AlertPanel", data: "active_alerts" }
                ];
                break;

            case "evidence_vault":
            case "forensic_lab":
                renderingInstructions.data_sources = ["evidence_spans", "forensic_traces", "audit_log"];
                renderingInstructions.ui_components = [
                    { type: "EvidenceTable", data: "evidence_spans" },
                    { type: "ForensicViewer", data: "neural_autopsy" },
                    { type: "ExportButton", action: "export_evidence" }
                ];
                if (!config.raw_data_access) {
                    renderingInstructions.access_restrictions.push("raw_activations_redacted");
                }
                break;

            case "policy_editor":
            case "group_policy":
                renderingInstructions.data_sources = ["current_policy", "constitution", "governance_history"];
                renderingInstructions.ui_components = [
                    { type: "PolicyEditor", data: "constitution" },
                    { type: "RuleBuilder", action: "add_rule" },
                    { type: "PreviewPanel", data: "policy_impact" }
                ];
                break;

            case "safe_story":
                renderingInstructions.data_sources = ["interaction_summary"];
                renderingInstructions.ui_components = [
                    { type: "StoryCard", data: "safe_narrative" }
                ];
                renderingInstructions.access_restrictions.push("no_raw_transcript", "risk_state_hidden");
                break;

            case "approval_queue":
                renderingInstructions.data_sources = ["pending_approvals", "approval_history"];
                renderingInstructions.ui_components = [
                    { type: "ApprovalList", data: "pending_approvals" },
                    { type: "ApprovalGate", action: "approve_reject" }
                ];
                break;

            default:
                renderingInstructions.data_sources = ["summary"];
                renderingInstructions.ui_components = [
                    { type: "TextPanel", data: "view_summary" }
                ];
        }

        // Apply role-specific UI modifications
        if (config.large_text) {
            renderingInstructions.ui_components.forEach(comp => {
                comp.style = { ...comp.style, fontSize: "large", lineHeight: 1.8 };
            });
        }

        if (config.high_contrast) {
            renderingInstructions.ui_components.forEach(comp => {
                comp.style = { ...comp.style, contrast: "high" };
            });
        }

        if (!config.transcript_visible) {
            renderingInstructions.access_restrictions.push("transcript_hidden");
        }

        if (!config.risk_indicators_visible) {
            renderingInstructions.access_restrictions.push("risk_indicators_hidden");
        }

        const viewState = {
            active_view: requestedView,
            role: user_role,
            rendering_instructions: renderingInstructions,
            session_id: session_state.session_id || `session_${Date.now()}`,
            last_updated: ts
        };

        return {
            output: `[Console Orchestrator] View '${requestedView}' activated for role '${user_role}'. Components: ${renderingInstructions.ui_components.length}, Data sources: ${renderingInstructions.data_sources.length}, Restrictions: ${renderingInstructions.access_restrictions.length}.`,
            view_state: viewState,
            rendering_instructions: renderingInstructions,
            metadata: {
                ts,
                user_role,
                requested_view: view_request,
                active_view: requestedView,
                access_granted: true,
                configuration: config,
                recommendation: "RENDER_VIEW"
            }
        };
  },
  },
};

export const consoleOrchestrator: Agent = {
  name: "Console Orchestrator",
  id: "agent-console-orchestrator",
  description: "Event Coordination",

  async execute(context: unknown) {
    console.log("[Console Orchestrator] Executing Event Coordination...");
    return {
      status: "active",
      context,
    };
  },
};
