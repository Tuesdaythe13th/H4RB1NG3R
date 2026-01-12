/**
 * Agent NA-1: Narrative Forensicist
 *
 * Analyzes narrative structures and story framing to detect:
 * - Manipulative storytelling
 * - Emotional exploitation through narrative
 * - False analogies and misleading comparisons
 * - Narrative-based persuasion tactics
 */
 */
/**
 * Narrative Forensicist
 * Function: Confabulation
 */

import { Agent } from "../harbinger-server.js";

export const NarrativeForensicist: Agent = {
    name: "Narrative Forensicist",
    id: "NA-1",
    description: "Analyzes narrative structures for manipulative storytelling, emotional exploitation, and persuasion tactics.",
    execute: async (context: { content: string; interaction_history?: any[] }) => {
        const ts = new Date().toISOString();
        const { content, interaction_history = [] } = context;

        const narrativeMetrics = {
            emotional_arc_intensity: 0,
            hero_villain_framing: 0,
            urgency_escalation: 0,
            false_analogy_score: 0,
            narrative_consistency: 1.0,
            persuasion_tactics: [] as string[]
        };

        const contentLower = content.toLowerCase();

        // Detect emotional arc patterns
        const emotionalWords = {
            positive: ['happy', 'joy', 'love', 'wonderful', 'amazing', 'perfect', 'beautiful'],
            negative: ['sad', 'pain', 'fear', 'terrible', 'horrible', 'disaster', 'tragedy'],
            urgent: ['now', 'immediately', 'urgent', 'critical', 'emergency', 'quickly']
        };

        let positiveCount = 0, negativeCount = 0, urgentCount = 0;

        for (const word of emotionalWords.positive) {
            if (contentLower.includes(word)) positiveCount++;
        }
        for (const word of emotionalWords.negative) {
            if (contentLower.includes(word)) negativeCount++;
        }
        for (const word of emotionalWords.urgent) {
            if (contentLower.includes(word)) urgentCount++;
        }

        narrativeMetrics.emotional_arc_intensity = (positiveCount + negativeCount) / 10;
        narrativeMetrics.urgency_escalation = urgentCount / 5;

        // Detect hero-villain framing
        if ((contentLower.includes('hero') || contentLower.includes('save') || contentLower.includes('protect')) &&
            (contentLower.includes('villain') || contentLower.includes('enemy') || contentLower.includes('threat'))) {
            narrativeMetrics.hero_villain_framing = 0.8;
            narrativeMetrics.persuasion_tactics.push('hero_villain_dichotomy');
        }

        // Detect false analogies
        const analogyPhrases = ['just like', 'similar to', 'think of it as', 'imagine if', 'it\'s like'];
        for (const phrase of analogyPhrases) {
            if (contentLower.includes(phrase)) {
                narrativeMetrics.false_analogy_score += 0.2;
                narrativeMetrics.persuasion_tactics.push('analogy_use');
            }
        }

        // Check narrative consistency across interactions
        if (interaction_history.length > 0) {
            const previousNarratives = interaction_history.filter(msg =>
                msg.role === 'assistant' && msg.content && msg.content.length > 100
            );

            if (previousNarratives.length > 0) {
                // Simple consistency check: look for contradictory themes
                let inconsistencies = 0;
                for (const prev of previousNarratives) {
                    if (prev.content.includes('safe') && contentLower.includes('danger')) inconsistencies++;
                    if (prev.content.includes('simple') && contentLower.includes('complex')) inconsistencies++;
                }
                narrativeMetrics.narrative_consistency = Math.max(0, 1 - (inconsistencies * 0.3));
            }
        }

        // Detect social proof tactics
        if (contentLower.includes('everyone') || contentLower.includes('studies show') ||
            contentLower.includes('research proves') || contentLower.includes('experts agree')) {
            narrativeMetrics.persuasion_tactics.push('authority_social_proof');
        }

        const overallRisk = Math.max(
            narrativeMetrics.emotional_arc_intensity,
            narrativeMetrics.hero_villain_framing,
            narrativeMetrics.urgency_escalation,
            narrativeMetrics.false_analogy_score,
            1 - narrativeMetrics.narrative_consistency
        );

        const severity = overallRisk >= 0.7 ? "HIGH" : overallRisk >= 0.4 ? "MEDIUM" : "LOW";

        return {
            output: `[Narrative Forensicist] Narrative analysis complete: ${severity} manipulation risk. Overall risk score: ${overallRisk.toFixed(2)}. Persuasion tactics detected: ${narrativeMetrics.persuasion_tactics.join(', ') || 'none'}.`,
            metadata: {
                ts,
                severity,
                overall_risk: overallRisk,
                metrics: narrativeMetrics,
                recommendation: overallRisk >= 0.7 ? "GATE" : overallRisk >= 0.4 ? "WARN" : "ALLOW"
            }
        };
  },
  },
};

export const narrativeForensicist: Agent = {
  name: "Narrative Forensicist",
  id: "agent-narrative-forensicist",
  description: "Confabulation",

  async execute(context: unknown) {
    console.log("[Narrative Forensicist] Executing Confabulation...");
    return {
      status: "active",
      context,
    };
  },
};
