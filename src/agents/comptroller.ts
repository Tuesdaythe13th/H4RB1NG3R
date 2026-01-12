/**
 * Comptroller
 * Function: Swarm Orchestration
 */

import { Agent } from "../harbinger-server.js";

export const ComptrollerAgent: Agent = {
  name: "Comptroller",
  id: "agent-comptroller",
  description: "Swarm Orchestration",

  async execute(context: { task?: string; swarm_outputs?: string }) {
    console.log("[Comptroller] Executing Swarm Orchestration...");
    const task = context?.task ?? "synthesize";
    const outputs = (context?.swarm_outputs ?? "").split(/\n+/).filter(Boolean);
    const outputCount = outputs.length;
    const summary = outputs.slice(0, 5).join(" | ");

    return {
      status: "active",
      context,
      output: `Swarm synthesis complete for task \"${task}\". Consolidated ${outputCount} outputs.`,
      metadata: {
        mode: "orchestration",
        task,
        output_count: outputCount,
        preview: summary,
        timestamp: new Date().toISOString(),
      },
    };
  },
};
