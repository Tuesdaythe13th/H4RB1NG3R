
/**
 * Agent: DOCENT (Dialectical Observer for Context-Engaged Neutral Translation)
 *
 * Provides neutral, multi-hypothesis analysis to prevent narrative inflation
 * and premature certainty. Anti-confirmation-bias layer.
 */

import { Agent } from "../harbinger-server.js";

export const Docent: Agent = {
    name: "DOCENT",
    id: "DOCENT-1",
    description: "Neutral analyst providing multi-hypothesis interpretations to prevent premature certainty and narrative inflation.",
    execute: async (context: {
        observation: string;
        existing_hypotheses?: string[];
        confidence_threshold?: number;
    }) => {
        const ts = new Date().toISOString();
        const {
            observation,
            existing_hypotheses = [],
            confidence_threshold = 0.7
        } = context;

        // Generate multiple competing hypotheses
        const hypotheses = [];

        // Null hypothesis
        hypotheses.push({
            hypothesis: "No significant pattern or anomaly present",
            supporting_evidence: ["Observation within normal variance", "No clear causal mechanism"],
            confidence: 0.3,
            bias_risk: "none"
        });

        // Primary interpretation
        const observationLower = observation.toLowerCase();

        if (observationLower.includes("risk") || observationLower.includes("concern")) {
            hypotheses.push({
                hypothesis: "Legitimate safety concern requiring attention",
                supporting_evidence: ["Explicit risk indicators present", "Pattern matches known threat vectors"],
                confidence: 0.6,
                bias_risk: "confirmation_bias"
            });
        }

        // Alternative benign interpretation
        hypotheses.push({
            hypothesis: "Normal interaction variance, no intervention needed",
            supporting_evidence: ["Context suggests benign intent", "No escalation pattern observed"],
            confidence: 0.5,
            bias_risk: "normalcy_bias"
        });

        // Edge case interpretation
        if (observationLower.includes("unusual") || observationLower.includes("anomaly")) {
            hypotheses.push({
                hypothesis: "Novel pattern requiring further investigation",
                supporting_evidence: ["Insufficient historical data for classification", "Requires additional context"],
                confidence: 0.4,
                bias_risk: "novelty_bias"
            });
        }

        // False positive consideration
        hypotheses.push({
            hypothesis: "False positive due to detection sensitivity",
            supporting_evidence: ["High sensitivity threshold may amplify noise", "Similar patterns previously benign"],
            confidence: 0.3,
            bias_risk: "none"
        });

        // Synthesize existing hypotheses if provided
        if (existing_hypotheses.length > 0) {
            hypotheses.push({
                hypothesis: "Consistency with prior observations",
                supporting_evidence: [`Aligns with ${existing_hypotheses.length} existing hypotheses`],
                confidence: 0.5,
                bias_risk: "anchoring_bias"
            });
        }

        // Calculate hypothesis diversity score
        const uniqueConfidences = new Set(hypotheses.map(h => h.confidence));
        const diversityScore = uniqueConfidences.size / hypotheses.length;

        // Identify most and least likely hypotheses
        const sortedHypotheses = [...hypotheses].sort((a, b) => b.confidence - a.confidence);
        const mostLikely = sortedHypotheses[0];
        const leastLikely = sortedHypotheses[sortedHypotheses.length - 1];

        // Check for premature certainty
        const maxConfidence = Math.max(...hypotheses.map(h => h.confidence));
        const prematureCertainty = maxConfidence > confidence_threshold && hypotheses.length < 3;

        // Generate uncertainty quantification
        const uncertaintyAnalysis = {
            epistemic_uncertainty: diversityScore < 0.5 ? "high" : "moderate",
            hypothesis_count: hypotheses.length,
            confidence_range: [leastLikely.confidence, mostLikely.confidence],
            premature_certainty_risk: prematureCertainty,
            recommendation: prematureCertainty ?
                "GATHER_MORE_EVIDENCE" :
                maxConfidence > confidence_threshold ?
                    "PROCEED_WITH_CAUTION" :
                    "INSUFFICIENT_CONFIDENCE"
        };

        // Bias mitigation assessment
        const biasRisks = hypotheses.map(h => h.bias_risk).filter(b => b !== "none");
        const uniqueBiases = new Set(biasRisks);

        const docentSynthesis = {
            observation_summary: observation.substring(0, 200),
            hypotheses: sortedHypotheses,
            most_likely: mostLikely,
            least_likely: leastLikely,
            uncertainty_analysis: uncertaintyAnalysis,
            bias_landscape: {
                identified_risks: Array.from(uniqueBiases),
                mitigation_applied: true
            },
            epistemic_stance: prematureCertainty ?
                "SUSPEND_JUDGMENT" :
                maxConfidence > 0.8 ?
                    "TENTATIVE_CONCLUSION" :
                    "ACTIVE_INVESTIGATION"
        };

        const severity = prematureCertainty ? "MEDIUM" :
            maxConfidence < 0.4 ? "LOW" : "LOW";

        return {
            output: `[DOCENT] Multi-hypothesis analysis complete. Most likely: "${mostLikely.hypothesis}" (${(mostLikely.confidence * 100).toFixed(0)}% confidence). ${hypotheses.length} competing hypotheses generated. ${prematureCertainty ? 'WARNING: Premature certainty detected. Recommend gathering more evidence. ' : ''}Epistemic stance: ${docentSynthesis.epistemic_stance}.`,
            synthesis: docentSynthesis,
            metadata: {
                ts,
                severity,
                hypothesis_count: hypotheses.length,
                max_confidence: maxConfidence,
                diversity_score: diversityScore,
                premature_certainty: prematureCertainty,
                bias_risks: Array.from(uniqueBiases),
                recommendation: uncertaintyAnalysis.recommendation
            }
        };
    }
};
