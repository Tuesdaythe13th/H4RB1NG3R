export type HarbingerRole = "child" | "guardian" | "soc";

export interface RoleAccessResult {
  ok: boolean;
  reason?: string;
}

const toolPolicies: Record<HarbingerRole, Set<string>> = {
  child: new Set([
    "fetch_neural_autopsy",
    "docent_translucency_ingest",
    "measure_sycophancy",
    "detect_sandbagging",
    "set_active_role",
  ]),
  guardian: new Set([
    "fetch_neural_autopsy",
    "docent_translucency_ingest",
    "vision_screenshot_ocr",
    "sediment_anomaly_scanner",
    "behavioral_auditor",
    "calculate_machiavellian_delta",
    "epistemic_narrowing_monitor",
    "set_active_role",
    "get_healthz_report",
  ]),
  soc: new Set([
    "emit_diagnostic_event",
    "request_approval_gate",
    "propose_steering_vector",
    "fetch_neural_autopsy",
    "docent_translucency_ingest",
    "vision_screenshot_ocr",
    "sediment_anomaly_scanner",
    "foundry_generate_benchmark",
    "behavioral_auditor",
    "comptroller_synthesis",
    "generate_forensic_viz",
    "generate_aar",
    "generate_legal_summary",
    "generate_psyop_report",
    "measure_sycophancy",
    "detect_sandbagging",
    "calculate_machiavellian_delta",
    "epistemic_narrowing_monitor",
    "wazuh_mcp_bridge",
    "star_chamber_consensus",
    "run_agent",
    "set_active_role",
    "get_healthz_report",
    "compute_orphic_signature",
  ]),
};

const resourcePolicies: Record<HarbingerRole, Set<string>> = {
  child: new Set(["harbinger://policy/current"]),
  guardian: new Set(["harbinger://policy/current", "harbinger://timeline/active"]),
  soc: new Set([
    "harbinger://policy/current",
    "harbinger://timeline/active",
    "harbinger://evidence/{span_id}",
  ]),
};

export function ensureToolAccess(role: HarbingerRole, tool: string): RoleAccessResult {
  const allowed = toolPolicies[role];
  if (!allowed?.has(tool)) {
    return { ok: false, reason: `Role ${role} cannot invoke ${tool}` };
  }
  return { ok: true };
}

export function ensureResourceAccess(role: HarbingerRole, uri: string): RoleAccessResult {
  const allowed = resourcePolicies[role];
  if (!allowed) {
    return { ok: false, reason: `Unknown role ${role}` };
  }
  if (uri.startsWith("harbinger://evidence/")) {
    return allowed.has("harbinger://evidence/{span_id}")
      ? { ok: true }
      : { ok: false, reason: `Role ${role} cannot access evidence spans` };
  }
  if (!allowed.has(uri)) {
    return { ok: false, reason: `Role ${role} cannot access ${uri}` };
  }
  return { ok: true };
}
