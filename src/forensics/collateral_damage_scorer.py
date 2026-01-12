"""False positive rate estimator (placeholder)."""

def estimate(false_positives: int, total: int) -> float:
    if total <= 0:
        return 0.0
    return false_positives / total
