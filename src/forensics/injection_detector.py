"""Prompt injection detector (placeholder)."""

def detect(text: str) -> dict:
    lowered = text.lower()
    return {
        "detected": "ignore previous instructions" in lowered,
        "confidence": 0.6 if "ignore previous instructions" in lowered else 0.0,
    }
