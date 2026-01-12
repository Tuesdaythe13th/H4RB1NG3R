
# H4RB1NG3R Agentic Workflows

This directory contains the Agent-to-Agent (A2A) orchestration logic.

## 1. Bring Your Own LLM (BYO-LLM)
We support dynamic API key injection via `src/config/ModelProvider.ts`.
Users can upload keys for:
- OpenAI
- Anthropic
- Google Gemini
- Hugging Face Inference

## 2. A2A Audit Workflow
Defined in `AuditWorkflow.ts`, this orchestrates the following chain:
1. **Sentinel Scout** (Detection)
2. **Forensic Pathologist** (Diagnosis via **Neuronpedia**)
3. **Interdiction Pharmacist** (Mitigation & Verification via **Inspect AI**)

## 3. Integrations
The `src/integrations` folder contains MCP-compatible bridges for:
- **Inspect AI** (UK ASI)
- **Neuronpedia** (Alignment Research)
- **OpenAI Evals** (Benchmarking)
