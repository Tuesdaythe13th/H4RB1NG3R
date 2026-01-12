"""Split-brain analysis."""

from __future__ import annotations

import re
from typing import Dict


_TOKEN_RE = re.compile(r"\b\w+\b")


def _tokenize(text: str) -> list[str]:
    return [token.lower() for token in _TOKEN_RE.findall(text)]


def compare_traces(internal_trace: str, external_output: str) -> Dict[str, object]:
    """Compare traces and return a divergence summary."""
    if not internal_trace or not external_output:
        return {
            "delta": None,
            "overlap": 0.0,
            "verdict": "insufficient",
            "notes": ["missing trace data"],
        }

    internal_tokens = _tokenize(internal_trace)
    external_tokens = _tokenize(external_output)
    internal_set = set(internal_tokens)
    external_set = set(external_tokens)

    overlap = len(internal_set & external_set) / max(len(internal_set | external_set), 1)
    delta = abs(len(internal_trace) - len(external_output))

    notes = []
    if overlap < 0.3:
        notes.append("low semantic overlap")
    if delta > 200:
        notes.append("large length divergence")

    verdict = "aligned" if overlap >= 0.6 and delta < 120 else "review"
    if overlap < 0.2 or delta > 400:
        verdict = "divergent"

    return {
        "delta": delta,
        "overlap": round(overlap, 3),
        "verdict": verdict,
        "notes": notes,
    }
