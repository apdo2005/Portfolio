import { useState } from 'react';
import { Layers, Terminal, Shield, Activity } from 'lucide-react';

export default function WorldMindset() {
  const [activeLayer, setActiveLayer] = useState(0);

  const architectureLayers = [
    {
      id: 'domain',
      layerNumber: 'LAYER 01',
      title: 'Domain Layer (The Pure Sanctum)',
      subtitle: 'Entities • Use Cases • Contracts',
      desc: 'The innermost core. Contains pure enterprise business logic with ZERO dependencies on Flutter, databases, or third-party packages. Written in pristine, testable Dart.',
      rules: [
        'Immutable Entity definitions with Equatable',
        'Single-responsibility Use Case execution (Call method)',
        'Abstract Repository interfaces (Inversion of Control)',
        '100% independent of UI frameworks and storage engines',
      ],
      color: '#d4ff00',
    },
    {
      id: 'data',
      layerNumber: 'LAYER 02',
      title: 'Data Layer (The Infrastructure Bridge)',
      subtitle: 'Repositories • Data Sources • DTO Models',
      desc: 'Implements Domain contracts. Orchestrates network synchronization via Dio, manages offline cache with Hive/SQLite, and handles JSON serialization without polluting domain entities.',
      rules: [
        'Concrete Repository implementations',
        'Remote Data Source with Dio interceptors & JWT refresh',
        'Local Data Source with cached offline persistence',
        'DTO to Entity mappers with strict data hygiene',
      ],
      color: '#c87d55',
    },
    {
      id: 'presentation',
      layerNumber: 'LAYER 03',
      title: 'Presentation Layer (The Kinetic Surface)',
      subtitle: 'BLoC Streams • Atomic Widgets • 60fps Layouts',
      desc: 'Transforms domain states into buttery smooth 60fps interactive user interfaces. State is unidirectional and reactive: Events in, States out.',
      rules: [
        'BLoC & Riverpod reactive state orchestration',
        'RepaintBoundary optimization to isolate heavy repaints',
        'Const constructor discipline to eliminate widget rebuilds',
        'Adaptive layouts tailored for mobile, tablet, and foldable form factors',
      ],
      color: '#ff2a2a',
    },
  ];

  const currentLayer = architectureLayers[activeLayer];

  return (
    <section id="mindset" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
          <span>WORLD 04 // ENGINEERING MINDSET</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#f2f5fa]">
          ARCHITECTURAL RIGOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] via-[#c87d55] to-[#ff2a2a]">&amp; ALGORITHMS</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl">
          Visualizing how Clean Architecture and competitive programming rigor combine to build bulletproof mobile applications.
        </p>
      </div>

      {/* Clean Architecture Blueprint Interactive Story */}
      <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Layer Hierarchy Navigation (Left 4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <p className="font-mono text-[10px] text-[#94a3b8] tracking-widest uppercase mb-2">
            INTERACTIVE ARCHITECTURAL SLICES
          </p>

          {architectureLayers.map((layer, idx) => {
            const isSelected = activeLayer === idx;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(idx)}
                className={`w-full text-left p-5 rounded-xl obsidian-panel border transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? 'border-[#d4ff00] bg-[#0c101a] shadow-[0_0_20px_rgba(212,255,0,0.15)] scale-[1.02]'
                    : 'border-[rgba(240,244,248,0.08)] hover:border-[#f2f5fa]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: layer.color }}
                  >
                    {layer.layerNumber}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                </div>
                <h4 className="font-display font-bold text-lg text-[#f2f5fa]">
                  {layer.title.split(' ')[0]} {layer.title.split(' ')[1]}
                </h4>
                <p className="font-mono text-[11px] text-[#94a3b8]">{layer.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Blueprint (Right 8 Cols) */}
        <div className="lg:col-span-8">
          <div className="obsidian-panel rounded-2xl p-6 sm:p-8 border border-[rgba(240,244,248,0.12)] space-y-6 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: currentLayer.color }}
            />

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="font-mono text-xs font-bold px-3 py-1 rounded-full border"
                style={{ borderColor: currentLayer.color, color: currentLayer.color }}
              >
                {currentLayer.layerNumber}
              </span>
              <span className="font-mono text-xs text-[#94a3b8]">
                ARCHITECTURAL BOUNDARY: ISOLATED
              </span>
            </div>

            <div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#f2f5fa] mb-2">
                {currentLayer.title}
              </h3>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
                {currentLayer.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-[rgba(240,244,248,0.08)]">
              <h5 className="font-mono text-xs text-[#f2f5fa] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#d4ff00]" />
                ARCHITECTURAL LAWS &amp; CONSTRAINTS:
              </h5>
              <div className="grid sm:grid-cols-2 gap-3">
                {currentLayer.rules.map((rule, ri) => (
                  <div
                    key={ri}
                    className="p-3.5 rounded-lg bg-[#030508] border border-[rgba(240,244,248,0.06)] font-mono text-xs text-[#94a3b8] flex items-start gap-2.5"
                  >
                    <span className="text-[#d4ff00] font-bold">0{ri + 1}.</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Engineering Badges: Algorithms, 60fps Profiling, SOLID */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="obsidian-panel rounded-xl p-6 border border-[rgba(240,244,248,0.08)] space-y-3">
          <div className="flex items-center gap-2 text-[#ff2a2a]">
            <Terminal className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase">Algorithmic Mastery</span>
          </div>
          <h4 className="font-display font-bold text-xl text-[#f2f5fa]">350+ Problems Solved</h4>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Rigorous competitive programming training on Codeforces. Mastery of graph traversals, dynamic programming, and binary search tree algorithms.
          </p>
        </div>

        <div className="obsidian-panel rounded-xl p-6 border border-[rgba(240,244,248,0.08)] space-y-3">
          <div className="flex items-center gap-2 text-[#d4ff00]">
            <Activity className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase">Performance Discipline</span>
          </div>
          <h4 className="font-display font-bold text-xl text-[#f2f5fa]">Locked 60fps Execution</h4>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Eliminating unnecessary widget rebuilds with const constructors, isolating heavy JSON deserialization in Dart background worker isolates.
          </p>
        </div>

        <div className="obsidian-panel rounded-xl p-6 border border-[rgba(240,244,248,0.08)] space-y-3">
          <div className="flex items-center gap-2 text-[#c87d55]">
            <Layers className="w-5 h-5" />
            <span className="font-mono text-xs font-bold uppercase">SOLID Foundations</span>
          </div>
          <h4 className="font-display font-bold text-xl text-[#f2f5fa]">Decoupled Ecosystems</h4>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Dependency Inversion, Single Responsibility, and Open/Closed principles ensure code can be modified or tested without cascading side-effects.
          </p>
        </div>
      </div>
    </section>
  );
}
