import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  Code2,
  ExternalLink,
  Globe,
  Layers,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Terminal,
  Trophy,
  Award,
} from 'lucide-react';

import profileImg from './assets/apdo2.jpeg';
import smartBonusImg from './assets/smar_bouns.png';
import depiCert from './assets/Depi.png';
import coreCert from './assets/Core.png';

const spring = { type: 'spring', stiffness: 380, damping: 24, mass: 0.85 };
const springSnappy = { type: 'spring', stiffness: 520, damping: 32, mass: 0.65 };

const CONTACT = {
  email: 'apdo28011@gmail.com',
  phoneDisplay: '01141592903',
  phoneTel: '+201141592903',
  linkedin: 'https://www.linkedin.com/in/apdelraman-mahmoud-799500306',
};

const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
];

const HEADER_SCROLL_OFFSET_PX = 88;

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function BentoCell({ children, className = '', borderAccent = 'purple', delay = 0 }) {
  const borderClass = borderAccent === 'cyan'
    ? 'border-cyan-400/35 hover:border-cyan-300/90'
    : borderAccent === 'both'
      ? 'border-purple-500/40 hover:border-cyan-400/70'
      : 'border-[#bc13fe]/35 hover:border-[#bc13fe]/90';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...spring, delay }}
      whileHover={{ scale: 1.03, transition: springSnappy }}
      className={`group bento-cell relative rounded-3xl bg-[#050505] p-8 md:p-12 border-2 ${borderClass} shadow-[0_0_0_1px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 60px rgba(188,19,254,0.08), 0 0 40px rgba(0,210,255,0.12)' }}
      />
      <motion.div className="relative z-10 h-full" whileHover={{ x: [0, -1, 1, -1, 0], transition: { duration: 0.35 } }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

function ProjectGitHubCard({ project, index }) {
  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springSnappy, delay: index * 0.07 }}
      whileHover={{ scale: 1.04, y: -6 }}
      className={`group bento-cell relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border-2 bg-[#050505] shadow-[0_0_0_1px_rgba(0,0,0,0.6)] ${project.borderClass || 'border-[#bc13fe]/35 hover:border-[#bc13fe]/90'}`}
    >
      {/* نفس كود البروجكت السابق ... (حافظت عليه كما هو) */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute right-4 top-4 h-10 w-10 flex items-center justify-center rounded-full border border-cyan-400/40 bg-black/70 backdrop-blur-sm">
          <ExternalLink className="h-5 w-5 text-cyan-200" />
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <Code2 className="h-8 w-8 text-cyan-300 group-hover:text-white transition" />
          <span className="font-mono text-xs text-white/40">0{index + 1}</span>
        </div>
        <h3 className="font-title mt-4 text-2xl md:text-3xl uppercase">{project.title}</h3>
        <p className="mt-3 text-white/65 flex-1 font-mono text-sm leading-relaxed">{project.desc}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-xs uppercase tracking-wider text-cyan-300 border border-cyan-400/30 px-3 py-1 rounded">{t}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

function ContactCta({ contact }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="group relative rounded-3xl border-2 border-[#bc13fe]/40 bg-gradient-to-br from-[#bc13fe]/20 via-[#050505] to-cyan-500/10 p-12 md:p-20 shadow-[0_0_100px_rgba(188,19,254,0.3)] overflow-hidden">
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition">
        <div className="absolute -left-32 top-0 h-96 w-96 bg-[#bc13fe]/30 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 text-center md:text-left">
        <h2 className="font-title text-5xl md:text-7xl uppercase leading-none">Let's build<br />the future</h2>
        <p className="mt-8 max-w-md mx-auto md:mx-0 font-mono text-lg text-white/70">Open to collaborations, contracts, and ambitious Flutter projects.</p>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8 font-mono text-lg">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-4 hover:text-white transition"><Mail className="text-[#bc13fe]" /> {contact.email}</a>
          <a href={`tel:${contact.phoneTel}`} className="flex items-center gap-4 hover:text-white transition"><Phone className="text-[#bc13fe]" /> {contact.phoneDisplay}</a>
          <a href={contact.linkedin} target="_blank" className="flex items-center gap-4 hover:text-white transition"><Globe className="text-[#bc13fe]" /> LinkedIn</a>
        </div>
      </div>
    </motion.div>
  );
}

function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 480, damping: 34 });
  const sy = useSpring(y, { stiffness: 480, damping: 34 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-12 w-12 rounded-full border-2 border-[#bc13fe]/80 bg-[#bc13fe]/10 shadow-[0_0_50px_#bc13fe]"
      style={{ left: sx, top: sy, marginLeft: -24, marginTop: -24 }}
    />
  );
}

function Header({ activeSection, onNavigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#bc13fe]/20 bg-[#050505]/95 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
        <button onClick={() => onNavigate('home')} className="font-title text-3xl tracking-wider text-white">AM<span className="text-[#bc13fe]">.</span></button>
        <nav className="flex gap-3">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest transition ${activeSection === item.id ? 'bg-[#bc13fe]/20 text-cyan-300' : 'hover:text-cyan-200 text-white/70'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroSpotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(188,19,254,0.28), rgba(0,210,255,0.12) 50%, transparent 70%)`;

  const onNavigate = useCallback((id) => {
    setActiveSection(id);
    scrollToSection(id);
  }, []);

  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-35% 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const projects = [ /* نفس المشاريع السابقة مع borderClass إذا أردت */ ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Header activeSection={activeSection} onNavigate={onNavigate} />
      <CursorRing />

      <main className="pt-20">
        {/* ==================== HERO ==================== */}
        <section id="home" className="relative min-h-[100dvh] flex items-center px-6 md:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#bc13fe_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-20" />
          
          {/* Neon Planet Background */}
          <div className="absolute right-10 top-1/3 w-[520px] h-[520px] md:w-[620px] md:h-[620px] -translate-y-1/4 pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#bc13fe] via-purple-600 to-[#00d2ff] opacity-30 blur-[120px]"
            />
            <div className="absolute inset-0 rounded-full border border-[#bc13fe]/40 shadow-[0_0_120px_#bc13fe,inset_0_0_80px_#bc13fe]" />
          </div>

          <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left - Name & Info */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 font-mono text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
                </span>
                AVAILABLE FOR FREELANCE / COLLAB
              </div>

              <h1 className="font-title text-7xl md:text-8xl lg:text-[6.2rem] leading-[1.05] tracking-[-0.03em]">
                ABDULRAHMAN<br />
                <span className="text-[#bc13fe]">MAHMOUD</span>
              </h1>

              <p className="text-2xl md:text-3xl text-white/80 font-light max-w-lg">
                Mobile Developer • Flutter & Clean Architecture<br />
                Huma-Volve Trainee • Level 3 CS @ Benha University
              </p>

              <div className="flex gap-12 text-4xl md:text-5xl font-title">
                <div>
                  <span className="text-[#bc13fe]">50+</span>
                  <p className="text-sm font-mono tracking-widest text-white/50 mt-1">PROJECTS</p>
                </div>
                <div>
                  <span className="text-cyan-400">391+</span>
                  <p className="text-sm font-mono tracking-widest text-white/50 mt-1">CODEFORCES</p>
                </div>
              </div>
            </div>

            {/* Right - Circular Profile with glow */}
            <motion.div 
              className="relative flex justify-center md:justify-end"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...spring, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-[#bc13fe] to-cyan-400 opacity-30 blur-3xl" />
                <div className="absolute -inset-8 rounded-full border border-[#bc13fe]/60" />
                
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full overflow-hidden border-4 border-[#bc13fe]/70 shadow-2xl"
                >
                  <img 
                    src={profileImg} 
                    alt="Abdulrahman Mahmoud" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono tracking-[3px] text-white/40 flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            SCROLL TO EXPLORE <span className="text-2xl mt-1">↓</span>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-24 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
            <BentoCell className="md:col-span-8" borderAccent="purple">
              <h2 className="font-title text-5xl mb-8 flex items-center gap-4">ABOUT ME <Sparkles className="text-[#bc13fe]" /></h2>
              <p className="text-lg leading-relaxed text-white/75">
                Level 3 Computer Science student at Benha University and Mobile Development Trainee at Huma-Volve. 
                I build high-quality Flutter applications using Clean Architecture, SOLID principles, and modern state management.
              </p>
              <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm font-mono text-white/70">
                <div><strong className="text-cyan-300">Dart & Flutter Basics:</strong> Omar Ahmed + Thrwat Samy</div>
                <div><strong className="text-cyan-300">OOP & SOLID:</strong> Omar Ahmed</div>
                <div><strong className="text-cyan-300">Problem Solving:</strong> Benha Community</div>
                <div><strong className="text-cyan-300">News App Project:</strong> Thrwat Samy</div>
              </div>
            </BentoCell>

            <BentoCell className="md:col-span-4" borderAccent="cyan">
              <h3 className="font-title text-4xl flex items-center gap-3 mb-6"><Trophy className="text-cyan-400" /> GDG Benha</h3>
              <p className="text-white/70">Core Team Member — Technical</p>
            </BentoCell>
          </div>
        </section>

        {/* Skills - Bigger Cards */}
        <section id="skills" className="px-6 py-24 border-t border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <BentoCell borderAccent="cyan">
              <h2 className="font-title text-5xl mb-12 flex items-center gap-4">
                <Layers className="h-12 w-12 text-[#bc13fe]" /> MY SKILLS
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  'Flutter', 'Dart', 'Clean Architecture', 'SOLID', 
                  'OOP', 'Firebase', 'Supabase', 'REST API', 
                  'Dio', 'Provider', 'Git & GitHub', 'Agile', 
                  'Problem Solving', 'UI/UX'
                ].map(skill => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.05, backgroundColor: '#1a0033' }}
                    className="bg-[#0a0a0a] border border-[#bc13fe]/30 hover:border-[#bc13fe] rounded-2xl p-8 text-center font-mono text-xl md:text-2xl transition-all"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </BentoCell>
          </div>
        </section>

        {/* Projects - نفس الكود السابق (أو أضف projects array) */}
        <section id="projects" className="px-6 py-24 border-t border-white/5">
          {/* ... استخدم نفس ProjectGitHubCard والـ projects array من الكود السابق ... */}
        </section>

        {/* Certificates */}
        <section id="certificates" className="px-6 py-24 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-title text-5xl mb-12 text-center">Certificates</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div whileHover={{ scale: 1.02 }} className="bento-cell rounded-3xl overflow-hidden border border-[#bc13fe]/40">
                <img src={depiCert} alt="DEPI Certificate" className="w-full h-auto" />
                <div className="p-6 bg-black/80">
                  <Award className="inline text-[#bc13fe]" /> DEPI Certificate
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="bento-cell rounded-3xl overflow-hidden border border-[#bc13fe]/40">
                <img src={coreCert} alt="GDG Core Team Certificate" className="w-full h-auto" />
                <div className="p-6 bg-black/80">
                  <Award className="inline text-[#bc13fe]" /> GDG Benha Core Team Certificate
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-28 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <ContactCta contact={CONTACT} />
          </div>
        </section>
      </main>
    </div>
  );
}