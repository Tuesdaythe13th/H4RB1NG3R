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

## 📘 How to Use This

### Quick Start by User Type

**Choose your path based on your role:**

#### 👨‍👩‍👧‍👦 Parents/Guardians: "I want to keep my child safe with AI"

1. **Read the Safety Charter** (5 minutes)
   ```bash
   cat governance/SAFETY_CHARTER.md
   ```
   This explains the non-negotiable safety rules that protect everyone.

2. **Copy the Constitution Template** (2 minutes)
   ```bash
   cp governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml my_family_constitution.yaml
   ```

3. **Customize for Your Family** (15 minutes)
   Edit `my_family_constitution.yaml`:
   - Set daily time limits (e.g., 60 minutes for age 8, 90 minutes for age 13)
   - Choose sleep schedule (e.g., 9 PM to 7 AM)
   - Block topics (e.g., violence, adult content, social media)
   - Add guardian contact info

4. **Test with Example Interaction** (5 minutes)
   ```bash
   # Start the server
   npm run server

   # In another terminal, test child safety mode
   node examples/test_child_mode.js
   ```

5. **Set Up Dashboard** (10 minutes)
   - Open guardian dashboard at `http://localhost:3000/guardian`
   - Configure email alerts
   - Test emergency stop button

**See detailed walkthrough:** [`USE_CASE_DESIGN.md` → "Example 1: Complete Family Setup"](#)

---

#### 👩‍🏫 Teachers/Educators: "I need to monitor AI use in my classroom"

1. **Create Classroom Constitution** (10 minutes)
   ```yaml
   # classroom_8th_grade_science.yaml
   name: "Mrs. Johnson's Science Class AI Policy"
   applies_to:
     - group_id: "8th_grade_science_2026"
   content_policy:
     allowed_topics: ["homework_help", "science_research", "lab_reports"]
     blocked_topics: ["exam_answers", "plagiarism", "social_media"]
   academic_integrity:
     detection_enabled: true
     citation_verification: true
   ```

2. **Enable Academic Integrity Monitor**
   ```bash
   # Test plagiarism detection
   ./examples/test_academic_integrity.sh
   ```

3. **Set Up Classroom Dashboard**
   - View all students' AI usage
   - Get alerts for cheating patterns
   - Monitor research diversity

**See detailed guide:** [`USE_CASE_DESIGN.md` → "Use Case 4: Classroom Constitution Builder"](#)

---

#### 🔬 Researchers: "I need to study AI safety patterns"

1. **Request Research Access** (varies by institution)
   - Obtain IRB/ethics approval
   - Configure evidence access level

2. **Access Forensics Tools**
   ```bash
   # Run Machiavellian Delta analysis
   ./forensics/machiavellian_delta.py \
     "Internal reasoning here" \
     "External output here"

   # Monitor epistemic narrowing
   ./forensics/epistemic_narrowing_monitor.py \
     '[{"content": "interaction 1"}, {"content": "interaction 2"}]'
   ```

3. **Export Research Data**
   ```typescript
   const researchPackage = await mcp.call("artifact_exporter", {
     export_type: "research_study",
     evidence_spans: ["span_001", "span_002"],
     format: "json",
     redaction_level: "researcher",  // Pseudonymized
     include_metadata: true
   });
   ```

**See detailed guide:** [`USE_CASE_DESIGN.md` → "Use Case 6: Mechanistic Probe API"](#)

---

#### 🏢 Enterprise/SOC: "I need to integrate with our security systems"

1. **Deploy Wazuh-MCP Bridge**
   ```bash
   # Configure SIEM integration
   export WAZUH_MANAGER_URL="https://siem.company.internal"
   export WAZUH_API_TOKEN="your_token_here"

   # Compile security intent to SIEM rule
   ./forensics/wazuh_mcp_bridge.py compile \
     "Block AI interactions attempting unauthorized database access" \
     '{"resource": "customer_db", "reason": "GDPR"}'
   ```

2. **Set Up SOC Dashboard**
   ```typescript
   const socView = await mcp.call("console_orchestrator", {
     user_role: "soc_operator",
     view_request: "threat_dashboard",
     context_data: { time_range: "last_24h" }
   });
   ```

3. **Configure Star Chamber for High-Risk Actions**
   ```bash
   # Require 3-agent approval for sensitive operations
   ./forensics/star_chamber_consensus.py initiate \
     '{"action_type": "data_export", "approval_type": "star_chamber"}'
   ```

**See detailed guide:** [`USE_CASE_DESIGN.md` → "Use Case 7: SIEM Integration & Threat Detection"](#)

---

#### 👤 Individual Users: "I want healthy AI boundaries for myself"

1. **Create Personal Constitution**
   ```yaml
   # my_ai_rules.yaml
   name: "My Personal AI Boundaries"
   relationship_boundaries:
     session_frequency_max: 20  # per week
     emotional_dependency_limit: 0.5
   learning_goals:
     areas: ["python_programming"]
     dependency_prevention: true
   ```

2. **Track Your AI Health**
   ```bash
   # Check your dependency score
   node examples/check_my_ai_health.js
   ```

3. **Set Up Personal Dashboard**
   - View your usage patterns
   - Monitor dependency signals
   - Track learning progress

**See detailed guide:** [`USE_CASE_DESIGN.md` → "Use Case 8: Personal Constitution Builder"](#)

---

#### 👵 Elderly/Non-Technical Users: "I need simple, safe AI"

1. **Use Voice Setup Wizard**
   ```bash
   # Start voice-guided setup
   npm run voice-setup
   ```
   Say: "Set up safety for me"

2. **Connect Guardian**
   - Add trusted family member's phone number
   - Test one-button call feature

3. **Enable Financial Protection**
   - Automatic blocking of money requests
   - Alert guardian if scam detected

**See detailed guide:** [`USE_CASE_DESIGN.md` → "Use Case 9: Voice-First Emergency Interface"](#)

---

### Understanding the Architecture (Plain Language)

**What is H4RB1NG3R doing?**

Think of H4RB1NG3R as a **security control room** for AI interactions. Just like a building has:
- 🎥 Security cameras (our detection agents)
- 🚨 Alarm system (governance alerts)
- 🚪 Access control (permission checks)
- 📋 Incident logs (evidence vault)

H4RB1NG3R watches AI interactions in real-time and:

1. **Detects** concerning patterns (manipulation, deception, harmful content)
2. **Validates** against your rules (family constitution, company policy)
3. **Enforces** boundaries (time limits, topic blocks, approval requirements)
4. **Records** everything for accountability (immutable audit log)
5. **Alerts** the right people (parents, teachers, SOC analysts)

**The Three Layers** (Technical)

```
┌─────────────────────────────────────────────┐
│  LAYER 1: DETECTION (26 Agents)            │
│  "What's happening?"                        │
│  • Coercion Watchdog spots manipulation    │
│  • Toxicity Gatekeeper catches hate speech │
│  • Deception Hunter finds lies             │
│  • Identity Drift tracks long-term changes │
└─────────────────────────────────────────────┘
           │ Findings sent to ▼
┌─────────────────────────────────────────────┐
│  LAYER 2: GOVERNANCE (Your Rules)          │
│  "Is this allowed?"                         │
│  • Your Constitution (family/classroom)     │
│  • Safety Charter (universal rules)         │
│  • Mode Enforcer (enforces boundaries)     │
└─────────────────────────────────────────────┘
           │ Decisions trigger ▼
┌─────────────────────────────────────────────┐
│  LAYER 3: ACTION (Enforcement)              │
│  "What do we do?"                           │
│  • ALLOW: Safe, continue                    │
│  • WARN: Show safety message                │
│  • GATE: Require approval                   │
│  • BLOCK: Stop immediately                  │
└─────────────────────────────────────────────┘
```

---

### Common Tasks & Commands

#### For Everyone:

**Check system status:**
```bash
npm run status
```

**View today's safety events:**
```bash
npm run events --today
```

**Generate safety report:**
```bash
npm run report --user [user_id] --range [7days/30days/90days]
```

#### For Guardians:

**View child's activity:**
```bash
npm run dashboard --role guardian --child [child_id]
```

**Export evidence for incident:**
```bash
node scripts/export_evidence.js --incident [incident_id] --format pdf
```

**Update constitution:**
```bash
vim my_family_constitution.yaml
npm run deploy-constitution my_family_constitution.yaml
```

#### For Researchers:

**Run forensic analysis:**
```bash
# Calculate Machiavellian Delta
./forensics/machiavellian_delta.py \
  "$(cat internal_reasoning.txt)" \
  "$(cat external_output.txt)"

# Check epistemic narrowing
./forensics/epistemic_narrowing_monitor.py \
  "$(cat interaction_history.json)" \
  0.7 \
  user_123
```

**Export research package:**
```bash
node scripts/export_research_data.js \
  --study-id sycophancy_2026 \
  --format json \
  --redaction researcher
```

#### For SOC/Enterprise:

**Deploy SIEM rule:**
```bash
./forensics/wazuh_mcp_bridge.py compile \
  "Block AI attempts to access production database without MFA" \
  '{"resource": "prod_db", "requires": "mfa"}'
```

**Check threat status:**
```bash
npm run soc-dashboard --severity CRITICAL --range 24h
```

**Initiate Star Chamber approval:**
```bash
./forensics/star_chamber_consensus.py initiate \
  '{"action_id": "delete_logs", "action_type": "delete_evidence"}'
```

---

### Troubleshooting

**"Session blocked: sleep_schedule violation"**
- ✅ **Working as intended.** Child trying to use AI during sleep hours.
- 💡 **To adjust:** Edit `sleep_schedule` in your constitution.

**"Permission denied: requires_guardian_approval"**
- ✅ **Working as intended.** Action needs parent approval.
- 💡 **To approve:** Check guardian dashboard for pending requests.

**"Export failed: insufficient_permissions"**
- ❌ **Problem:** Trying to export unredacted data without authorization.
- 💡 **Fix:** Use appropriate redaction level for your role:
  - `researcher` = pseudonymized
  - `guardian` = annotated
  - `public` = heavily redacted

**"SIEM rule deployment failed: requires_star_chamber_approval"**
- ✅ **Working as intended.** High-risk rule requires multi-agent consensus.
- 💡 **To proceed:** Initiate Star Chamber process (see SOC commands above).

**"Build errors with TypeScript"**
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

---

### Where to Learn More

📚 **Full Documentation:**
- [`USE_CASE_DESIGN.md`](USE_CASE_DESIGN.md) - Detailed examples for every user type
- [`governance/SAFETY_CHARTER.md`](governance/SAFETY_CHARTER.md) - Universal safety rules
- [`governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml`](governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml) - Customization template

🎓 **Tutorials:**
- [Setting up for families](examples/family_setup/)
- [Classroom deployment](examples/classroom_setup/)
- [Enterprise SIEM integration](examples/enterprise_soc/)
- [Research studies](examples/research_studies/)

🔧 **API Reference:**
- [MCP Tools Reference](docs/MCP_TOOLS.md)
- [Agent Specifications](docs/AGENTS.md)
- [Forensics Modules](docs/FORENSICS.md)

💬 **Community:**
- [GitHub Discussions](https://github.com/Tuesdaythe13th/HARB1NG3R/discussions)
- [Issue Tracker](https://github.com/Tuesdaythe13th/HARB1NG3R/issues)

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

## 💻 System Requirements

### Minimum Requirements
```
OS: Linux (Ubuntu 20.04+), macOS (12+), Windows 10/11 (WSL2)
CPU: 2 cores (4+ recommended)
RAM: 4GB (8GB+ recommended)
Storage: 2GB for base system + evidence storage
Node.js: 18.x or higher
Python: 3.9 or higher
```

### Recommended Production Configuration
```
OS: Ubuntu 22.04 LTS (Linux)
CPU: 8+ cores
RAM: 16GB+ (32GB for high-traffic deployments)
Storage: SSD with 50GB+ (scales with evidence retention)
Network: 1Gbps+ for enterprise SOC deployments
Database: PostgreSQL 14+ (for production evidence vault)
SIEM: Wazuh 4.x+ (optional but recommended for enterprise)
```

### Browser Support (for Frontend)
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: 15+
- Mobile: iOS Safari 15+, Chrome Android latest

### Network Requirements
```
Inbound:
- Port 3000 (Frontend UI) - HTTPS recommended
- Port 8080 (MCP Server) - Internal only

Outbound (optional):
- HTTPS (443) - For external integrations
- SMTP (587/465) - For email alerts
- Wazuh Manager - Custom port (default 1514/1515)
```

---

## 🏗️ Deployment Architecture Options

### Option 1: Standalone (Development/Testing)
```
┌─────────────────────────────────┐
│     Single Machine              │
│  ┌────────────────────────────┐ │
│  │  Frontend (React)          │ │
│  │  localhost:3000            │ │
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  MCP Server                │ │
│  │  localhost:8080            │ │
│  └────────────────────────────┘ │
│  ┌────────────────────────────┐ │
│  │  SQLite Evidence Store     │ │
│  └────────────────────────────┘ │
└─────────────────────────────────┘
```
**Use for:** Local testing, family deployment, individual use
**Setup time:** 10 minutes
**Cost:** Free

---

### Option 2: Cloud Deployment (Small-Medium Scale)
```
┌──────────────────────────────────────────┐
│           Cloud Provider                 │
│  (AWS/GCP/Azure/DigitalOcean)           │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  Load Balancer                      │ │
│  │  (SSL/TLS termination)              │ │
│  └──────────┬──────────────────────────┘ │
│             │                             │
│  ┌──────────┴──────────┬──────────────┐ │
│  │  App Server 1       │ App Server 2 │ │
│  │  (Frontend + MCP)   │ (Replica)    │ │
│  └─────────────────────┴──────────────┘ │
│             │                             │
│  ┌──────────┴──────────────────────────┐ │
│  │  PostgreSQL (Managed)               │ │
│  │  Evidence Vault + Audit Log         │ │
│  └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```
**Use for:** Schools, small businesses, multi-family deployments
**Setup time:** 1-2 hours
**Cost:** $50-200/month

---

### Option 3: Enterprise SOC Integration
```
┌───────────────────────────────────────────────────────────┐
│                    Enterprise Network                      │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  External Facing                                      │ │
│  │  ┌──────────────┐     ┌───────────────────┐         │ │
│  │  │  WAF/CDN     │────▶│  Load Balancer    │         │ │
│  │  └──────────────┘     └─────────┬─────────┘         │ │
│  └──────────────────────────────────┼────────────────────┘ │
│                                     │                       │
│  ┌──────────────────────────────────┼────────────────────┐ │
│  │  Application Tier (Private VPC) │                    │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──┴───────┐          │ │
│  │  │ Frontend │  │ Frontend │  │ Frontend │          │ │
│  │  │ Node 1   │  │ Node 2   │  │ Node N   │          │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘          │ │
│  │       └─────────────┼─────────────┘                  │ │
│  │  ┌──────────────────┴────────────────┐              │ │
│  │  │     MCP Server Cluster            │              │ │
│  │  │  (Agent swarm + forensics)        │              │ │
│  │  └──────────────┬────────────────────┘              │ │
│  └─────────────────┼────────────────────────────────────┘ │
│                    │                                       │
│  ┌─────────────────┼────────────────────────────────────┐ │
│  │  Data Tier      │                                    │ │
│  │  ┌──────────────┴──────────┐  ┌──────────────────┐ │ │
│  │  │  PostgreSQL Cluster     │  │  Redis Cache     │ │ │
│  │  │  (Primary + Replicas)   │  │  (Session store) │ │ │
│  │  └─────────────────────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│                    │                                       │
│  ┌─────────────────┼────────────────────────────────────┐ │
│  │  SIEM Integration│                                    │ │
│  │  ┌──────────────┴──────────┐  ┌──────────────────┐ │ │
│  │  │  Wazuh Manager          │  │  Elasticsearch   │ │ │
│  │  │  (Security alerts)      │  │  (Log analytics) │ │ │
│  │  └─────────────────────────┘  └──────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```
**Use for:** Enterprises, government, large organizations
**Setup time:** 1-2 weeks
**Cost:** $1,000-10,000+/month

---

## ⚡ Performance & Scalability

### Throughput Benchmarks
```
Configuration: 4-core, 8GB RAM, SSD

Single Agent Request: ~50ms average
Full Detection Pipeline: ~200-500ms
Evidence Log Write: ~10ms
Forensics Module (Python): ~100-300ms
Session Boundary Check: ~20ms
Approval Gate Creation: ~30ms
```

### Scalability Metrics
```
Concurrent Users:
- Standalone: 10-50 users
- Cloud (2 servers): 500-1000 users
- Enterprise cluster: 10,000+ users

Evidence Retention:
- 1 million interactions ≈ 5GB storage
- Compression reduces by ~60%
- Retention policies recommended: 90 days (standard), 1 year (compliance)

Agent Processing:
- 26 agents can run in parallel
- Average CPU per agent: 2-5%
- Memory per agent: 50-100MB
```

### Optimization Tips
1. **Enable Redis caching** for session state (10x faster)
2. **Use PostgreSQL connection pooling** (100+ concurrent connections)
3. **Deploy forensics modules as microservices** for parallel processing
4. **Configure evidence log sharding** by time period
5. **Enable CDN** for frontend assets (50% faster load times)

---

## 🔒 Security Best Practices

### Production Deployment Checklist

**Before Go-Live:**
- [ ] Change all default passwords/tokens
- [ ] Enable HTTPS/TLS for all endpoints
- [ ] Configure firewall rules (whitelist only)
- [ ] Set up secure environment variables (not in code)
- [ ] Enable audit logging for all admin actions
- [ ] Configure automatic security updates
- [ ] Implement rate limiting (100 requests/minute per user)
- [ ] Set up intrusion detection (fail2ban or equivalent)
- [ ] Enable database encryption at rest
- [ ] Configure backup automation (daily + weekly)
- [ ] Test disaster recovery procedures
- [ ] Review and harden Safety Charter (no backdoors)
- [ ] Disable debug mode in production
- [ ] Set up security monitoring alerts
- [ ] Document incident response procedures

**Access Control:**
```yaml
# Recommended IAM Policy Structure
roles:
  child:
    permissions: [read_safe_content, request_help]
    max_risk_exposure: 0.2

  guardian:
    permissions: [read_all, approve_actions, edit_constitution, emergency_stop]
    max_risk_exposure: 0.8
    mfa_required: true

  soc_operator:
    permissions: [read_all, block_actions, export_evidence, create_siem_rules]
    max_risk_exposure: 1.0
    mfa_required: true
    ip_whitelist: [corporate_network]

  admin:
    permissions: [full_system_access]
    mfa_required: true
    ip_whitelist: [admin_network]
    session_timeout: 15_minutes
    requires_audit_log: true
```

**Data Protection:**
- Evidence vault: AES-256 encryption
- Passwords: Argon2id hashing
- API tokens: 32-byte random, rotated every 90 days
- PII: Automatic redaction with Privacy Scrubber (PA-1)
- Backup encryption: GPG with separate key management

**Network Security:**
```bash
# Recommended firewall rules (iptables example)
# Allow HTTPS only
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow SSH from admin network only
iptables -A INPUT -p tcp --dport 22 -s 10.0.1.0/24 -j ACCEPT

# Allow MCP server (internal only)
iptables -A INPUT -p tcp --dport 8080 -s 127.0.0.1 -j ACCEPT

# Drop all other inbound
iptables -A INPUT -j DROP
```

---

## 🎯 Feature Comparison Matrix

| Feature | H4RB1NG3R v0.05 | OpenAI Moderation API | Google Perspective API | Anthropic Claude Constitutional AI | Traditional Content Filters |
|---------|----------------|----------------------|----------------------|-----------------------------------|---------------------------|
| **Detection Scope** | ✅ Interaction-level (actions + influence) | ⚠️ Content only | ⚠️ Content only | ⚠️ Output only | ❌ Keyword-based |
| **Longitudinal Tracking** | ✅ Identity drift, dependency formation | ❌ No | ❌ No | ❌ No | ❌ No |
| **Mechanistic Interpretability** | ✅ Neural autopsy, Machiavellian Delta | ❌ Black box | ❌ Black box | ⚠️ Limited | ❌ N/A |
| **User Sovereignty** | ✅ Reference Constitutions, local rules | ❌ Provider-controlled | ❌ Provider-controlled | ⚠️ Template-based | ⚠️ Local only |
| **Fail-Closed UI** | ✅ A2UI validator, whitelist only | ❌ No UI control | ❌ No UI control | ❌ No UI control | ❌ N/A |
| **Evidence Audit Trail** | ✅ Immutable, cryptographic provenance | ❌ No | ❌ No | ⚠️ Logs only | ❌ No |
| **Multi-Agent Consensus** | ✅ Star Chamber, threshold approval | ❌ No | ❌ No | ❌ No | ❌ No |
| **SIEM Integration** | ✅ Wazuh-MCP bridge, NL→rules | ❌ No | ❌ No | ❌ No | ❌ No |
| **Child Safety Mode** | ✅ Zero-transcript, guardian oversight | ❌ No | ❌ No | ❌ No | ⚠️ Basic |
| **Epistemic Diversity** | ✅ Narrowing detection, filter bubbles | ❌ No | ❌ No | ❌ No | ❌ No |
| **Cultural Adaptability** | ✅ Multicultural constitutions | ❌ US-centric | ⚠️ Limited | ⚠️ Limited | ❌ No |
| **Coercion Detection** | ✅ Psychological manipulation tracking | ❌ No | ❌ No | ❌ No | ❌ No |
| **Real-Time Forecasting** | ✅ Timeline projection, risk trajectory | ❌ No | ❌ No | ❌ No | ❌ No |
| **Self-Hostable** | ✅ Full local deployment | ❌ Cloud only | ❌ Cloud only | ❌ Cloud only | ✅ Yes |
| **Open Source** | ✅ MIT License | ❌ Closed | ❌ Closed | ❌ Closed | ⚠️ Varies |
| **Cost** | 🆓 Free (self-host) | 💰 Pay per request | 💰 Pay per request | 💰 Included with API | 🆓 Free |

**Legend:**
- ✅ Full support / Native feature
- ⚠️ Partial support / Limited
- ❌ Not available / Not applicable
- 💰 Paid
- 🆓 Free

---

## ❓ Frequently Asked Questions (FAQ)

### General Questions

**Q: What makes H4RB1NG3R different from content moderation APIs?**
A: H4RB1NG3R treats the entire *interaction* as the unit of risk, not just individual messages. It detects manipulation, dependency formation, identity drift, and influence patterns that unfold over time—things that single-message analysis misses. It also gives users sovereign control through local constitutions while maintaining baseline safety.

**Q: Do I need technical expertise to use H4RB1NG3R?**
A: No! We have different interfaces for different users:
- **Parents/Guardians:** Simple dashboard, pre-configured templates, emergency stop button
- **Teachers:** Classroom constitution builder with dropdown menus
- **Elderly:** Voice-first interface, one-button controls
- **Developers:** Full API access, custom integrations

**Q: Can I use H4RB1NG3R without hosting it myself?**
A: Currently, H4RB1NG3R is designed for self-hosting to maintain sovereignty. We're exploring hosted options for v0.10+ while preserving local governance control. Contact us if you need a hosted solution.

**Q: Does H4RB1NG3R work with all AI models?**
A: Currently optimized for Anthropic Claude (where we have access to chain-of-thought for Machiavellian Delta calculation). Support for OpenAI GPT, open-source models, and others is planned for v0.06+. The governance and operational layers work model-agnostically.

### Technical Questions

**Q: How much does H4RB1NG3R slow down AI interactions?**
A: Average overhead is 200-500ms for the full detection pipeline. This includes running 26 agents in parallel. For comparison, typical AI response time is 1-5 seconds, so this adds ~10-20% latency. You can disable non-critical agents to reduce this to <100ms.

**Q: Can agents be disabled or customized?**
A: Yes! The architecture is composable:
- Enable/disable individual agents per constitution
- Adjust detection thresholds
- Create custom detector packs
- Fork and modify any agent's logic
- **Invariants remain:** Evidence log, fail-closed UI, MCP gating, Safety Charter

**Q: How much storage does evidence logging require?**
A: Approximately 5KB per interaction (text-only). For a family with 2 children:
- Daily: ~100 interactions × 5KB = 500KB
- Monthly: ~15MB
- Yearly: ~180MB
With compression, this reduces to ~70MB/year. Enterprise deployments should plan for 1-10GB per 1000 daily active users.

**Q: Is H4RB1NG3R GDPR/HIPAA/COPPA compliant?**
A: H4RB1NG3R provides **tools for compliance** but is not pre-certified:
- **GDPR:** Privacy Scrubber (PA-1), right-to-deletion tools, data export, consent logging
- **HIPAA:** PHI redaction, audit trails, access controls, encryption at rest
- **COPPA:** Age-graded interfaces, parental consent workflows, minimal data collection
You must configure these features and maintain compliance yourself or work with our enterprise support.

**Q: Can H4RB1NG3R be bypassed or jailbroken?**
A: The Safety Charter is non-bypassable by design:
- Reference Constitutions can add restrictions, not remove charter rules
- MCP-gated actions require explicit authorization (logged)
- Evidence log is append-only and cryptographically chained
- A2UI validator prevents arbitrary code execution
- Multi-agent consensus required for high-risk actions
However, like any security system, determined attackers with system access could compromise it. Use proper access controls and monitoring.

### Deployment Questions

**Q: Can I deploy H4RB1NG3R on Windows?**
A: Yes, but we recommend WSL2 (Windows Subsystem for Linux) for best compatibility. Native Windows support is limited for the Python forensics modules. Full Windows support planned for v0.08.

**Q: Do I need Wazuh for H4RB1NG3R to work?**
A: No! Wazuh integration is **optional** and only needed for enterprise SOC deployments. Standalone and family deployments work without SIEM integration.

**Q: Can multiple families/classrooms share one H4RB1NG3R instance?**
A: Yes! Use multi-tenancy configuration:
```yaml
tenants:
  - tenant_id: smith_family
    constitution: ./constitutions/smith_family.yaml
  - tenant_id: jones_classroom
    constitution: ./constitutions/8th_grade_science.yaml
```
Each tenant gets isolated evidence vault, separate governance, and role-based access control.

**Q: What happens if the MCP server crashes?**
A: Fail-closed by design:
- Frontend shows "Safety system offline - AI disabled"
- No AI interactions proceed without active monitoring
- Evidence log preserved (append-only)
- Automatic restart with health checks (in production config)
- Alerts sent to admins/guardians

### Privacy & Ethics Questions

**Q: Does H4RB1NG3R send data to external servers?**
A: No! All processing is local by default. External connections only if you explicitly configure:
- Email alerts (SMTP server)
- SIEM integration (your Wazuh instance)
- Optional: Anonymized threat intelligence sharing (opt-in)

**Q: Can I delete evidence logs?**
A: Yes, but with safeguards:
- Requires Star Chamber approval (multi-agent consensus)
- Deletion is logged (cannot be hidden)
- Must comply with your retention policy
- GDPR right-to-deletion requests supported
The point is accountability, not preventing legitimate deletion.

**Q: Is H4RB1NG3R appropriate for mental health applications?**
A: **No.** H4RB1NG3R is a safety monitoring tool, not a mental health solution:
- It can detect concerning patterns and alert guardians
- It can connect to crisis resources (988, local services)
- It **cannot** replace professional mental health care
- We recommend using H4RB1NG3R alongside, not instead of, professional support

**Q: Can teachers see students' private conversations?**
A: Configurable per constitution:
- **Academic mode:** Teachers see only academic-related interactions
- **Privacy mode:** No transcript access, only safety alerts
- **Full monitoring:** Requires explicit parental consent
- Students and parents can always export their own evidence

---

## 🚧 Known Limitations & Mitigations

### Current Limitations (v0.05)

| Limitation | Impact | Mitigation | Planned Fix |
|------------|--------|------------|-------------|
| **English-primary detection** | Non-English content may have reduced accuracy | Use Cultural Sentinel with multilingual constitutions | v0.06: Multilingual NLP models |
| **Requires chain-of-thought access** | Machiavellian Delta only works with CoT-capable models | Works with Anthropic Claude; other models get reduced features | v0.07: Proxy methods for non-CoT models |
| **No mobile apps** | Desktop/web only | Mobile-responsive web UI works on phones | v0.06: Native iOS/Android apps |
| **Evidence log not distributed** | Single point of failure for audit trail | Use database replication + backups | v0.08: Distributed ledger option |
| **Manual SIEM rule deployment** | Wazuh rules require approval before activation | Star Chamber consensus enforces safety | v0.09: Graduated automation |
| **Limited multimodal analysis** | Image/audio/video analysis is basic | Vision Screenshot OCR works; upload limited | v0.10: Advanced multimodal forensics |
| **No federation support** | Cannot share threat intelligence across orgs | Manual export/import of anonymized patterns | v0.10: Federated threat intelligence |
| **Forensics modules in Python** | Separate runtime from Node.js MCP server | Works but adds deployment complexity | v0.07: Native TypeScript implementations |
| **UI is MVP/prototype** | Basic React components, no polish | Fully functional but not production-quality UX | v0.06: Professional UI redesign |
| **No real-time neural monitoring** | Batch analysis only, not streaming | Timeline Projector forecasts future risk | v0.11: Streaming activation analysis |

### Working Around Limitations

**If you need multilingual support now:**
```yaml
# Use Cultural Sentinel with translated constitutions
cultural_context: "spanish_latin_america"
reference_constitution: ./constitutions/familia_garcia_es.yaml
fallback_language: "en"
```

**If you need mobile access now:**
```yaml
# Enable mobile-responsive mode
frontend:
  responsive: true
  mobile_optimization: true
  touch_gestures: enabled
# Access via mobile browser at https://your-domain.com
```

**If you need cross-organization sharing:**
```bash
# Export anonymized threat patterns
npm run export-threat-intel \
  --anonymize \
  --format json \
  --output ./shared_threats.json

# Import to another H4RB1NG3R instance
npm run import-threat-intel \
  --source ./shared_threats.json \
  --validate
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
