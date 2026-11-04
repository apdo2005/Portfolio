import { useState } from 'react';
import { Mail, Phone, ExternalLink, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';

const GithubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function WorldPortal() {
  const [copied, setCopied] = useState(false);

  const contacts = [
    {
      id: 'email',
      icon: <Mail className="w-5 h-5 text-[#d4ff00]" />,
      label: 'TRANSMISSION // DIRECT EMAIL',
      value: 'apdo28011@gmail.com',
      action: 'mailto:apdo28011@gmail.com',
      canCopy: true,
      color: '#d4ff00',
    },
    {
      id: 'phone',
      icon: <Phone className="w-5 h-5 text-[#c87d55]" />,
      label: 'DIRECT LINE // VOICE & WHATSAPP',
      value: '+20 115 168 4594',
      action: 'tel:+201151684594',
      color: '#c87d55',
    },
    {
      id: 'linkedin',
      icon: <LinkedinIcon className="w-5 h-5 text-[#ff2a2a]" />,
      label: 'PROFESSIONAL NETWORK // LINKEDIN',
      value: 'in/apdelraman-mahmoud-799500306',
      action: 'https://www.linkedin.com/in/apdelraman-mahmoud-799500306',
      color: '#ff2a2a',
    },
    {
      id: 'github',
      icon: <GithubIcon className="w-5 h-5 text-[#f2f5fa]" />,
      label: 'OPEN-SOURCE CODEBASE // GITHUB',
      value: 'github.com/apdo2005',
      action: 'https://github.com/apdo2005',
      color: '#f2f5fa',
    },
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('apdo28011@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <section id="portal" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-16 text-center items-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] animate-ping" />
          <span>WORLD 06 // DIMENSIONAL CONTACT PORTAL</span>
        </div>
        <h2 className="text-4xl sm:text-7xl font-display font-black tracking-tight text-[#f2f5fa]">
          STEP INTO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a2a] via-[#c87d55] to-[#d4ff00]">THE PORTAL</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl">
          Ready to build your next breakthrough mobile application? Initiate transmission directly with APDO.
        </p>
      </div>

      {/* Main Dimensional Gateway Grid */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          {contacts.map((c) => (
            <a
              key={c.id}
              href={c.action}
              target={c.action.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="obsidian-panel obsidian-panel-hover rounded-2xl p-6 border border-[rgba(240,244,248,0.12)] flex items-center justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#030508] border border-[rgba(240,244,248,0.1)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] text-[#94a3b8] tracking-widest uppercase block truncate">
                    {c.label}
                  </span>
                  <span className="font-display font-bold text-base text-[#f2f5fa] group-hover:text-[#d4ff00] transition-colors truncate block">
                    {c.value}
                  </span>
                </div>
              </div>

              {c.canCopy ? (
                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-2.5 rounded-lg obsidian-panel border border-[rgba(240,244,248,0.15)] hover:border-[#d4ff00] text-[#94a3b8] hover:text-[#d4ff00] transition-colors cursor-pointer shrink-0 ml-2"
                >
                  {copied ? <Check className="w-4 h-4 text-[#d4ff00]" /> : <Copy className="w-4 h-4" />}
                </button>
              ) : (
                <div className="p-2.5 rounded-lg obsidian-panel border border-[rgba(240,244,248,0.15)] group-hover:border-[#d4ff00] text-[#94a3b8] group-hover:text-[#d4ff00] transition-colors shrink-0 ml-2">
                  <ExternalLink className="w-4 h-4" />
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Global Dispatch Card */}
        <div className="obsidian-panel rounded-2xl p-8 border border-[rgba(240,244,248,0.12)] text-center space-y-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff2a2a] via-[#c87d55] to-[#d4ff00]" />

          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00]">
            <Sparkles className="w-4 h-4" />
            <span>DIRECT AVAILABILITY: ACTIVE FOR FULL-TIME / CONTRACT ROLES</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-4xl text-[#f2f5fa]">
            LET&apos;S ARCHITECT SOMETHING UNFORGETTABLE
          </h3>

          <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl mx-auto leading-relaxed">
            Whether you require Clean Architecture implementation, custom kinetic UI execution, or end-to-end mobile product development, the portal is open.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="mailto:apdo28011@gmail.com"
              className="px-8 py-3.5 rounded-full bg-[#ff2a2a] hover:bg-[#ff3838] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(255,42,42,0.4)] hover:scale-105 flex items-center gap-2"
            >
              SEND DIRECT TRANSMISSION <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="/cv.pdf"
              download
              className="px-8 py-3.5 rounded-full obsidian-panel border border-[#c87d55] text-[#f2f5fa] hover:text-[#c87d55] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300"
            >
              DOWNLOAD DOSSIER (CV.PDF)
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-28 pt-8 border-t border-[rgba(240,244,248,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#94a3b8]">
        <div>
          © 2026 APDO (Abdelrahman Mahmoud) • All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#d4ff00]">FLUTTER // DART</span>
          <span>•</span>
          <span className="text-[#ff2a2a]">CLEAN ARCHITECTURE</span>
          <span>•</span>
          <span className="text-[#c87d55]">3D DIMENSIONAL UNIVERSE</span>
        </div>
      </footer>
    </section>
  );
}

