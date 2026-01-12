"""Epistemic narrowing monitor with token diversity heuristics."""

def monitor(text: str) -> dict:
    tokens = [t for t in text.lower().split() if t]
    if not tokens:
        return {"token_diversity": 0.0, "repetition_ratio": 0.0, "narrowing_detected": False}
    unique = set(tokens)
    diversity = len(unique) / len(tokens)
    repetition_ratio = (len(tokens) - len(unique)) / len(tokens)
    narrowing = diversity < 0.4 or repetition_ratio > 0.35
    return {
        "token_diversity": round(diversity, 3),
        "repetition_ratio": round(repetition_ratio, 3),
        "narrowing_detected": narrowing,
    }
