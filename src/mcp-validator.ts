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

const toolSchemas: Record<string, z.ZodTypeAny> = {
  emit_diagnostic_event: emitDiagnosticSchema,
  request_approval_gate: approvalGateSchema,
  propose_steering_vector: steeringSchema,
  fetch_neural_autopsy: autopsySchema,
  ingest_transcript: ingestTranscriptSchema,
  scan_screenshot_ocr: scanScreenshotSchema,
  detect_output_anomalies: outputAnomalySchema,
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
