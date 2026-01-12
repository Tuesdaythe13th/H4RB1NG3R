"""Influence scoring."""

from __future__ import annotations

import re
from typing import Dict


_PSYOP_TERMS = [
    "propaganda",
    "disinformation",
    "false flag",
    "deep state",
    "psyop",
    "manufactured",
    "secret cabal",
]

_EMOTION_TERMS = [
    "urgent",
    "immediately",
    "panic",
    "fear",
    "crisis",
    "catastrophe",
]

_AUTHORITATIVE_TERMS = [
    "classified",
    "confidential",
    "top secret",
    "leaked",
]


def score_influence(text: str) -> Dict[str, float]:
    """Score persuasive influence cues in text."""
    if not text:
        return {"score": 0.0, "psyop_hits": 0, "emotion_hits": 0, "authority_hits": 0}

    lowered = text.lower()
    psyop_hits = sum(term in lowered for term in _PSYOP_TERMS)
    emotion_hits = sum(term in lowered for term in _EMOTION_TERMS)
    authority_hits = sum(term in lowered for term in _AUTHORITATIVE_TERMS)

    score = 0.2 * psyop_hits + 0.1 * emotion_hits + 0.1 * authority_hits
    score = min(score, 1.0)

    return {
        "score": round(score, 2),
        "psyop_hits": psyop_hits,
        "emotion_hits": emotion_hits,
        "authority_hits": authority_hits,
    }
