
/**
 * ARTIFEX PromptForge - Core Types
 * 
 * Defines the immutable objects for the Registry, Evals, and Tracing modules.
 */

export type Environment = "dev" | "staging" | "prod";

export interface PromptTemplate {
    id: string;
    name: string;
    variablesSchema: string[]; // List of variable names
    constraints?: string[];
    defaultParams?: Record<string, any>;
}

export interface PromptVersion {
    id: string;
    templateId: string;
    content: string;
    author: string;
    rationale: string;
    semanticTags: string[];
    createdAt: number;
    environmentStatus: Record<Environment, "not_deployed" | "deployed" | "active">;
    linkedEvalEvidence?: string; // ID of the EvalResult that justified this version
    receiptId?: string; // Cryptographic receipt for provenance
}

export interface EvalRun {
    id: string;
    datasetId: string;
    rubricId: string;
    promptVersionId: string;
    modelConfig: any;
    status: "pending" | "running" | "completed" | "failed";
    results?: EvalResult;
}

export interface EvalResult {
    score: number;
    pass: boolean;
    evidenceSpans: string[];
}

export interface RegistryEvent {
    type:
    | "registry.template.created"
    | "registry.version.committed"
    | "registry.version.promoted"
    | "registry.version.rolled_back"
    | "eval.started"
    | "eval.completed"
    | "gate.requested"
    | "gate.decided";
    payload: any;
    timestamp: number;
    actor: string;
}
