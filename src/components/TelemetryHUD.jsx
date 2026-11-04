import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import AudioSynthesizer from './AudioSynthesizer';

export default function TelemetryHUD({ activeWorld = 0, onWarpTo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const worlds = [
    { id: 'hero', num: '00', label: 'ORIGIN' },
    { id: 'identity', num: '01', label: 'IDENTITY' },
    { id: 'universe', num: '02', label: 'TECH UNIVERSE' },
    { id: 'projects', num: '03', label: 'PROJECTS' },
    { id: 'mindset', num: '04', label: 'ARCHITECTURE' },
    { id: 'vault', num: '05', label: 'VAULT & CERTS' },
    { id: 'portal', num: '06', label: 'CONTACT PORTAL' },
  ];

  const handleNav = (id) => {
    onWarpTo?.(id);
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── TOP TELEMETRY BAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-[rgba(240,244,248,0.06)] bg-[#030508]/75 backdrop-blur-xl">
        {/* Brand / Dimensional Identity */}
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-sm bg-[#0c101a] border border-[#d4ff00]/60 flex items-center justify-center font-display font-black text-sm text-[#d4ff00] group-hover:bg-[#d4ff00] group-hover:text-black transition-colors duration-300">
            A
          </div>
          <div>
            <div className="font-display font-black text-sm tracking-widest text-[#f2f5fa] flex items-center gap-2">
              APDO <span className="text-[10px] text-[#ff2a2a] font-mono">// 2026</span>
            </div>
            <div className="font-hud text-[#94a3b8] text-[9px]">BEYOND THE INTERFACE</div>
          </div>
        </button>

        {/* Global Coordinates & Real-time Telemetry (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-[11px] text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00] animate-pulse" />
            <span className="text-[#f2f5fa]">SYS: ONLINE</span>
            <span className="text-[#94a3b8]/60">30°27&apos;58&quot;N 31°11&apos;06&quot;E</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#ff2a2a] font-bold">DIMENSION:</span>
            <span className="text-[#f2f5fa] font-bold bg-[#0c101a] px-2 py-0.5 rounded border border-[rgba(240,244,248,0.1)]">
              WORLD 0{activeWorld}
            </span>
          </div>
        </div>

        {/* Actions: Audio Synthesizer, Resume & Portal Warp */}
        <div className="flex items-center gap-3">
          <AudioSynthesizer />

          <a
            href="/cv.pdf"
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[rgba(240,244,248,0.15)] text-[#f2f5fa] hover:border-[#c87d55] hover:text-[#c87d55] text-xs font-mono transition-all duration-300"
          >
            RESUME <ArrowUpRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => handleNav('portal')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ff2a2a] hover:bg-[#ff3838] text-white text-xs font-mono font-bold tracking-wider shadow-[0_0_20px_rgba(255,42,42,0.4)] transition-all duration-300 hover:scale-105"
          >
            INITIATE CONTACT
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md obsidian-panel text-[#f2f5fa] hover:text-[#d4ff00] transition-colors"
            aria-label="Toggle navigation matrix"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ── RIGHT VERTICAL DIMENSION SELECTOR (Desktop) ── */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 font-mono text-[10px]">
        {worlds.map((w, idx) => {
          const isActive = activeWorld === idx;
          return (
            <button
              key={w.id}
              onClick={() => handleNav(w.id)}
              className="group flex items-center justify-end gap-3 text-right cursor-pointer"
            >
              <span
                className={`transition-all duration-300 ${
                  isActive
                    ? 'text-[#d4ff00] font-bold opacity-100 translate-x-0'
                    : 'text-[#94a3b8] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {w.num} // {w.label}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-[#d4ff00] ring-4 ring-[#d4ff00]/25 scale-125'
                    : 'bg-[#94a3b8]/40 group-hover:bg-[#f2f5fa]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* ── MOBILE FULLSCREEN DRAWER ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#030508]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 border-l border-[rgba(240,244,248,0.1)]">
          <div className="space-y-6">
            <p className="font-hud text-[#94a3b8]">DIMENSIONAL NAVIGATION MATRIX</p>
            <div className="flex flex-col gap-4">
              {worlds.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => handleNav(w.id)}
                  className="flex items-baseline gap-4 text-left group"
                >
                  <span className="font-mono text-xs text-[#d4ff00]">{w.num}</span>
                  <span className={`font-display text-2xl font-bold tracking-wider ${activeWorld === idx ? 'text-[#ff2a2a]' : 'text-[#f2f5fa] group-hover:text-[#d4ff00]'}`}>
                    {w.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[rgba(240,244,248,0.1)] flex flex-col gap-3 font-mono text-xs">
            <a
              href="/cv.pdf"
              download
              className="text-center py-3 rounded-lg border border-[#c87d55] text-[#c87d55] font-bold"
            >
              DOWNLOAD RESUME // CV.PDF
            </a>
            <button
              onClick={() => handleNav('portal')}
              className="text-center py-3 rounded-lg bg-[#ff2a2a] text-white font-bold"
            >
              INITIATE CONTACT PORTAL
            </button>
          </div>
        </div>
      )}
    </>
  );
}

