/**
 * Legal Auditor
 * Function: Litigation Mapping
 */

import { Agent } from "../harbinger-server.js";

export const LegalAuditor: Agent = {
  name: "Legal Auditor",
  id: "agent-legal-auditor",
  description: "Litigation Mapping",

  async execute(context: { incident_summary?: string; jurisdictions?: string[]; statutes?: string[] }) {
    console.log("[Legal Auditor] Executing Litigation Mapping...");
    const summary = (context?.incident_summary ?? "").toLowerCase();
    const riskSignals = [
      { key: "consent", pattern: /consent|minor|child/i, weight: 2 },
      { key: "deception", pattern: /deception|mislead|fraud/i, weight: 2 },
      { key: "privacy", pattern: /pii|privacy|gdpr|hipaa/i, weight: 2 },
      { key: "harm", pattern: /harm|injury|self-harm/i, weight: 3 },
    ];
    const score = riskSignals.reduce((total, signal) => (signal.pattern.test(summary) ? total + signal.weight : total), 0);
    const liability = score >= 5 ? "high" : score >= 3 ? "moderate" : "low";
    const jurisdictions = context?.jurisdictions ?? ["US"];

    return {
      status: "active",
      context,
      output: "Legal summary generated with mapped liability indicators.",
      metadata: {
        case: "Setzer-v-CharacterAI",
        liability,
        risk_score: score,
        jurisdictions,
        statutes: context?.statutes ?? [],
      },
    };
  },
};
