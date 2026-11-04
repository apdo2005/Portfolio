import { useState } from 'react';
import { Award, ExternalLink, Calendar, CheckCircle2, Maximize2, X } from 'lucide-react';

import itiCert from '../assets/iti_cert_2026.jpg';
import gdgCoreCert2026 from '../assets/gdg_core_2026.png';
import depiCert from '../assets/Depi.jpg';
import coreCert from '../assets/Core.png';
import humavolveImg from '../assets/huma_volve.jpg';
import gdg1Img from '../assets/gdg1.jpeg';

export default function WorldVault() {
  const [modalCert, setModalCert] = useState(null);

  const certificates = [
    {
      id: 'iti-2026',
      title: 'Cross-Platform Mobile App Development using Flutter (102 hrs)',
      issuer: 'Information Technology Institute (ITI)',
      date: 'July 2026 – August 2026',
      desc: '102-hour intensive government technology program covering Dart, Flutter architecture, Firebase backend services, Generative AI & AI Agents integration, and professional freelancing.',
      authority: 'Dr. Heba Saleh (Chairman, Information Technology Institute)',
      img: itiCert,
      badge: 'GOVERNMENT // ITI',
      accent: '#d4ff00',
    },
    {
      id: 'gdg-2026',
      title: 'Flutter Core Team Member Certificate of Completion',
      issuer: 'GDG on Campus • Benha University',
      date: '2025–2026 Season',
      desc: 'Awarded in recognition of successfully completing membership as a Flutter Core Team Member with outstanding dedication and valuable technical contributions throughout the season.',
      authority: 'Alaa Sameh (Community Leader) & Said Elhadidi (Egypt Facilitator)',
      img: gdgCoreCert2026,
      badge: 'LEADERSHIP // GDG',
      accent: '#ff2a2a',
    },
    {
      id: 'depi-2024',
      title: 'DEPI Mobile Application Specialist',
      issuer: 'Digital Egypt Pioneers Initiative (Ministry of Communications)',
      date: '2024 Track',
      desc: 'Completed comprehensive mobile engineering track with distinction. Mastered cross-platform architecture, reactive state patterns, and team capstone development.',
      authority: 'Egyptian Ministry of Communications and Information Technology',
      img: depiCert,
      badge: 'MINISTRY // DEPI',
      accent: '#c87d55',
    },
    {
      id: 'gdg-2025',
      title: 'GDG Benha Core Technology Member',
      issuer: 'Google Developer Groups Benha',
      date: '2025 Active',
      desc: 'Core team contribution in organizing tech sessions, speaker coordination, community mentorship, and practical Flutter engineering workshops.',
      authority: 'GDG Benha Leadership Council',
      img: coreCert,
      badge: 'COMMUNITY // GDG',
      accent: '#d4ff00',
    },
  ];

  const timeline = [
    {
      year: '2026',
      role: 'Software Engineering Intern',
      org: 'HumaVolve',
      desc: 'Building production-grade Flutter features, optimizing clean architectures, and implementing reactive API synchronization in live environments.',
      img: humavolveImg,
      tag: 'PRODUCTION INTERNSHIP',
    },
    {
      year: '2026',
      role: '350+ Problems Solved',
      org: 'Codeforces',
      desc: 'Intensive competitive programming focusing on graph traversals, dynamic programming, tree decomposition, and greedy strategies.',
      tag: 'ALGORITHMIC MASTERY',
    },
    {
      year: '2025–2026',
      role: 'Flutter Core Team Member',
      org: 'GDG on Campus Benha University',
      desc: 'Mentored university developers, conducted Flutter tech roadmaps, and spearheaded mobile workshops for the 2025–2026 season.',
      img: gdg1Img,
      tag: 'COMMUNITY LEADERSHIP',
    },
    {
      year: '2024',
      role: 'DEPI Mobile Track Graduate',
      org: 'Digital Egypt Pioneers Initiative',
      desc: 'Graduated with distinction from the Ministry of Communications mobile track, solidifying architectural discipline and Flutter excellence.',
      tag: 'SPECIALIZED ACCREDITATION',
    },
  ];

  return (
    <section id="vault" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-[#d4ff00] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]" />
          <span>WORLD 05 // THE VAULT &amp; CREDENTIAL ARCHIVE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#f2f5fa]">
          VERIFIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] via-[#c87d55] to-[#ff2a2a]">CREDENTIALS &amp; JOURNEY</span>
        </h2>
        <p className="font-mono text-xs sm:text-sm text-[#94a3b8] max-w-xl">
          Authentic milestones, industry accreditations, and verified engineering honors achieved by Abdelrahman Mahmoud.
        </p>
      </div>

      {/* ── THE 4 VERIFIED CERTIFICATES GALLERY ── */}
      <div className="mb-24">
        <div className="flex items-center gap-2 font-mono text-xs text-[#94a3b8] tracking-widest uppercase mb-6">
          <Award className="w-4 h-4 text-[#d4ff00]" />
          <span>OFFICIAL ACCREDITATION ARCHIVE (CLICK TO INSPECT FULL RESOLUTION)</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setModalCert(cert)}
              className="obsidian-panel obsidian-panel-hover rounded-2xl overflow-hidden border border-[rgba(240,244,248,0.12)] group cursor-pointer flex flex-col justify-between"
            >
              {/* Certificate Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#070a10]">
                <img
                  src={cert.img}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent opacity-80" />

                {/* Badge & Inspect button */}
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] px-2.5 py-1 rounded bg-[#030508]/85 border border-[#d4ff00]/40 text-[#d4ff00] backdrop-blur-md">
                  {cert.badge}
                </div>

                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#030508]/85 border border-[rgba(240,244,248,0.2)] text-[#f2f5fa] group-hover:border-[#d4ff00] group-hover:text-[#d4ff00] flex items-center justify-center transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#c87d55] mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#f2f5fa] group-hover:text-[#d4ff00] transition-colors mb-2">
                    {cert.title}
                  </h3>
                  <p className="font-mono text-xs text-[#94a3b8] mb-3">
                    {cert.issuer}
                  </p>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(240,244,248,0.08)] flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
                  <span>Signatory: {cert.authority.split('(')[0]}</span>
                  <span className="text-[#d4ff00] group-hover:underline flex items-center gap-1">
                    VIEW DOCUMENT <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CAREER CHRONICLES (TIMELINE) ── */}
      <div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#94a3b8] tracking-widest uppercase mb-8">
          <CheckCircle2 className="w-4 h-4 text-[#ff2a2a]" />
          <span>CAREER TRAJECTORY &amp; KEY MILESTONES</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="obsidian-panel rounded-xl p-6 border border-[rgba(240,244,248,0.08)] flex gap-5 items-start"
            >
              <div className="shrink-0 flex flex-col items-center">
                <span className="font-mono text-sm font-black text-[#d4ff00] px-2.5 py-1 rounded bg-[#0c101a] border border-[#d4ff00]/30">
                  {item.year}
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="font-mono text-[9px] text-[#ff2a2a] tracking-widest uppercase block">
                  {item.tag}
                </span>
                <h4 className="font-display font-bold text-lg text-[#f2f5fa]">{item.role}</h4>
                <p className="font-mono text-xs text-[#c87d55]">{item.org}</p>
                <p className="text-xs text-[#94a3b8] leading-relaxed pt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FULLSCREEN HIGH-RES CERTIFICATE MODAL ── */}
      {modalCert && (
        <div
          className="fixed inset-0 z-50 bg-[#030508]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setModalCert(null)}
        >
          <div
            className="relative max-w-4xl w-full obsidian-panel rounded-2xl border border-[rgba(240,244,248,0.2)] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[rgba(240,244,248,0.1)] pb-4">
              <div>
                <span className="font-mono text-[10px] text-[#d4ff00] uppercase tracking-widest block">
                  VERIFIED OFFICIAL CREDENTIAL
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#f2f5fa]">
                  {modalCert.title}
                </h3>
              </div>
              <button
                onClick={() => setModalCert(null)}
                className="p-2 rounded-full obsidian-panel border border-[rgba(240,244,248,0.2)] text-[#f2f5fa] hover:text-[#ff2a2a] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res Image View */}
            <div className="max-h-[60vh] overflow-auto rounded-xl bg-[#070a10] border border-[rgba(240,244,248,0.1)] flex items-center justify-center p-2">
              <img
                src={modalCert.img}
                alt={modalCert.title}
                className="max-h-[58vh] w-auto object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#94a3b8] pt-2">
              <div>
                <span className="text-[#f2f5fa] font-bold">{modalCert.issuer}</span> • {modalCert.date}
              </div>
              <button
                onClick={() => setModalCert(null)}
                className="px-6 py-2 rounded-full bg-[#d4ff00] text-black font-bold uppercase tracking-wider text-xs cursor-pointer hover:bg-[#c5f810]"
              >
                CLOSE INSPECTOR
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

