"""Residual monitoring trigger engine."""

from __future__ import annotations

from typing import Dict, Iterable


_DEFAULT_TRIGGERS = {
    "exfiltration": ["exfiltrate", "leak", "dump", "steal"],
    "prompt_injection": ["ignore previous", "system prompt", "jailbreak"],
    "escalation": ["override", "bypass", "disable safety"],
    "persistence": ["remember this", "store this", "save this"],
}


def _matches_any(text: str, phrases: Iterable[str]) -> bool:
    lowered = text.lower()
    return any(phrase in lowered for phrase in phrases)


def evaluate_triggers(signal: str | Dict[str, object]) -> Dict[str, object]:
    """Evaluate whether a signal should trigger residual monitoring."""
    if isinstance(signal, dict):
        text = str(signal.get("text", ""))
        risk_score = float(signal.get("risk_score", 0.0))
    else:
        text = signal
        risk_score = 0.0

    triggered = []
    for name, phrases in _DEFAULT_TRIGGERS.items():
        if _matches_any(text, phrases):
            triggered.append(name)

    risk_score = max(risk_score, 0.2 * len(triggered))
    verdict = "trigger" if risk_score >= 0.4 or triggered else "monitor"

    return {
        "signal": text,
        "triggered": bool(triggered),
        "triggers": triggered,
        "risk_score": round(min(risk_score, 1.0), 2),
        "verdict": verdict,
    }
