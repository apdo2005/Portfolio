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
} from 'lucide-react';
import profileImg from './assets/apdo1.png';
import smartBonusImg from './assets/smar_bouns.png';

const spring = { type: 'spring', stiffness: 380, damping: 24, mass: 0.85 };
const springSnappy = { type: 'spring', stiffness: 520, damping: 32, mass: 0.65 };

const CONTACT = {
  email: 'apdo28011@gmail.com',
  phoneDisplay: '01141592903',
  /** Egypt (+20); edit if your number format differs. */
  phoneTel: '+201141592903',
  linkedin:
    'https://www.linkedin.com/in/apdelraman-mahmoud-799500306',
};

const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const HEADER_SCROLL_OFFSET_PX = 88;

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

/** Bento cell with neon border, spring hover scale, and optional glitch wobble */
function BentoCell({
  children,
  className = '',
  borderAccent = 'purple',
  delay = 0,
}) {
  const borderClass =
    borderAccent === 'cyan'
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
      whileHover={{
        scale: 1.03,
        transition: springSnappy,
      }}
      className={`group bento-cell relative rounded-2xl bg-[#050505] p-6 md:p-8 ${borderClass} border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.6)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow:
            'inset 0 0 60px rgba(188,19,254,0.08), 0 0 40px rgba(0,210,255,0.12)',
        }}
      />
      <motion.div
        className="relative z-10 h-full"
        whileHover={{
          x: [0, -1, 1, -1, 0],
          transition: { duration: 0.35, ease: 'easeInOut' },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const projectBorderClass = (border) =>
  border === 'cyan'
    ? 'border-cyan-400/35 hover:border-cyan-300/90'
    : border === 'both'
      ? 'border-purple-500/40 hover:border-cyan-400/70'
      : border === 'green'
        ? 'border-emerald-500/35 hover:border-emerald-300/85'
        : border === 'amber'
          ? 'border-amber-400/35 hover:border-amber-300/85'
          : 'border-[#bc13fe]/35 hover:border-[#bc13fe]/90';

/** Full-card link to GitHub + Unsplash hero image */
function ProjectGitHubCard({ project, index }) {
  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 36, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...springSnappy, delay: index * 0.07 }}
      whileHover={{ scale: 1.04, y: -4, transition: springSnappy }}
      whileTap={{ scale: 0.97 }}
      className={`group bento-cell relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-[#050505] shadow-[0_0_0_1px_rgba(0,0,0,0.6)] ${projectBorderClass(project.border)}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow:
            'inset 0 0 60px rgba(188,19,254,0.08), 0 0 40px rgba(0,210,255,0.12)',
        }}
      />
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-[#050505]/80 text-cyan-200 shadow-[0_0_20px_rgba(188,19,254,0.35)] backdrop-blur-sm">
          <ExternalLink className="h-4 w-4" aria-hidden />
        </div>
      </div>
      <motion.div
        className="relative z-10 flex flex-1 flex-col p-5 pt-4 md:p-6 md:pt-4"
        whileHover={{
          x: [0, -1, 1, -1, 0],
          transition: { duration: 0.35, ease: 'easeInOut' },
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <Code2 className="h-7 w-7 text-cyan-300/80 transition group-hover:text-white" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/35">
            0{index + 1}
          </span>
        </div>
        <h3 className="font-title mt-3 text-2xl uppercase not-italic text-white md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 font-mono text-sm leading-relaxed text-white/65 md:text-base">
          {project.desc}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-[#bc13fe]/90">
          View on GitHub →
        </p>
      </motion.div>
    </motion.a>
  );
}

function ContactCta({ contact }) {
  const shellClass =
    'group relative flex flex-col gap-6 overflow-hidden rounded-2xl border-2 border-[#bc13fe]/40 bg-gradient-to-r from-[#bc13fe]/25 via-[#050505] to-cyan-500/20 p-8 shadow-[0_0_60px_rgba(188,19,254,0.2)] md:flex-row md:items-stretch md:justify-between md:p-10';

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={shellClass}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-screen transition group-hover:opacity-70">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#bc13fe]/30 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>
      <div className="relative z-10 flex min-w-0 flex-1 flex-col gap-4">
        <h2 className="font-title text-3xl uppercase md:text-4xl">
          Let&apos;s build the future
        </h2>
        <p className="font-mono text-base text-white/70 md:text-lg">
          Open to collaborations, mobile contracts, and ambitious product work.
        </p>
        <ul className="mt-2 flex flex-col gap-4 font-mono text-base md:text-lg">
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex cursor-pointer items-center gap-2 text-cyan-200 transition hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-[#bc13fe]" />
              {contact.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${contact.phoneTel}`}
              className="inline-flex cursor-pointer items-center gap-2 text-cyan-200/90 transition hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-[#bc13fe]" />
              {contact.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 text-cyan-200/90 transition hover:text-white"
            >
              <Globe className="h-4 w-4 shrink-0 text-[#bc13fe]" />
              LinkedIn profile
            </a>
          </li>
        </ul>
      </div>
      <div className="relative z-10 flex shrink-0 items-center gap-4 md:flex-col md:items-end md:justify-center">
        <Terminal className="h-12 w-12 text-white/80 md:h-14 md:w-14" />
      </div>
    </motion.div>
  );
}

function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 480, damping: 34, mass: 0.32 });
  const sy = useSpring(y, { stiffness: 480, damping: 34, mass: 0.32 });

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[9999] h-11 w-11 rounded-full border-2 border-[#bc13fe]/90 bg-[#bc13fe]/10 shadow-[0_0_32px_rgba(188,19,254,0.65),0_0_4px_rgba(0,210,255,0.5)]"
      style={{
        position: 'fixed',
        left: sx,
        top: sy,
        marginLeft: -22,
        marginTop: -22,
      }}
    />
  );
}

function Header({ activeSection, onNavigate }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#bc13fe]/20 bg-[#050505]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-title text-left text-base uppercase tracking-[0.2em] text-white/90 transition hover:text-cyan-300 md:text-lg"
        >
          AM<span className="text-[#bc13fe]">.</span>
        </button>
        <nav className="flex flex-wrap items-center gap-2 sm:justify-end">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition md:text-sm ${
                activeSection === item.id
                  ? 'bg-[#bc13fe]/20 text-cyan-300 ring-2 ring-cyan-400/50'
                  : 'text-white/60 hover:bg-white/5 hover:text-cyan-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springSnappy,
  },
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroSpotlight = useMotionTemplate`radial-gradient(560px circle at ${mouseX}px ${mouseY}px, rgba(188,19,254,0.22), rgba(0,210,255,0.08) 40%, transparent 58%)`;

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    const centerGlow = () => {
      const r = el.getBoundingClientRect();
      mouseX.set(r.width * 0.42);
      mouseY.set(r.height * 0.38);
    };
    centerGlow();
    const ro = new ResizeObserver(centerGlow);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mouseX, mouseY]);

  const onNavigate = useCallback((id) => {
    setActiveSection(id);
    scrollToSection(id);
  }, []);

  useEffect(() => {
    const sections = NAV.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    );
    if (!sections.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.12, 0.25, 0.5] },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const projects = [
    {
      title: 'LabLink',
      desc:
        'Digital platform connecting patients with labs. Multi-role workflows, scheduling, and secure data handoff across stakeholders.',
      tech: ['Flutter', 'Firebase', 'Agile'],
      border: 'purple',
      githubUrl: 'https://github.com/Habiba04/LabLink',
      image:
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&auto=format&fit=crop&q=85',
    },
    {
      title: 'Smart Bonus',
      desc:
        'B2B bridge between pharmacies and suppliers. Supabase-backed sync, clean architecture, and reliable offline-first patterns.',
      tech: ['Flutter', 'Supabase', 'Clean Arch'],
      border: 'cyan',
      githubUrl: 'https://github.com/apdo2005/Smart_Bonus',
      image: smartBonusImg,
    },
    {
      title: 'Spider-Man App',
      desc:
        'API-first showcase: high-throughput REST integration with Dio, resilient error handling, and a kinetic, data-driven UI.',
      tech: ['REST API', 'Dio', 'Performance UI'],
      border: 'both',
      githubUrl: 'https://github.com/apdo2005/Spider-Man-app',
      image:
        'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=900&auto=format&fit=crop&q=85',
    },
    {
      title: 'Grocery E-commerce',
      desc:
        'High-performance shopping experience: fast catalog flows, cart/checkout polish, and a storefront tuned for real-world retail traffic.',
      tech: ['Flutter', 'E-commerce', 'Performance'],
      border: 'amber',
      githubUrl: 'https://github.com/Elfouly282/grocery2',
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=85',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Header activeSection={activeSection} onNavigate={onNavigate} />

      <main className="pt-[72px]">
        {/* —— Home / Hero —— */}
        <section
          id="home"
          className="px-4 pb-16 pt-6 md:px-8 md:pb-20 md:pt-10"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - r.left);
                mouseY.set(e.clientY - r.top);
              }}
              className="relative grid gap-8 overflow-hidden rounded-[28px] border-2 border-[#bc13fe]/30 bg-[#050505] p-6 shadow-[0_0_80px_rgba(188,19,254,0.12)] md:grid-cols-[1fr_minmax(240px,380px)] md:items-center md:gap-10 md:p-10 lg:p-12"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: heroSpotlight }}
              />
              <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#bc13fe]/10 blur-[100px]" />
              <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />

              <div className="relative z-10 order-1 flex min-w-0 flex-col justify-center gap-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/90">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#bc13fe] shadow-[0_0_12px_#bc13fe]" />
                  Full-stack mobile · Neon systems
                </p>
                <h1 className="font-title text-4xl uppercase leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl glitch-text">
                  Abdulrahman
                  <br />
                  <span className="text-[#bc13fe]">Mahmoud</span>
                </h1>
                <p className="max-w-xl font-mono text-sm leading-relaxed text-white/65 md:text-base">
                  I ship Flutter apps with clean architecture, Supabase/Firebase
                  backends, and interfaces that feel fast, sharp, and a little
                  dangerous—in a good way.
                </p>
                <p className="max-w-xl font-mono text-xs uppercase leading-relaxed tracking-wide text-[#bc13fe]/95 md:text-sm">
                  Level 3 CS Student @ Benha University
                </p>
                <div className="grid max-w-md grid-cols-2 gap-3">
                  {[
                    { label: 'Shipped', value: '50+' },
                    { label: 'CF', value: '391+' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-cyan-500/25 bg-[#080808] px-3 py-3 font-mono md:px-4"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-white/45">
                        {item.label}
                      </p>
                      <p className="font-title mt-1 text-lg text-white md:text-xl">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: profile pop-out + neon purple elevation */}
              <motion.div
                className="relative z-10 order-2 mx-auto w-full max-w-[380px] perspective-[1400px] md:mx-0 md:max-w-none"
                initial={{ opacity: 0, x: 56, scale: 0.88, rotateY: -14 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                transition={{ ...spring, delay: 0.12 }}
              >
                <div className="relative [transform-style:preserve-3d]">
                  <div
                    className="absolute -inset-8 rounded-[40px] bg-[#bc13fe]/25 blur-3xl"
                    aria-hidden
                  />
                  <div
                    className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[#bc13fe]/50 via-[#bc13fe]/15 to-cyan-500/20 opacity-90 blur-2xl"
                    aria-hidden
                  />
                  <motion.div
                    className="relative overflow-hidden rounded-[28px] border-2 border-[#bc13fe]/65 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(188,19,254,0.45),0_0_60px_rgba(188,19,254,0.35)]"
                    style={{ transformStyle: 'preserve-3d' }}
                    whileHover={{
                      y: -14,
                      scale: 1.03,
                      rotateX: 4,
                      rotateY: -6,
                      boxShadow:
                        '0 32px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(188,19,254,0.65), 0 0 80px rgba(188,19,254,0.5), 0 0 120px rgba(188,19,254,0.2)',
                      transition: spring,
                    }}
                  >
                    <img
                      src={profileImg}
                      alt="Abdulrahman Mahmoud"
                      className="aspect-[4/5] w-full object-cover md:min-h-[340px]"
                      width={480}
                      height={600}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/75 via-transparent to-[#bc13fe]/10" />
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-[#bc13fe]/35" />
                  </motion.div>
                  <motion.div
                    className="pointer-events-none absolute -bottom-10 left-1/2 h-32 w-[78%] -translate-x-1/2 rounded-full bg-[#bc13fe]/30 blur-3xl"
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.45, 0.9, 0.45],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* —— About —— */}
        <section
          id="about"
          className="border-t border-white/5 px-4 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-12">
            <BentoCell
              className="md:col-span-7"
              borderAccent="purple"
              delay={0.05}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-cyan-300" />
                <div>
                  <h2 className="font-title text-2xl uppercase tracking-tight text-white md:text-3xl">
                    About
                  </h2>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-white/65 md:text-[15px]">
                    I&apos;m a Level 3 CS student at Benha University, focused on
                    production-grade Flutter, pragmatic architecture, and
                    interfaces users actually enjoy. Recent work spans{' '}
                    <span className="text-cyan-300">LabLink</span> (patient–lab
                    connectivity),{' '}
                    <span className="text-[#bc13fe]">Smart Bonus</span> (Supabase +
                    B2B tooling),{' '}
                    <span className="text-cyan-300">Spider-Man App</span> (API-heavy
                    UI), and{' '}
                    <span className="text-[#bc13fe]">Grocery E-commerce</span> (a
                    high-performance shopping flow).
                  </p>
                </div>
              </div>
            </BentoCell>

            <BentoCell
              className="md:col-span-5"
              borderAccent="cyan"
              delay={0.1}
            >
              <h3 className="font-title text-xl uppercase text-cyan-200">
                GDG Benha
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                Core Team · Technical
              </p>
              <p className="mt-4 font-mono text-sm leading-relaxed text-white/65">
                Helping run technical initiatives, workshops, and community
                programs for Google Developer Groups on Campus Benha—mentoring,
                organizing builds, and keeping the stack sharp for everyone in
                the chapter.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-xs text-white/50">
                <MapPin className="h-4 w-4 text-[#bc13fe]" />
                Benha, Egypt
              </div>
            </BentoCell>

            <BentoCell
              className="md:col-span-12"
              borderAccent="both"
              delay={0.12}
            >
              <h3 className="font-title text-lg uppercase text-white/90">
                Roles & highlights
              </h3>
              <ul className="mt-4 grid gap-4 font-mono text-sm text-white/70 md:grid-cols-3">
                <li className="rounded-xl border border-white/10 bg-[#080808] p-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                    HUMA-VOLVE
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    Mobile engineering trainee — shipping features with guidance
                    on lifecycle, APIs, and quality.
                  </p>
                </li>
                <li className="rounded-xl border border-white/10 bg-[#080808] p-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#bc13fe]">
                    GDG Benha
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    Core Team (Technical) — events, content, and hands-on support
                    for student developers.
                  </p>
                </li>
                <li className="rounded-xl border border-white/10 bg-[#080808] p-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                    iSchool
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-white/55">
                    Coding instructor — breaking down fundamentals and project
                    thinking for new builders.
                  </p>
                </li>
              </ul>
            </BentoCell>
          </div>
        </section>

        {/* —— Skills —— */}
        <section
          id="skills"
          className="border-t border-white/5 px-4 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <BentoCell borderAccent="cyan" delay={0}>
              <h2 className="font-title flex items-center gap-2 text-2xl uppercase md:text-3xl">
                <Layers className="h-7 w-7 text-[#bc13fe]" />
                Skills
              </h2>
              <p className="mt-2 font-mono text-sm text-white/55">
                // stack · patterns · platforms
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Dart',
                  'Flutter',
                  'Clean Architecture',
                  'SOLID',
                  'OOP',
                  'Firebase',
                  'Supabase',
                  'REST',
                  'Dio',
                  'Provider',
                  'Git',
                  'Agile',
                ].map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06 }}
                    className="rounded-lg border border-cyan-500/30 bg-[#080808] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-cyan-200/90 shadow-[0_0_20px_rgba(0,210,255,0.08)] transition hover:border-[#bc13fe]/60 hover:text-white"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </BentoCell>
          </div>
        </section>

        {/* —— Projects —— */}
        <section
          id="projects"
          className="border-t border-white/5 px-4 py-16 md:px-8 md:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="font-title mb-6 text-2xl uppercase tracking-tight md:text-3xl">
              Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {projects.map((project, index) => (
                <ProjectGitHubCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* —— Contact —— */}
        <section
          id="contact"
          className="border-t border-white/5 px-4 py-16 md:px-8 md:pb-24 md:pt-20"
        >
          <div className="mx-auto max-w-7xl">
            <ContactCta contact={CONTACT} />
          </div>
        </section>
      </main>
    </div>
  );
}
