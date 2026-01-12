
import React from 'react';
import { Incident } from '../types';
import { ICONS } from '../constants';

interface ForensicsProps {
    incidents: Incident[];
}

const Forensics: React.FC<ForensicsProps> = ({ incidents }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        <ICONS.Database className="text-blue-500" />
                        Forensic Evidence Vault
                    </h2>
                    <p className="text-sm text-slate-500">Persistent storage of all system interdictions and audits.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-blue-900/30 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                        <ICONS.Search className="w-4 h-4" />
                        FILTER CASES
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                        <ICONS.Lock className="w-4 h-4" />
                        EXPORT ALL
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-900/30 border border-blue-900/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-950/40 border-b border-blue-900/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Incident ID</th>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Diagnostic Vector</th>
                                <th className="px-6 py-4">Severity</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900/10 text-xs">
                            {incidents.map((incident) => (
                                <tr key={incident.id} className="hover:bg-slate-900/40 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-blue-400">{incident.id}</td>
                                    <td className="px-6 py-4 text-slate-400">{new Date(incident.timestamp).toLocaleString()}</td>
                                    <td className="px-6 py-4 font-bold text-slate-300">{incident.type}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${incident.severity === 'critical' ? 'bg-rose-500/10 text-rose-500' :
                                                incident.severity === 'high' ? 'bg-orange-500/10 text-orange-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {incident.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-slate-400 uppercase tracking-tighter">ARCHIVED</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-500 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                            VIEW REPORT
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Forensics;
