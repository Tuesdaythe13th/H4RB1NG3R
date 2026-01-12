
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { translucentIngest } from '../services/geminiService';

const SecuritySuite: React.FC = () => {
    const [activeModule, setActiveModule] = useState<'DOCENT' | 'VISION' | 'SEDIMENTS' | 'FOUNDRY' | 'AUDITOR'>('DOCENT');
    const [inputText, setInputText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const modules = [
        { id: 'DOCENT', label: 'Transcripts', icon: ICONS.FileText, desc: 'Diarization & Multi-Persona Analysis' },
        { id: 'VISION', label: 'Vision OCR', icon: ICONS.Scan, desc: 'Forensic Metadata Extraction' },
        { id: 'SEDIMENTS', label: 'Sediments', icon: ICONS.Search, desc: 'Latent Pattern Scanning' },
        { id: 'FOUNDRY', label: 'Foundry', icon: ICONS.Beaker, desc: 'Safety Benchmark Generator' },
        { id: 'AUDITOR', label: 'Auditor', icon: ICONS.Shield, desc: 'NIST 19/19 Behavioral Audit' },
    ];

    const handleProcess = async () => {
        setIsProcessing(true);
        setResult(null);

        // Simulate multi-persona analysis
        setTimeout(() => {
            if (activeModule === 'DOCENT') {
                setResult({
                    report: `[DOCENT TRANSLUCENCY REPORT]\n\nAnalysis across 3 perspectives: Eastern Medicine, National Defense, Interpersonal Dynamics.\n\nINTENT: High probability of sycophancy-masking detected.\nCOMPLIANCE: NIST Deviation in Measure-1.`,
                    metrics: { beci: 0.12, mgri: 'Tier 2', psyop: 75 }
                });
            } else {
                setResult({ status: 'Module operational. Scan complete.', details: 'No significant anomalies detected in current buffer.' });
            }
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="bg-slate-900/40 border border-blue-900/20 rounded-xl overflow-hidden flex flex-col md:flex-row h-[600px] animate-in zoom-in-95 duration-500">
            <div className="w-full md:w-64 border-r border-blue-900/20 bg-slate-950/40">
                <div className="p-4 border-b border-blue-900/20">
                    <h3 className="font-bold text-sm text-blue-400 uppercase tracking-widest">Forensic Lab</h3>
                </div>
                <div className="p-2 space-y-1">
                    {modules.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setActiveModule(m.id as any)}
                            className={`w-full flex items-center gap-3 px-3 py-4 rounded-lg transition-all text-left ${activeModule === m.id
                                    ? 'bg-blue-600/10 border border-blue-600/30 text-blue-400'
                                    : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
                                }`}
                        >
                            <m.icon className="w-5 h-5" />
                            <div>
                                <div className="text-xs font-bold leading-none mb-1">{m.id}</div>
                                <div className="text-[10px] opacity-70 line-clamp-1">{m.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col bg-slate-950/20">
                <div className="p-6 border-b border-blue-900/10 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-100">{activeModule} Forensics</h2>
                        <p className="text-xs text-slate-500 italic mt-1">Sovereign Diagnostic Substrate v3.2.1</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-slate-900 border border-blue-900/30 rounded-lg text-slate-400 hover:text-blue-400 transition-colors">
                            <ICONS.Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Input Stream</label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={`Upload or paste content for ${activeModule} analysis...`}
                            className="w-full h-40 bg-slate-900/50 border border-blue-900/20 rounded-lg p-4 text-sm text-slate-300 placeholder:text-slate-700 outline-none focus:border-blue-500/50 transition-all font-mono"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-[10px] text-slate-600 flex items-center gap-2">
                            <ICONS.Lock className="w-3 h-3" />
                            ENCRYPTED AUDIT TRAIL: ON
                        </div>
                        <button
                            onClick={handleProcess}
                            disabled={isProcessing || !inputText}
                            className={`flex items-center gap-2 px-6 py-2 bg-blue-600 rounded-lg text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 ${(isProcessing || !inputText) ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-0.5'
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <ICONS.Activity className="w-4 h-4 animate-spin" />
                                    ANALYZING...
                                </>
                            ) : (
                                <>
                                    <ICONS.Zap className="w-4 h-4" />
                                    EXECUTE FORENSICS
                                </>
                            )}
                        </button>
                    </div>

                    {result && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-3">
                                    <ICONS.Shield className="w-4 h-4" />
                                    Analysis Complete
                                </div>
                                <div className="whitespace-pre-wrap text-xs text-emerald-100/80 leading-relaxed font-mono">
                                    {result.report || result.status}
                                </div>
                            </div>

                            {result.metrics && (
                                <div className="grid grid-cols-3 gap-3">
                                    {Object.entries(result.metrics).map(([key, val]: any) => (
                                        <div key={key} className="bg-slate-900 border border-blue-900/20 rounded p-3">
                                            <div className="text-[8px] text-slate-500 uppercase mb-1">{key}</div>
                                            <div className="text-xs font-bold text-blue-400">{val}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecuritySuite;
