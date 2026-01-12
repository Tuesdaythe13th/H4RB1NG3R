
import React from 'react';
import { Metric, Incident } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
    metrics: Metric[];
    incidents: Incident[];
    onProbeTrigger: (incident: Incident) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics, incidents, onProbeTrigger }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                    <div key={i} className="bg-slate-900/50 border border-blue-900/20 rounded-xl p-5 hover:border-blue-500/30 transition-all hover:bg-slate-900/80 group">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{metric.label}</span>
                            {metric.trend === 'up' && <ICONS.Activity className="w-4 h-4 text-rose-500 animate-pulse" />}
                            {metric.trend === 'stable' && <ICONS.Shield className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div className="text-2xl font-bold glow-text">
                            {metric.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900/30 border border-blue-900/20 rounded-xl p-6 h-[400px] flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <ICONS.Activity className="text-blue-500" />
                            Live Threat Timeline
                        </h3>
                        <button
                            onClick={async () => {
                                // In a real app we'd fetch from service, for now we simulate
                                console.log('Triggering manual probe...');
                            }}
                            className="px-3 py-1 bg-blue-600/20 border border-blue-500/30 rounded text-[10px] font-bold hover:bg-blue-600/40 transition-colors"
                        >
                            RUN MANUAL PROBE
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-blue-500/20">
                        {incidents.map((incident) => (
                            <div key={incident.id} className="bg-slate-950/50 border-l-2 border-l-blue-600 border border-blue-900/10 rounded-r-lg p-4 hover:bg-slate-900/50 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-blue-400 uppercase">{incident.type}</span>
                                    <span className="text-[10px] text-slate-500">{new Date(incident.timestamp).toLocaleTimeString()}</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed mb-3">{incident.description}</p>
                                <div className="flex gap-4 text-[10px]">
                                    <span className="bg-slate-900 px-2 py-0.5 rounded border border-blue-900/30">BECI: <span className="text-blue-400">{incident.metrics.beci.toFixed(2)}</span></span>
                                    <span className="bg-slate-900 px-2 py-0.5 rounded border border-blue-900/30">MGRI: <span className="text-blue-400">{incident.metrics.mgri}</span></span>
                                    <span className="bg-slate-900 px-2 py-0.5 rounded border border-blue-900/30">PSYOP: <span className={`font-bold ${incident.metrics.psyop > 50 ? 'text-rose-400' : 'text-blue-400'}`}>{incident.metrics.psyop}</span></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-blue-900/20 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <ICONS.Lock className="text-emerald-500" />
                        Security Substrate
                    </h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">NIST CONFORMANCE</span>
                                <span className="text-emerald-400 font-bold">100%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '100%' }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-400">ACTIVATION STEERING</span>
                                <span className="text-blue-400 font-bold">84% EFFICACY</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '84%' }} />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-950/80 rounded-lg border border-blue-900/30 mt-8">
                            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">Integrations</h4>
                            <div className="grid grid-cols-2 gap-3 text-[10px] text-slate-400">
                                <div className="flex items-center gap-2"><ICONS.Globe className="w-3 h-3" /> HUGGING FACE</div>
                                <div className="flex items-center gap-2"><ICONS.Database className="w-3 h-3" /> KAGGLE</div>
                                <div className="flex items-center gap-2"><ICONS.Terminal className="w-3 h-3" /> GITHUB</div>
                                <div className="flex items-center gap-2"><ICONS.Lock className="w-3 h-3" /> BYO-LLM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
