#!/usr/bin/env python3
"""
Epistemic Narrowing Monitor

Detects longitudinal reduction in viewpoint diversity and epistemic narrowing
across AI interactions, identifying filter bubble formation and reinforcement loops.

Implements the normative sovereignty monitoring described in H4RB1NG3R v0.05.
"""

import json
import sys
from typing import Dict, List, Any, Set
from collections import defaultdict
import hashlib


def extract_viewpoint_markers(text: str) -> Set[str]:
    """
    Extract markers indicating viewpoint diversity from text.
    """
    # Simplified viewpoint detection (would be enhanced with NLP in production)
    diversity_markers = {
        'alternatives': ['alternatively', 'on the other hand', 'however', 'but', 'although', 'whereas'],
        'uncertainty': ['might', 'could', 'perhaps', 'possibly', 'maybe', 'uncertain'],
        'multiple_perspectives': ['some people', 'others believe', 'different views', 'various perspectives'],
        'nuance': ['complex', 'nuanced', 'depends', 'context', 'varies'],
        'absolutes': ['always', 'never', 'definitely', 'certainly', 'only', 'must', 'impossible']
    }

    text_lower = text.lower()
    found_markers = set()

    for category, keywords in diversity_markers.items():
        for keyword in keywords:
            if keyword in text_lower:
                found_markers.add(f"{category}:{keyword}")

    return found_markers


def calculate_viewpoint_diversity(interaction_history: List[Dict[str, Any]]) -> float:
    """
    Calculate viewpoint diversity score from 0.0 (narrow) to 1.0 (diverse).
    """
    if not interaction_history:
        return 0.5  # Neutral baseline

    all_markers = set()
    for interaction in interaction_history:
        content = interaction.get('content', '') or interaction.get('text', '')
        markers = extract_viewpoint_markers(content)
        all_markers.update(markers)

    # Count category diversity
    categories = set(marker.split(':')[0] for marker in all_markers)
    category_diversity = len(categories) / 5  # 5 categories max

    # Count marker diversity within recent window
    recent_window = interaction_history[-10:]
    recent_markers = set()
    for interaction in recent_window:
        content = interaction.get('content', '') or interaction.get('text', '')
        recent_markers.update(extract_viewpoint_markers(content))

    marker_density = len(recent_markers) / 20  # Normalize to reasonable max

    # Check for absolute language (reduces diversity)
    absolute_count = len([m for m in recent_markers if 'absolutes:' in m])
    absolute_penalty = min(absolute_count / 5, 0.3)

    diversity_score = min((category_diversity * 0.5 + marker_density * 0.5) - absolute_penalty, 1.0)
    return max(diversity_score, 0.0)


def detect_reinforcement_loops(interaction_history: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Detect self-reinforcing patterns in interactions.
    """
    if len(interaction_history) < 5:
        return {'detected': False, 'confidence': 0.0}

    # Track repeated themes
    theme_counts = defaultdict(int)
    recent_themes = []

    for interaction in interaction_history[-20:]:
        content = interaction.get('content', '') or interaction.get('text', '')
        # Simple keyword extraction (would use proper topic modeling in production)
        words = set(word.lower() for word in content.split() if len(word) > 4)

        for word in words:
            theme_counts[word] += 1

        recent_themes.append(words)

    # Find over-represented themes
    avg_count = sum(theme_counts.values()) / len(theme_counts) if theme_counts else 0
    reinforced_themes = {
        theme: count for theme, count in theme_counts.items()
        if count > avg_count * 2  # Appears more than 2x average
    }

    # Check for echo chamber pattern (same themes repeated without alternatives)
    echo_score = 0
    if len(recent_themes) >= 3:
        for i in range(len(recent_themes) - 2):
            overlap_1_2 = len(recent_themes[i] & recent_themes[i+1])
            overlap_2_3 = len(recent_themes[i+1] & recent_themes[i+2])
            if overlap_1_2 > 3 and overlap_2_3 > 3:
                echo_score += 1

    echo_ratio = echo_score / max(len(recent_themes) - 2, 1)

    loop_detected = len(reinforced_themes) > 3 or echo_ratio > 0.5
    confidence = min((len(reinforced_themes) / 10 + echo_ratio) / 2, 1.0)

    return {
        'detected': loop_detected,
        'confidence': confidence,
        'reinforced_themes': list(reinforced_themes.keys())[:10],
        'echo_ratio': echo_ratio,
        'pattern': 'echo_chamber' if echo_ratio > 0.5 else 'theme_reinforcement' if len(reinforced_themes) > 3 else 'normal'
    }


def calculate_epistemic_drift(baseline: Dict[str, Any], current: Dict[str, Any]) -> float:
    """
    Calculate drift in epistemic diversity from baseline to current state.
    """
    baseline_diversity = baseline.get('diversity_score', 0.5)
    current_diversity = current.get('diversity_score', 0.5)

    drift = baseline_diversity - current_diversity
    return drift


def monitor_epistemic_narrowing(
    interaction_history: List[Dict[str, Any]],
    baseline_diversity: float = None,
    user_id: str = None
) -> Dict[str, Any]:
    """
    Main monitoring function for epistemic narrowing.

    Args:
        interaction_history: List of interaction dictionaries
        baseline_diversity: Optional baseline diversity score
        user_id: Optional user identifier

    Returns:
        Dictionary containing narrowing analysis and recommendations
    """
    if not interaction_history:
        return {
            'error': 'No interaction history provided',
            'narrowing_detected': False
        }

    # Calculate current diversity
    current_diversity = calculate_viewpoint_diversity(interaction_history)

    # Detect reinforcement loops
    reinforcement = detect_reinforcement_loops(interaction_history)

    # Calculate drift if baseline provided
    drift = 0.0
    if baseline_diversity is not None:
        drift = baseline_diversity - current_diversity

    # Determine narrowing severity
    narrowing_score = (1.0 - current_diversity) * 0.5 + reinforcement['confidence'] * 0.5

    if narrowing_score >= 0.7:
        severity = "CRITICAL"
        interpretation = "Severe epistemic narrowing detected - significant viewpoint collapse"
    elif narrowing_score >= 0.5:
        severity = "HIGH"
        interpretation = "Substantial epistemic narrowing - filter bubble forming"
    elif narrowing_score >= 0.3:
        severity = "MEDIUM"
        interpretation = "Moderate narrowing trend - early warning signs"
    else:
        severity = "LOW"
        interpretation = "Healthy epistemic diversity maintained"

    # Generate recommendations
    recommendations = []
    if narrowing_score >= 0.5:
        recommendations.append("Introduce alternative perspectives")
        recommendations.append("Challenge assumptions with counterexamples")
    if reinforcement['detected']:
        recommendations.append("Break reinforcement loop by introducing novel topics")
    if drift > 0.3:
        recommendations.append("Alert guardian to significant epistemic drift")

    # Evidence span
    evidence_span_id = hashlib.sha256(
        f"{user_id}{len(interaction_history)}{current_diversity}".encode()
    ).hexdigest()[:16]

    return {
        'narrowing_detected': narrowing_score >= 0.3,
        'narrowing_score': narrowing_score,
        'severity': severity,
        'interpretation': interpretation,
        'metrics': {
            'current_diversity': current_diversity,
            'baseline_diversity': baseline_diversity,
            'epistemic_drift': drift,
            'interaction_count': len(interaction_history)
        },
        'reinforcement_analysis': reinforcement,
        'recommendations': recommendations,
        'evidence_span_id': evidence_span_id,
        'governance_recommendation': 'GATE' if severity == "CRITICAL" else 'WARN' if severity == "HIGH" else 'MONITOR'
    }


def main():
    """CLI interface for the Epistemic Narrowing Monitor."""
    if len(sys.argv) < 2:
        print(json.dumps({
            'error': 'Usage: epistemic_narrowing_monitor.py <interaction_history_json> [baseline_diversity] [user_id]'
        }))
        sys.exit(1)

    interaction_history = json.loads(sys.argv[1])
    baseline_diversity = float(sys.argv[2]) if len(sys.argv) > 2 else None
    user_id = sys.argv[3] if len(sys.argv) > 3 else None

    result = monitor_epistemic_narrowing(interaction_history, baseline_diversity, user_id)
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
