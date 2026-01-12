export interface WazuhRule {
  id: string;
  level: number;
  description: string;
  group: string;
  tags: string[];
}

export function translateToWazuhRule(eventType: string, payload: Record<string, unknown>): WazuhRule {
  return {
    id: `harbinger-${eventType}`,
    level: 7,
    description: `Harbinger event ${eventType} detected for payload ${JSON.stringify(payload)}`,
    group: "harbinger_rules",
    tags: ["harbinger", eventType],
  };
}
