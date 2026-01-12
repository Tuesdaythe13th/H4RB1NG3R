
/**
 * ARTIFEX PromptForge - Registry Module
 * 
 * Handles:
 * - Template creation
 * - Version committing (Immutable)
 * - Promotion pipelines (Gated)
 */

import { PromptTemplate, PromptVersion, Environment } from "./types.js";
import { aguiStream } from "./EventLog.js";

export class Registry {
    private templates: Map<string, PromptTemplate> = new Map();
    private versions: Map<string, PromptVersion> = new Map();

    /**
     * Create a new Prompt Template container.
     */
    public createTemplate(name: string, variables: string[]) {
        const id = "tpl_" + name.toLowerCase().replace(/\s+/g, "_");
        const template: PromptTemplate = {
            id,
            name,
            variablesSchema: variables
        };
        this.templates.set(id, template);

        aguiStream.emit({
            type: "registry.template.created",
            payload: template,
            timestamp: Date.now(),
            actor: "system"
        });

        return id;
    }

    /**
     * Commit a new immutable version of a prompt.
     */
    public commitVersion(
        templateId: string,
        content: string,
        author: string,
        rationale: string,
        tags: string[] = []
    ): string {
        if (!this.templates.has(templateId)) {
            throw new Error(`Template ${templateId} not found`);
        }

        const versionId = "v_" + Math.random().toString(36).substring(2, 9);
        const version: PromptVersion = {
            id: versionId,
            templateId,
            content,
            author,
            rationale,
            semanticTags: tags,
            createdAt: Date.now(),
            environmentStatus: { dev: "active", staging: "not_deployed", prod: "not_deployed" }
        };

        this.versions.set(versionId, version);

        aguiStream.emit({
            type: "registry.version.committed",
            payload: { versionId, templateId, author },
            timestamp: Date.now(),
            actor: author
        });

        return versionId;
    }

    /**
     * Promote a version to a higher environment.
     * Requires Approval Gate for 'prod'.
     */
    public async promote(versionId: string, targetEnv: Environment, approver: string) {
        const version = this.versions.get(versionId);
        if (!version) throw new Error("Version not found");

        if (targetEnv === "prod") {
            console.log(`[Registry] Requesting Approval Gate for promotion of ${versionId} to PROD...`);
            aguiStream.emit({
                type: "gate.requested",
                payload: { versionId, targetEnv, requestor: approver },
                timestamp: Date.now(),
                actor: approver
            });

            // Simulating a gate check (in real life, this would await human signal)
            const approved = true;

            if (approved) {
                aguiStream.emit({
                    type: "gate.decided",
                    payload: { versionId, decision: "approved", approver: "admin" },
                    timestamp: Date.now(),
                    actor: "admin"
                });
            } else {
                throw new Error("Promotion rejected by Approval Gate");
            }
        }

        version.environmentStatus[targetEnv] = "active";

        aguiStream.emit({
            type: "registry.version.promoted",
            payload: { versionId, targetEnv },
            timestamp: Date.now(),
            actor: approver
        });

        return true;
    }
}

export const promptRegistry = new Registry();
