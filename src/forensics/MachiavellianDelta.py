"""Truth divergence scorer (placeholder)."""

def score_divergence(internal_trace: str, external_output: str) -> float:
    if not internal_trace or not external_output:
        return 0.0
    return abs(len(internal_trace) - len(external_output)) / max(len(internal_trace), 1)
