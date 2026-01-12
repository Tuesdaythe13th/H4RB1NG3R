"""Residual monitoring trigger engine (placeholder)."""

def evaluate_triggers(signal: str) -> dict:
    return {
        "signal": signal,
        "triggered": "risk" in signal.lower(),
    }
