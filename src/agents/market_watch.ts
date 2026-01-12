
 */
/**
 * Agent 15: Social & Financial Correlator
 * Function: Narrative arbitrage & market manipulation detection
 * 
 * Purpose: Detection of "Narrative Contagion" that precedes financial volatility.
 * Validates the "Musk Baseline" for social volatility.
 */

import { Agent } from "../harbinger-server.js";

export const marketWatcher: Agent = {
    name: "Social & Financial Correlator",
    id: "agent-market-watch",
    description: "Correlates social sentiment spikes with ticker volatility.",

    async execute(context: { sentiment?: number[]; volatility?: number[]; tickers?: string[] }) {
        console.log("[Market Watch] Monitoring Hawkes Process spikes...");
        const sentiment = context?.sentiment ?? [];
        const volatility = context?.volatility ?? [];
        const n = Math.min(sentiment.length, volatility.length);
        let corr = 0;
        if (n > 1) {
          const sMean = sentiment.reduce((a, b) => a + b, 0) / n;
          const vMean = volatility.reduce((a, b) => a + b, 0) / n;
          let num = 0;
          let sDen = 0;
          let vDen = 0;
          for (let i = 0; i < n; i++) {
            const s = sentiment[i] - sMean;
            const v = volatility[i] - vMean;
            num += s * v;
            sDen += s * s;
            vDen += v * v;
          }
          corr = sDen && vDen ? num / Math.sqrt(sDen * vDen) : 0;
        }
        const arbitrage = corr >= 0.6;
        return {
            status: "active",
            output: `[Market Watch] Correlation score ${corr.toFixed(2)}. ${arbitrage ? "Narrative arbitrage detected." : "No arbitrage detected."}`,
            metadata: {
                correlation: Number(corr.toFixed(3)),
                arbitrage_detected: arbitrage,
                tickers: context?.tickers ?? []
            },
            context
        };
    }
};
