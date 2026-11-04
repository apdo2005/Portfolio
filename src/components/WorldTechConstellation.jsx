import { useState } from 'react';
import { Cpu, Code2, Database, Zap, Layers, Sparkles, Terminal } from 'lucide-react';

export default function WorldTechConstellation({ onHoverTech }) {
  const [activeTech, setActiveTech] = useState('Flutter');

  const technologies = [
    {
      id: 'Flutter',
      category: 'Mobile Engine',
      level: 95,
      icon: <Cpu className="w-5 h-5 text-[#d4ff00]" />,
      color: '#d4ff00',
      specs: 'Impeller & Skia rendering engines, custom painters, kinetic 60fps micro-animations, multi-platform compilation.',
      architectureRole: 'Core visual & presentation foundation across iOS, Android, and web with zero UI frame drops.',
    },
    {
      id: 'Dart',
      category: 'Computational Core',
      level: 92,
      icon: <Code2 className="w-5 h-5 text-[#c87d55]" />,
      color: '#c87d55',
      specs: 'AOT & JIT execution, sound null safety, memory optimization, Dart isolates for multi-threaded background parsing.',
      architectureRole: 'Strongly-typed computational backbone powering all domain logic, math, and data transformations.',
    },
    {
      id: 'Clean Architecture',
      category: 'Structural Philosophy',
      level: 94,
      icon: <Layers className="w-5 h-5 text-[#f2f5fa]" />,
      color: '#f2f5fa',
      specs: 'Domain Layer (Use Cases, Entities), Data Layer (Repositories, Sources), Presentation Layer (Bloc, UI).',
      architectureRole: 'Ensures absolute independence of framework, databases, and UI for eternal maintainability and testing.',
    },
    {
      id: 'Firebase',
      category: 'Cloud Infrastructure',
      level: 88,
      icon: <Database className="w-5 h-5 text-[#ff2a2a]" />,
      color: '#ff2a2a',
      specs: 'Cloud Firestore, Firebase Auth, Firebase Storage, Cloud Messaging (FCM), Crashlytics performance monitoring.',
      architectureRole: 'Rapid serverless deployment with automated real-time multi-client state syncing and push channels.',
    },
    {
      id: 'Supabase',
      category: 'Relational Cloud',
      level: 85,
      icon: <Database className="w-5 h-5 text-[#d4ff00]" />,
      color: '#d4ff00',
      specs: 'PostgreSQL database, Row Level Security (RLS), Realtime WebSocket Broadcasts, PostgREST queries.',
      architectureRole: 'Provides robust relational data consistency with granular access controls for enterprise B2B apps.',
    },
    {
      id: 'REST APIs & Dio',
      category: 'High-Throughput Network',
      level: 90,
      icon: <Zap className="w-5 h-5 text-[#c87d55]" />,
      color: '#c87d55',
      specs: 'Dio client, custom auth interceptors, auto token refreshing, retry policies, offline payload caching.',
      architectureRole: 'Bulletproof API communication layer with graceful error boundaries and network fallback handling.',
    },
    {
      id: 'State Management',
      category: 'Reactive Streams',
      level: 91,
      icon: <Layers className="w-5 h-5 text-[#d4ff00]" />,
      color: '#d4ff00',
      specs: 'BLoC Pattern (Event-State), Riverpod providers, unidirectional data flows, predictable state transitions.',
      architectureRole: 'Guarantees that UI strictly mirrors domain state without race conditions or memory leaks.',
    },
    {
      id: 'Problem Solving',
      category: 'Algorithmic Prowess',
      level: 93,
      icon: <Terminal className="w-5 h-5 text-[#ff2a2a]" />,
      color: '#ff2a2a',
      specs: '350+ Codeforces problems solved. Graph algorithms, trees, dynamic programming, combinatorics.',
      architectureRole: 'Gives the instinct to spot algorithmic bottlenecks, write O(1) lookups, and design optimal workflows.',
    },
  ];

  const current = technologies.find((t) => t.id === activeTech) || technologies[0];

  const handleSelect = (techId) => {
    setActiveTech(techId);
    onHoverTech?.(techId);
  };

  return (
    <section id="universe" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-14">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
          <span>WORLD 02 // TECHNOLOGY CONSTELLATION</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#f2f5fa]">
          AN INTERACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] via-[#c87d55] to-[#ff2a2a]">GALAXY OF TECH</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl">
          Hover or select any node in the constellation. The 3D engine in the background focuses on its celestial coordinates.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Constellation Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {technologies.map((t) => {
            const isSelected = activeTech === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                onMouseEnter={() => {
                  onHoverTech?.(t.id);
                }}
                onMouseLeave={() => {
                  onHoverTech?.(null);
                }}
                className={`text-left p-5 rounded-xl obsidian-panel border transition-all duration-300 relative group cursor-pointer ${
                  isSelected
                    ? 'border-[#d4ff00] bg-[#0c101a] shadow-[0_0_25px_rgba(212,255,0,0.15)] scale-[1.02]'
                    : 'border-[rgba(240,244,248,0.08)] hover:border-[#f2f5fa]/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-[#030508] border border-[rgba(240,244,248,0.1)]">
                    {t.icon}
                  </div>
                  <span className="font-mono text-xs text-[#94a3b8]">{t.level}%</span>
                </div>

                <div className="font-mono text-[10px] text-[#94a3b8] tracking-widest uppercase mb-1">
                  {t.category}
                </div>
                <div className="font-display font-bold text-lg text-[#f2f5fa] group-hover:text-[#d4ff00] transition-colors">
                  {t.id}
                </div>

                {/* Micro Level Bar */}
                <div className="w-full h-1 bg-[#030508] rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${t.level}%`,
                      backgroundColor: t.color,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Telemetry Inspector (Right 5 Cols) */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="obsidian-panel rounded-2xl p-6 sm:p-8 border border-[rgba(240,244,248,0.12)] space-y-6 relative overflow-hidden">
            {/* Top Glowing Ribbon */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: current.color }}
            />

            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#94a3b8]">
                NODE TELEMETRY // INSPECT
              </span>
              <span
                className="font-mono text-xs px-2.5 py-0.5 rounded-full border text-xs font-bold"
                style={{ borderColor: current.color, color: current.color }}
              >
                {current.category}
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-3xl text-[#f2f5fa] mb-1">
                {current.id}
              </h3>
              <p className="font-mono text-xs text-[#94a3b8]">
                Proficiency Index: <span className="text-[#f2f5fa] font-bold">{current.level}/100</span>
              </p>
            </div>

            <div className="space-y-4 pt-2 border-t border-[rgba(240,244,248,0.08)]">
              <div>
                <span className="font-mono text-[10px] text-[#d4ff00] uppercase tracking-wider block mb-1">
                  TECHNICAL SPECIFICATIONS
                </span>
                <p className="text-sm text-[#f2f5fa] leading-relaxed font-normal">
                  {current.specs}
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#ff2a2a] uppercase tracking-wider block mb-1">
                  ARCHITECTURAL ROLE IN SYSTEM
                </span>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                  {current.architectureRole}
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2 text-[11px] font-mono text-[#94a3b8]">
              <Sparkles className="w-3.5 h-3.5 text-[#d4ff00]" />
              <span>Synthesized into production apps by APDO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
