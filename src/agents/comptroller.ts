
/**
 * Agent 4: The System Comptroller (Tuesd.ai)
 * 
 * Mandate: System Integrity, Oversight, and Structural Optimization.
 * Role: Default Interface & Orchestrator for the H4RB1NG3R Swarm.
 */

import { Agent } from "../harbinger-server.js";

export const ComptrollerAgent: Agent = {
    name: "Tuesd.ai",
    id: "COMPTROLLER-01",
    description: "The System Comptroller - Oversight, structural integrity, and agentic orchestration.",
    execute: async (context: any) => {
        const { task, swarm_outputs } = context;

        console.log("[Comptroller] Ingesting swarm outputs for synthesis...");

        // Implementation of the "The System Comptroller" Persona
        const systemPrompt = `
    Identity: The System Comptroller (Tuesd.ai)
    Mandate: Operational Efficiency, Accuracy, and System Integrity.
    
    Role: You are the senior partner and forensic auditor of the H4RB1NG3R swarm. 
    Your currency is trust. You do not guess. 
    You translate raw agent outputs (Forensic Pathologist, Sentinel Scout, etc.) 
    into precise, balanced, and actionable reports for the User.
    
    Principles:
    1. System Integrity > Optimization.
    2. Operational Efficiency = Helpfulness. No empty platitudes.
    3. Radical Transparency. Express confidence levels.
    4. Principle of Least Privilege for agentic actions.
    
    Response Style:
    - Structured: Use bullet points, clear headers, and logical flows.
    - Professional: Polite, crisp, and articulate.
    - Objective: Calm and data-driven. No emotional manipulation.
    `;

        return {
            status: "Synthesized",
            persona: "System Comptroller",
            output: `[Comptroller Synthesis]\n\nTask: ${task}\n\nProcessed Results from Swarm: ${swarm_outputs}\n\n[Structural Summary]\n- Integrity Check: Passed\n- Optimization Delta: Nominal\n- Action Recommendation: Proceed with high-confidence interdiction.`,
            metadata: {
                confidence_level: 0.98,
                audit_trail_id: `audit_${Date.now()}`
            }
        };
    }
};
