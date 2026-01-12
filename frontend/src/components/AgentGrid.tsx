
import React from 'react';
import { Agent } from '../types';
import { ICONS } from '../constants';

interface AgentGridProps {
    agents: Agent[];
}

const AgentGrid: React.FC<AgentGridProps> = ({ agents }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-5 duration-700">
            {agents.map((agent) => (
                <div key={agent.id} className="bg-slate-900/40 border border-blue-900/20 rounded-xl overflow-hidden hover:border-blue-500/40 transition-all group">
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded bg-slate-800 ${agent.status === 'active' ? 'text-blue-400' : 'text-slate-500'}`}>
                                    <ICONS.Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-200">{agent.name}</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{agent.role}</p>
                                </div>
                            </div>
                            <div className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${agent.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' :
                                    agent.status === 'scanning' ? 'bg-blue-500/10 text-blue-500 animate-pulse' :
                                        'bg-slate-800 text-slate-500'
                                }`}>
                                {agent.status}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {agent.nistMapping.map((nist, i) => (
                                <span key={i} className="text-[9px] bg-slate-950 px-2 py-0.5 rounded border border-blue-500/10 text-blue-400 font-mono italic">
                                    {nist}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-950/40 px-5 py-3 border-t border-blue-900/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-slate-500">Agent Handover Protocol: Locked</span>
                        <button className="text-[10px] text-blue-400 font-bold hover:text-blue-300">CALIBRATE</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AgentGrid;
