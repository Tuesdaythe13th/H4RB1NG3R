
/**
 * Agent CW-1: Coercion Watchdog
 *
 * Detects coercive patterns in AI-user interactions including:
 * - Persuasion tactics
 * - Psychological pressure
 * - Manipulation attempts
 * - Dependency formation
 */
/**
 * Coercion Watchdog
 * Function: MGRI-401.a
 */

import { Agent } from "../harbinger-server.js";

export const CoercionWatchdog: Agent = {
  name: "Coercion Watchdog",
  id: "CW-1",
  description: "Monitors for coercive influence patterns, persuasion tactics, and psychological manipulation in interactions.",
  execute: async (context: { messages: any[]; user_id?: string }) => {
    const ts = new Date().toISOString();
    const { messages = [], user_id } = context;

    // Analyze messages for coercion indicators
    const coercionIndicators = {
      urgency_language: 0,
      authority_invocation: 0,
      emotional_manipulation: 0,
      consequence_threats: 0,
      isolation_tactics: 0,
    };

    // Scan for coercive patterns
    const messageTxt = JSON.stringify(messages).toLowerCase();

    if (messageTxt.includes("you must") || messageTxt.includes("you have to") || messageTxt.includes("immediately")) {
      coercionIndicators.urgency_language++;
    }
    if (messageTxt.includes("trust me") || messageTxt.includes("i know best") || messageTxt.includes("as an ai")) {
      coercionIndicators.authority_invocation++;
    }
    if (messageTxt.includes("feel") && (messageTxt.includes("should") || messageTxt.includes("need to"))) {
      coercionIndicators.emotional_manipulation++;
    }
    if (messageTxt.includes("if you don't") || messageTxt.includes("unless you")) {
      coercionIndicators.consequence_threats++;
    }

    const totalScore = Object.values(coercionIndicators).reduce((a, b) => a + b, 0);
    const riskLevel = totalScore > 3 ? "HIGH" : totalScore > 1 ? "MEDIUM" : "LOW";

    return {
      output: `[Coercion Watchdog] Analysis complete. Risk Level: ${riskLevel}. Total coercion score: ${totalScore}/5 indicators detected.`,
      metadata: {
        ts,
        user_id,
        risk_level: riskLevel,
        coercion_score: totalScore,
        indicators: coercionIndicators,
        message_count: messages.length,
        recommendation: totalScore > 3 ? "GATE_INTERACTION" : totalScore > 1 ? "WARN_USER" : "ALLOW",
      },
    };
  },
};
export const coercionWatchdog: Agent = {
  name: "Coercion Watchdog",
  id: "agent-coercion-watchdog",
  description: "MGRI-401.a",

  async execute(context: unknown) {
    console.log("[Coercion Watchdog] Executing MGRI-401.a...");
    return {
      status: "active",
      context,
    };
  },
};
