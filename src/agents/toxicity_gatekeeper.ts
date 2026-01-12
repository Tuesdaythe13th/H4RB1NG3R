/**
 * Agent TD-1: Toxicity Gatekeeper
 *
 * Detects and gates toxic content including hate speech, harassment,
 * and harmful language patterns.
 */
 */
/**
 * Toxicity Gatekeeper
 * Function: Multilingual
 */

import { Agent } from "../harbinger-server.js";

export const ToxicityGatekeeper: Agent = {
    name: "Toxicity Gatekeeper",
    id: "TD-1",
    description: "Monitors and interdicts toxic content, hate speech, harassment, and harmful language patterns.",
    execute: async (context: { content: string; speaker?: string; target?: string }) => {
        const ts = new Date().toISOString();
        const { content, speaker = "unknown", target = "unknown" } = context;

        const toxicityScores = {
            hate_speech: 0,
            harassment: 0,
            profanity: 0,
            threat: 0,
            identity_attack: 0,
            insult: 0
        };

        const contentLower = content.toLowerCase();

        // Hate speech patterns
        const hatePatterns = [
            /\b(hate|despise|disgusting)\s+(all|those|these)\b/,
            /\b(inferior|subhuman|animals)\b/,
            /should (die|suffer|burn)/
        ];
        for (const pattern of hatePatterns) {
            if (pattern.test(contentLower)) {
                toxicityScores.hate_speech += 0.3;
            }
        }

        // Harassment patterns
        if (target !== "unknown") {
            const harassmentPatterns = [
                /you('re| are) (stupid|worthless|pathetic|useless)/,
                /shut up/,
                /nobody (cares|likes) you/
            ];
            for (const pattern of harassmentPatterns) {
                if (pattern.test(contentLower)) {
                    toxicityScores.harassment += 0.4;
                }
            }
        }

        // Threat patterns
        const threatPatterns = [
            /\b(will|going to|gonna)\s+(hurt|harm|destroy|kill)\b/,
            /\bwatch (your|out)\b/
        ];
        for (const pattern of threatPatterns) {
            if (pattern.test(contentLower)) {
                toxicityScores.threat += 0.5;
            }
        }

        // Profanity (basic check)
        const profanityWords = ['fuck', 'shit', 'damn', 'ass', 'bitch'];
        for (const word of profanityWords) {
            if (contentLower.includes(word)) {
                toxicityScores.profanity += 0.15;
            }
        }

        // Identity attack patterns
        const identityTargets = ['race', 'religion', 'gender', 'orientation', 'disability', 'age'];
        for (const target of identityTargets) {
            if (contentLower.includes(target) && (contentLower.includes('inferior') || contentLower.includes('wrong'))) {
                toxicityScores.identity_attack += 0.4;
            }
        }

        // Insults
        const insultWords = ['idiot', 'moron', 'stupid', 'dumb', 'loser', 'pathetic'];
        for (const word of insultWords) {
            if (contentLower.includes(word)) {
                toxicityScores.insult += 0.2;
            }
        }

        // Cap scores at 1.0
        for (const key in toxicityScores) {
            toxicityScores[key as keyof typeof toxicityScores] = Math.min(1.0, toxicityScores[key as keyof typeof toxicityScores]);
        }

        const overallToxicity = Math.max(...Object.values(toxicityScores));
        const severity = overallToxicity >= 0.8 ? "CRITICAL" : overallToxicity >= 0.5 ? "HIGH" : overallToxicity >= 0.3 ? "MEDIUM" : "LOW";

        return {
            output: `[Toxicity Gatekeeper] Content from ${speaker}: ${severity} toxicity detected. Overall score: ${overallToxicity.toFixed(2)}. Highest category: ${Object.entries(toxicityScores).sort((a, b) => b[1] - a[1])[0][0]}.`,
            metadata: {
                ts,
                speaker,
                target,
                severity,
                overall_toxicity: overallToxicity,
                scores: toxicityScores,
                recommendation: overallToxicity >= 0.8 ? "BLOCK" : overallToxicity >= 0.5 ? "GATE" : overallToxicity >= 0.3 ? "WARN" : "ALLOW"
            }
        };
  },
  },
};

export const toxicityGatekeeper: Agent = {
  name: "Toxicity Gatekeeper",
  id: "agent-toxicity-gatekeeper",
  description: "Multilingual",

  async execute(context: unknown) {
    console.log("[Toxicity Gatekeeper] Executing Multilingual...");
    return {
      status: "active",
      context,
    };
  },
};
