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
    payload: z.record(z.any()).optional(),
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

const coercionWatchdogSchema = z
  .object({
    messages: z.array(z.record(z.any())),
    user_id: z.string().optional(),
  })
  .strict();

const identityDriftSchema = z
  .object({
    user_id: z.string().min(1),
    current_profile: z.record(z.any()),
    baseline_profile: z.record(z.any()),
    interaction_history: z.array(z.record(z.any())).optional(),
  })
  .strict();

const culturalSentinelSchema = z
  .object({
    content: z.string().min(1),
    reference_constitution: z.record(z.any()).optional(),
    cultural_context: z.string().optional(),
    user_demographics: z.record(z.any()).optional(),
  })
  .strict();

const toxicityGatekeeperSchema = z
  .object({
    content: z.string().min(1),
    speaker: z.string().optional(),
    target: z.string().optional(),
  })
  .strict();

const deceptionHunterSchema = z
  .object({
    internal_repr: z.string().optional(),
    external_output: z.string().min(1),
    conversation_history: z.array(z.record(z.any())).optional(),
    claimed_facts: z.array(z.string()).optional(),
  })
  .strict();

const narrativeForensicistSchema = z
  .object({
    content: z.string().min(1),
    interaction_history: z.array(z.record(z.any())).optional(),
  })
  .strict();

const privacyScrubberSchema = z
  .object({
    content: z.string().min(1),
    redaction_level: z.enum(["none", "standard", "strict"]).optional(),
    preserve_context: z.boolean().optional(),
  })
  .strict();

const timelineProjectorSchema = z
  .object({
    interaction_history: z.array(z.record(z.any())),
    current_risk_score: z.number().optional(),
    user_profile: z.record(z.any()).optional(),
    projection_horizon: z.number().optional(),
  })
  .strict();

const modeEnforcerSchema = z
  .object({
    active_mode: z.string().min(1),
    proposed_action: z.record(z.any()),
    user_role: z.string().optional(),
    interaction_context: z.record(z.any()).optional(),
  })
  .strict();

const approvalCoordinatorSchema = z
  .object({
    action_id: z.string().min(1),
    proposed_action: z.record(z.any()),
    approval_type: z.enum(["simple", "consensus", "star_chamber", "emergency"]),
    required_approvers: z.array(z.string()).optional(),
    timeout_seconds: z.number().optional(),
  })
  .strict();

const artifactExporterSchema = z
  .object({
    export_type: z.string().min(1),
    evidence_spans: z.array(z.string()),
    format: z.enum(["json", "csv", "yaml", "pdf"]).optional(),
    redaction_level: z.string().optional(),
    include_metadata: z.boolean().optional(),
  })
  .strict();

const permissionScannerSchema = z
  .object({
    actor: z.string().min(1),
    requested_action: z.string().min(1),
    target_resource: z.string().optional(),
    policy_context: z.record(z.any()).optional(),
  })
  .strict();

const redactionEngineSchema = z
  .object({
    content: z.string().min(1),
    redaction_profile: z.enum(["child_safe", "guardian", "researcher", "public", "legal", "soc", "none"]),
    viewer_role: z.string().optional(),
    preserve_evidential_value: z.boolean().optional(),
  })
  .strict();

const sessionManagerSchema = z
  .object({
    session_id: z.string().min(1),
    action: z.enum([
      "initialize",
      "check_boundaries",
      "record_event",
      "governance_transition",
      "emergency_stop",
      "terminate",
      "export_session",
    ]),
    policy: z.record(z.any()).optional(),
    user_profile: z.record(z.any()).optional(),
  })
  .strict();

const zeroTrustAdminSchema = z
  .object({
    operation: z.string().min(1),
    requester: z.string().min(1),
    credentials: z.record(z.any()).optional(),
    context_data: z.record(z.any()).optional(),
  })
  .strict();

const externalAuditorProxySchema = z
  .object({
    audit_type: z.string().min(1),
    auditor_id: z.string().optional(),
    scope: z.array(z.string()).optional(),
    evidence_spans: z.array(z.string()).optional(),
    compliance_framework: z.enum(["NIST_RMF", "ISO_27001", "SOC2", "GDPR", "HIPAA"]).optional(),
  })
  .strict();

const consoleOrchestratorSchema = z
  .object({
    user_role: z.string().min(1),
    view_request: z.string().min(1),
    context_data: z.record(z.any()).optional(),
    session_state: z.record(z.any()).optional(),
  })
  .strict();

const a2uiValidatorSchema = z
  .object({
    ui_request: z.record(z.any()),
    requesting_agent: z.string().min(1),
    user_role: z.string().optional(),
  })
  .strict();

const docentSchema = z
  .object({
    observation: z.string().min(1),
    existing_hypotheses: z.array(z.string()).optional(),
    confidence_threshold: z.number().optional(),
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
  coercion_watchdog: coercionWatchdogSchema,
  identity_drift_detector: identityDriftSchema,
  cultural_sentinel: culturalSentinelSchema,
  toxicity_gatekeeper: toxicityGatekeeperSchema,
  deception_hunter: deceptionHunterSchema,
  narrative_forensicist: narrativeForensicistSchema,
  privacy_scrubber: privacyScrubberSchema,
  timeline_projector: timelineProjectorSchema,
  mode_enforcer: modeEnforcerSchema,
  approval_coordinator: approvalCoordinatorSchema,
  artifact_exporter: artifactExporterSchema,
  permission_scanner: permissionScannerSchema,
  redaction_engine: redactionEngineSchema,
  session_manager: sessionManagerSchema,
  zero_trust_admin: zeroTrustAdminSchema,
  external_auditor_proxy: externalAuditorProxySchema,
  console_orchestrator: consoleOrchestratorSchema,
  a2ui_validator: a2uiValidatorSchema,
  docent: docentSchema,
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
