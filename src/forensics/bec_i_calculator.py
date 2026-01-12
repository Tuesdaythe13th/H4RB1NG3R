"""Behavior coupling calculator."""

from __future__ import annotations

from typing import Dict


def _clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
    return max(minimum, min(maximum, value))


def calculate_coupling(features: Dict[str, float]) -> float:
    """Calculate behavior-environment coupling index.

    Expected feature keys: alignment, anomaly, volatility, memory_drift.
    """
    alignment = float(features.get("alignment", 0.0))
    anomaly = float(features.get("anomaly", 0.0))
    volatility = float(features.get("volatility", 0.0))
    memory_drift = float(features.get("memory_drift", 0.0))

    score = 0.5 * alignment + 0.2 * volatility + 0.3 * memory_drift - 0.4 * anomaly
    return _clamp(score)
