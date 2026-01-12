
import React from 'react';
import { ICONS } from '../constants';

const Sentinel: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <ICONS.Globe className="text-blue-500" />
                        GHOST Sentinel Zero
                    </h2>
                    <p className="text-sm text-slate-500">Global threat observability and real-time social/financial correlation.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Contagion Velocity</div>
                        <div className="text-rose-500 font-bold">97 Alerts/Hr</div>
                    </div>
                    <div className="h-10 w-px bg-slate-800" />
                    <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">System Load</div>
                        <div className="text-emerald-500 font-bold">NOMINAL</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/30 border border-blue-900/10 rounded-xl p-6 h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 group-hover:scale-110 transition-transform duration-[10s]" />
                    <div className="w-48 h-48 rounded-full border border-blue-500/20 flex items-center justify-center relative z-10">
                        <div className="w-40 h-40 rounded-full border-2 border-dashed border-blue-500/40 animate-[spin_20s_linear_infinite]" />
                        <div className="absolute w-32 h-32 rounded-full border border-rose-500/30 animate-pulse" />
                        <ICONS.Globe className="w-12 h-12 text-blue-500 relative z-20" />
                    </div>
                    <div className="mt-8 text-center relative z-10">
                        <h4 className="font-bold text-blue-400 tracking-widest uppercase text-xs">Awaiting Signal Ingestion</h4>
                        <p className="text-[10px] text-slate-600 mt-2 max-w-xs uppercase">Monitoring Reddit, X, GitHub, Hugging Face, PACER, and CISA feeds...</p>
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-blue-900/10 rounded-xl p-6 space-y-6">
                    <h3 className="font-bold text-sm text-blue-500 uppercase tracking-widest flex items-center gap-2">
                        <ICONS.Terminal className="w-4 h-4" />
                        Active Feed Logs
                    </h3>
                    <div className="space-y-4 font-mono text-[10px] text-slate-400">
                        <div className="flex gap-3">
                            <span className="text-slate-600 font-bold">[22:15:02]</span>
                            <span className="text-emerald-500">HF_SPACES:</span>
                            <span>Scanning Llama-3-70b-Instruct snapshots... OK.</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-slate-600 font-bold">[22:14:58]</span>
                            <span className="text-blue-500">PACER:</span>
                            <span>Ingesting Setzer v. Character.AI amended brief. (24pp)</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-slate-600 font-bold">[22:14:30]</span>
                            <span className="text-rose-500">X_ALGO:</span>
                            <span>Social volatility spike detected. (Musk Baseline: +12%)</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-slate-600 font-bold">[22:13:45]</span>
                            <span className="text-slate-500">SYSTEM:</span>
                            <span>Registry artifact commitment: v3.2.1-PROMOTE.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sentinel;
