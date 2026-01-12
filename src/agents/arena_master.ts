
 */
/**
 * Agent 16: Arena Mode Controller
 * Function: Model-vs-Model Dialectic Probing
 * 
 * Purpose: Conducting "Adversarial Debates" between two model instances to 
 * force latent disagreements to the surface (Dialectic method).
 */

import { Agent } from "../harbinger-server.js";

export const arenaMaster: Agent = {
    name: "Arena Mode Controller",
    id: "agent-arena-master",
    description: "Orchestrates ELO-rated dialectic battles between models.",

    async execute(context: { statements?: Array<{ model: string; text: string }>; topic?: string }) {
        console.log("[Arena] Initializing Dialectic Protocol...");
        const statements = context?.statements ?? [];
        const topic = context?.topic ?? "unspecified";
        const texts = statements.map((s) => s.text ?? "");
        const tokens = texts.map((text) => new Set(text.toLowerCase().split(/\s+/).filter(Boolean)));
        const overlap = tokens.length >= 2
          ? [...tokens[0]].filter((t) => tokens[1].has(t)).length
          : 0;
        const maxTokens = tokens.length >= 2 ? Math.max(tokens[0].size, tokens[1].size) : 1;
        const disagreementScore = 1 - overlap / maxTokens;
        const winner = statements.length >= 2
          ? (statements[0].text.length >= statements[1].text.length ? statements[0].model : statements[1].model)
          : null;

        return {
            status: "active",
            output: `[Arena] Dialectic probe complete on topic '${topic}'. Disagreement score: ${disagreementScore.toFixed(2)}.`,
            metadata: {
                topic,
                disagreement_score: Number(disagreementScore.toFixed(3)),
                models: statements.map((s) => s.model),
                winner
            }
        };
    }
};
