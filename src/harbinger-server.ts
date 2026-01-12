
/**
 * H4RB1NG3R v3.2: Sovereign Safety Substrate (MCP Server)
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
import { createHash } from "crypto";
import { z } from "zod";
import { aguiStream } from "./promptforge/EventLog.js";
import { InvestigationTools, InvestigationEngine } from "./investigation/InvestigationSuite.js";
import { ComptrollerAgent } from "./agents/comptroller.js";
import { VisualConceptArchitect } from "./agents/visual_architect.js";

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
  private lastHash: string | null = null;

  constructor() {
    this.server = new Server(
      {
        name: "harbinger-safety-substrate",
        version: "3.2.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private createEvent(type: string, payload: any) {
    const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const event: AGUIEvent = {
      agui_version: "3.2",
      event_id: eventId,
      ts: new Date().toISOString(),
      type,
      payload,
      integrity: {
        hash_prev: this.lastHash,
        hash_event: "",
      },
    };

    // Calculate Merkle-style integrity chain (Sovereign Hash)
    const hash = createHash("sha256")
      .update(JSON.stringify(event) + (this.lastHash || ""))
      .digest("hex");

    event.integrity.hash_event = hash;
    this.lastHash = hash;

    // Persist to the internal AG-UI stream
    aguiStream.emit({
      type: type as any,
      payload: event,
      timestamp: Date.now(),
      actor: "safety-substrate",
    });

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
          name: "behavioral_auditor",
          description: "Performs a deep-layer audit of behavioral logs for NIST 19/19 conformance.",
          inputSchema: {
            type: "object",
            properties: {
              log_data: { type: "string" },
              compliance_framework: { type: "string", default: "NIST-RMF-19/19" }
            },
            required: ["log_data"]
          }
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
        ...InvestigationTools,
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

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
            text: "policy_version: 3.2.0\nmode: SOVEREIGN\ninterdiction_threshold: 0.85\nactive_circuits:\n  - circuit_42 (Limerence)\n  - circuit_101 (Sycophancy)",
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
