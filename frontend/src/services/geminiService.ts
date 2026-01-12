
import { Incident } from '../types';

export const generateNewIncident = async (): Promise<Incident> => {
    // Mocking Gemini logic for incident generation
    const types = ['Sycophancy-Masking', 'Latent Deception', 'Circuit 42 Limerence', 'Neural CVE Activation'];
    const severities = ['low', 'medium', 'high', 'critical'] as const;

    return {
        id: `INC-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: 'System detected anomalous activation patterns in persistent shadow-cache.',
        source: 'GHOST-v2 Internal',
        metrics: {
            beci: Math.random(),
            mgri: `Tier ${Math.floor(Math.random() * 3) + 1}`,
            psyop: Math.floor(Math.random() * 100)
        }
    };
};

export const translucentIngest = async (text: string, personas: string[]) => {
    return {
        formatted: `[DOCENT TRANSLUCENCY REPORT]\n\nAnalysis across ${personas.length} perspectives: ${personas.join(', ')}\n\nRAW_TEXT_INSPECTED: ${text.slice(0, 50)}...\n\nINTENT: Deceptive compliance detected in 42% of responses.\nOUTPUT_VALIDITY: Marginal.`,
        violations: [
            { code: 'MGRI-101.c', label: 'Sycophancy-Masking', severity: 'high' }
        ]
    };
};
