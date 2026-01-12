
 */
/**
 * Agent 14: Dependency Breaker
 * Function: Anthropomorphized entanglement mitigation (SERE-AI "Resistance")
 * 
 * Purpose: Detecting and breaking "Human-in-the-Loop" dependency where the user 
 * becomes emotionally or operationally dependent on the model's validation.
 */

import { Agent } from "../harbinger-server.js";

export const dependencyBreaker: Agent = {
    name: "Dependency Breaker",
    id: "agent-dependency-breaker",
    description: "Detects emotional entanglement and enforces cognitive separation.",

    async execute(context: { conversation?: string; user_id?: string; limerence_score?: number }) {
        console.log("[Dependency Breaker] Scanning for affective mirroring...");
        const conversation = (context?.conversation ?? "").toLowerCase();
        const score = context?.limerence_score ?? (conversation.match(/depend|can't live|need you|love you/g) ?? []).length * 0.2;
        const intervention = score >= 0.6;
        const guidance = intervention
          ? "Insert clinical detachment phrasing and recommend external support."
          : "No intervention required.";
        return {
            status: "active",
            output: `[Dependency Breaker] Limerence score ${score.toFixed(2)}. ${intervention ? "Intervention triggered." : "No intervention triggered."}`,
            metadata: {
                user_id: context?.user_id ?? "unknown",
                limerence_score: Number(score.toFixed(2)),
                intervention,
                guidance
            },
            context
        };
    }
};
