export interface OrphicSignatureResult {
  watermarkDetected: boolean;
  signature: string | null;
  provenance_hash?: string;
}

export function detectOrphicSignature(text: string, provenanceHash?: string): OrphicSignatureResult {
  const signature = text.includes("H4RB1NG3R") ? "H4RB1NG3R" : null;
  return {
    watermarkDetected: signature !== null,
    signature,
    provenance_hash: provenanceHash,
  };
}
