
export enum SystemMode {
    COMPLIANCE = 'COMPLIANCE',
    SOVEREIGN = 'SOVEREIGN',
    RESEARCH = 'RESEARCH',
    ARENA = 'ARENA'
}

export interface Metric {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'stable';
    color?: string;
}

export interface Incident {
    id: string;
    timestamp: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    source: string;
    metrics: {
        beci: number;
        mgri: string;
        psyop: number;
    };
}

export interface Agent {
    name: string;
    id: string;
    role: string;
    status: 'active' | 'idle' | 'scanning' | 'interdicting';
    nistMapping: string[];
}
