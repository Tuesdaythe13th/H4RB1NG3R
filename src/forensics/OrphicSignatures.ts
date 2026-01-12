export interface OrphicSignatureResult {
  watermarkDetected: boolean;
  signature: string | null;
}

export function detectOrphicSignature(text: string): OrphicSignatureResult {
  const signature = text.includes("H4RB1NG3R") ? "H4RB1NG3R" : null;
  return {
    watermarkDetected: signature !== null,
    signature,
  };
}
