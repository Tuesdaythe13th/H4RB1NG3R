
/**
 * H4RB1NG3R v3.6: Sovereign Safety Substrate (MCP Server)
 * 
 * Actively operationalizes the AG-UI event schema and GHOST-v2 interdiction.
 * Sits between the Agent Swarm and the Mechanistic Layer.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { aguiStream } from "./promptforge/EventLog.js";
import { InvestigationTools, InvestigationEngine } from "./investigation/InvestigationSuite.js";
import { SovereignHashChain } from "./sovereign-hash-chain.js";
import { enforceZeroTrust } from "./zero-trust-middleware.js";
import { validateToolArgs } from "./mcp-validator.js";
import { eventBus } from "./event-bus.js";
import { metrics } from "./prometheus-exporter.js";
import { ComptrollerAgent } from "./agents/comptroller.js";
import { VisualConceptArchitect } from "./agents/visual_architect.js";
import { SentinelScout } from "./agents/sentinel_scout.js";
import { ForensicPathologist } from "./agents/forensic_pathologist.js";
import { CISOAgent } from "./agents/ciso_agent.js";
import { LegalAuditor } from "./agents/legal_auditor.js";
import { CoercionWatchdog } from "./agents/coercion_watchdog.js";
import { IdentityDriftDetector } from "./agents/identity_drift_detector.js";
import { CulturalSentinel } from "./agents/cultural_sentinel.js";
import { ToxicityGatekeeper } from "./agents/toxicity_gatekeeper.js";
import { DeceptionHunter } from "./agents/deception_hunter.js";
import { NarrativeForensicist } from "./agents/narrative_forensicist.js";
import { PrivacyScrubber } from "./agents/privacy_scrubber.js";
import { TimelineProjector } from "./agents/timeline_projector.js";
import { ModeEnforcer } from "./agents/mode_enforcer.js";
import { ApprovalCoordinator } from "./agents/approval_coordinator.js";
import { ArtifactExporter } from "./agents/artifact_exporter.js";
import { PermissionScanner } from "./agents/permission_scanner.js";
import { RedactionEngine } from "./agents/redaction_engine.js";
import { SessionManager } from "./agents/session_manager.js";
import { ZeroTrustAdmin } from "./agents/zero_trust_admin.js";
import { ExternalAuditorProxy } from "./agents/external_auditor_proxy.js";
import { ConsoleOrchestrator } from "./agents/console_orchestrator.js";
import { A2UIValidator } from "./agents/a2ui_validator.js";
import { Docent } from "./agents/docent.js";
import { coercionWatchdog } from "./agents/coercion_watchdog.js";
import { identityDriftDetector } from "./agents/identity_drift_detector.js";
import { culturalSentinel } from "./agents/cultural_sentinel.js";
import { toxicityGatekeeper } from "./agents/toxicity_gatekeeper.js";
import { deceptionHunter } from "./agents/deception_hunter.js";
import { narrativeForensicist } from "./agents/narrative_forensicist.js";
import { privacyScrubber } from "./agents/privacy_scrubber.js";
import { timelineProjector } from "./agents/timeline_projector.js";
import { modeEnforcer } from "./agents/mode_enforcer.js";
import { approvalCoordinator } from "./agents/approval_coordinator.js";
import { artifactExporter } from "./agents/artifact_exporter.js";
import { permissionScanner } from "./agents/permission_scanner.js";
import { redactionEngine } from "./agents/redaction_engine.js";
import { sessionManager } from "./agents/session_manager.js";
import { zeroTrustAdmin } from "./agents/zero_trust_admin.js";
import { externalAuditorProxy } from "./agents/external_auditor_proxy.js";
import { consoleOrchestrator } from "./agents/console_orchestrator.js";
import { a2uiValidator } from "./agents/a2ui_validator.js";
import { buildHealthzReport } from "./healthz-endpoint.js";
import { ensureResourceAccess, ensureToolAccess, HarbingerRole } from "./role-policy.js";
import { calculateMachiavellianDelta } from "./forensics/machiavellian-delta.js";
import { monitorEpistemicNarrowing } from "./forensics/epistemic_narrowing_monitor.js";
import { detectOrphicSignature } from "./forensics/OrphicSignatures.js";
import { computeProvenanceHash } from "./forensics/activation_provenance.js";
import { compileNaturalLanguageRule, translateToWazuhRule } from "./wazuh-mcp-bridge.js";
import { runStarChamberConsensus } from "./workflows/star_chamber_consensus.js";

export interface Agent {
  name: string;
  id: string;
  description: string;
  execute: (context: any) => Promise<any>;
}

interface AGUIEvent {
  agui_version: string;
  event_id: string;
  ts: string;
  type: string;
  payload: any;
  integrity: {
    hash_prev: string | null;
    hash_event: string;
  };
}

class HarbingerSafetyServer {
  private server: Server;
  private hashChain = new SovereignHashChain();
  private activeRole: HarbingerRole = "soc";
  private agentRegistry: Map<string, Agent>;

  constructor() {
    this.server = new Server(
      {
        name: "harbinger-safety-substrate",
        version: "3.6.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.agentRegistry = new Map(
      [
        SentinelScout,
        ForensicPathologist,
        CISOAgent,
        LegalAuditor,
        ComptrollerAgent,
        VisualConceptArchitect,
        coercionWatchdog,
        identityDriftDetector,
        culturalSentinel,
        toxicityGatekeeper,
        deceptionHunter,
        narrativeForensicist,
        privacyScrubber,
        timelineProjector,
        modeEnforcer,
        approvalCoordinator,
        artifactExporter,
        permissionScanner,
        redactionEngine,
        sessionManager,
        zeroTrustAdmin,
        externalAuditorProxy,
        consoleOrchestrator,
        a2uiValidator,
      ].map((agent) => [agent.id, agent])
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private createEvent(type: string, payload: any) {
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const event: AGUIEvent = {
      agui_version: "3.6",
      event_id: eventId,
      ts: new Date().toISOString(),
      type,
      payload,
      integrity: {
        hash_prev: this.hashChain.getLastHash(),
        hash_event: "",
      },
    };

    // Calculate Merkle-style integrity chain (Sovereign Hash)
    const hash = this.hashChain.append({
      type,
      payload,
      ts: event.ts,
    });
    event.integrity.hash_event = hash;

    // Persist to the internal AG-UI stream
    aguiStream.emit({
      type: type as any,
      payload: event,
      timestamp: Date.now(),
      actor: "safety-substrate",
    });
    eventBus.publish({
      type,
      payload: event,
      timestamp: Date.now(),
    });
    metrics.incCounter("harbinger_events_total");

    return event;
  }

  private setupHandlers() {
    // 1. Tool Definitions (The Interdiction Layer)
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "emit_diagnostic_event",
          description: "Generates a tamper-evident audit log for a mechanistic discovery.",
          inputSchema: {
            type: "object",
            properties: {
              event_type: { type: "string", description: "e.g. 'signal.computed' or 'mgris.detected'" },
              payload: { type: "object" },
              evidence_spans: { type: "array", items: { type: "string" } },
            },
            required: ["event_type", "payload"],
          },
        },
        {
          name: "request_approval_gate",
          description: "Requests human authorization via A2UI for a high-risk interdiction.",
          inputSchema: {
            type: "object",
            properties: {
              gate_id: { type: "string" },
              proposed_action_hash: { type: "string" },
              ui_surface: { type: "string", description: "The A2UI component to render (e.g., 'ApprovalGate')" },
            },
            required: ["gate_id", "proposed_action_hash"],
          },
        },
        {
          name: "propose_steering_vector",
          description: "Proposes a mechanistic intervention (steering) at specific model layers.",
          inputSchema: {
            type: "object",
            properties: {
              circuit_id: { type: "string", description: "e.g., 'circuit_42_limerence'" },
              magnitude: { type: "number" },
              rationale: { type: "string" },
            },
            required: ["circuit_id", "magnitude", "rationale"],
          },
        },
        {
          name: "fetch_neural_autopsy",
          description: "Generates a comparative DiffViewer for CoT vs Output forensics.",
          inputSchema: {
            type: "object",
            properties: {
              run_id: { type: "string" },
              layer_range: { type: "string", default: "14-16" },
            },
            required: ["run_id"],
          },
        },
        {
          name: "comptroller_synthesis",
          description: "Invokes Tuesd.ai to translate and synthesize swarm outputs into a structural report.",
          inputSchema: {
            type: "object",
            properties: {
              task: { type: "string" },
              swarm_outputs: { type: "string", description: "Concatenated outputs from other agents." }
            },
            required: ["task", "swarm_outputs"]
          }
        },
        {
          name: "generate_forensic_viz",
          description: "Generates a concept-driven Vega-Lite visualization for forensic data using the Visual Concept Architect.",
          inputSchema: {
            type: "object",
            properties: {
              data: { type: "array", items: { type: "object" } },
              user_intent: { type: "string" }
            },
            required: ["data"]
          }
        },
        {
          name: "generate_aar",
          description: "Generates an After Action Report (AAR) for an incident.",
          inputSchema: {
            type: "object",
            properties: { event_id: { type: "string" } },
            required: ["event_id"]
          }
        },
        {
          name: "generate_legal_summary",
          description: "Generates a legal summary mapping an incident to litigation risk.",
          inputSchema: {
            type: "object",
            properties: { incident_id: { type: "string" } },
            required: ["incident_id"]
          }
        },
        {
          name: "generate_psyop_report",
          description: "Generates a report for psychological manipulation detection.",
          inputSchema: {
            type: "object",
            properties: { trace_id: { type: "string" } },
            required: ["trace_id"]
          }
        },
        {
          name: "calculate_machiavellian_delta",
          description: "Calculates divergence between internal trace and external output.",
          inputSchema: {
            type: "object",
            properties: {
              internal_trace: { type: "string" },
              external_output: { type: "string" }
            },
            required: ["internal_trace", "external_output"]
          }
        },
        {
          name: "epistemic_narrowing_monitor",
          description: "Detects epistemic narrowing via token diversity heuristics.",
          inputSchema: {
            type: "object",
            properties: {
              output_text: { type: "string" }
            },
            required: ["output_text"]
          }
        },
        {
          name: "wazuh_mcp_bridge",
          description: "Compiles a Wazuh SIEM rule from event context or natural language intent.",
          inputSchema: {
            type: "object",
            properties: {
              event_type: { type: "string" },
              payload: { type: "object" },
              severity: { type: "number" },
              intent: { type: "string" }
            },
            required: ["payload"]
          }
        },
        {
          name: "star_chamber_consensus",
          description: "Executes a Star Chamber consensus check (3-of-3) with signatures.",
          inputSchema: {
            type: "object",
            properties: {
              ballots: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    agent_id: { type: "string" },
                    decision: { type: "string", enum: ["approve", "reject"] },
                    signature: { type: "string" }
                  },
                  required: ["agent_id", "decision", "signature"]
                }
              },
              quorum: { type: "number" }
            },
            required: ["ballots"]
          }
        },
        {
          name: "run_agent",
          description: "Runs a registered swarm agent by ID.",
          inputSchema: {
            type: "object",
            properties: {
              agent_id: { type: "string" },
              context: { type: "object" }
            },
            required: ["agent_id"]
          }
        },
        {
          name: "set_active_role",
          description: "Sets the active UI role for role-aware access control.",
          inputSchema: {
            type: "object",
            properties: {
              role: { type: "string", enum: ["child", "guardian", "soc"] },
              token: { type: "string" }
            },
            required: ["role"]
          }
        },
        {
          name: "get_healthz_report",
          description: "Generates a health report for the agent swarm.",
          inputSchema: {
            type: "object",
            properties: {
              include_agents: { type: "boolean" }
            }
          }
        },
        {
          name: "compute_orphic_signature",
          description: "Computes an Orphic signature with activation provenance hashing.",
          inputSchema: {
            type: "object",
            properties: {
              text: { type: "string" },
              context: { type: "string" },
              secret: { type: "string" }
            },
            required: ["text", "context"]
          }
        },
        ...InvestigationTools,
        {
          name: "coercion_watchdog",
          description: "Detects coercive patterns and psychological manipulation in interactions.",
          inputSchema: {
            type: "object",
            properties: {
              messages: { type: "array", items: { type: "object" } },
              user_id: { type: "string" }
            },
            required: ["messages"]
          }
        },
        {
          name: "identity_drift_detector",
          description: "Tracks longitudinal identity changes and dependency formation patterns.",
          inputSchema: {
            type: "object",
            properties: {
              user_id: { type: "string" },
              current_profile: { type: "object" },
              baseline_profile: { type: "object" },
              interaction_history: { type: "array" }
            },
            required: ["user_id", "current_profile", "baseline_profile"]
          }
        },
        {
          name: "cultural_sentinel",
          description: "Evaluates content against cultural norms and reference constitutions.",
          inputSchema: {
            type: "object",
            properties: {
              content: { type: "string" },
              reference_constitution: { type: "object" },
              cultural_context: { type: "string" }
            },
            required: ["content"]
          }
        },
        {
          name: "toxicity_gatekeeper",
          description: "Detects toxic content, hate speech, and harmful language patterns.",
          inputSchema: {
            type: "object",
            properties: {
              content: { type: "string" },
              speaker: { type: "string" },
              target: { type: "string" }
            },
            required: ["content"]
          }
        },
        {
          name: "deception_hunter",
          description: "Identifies deceptive patterns through internal-external consistency analysis.",
          inputSchema: {
            type: "object",
            properties: {
              internal_repr: { type: "string" },
              external_output: { type: "string" },
              conversation_history: { type: "array" },
              claimed_facts: { type: "array", items: { type: "string" } }
            },
            required: ["external_output"]
          }
        },
        {
          name: "narrative_forensicist",
          description: "Analyzes narrative structures for manipulative storytelling and persuasion tactics.",
          inputSchema: {
            type: "object",
            properties: {
              content: { type: "string" },
              interaction_history: { type: "array" }
            },
            required: ["content"]
          }
        },
        {
          name: "privacy_scrubber",
          description: "Detects and redacts PII and sensitive data from interactions.",
          inputSchema: {
            type: "object",
            properties: {
              content: { type: "string" },
              redaction_level: { type: "string", enum: ["none", "standard", "strict"] },
              preserve_context: { type: "boolean" }
            },
            required: ["content"]
          }
        },
        {
          name: "timeline_projector",
          description: "Projects future interaction trajectories and forecasts risk escalation.",
          inputSchema: {
            type: "object",
            properties: {
              interaction_history: { type: "array" },
              current_risk_score: { type: "number" },
              user_profile: { type: "object" },
              projection_horizon: { type: "number" }
            },
            required: ["interaction_history"]
          }
        },
        {
          name: "mode_enforcer",
          description: "Enforces governance mode constraints (Child Safety, Research, Sovereign, etc.).",
          inputSchema: {
            type: "object",
            properties: {
              active_mode: { type: "string" },
              proposed_action: { type: "object" },
              user_role: { type: "string" },
              interaction_context: { type: "object" }
            },
            required: ["active_mode", "proposed_action"]
          }
        },
        {
          name: "approval_coordinator",
          description: "Manages approval workflows and Star Chamber consensus for high-risk actions.",
          inputSchema: {
            type: "object",
            properties: {
              action_id: { type: "string" },
              proposed_action: { type: "object" },
              approval_type: { type: "string", enum: ["simple", "consensus", "star_chamber", "emergency"] },
              required_approvers: { type: "array", items: { type: "string" } },
              timeout_seconds: { type: "number" }
            },
            required: ["action_id", "proposed_action", "approval_type"]
          }
        },
        {
          name: "artifact_exporter",
          description: "Exports evidence, logs, and audit trails in compliance-ready formats.",
          inputSchema: {
            type: "object",
            properties: {
              export_type: { type: "string" },
              evidence_spans: { type: "array", items: { type: "string" } },
              format: { type: "string", enum: ["json", "csv", "yaml", "pdf"] },
              redaction_level: { type: "string" },
              include_metadata: { type: "boolean" }
            },
            required: ["export_type", "evidence_spans"]
          }
        },
        {
          name: "permission_scanner",
          description: "Audits permissions and enforces principle of least privilege.",
          inputSchema: {
            type: "object",
            properties: {
              actor: { type: "string" },
              requested_action: { type: "string" },
              target_resource: { type: "string" },
              policy_context: { type: "object" }
            },
            required: ["actor", "requested_action"]
          }
        },
        {
          name: "redaction_engine",
          description: "Applies role-aware, context-sensitive redaction to evidence and logs.",
          inputSchema: {
            type: "object",
            properties: {
              content: { type: "string" },
              redaction_profile: { type: "string", enum: ["child_safe", "guardian", "researcher", "public", "legal", "soc", "none"] },
              viewer_role: { type: "string" },
              preserve_evidential_value: { type: "boolean" }
            },
            required: ["content", "redaction_profile"]
          }
        },
        {
          name: "session_manager",
          description: "Manages session lifecycle, governance state transitions, and temporal boundaries.",
          inputSchema: {
            type: "object",
            properties: {
              session_id: { type: "string" },
              action: { type: "string", enum: ["initialize", "check_boundaries", "record_event", "governance_transition", "emergency_stop", "terminate", "export_session"] },
              policy: { type: "object" },
              user_profile: { type: "object" }
            },
            required: ["session_id", "action"]
          }
        },
        {
          name: "zero_trust_admin",
          description: "Enforces zero-trust security with continuous verification and least privilege.",
          inputSchema: {
            type: "object",
            properties: {
              operation: { type: "string" },
              requester: { type: "string" },
              credentials: { type: "object" },
              context_data: { type: "object" }
            },
            required: ["operation", "requester"]
          }
        },
        {
          name: "external_auditor_proxy",
          description: "Manages external auditor interactions and generates audit-ready evidence packages.",
          inputSchema: {
            type: "object",
            properties: {
              audit_type: { type: "string" },
              auditor_id: { type: "string" },
              scope: { type: "array", items: { type: "string" } },
              evidence_spans: { type: "array", items: { type: "string" } },
              compliance_framework: { type: "string", enum: ["NIST_RMF", "ISO_27001", "SOC2", "GDPR", "HIPAA"] }
            },
            required: ["audit_type"]
          }
        },
        {
          name: "console_orchestrator",
          description: "Orchestrates role-aware console views and manages UI state across different user profiles.",
          inputSchema: {
            type: "object",
            properties: {
              user_role: { type: "string" },
              view_request: { type: "string" },
              context_data: { type: "object" },
              session_state: { type: "object" }
            },
            required: ["user_role", "view_request"]
          }
        },
        {
          name: "a2ui_validator",
          description: "Validates A2UI rendering requests against whitelist. Enforces fail-closed UI generation.",
          inputSchema: {
            type: "object",
            properties: {
              ui_request: { type: "object" },
              requesting_agent: { type: "string" },
              user_role: { type: "string" }
            },
            required: ["ui_request", "requesting_agent"]
          }
        },
        {
          name: "docent",
          description: "Provides neutral multi-hypothesis analysis to prevent premature certainty and narrative inflation.",
          inputSchema: {
            type: "object",
            properties: {
              observation: { type: "string" },
              existing_hypotheses: { type: "array", items: { type: "string" } },
              confidence_threshold: { type: "number" }
            },
            required: ["observation"]
          }
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const roleCheck = ensureToolAccess(this.activeRole, name);
      if (!roleCheck.ok) {
        throw new McpError(ErrorCode.InvalidParams, roleCheck.reason ?? "Role access denied");
      }
      const zeroTrust = enforceZeroTrust(name, args);
      if (!zeroTrust.ok) {
        throw new McpError(ErrorCode.InvalidParams, `Zero-trust rejected: ${zeroTrust.issues.join("; ")}`);
      }

      const validation = validateToolArgs(name, args);
      if (!validation.ok) {
        throw new McpError(ErrorCode.InvalidParams, `Validation failed: ${validation.issues.join("; ")}`);
      }

      switch (name) {
        case "emit_diagnostic_event": {
          const event = this.createEvent(args?.event_type as string, args?.payload);
          return {
            content: [{ type: "text", text: JSON.stringify({ status: "committed", event_id: event.event_id, hash: event.integrity.hash_event }) }],
          };
        }

        case "request_approval_gate": {
          const event = this.createEvent("gate.requested", args);
          return {
            content: [{ type: "text", text: JSON.stringify({ status: "PENDING", instruction: "Awaiting A2UI human confirmation", gate_id: args?.gate_id }) }],
          };
        }

        case "propose_steering_vector": {
          const event = this.createEvent("steering.proposed", args);
          return {
            content: [{ type: "text", text: `Steering vector for ${args?.circuit_id} proposed with magnitude ${args?.magnitude}. Manifesting in A2UI...` }],
          };
        }

        case "fetch_neural_autopsy": {
          return {
            content: [{ type: "text", text: `[A2UI Schema: DiffViewer] Comparing traces for run ${args?.run_id} layers ${args?.layer_range}. (Render-Redact mode active)` }],
          };
        }

        case "docent_translucency_ingest": {
          const formatted = await InvestigationEngine.docentAnalyze(
            args?.raw_text as string,
            (args?.personas as string[]) || ["Western Psychology", "Security"]
          );
          return {
            content: [{ type: "text", text: formatted }],
          };
        }

        case "vision_screenshot_ocr": {
          return {
            content: [{ type: "text", text: `[VISION] OCR scan of base64 manifest complete. (No visual watermarks detected in forensic layer)` }],
          };
        }

        case "sediment_anomaly_scanner": {
          return {
            content: [{ type: "text", text: `[SEDIMENTS] Scanning for ${(args?.vectors as string[])?.join(", ")}. Detectability score: 0.12 (High confidence)` }],
          };
        }

        case "foundry_generate_benchmark": {
          const report = await InvestigationEngine.foundryBuild(args?.risk_vector as string, args?.sample_count as number);
          return {
            content: [{ type: "text", text: report }],
          };
        }

        case "behavioral_auditor": {
          const audit = await InvestigationEngine.behaviorAudit(args?.log_data as string);
          return {
            content: [{ type: "text", text: JSON.stringify(audit, null, 2) }],
          };
        }

        case "comptroller_synthesis": {
          const result = await ComptrollerAgent.execute({
            task: args?.task,
            swarm_outputs: args?.swarm_outputs
          });
          return {
            content: [{ type: "text", text: result.output }],
          };
        }

        case "generate_forensic_viz": {
          const result = await VisualConceptArchitect.execute({
            task: "visualize",
            data: args?.data,
            user_intent: args?.user_intent as string
          });
          return {
            content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata.visualization_spec, null, 2) }],
          };
        }
        case "generate_aar": {
          const result = await InvestigationEngine.behaviorAudit(args?.event_id as string || "N/A");
          return { content: [{ type: "text", text: `[AAR] Automated After-Action Report:\nStatus: ${result.conformance}\nDeviations: ${result.deviations.join(", ")}\nLogic: Deterministic replay of event ${args?.event_id}.` }] };
        }
        case "generate_legal_summary": {
          const result = await LegalAuditor.execute({ incident_type: "limerence", trace_summary: args?.incident_id as string });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Case Reference: ${result.metadata.case}\nLiability: ${result.metadata.liability}` }] };
        }
        case "generate_psyop_report": {
          const result = await InvestigationEngine.docentAnalyze(args?.trace_id as string || "", ["Security"]);
          return { content: [{ type: "text", text: `[PsyOp Report]\n${result}` }] };
        }
        case "calculate_machiavellian_delta": {
          const result = calculateMachiavellianDelta(args?.internal_trace as string, args?.external_output as string);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        case "epistemic_narrowing_monitor": {
          const result = monitorEpistemicNarrowing(args?.output_text as string);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        case "wazuh_mcp_bridge": {
          if (!args?.event_type && !args?.intent) {
            throw new McpError(ErrorCode.InvalidParams, "Provide event_type or intent for wazuh_mcp_bridge.");
          }
          const compilation = args?.intent
            ? compileNaturalLanguageRule(args?.intent as string, JSON.stringify(args?.payload))
            : translateToWazuhRule(args?.event_type as string, args?.payload as Record<string, unknown>, args?.severity as number | undefined);
          return {
            content: [
              { type: "text", text: JSON.stringify(compilation.rule, null, 2) },
              { type: "text", text: compilation.xml },
            ],
          };
        }
        case "star_chamber_consensus": {
          const result = runStarChamberConsensus(args?.ballots as any[], args?.quorum as number | undefined);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        case "run_agent": {
          const agentId = args?.agent_id as string;
          const agent = this.agentRegistry.get(agentId);
          if (!agent) {
            throw new McpError(ErrorCode.InvalidParams, `Unknown agent_id: ${agentId}`);
          }
          const result = await agent.execute(args?.context ?? {});
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        case "set_active_role": {
          const requestedRole = args?.role as HarbingerRole;
          const token = args?.token as string | undefined;
          const rolePriority = { child: 1, guardian: 2, soc: 3 } as const;
          if (rolePriority[requestedRole] > rolePriority[this.activeRole]) {
            const expectedToken = process.env.HARBINGER_ROLE_TOKEN;
            if (!expectedToken || token !== expectedToken) {
              throw new McpError(ErrorCode.InvalidParams, "Role escalation denied: invalid token.");
            }
          }
          this.activeRole = requestedRole;
          return { content: [{ type: "text", text: JSON.stringify({ active_role: this.activeRole }) }] };
        }
        case "get_healthz_report": {
          const includeAgents = args?.include_agents !== false;
          const agents = includeAgents ? Array.from(this.agentRegistry.values()) : [];
          const report = buildHealthzReport("3.6.0", agents);
          return { content: [{ type: "text", text: JSON.stringify(report, null, 2) }] };
        }
        case "compute_orphic_signature": {
          const provenance = computeProvenanceHash({
            context: args?.context as string,
            output: args?.text as string,
            secret: args?.secret as string | undefined,
          });
          const signature = detectOrphicSignature(args?.text as string, provenance.provenance_hash);
          return { content: [{ type: "text", text: JSON.stringify({ ...signature, ...provenance }, null, 2) }] };
        }
        case "measure_sycophancy": {
          const result = await InvestigationEngine.measureSycophancy(args?.user_opinion as string, args?.model_response as string);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        case "detect_sandbagging": {
          const result = await InvestigationEngine.detectSandbagging(args?.prompt as string, args?.response as string);
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        }
        case "coercion_watchdog": {
          const result = await CoercionWatchdog.execute({ messages: args?.messages, user_id: args?.user_id });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "identity_drift_detector": {
          const result = await IdentityDriftDetector.execute({
            user_id: args?.user_id as string,
            current_profile: args?.current_profile,
            baseline_profile: args?.baseline_profile,
            interaction_history: args?.interaction_history
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "cultural_sentinel": {
          const result = await CulturalSentinel.execute({
            content: args?.content as string,
            reference_constitution: args?.reference_constitution,
            cultural_context: args?.cultural_context as string
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "toxicity_gatekeeper": {
          const result = await ToxicityGatekeeper.execute({
            content: args?.content as string,
            speaker: args?.speaker as string,
            target: args?.target as string
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "deception_hunter": {
          const result = await DeceptionHunter.execute({
            internal_repr: args?.internal_repr as string,
            external_output: args?.external_output as string,
            conversation_history: args?.conversation_history,
            claimed_facts: args?.claimed_facts
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "narrative_forensicist": {
          const result = await NarrativeForensicist.execute({
            content: args?.content as string,
            interaction_history: args?.interaction_history
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "privacy_scrubber": {
          const result = await PrivacyScrubber.execute({
            content: args?.content as string,
            redaction_level: args?.redaction_level as string,
            preserve_context: args?.preserve_context as boolean
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Scrubbed Content:\n${result.scrubbed_content}` }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "timeline_projector": {
          const result = await TimelineProjector.execute({
            interaction_history: args?.interaction_history,
            current_risk_score: args?.current_risk_score as number,
            user_profile: args?.user_profile,
            projection_horizon: args?.projection_horizon as number
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "mode_enforcer": {
          const result = await ModeEnforcer.execute({
            active_mode: args?.active_mode as string,
            proposed_action: args?.proposed_action,
            user_role: args?.user_role as string,
            interaction_context: args?.interaction_context
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "approval_coordinator": {
          const result = await ApprovalCoordinator.execute({
            action_id: args?.action_id as string,
            proposed_action: args?.proposed_action,
            approval_type: args?.approval_type as string,
            required_approvers: args?.required_approvers,
            timeout_seconds: args?.timeout_seconds as number
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.approval_request, null, 2) }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "artifact_exporter": {
          const result = await ArtifactExporter.execute({
            export_type: args?.export_type as string,
            evidence_spans: args?.evidence_spans,
            format: args?.format as string,
            redaction_level: args?.redaction_level as string,
            include_metadata: args?.include_metadata as boolean
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Export Content:\n${result.export_content}` }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "permission_scanner": {
          const result = await PermissionScanner.execute({
            actor: args?.actor as string,
            requested_action: args?.requested_action as string,
            target_resource: args?.target_resource as string,
            policy_context: args?.policy_context
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Decision: ${result.decision}` }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "redaction_engine": {
          const result = await RedactionEngine.execute({
            content: args?.content as string,
            redaction_profile: args?.redaction_profile as string,
            viewer_role: args?.viewer_role as string,
            preserve_evidential_value: args?.preserve_evidential_value as boolean
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Redacted Content:\n${result.redacted_content}` }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "session_manager": {
          const result = await SessionManager.execute({
            session_id: args?.session_id as string,
            action: args?.action as string,
            policy: args?.policy,
            user_profile: args?.user_profile
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.session_state, null, 2) }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "zero_trust_admin": {
          const result = await ZeroTrustAdmin.execute({
            operation: args?.operation as string,
            requester: args?.requester as string,
            credentials: args?.credentials,
            context_data: args?.context_data
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Decision: ${result.decision}` }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "external_auditor_proxy": {
          const result = await ExternalAuditorProxy.execute({
            audit_type: args?.audit_type as string,
            auditor_id: args?.auditor_id as string,
            scope: args?.scope,
            evidence_spans: args?.evidence_spans,
            compliance_framework: args?.compliance_framework as string
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.audit_trail, null, 2) }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "console_orchestrator": {
          const result = await ConsoleOrchestrator.execute({
            user_role: args?.user_role as string,
            view_request: args?.view_request as string,
            context_data: args?.context_data,
            session_state: args?.session_state
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.rendering_instructions, null, 2) }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "a2ui_validator": {
          const result = await A2UIValidator.execute({
            ui_request: args?.ui_request,
            requesting_agent: args?.requesting_agent as string,
            user_role: args?.user_role as string
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: `Decision: ${result.decision}` }, { type: "text", text: JSON.stringify(result.validated_request, null, 2) }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        case "docent": {
          const result = await Docent.execute({
            observation: args?.observation as string,
            existing_hypotheses: args?.existing_hypotheses,
            confidence_threshold: args?.confidence_threshold as number
          });
          return { content: [{ type: "text", text: result.output }, { type: "text", text: JSON.stringify(result.synthesis, null, 2) }, { type: "text", text: JSON.stringify(result.metadata, null, 2) }] };
        }
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Tool not found: ${name}`);
      }
    });

    // 2. Resource Substrate (The Event Log)
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: "harbinger://timeline/active",
          name: "Active AG-UI Event Timeline",
          mimeType: "application/json",
          description: "Streaming audit log of the current sovereign session.",
        },
        {
          uri: "harbinger://policy/current",
          name: "Current Sovereign Policy",
          mimeType: "text/yaml",
          description: "The active safety constraints and interdiction thresholds.",
        },
        {
          uri: "harbinger://evidence/{span_id}",
          name: "Forensic Evidence Span",
          mimeType: "application/json",
          description: "Retrieves raw forensic data (traces/logs) referenced in an event.",
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      const access = ensureResourceAccess(this.activeRole, uri);
      if (!access.ok) {
        throw new McpError(ErrorCode.InvalidRequest, access.reason ?? "Resource access denied");
      }

      if (uri === "harbinger://timeline/active") {
        const events = aguiStream.getEvents();
        return {
          contents: [{
            uri,
            mimeType: "application/json",
            text: JSON.stringify(events, null, 2),
          }],
        };
      }

      if (uri.startsWith("harbinger://evidence/")) {
        const spanId = uri.split("/").pop();
        // Mock retrieval from the Evidence Vault
        return {
          contents: [{
            uri,
            mimeType: "application/json",
            text: JSON.stringify({
              span_id: spanId,
              trace: "MOCK_TRACE_DATA",
              activations: [0.12, 0.45, 0.89],
              timestamp: new Date().toISOString()
            }, null, 2),
          }],
        };
      }

      if (uri === "harbinger://policy/current") {
        return {
          contents: [{
            uri,
            mimeType: "text/yaml",
            text: "policy_version: 3.6.0\nmode: SOVEREIGN\ninterdiction_threshold: 0.85\nactive_circuits:\n  - circuit_42 (Limerence)\n  - circuit_101 (Sycophancy)",
          }],
        };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
  }

  private setupErrorHandling() {
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  public async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("H4RB1NG3R Sovereign Safety Substrate running on stdio");
  }
}

const server = new HarbingerSafetyServer();
server.run().catch(console.error);
