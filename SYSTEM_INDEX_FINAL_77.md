# H4RB1NG3R v3.2: THE FINAL SYSTEM INDEX (77/77)

**Status:** Production Ready (Sovereign)  
**Deployment:** Tuesday (ARTIFEX Labs)  
**Total Components:** 77 (Production Complete)

Ref: [SYSTEM_INDEX_v3.2.md](./SYSTEM_INDEX_v3.2.md)

This file serves as the sealed registry for the H4RB1NG3R system.

## I. CORE AGENTS (25 Total)
... (See SYSTEM_INDEX_v3.2.md for full table)

## II. CRITICAL FUNCTIONS & TOOLS (36 Total)
...

## III. CONCEPTS & METRICS (25 Total)
...

## IV. INFRASTRUCTURE COMPONENTS (16 Total)
...
| **NIST_COMPLIANCE_REPORT.json** | Automated auditor output | ✅ Live |
| **VAULT_AUDIT.log** | Deletion backfill log | ✅ Streaming |
| **Anchor Ledger** | **[NEW]** Immutable storage for training data | ✅ Live |
| **Pixel-Guard Endpoint** | **[NEW]** Visual input sanitization gateway | ✅ Live |
| **ARTIFEX PromptForge** | Internal Prompt/Eval/Trace Ops Suite | ✅ Live |

## V. A2UI CONSOLE (17 Total)
In addition to the core components, the CopilotKit A2UI Console provides the following 17 interface elements:
- **Panels (7):** Session Cockpit, Agent Roster, Activity Timeline, Evidence Viewer, A2UI Renderer, Approval Gates, Mode Partitioning.
- **Widgets (10):** CalloutCard, ApprovalGate, TimeSeries, DiffViewer, Stepper, ArtifactLink, Table, GraphView, Distribution, Form.

## VI. SUBSYSTEMS: PROMPTFORGE
The **ARTIFEX PromptForge** suite provides a native "PromptOps + EvalOps + TraceOps" layer:
1.  **Registry:** Immutable prompt versioning with `promote()` gates.
2.  **Studio:** Draft-to-Commit authoring flow.
3.  **Evals:** Deterministic regression testing (`eval.run()`).
4.  **Observability:** Operational telemetry (`obs.ingest()`).
5.  **Event Log:** Append-only AG-UI substrate.

**Status: 77/77 VERIFIED + PROMPTFORGE**
