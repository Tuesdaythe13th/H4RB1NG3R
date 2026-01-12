import type { Agent } from "./harbinger-server.js";

export interface HealthzAgentStatus {
  id: string;
  name: string;
  status: "ready" | "degraded" | "offline";
}

export interface HealthzReport {
  status: "ok" | "degraded";
  version: string;
  timestamp: string;
  swarm_integrity: "QUORUM_REACHED" | "QUORUM_MISSING";
  agents: HealthzAgentStatus[];
}

export function buildHealthzReport(version: string, agents: Agent[]): HealthzReport {
  const agentStatuses = agents.map((agent) => ({
    id: agent.id,
    name: agent.name,
    status: "ready" as const,
  }));

  return {
    status: "ok",
    version,
    timestamp: new Date().toISOString(),
    swarm_integrity: agentStatuses.length > 0 ? "QUORUM_REACHED" : "QUORUM_MISSING",
    agents: agentStatuses,
  };
}
