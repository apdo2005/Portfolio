import { ArrowDown, Sparkles } from 'lucide-react';

export default function WorldHero({ onWarpTo }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 max-w-7xl mx-auto z-10"
    >
      {/* Top Dimension Status Marker */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full obsidian-panel border border-[rgba(240,244,248,0.1)] text-xs font-mono text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-ping" />
          <span className="text-[#f2f5fa]">ORIGIN DIMENSION // 00</span>
          <span className="text-[#ff2a2a]">// ARCHITECTURAL SECTOR</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#94a3b8]">
          <span>TELEMETRY:</span>
          <span className="text-[#d4ff00]">60 FPS NOMINAL</span>
          <span className="text-[#c87d55]">// WEBGL ACTIVATED</span>
        </div>
      </div>

      {/* Main Monumental Typography */}
      <div className="my-auto py-12">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs md:text-sm text-[#d4ff00] uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 text-[#d4ff00]" />
            <span>Digital Architect &amp; Flutter Specialist</span>
          </div>

          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-black tracking-tight leading-[0.9] text-[#f2f5fa]">
            APDO
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#f2f5fa] via-[#c87d55] to-[#ff2a2a] mt-2">
              BEYOND THE INTERFACE.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#94a3b8] font-normal max-w-2xl leading-relaxed pt-2">
            Transforming conceptual blueprints into resilient, multi-platform digital engines. Clean Architecture, high-throughput reactive pipelines, and pixel-precise kinetic execution.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={() => onWarpTo?.('projects')}
              className="px-8 py-3.5 rounded-full bg-[#ff2a2a] hover:bg-[#ff3838] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(255,42,42,0.4)] flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE DIMENSIONS</span>
            </button>

            <button
              onClick={() => onWarpTo?.('identity')}
              className="px-8 py-3.5 rounded-full obsidian-panel border border-[rgba(240,244,248,0.2)] hover:border-[#d4ff00] text-[#f2f5fa] hover:text-[#d4ff00] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              IDENTITY DOSSIER
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Dimension Telemetry & Scroll Prompt */}
      <div className="flex flex-wrap items-end justify-between gap-6 pt-6 border-t border-[rgba(240,244,248,0.06)]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <span className="text-[#94a3b8] block text-[10px] tracking-widest uppercase">SPECIALIZATION</span>
            <span className="text-[#f2f5fa] font-bold">FLUTTER &amp; DART</span>
          </div>
          <div>
            <span className="text-[#94a3b8] block text-[10px] tracking-widest uppercase">PARADIGM</span>
            <span className="text-[#d4ff00] font-bold">CLEAN ARCHITECTURE</span>
          </div>
          <div>
            <span className="text-[#94a3b8] block text-[10px] tracking-widest uppercase">ALGORITHMS</span>
            <span className="text-[#ff2a2a] font-bold">350+ CODEFORCES</span>
          </div>
          <div>
            <span className="text-[#94a3b8] block text-[10px] tracking-widest uppercase">COMMUNITY</span>
            <span className="text-[#c87d55] font-bold">GDG CORE TECH</span>
          </div>
        </div>

        <button
          onClick={() => onWarpTo?.('identity')}
          className="flex items-center gap-2 font-mono text-xs text-[#94a3b8] hover:text-[#d4ff00] transition-colors group cursor-pointer"
        >
          <span className="tracking-widest">DESCENT INTO WORLD 01</span>
          <ArrowDown className="w-4 h-4 text-[#d4ff00] group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

