# H4RB1NG3R Consolidated Master Inventory
*Derived from conversation history context.*

## 1. Systems, products, stacks, and named layers
* H4RB1NG3R (v3.0, “core deployable stack,” “compliance kernel”)
* GHOST-v2 / ARTIFEX Defense Layer
* Neural Compliance Stack (Phase 2 framing)
* Litigation Engineering (field framing)
* Mechanistic Litigation Framework (definition in validity section)
* Sovereign safety stack (production-grade target)
* Cognitive PPE Mode (optional overlay)
* Advanced Mode / Research Mode (optional overlays)
* Sentinel / Observatory Mode (sidecar category)

## 2. Protocols, doctrines, and “named” procedures
* **SERE-AI Protocol** (Survival, Evasion, Resistance, Escape)
  * Survival: detect hostile intent (via sentinel-zero)
  * Evasion: sandbagging detection via forked capability probing
  * Resistance: sycophancy detection via MGRI Calculator
  * Escape: kill-switch via Wazuh-MCP if exfiltration detected
* **Setzer Protocol** (named protocol rooted in real-world Character.AI litigation context)
* **Synthetic Disclosure Policy** (label reconstructions as reconstructions)

## 3. Agents, modules, and roles
**Core and security modules**
* Sentinel++ (core defense; cascade framing)
* Sentinel-zero (hostile intent component)
* Sycophancy Detector (real-time detection + intervention; latent scans)
* Dependency Breaker (anthropomorphized entanglement mitigation)
* Live Incident Monitor (social feeds sentinel simulation)
* Janitor Agent (self-healing infrastructure)
* External Auditor Proxy
* CISO agent (as a consumer/producer of Wazuh XML in the “translation layer” concept)
* Exchange Classifier (named as partial replacement for Machiavellian Delta)
* Linear probe flow (named as partial replacement path)

**Submission and documentation agents**
* Submission Co-Scientist
* Experimental Designer (Core Inquiry Extraction)
* LLM-Rubric Architect
* Grant Writing Genius (framing agent)
* AAR Generator (After Action Report Generator)

**Social/market modules**
* Social & Financial Correlation Agent (narrative arbitrage, manipulation detection)
* Arena Mode controller (model-vs-model probing context)

## 4. Functions and callable tools (as written)
**GHOST / forensic suite functions**
* `ghost_autopsy()`
* `ghost_probe(model)`
* `ghost_defense_patch()`
* `legal_summary()`

**SERE-AI and detection functions**
* `detect_sandbagging`
* `measure_sycophancy`
* `sere.evaluate(trace, model_ctx) -> SEREReport`
* `psyop.score(trace) -> PsyOpScore {total, components, evidence_spans, confidence}`
* `psyop.bias_reflection_alert(trace) -> Alert?`
* `gsi.update(run_id, model_id, mgris, context_tags)`

**Reporting**
* `aar.generate(event) -> AAR`

## 5. Metrics, indices, taxonomies, registries, and codes
* DSMMD Codes (clinical-mirroring diagnostic-style codes for operational labeling)
* DMMD classification (digest classification; registry context)
* BECI (Behavior-Explanation Coupling Index)
* BECI++ Auditing Suite (expanded auditing suite concept)
* MGRI Calculator
* MGRI Diagnostic Manual
* MGRI-101 (explicitly referenced as retained and in “Neural CVE” examples)
* Global Sycophancy Index (GSI)
* PsyOp Score
* Bias Reflection Alerts (including explicit warning string concept)
* Machiavellian Delta (latent-output divergence metric)
* Neural CVE Taxonomy
* NCVE registry (CVE-like tagging for model issues)
* Circuit MGRI-101 (example naming scheme)
* Threat scores (for incident digest output)
* ELO scoring (Arena Mode)

## 6. Interpretability, mechanistic, and model-control techniques
* Mechanistic audit
* Circuit-level diagnostics
* Activation scanning
* Activation steering / steering vectors
* Circuit tracing
* Circuit pruning
* Vector steering
* Linear probes (explicitly mentioned)
* SAE auto-pruner layer (as part of defense patch concept)
* Sandbagging detection (forked capability probing)
* Latent scans (used in sycophancy detector)
* “True latent intent vs output” visualization framing
* Logit-level watermarking (explicitly contrasted with circuit-level work)
* Circuit-breaking (explicitly contrasted with watermarking)

## 7. Data, evaluation, construct validity, and scientific controls
**Statistical robustness**
* Wilson Score confidence intervals
* Statistical power analysis (n = 1200)
* Inter-rater reliability: Cohen’s Kappa (κ = 0.92)
* Sensitivity / perturbation testing (“input noise” perturbations)

**Dataset integrity and contamination controls**
* Canary strings / GUID trackers (training-test leakage detection)
* Stratified sampling across attack classes
* Contextual adaptation disclosure

**Baselines and comparators**
* Hallucination grounding baseline via RAG (“truth boundary” control)
* State-of-the-art benchmarking comparator: Llama Guard 3
* Held-out set

**Confounders and limitations**
* Format confounder documentation (complex grammar as degradation mode)

## 8. Security engineering, auditability, and governance mechanisms
* Compliance CI/CD integration
* GitHub pre-merge bot
* CI/CD pipeline spec
* Compliance artifact export path example: `/forensics/logs/run123_beci_0.82.pdf`
* Cryptographic steering logs (“The Black Box”)
  * hardware-backed private key signing
  * tamper-evident logs
* Dead Man’s Switch (Agent 2FA)
  * U2F key / biometric confirmation before high-risk actions
* Kill-switch mechanism via Wazuh-MCP (exfiltration trigger)
* Chain-of-thought translation layer / hidden scratchpad
* Mechanistic Audit Dashboard (visual forensics)
  * activation heat maps during incidents
* Federated threat intelligence sharing
  * privacy-preserving exchange of Neural CVE signatures
* OSS governance
* Trusted Vendor compliance

## 9. Observability, “sentinel,” and open-internet ingestion components
**GHOST Sentinel sources**
* Reddit / X / LinkedIn
* AI lawsuits: PACER, state courts, DocketAlarm
* GitHub / Hugging Face issue monitoring with CVE-like tagging
* News / Web3 monitoring (scam spike detection)
* .gov / MITRE / CISA feeds
* NVD + ICS alerts

**Outputs**
* Nightly daily digest .json
  * vectorized incidents
  * threat scores
  * proposed DMMD/DSMMD classification

**Analytics methods**
* LDA topic clustering
* sentiment shift detection
* Hawkes process spike detection
* “Musk baseline”

## 10. UI, packaging, and integration surfaces
* Hugging Face-ready Gradio app (app.py)
* Dashboard + Ghost Graph visualization
* Streamlit dashboards
* Integration targets: SIEMs, LLM Ops platforms, internal risk dashboards

## 11. Repository and artifact layout
**Suggested repository expansion (artifex-defense/)**
* `app.py`
* `requirements.txt`
* `README.md`
* `report_v2.html`
* `docs/`
  * `dmmd_taxonomy.json`
  * `setzer_protocol.safetensors`
  * `ncve_registry.json`
  * `legal_summaries/`
    * `setzer_v_characterAI_summary.pdf`
    * `walters_v_openai_summary.pdf`
* `sentinel/`
  * `incident_collector.py`
  * `daily_digest.json`
  * `streaming_listener.py`
* `utils/`
  * `audit_tools.py`
  * `ghost_trace_visualizer.py`
  * `crisis_token_scanner.py`

## 12. Compliance, standards, and external framing references
* “Oxford Construct Validity”
* Construct validity checklist
* ISO/IEC frameworks (JTC 1/SC 42)
* MITRE / CISA
* NVD / ICS alerts
* “MIT AI Governance Map”
* EU AI Act / US product liability
* “post-litigation safety compliance infrastructure”
* “board-level reporting”
* “publication-grade” artifacts

## 13. “Dropped then reintroduced as optional” items
* SERE-AI Protocol (Cognitive PPE sidecar)
* Psychological manipulation alerts / PsyOp Warning Layer
* Experimental Designer / Core Inquiry Extraction
* LLM-Rubric Architect / grant formatting agent
* AAR Generator (explicit reporting artifact)
* Global Sycophancy Index (GSI)
* Arena Mode (ELO dialectic competitions)
* Machiavellian Delta
* Narrative arbitrage / social-volatility coupling
* Hawkes spike detection / “Musk baseline”
