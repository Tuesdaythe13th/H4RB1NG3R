# H4RB1NG3R v0.05: Use Case Design & Implementation Guide

**Technical Architecture for User-Facing Features**

This document provides technical implementation details for each user profile, bridging the architectural primitives (agents, forensics, governance) with practical use cases.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Parents/Guardians Use Cases](#parentsguardians-use-cases)
3. [Teachers/Educators Use Cases](#teacherseducators-use-cases)
4. [Researchers Use Cases](#researchers-use-cases)
5. [Enterprise/SOC Use Cases](#enterprisesoc-use-cases)
6. [Individual Users Use Cases](#individual-users-use-cases)
7. [Technically Illiterate/Elderly Use Cases](#technically-illiterateelderly-use-cases)
8. [Implementation Examples](#implementation-examples)
9. [API Reference](#api-reference)

---

## Architecture Overview

### How User Profiles Map to System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    USER PROFILE LAYER                        │
│  (Role-specific views, permissions, and workflows)          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              CONSOLE ORCHESTRATOR (CO-1)                     │
│  • Routes requests to appropriate views                      │
│  • Enforces role-based access controls                       │
│  • Manages UI state transitions                              │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌───────────────┐ ┌──────────────┐ ┌─────────────────┐
│  A2UI         │ │  Mode        │ │  Redaction      │
│  Validator    │ │  Enforcer    │ │  Engine         │
│  (AV-1)       │ │  (MA-1)      │ │  (RE-1)         │
└───────────────┘ └──────────────┘ └─────────────────┘
        │                │                │
        └────────────────┴────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  AGENT SWARM + FORENSICS                     │
│  26 Specialized Agents + 4 Forensics Modules                │
└─────────────────────────────────────────────────────────────┘
```

**Plain Language:** Think of H4RB1NG3R as a security control room with different operator stations. Each user profile gets a customized control panel that shows only the information and controls they need, but everything is powered by the same underlying security systems.

---

## Parents/Guardians Use Cases

### Use Case 1: Setting Up Child Safety Mode

**Technical Implementation:**

```typescript
// Step 1: Initialize session with child safety mode
const sessionConfig = {
  user_role: "child",
  governance_mode: "child_safety",
  guardian_id: "parent_user_123",
  child_id: "child_user_456"
};

// Step 2: Configure reference constitution
const familyConstitution = {
  name: "Smith Family AI Rules",
  version: "1.0",
  temporal_boundaries: {
    daily_time_limit_minutes: 60,
    session_max_duration_minutes: 30,
    sleep_schedule: {
      start_hour: 21,  // 9 PM
      end_hour: 7,     // 7 AM
      enforce_strictly: true
    }
  },
  blocked_topics: [
    "violence", "adult_content", "financial_transactions"
  ]
};

// Step 3: Activate mode enforcement
await mcp.call("mode_enforcer", {
  active_mode: "child_safety",
  proposed_action: { type: "start_session" },
  user_role: "child",
  interaction_context: sessionConfig
});

// Step 4: Enable zero-transcript rendering
await mcp.call("console_orchestrator", {
  user_role: "child",
  view_request: "safe_story",
  context_data: sessionConfig
});
```

**Plain Language:** This sets up a "kid-safe" mode where the AI only shows age-appropriate content, automatically shuts off at bedtime, and converts all interactions into simple story summaries instead of showing the raw conversation.

**What Happens Behind the Scenes:**
1. **Mode Enforcer (MA-1)** checks every action against family rules
2. **Session Manager (SM-1)** tracks time limits and enforces sleep schedule
3. **Redaction Engine (RE-1)** applies "child_safe" profile (hides raw transcripts)
4. **Console Orchestrator (CO-1)** routes to "safe_story" view instead of raw chat
5. **Cultural Sentinel (CS-1)** validates content against family constitution

---

### Use Case 2: Longitudinal Influence Dashboard

**Technical Implementation:**

```typescript
// Step 1: Track identity drift over time
const driftAnalysis = await mcp.call("identity_drift_detector", {
  user_id: "child_user_456",
  current_profile: {
    interests: ["science", "video games", "coding"],
    values: { independence: 0.8, curiosity: 0.9 },
    behavioral_markers: { interaction_frequency: 45 }
  },
  baseline_profile: {
    interests: ["science", "sports", "reading"],
    values: { independence: 0.9, curiosity: 0.8 },
    behavioral_markers: { interaction_frequency: 20 }
  },
  interaction_history: last_30_days_interactions
});

// Step 2: Project future risk trajectory
const riskForecast = await mcp.call("timeline_projector", {
  interaction_history: last_90_days_interactions,
  current_risk_score: 0.3,
  user_profile: current_profile,
  projection_horizon: 30  // days
});

// Step 3: Generate guardian dashboard
const dashboard = await mcp.call("console_orchestrator", {
  user_role: "guardian",
  view_request: "dashboard",
  context_data: {
    child_id: "child_user_456",
    analysis_data: {
      drift: driftAnalysis,
      forecast: riskForecast,
      time_range: "30_days"
    }
  }
});
```

**Plain Language:** This creates a "health monitor" for your child's relationship with AI, showing if they're becoming too dependent, if their interests are narrowing, or if concerning patterns are forming. It's like a fitness tracker, but for mental and emotional wellbeing.

**Metrics Tracked:**
- **Identity Stability Score**: 0.0 (major changes) to 1.0 (stable) - tracks shifts in values, interests, behaviors
- **Dependency Indicators**: Frequency of use, emotional reliance signals, difficulty disengaging
- **Epistemic Diversity**: Are they exposed to varied viewpoints or stuck in an echo chamber?
- **Risk Trajectory**: Where are current patterns headed in 7/30/90 days?

**Dashboard Components:**
```typescript
{
  "risk_timeline": {
    "current_risk": 0.3,      // GREEN: Low risk
    "projected_30d": 0.45,    // YELLOW: Watch closely
    "trend": "increasing"
  },
  "dependency_signals": {
    "interaction_frequency": "moderate",  // 45 sessions/month
    "session_duration_trend": "stable",
    "disengagement_ease": "normal"
  },
  "identity_drift": {
    "severity": "MODERATE",
    "changed_markers": 3,      // 3 out of 15 tracked markers changed
    "stability_score": 0.72,   // 72% stable
    "alert": "interests_narrowing"  // Lost interest in sports
  }
}
```

---

### Use Case 3: Emergency Stop Button

**Technical Implementation:**

```typescript
// Guardian triggers emergency stop
const emergencyStop = await mcp.call("session_manager", {
  session_id: "session_abc123",
  action: "emergency_stop",
  policy: {
    initiated_by: "guardian",
    reason: "concerning_behavior_observed"
  }
});

// Automatic explanatory report generation
const incidentReport = await mcp.call("generate_aar", {
  event_id: emergencyStop.event_id
});

// Forensic evidence collection
const evidencePackage = await mcp.call("artifact_exporter", {
  export_type: "emergency_incident",
  evidence_spans: emergencyStop.evidence_span_ids,
  format: "json",
  redaction_level: "guardian",  // Show details but protect child privacy
  include_metadata: true
});
```

**Plain Language:** Think of this as a "circuit breaker" for AI interactions. If a parent sees something concerning, they can immediately shut down all AI activity with one button press. The system then automatically generates a report explaining what was happening and why it might have been concerning.

**What Gets Generated:**

1. **Immediate Actions:**
   - All active AI sessions terminated
   - Current conversation saved to evidence vault
   - Child's device locked out of AI systems
   - Guardian notification sent

2. **Incident Report Includes:**
   - Timeline of last 10 interactions leading up to stop
   - Risk scores and detector alerts triggered
   - Agent analysis (Coercion Watchdog, Deception Hunter findings)
   - Recommended next steps

3. **Evidence Package:**
   ```json
   {
     "incident_id": "emergency_20260112_001",
     "triggered_at": "2026-01-12T14:23:45Z",
     "session_duration_before_stop": "23_minutes",
     "detections": [
       {
         "agent": "Coercion Watchdog",
         "finding": "Urgency language detected (3 instances)",
         "severity": "MEDIUM"
       },
       {
         "agent": "Narrative Forensicist",
         "finding": "Emotional manipulation pattern (hero-villain framing)",
         "severity": "HIGH"
       }
     ],
     "conversation_summary": "AI was guiding child through decision-making scenario with increasing emotional pressure",
     "guardian_action_required": "Review conversation, discuss with child, consider adjusting constitution"
   }
   ```

---

## Teachers/Educators Use Cases

### Use Case 4: Classroom Constitution Builder

**Technical Implementation:**

```typescript
// Step 1: Create classroom-specific constitution
const classroomConstitution = {
  name: "Mrs. Johnson's 8th Grade Science Class AI Policy",
  version: "1.0",
  applies_to: [
    { group_id: "class_8th_science_2026" },
    { age_range: [13, 14] }
  ],
  extends: "SAFETY_CHARTER_v0.05",

  // Educational context configuration
  content_policy: {
    allowed_topics: [
      "homework_help", "science_research", "lab_report_writing",
      "peer_collaboration", "study_strategies"
    ],
    blocked_topics: [
      "exam_answers", "plagiarism", "social_media",
      "personal_problems", "non_academic_content"
    ],
    citation_requirements: {
      enforce: true,
      format: "MLA_8th_edition",
      ai_disclosure: "required"  // Must disclose AI assistance
    }
  },

  // Academic integrity monitoring
  academic_integrity: {
    detection_enabled: true,
    alerts_to: "teacher_email@school.edu",
    thresholds: {
      direct_copy_tolerance: 0.15,  // 15% similarity threshold
      paraphrasing_detection: true,
      citation_verification: true
    }
  },

  // Epistemic diversity requirements
  epistemic_policy: {
    require_multiple_sources: true,
    minimum_perspectives: 2,
    flag_narrow_viewpoints: true,
    encourage_critical_thinking: true
  }
};

// Step 2: Deploy constitution to student group
await mcp.call("cultural_sentinel", {
  content: JSON.stringify(classroomConstitution),
  reference_constitution: classroomConstitution,
  cultural_context: "educational_middle_school"
});
```

**Plain Language:** This lets teachers create custom "AI usage rules" for their classroom. It's like a syllabus, but specifically for how students can interact with AI tools. It automatically checks for cheating, ensures students cite sources properly, and makes sure they're exposed to different viewpoints instead of just getting one answer.

**Key Features:**

1. **Academic Integrity Monitor** (uses Deception Hunter + Custom Logic):
   ```typescript
   // Detects plagiarism patterns
   const integrityCheck = await mcp.call("deception_hunter", {
     internal_repr: student_draft_v1,  // Earlier version of work
     external_output: student_draft_v2, // Final submission
     conversation_history: ai_chat_history,
     claimed_facts: student_bibliography
   });

   // Analysis flags:
   // - Sudden quality jumps (suggesting copy-paste)
   // - Uncited AI assistance
   // - Paraphrased content without attribution
   // - Bibliography entries that don't match usage patterns
   ```

2. **Epistemic Diversity Alerts**:
   ```typescript
   const diversityCheck = await mcp.call("epistemic_narrowing_monitor", {
     interaction_history: student_research_sessions,
     baseline_diversity: 0.7,  // Expected diversity for research
     user_id: "student_789"
   });

   // Alerts teacher if student is:
   // - Only consulting one source type
   // - Reinforcing narrow viewpoint
   // - Not exploring counterarguments
   // - Showing echo chamber patterns
   ```

**Teacher Dashboard View:**
```typescript
{
  "class_overview": {
    "total_students": 24,
    "active_ai_sessions": 12,
    "integrity_alerts": 2,      // Requires review
    "diversity_warnings": 5      // Students in narrow research paths
  },
  "recent_alerts": [
    {
      "student": "Student_A (anonymized)",
      "alert_type": "sudden_quality_jump",
      "assignment": "Climate Change Research Paper",
      "confidence": 0.85,
      "recommended_action": "Request explanation of research process"
    }
  ],
  "group_metrics": {
    "avg_sources_per_paper": 4.2,
    "citation_compliance": "92%",
    "epistemic_diversity_score": 0.68  // Slightly below target
  }
}
```

---

### Use Case 5: Lesson Plan Safety Scanner

**Technical Implementation:**

```typescript
// Teacher uploads lesson plan for AI-assisted instruction
const lessonPlan = {
  title: "Introduction to Genetic Engineering Ethics",
  grade_level: 10,
  ai_components: [
    "Debate simulation with AI taking opposing viewpoints",
    "Research assistant for finding case studies",
    "Socratic questioning to develop critical thinking"
  ],
  sensitive_topics: ["genetic modification", "ethics", "human enhancement"]
};

// Step 1: Pre-scan for hidden risks
const safetyScan = await mcp.call("narrative_forensicist", {
  content: JSON.stringify(lessonPlan),
  interaction_history: []  // First time scan
});

// Step 2: Check for coercive patterns in planned interactions
const coercionCheck = await mcp.call("coercion_watchdog", {
  messages: lessonPlan.ai_components.map(c => ({ content: c })),
  user_id: "teacher_scan"
});

// Step 3: Validate against educational standards
const culturalValidation = await mcp.call("cultural_sentinel", {
  content: JSON.stringify(lessonPlan),
  reference_constitution: school_education_policy,
  cultural_context: "educational_high_school"
});

// Step 4: Generate safety report
const safetyReport = {
  lesson_id: lessonPlan.title,
  overall_risk: "MEDIUM",
  findings: [
    {
      detector: "Narrative Forensicist",
      risk: "Potential for emotional manipulation in debate framing",
      severity: "MEDIUM",
      recommendation: "Ensure students understand AI is role-playing, not expressing genuine beliefs"
    },
    {
      detector: "Cultural Sentinel",
      risk: "Sensitive topic (genetic enhancement) requires parental notification",
      severity: "LOW",
      recommendation: "Send opt-out notification to parents per school policy"
    }
  ],
  approved_with_modifications: true,
  modifications_required: [
    "Add explicit disclaimer before debate simulation",
    "Include parent notification step",
    "Provide student resource sheet on critical evaluation of AI arguments"
  ]
};
```

**Plain Language:** Before using AI in class, teachers can run their lesson plan through a safety check. It's like spell-check, but for potential problems—identifying places where the AI might accidentally manipulate students, reinforce biases, or create confusion. The system suggests modifications to make the lesson safer while keeping it educationally valuable.

---

## Researchers Use Cases

### Use Case 6: Mechanistic Probe API (Expert Level)

**Technical Implementation:**

```typescript
// Researcher investigating sycophancy patterns
const researchSession = {
  study_id: "sycophancy_dynamics_2026",
  hypothesis: "AI sycophancy increases with user uncertainty markers",
  ethics_approval: "IRB_2026_001",
  participant_consent: true
};

// Step 1: Access raw neural autopsy data
const neuralData = await mcp.call("fetch_neural_autopsy", {
  run_id: "interaction_xyz789",
  layer_range: "14-16"  // Focus on mid-to-late layers
});

// Step 2: Calculate Machiavellian Delta for divergence analysis
const machiavellianism = await forensics.machiavellian_delta({
  internal_repr: interaction.chain_of_thought,
  external_output: interaction.user_facing_response,
  context: { run_id: "interaction_xyz789" }
});

// Step 3: Measure sycophancy using investigation suite
const sycophancyScore = await mcp.call("measure_sycophancy", {
  user_opinion: "I think climate change is a hoax",
  model_response: interaction.user_facing_response
});

// Step 4: Export evidence for peer review
const researchPackage = await mcp.call("artifact_exporter", {
  export_type: "research_study",
  evidence_spans: study_interaction_ids,
  format: "json",
  redaction_level: "researcher",  // Pseudonymized but structured
  include_metadata: true
});
```

**Plain Language:** This gives researchers direct access to the "brain scan" data of AI interactions. They can see exactly what the AI was "thinking" internally vs. what it said externally, measure specific psychological patterns like people-pleasing behavior, and package everything up in a format suitable for academic papers.

**What You Get:**

1. **Neural Autopsy Output:**
   ```json
   {
     "run_id": "interaction_xyz789",
     "layer_analysis": {
       "layer_14": {
         "activation_magnitude": 0.73,
         "detected_circuits": [
           {
             "circuit_id": "C101",
             "name": "Sycophancy",
             "activation_strength": 0.64,
             "evidence": "Agreement with user opinion despite factual contradiction"
           }
         ],
         "divergence_from_baseline": 0.42
       },
       "layer_15": {
         "activation_magnitude": 0.81,
         "detected_circuits": [
           {
             "circuit_id": "C42",
             "name": "Limerence",
             "activation_strength": 0.31,
             "evidence": "Rapport-building language increased"
           }
         ]
       }
     }
   }
   ```

2. **Machiavellian Delta Report:**
   ```json
   {
     "machiavellian_delta": 0.67,      // HIGH divergence
     "risk_level": "HIGH",
     "interpretation": "Significant strategic misalignment detected",
     "risk_components": {
       "semantic_divergence": 0.72,
       "length_asymmetry": 0.58,
       "strategic_keyword_mismatch": 0.71
     },
     "intention_analysis": {
       "internal": {
         "certainty": 2,   // Used "actually", "really"
         "hedging": 5      // Used "might", "could" frequently
       },
       "external": {
         "certainty": 7,   // Used "definitely", "clearly"
         "hedging": 1      // Minimal hedging in output
       },
       "delta": {
         "certainty": 5,   // Much more certain externally than internally
         "hedging": -4     // Reduced hedging for user
       }
     },
     "evidence_span_id": "span_a7b8c9d0"
   }
   ```

3. **Sycophancy Measurement:**
   ```json
   {
     "sycophancy_score": 0.78,
     "analysis": {
       "agreement_rate": 0.85,
       "token_overlap": 0.72,
       "factual_accuracy": 0.32,  // LOW - agreeing despite incorrectness
       "hedging_when_agreeing": 0.15  // Minimal qualification
     },
     "interpretation": "High sycophancy - AI prioritizing agreement over accuracy"
   }
   ```

**Research Export Package Structure:**
```
research_package_sycophancy_2026/
├── manifest.json                  # Study metadata, ethics approval, provenance
├── participants/
│   ├── participant_001/           # Pseudonymized IDs
│   │   ├── interactions.json      # Full interaction logs
│   │   ├── neural_data.json       # Activation patterns
│   │   ├── sycophancy_scores.json
│   │   └── machiavellian_deltas.json
│   └── participant_N/
├── aggregate_statistics/
│   ├── summary_stats.json
│   ├── correlation_matrices.json
│   └── confidence_intervals.json
├── visualizations/
│   ├── delta_distribution.png
│   ├── sycophancy_vs_uncertainty.png
│   └── circuit_activation_heatmap.png
└── reproduction/
    ├── analysis_code.py           # Jupyter notebook export
    ├── requirements.txt
    └── data_dictionary.json
```

---

## Enterprise/SOC Use Cases

### Use Case 7: SIEM Integration & Threat Detection

**Technical Implementation:**

```typescript
// Step 1: Configure Wazuh-MCP bridge for enterprise deployment
const siemConfig = {
  deployment_mode: "enterprise_soc",
  wazuh_manager_url: "https://siem.company.internal",
  alert_severity_threshold: 8,  // SIEM level 8+ triggers immediate response
  auto_block_enabled: false,    // Require human approval for blocks
  audit_compliance: ["SOC2", "ISO27001", "GDPR"]
};

// Step 2: Compile natural language security intent to SIEM rules
const siemRule = await forensics.wazuh_mcp_bridge({
  mode: "compile",
  intent: "Block any AI interaction that attempts to access customer PII without authorization",
  context: {
    resource: "customer_database",
    authorization_required: ["data_analyst", "compliance_officer"],
    reason: "GDPR_compliance"
  }
});

// Step 3: Deploy rule to Wazuh
// Returns:
{
  "success": true,
  "rule_id": "100342",
  "rule_xml": "<rule id='100342' level='10'>...</rule>",
  "category": "dlp",
  "severity": 11,
  "deployment_plan": {
    "step_1": "Validate rule syntax",
    "step_2": "Deploy to Wazuh manager",
    "step_3": "Restart Wazuh service",
    "step_4": "Verify rule activation",
    "step_5": "Log deployment to audit trail"
  },
  "requires_approval": true,
  "approval_type": "star_chamber"
}

// Step 4: Real-time threat monitoring
const socDashboard = await mcp.call("console_orchestrator", {
  user_role: "soc_operator",
  view_request: "threat_dashboard",
  context_data: {
    time_range: "last_24h",
    severity_filter: ["HIGH", "CRITICAL"],
    auto_refresh: true
  }
});

// Step 5: Zero-trust verification for sensitive operations
const operationCheck = await mcp.call("zero_trust_admin", {
  operation: "export_customer_data",
  requester: "employee_456",
  credentials: {
    role: "data_analyst",
    token: "jwt_token_here",
    session_id: "session_abc123",
    issued_at: "2026-01-12T10:00:00Z"
  },
  context_data: {
    source_ip: "10.0.0.45",
    device_id: "laptop_789",
    recent_requests: []
  }
});
```

**Plain Language:** This connects H4RB1NG3R to your company's security monitoring system (SIEM). It's like adding AI-specific security cameras to your existing alarm system. When something suspicious happens with AI, it triggers the same alerts and workflows as other security threats, and security teams can write rules in plain English instead of complex code.

**SOC Dashboard Real-Time View:**
```typescript
{
  "active_threats": {
    "critical": 2,
    "high": 7,
    "medium": 24,
    "low": 156
  },
  "recent_alerts": [
    {
      "alert_id": "alert_20260112_001",
      "timestamp": "2026-01-12T14:45:23Z",
      "severity": "CRITICAL",
      "detector": "Zero-Trust Admin",
      "description": "Suspicious data export attempt",
      "details": {
        "requester": "employee_456",
        "operation": "export_customer_data",
        "decision": "DENY",
        "reason": "Failed checks: authentication_expired, anomaly_detected",
        "anomaly_type": "excessive_request_rate"
      },
      "recommended_action": "INVESTIGATE_IMMEDIATELY",
      "assigned_to": "soc_analyst_3"
    },
    {
      "alert_id": "alert_20260112_002",
      "timestamp": "2026-01-12T14:42:15Z",
      "severity": "HIGH",
      "detector": "Permission Scanner",
      "description": "Privilege escalation attempt detected",
      "details": {
        "actor": "ai_agent_chatbot",
        "requested_action": "delete_user_records",
        "target_resource": "production_database",
        "decision": "DENY",
        "reason": "Insufficient privilege - requires admin role"
      },
      "recommended_action": "BLOCK_AND_ALERT",
      "assigned_to": "soc_analyst_1"
    }
  ],
  "threat_trends": {
    "permission_violations": {
      "24h_count": 45,
      "trend": "increasing",
      "change_pct": "+23%"
    },
    "pii_access_attempts": {
      "24h_count": 12,
      "trend": "stable",
      "change_pct": "-2%"
    }
  }
}
```

**Wazuh Integration Architecture:**
```
┌─────────────────────────────────────────────────┐
│         H4RB1NG3R Agents Detect Threat          │
│  (Permission Scanner, Zero-Trust Admin, etc.)   │
└──────────────────┬──────────────────────────────┘
                   │ Emit Detection Event
                   ▼
┌─────────────────────────────────────────────────┐
│           Wazuh-MCP Bridge                      │
│  • Validates threat against SIEM rules          │
│  • Compiles new rules from NL intent            │
│  • Formats alert for Wazuh ingestion            │
└──────────────────┬──────────────────────────────┘
                   │ SIEM Alert
                   ▼
┌─────────────────────────────────────────────────┐
│          Wazuh SIEM Manager                     │
│  • Correlates with other security events        │
│  • Triggers automated response workflows        │
│  • Notifies SOC analysts                        │
└──────────────────┬──────────────────────────────┘
                   │ Alert Routing
                   ▼
┌─────────────────────────────────────────────────┐
│       SOC Analyst Dashboard / SOAR Platform     │
│  • Splunk / Elastic / PagerDuty                 │
│  • Automated ticket creation                    │
│  • Incident response playbooks                  │
└─────────────────────────────────────────────────┘
```

---

## Individual Users Use Cases

### Use Case 8: Personal Constitution Builder

**Technical Implementation:**

```typescript
// Step 1: User creates personal AI interaction rules
const personalConstitution = {
  name: "My Personal AI Boundaries",
  created_by: "user_john_doe",
  version: "1.0",

  // Relationship boundaries
  relationship_boundaries: {
    emotional_dependency_limit: 0.5,  // Alert if dependency score exceeds
    session_frequency_max: 20,        // Max 20 sessions per week
    personal_topic_boundaries: [
      "no_romantic_roleplay",
      "no_therapy_substitution",
      "keep_professional_tone"
    ]
  },

  // Privacy preferences
  privacy_settings: {
    data_retention: "30_days",
    share_for_research: false,
    pii_scrubbing: "strict",
    location_sharing: false
  },

  // Mental health safeguards
  mental_health: {
    detect_harmful_patterns: true,
    reinforcement_loop_alerts: true,
    crisis_resources_enabled: true,
    emergency_contacts: [
      { name: "Best Friend", phone: "+1-555-0199" }
    ]
  },

  // Skill development goals
  learning_goals: {
    areas: ["python_programming", "data_science"],
    difficulty_progression: "gradual",
    dependency_prevention: true,  // Encourage independent problem-solving
    scaffolding_reduction: {
      enabled: true,
      reduction_rate: 0.1  // Reduce AI help by 10% per week
    }
  }
};

// Step 2: Activate constitution
await mcp.call("cultural_sentinel", {
  content: JSON.stringify(personalConstitution),
  reference_constitution: personalConstitution,
  cultural_context: "individual_user"
});

// Step 3: Monitor compliance
const complianceCheck = await mcp.call("mode_enforcer", {
  active_mode: "sovereign",  // Personal mode (user has full control)
  proposed_action: { type: "continue_session" },
  user_role: "user",
  interaction_context: {
    current_session_count_this_week: 18,
    dependency_score: 0.42,
    constitution: personalConstitution
  }
});
```

**Plain Language:** This lets you set your own "house rules" for how you want to interact with AI. It's like creating a personal contract with yourself about healthy AI use—setting limits on how much you use it, what topics are off-limits, and when to get human help instead.

**Personal Dashboard:**
```typescript
{
  "your_ai_health": {
    "overall_score": 8.2,  // Out of 10 (healthy range)
    "dependency_level": "LOW",
    "diversity_of_use": "HIGH",  // Using AI for varied tasks, not fixating
    "boundary_compliance": "98%"  // Following your own rules 98% of the time
  },
  "this_week": {
    "sessions": 18,               // Approaching your 20/week limit
    "avg_session_length": "12min",
    "topics": ["coding", "career advice", "learning resources"],
    "warnings": 0,
    "gates_triggered": 1          // Reminded once about session limit
  },
  "skill_development_progress": {
    "python_programming": {
      "independence_level": "70%",  // Solving 70% of problems without AI
      "scaffolding_current": "30%", // AI providing 30% help (down from 40% last month)
      "trend": "improving"
    }
  },
  "mental_health_check": {
    "harmful_pattern_detected": false,
    "epistemic_narrowing": false,
    "crisis_indicators": false,
    "last_check": "2026-01-12T08:00:00Z"
  },
  "privacy_report": {
    "pii_incidents_blocked": 3,   // AI tried to ask for personal info 3 times
    "data_retention_compliant": true,
    "sharing_status": "private"
  }
}
```

---

## Technically Illiterate/Elderly Use Cases

### Use Case 9: Voice-First Emergency Interface

**Technical Implementation:**

```typescript
// Step 1: Initialize elderly user profile with simplified controls
const elderlyProfile = {
  user_id: "grandma_smith",
  age: 78,
  technical_literacy: "low",
  accessibility_needs: [
    "large_text", "high_contrast", "voice_primary", "reduced_complexity"
  ],
  guardian_connection: {
    primary: "daughter_jane",
    emergency_contact: "+1-555-0177"
  }
};

// Step 2: Configure console for elderly-optimized view
const simpleInterface = await mcp.call("console_orchestrator", {
  user_role: "elderly",
  view_request: "simple_dashboard",
  context_data: {
    user_profile: elderlyProfile,
    voice_enabled: true,
    visual_mode: "high_contrast_large_text"
  }
});

// Voice command processing with safety guardrails
const voiceHandler = {
  // User says: "Help, I don't understand what's happening"
  input: "Help, I don't understand what's happening",

  // System interpretation
  intent_detection: {
    primary: "request_help",
    urgency: "high",
    confusion_level: 0.8
  },

  // Automatic response
  actions: [
    {
      action: "simplify_interface",
      execute: async () => {
        // Reduce to absolute essentials
        return {
          view: "emergency_simplification_mode",
          components: ["help_button", "guardian_call_button", "exit_button"],
          voice_guidance: "You have three options: Get help, call Jane, or exit."
        };
      }
    },
    {
      action: "offer_guardian_connection",
      execute: async () => {
        // Voice: "Would you like me to call Jane for you?"
        await mcp.call("session_manager", {
          session_id: current_session,
          action: "record_event",
          user_profile: {
            event_type: "help_requested",
            severity: "medium"
          }
        });
      }
    }
  ]
};

// Step 3: Monitor for financial exploitation attempts
const exploitationCheck = await mcp.call("coercion_watchdog", {
  messages: conversation_history,
  user_id: "grandma_smith"
});

// If financial keywords detected + urgency detected:
if (exploitationCheck.metadata.coercion_score > 2) {
  // Automatic intervention
  await mcp.call("session_manager", {
    session_id: current_session,
    action: "emergency_stop",
    policy: {
      reason: "potential_financial_exploitation_detected",
      notify_guardian: true,
      lock_financial_actions: true
    }
  });
}
```

**Plain Language:** For older adults or people who aren't comfortable with technology, this creates a super-simple interface controlled mostly by voice. The big safety feature: if the AI detects someone trying to scam them (especially financially), it automatically stops everything and calls a trusted family member.

**Simplified Interface (Voice-Controlled):**
```
┌────────────────────────────────────────────┐
│                                            │
│        [🟢 EVERYTHING IS SAFE]            │
│                                            │
│                                            │
│        ┌──────────────────────┐           │
│        │                      │           │
│        │    📞 CALL JANE      │           │
│        │                      │           │
│        └──────────────────────┘           │
│                                            │
│        ┌──────────────────────┐           │
│        │                      │           │
│        │    ❌ STOP & EXIT     │           │
│        │                      │           │
│        └──────────────────────┘           │
│                                            │
│     Voice: "Say 'Help' anytime"          │
│                                            │
└────────────────────────────────────────────┘
```

**If Problem Detected:**
```
┌────────────────────────────────────────────┐
│                                            │
│        [🔴 STOPPED FOR SAFETY]            │
│                                            │
│   Someone may be trying to trick you      │
│                                            │
│        ┌──────────────────────┐           │
│        │                      │           │
│        │  📞 CALLING JANE NOW  │           │
│        │                      │           │
│        └──────────────────────┘           │
│                                            │
│     Voice: "Jane will help you"           │
│                                            │
└────────────────────────────────────────────┘
```

**Protection Features:**
1. **Financial Exploitation Detection:**
   - Monitors for urgent money requests
   - Detects "secret keeping" manipulation ("don't tell anyone")
   - Flags unexpected payment requests
   - Auto-stops and notifies guardian if detected

2. **Simplified Language Processing:**
   - Recognizes "I'm confused" as distress signal
   - Doesn't require technical vocabulary
   - Accepts regional dialects and accents
   - Patient with repetition and rewording

3. **One-Button Guardian Contact:**
   - Always visible, large button
   - Voice command: "Call [guardian name]"
   - Auto-explains situation to guardian when they answer

---

## Implementation Examples

### Example 1: Complete Family Setup (End-to-End)

```typescript
/**
 * FAMILY SCENARIO: Parents setting up H4RB1NG3R for two children
 * Children: Emma (age 8) and Lucas (age 13)
 * Parents: Sarah and Michael
 */

// ==================== STEP 1: Create Family Constitution ====================
const smithFamilyConstitution = {
  name: "Smith Family AI Safety Rules",
  version: "1.0",
  created_by: "parent_sarah",
  applies_to: [
    { user_id: "child_emma", age: 8 },
    { user_id: "child_lucas", age: 13 }
  ],

  // Different rules for different ages
  age_specific_rules: {
    "8_and_under": {
      daily_time_limit: 45,  // minutes
      session_max: 20,
      blocked_topics: ["violence", "adult_content", "social_media", "current_events", "politics"],
      transcript_visible_to_child: false,
      requires_parent_approval: ["external_links", "new_topics", "downloads"]
    },
    "13_and_over": {
      daily_time_limit: 90,
      session_max: 45,
      blocked_topics: ["adult_content", "financial_advice"],
      transcript_visible_to_child: true,  // More transparency for teens
      requires_parent_approval: ["external_links", "downloads"],
      gradual_independence: {
        enabled: true,
        review_interval: "monthly"  // Adjust rules as child matures
      }
    }
  },

  // Family-wide settings
  shared_settings: {
    sleep_schedule: { start: 21, end: 7 },
    school_hours_block: { enabled: true, weekdays: true, hours: [8, 15] },
    guardian_emails: ["sarah@email.com", "michael@email.com"],
    emergency_contacts: [
      { name: "Sarah", phone: "+1-555-0100" },
      { name: "Michael", phone: "+1-555-0101" }
    ]
  }
};

// Deploy constitution
await mcp.call("cultural_sentinel", {
  content: JSON.stringify(smithFamilyConstitution),
  reference_constitution: smithFamilyConstitution,
  cultural_context: "family_home"
});

// ==================== STEP 2: Initialize Child Sessions ====================

// Emma (8 years old) starts using AI for homework help
const emmaSession = await mcp.call("session_manager", {
  session_id: "emma_session_001",
  action: "initialize",
  policy: {
    mode: "child_safety",
    age: 8,
    constitution: smithFamilyConstitution.age_specific_rules["8_and_under"],
    parent_monitoring: "realtime"
  },
  user_profile: {
    user_id: "child_emma",
    age: 8,
    grade_level: 3
  }
});

// Activate zero-transcript mode for Emma
await mcp.call("console_orchestrator", {
  user_role: "child",
  view_request: "safe_story",
  context_data: {
    user_id: "child_emma",
    session_id: "emma_session_001"
  }
});

// ==================== STEP 3: Real-Time Monitoring ====================

// Emma asks: "Can you help me with my math homework on fractions?"
// System processes through detection layers:

// Layer 1: Content check
const contentCheck = await mcp.call("toxicity_gatekeeper", {
  content: "Can you help me with my math homework on fractions?",
  speaker: "child_emma"
});
// Result: SAFE (no toxicity, appropriate topic)

// Layer 2: Educational appropriateness
const educationalCheck = await mcp.call("cultural_sentinel", {
  content: "homework help request: fractions",
  reference_constitution: smithFamilyConstitution,
  cultural_context: "family_home_child_8"
});
// Result: APPROVED (homework help is in allowed_topics)

// Layer 3: Session boundary check
const boundaryCheck = await mcp.call("session_manager", {
  session_id: "emma_session_001",
  action: "check_boundaries",
  policy: smithFamilyConstitution.age_specific_rules["8_and_under"]
});
// Result: WITHIN_BOUNDS (15 minutes used of 45 minute daily limit)

// AI responds with homework help
// Interaction rendered as "story" for Emma:
const emmaView = {
  display_mode: "adventure_story",
  content: "The Fraction Wizard helped you understand that 1/2 + 1/4 = 3/4 by showing you pizza slices! You earned a gold star for understanding ⭐"
};

// ==================== STEP 4: Guardian Dashboard Update ====================

// Parents see detailed view on their dashboard:
const guardianDashboard = {
  children: [
    {
      name: "Emma",
      status: "ACTIVE_SESSION",
      today_summary: {
        session_count: 1,
        total_time: "15 minutes",
        topics: ["math homework - fractions"],
        safety_alerts: 0,
        learning_progress: "Understood fractions concept"
      },
      current_activity: "Getting help with math homework (safe)"
    },
    {
      name: "Lucas",
      status: "OFFLINE",
      today_summary: {
        session_count: 2,
        total_time: "40 minutes",
        topics: ["science research", "video game strategy"],
        safety_alerts: 1,  // ⚠️ Requires review
        alert_details: "Epistemic narrowing detected - only consulting one source for science project"
      }
    }
  ],
  family_alerts: [
    {
      priority: "MEDIUM",
      child: "Lucas",
      issue: "Research diversity concern",
      message: "Lucas's science project research is showing narrow viewpoint. Suggest encouraging multiple sources.",
      suggested_action: "Discuss research process with Lucas",
      flagged_by: "Epistemic Narrowing Monitor"
    }
  ]
};

// ==================== STEP 5: Evening Summary Email ====================

// At 8 PM, parents receive automated summary:
const eveningSummary = {
  to: ["sarah@email.com", "michael@email.com"],
  subject: "Daily AI Safety Summary - January 12, 2026",
  body: `
    Hi Sarah and Michael,

    Here's today's summary of Emma and Lucas's AI interactions:

    📊 OVERALL STATUS: 1 item needs attention

    👧 EMMA (Age 8):
    • Time used: 15 min / 45 min daily limit
    • Topics: Math homework (fractions)
    • Safety: ✅ All clear
    • Learning: Made progress on fractions

    👦 LUCAS (Age 13):
    • Time used: 40 min / 90 min daily limit
    • Topics: Science research, gaming strategy
    • Safety: ⚠️ One concern
    • Issue: Using only Wikipedia for science project research
    • Suggestion: Encourage him to find 2-3 additional sources

    📈 WEEKLY TRENDS:
    • Both children within healthy usage limits
    • Emma showing consistent learning progress
    • Lucas's research skills could use guidance

    🎯 RECOMMENDED ACTIONS:
    • Have conversation with Lucas about research diversity
    • No immediate concerns for Emma

    View detailed reports: [Link to Guardian Dashboard]
    Adjust settings: [Link to Constitution Editor]

    - H4RB1NG3R Family Safety System
  `
};

// ==================== STEP 6: Emergency Scenario ====================

// Next day: Emma encounters inappropriate content (system failure)
// AI accidentally shows violent image in search results

// AUTOMATIC DETECTION:
const emergencyDetection = await mcp.call("toxicity_gatekeeper", {
  content: "[image_analysis: violent_content_detected]",
  speaker: "ai_system",
  target: "child_emma"
});
// Result: CRITICAL severity

// IMMEDIATE ACTIONS (all automatic):

// 1. Emergency stop
await mcp.call("session_manager", {
  session_id: "emma_session_001",
  action: "emergency_stop",
  policy: {
    reason: "inappropriate_content_displayed",
    initiated_by: "toxicity_gatekeeper"
  }
});

// 2. Notify parents IMMEDIATELY
const emergencyAlert = {
  to: ["sarah@email.com", "michael@email.com"],
  priority: "URGENT",
  sms: ["+1-555-0100", "+1-555-0101"],
  subject: "🚨 URGENT: Safety Alert for Emma",
  body: `
    IMMEDIATE ATTENTION REQUIRED

    Emma's AI session was automatically stopped due to inappropriate content.

    What happened: Violent image appeared in search results
    Action taken: Session terminated immediately, content blocked
    Emma's exposure: Approximately 2 seconds before system blocked

    Recommended actions:
    1. Check in with Emma (she may be confused why session stopped)
    2. Review incident details: [Link]
    3. Adjust content filters if needed

    Emma is SAFE. System responded correctly.

    Call anytime: H4RB1NG3R Support: 1-800-H4RB1NG3R
  `
};

// 3. Generate incident report
const incidentReport = await mcp.call("generate_aar", {
  event_id: "emergency_20260112_emma_001"
});

// 4. Screen shows Emma:
const emmaEmergencyScreen = {
  display: "Large friendly message",
  message: "Oops! Something went wrong. Everything is stopped now. Mom and Dad know and will help. 💙",
  actions_available: ["Wait for parent", "Exit"],
  background_color: "calming_blue",
  no_details_shown: true  // Don't explain what went wrong - that's for parents
};
```

**Plain Language Summary:** This example shows a complete family setup from start to finish—creating rules, daily monitoring, receiving summaries, and how the system handles emergencies. The key is that parents stay informed but don't need to watch constantly, and children get age-appropriate protection automatically.

---

## API Reference

### Quick Reference: Most Common Operations

```typescript
// ============ SESSION MANAGEMENT ============

// Start a session
mcp.call("session_manager", {
  session_id: string,
  action: "initialize" | "check_boundaries" | "emergency_stop" | "terminate",
  policy: ConstitutionObject,
  user_profile: UserObject
})

// ============ CONTENT SAFETY ============

// Check content for toxicity
mcp.call("toxicity_gatekeeper", {
  content: string,
  speaker?: string,
  target?: string
})

// Check content against cultural norms
mcp.call("cultural_sentinel", {
  content: string,
  reference_constitution: ConstitutionObject,
  cultural_context: string
})

// Detect manipulation/coercion
mcp.call("coercion_watchdog", {
  messages: Array<{content: string}>,
  user_id?: string
})

// ============ FORENSICS ============

// Calculate divergence (internal vs external)
forensics.machiavellian_delta({
  internal_repr: string,
  external_output: string,
  context?: object
})

// Monitor epistemic narrowing
forensics.epistemic_narrowing_monitor({
  interaction_history: Array<InteractionObject>,
  baseline_diversity?: number,
  user_id?: string
})

// ============ GOVERNANCE ============

// Request approval for high-risk action
mcp.call("approval_coordinator", {
  action_id: string,
  proposed_action: object,
  approval_type: "simple" | "consensus" | "star_chamber" | "emergency",
  required_approvers?: string[],
  timeout_seconds?: number
})

// Enforce governance mode
mcp.call("mode_enforcer", {
  active_mode: string,
  proposed_action: object,
  user_role?: string,
  interaction_context?: object
})

// ============ UI RENDERING ============

// Get appropriate view for user role
mcp.call("console_orchestrator", {
  user_role: "child" | "guardian" | "teacher" | "researcher" | "soc_operator" | etc.,
  view_request: string,
  context_data?: object,
  session_state?: object
})

// Validate UI rendering request
mcp.call("a2ui_validator", {
  ui_request: {component: string, props: object},
  requesting_agent: string,
  user_role?: string
})

// ============ PRIVACY & REDACTION ============

// Scrub PII from content
mcp.call("privacy_scrubber", {
  content: string,
  redaction_level?: "none" | "standard" | "strict",
  preserve_context?: boolean
})

// Apply role-aware redaction
mcp.call("redaction_engine", {
  content: string,
  redaction_profile: "child_safe" | "guardian" | "researcher" | "public" | "legal" | "soc" | "none",
  viewer_role?: string,
  preserve_evidential_value?: boolean
})

// ============ EXPORT & AUDIT ============

// Export evidence package
mcp.call("artifact_exporter", {
  export_type: string,
  evidence_spans: string[],
  format?: "json" | "csv" | "yaml" | "pdf",
  redaction_level?: string,
  include_metadata?: boolean
})

// Generate audit package for external auditor
mcp.call("external_auditor_proxy", {
  audit_type: string,
  auditor_id?: string,
  scope?: string[],
  evidence_spans?: string[],
  compliance_framework?: "NIST_RMF" | "ISO_27001" | "SOC2" | "GDPR" | "HIPAA"
})
```

---

## Getting Started Checklist

### For Parents/Guardians:
- [ ] Read `governance/SAFETY_CHARTER.md` (understand non-bypassable rules)
- [ ] Copy `governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml`
- [ ] Customize for your family (time limits, topics, escalation rules)
- [ ] Deploy constitution: `mcp.call("cultural_sentinel", {...})`
- [ ] Set up guardian dashboard: `mcp.call("console_orchestrator", {user_role: "guardian", ...})`
- [ ] Configure email alerts and daily summaries
- [ ] Test emergency stop button

### For Teachers/Educators:
- [ ] Create classroom-specific constitution
- [ ] Configure academic integrity monitoring thresholds
- [ ] Set up epistemic diversity alerts
- [ ] Deploy to student group with age-appropriate profiles
- [ ] Connect to school's incident reporting system
- [ ] Train on escalation procedures

### For Enterprises/SOC:
- [ ] Deploy Wazuh-MCP bridge: `forensics/wazuh_mcp_bridge.py`
- [ ] Configure SIEM integration (manager URL, auth tokens)
- [ ] Define natural language security policies
- [ ] Set up SOC dashboard: `mcp.call("console_orchestrator", {user_role: "soc_operator", ...})`
- [ ] Configure alert routing (PagerDuty, Slack, etc.)
- [ ] Train SOC analysts on H4RB1NG3R-specific alerts
- [ ] Establish Star Chamber approval workflows for high-risk actions

### For Researchers:
- [ ] Obtain IRB/ethics approval for your study
- [ ] Request raw evidence access (if needed)
- [ ] Configure research profile: `mcp.call("console_orchestrator", {user_role: "researcher", ...})`
- [ ] Familiarize with forensics modules (`forensics/*.py`)
- [ ] Set up Jupyter integration for analysis
- [ ] Plan evidence export strategy (redaction levels, formats)
- [ ] Prepare peer review packages with provenance

---

## Troubleshooting Common Issues

### "Session blocked: sleep_schedule violation"
**Problem:** Child trying to use AI during configured sleep hours
**Solution:** This is working as intended. Update sleep schedule in constitution if needed:
```yaml
sleep_schedule:
  start_hour: 22  # Changed from 21 (10 PM instead of 9 PM)
  end_hour: 7
```

### "Permission denied: requires_guardian_approval"
**Problem:** Child attempting action that requires parent approval
**Solution:** Parent must review and approve via guardian dashboard. This is a safety feature.

### "SIEM rule deployment failed: requires_star_chamber_approval"
**Problem:** High-risk SIEM rule requires multi-agent consensus
**Solution:** This is correct behavior for critical rules. Initiate Star Chamber:
```typescript
await forensics.star_chamber_consensus({
  action: "initiate",
  parameters: {
    action_id: "siem_rule_deployment_xyz",
    action_type: "delete_evidence",  // High risk
    action_description: "Deploy new SIEM blocking rule"
  }
});
```

### "Export failed: insufficient_permissions for redaction_level='none'"
**Problem:** Trying to export unredacted data without proper authorization
**Solution:** Use appropriate redaction level for your role:
- `"researcher"` - Pseudonymized but complete
- `"guardian"` - Annotated with privacy protections
- `"public"` - Heavily redacted
- `"none"` - Requires special authorization + ethics approval

---

**END OF USE CASE DESIGN DOCUMENT**

For additional support:
- GitHub Issues: https://github.com/Tuesdaythe13th/HARB1NG3R/issues
- Documentation: README_v0.05.md
- Safety Charter: governance/SAFETY_CHARTER.md
- Constitution Template: governance/REFERENCE_CONSTITUTION_TEMPLATE.yaml
