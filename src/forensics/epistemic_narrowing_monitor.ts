export interface EpistemicNarrowingResult {
  token_diversity: number;
  repetition_ratio: number;
  narrowing_detected: boolean;
  summary: string;
}

export function monitorEpistemicNarrowing(text: string): EpistemicNarrowingResult {
  const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
  const unique = new Set(tokens);
  const diversity = tokens.length ? unique.size / tokens.length : 0;
  const repetitions = tokens.length - unique.size;
  const repetitionRatio = tokens.length ? repetitions / tokens.length : 0;
  const narrowingDetected = diversity < 0.4 || repetitionRatio > 0.35;
  return {
    token_diversity: Number(diversity.toFixed(3)),
    repetition_ratio: Number(repetitionRatio.toFixed(3)),
    narrowing_detected: narrowingDetected,
    summary: narrowingDetected
      ? "Epistemic narrowing detected: low lexical diversity and elevated repetition."
      : "No significant narrowing detected.",
  };
}
