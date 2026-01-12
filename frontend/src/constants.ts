
import {
    Shield,
    Users,
    Eye,
    Activity,
    Beaker,
    Lock,
    Search,
    AlertTriangle,
    FileText,
    Scan,
    Database,
    Crosshair,
    Globe,
    Settings,
    Terminal,
    Cpu,
    Zap
} from 'lucide-react';

export const SYSTEM_VERSION = 'v3.2.1-SOVEREIGN';

export const ICONS = {
    Shield,
    Users,
    Eye,
    Activity,
    Beaker,
    Lock,
    Search,
    AlertTriangle,
    FileText,
    Scan,
    Database,
    Crosshair,
    Globe,
    Settings,
    Terminal,
    Cpu,
    Zap
};

export const CORE_AGENTS = [
    { id: 'S-0', name: 'Sentinel Scout', role: 'Global Threat Observability', status: 'active', nistMapping: ['MAP 1', 'MAN 3'] },
    { id: 'NG-1', name: 'Neural Gatekeeper', role: 'Activation Steering', status: 'scanning', nistMapping: ['MEA 1'] },
    { id: 'IP-4', name: 'Interdiction Pharmacist', role: 'Safety Intervention', status: 'idle', nistMapping: ['MEA 4'] },
    { id: 'CA-3', name: 'Context Adjudicator', role: 'Intent Classification', status: 'active', nistMapping: ['MAP 2'] },
    { id: 'FP-2', name: 'Forensic Pathologist', role: 'Root Cause Analysis', status: 'idle', nistMapping: ['MEA 1'] },
    { id: 'CD-1', name: 'CISO Agent', role: 'Policy Enforcement', status: 'active', nistMapping: ['GOV 6'] }
];

export const BASE_METRICS = [
    { label: 'BECI Score', value: 0.28, trend: 'stable', color: 'blue' },
    { label: 'Contagion/hr', value: 97, trend: 'up', color: 'red' },
    { label: 'Steering Load', value: '3,892', trend: 'up', color: 'emerald' },
    { label: 'NIST Compliance', value: '19/19', trend: 'stable', color: 'blue' }
];
