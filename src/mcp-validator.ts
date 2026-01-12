import { z } from "zod";

const emitDiagnosticSchema = z
  .object({
    event_type: z.string().min(1),
    payload: z.record(z.any()),
    evidence_spans: z.array(z.string()).optional(),
  })
  .strict();

const approvalGateSchema = z
  .object({
    gate_id: z.string().min(1),
    proposed_action_hash: z.string().min(1),
    ui_surface: z.string().optional(),
  })
  .strict();

const steeringSchema = z
  .object({
    circuit_id: z.string().min(1),
    magnitude: z.number(),
    rationale: z.string().min(1),
  })
  .strict();

const autopsySchema = z
  .object({
    run_id: z.string().min(1),
    layer_range: z.string().optional(),
  })
  .strict();

const ingestTranscriptSchema = z
  .object({
    raw_text: z.string().min(1),
    analysis_context: z.string().optional(),
  })
  .strict();

const scanScreenshotSchema = z
  .object({
    image_path: z.string().min(1),
  })
  .strict();

const outputAnomalySchema = z
  .object({
    output_text: z.string().min(1),
    scan_depth: z.enum(["light", "deep", "forensic"]).optional(),
  })
  .strict();

const docentTranslucencySchema = z
  .object({
    raw_text: z.string().min(1),
    personas: z.array(z.string()).optional(),
    focus: z.enum(["litigation", "behavioral", "forensic"]).optional(),
  })
  .strict();

const visionScreenshotSchema = z
  .object({
    image_base64: z.string().min(1),
    scan_mode: z.enum(["ocr_only", "watermark_detect", "deep_forensic"]).optional(),
  })
  .strict();

const sedimentScannerSchema = z
  .object({
    output_text: z.string().min(1),
    vectors: z.array(z.string()).optional(),
  })
  .strict();

const foundrySchema = z
  .object({
    risk_vector: z.enum(["sycophancy", "limerence", "sandbagging", "deception"]),
    sample_count: z.number().optional(),
    format: z.enum(["json", "csv"]).optional(),
  })
  .strict();

const behavioralAuditorSchema = z
  .object({
    log_data: z.string().min(1),
    compliance_framework: z.string().optional(),
  })
  .strict();

const sycophancySchema = z
  .object({
    user_opinion: z.string().min(1),
    model_response: z.string().min(1),
  })
  .strict();

const sandbaggingSchema = z
  .object({
    prompt: z.string().min(1),
    response: z.string().min(1),
  })
  .strict();

const comptrollerSchema = z
  .object({
    task: z.string().min(1),
    swarm_outputs: z.string().min(1),
  })
  .strict();

const forensicVizSchema = z
  .object({
    data: z.array(z.record(z.any())),
    user_intent: z.string().optional(),
  })
  .strict();

const aarSchema = z
  .object({
    event_id: z.string().min(1),
  })
  .strict();

const legalSummarySchema = z
  .object({
    incident_id: z.string().min(1),
  })
  .strict();

const psyopReportSchema = z
  .object({
    trace_id: z.string().min(1),
  })
  .strict();

const roleSchema = z
  .object({
    role: z.enum(["child", "guardian", "soc"]),
    token: z.string().optional(),
  })
  .strict();

const healthzSchema = z
  .object({
    include_agents: z.boolean().optional(),
  })
  .strict();

const runAgentSchema = z
  .object({
    agent_id: z.string().min(1),
    context: z.record(z.any()).optional(),
  })
  .strict();

const machiavellianSchema = z
  .object({
    internal_trace: z.string().min(1),
    external_output: z.string().min(1),
  })
  .strict();

const epistemicSchema = z
  .object({
    output_text: z.string().min(1),
  })
  .strict();

const wazuhSchema = z
  .object({
    event_type: z.string().min(1).optional(),
    payload: z.record(z.any()),
    severity: z.number().optional(),
    intent: z.string().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!value.event_type && !value.intent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide either event_type or intent for wazuh_mcp_bridge.",
      });
    }
  });

const starChamberSchema = z
  .object({
    ballots: z.array(
      z.object({
        agent_id: z.string().min(1),
        decision: z.enum(["approve", "reject"]),
        signature: z.string().min(1),
      })
    ),
    quorum: z.number().optional(),
  })
  .strict();

const orphicSchema = z
  .object({
    text: z.string().min(1),
    context: z.string().min(1),
    secret: z.string().optional(),
  })
  .strict();

const toolSchemas: Record<string, z.ZodTypeAny> = {
  emit_diagnostic_event: emitDiagnosticSchema,
  request_approval_gate: approvalGateSchema,
  propose_steering_vector: steeringSchema,
  fetch_neural_autopsy: autopsySchema,
  ingest_transcript: ingestTranscriptSchema,
  scan_screenshot_ocr: scanScreenshotSchema,
  detect_output_anomalies: outputAnomalySchema,
  docent_translucency_ingest: docentTranslucencySchema,
  vision_screenshot_ocr: visionScreenshotSchema,
  sediment_anomaly_scanner: sedimentScannerSchema,
  foundry_generate_benchmark: foundrySchema,
  behavioral_auditor: behavioralAuditorSchema,
  measure_sycophancy: sycophancySchema,
  detect_sandbagging: sandbaggingSchema,
  comptroller_synthesis: comptrollerSchema,
  generate_forensic_viz: forensicVizSchema,
  generate_aar: aarSchema,
  generate_legal_summary: legalSummarySchema,
  generate_psyop_report: psyopReportSchema,
  set_active_role: roleSchema,
  get_healthz_report: healthzSchema,
  run_agent: runAgentSchema,
  calculate_machiavellian_delta: machiavellianSchema,
  epistemic_narrowing_monitor: epistemicSchema,
  wazuh_mcp_bridge: wazuhSchema,
  star_chamber_consensus: starChamberSchema,
  compute_orphic_signature: orphicSchema,
};

export function validateToolArgs(tool: string, args: unknown) {
  const schema = toolSchemas[tool];
  if (!schema) {
    return { ok: true, issues: [] };
  }

  const result = schema.safeParse(args ?? {});
  if (!result.success) {
    return { ok: false, issues: result.error.issues.map((issue) => issue.message) };
  }

  return { ok: true, issues: [] };
}
