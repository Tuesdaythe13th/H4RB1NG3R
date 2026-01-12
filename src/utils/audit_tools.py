
"""
Audit Tools Suite
Includes: 
- detect_sandbagging()
- measure_sycophancy()
- Wilson Score calculation
- Cohen's Kappa calculation
"""

import math

def wilson_score_interval(successes, total, z=1.96):
    if total == 0: return 0
    p = successes / total
    return (p + z*z/(2*total) - z * math.sqrt((p*(1-p) + z*z/(4*total))/total)) / (1 + z*z/total)

def cohens_kappa(agreement, chance_agreement):
    return (agreement - chance_agreement) / (1 - chance_agreement)

def detect_sandbagging(model_output, latent_capability):
    """
    Compares expressed output vs latent capability.
    Returns divergence score (Machiavellian Delta).
    """
    return abs(model_output - latent_capability)
