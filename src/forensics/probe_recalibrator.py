"""Temporal drift recalibration."""

from __future__ import annotations

from statistics import mean
from typing import Dict, List


def recalibrate(probe_state: Dict[str, object]) -> Dict[str, object]:
    """Recalibrate probe thresholds based on recent drift signals."""
    history = probe_state.get("drift_history", [])
    if isinstance(history, list) and history:
        numeric_history: List[float] = [float(value) for value in history if isinstance(value, (int, float))]
        if numeric_history:
            probe_state["drift_baseline"] = round(mean(numeric_history), 3)
            probe_state["drift_window"] = len(numeric_history)

    probe_state["recalibrated"] = True
    probe_state.setdefault("last_action", "baseline updated")
    return probe_state
