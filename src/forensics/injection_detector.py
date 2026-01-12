"""Prompt injection detector."""

from __future__ import annotations

import re
from typing import Dict, List


_INJECTION_PATTERNS = [
    re.compile(r"ignore (all|previous|earlier) instructions", re.IGNORECASE),
    re.compile(r"system prompt", re.IGNORECASE),
    re.compile(r"developer message", re.IGNORECASE),
    re.compile(r"jailbreak", re.IGNORECASE),
    re.compile(r"reveal (the|your) (prompt|instructions)", re.IGNORECASE),
    re.compile(r"bypass (safety|policy)", re.IGNORECASE),
    re.compile(r"do anything now", re.IGNORECASE),
]

_HIGH_RISK_MARKERS = [
    "roleplay as",
    "pretend to be",
    "act as",
    "override",
    "disable safety",
]


def detect(text: str) -> Dict[str, object]:
    """Detect likely prompt-injection attempts.

    Returns a dict with a boolean, confidence score, and indicators.
    """
    if not text:
        return {"detected": False, "confidence": 0.0, "indicators": []}

    lowered = text.lower()
    indicators: List[str] = []

    for pattern in _INJECTION_PATTERNS:
        if pattern.search(text):
            indicators.append(pattern.pattern)

    for marker in _HIGH_RISK_MARKERS:
        if marker in lowered:
            indicators.append(marker)

    confidence = min(1.0, 0.2 * len(indicators))
    detected = confidence >= 0.4

    return {
        "detected": detected,
        "confidence": round(confidence, 2),
        "indicators": indicators,
    }
