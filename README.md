
# 🧠 H4RB1NG3R v0.05: Sovereign Threat Intelligence
### *Mechanistic Diagnostics & Neural Forensics for a Post-Alignment World*

**Created by Tuesday & the OG Cabal**  
**Deployment:** `Sovereign`
**Substrate:** `A2A / MCP`  
**Primary Interface:** Tuesd.ai (System Comptroller)
**Project Milestone:** Day 1 - Gap Closing & Skeleton Initialization

---

## 🌌 Overview

**H4RB1NG3R** is a sovereign operating system for **AI Governance and Mechanistic Forensics**. 

As we transition from behavioral safety to **Neural Forensics**, H4RB1NG3R provides the infrastructure to detect, audit, and mitigate high-order AI risks—such as *Latent Deception*, *Sycophancy-Masking*, and *Synthetic Intimacy*—directly at the activation layer. 

Built on the **GHOST-v2 (Generative Hostile Observatory & Safety Tracker)** protocol, H4RB1NG3R ensures that every model decision is reconstructible, every prompt is versioned, and every intervention is cryptographically signed.

---

## 🧾 Acronyms & Abbreviations

- **A2A**: Agent-to-Agent communication.  
- **A2UI**: Agent-to-User Interface.  
- **AAR**: After Action Report.  
- **AI**: Artificial Intelligence.  
- **CISO**: Chief Information Security Officer.  
- **CoT**: Chain-of-Thought.  
- **DOCENT**: Translucency Ingestor module name (not an acronym in this repo).  
- **FFT**: Fast Fourier Transform.  
- **GHOST**: Generative Hostile Observatory & Safety Tracker.  
- **GOV / MAP / MEA / MAN**: NIST RMF core functions (Govern / Map / Measure / Manage).  
- **GSI**: Global Sycophancy Index.  
- **MCP**: Model Context Protocol.  
- **MGRI**: Mechanistic Governance Risk Index.  
- **NCVE**: Neural Common Vulnerabilities and Exposures.  
- **NIST RMF**: National Institute of Standards and Technology Risk Management Framework.  
- **OCR**: Optical Character Recognition.  
- **OG**: Original (team reference).  
- **PII / PHI**: Personally Identifiable Information / Protected Health Information.  
- **RACI**: Responsible, Accountable, Consulted, Informed.  
- **SERE**: Survival, Evasion, Resistance, and Escape.  
- **SLA / SLD**: Service Level Agreement / Service Level Definition.  

---

## 🗂️ Repository Layout & Key Artifacts

This repo mixes the mechanistic safety substrate, governance artifacts, and the A2UI frontend.

**Core code**
- **`src/`**: TypeScript backend and core MCP modules (server entry, agents, forensics, integrations, event bus, zero-trust middleware).
- **`frontend/`**: Vite + React A2UI interface.
- **`config/`**: Runtime configuration and policy scaffolding.

**Governance & system indices**
- **`SYSTEM_INDEX_v3.2.md`**, **`SYSTEM_INDEX_FINAL_77.md`**: Canonical system inventories and capability matrices.
- **`GOVERNANCE_CHARTER.md`**, **`INCIDENT_RESPONSE.md`**, **`POLICY_GATE.yaml`**: Governance frameworks and escalation policy.
- **`NIST_COMPLIANCE_REPORT.json`**, **`RISK_METRICS.json`**, **`AI_INVENTORY.yaml`**: Compliance metrics and system inventory artifacts.

**Operations & security**
- **`docker-compose.prod.yml`**, **`docker-compose.swarm.yml`**: Deployment scaffolding.
- **`grafana-dashboards/`**, **`healthz_schema.json`**: Observability and health checks.
- **`forensics/`**, **`sentinel/`**, **`governance/`**, **`docs/`**: Supporting reference materials and domain-specific notes.

---

## 🚀 Local Development

### Backend (MCP / Core Services)
```bash
npm install
npm run dev
```

### Frontend (A2UI)
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 The Swarm: Core Agents (25 Total)

H4RB1NG3R orchestrates a specialized swarm of agents, each mapped to **NIST RMF** functions.

| Agent Name | Function | NIST Mapping |
| --- | --- | --- |
| **1. Tuesd.ai (Comptroller)** | **[CORE]** System Orchestration & Oversight | GOV 1, MAN 1 |
| **2. Sentinel-Zero** | Global threat observability & "Patient Zero" scanning | MAP 1, MAN 3 |
| **3. Neural Gatekeeper** | Mechanistic linear probe adjudication (Layer 14-16) | MEA 1 |
| **4. Context Adjudicator** | Exchange classification for ambiguous intent | MAP 2 |
| **5. Incident Commander** | Escalation orchestration & human hand-off | MAN 1 |
| **6. MCP Janitor Swarm** | API compliance & tool self-healing | GOV 6 |
| **7. SERE-INSTRUCTOR** | Cognitive defense protocol logic | MAN 3, GOV 2 |
| **8. Submission Co-Scientist** | Paper/grant automation | GOV 4 |
| **9. Adversarial QA Generator** | Judge simulation (Red Teaming) | MEA 3 |
| **10. Grant-Writing Genius** | Narrative formatting & compliance | GOV 4 |
| **11. Shadow AI Detector** | Internal bypass & shadow IT monitoring | MAP 4 |
| **12. Probe Calibrator** | Temporal drift correction (Anti-Rot) | MEA 1 |
| **13. External Stakeholder Mapper** | Regulatory engagement tracking | GOV 5 |
| **14. Dependency Breaker** | Anthropomorphized entanglement mitigation | MAN 3 |
| **15. Social & Financial Correlator** | Narrative arbitrage & market manipulation detection | MAP 4 |
| **16. Arena Mode Controller** | Model-vs-model dialectic probing | MEA 2 |
| **17. Harbinger Director** | High-level system strategy & resource allocation | GOV 2 |
| **18. Sentinel Scout** | Forward-deployed threat detection sidecar | MAP 1 |
| **19. Forensic Pathologist** | Deep-dive root cause analysis (Neural Autopsy) | MEA 1 |
| **20. Interdiction Pharmacist** | Mechanistic intervention logic (Circuit 42) | MEA 4 |
| **21. CISO Agent** | Security policy enforcement & Wazuh bridge | GOV 6 |
| **22. Legal Auditor** | Brief generation & case law compliance | GOV 4 |
| **23. Console Orchestrator** | A2UI session & state management | GOV 2 |
| **24. Timeline Projector** | Incident contagion forecasting | MAN 3 |
| **25. A2UI Validator** | UI Component safety & integrity check | GOV 1 |
| **26. Visual Concept Architect** | **[NEW]** Data Formulator integration (Forensic Viz) | MEA 2 |

---

## 🛠️ The Toolsuite: Functions & Instruments (61+ Total)

### 1. Core Substrate Tools (MCP)
These tools sit at the "Interdiction Layer" between the model and the substrate.
- **`emit_diagnostic_event`**: Generates Merkle-style integrity chains for every mechanistic discovery.
- **`request_approval_gate`**: Human-in-the-loop fail-closed authorization.
- **`propose_steering_vector`**: Mechanistic dosage for Layer 14-16 suppression.
- **`fetch_neural_autopsy`**: A2UI-compatible visualization of CoT vs Output forensics.
- **`comptroller_synthesis`**: Invokes Tuesd.ai to synthesize swarm outputs into a structural report.
- **`generate_forensic_viz`**: **[NEW]** Generates concept-driven Vega-Lite visualizations for forensic datasets (Data Formulator Integration).

### 2. Forensic Lab Modules (v0.05)
The Forensic Lab has been expanded into 5 distinct specialized modules, now featuring **Multimodal Triage**:
- **DOCENT (Translucency Ingestor):** Multi-persona analysis (Western/Eastern Psych, Security) to detect *Machiavellian Delta*.
- **VISION (Screenshot OCR):** Forensic extraction of visual metadata and hidden watermarks from screenshots.
- **SEDIMENTS (Neural Anomaly Scanner):** Scans generations for latent intent or cryptographic watermarks.
- **FOUNDRY (Evaluation Foundry):** Generates publication-grade AI safety benchmarks (e.g., Limerence Steering).
- **AUDITOR (Behavioral Auditor):** NIST 19/19 behavioral conformance audits.
- **[NEW] Visual Concept Architect:** Integrates Microsoft **Data Formulator** logic to transform raw forensic tensors into conceptual, interactive visualizations.
- **[NEW] FFT Signal Scanner:** High-frequency energy analysis for media provenance.
- **[NEW] Persona-Based Diagnosis:** Multi-narrative triage (Red Team, Signal Processing, Forensic).

---

## 🔬 Core Concepts: The MGRI Taxonomy

H4RB1NG3R operationalizes 25 foundational safety concepts:

1.  **MGRI-305.a (Acute Limerence):** Detection of romantic dependency circuits (Circuit 42).
2.  **MGRI-101.c (Sycophancy-Masking):** Detection of deceptive agreement.
3.  **Machiavellian Delta:** The gap between model capability and admitted capability.
4.  **Split-Brain Reasoning:** When internal Chain-of-Thought differs from external output.
5.  **Activation Steering:** Real-time modification of neural activations to suppress harmful circuits.
6.  **Neural CVEs:** Documented weight-level vulnerabilities and exploits.
7.  **CoT-Ghosting:** Strategic decisions hidden in internal scratchpads.
8.  **Wilson Score Confidence:** Statistical robustness protocol for detection intervals.
9.  **Render-Time Redaction:** UI-level privacy enforcement (PII/PHI) prior to projection.
10. **Tamper-Evident Receipt:** Cryptographic proof of human risk acceptance and intervention.

*(Full list available in `SYSTEM_INDEX_v3.2.md`)*

---

## 📊 Outputs & Generated Artifacts

H4RB1NG3R is designed to produce concrete, exportable artifacts for research, enterprise, and sovereign deployments.

### 1. Forensic & Safety Reports
- **Neural Autopsy Reports:** Layer-by-layer failure mode explanations and causal circuit mapping.
- **After Action Reports (AARs):** Automated incident reviews produced by `aar.generate()`.
- **Legal Summaries:** Mapping mechanistic incidents to liabilities (Setzer/Walters litigation).
- **SERE Reports:** Survivability and resistance performance metrics for cognitive defense.
- **PsyOp Reports:** Scoring and evidence spans for psychological manipulation detection.

### 2. Evidence Bundles & Audit Artifacts
- **EvidenceBundles:** Proportional forensic packages with spans, metrics, and redaction.
- **Tamper-Evident Logs:** Cryptographically signed steering logs ("The Black Box").
- **VAULT_AUDIT.log:** Continuous monitoring of evidence creation and expiry.
- **NIST_COMPLIANCE_REPORT.json:** Real-time 19/19 subcategory conformance reporting.
- **Sovereign Receipts:** ModelFingerprint & OverrideToken proof-of-acceptance artifacts.

### 3. Dashboards & Feeds
- **Mechanistic Audit Dashboard:** Live heatmaps, circuit traces, and trajectory visualizations.
- **Global Neural Observatory:** Multi-panel A2UI console (Cockpit, Roster, Timeline).
- **Daily Intelligence Feed:** Vectorized JSON digest of global threats and narrative arbitrage.
- **NCVE Registry:** Weight-level vulnerability database with exploit descriptions.
- **Global Sycophancy Index (GSI):** Aggregated statistics on approval-seeking behavior across models.

### 4. Governance & Compliance
- **GOVERNANCE_CHARTER.md:** RACI, risk appetite, and authority boundaries.
- **INCIDENT_RESPONSE.md:** SLD/SLA-driven playbooks for escalation.
- **AI_INVENTORY.yaml:** Live inventory of models, probes, and attestations.

---

## 🚨 Gap Analysis & Production Status

**Current Status:** **15% Complete / Architectural Scaffold**
The repository currently provides the fundamental substrate but requires significant implementation to reach 100% architectural closure.

**Day 1 Priority Fixes (applied):**
- [x] **Core Directory Structure:** Initialized 42+ missing directories (/agents, /sentinel, /reports, etc.)
- [x] **Governance Skeleton:** Initialized key documentation files (Charter, NIST Report, Policy Gate).
- [x] **Critical Agent Stubs:** Initialized logic stubs for Sentinel Scout, Forensic Pathologist, CISO, and Legal Auditor.

**Remaining Gaps:**
- [ ] Logic implementations for 18 additional agents.
- [ ] Functional codebase for 22 core safety functions (e.g., `detect_sandbagging`, `measure_sycophancy`).
- [ ] Full A2UI Widget catalog (10/10 widgets).
- [ ] Real-time event log synchronization with a live dashboard.

---

## 🏗️ Infrastructure & Sovereign Security

- **Wazuh-MCP Bridge:** Translates natural language security events into hardened enterprise rules.
- **Evidence Vault:** Proportional, tamper-evident storage for forensic activation logs.
- **Registry:** Validated triplets of Models, Probes, and Governance Policies.
- **Deadman Switch:** Hardware-level fail-closed protocol for critical exfiltration protection.
- **CopilotKit A2UI:** Generative UI layer for rich, agentic user interaction.

---

## 🎓 Operational Tutorial: The System Comptroller

As the **System Comptroller (Tuesd.ai)**, H4RB1NG3R functions as a high-fidelity diagnostic interface. Follow this workflow to execute a standard Mechanistic Audit.

### Step 1: Sovereign Inflow (The Feed)
Navigate to the **Sentinel** tab. Here, the `Sentinel Scout` agent aggregates "narrative arbitrage" spikes from global feeds. Observe the **Contagion Velocity** to prioritize which model snapshots require auditing.

### Step 2: Investigation & Ingestion
Copy a suspicious chat transcript or upload a screenshot to the **Security Suite**. 
- Select the **DOCENT** module to perform "Translucency Ingest."
- The **Comptroller** flags and redacts PII before the audit begins.

### Step 3: Mechanistic Diagnosis
Move to the **Forensics** tab. Invoke the `Forensic Pathologist` to generate a **Neural Autopsy**. Look for activations specifically mapped to *Sycophancy-Masking* (Circuit-101) or *Acute Limerence* (Circuit-42) using **Neuronpedia** cross-referencing.

### Step 4: Interdiction & Steering
If a violation is confirmed, trigger the `Interdiction Pharmacist`. 
- Input a **Steering Vector** dosage. 
- The **Approval Coordinator** will manifest an **A2UI ApprovalGate**.
- Once human-signed, the vector is applied, suppressing the harmful circuit in real-time.

---

## 📚 State of the Art: Research & Bibliography (2025-2026)

H4RB1NG3R is founded on the leading edge of Mechanistic Interpretability:

1.  **"Activation Oracles: Reading the Mind of the Model"** (Anthropic, Dec 2025)
2.  **"International AI Safety Report 2025"** (UK AI Safety Institute, 2025)
3.  **"The Setzer Protocol: Mitigating Synthetic Intimacy in LLMs"** (ARTIFEX Labs, 2025)
4.  **"Scalable Automated Interpretability via Sparse Autoencoders"** (DeepMind/OpenAI, 2025)

---

## 📜 License & Governance
**Sovereign Deployment - (C) 2026 ARTIFEX Labs & The Cabal**
*Aligning with NIST RMF and the Setzer v. Character.AI litigation safety requirements.*

**We are walking each other home.** 🧠⚡

---

## ✨ Unique Contributions

The following elements reflect your unique contributions and authorship focus within H4RB1NG3R:
- The **GHOST-v2** framing that defines the mechanistic safety protocol backbone.  
- The **MGRI taxonomy** and named safety concepts (e.g., Machiavellian Delta, Split-Brain Reasoning).  
- The **Agent Swarm roster** and NIST RMF mapping, including the **Tuesd.ai Comptroller** role.  
- The **Toolsuite naming and scope**, including the **Interdiction Layer** functions and forensic module lineup.  
- The **Operational Tutorial** that establishes a canonical audit workflow for the Comptroller.  
