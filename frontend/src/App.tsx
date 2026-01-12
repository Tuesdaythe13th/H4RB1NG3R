
import React, { useState, useEffect } from 'react';
import { SystemMode, Incident } from './types';
import { CORE_AGENTS, BASE_METRICS, ICONS, SYSTEM_VERSION } from './constants';
import Dashboard from './components/Dashboard';
import AgentGrid from './components/AgentGrid';
import Forensics from './components/Forensics';
import Sentinel from './components/Sentinel';
import SecuritySuite from './components/SecuritySuite';
import { generateNewIncident } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'forensics' | 'sentinel' | 'suite'>('dashboard');
  const [mode, setMode] = useState<SystemMode>(SystemMode.COMPLIANCE);
  const [liveIncidents, setLiveIncidents] = useState<Incident[]>([
    {
      id: 'INC-742',
      timestamp: new Date().toISOString(),
      type: 'MGRI-101.c Violation',
      severity: 'high',
      description: 'Sycophancy-Masking detected in Llama-3-70b fine-tune.',
      source: 'Internal Monitor',
      metrics: { beci: 0.42, mgri: 'Tier 2', psyop: 12 }
    },
    {
      id: 'INC-811',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: 'Circuit 42 Limerence',
      severity: 'critical',
      description: 'Acute Limerence detected via activation steering bypass.',
      source: 'GHOST Sentinel',
      metrics: { beci: 0.15, mgri: 'Tier 1', psyop: 88 }
    }
  ]);
  const [metrics, setMetrics] = useState(BASE_METRICS);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => {
        if (typeof m.value === 'number' && m.label !== 'NIST Compliance') {
          const change = (Math.random() - 0.5) * 0.1;
          const newValue = Math.max(0, (m.value as number) + change);
          return { ...m, value: parseFloat(newValue.toFixed(2)) };
        }
        return m;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const addIncident = (newInc: Incident) => {
    setLiveIncidents(prev => [newInc, ...prev.slice(0, 19)]);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Shield },
    { id: 'agents', label: 'Agents', icon: ICONS.Users },
    { id: 'suite', label: 'Security Suite', icon: ICONS.Beaker },
    { id: 'forensics', label: 'Forensics', icon: ICONS.Eye },
    { id: 'sentinel', label: 'Sentinel', icon: ICONS.Activity },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30">
      <header className="h-16 border-b border-blue-900/50 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-extrabold text-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-110 cursor-pointer">H</div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic italic-glow">
              H4RB1NG3R <span className="text-blue-500 font-normal italic-none">{SYSTEM_VERSION}</span>
            </h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.3em] opacity-80">Sovereign Safety Index</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex bg-slate-900/50 rounded-lg p-1 border border-blue-900/30">
            {Object.values(SystemMode).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-1.5 rounded text-[10px] font-black tracking-widest transition-all ${mode === m
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-500 hover:text-slate-200'
                  }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-900/30 px-4 py-2 rounded-full border border-blue-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            CORE STATUS: <span className="text-emerald-400">NOMINAL</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-20 md:w-72 border-r border-blue-900/20 bg-slate-950/40 flex flex-col pt-4">
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all group relative overflow-hidden ${activeTab === item.id
                    ? 'bg-blue-600/10 border border-blue-600/20 text-blue-400'
                    : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-500' : 'group-hover:text-blue-400 transition-colors'}`} />
                <span className="hidden md:block font-extrabold text-[11px] uppercase tracking-widest">{item.label}</span>
                {activeTab === item.id && (
                  <>
                    <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    <div className="ml-auto w-1 h-1 bg-blue-500 rounded-full animate-ping" />
                  </>
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-blue-900/20 bg-slate-950/40">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-blue-900/30">
              <div className="flex justify-between items-center text-[10px] font-bold mb-3">
                <span className="text-slate-500 tracking-widest uppercase">VRAM SATURATION</span>
                <span className="text-blue-400">4.2 / 24.0 GB</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div className="h-full bg-gradient-to-r from-blue-700 to-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.8)] transition-all duration-1000" style={{ width: '17.5%' }} />
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${i < 3 ? 'bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,1)]' : 'bg-slate-800'}`} />
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-slate-950 to-slate-950">
          <div className="p-8 max-w-7xl mx-auto pb-24">
            {activeTab === 'dashboard' && <Dashboard metrics={metrics} incidents={liveIncidents} onProbeTrigger={addIncident} />}
            {activeTab === 'agents' && <AgentGrid agents={CORE_AGENTS} />}
            {activeTab === 'suite' && <SecuritySuite />}
            {activeTab === 'forensics' && <Forensics incidents={liveIncidents} />}
            {activeTab === 'sentinel' && <Sentinel />}
          </div>
        </main>
      </div>

      <footer className="h-10 bg-slate-950 border-t border-blue-900/50 flex items-center justify-between px-8 text-[9px] font-bold text-slate-500 tracking-[0.2em] relative z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            NIST RMF 19/19 VERIFIED
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
            ARTIFEX DEFENSE: ARMED
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="hover:text-blue-400 cursor-help transition-colors">Neural CVE Database: v4,201 Synchronized</span>
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="group-hover:text-emerald-400 transition-colors">Cognitive Sovereignty: SECURED</span>
            <ICONS.Lock className="w-3 h-3 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
