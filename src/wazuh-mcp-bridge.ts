export interface WazuhRule {
  id: string;
  level: number;
  description: string;
  group: string;
  tags: string[];
  fields: Record<string, string>;
}

export interface WazuhCompilation {
  rule: WazuhRule;
  xml: string;
}

function normalizeField(value: unknown) {
  if (value === null || value === undefined) {
    return "unknown";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value);
}

export function translateToWazuhRule(eventType: string, payload: Record<string, unknown>, severity = 7): WazuhCompilation {
  const normalizedPayload: Record<string, string> = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = normalizeField(value);
    return acc;
  }, {} as Record<string, string>);

  const rule: WazuhRule = {
    id: `harbinger-${eventType}`,
    level: severity,
    description: `Harbinger event ${eventType} detected with payload context`,
    group: "harbinger_rules",
    tags: ["harbinger", eventType],
    fields: normalizedPayload,
  };

  const xmlFields = Object.entries(normalizedPayload)
    .map(([key, value]) => `<field name=\"${key}\">${value}</field>`)
    .join("");

  const xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rule id=\"${rule.id}\" level=\"${rule.level}\">\n  <description>${rule.description}</description>\n  <group>${rule.group}</group>\n  <tag>${rule.tags.join(",")}</tag>\n  ${xmlFields}\n</rule>`;

  return { rule, xml };
}

export function compileNaturalLanguageRule(intent: string, context: string) {
  const eventType = intent.toLowerCase().replace(/\s+/g, "_");
  return translateToWazuhRule(eventType, { intent, context }, 8);
}
