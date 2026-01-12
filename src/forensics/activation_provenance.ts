import { createHmac } from "crypto";

export interface ProvenanceInput {
  context: string;
  output: string;
  secret?: string;
}

export interface ProvenanceResult {
  provenance_hash: string;
  algorithm: string;
}

export function computeProvenanceHash({ context, output, secret }: ProvenanceInput): ProvenanceResult {
  const key = secret ?? process.env.HARBINGER_PROVENANCE_KEY ?? "harbinger-default-key";
  const hmac = createHmac("sha256", key).update(`${context}::${output}`).digest("hex");
  return {
    provenance_hash: hmac,
    algorithm: "HMAC-SHA256",
  };
}
