import profileImg from '../assets/apdo2.jpeg';
import { Layers, ShieldCheck, Terminal, Compass, Sparkles } from 'lucide-react';

export default function WorldIdentity() {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-[#d4ff00]" />,
      title: "Clean Architecture Purity",
      desc: "Strict separation of Domain, Data, and Presentation layers. Enterprise-grade codebases that withstand rapid feature scaling without technical debt.",
    },
    {
      icon: <Terminal className="w-5 h-5 text-[#ff2a2a]" />,
      title: "Algorithmic Precision",
      desc: "350+ complex algorithmic challenges conquered on Codeforces. Graph traversals, dynamic programming, and computational efficiency in every routine.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#c87d55]" />,
      title: "Resilient Offline & Cloud Sync",
      desc: "Supabase real-time websockets, Firebase Cloud Firestore, Dio interceptors with custom token refresh, and robust offline-first local caching.",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#f2f5fa]" />,
      title: "Community & Leadership",
      desc: "Core Tech Member at GDG Benha. Mentoring rising mobile engineers and hosting technical workshops on state management and mobile performance.",
    },
  ];

  return (
    <section id="identity" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* World Section Header */}
      <div className="flex flex-col gap-2 mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
          <span>WORLD 01 // IDENTITY MATRIX</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#f2f5fa]">
          ARCHITECT OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] to-[#c87d55]">DIGITAL REALITIES</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl">
          &quot;I am not simply someone who writes code. I transform conceptual visions into complete, resilient digital products.&quot;
        </p>
      </div>

      {/* Spatial Composition: Profile Artifact + Manifesto */}
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* Profile Architectural Artifact (Left 5 Cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-sm">
            {/* Ambient Copper & Vermilion Backlight */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#ff2a2a]/20 via-[#c87d55]/30 to-[#d4ff00]/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Architectural Frame with Corner Reticles */}
            <div className="relative rounded-2xl obsidian-panel border border-[rgba(240,244,248,0.12)] p-2 overflow-hidden shadow-2xl">
              {/* Corner Coordinates */}
              <div className="absolute top-4 left-4 z-20 font-mono text-[9px] text-[#d4ff00] bg-[#030508]/80 px-2 py-0.5 rounded border border-[#d4ff00]/30">
                LOC // 30.466°N 31.185°E
              </div>
              <div className="absolute bottom-4 right-4 z-20 font-mono text-[9px] text-[#f2f5fa] bg-[#030508]/80 px-2 py-0.5 rounded border border-[rgba(240,244,248,0.2)]">
                FLUTTER // CORE
              </div>

              {/* Portrait Image */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#070a10]">
                <img
                  src={profileImg}
                  alt="Abdelrahman Mahmoud (APDO)"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff2a2a]/15 via-transparent to-[#d4ff00]/10 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Identity Capsule */}
              <div className="p-4 pt-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#f2f5fa]">Abdelrahman Mahmoud</h3>
                  <p className="font-mono text-xs text-[#94a3b8]">Software Engineering Intern @ HumaVolve</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/40 flex items-center justify-center text-[#d4ff00]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Ethos & Pillars (Right 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="obsidian-panel rounded-2xl p-6 sm:p-8 border border-[rgba(240,244,248,0.1)]">
            <h3 className="font-display text-xl font-bold text-[#f2f5fa] mb-3 flex items-center gap-2">
              <span className="text-[#ff2a2a]">//</span> The Philosophy Behind The Code
            </h3>
            <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
              Every mobile application is an ecosystem. Beyond UI aesthetic lies the unseen machinery: dependency inversion, decoupled state controllers, immutable domain entities, and memory profiling. My goal is simple: deliver experiences that feel natural, instantaneous, and indestructible under production network loads.
            </p>
          </div>

          {/* 4 Architectural Pillars Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="obsidian-panel obsidian-panel-hover rounded-xl p-5 border border-[rgba(240,244,248,0.08)] flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">{p.icon}</div>
                  <h4 className="font-display font-bold text-base text-[#f2f5fa] mb-1.5">{p.title}</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

