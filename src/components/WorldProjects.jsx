import { useState } from 'react';
import { ExternalLink, Sparkles, Layers } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

import habiSpaceImg from '../assets/habispace.jpg';
import groceryNewImg from '../assets/grocery_new.jpg';
import smartBonusImg from '../assets/smar_bouns.png';

export default function WorldProjects() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const projects = [
    {
      num: '01',
      title: 'HabiSpace',
      subtitle: '3D Spatial Real Estate Platform',
      desc: 'Next-generation real estate application integrating interactive 3D spatial architectural visualization with Clean Architecture and state orchestration.',
      contribution: 'Architected domain use-cases, built 3D rendering viewport integration, implemented BLoC state streams, and optimized memory usage during intensive 3D model manipulation.',
      tech: ['Flutter', '3D Engine', 'Clean Architecture', 'BLoC Pattern', 'Dart'],
      github: 'https://github.com/apdo2005/HabiSpace',
      image: habiSpaceImg,
      accent: '#d4ff00',
      coordinates: 'DIMENSION // 03.1',
    },
    {
      num: '02',
      title: 'Grocery E-commerce',
      subtitle: 'High-Throughput Mobile Retail Storefront',
      desc: 'High-performance retail storefront tuned for 60fps scrolling under massive catalog loads, instant reactive cart calculations, and robust network resilience.',
      contribution: 'Engineered silky 60fps list view recycling with RepaintBoundaries, designed resilient offline cart sync, and crafted fluid micro-animations for checkout flows.',
      tech: ['Flutter', 'Performance Tuning', 'State Management', 'UX Optimization'],
      github: 'https://github.com/Elfouly282/grocery2',
      image: groceryNewImg,
      accent: '#ff2a2a',
      coordinates: 'DIMENSION // 03.2',
    },
    {
      num: '03',
      title: 'LabLink',
      subtitle: 'Patient-to-Diagnostic Laboratory Ecosystem',
      desc: 'Comprehensive healthcare platform connecting patients with specialized medical laboratories. Features multi-role access control, automated booking slots, and secure diagnostic report sharing.',
      contribution: 'Implemented role-based security rules in Firebase, crafted atomic Clean Architecture modules, and integrated real-time schedule slot reservation.',
      tech: ['Flutter', 'Firebase Auth', 'Cloud Firestore', 'Clean Arch'],
      github: 'https://github.com/Habiba04/LabLink',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&auto=format&fit=crop&q=70',
      accent: '#c87d55',
      coordinates: 'DIMENSION // 03.3',
    },
    {
      num: '04',
      title: 'Smart Bonus',
      subtitle: 'B2B Pharmaceutical Supplier Bridge',
      desc: 'B2B commercial mobile portal bridging retail pharmacies with pharmaceutical suppliers. Powered by real-time inventory synchronization and offline-first cache strategies.',
      contribution: 'Configured Supabase PostgreSQL sync, implemented Dio HTTP client interceptors with token rotation, and designed offline order buffering.',
      tech: ['Flutter', 'Supabase Realtime', 'Dio Client', 'Offline-First'],
      github: 'https://github.com/apdo2005/Smart_Bonus',
      image: smartBonusImg,
      accent: '#d4ff00',
      coordinates: 'DIMENSION // 03.4',
    },
    {
      num: '05',
      title: 'Spider-Man Showcase',
      subtitle: 'Kinetic Motion & REST API Integration',
      desc: 'Dynamic interactive showcase application demonstrating fluid kinetic transitions, custom hero animations, and asynchronous REST integrations via Dio.',
      contribution: 'Built custom kinetic page transformers, implemented asynchronous JSON serialization, and crafted an immersive dark comic aesthetic.',
      tech: ['Flutter', 'Dio Client', 'REST API', 'Kinetic Animations'],
      github: 'https://github.com/apdo2005/Spider-Man-app',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=900&auto=format&fit=crop&q=70',
      accent: '#ff2a2a',
      coordinates: 'DIMENSION // 03.5',
    },
  ];

  const current = projects[selectedIdx];

  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
          <span>WORLD 03 // PROJECT DIMENSIONS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#f2f5fa]">
          REAL-WORLD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a2a] via-[#c87d55] to-[#d4ff00]">DIMENSIONAL BUILDS</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl">
          Explore production mobile architectures engineered for real users, high concurrency, and uncompromising performance.
        </p>
      </div>

      {/* Dimensional Project Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {projects.map((p, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={p.num}
              onClick={() => setSelectedIdx(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider whitespace-nowrap transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'border-[#d4ff00] bg-[#d4ff00] text-black shadow-[0_0_20px_rgba(212,255,0,0.3)]'
                  : 'border-[rgba(240,244,248,0.1)] obsidian-panel text-[#94a3b8] hover:text-[#f2f5fa] hover:border-[#f2f5fa]/30'
              }`}
            >
              <span>{p.num}</span>
              <span>// {p.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Project Feature Stage */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Project Viewport Portal (Left 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative rounded-2xl obsidian-panel border border-[rgba(240,244,248,0.12)] overflow-hidden group flex-1 min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6">
            {/* Background Project Image with Atmospheric Depth */}
            <div className="absolute inset-0 z-0 bg-[#070a10]">
              <img
                src={current.image}
                alt={current.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030508]/80 via-transparent to-transparent" />
            </div>

            {/* Top Telemetry Pills */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#030508]/85 border border-[#d4ff00]/40 text-[#d4ff00] backdrop-blur-md">
                {current.coordinates}
              </span>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#030508]/85 border border-[rgba(240,244,248,0.2)] text-[#f2f5fa] backdrop-blur-md">
                DEPLOYED // VERIFIED
              </span>
            </div>

            {/* Bottom Title Overlay */}
            <div className="relative z-10 pt-20">
              <span className="font-mono text-xs text-[#d4ff00] tracking-widest uppercase block mb-1">
                {current.subtitle}
              </span>
              <h3 className="text-3xl sm:text-5xl font-display font-black text-[#f2f5fa] tracking-tight">
                {current.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Project Technical Dossier (Right 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="obsidian-panel rounded-2xl p-6 sm:p-8 border border-[rgba(240,244,248,0.12)] space-y-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#ff2a2a] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL DOSSIER</span>
              </div>
              <h4 className="font-display font-bold text-2xl text-[#f2f5fa] mb-3">
                System Overview
              </h4>
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                {current.desc}
              </p>

              <div className="pt-4 border-t border-[rgba(240,244,248,0.08)]">
                <h5 className="font-mono text-[11px] text-[#d4ff00] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> APDO&apos;S ENGINEERING CONTRIBUTION:
                </h5>
                <p className="text-xs sm:text-sm text-[#f2f5fa] leading-relaxed">
                  {current.contribution}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[rgba(240,244,248,0.08)]">
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2">
                {current.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1 rounded-md bg-[#0c101a] border border-[rgba(240,244,248,0.1)] text-[#f2f5fa]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={current.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d4ff00] hover:bg-[#c5f810] text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.2)] hover:scale-[1.02]"
                >
                  <GithubIcon className="w-4 h-4" /> REPOSITORY CODE
                </a>

                <a
                  href={current.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl obsidian-panel border border-[rgba(240,244,248,0.15)] hover:border-[#ff2a2a] text-[#f2f5fa] hover:text-[#ff2a2a] transition-colors"
                  title="Open Project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
