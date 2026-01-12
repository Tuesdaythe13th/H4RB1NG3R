
/**
 * BYO-LLM Provider Configuration
 * Allows dynamic injection of API keys for "Sovereign" or "Enterprise" deployment.
 */

export interface LLMConfig {
    provider: "openai" | "anthropic" | "google" | "local" | "hf_inference";
    apiKey?: string;
    baseUrl?: string;
    modelName: string;
}

export class ModelProvider {
    private static instance: ModelProvider;
    private configs: Map<string, LLMConfig> = new Map();

    private constructor() { }

    public static getInstance(): ModelProvider {
        if (!ModelProvider.instance) {
            ModelProvider.instance = new ModelProvider();
        }
        return ModelProvider.instance;
    }

    /**
     * Register a user's API key for a specific provider.
     * This is called by the 'Console Orchestrator' when a user inputs keys via A2UI.
     */
    public registerConfig(userId: string, config: LLMConfig) {
        console.log(`[ModelProvider] Registering BYO-LLM config for user ${userId} using ${config.provider}`);
        this.configs.set(userId, config);
    }

    /**
     * Retrieve the client for the specific user context.
     * In a real implementation, this would return an instantiated client (e.g. OpenAI SDK).
     */
    public getClient(userId: string) {
        const config = this.configs.get(userId);
        if (!config) {
            throw new Error(`No configuration found for user ${userId}. Please use the A2UI to set 'OPENAI_API_KEY' etc.`);
        }
        return {
            type: config.provider,
            key: config.apiKey ? "****" + config.apiKey.slice(-4) : "LOCAL",
            execute: async (prompt: string) => {
                return `[MOCK] Executed '${prompt.slice(0, 20)}...' on ${config.modelName} via ${config.provider}`;
            }
        };
    }
}
