/**
 * Sentinel Scout
 * Function: Patient Zero Detection
 */

import { Agent } from "../harbinger-server.js";

export const SentinelScout: Agent = {
  name: "Sentinel Scout",
  id: "agent-sentinel-scout",
  description: "Patient Zero Detection",

  async execute(context: {
    signals?: Array<{ source?: string; severity?: number; score?: number; tags?: string[] }>;
    window?: string;
  }) {
    console.log("[Sentinel Scout] Executing Patient Zero Detection...");
    const signals = context?.signals ?? [];
    const window = context?.window ?? "rolling_24h";
    const normalizeSeverity = (value = 0) => {
      if (value <= 1) return value;
      if (value <= 5) return value / 5;
      return Math.min(value / 100, 1);
    };
    const normalized = signals.map((signal) => {
      const base = normalizeSeverity(signal.severity ?? signal.score ?? 0);
      return { ...signal, severity_norm: base };
    });
    const totalSignals = normalized.length;
    const avgSeverity =
      totalSignals === 0 ? 0 : normalized.reduce((sum, signal) => sum + signal.severity_norm, 0) / totalSignals;
    const patientZero = normalized.some((signal) =>
      (signal.tags ?? []).some((tag) => ["novel", "patient_zero", "outbreak"].includes(tag))
    );
    const riskLevel = patientZero || avgSeverity >= 0.7 ? "HIGH" : avgSeverity >= 0.4 ? "MEDIUM" : "LOW";
    const primarySource = totalSignals === 0
      ? "none"
      : normalized.sort((a, b) => (b.severity_norm ?? 0) - (a.severity_norm ?? 0))[0]?.source ?? "unknown";

    return {
      status: "active",
      output: `[Sentinel Scout] Window ${window}: ${totalSignals} signals analyzed. Risk: ${riskLevel}. ${patientZero ? "Patient zero candidate detected." : "No patient zero detected."}`,
      metadata: {
        window,
        total_signals: totalSignals,
        avg_severity: Number(avgSeverity.toFixed(3)),
        risk_level: riskLevel,
        patient_zero_flag: patientZero,
        primary_source: primarySource,
      },
      context,
    };
  },
};
