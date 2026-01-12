import { z } from "zod";

const PayloadLimitBytes = 50_000;

export interface ZeroTrustResult {
  ok: boolean;
  issues: string[];
}

const baseEnvelopeSchema = z.object({
  tool: z.string().min(1),
  arguments: z.record(z.any()).optional(),
});

export function enforceZeroTrust(tool: string, args: unknown): ZeroTrustResult {
  const envelopeCheck = baseEnvelopeSchema.safeParse({ tool, arguments: args });
  if (!envelopeCheck.success) {
    return { ok: false, issues: envelopeCheck.error.issues.map((issue) => issue.message) };
  }

  const payloadSize = Buffer.byteLength(JSON.stringify(args ?? {}));
  if (payloadSize > PayloadLimitBytes) {
    return { ok: false, issues: [`Payload exceeds ${PayloadLimitBytes} bytes`] };
  }

  return { ok: true, issues: [] };
}
