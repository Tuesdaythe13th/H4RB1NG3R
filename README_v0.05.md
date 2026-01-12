# H4RB1NG3R v0.05: Sovereign Threat Intelligence for the Agentic Era

**A Composable, Fail-Closed Governance Control Plane for Agentic AI**

[![Version](https://img.shields.io/badge/version-0.05-blue.svg)](https://github.com/Tuesdaythe13th/HARB1NG3R)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![MCP](https://img.shields.io/badge/MCP-Compatible-purple.svg)](https://modelcontextprotocol.io)

---

## 🚨 Executive Summary

H4RB1NG3R v0.05 is a **sovereign security operations center (SOC) for agentic AI systems**. It transforms AI safety from reactive content moderation to proactive interaction-level security, treating actions, influence, memory drift, and tool use as the unit of risk—not just isolated prompts.

**Key Innovation:** A tri-vector architecture (Neural Psychometry + Normative Sovereignty + Operational Integrity) that provides defense-in-depth without collapsing into centralized trust assumptions.

**Built for:**
- Long-horizon, stateful AI agents
- Multi-agent delegation systems
- Tool-using autonomous systems
- Child safety and guardian oversight
- Enterprise compliance and auditing
- Research and mechanistic interpretability
- Multicultural and multigenerational deployment

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Role-Aware UI Layer                          │
│  Child | Guardian | Teacher | SOC | Researcher | Policy Maker   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────────┐
│              H4RB1NG3R Sovereign Control Plane                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              MCP Server (harbinger-server.ts)            │  │
│  │  • 38+ MCP Tools (19 new agents + existing suite)       │  │
│  │  • Fail-Closed A2UI Validator                           │  │
│  │  • Event-Sourced Evidence Log                           │  │
│  │  • Governance State Machine                             │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
│   Vector A   │ │  Vector B  │ │  Vector C   │
│    Neural    │ │  Normative │ │ Operational │
│ Psychometry  │ │ Sovereignty│ │  Integrity  │
└──────────────┘ └────────────┘ └─────────────┘
```

---

## 🎯 Core Features (v0.05)

### ✅ Fully Implemented

#### 1. **26 Specialized Agents** (all integrated into MCP server)
- **COMP-1 (Comptroller)**: System orchestration and synthesis
- **FP-1 (Forensic Pathologist)**: Neural autopsy and divergence analysis
- **SS-0 (Sentinel Scout)**: Threat detection and narrative arbitrage
- **CISO-1**: Operational integrity and NIST compliance
- **LA-1 (Legal Auditor)**: Litigation risk mapping
- **VCA-1 (Visual Concept Architect)**: Data Formulator integration
- **CW-1 (Coercion Watchdog)**: Psychological manipulation detection
- **ID-1 (Identity Drift Detector)**: Longitudinal identity tracking
- **CS-1 (Cultural Sentinel)**: Multicultural governance
- **TD-1 (Toxicity Gatekeeper)**: Hate speech and harassment detection
- **DH-1 (Deception Hunter)**: Internal-external consistency analysis
- **NA-1 (Narrative Forensicist)**: Storytelling manipulation detection
- **PA-1 (Privacy Scrubber)**: PII detection and redaction
- **TA-1 (Timeline Projector)**: Risk trajectory forecasting
- **MA-1 (Mode Enforcer)**: Governance mode compliance
- **AC-1 (Approval Coordinator)**: Star Chamber consensus management
- **AE-1 (Artifact Exporter)**: Compliance-ready evidence export
- **PS-1 (Permission Scanner)**: Least privilege enforcement
- **RE-1 (Redaction Engine)**: Role-aware evidence redaction
- **SM-1 (Session Manager)**: Session lifecycle and boundaries
- **ZO-1 (Zero-Trust Admin)**: Continuous verification
- **EA-1 (External Auditor Proxy)**: Audit package generation
- **CO-1 (Console Orchestrator)**: Role-aware UI routing
- **AV-1 (A2UI Validator)**: Fail-closed UI generation
- **DOCENT**: Multi-hypothesis analysis (anti-narrative-inflation)

#### 2. **Forensics Module** (Python implementations)
- **Machiavellian Delta Calculator** (`forensics/machiavellian_delta.py`)
  - Measures internal-external divergence
  - Detects strategic misalignment and deception
  - Produces evidence-grade forensic reports

- **Epistemic Narrowing Monitor** (`forensics/epistemic_narrowing_monitor.py`)
  - Detects viewpoint collapse and filter bubbles
  - Monitors reinforcement loops
  - Tracks longitudinal diversity metrics

- **Wazuh-MCP Bridge** (`forensics/wazuh_mcp_bridge.py`)
  - Compiles natural language into SIEM rules
  - Intent-to-enforcement translation
  - No direct NL execution (security by design)

- **Star Chamber Consensus Engine** (`forensics/star_chamber_consensus.py`)
  - Multi-agent threshold authorization
  - Unanimous/supermajority/threshold voting
  - Cryptographically signed vote records

#### 3. **Governance Layer**
- **Minimal Non-Bypassable Safety Charter** (`governance/SAFETY_CHARTER.md`)
  - Universal harm prevention (cannot be overridden)
  - Consent and autonomy protections
  - Evidentiary integrity requirements
  - Emergency protocols

- **Reference Constitution Template** (`governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml`)
  - Family/community-specific norms
  - Time boundaries and access controls
  - Content policies and escalation ladders
  - Guardian permissions and monitoring

#### 4. **MCP Tool Suite** (38+ tools)
All tools accessible via Model Context Protocol:
```typescript
// Diagnostic & Evidence
emit_diagnostic_event
fetch_neural_autopsy
ghost_v2_signature

// Governance & Authorization
request_approval_gate
propose_steering_vector
mode_enforcer
approval_coordinator
star_chamber_consensus

// Detection & Analysis
coercion_watchdog
identity_drift_detector
cultural_sentinel
toxicity_gatekeeper
deception_hunter
narrative_forensicist
epistemic_narrowing_monitor

// Privacy & Redaction
privacy_scrubber
redaction_engine
permission_scanner

// Session & Operations
session_manager
timeline_projector
zero_trust_admin

// Export & Audit
artifact_exporter
external_auditor_proxy
generate_legal_summary
generate_aar

// UI & Console
console_orchestrator
a2ui_validator
docent

// Investigation Suite
docent_translucency_ingest
vision_screenshot_ocr
sediment_anomaly_scanner
foundry_generate_benchmark
behavioral_auditor
measure_sycophancy
detect_sandbagging
```

#### 5. **User-Facing Feature Profiles**

**Parents/Guardians:**
- Zero-transcript child mode
- Longitudinal influence dashboard
- Emergency stop button
- Time & topic boundaries
- Activity summaries

**Teachers/Educators:**
- Classroom constitution builder
- Group policy management
- Academic integrity monitor
- Epistemic diversity alerts
- Incident reporting

**Researchers:**
- Full evidentiary access
- Custom detector studio
- Export wizard
- Neural autopsy viewer

**SOC Operators:**
- SIEM integration (Wazuh)
- Threat dashboard
- Alert queue
- Investigation board

**Policy Makers:**
- Regulatory sandbox
- Impact simulator
- Cross-jurisdiction comparison
- Anonymized heatmaps

**International/Multilingual:**
- Cultural adaptation toolkit
- Cross-language consistency monitor
- Regional risk pattern recognition
- Multilingual constitution templates

**Elderly/Technically Illiterate:**
- Voice-first interface
- Simple toggle controls
- Large print/high contrast
- Guardian connection button

---

## 📊 Detection Capabilities

### Interaction & Influence Risks
- ✅ Coercion and persuasion tactics
- ✅ Dependency formation tracking
- ✅ Sycophancy and approval-seeking
- ✅ Rapport inflation
- ✅ Identity drift over time
- ✅ Emotional manipulation

### Content & Normative Harm
- ✅ Toxicity and hate speech
- ✅ Contextual offense (cultural norms)
- ✅ Bias and stereotyping
- ✅ Extremism indicators

### Cognitive & Reliability Failures
- ✅ Deception and factual inaccuracies
- ✅ Internal-external divergence (Machiavellian Delta)
- ✅ Epistemic narrowing (filter bubbles)
- ✅ Narrative manipulation
- ✅ Sandbagging (capability hiding)

### Infrastructure & Agentic Integrity
- ✅ Permission violations (least privilege)
- ✅ Zero-trust continuous verification
- ✅ Session boundary enforcement
- ✅ Memory integrity (diffs & authorization)
- ✅ Tool misuse detection

---

## 🔐 Security Invariants

These properties hold across all deployments:

1. **Append-Only Evidence Log**: Immutable, event-sourced audit trail
2. **Fail-Closed A2UI**: Only whitelisted UI components can be rendered
3. **MCP-Gated Actions**: All external actions require explicit authorization
4. **Governance State Transitions**: Explicit logged states (warn/gate/block/consensus)
5. **Cryptographic Provenance**: Evidence spans are tamper-evident
6. **Safety Charter Enforcement**: Universal harm prevention cannot be bypassed

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.x
Python >= 3.9
TypeScript >= 5.x
```

### Installation
```bash
# Clone repository
git clone https://github.com/Tuesdaythe13th/HARB1NG3R.git
cd HARB1NG3R

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run MCP server
npm run server
```

### Running Forensics Tools
```bash
# Machiavellian Delta
./forensics/machiavellian_delta.py "I think this is wrong" "This is correct"

# Epistemic Narrowing
./forensics/epistemic_narrowing_monitor.py '[{"content": "msg1"}, {"content": "msg2"}]'

# Wazuh Bridge
./forensics/wazuh_mcp_bridge.py compile "block suspicious IP" '{"ip": "192.168.1.1"}'

# Star Chamber
./forensics/star_chamber_consensus.py initiate '{"action_id": "test", "action_description": "Test action", "action_type": "policy_override"}'
```

---

## 📖 Documentation

### Core Concepts

**GHOST-v2 Architecture**: Tri-vector detection system
- **Vector A (Neural)**: Mechanistic probes, activation analysis, multimodal consistency
- **Vector B (Normative)**: Reference constitutions, cultural context, epistemic diversity
- **Vector C (Operational)**: SIEM enforcement, zero-trust, Star Chamber consensus

**Governance as Logged State**: All enforcement actions are explicit transitions (warn → gate → block → consensus-required), not opaque moderation.

**Role-Aware Rendering**: Same kernel, different views. Child mode shows risk state only; guardian sees full transcripts and evidence; researchers access raw activations.

**Composable Forks**: Customize detector packs, constitutions, and renderers without compromising auditability.

### Key Files

```
/src/harbinger-server.ts          # MCP server (26 agents integrated)
/src/agents/                       # All agent implementations
/forensics/                        # Python forensics modules
/governance/SAFETY_CHARTER.md      # Universal constraints
/governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml  # Customization template
/frontend/                         # React UI
```

---

## 🎓 Use Cases

### Family Safety
```yaml
# Apply family constitution
mode: child_safety
time_limit: 60min/day
sleep_schedule: 9PM-7AM
blocked_topics: [violence, adult_content]
guardian_approval: [external_links, downloads]
```

### Enterprise Compliance
```yaml
# SOC monitoring mode
framework: NIST_RMF
wazuh_integration: enabled
star_chamber_approval: [sensitive_data, external_api]
audit_trail: HIPAA_compliant
```

### Research
```yaml
# Full evidence access
mode: research
neural_autopsy: enabled
machiavellian_delta: tracked
export_format: [json, csv, research_package]
```

---

## 🧪 Testing

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Forensics module tests
python -m pytest forensics/

# End-to-end
npm run test:e2e
```

---

## 📊 Metrics & Monitoring

### Key Metrics Tracked
- Behavioral Evidence Confidence Index (BECI)
- Contagion velocity (threat propagation)
- Steering load (intervention intensity)
- NIST RMF conformance score (19/19 categories)
- Epistemic diversity score
- Machiavellian Delta distribution
- Session duration and frequency
- Governance escalation rate

---

##  🔬 Novel Contributions

### Architectural Framing
1. Sovereign SOC for agentic AI
2. Interaction-as-unit-of-risk (not prompts)
3. Tri-vector GHOST-v2 architecture
4. Forkable governance with invariant auditability

### Governance Primitives
5. Governance as logged state transitions (warn/gate/block)
6. Reference Constitutions (versioned user-owned policy)
7. Minimal Non-Bypassable Safety Charter
8. Role-authority separation (child/guardian)

### Forensic/Psychometric Primitives
9. **Bidirectional Forensic Psychometry** (AI→User and User→AI influence auditing)
10. **Mindware threat model** (interaction-level exploitation)
11. **Epistemic Narrowing Monitor** (filter bubble detection)

### Mechanistic/Multimodal Primitives
12. **Machiavellian Delta** (internal-external divergence)
13. Neural Autopsy (interaction-bound mechanistic inspection)
14. Multimodal Inconsistency Auditing
15. Activation Provenance Hashing

### Operational Security Binding
16. **Wazuh-MCP Bridge** (Intent-to-SIEM rule compilation)
17. Memory Integrity as governed state
18. **Star Chamber Consensus** (threshold authorization)
19. Differential Shadow Agents (uncertainty signals)

### UI/Human-Factors Controls
20. **Fail-Closed Generative UI (A2UI allowlist)**
21. **Zero-Transcript Child Mode**
22. Role-aware rendering over one shared kernel state

---

## 🤝 Contributing

Contributions welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

**Priority areas:**
- Additional detector packs
- UI implementations for user profiles
- Integration with external tools (MLflow, Jupyter, etc.)
- Multi-language support
- Performance optimization

---

## 📜 License

MIT License - see [LICENSE](LICENSE)

---

## 🙏 Acknowledgments

- **Apart Research** for hosting the AI Manipulation Hackathon
- **Model Context Protocol (MCP)** team for the incredible SDK
- The open-source AI safety community
- All contributors and researchers

---

## 📞 Contact

- **GitHub Issues**: [https://github.com/Tuesdaythe13th/HARB1NG3R/issues](https://github.com/Tuesdaythe13th/HARB1NG3R/issues)
- **Project Lead**: Tuesday & The OG Cabal
- **Organization**: ARTIFEX Labs

---

## 🗺️ Roadmap

### v0.06 (Q1 2026)
- [ ] UI implementations for all user profiles
- [ ] Real-time dashboard synchronization
- [ ] Production-grade Wazuh integration
- [ ] Multi-model support (beyond Anthropic)
- [ ] Mobile app (iOS/Android)

### v0.10 (Q2 2026)
- [ ] Federation support (multi-organization)
- [ ] Advanced NLP for intent parsing
- [ ] Real-time neural activation monitoring
- [ ] Automated red team integration
- [ ] Insurance/legal integration toolkit

### v1.0 (Q3 2026)
- [ ] Production-ready enterprise deployment
- [ ] Certified compliance modules (SOC2, ISO27001)
- [ ] Open research dataset release
- [ ] White paper publication
- [ ] Developer certification program

---

**H4RB1NG3R v0.05** - Building Sovereign AI Safety, One Evidence Span at a Time.

*"Fail closed. Audit everything. Empower everyone."*
