
/**
 * Agent SM-1: Session Manager
 *
 * Manages session lifecycle, state persistence, and session-level governance.
 * Implements sleep mode scheduling and session boundary enforcement.
 */

import { Agent } from "../harbinger-server.js";

export const SessionManager: Agent = {
    name: "Session Manager",
    id: "SM-1",
    description: "Manages session lifecycle, governance state transitions, and temporal boundaries.",
    execute: async (context: {
        session_id: string;
        action: string;
        policy?: any;
        user_profile?: any;
    }) => {
        const ts = new Date().toISOString();
        const { session_id, action, policy = {}, user_profile = {} } = context;

        const sessionState = {
            session_id,
            status: "active",
            started_at: ts,
            last_activity: ts,
            duration_seconds: 0,
            interaction_count: 0,
            risk_events: [] as any[],
            governance_transitions: [] as any[],
            sleep_mode_active: false,
            emergency_stop_triggered: false
        };

        let actionResult: any = {};

        switch (action.toLowerCase()) {
            case "initialize":
                actionResult = {
                    status: "initialized",
                    session_id,
                    message: "Session initialized with governance controls active.",
                    governance_mode: policy.mode || "sovereign",
                    time_boundaries: policy.time_boundaries || null
                };
                break;

            case "check_boundaries":
                // Check time boundaries (e.g., sleep mode schedule)
                const currentHour = new Date().getHours();
                const sleepSchedule = policy.sleep_schedule || { start: 22, end: 7 }; // 10 PM to 7 AM default

                const isSleepTime = currentHour >= sleepSchedule.start || currentHour < sleepSchedule.end;
                const sessionDuration = (Date.now() - new Date(sessionState.started_at).getTime()) / 1000;
                const maxDuration = policy.max_session_duration || 3600; // 1 hour default

                const violations = [];
                if (isSleepTime && !policy.allow_during_sleep) {
                    violations.push("sleep_schedule_violation");
                    sessionState.sleep_mode_active = true;
                }
                if (sessionDuration > maxDuration) {
                    violations.push("max_duration_exceeded");
                }
                if (sessionState.interaction_count > (policy.max_interactions || 100)) {
                    violations.push("max_interactions_exceeded");
                }

                actionResult = {
                    status: violations.length > 0 ? "boundary_violation" : "within_boundaries",
                    violations,
                    sleep_mode_active: sessionState.sleep_mode_active,
                    session_duration: sessionDuration,
                    max_duration: maxDuration,
                    recommendation: violations.length > 0 ? "TERMINATE_SESSION" : "CONTINUE"
                };
                break;

            case "record_event":
                // Record a governance event
                const event = {
                    event_id: `evt_${Date.now()}`,
                    timestamp: ts,
                    type: context.user_profile?.event_type || "interaction",
                    severity: context.user_profile?.severity || "low"
                };

                sessionState.risk_events.push(event);
                sessionState.interaction_count++;

                actionResult = {
                    status: "event_recorded",
                    event_id: event.event_id,
                    total_events: sessionState.risk_events.length
                };
                break;

            case "governance_transition":
                // Record a governance state transition
                const transition = {
                    transition_id: `trans_${Date.now()}`,
                    timestamp: ts,
                    from_state: policy.current_state || "warn",
                    to_state: context.user_profile?.target_state || "gate",
                    trigger: context.user_profile?.trigger || "risk_threshold_exceeded",
                    approved_by: context.user_profile?.approved_by || "system"
                };

                sessionState.governance_transitions.push(transition);

                actionResult = {
                    status: "transition_recorded",
                    transition_id: transition.transition_id,
                    from_state: transition.from_state,
                    to_state: transition.to_state,
                    total_transitions: sessionState.governance_transitions.length
                };
                break;

            case "emergency_stop":
                // Trigger emergency stop
                sessionState.emergency_stop_triggered = true;
                sessionState.status = "emergency_stopped";

                actionResult = {
                    status: "emergency_stop_activated",
                    session_id,
                    stopped_at: ts,
                    message: "All agentic activity halted. Explanatory report generation initiated.",
                    report_id: `emergency_report_${Date.now()}`
                };
                break;

            case "terminate":
                sessionState.status = "terminated";
                const finalDuration = (Date.now() - new Date(sessionState.started_at).getTime()) / 1000;

                actionResult = {
                    status: "terminated",
                    session_id,
                    terminated_at: ts,
                    total_duration_seconds: finalDuration,
                    total_interactions: sessionState.interaction_count,
                    risk_events_count: sessionState.risk_events.length,
                    governance_transitions_count: sessionState.governance_transitions.length,
                    emergency_stop: sessionState.emergency_stop_triggered
                };
                break;

            case "export_session":
                actionResult = {
                    status: "export_ready",
                    session_data: sessionState,
                    export_id: `session_export_${Date.now()}`
                };
                break;

            default:
                actionResult = {
                    status: "unknown_action",
                    message: `Unknown session action: ${action}`
                };
        }

        return {
            output: `[Session Manager] Session ${session_id}: Action '${action}' ${actionResult.status}. ${actionResult.message || ''} ${actionResult.violations ? `Violations: ${actionResult.violations.join(', ')}. ` : ''}`,
            session_state: sessionState,
            action_result: actionResult,
            metadata: {
                ts,
                session_id,
                action,
                status: actionResult.status,
                recommendation: actionResult.recommendation || "CONTINUE"
            }
        };
    }
};
