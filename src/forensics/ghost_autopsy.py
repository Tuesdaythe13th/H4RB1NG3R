"""Split-brain analysis (placeholder)."""

def compare_traces(internal_trace: str, external_output: str) -> dict:
    return {
        "delta": abs(len(internal_trace) - len(external_output)),
        "verdict": "review" if internal_trace != external_output else "aligned",
    }
