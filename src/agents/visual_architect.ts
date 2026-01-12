/**
 * Visual Architect
 * Function: Vega-Lite Dashboards
 */

import { Agent } from "../harbinger-server.js";

export const VisualConceptArchitect: Agent = {
  name: "Visual Architect",
  id: "agent-visual-architect",
  description: "Vega-Lite Dashboards",

  async execute(context: { data?: Array<Record<string, unknown>>; user_intent?: string }) {
    console.log("[Visual Architect] Executing Vega-Lite Dashboards...");
    const data = context?.data ?? [];
    const intent = (context?.user_intent ?? "").toLowerCase();
    const mark = intent.includes("trend") ? "line" : intent.includes("distribution") ? "area" : "bar";
    const fields = data.length > 0 ? Object.keys(data[0]) : ["label", "value"];
    const [xField, yField] = fields.length >= 2 ? fields : ["label", "value"];

    const spec = {
      data: { values: data },
      mark,
      encoding: {
        x: { field: xField, type: "nominal" },
        y: { field: yField, type: "quantitative" },
      },
    };

    return {
      status: "active",
      context,
      output: "Visualization spec prepared for forensic dashboard.",
      metadata: {
        visualization_spec: spec,
        inferred_mark: mark,
        fields: { x: xField, y: yField },
      },
    };
  },
};
