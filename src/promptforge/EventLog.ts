
/**
 * AG-UI Event Stream & Artifact Store
 * 
 * The underlying substrate for PromptForge.
 * - Event Log: Append-only ledger of all actions.
 * - Artifact Store: Content-addressed storage (mocked here).
 */

import { RegistryEvent } from "./types.js";
import * as fs from "fs";

export class AGUIEventSubstrate {
    private events: RegistryEvent[] = [];
    private artifacts: Map<string, string> = new Map();
    private logPath = "src/promptforge/event_log.jsonl";

    constructor() {
        // Attempt to load existing log
        if (fs.existsSync(this.logPath)) {
            // simplified load for demo
        }
    }

    public emit(event: RegistryEvent) {
        this.events.push(event);
        console.log(`[AG-UI Event] ${event.type}: ${JSON.stringify(event.payload)}`);
        // Persist to disk (append-only)
        fs.appendFileSync(this.logPath, JSON.stringify(event) + "\n");
    }

    public getEvents(): RegistryEvent[] {
        return this.events;
    }

    public storeArtifact(content: string): string {
        // Generate a pseudo-hash ID
        const id = "blob_" + Math.random().toString(36).substring(2, 15);
        this.artifacts.set(id, content);
        return id;
    }

    public getArtifact(id: string): string | undefined {
        return this.artifacts.get(id);
    }
}

export const aguiStream = new AGUIEventSubstrate();
