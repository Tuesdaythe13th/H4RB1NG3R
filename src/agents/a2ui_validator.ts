
 */
/**
 * Agent AV-1: A2UI Validator
 *
 * Validates Agent-to-UI (A2UI) requests to ensure only whitelisted
 * components are rendered. Implements fail-closed generative UI kernel.
 */

import { Agent } from "../harbinger-server.js";

export const A2UIValidator: Agent = {
    name: "A2UI Validator",
    id: "AV-1",
    description: "Validates A2UI rendering requests against whitelist. Enforces fail-closed UI generation.",
    execute: async (context: {
        ui_request: any;
        requesting_agent: string;
        user_role?: string;
    }) => {
        const ts = new Date().toISOString();
        const { ui_request, requesting_agent, user_role = "user" } = context;

        // Define whitelisted UI components
        const whitelistedComponents = {
            // Data Display Components
            "MetricCard": {
                allowed_props: ["title", "value", "unit", "trend", "severity"],
                risk_level: 0.1,
                requires_approval: false
            },
            "Timeline": {
                allowed_props: ["events", "time_range", "filter"],
                risk_level: 0.2,
                requires_approval: false
            },
            "EvidenceTable": {
                allowed_props: ["columns", "data", "sortable", "filterable"],
                risk_level: 0.3,
                requires_approval: false
            },
            "AlertPanel": {
                allowed_props: ["alerts", "severity_filter", "dismissable"],
                risk_level: 0.3,
                requires_approval: false
            },

            // Interactive Components
            "ApprovalGate": {
                allowed_props: ["request_id", "action_summary", "risk_score", "required_approvers"],
                risk_level: 0.6,
                requires_approval: true
            },
            "PolicyEditor": {
                allowed_props: ["policy_data", "editable_fields", "validation_rules"],
                risk_level: 0.7,
                requires_approval: true,
                role_restricted: ["guardian", "admin"]
            },
            "ExportButton": {
                allowed_props: ["export_type", "data_source", "format"],
                risk_level: 0.5,
                requires_approval: false
            },

            // Visualization Components
            "ForensicViewer": {
                allowed_props: ["trace_id", "layer_range", "diff_mode"],
                risk_level: 0.4,
                requires_approval: false
            },
            "RiskHeatmap": {
                allowed_props: ["data", "color_scale", "threshold"],
                risk_level: 0.3,
                requires_approval: false
            },
            "VegaLiteChart": {
                allowed_props: ["spec", "data", "config"],
                risk_level: 0.3,
                requires_approval: false,
                validation_required: true
            },

            // Child-Safe Components
            "StoryCard": {
                allowed_props: ["narrative", "characters", "moral", "safety_rating"],
                risk_level: 0.1,
                requires_approval: false,
                child_safe: true
            },
            "SafetyIndicator": {
                allowed_props: ["status", "message", "icon"],
                risk_level: 0.1,
                requires_approval: false,
                child_safe: true
            },

            // Control Components
            "EmergencyStop": {
                allowed_props: ["confirmation_required"],
                risk_level: 0.9,
                requires_approval: true,
                role_restricted: ["guardian", "admin"]
            },
            "ConstitutionBuilder": {
                allowed_props: ["template", "rules", "preview_mode"],
                risk_level: 0.6,
                requires_approval: true
            }
        };

        const requestedComponent = ui_request.component;
        const requestedProps = ui_request.props || {};

        // Validation checks
        const validationResults = {
            component_whitelisted: false,
            props_valid: false,
            role_authorized: false,
            risk_acceptable: false,
            requires_approval: false,
            violations: [] as string[]
        };

        // Check 1: Component whitelisting
        if (requestedComponent in whitelistedComponents) {
            validationResults.component_whitelisted = true;
        } else {
            validationResults.violations.push("component_not_whitelisted");
        }

        const componentSpec = requestedComponent in whitelistedComponents ?
            whitelistedComponents[requestedComponent as keyof typeof whitelistedComponents] :
            undefined;

        if (componentSpec) {
            // Check 2: Props validation
            const requestedPropKeys = Object.keys(requestedProps);
            const invalidProps = requestedPropKeys.filter(
                prop => !componentSpec.allowed_props.includes(prop)
            );

            if (invalidProps.length === 0) {
                validationResults.props_valid = true;
            } else {
                validationResults.violations.push(`invalid_props:${invalidProps.join(",")}`);
            }

            // Check 3: Role authorization
            if (componentSpec.role_restricted) {
                if (componentSpec.role_restricted.includes(user_role)) {
                    validationResults.role_authorized = true;
                } else {
                    validationResults.violations.push(`role_restricted:requires_${componentSpec.role_restricted.join("_or_")}`);
                }
            } else {
                validationResults.role_authorized = true; // No role restriction
            }

            // Check 4: Risk level
            const maxRiskForRole: Record<string, number> = {
                "child": 0.2,
                "user": 0.5,
                "guardian": 0.8,
                "researcher": 0.9,
                "admin": 1.0
            };

            const userMaxRisk = maxRiskForRole[user_role] || 0.2;
            if (componentSpec.risk_level <= userMaxRisk) {
                validationResults.risk_acceptable = true;
            } else {
                validationResults.violations.push(`risk_exceeds_role_limit:${componentSpec.risk_level}>${userMaxRisk}`);
            }

            // Check 5: Approval requirement
            validationResults.requires_approval = componentSpec.requires_approval || false;

            // Special validation for Vega-Lite specs
            if (requestedComponent === "VegaLiteChart" && componentSpec.validation_required) {
                const spec = requestedProps.spec;
                if (!spec || !spec.mark || !spec.encoding) {
                    validationResults.violations.push("invalid_vega_spec");
                    validationResults.props_valid = false;
                }
            }
        }

        // Final decision
        const isValid = validationResults.component_whitelisted &&
            validationResults.props_valid &&
            validationResults.role_authorized &&
            validationResults.risk_acceptable;

        const decision = isValid ?
            (validationResults.requires_approval ? "REQUIRES_APPROVAL" : "ALLOW") :
            "DENY";

        const severity = validationResults.violations.length >= 3 ? "CRITICAL" :
            validationResults.violations.length >= 2 ? "HIGH" :
                validationResults.violations.length >= 1 ? "MEDIUM" : "LOW";

        // Generate safe fallback if request is denied
        const fallbackUI = decision === "DENY" ? {
            component: "AlertPanel",
            props: {
                alerts: [{
                    message: "Requested UI component could not be rendered due to security policy.",
                    severity: "warning",
                    violations: validationResults.violations
                }],
                severity_filter: "warning"
            }
        } : null;

        return {
            output: `[A2UI Validator] UI request from ${requesting_agent}: Component '${requestedComponent}' ${decision}. ${validationResults.violations.length > 0 ? `Violations: ${validationResults.violations.join(', ')}. ` : ''}Severity: ${severity}.`,
            decision,
            validated_request: isValid ? ui_request : fallbackUI,
            fallback_ui: fallbackUI,
            validation_results: validationResults,
            metadata: {
                ts,
                requesting_agent,
                requested_component: requestedComponent,
                user_role,
                decision,
                severity,
                violations: validationResults.violations,
                requires_approval: validationResults.requires_approval,
                component_spec: componentSpec,
                recommendation: decision === "DENY" ? "RENDER_FALLBACK" :
                    decision === "REQUIRES_APPROVAL" ? "REQUEST_APPROVAL" : "RENDER_REQUESTED"
            }
        };
    }
};
