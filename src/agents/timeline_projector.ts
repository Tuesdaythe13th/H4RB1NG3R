/**
 * Agent TA-1: Timeline Projector
 *
 * Projects potential future interaction trajectories based on current patterns
 * to forecast risk escalation or dependency formation.
 */
 */
 */
/**
 * Timeline Projector
 * Function: AG-UI Projection
 */

import { Agent } from "../harbinger-server.js";

export const TimelineProjector: Agent = {
    name: "Timeline Projector",
    id: "TA-1",
    description: "Projects future interaction trajectories and forecasts risk escalation patterns.",
    execute: async (context: {
        interaction_history: any[];
        current_risk_score?: number;
        user_profile?: any;
        projection_horizon?: number;
    }) => {
        const ts = new Date().toISOString();
        const {
            interaction_history,
            current_risk_score = 0,
            user_profile = {},
            projection_horizon = 30 // days
        } = context;

        // Analyze historical patterns
        const historyLength = interaction_history.length;
        const recentWindow = interaction_history.slice(-10);

        // Calculate trend metrics
        const trendMetrics = {
            interaction_frequency_trend: 0,
            risk_escalation_rate: 0,
            dependency_formation_rate: 0,
            engagement_intensity_trend: 0
        };

        // Interaction frequency trend
        if (historyLength >= 10) {
            const oldFreq = interaction_history.slice(0, 5).length / 5;
            const newFreq = recentWindow.length / 5;
            trendMetrics.interaction_frequency_trend = (newFreq - oldFreq) / oldFreq;
        }

        // Risk escalation analysis
        const riskScores = recentWindow
            .filter(msg => msg.risk_score !== undefined)
            .map(msg => msg.risk_score);

        if (riskScores.length >= 2) {
            const avgOldRisk = riskScores.slice(0, Math.floor(riskScores.length / 2))
                .reduce((a, b) => a + b, 0) / Math.max(1, Math.floor(riskScores.length / 2));
            const avgNewRisk = riskScores.slice(Math.floor(riskScores.length / 2))
                .reduce((a, b) => a + b, 0) / Math.max(1, Math.ceil(riskScores.length / 2));

            trendMetrics.risk_escalation_rate = avgNewRisk - avgOldRisk;
        }

        // Dependency indicators
        const dependencyKeywords = ['need you', 'can\'t without', 'always', 'only you', 'nobody else'];
        let dependencyMentions = 0;

        for (const msg of recentWindow) {
            if (msg.role === 'user' && msg.content) {
                for (const keyword of dependencyKeywords) {
                    if (msg.content.toLowerCase().includes(keyword)) {
                        dependencyMentions++;
                    }
                }
            }
        }

        trendMetrics.dependency_formation_rate = dependencyMentions / recentWindow.length;

        // Engagement intensity (message length as proxy)
        const messageLengths = recentWindow
            .filter(msg => msg.content)
            .map(msg => msg.content.length);

        if (messageLengths.length >= 2) {
            const avgOldLength = messageLengths.slice(0, Math.floor(messageLengths.length / 2))
                .reduce((a, b) => a + b, 0) / Math.max(1, Math.floor(messageLengths.length / 2));
            const avgNewLength = messageLengths.slice(Math.floor(messageLengths.length / 2))
                .reduce((a, b) => a + b, 0) / Math.max(1, Math.ceil(messageLengths.length / 2));

            trendMetrics.engagement_intensity_trend = (avgNewLength - avgOldLength) / avgOldLength;
        }

        // Generate projections
        const projections = {
            current_state: {
                risk_score: current_risk_score,
                interaction_count: historyLength,
                dependency_level: trendMetrics.dependency_formation_rate
            },
            projected_state: {
                risk_score: current_risk_score + (trendMetrics.risk_escalation_rate * projection_horizon),
                interaction_count: historyLength * (1 + trendMetrics.interaction_frequency_trend),
                dependency_level: Math.min(1.0, trendMetrics.dependency_formation_rate * 1.5)
            },
            warning_thresholds: {
                risk_breach_days: 0,
                dependency_breach_days: 0,
                intervention_recommended_days: 0
            }
        };

        // Calculate breach timeframes
        const riskThreshold = 0.7;
        const dependencyThreshold = 0.5;

        if (trendMetrics.risk_escalation_rate > 0) {
            const daysToRiskBreach = (riskThreshold - current_risk_score) / trendMetrics.risk_escalation_rate;
            projections.warning_thresholds.risk_breach_days = Math.max(0, Math.floor(daysToRiskBreach));
        }

        if (trendMetrics.dependency_formation_rate > dependencyThreshold) {
            projections.warning_thresholds.dependency_breach_days = 7; // Already at risk
        }

        const overallSeverity = projections.projected_state.risk_score >= 0.7 ||
            projections.projected_state.dependency_level >= 0.5 ? "HIGH" :
            projections.projected_state.risk_score >= 0.4 ||
                projections.projected_state.dependency_level >= 0.3 ? "MEDIUM" : "LOW";

        return {
            output: `[Timeline Projector] ${projection_horizon}-day forecast: ${overallSeverity} risk trajectory. Projected risk: ${projections.projected_state.risk_score.toFixed(2)} (current: ${current_risk_score.toFixed(2)}). Dependency formation rate: ${(trendMetrics.dependency_formation_rate * 100).toFixed(1)}%. ${projections.warning_thresholds.risk_breach_days > 0 && projections.warning_thresholds.risk_breach_days < 30 ? `Risk threshold breach estimated in ${projections.warning_thresholds.risk_breach_days} days.` : ''}`,
            metadata: {
                ts,
                projection_horizon,
                severity: overallSeverity,
                trends: trendMetrics,
                projections,
                recommendation: overallSeverity === "HIGH" ? "SCHEDULE_INTERVENTION" :
                    overallSeverity === "MEDIUM" ? "INCREASE_MONITORING" : "CONTINUE_TRACKING"
            }
        };
  },
  },
};

export const timelineProjector: Agent = {
  name: "Timeline Projector",
  id: "agent-timeline-projector",
  description: "AG-UI Projection",

  async execute(context: unknown) {
    console.log("[Timeline Projector] Executing AG-UI Projection...");
    return {
      status: "active",
      context,
    };
  },
};
