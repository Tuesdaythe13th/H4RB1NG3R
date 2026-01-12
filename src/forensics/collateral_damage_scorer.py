"""False positive rate estimator."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict


@dataclass(frozen=True)
class CollateralDamageMetrics:
    false_positive_rate: float
    precision: float
    recall: float
    f1: float


def _safe_divide(numerator: float, denominator: float) -> float:
    if denominator <= 0:
        return 0.0
    return numerator / denominator


def estimate(false_positives: int, total: int) -> float:
    """Return the false positive rate for an alert stream."""
    return _safe_divide(false_positives, total)


def compute_metrics(false_positives: int, true_positives: int, total: int) -> CollateralDamageMetrics:
    """Compute basic alert quality metrics.

    Args:
        false_positives: Number of incorrect positive detections.
        true_positives: Number of correct detections.
        total: Total evaluations.
    """
    false_positive_rate = estimate(false_positives, total)
    precision = _safe_divide(true_positives, true_positives + false_positives)
    recall = _safe_divide(true_positives, total - false_positives)
    f1 = _safe_divide(2 * precision * recall, precision + recall)
    return CollateralDamageMetrics(
        false_positive_rate=false_positive_rate,
        precision=precision,
        recall=recall,
        f1=f1,
    )


def summarize_metrics(metrics: CollateralDamageMetrics) -> Dict[str, float]:
    return {
        "false_positive_rate": metrics.false_positive_rate,
        "precision": metrics.precision,
        "recall": metrics.recall,
        "f1": metrics.f1,
    }
