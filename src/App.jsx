import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  motion, useMotionValue, useSpring, useTransform,
  AnimatePresence, useScroll, useSpring as useScrollSpring,
} from 'framer-motion';
import {
  Code2, Mail, Phone, Award, ArrowUp, Menu, X,
  ExternalLink, Cpu, Layers, Zap, Database, GitBranch,
  Sun, Moon,
} from 'lucide-react';

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ── Asset Imports ─────────────────────────────────────────────────────────────
import profileImg from './assets/apdo2.jpeg';
import gdg1Img from './assets/gdg1.jpeg';
import smartBonusImg from './assets/smar_bouns.png';
import depiCert from './assets/Depi.png';
import coreCert from './assets/Core.png';
import humavolveImg from './assets/huma_volve.jpg';

// ── Constants ─────────────────────────────────────────────────────────────────
const CONTACT = {
  email: 'apdo28011@gmail.com',
  phoneDisplay: '01151684594',
  phoneTel: '+201151684594',
  linkedin: 'https://www.linkedin.com/in/apdelraman-mahmoud-799500306',
  github: 'https://github.com/apdo2005',
};

const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certs', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
];

const SKILLS = [
  { name: 'Flutter', level: 92, icon: <Cpu className="w-4 h-4" />, cat: 'Mobile' },
  { name: 'Dart', level: 90, icon: <Code2 className="w-4 h-4" />, cat: 'Mobile' },
  { name: 'State Management', level: 85, icon: <Cpu className="w-4 h-4" />, cat: 'Mobile' },
  { name: 'Clean Architecture', level: 88, icon: <Layers className="w-4 h-4" />, cat: 'Architecture' },
  { name: 'SOLID Principles', level: 85, icon: <Layers className="w-4 h-4" />, cat: 'Architecture' },
  { name: 'Firebase', level: 82, icon: <Database className="w-4 h-4" />, cat: 'Backend' },
  { name: 'Supabase', level: 78, icon: <Database className="w-4 h-4" />, cat: 'Backend' },
  { name: 'REST API / Dio', level: 88, icon: <Zap className="w-4 h-4" />, cat: 'Networking' },
  { name: 'Git & GitHub', level: 87, icon: <GitBranch className="w-4 h-4" />, cat: 'Tools' },
  { name: 'Problem Solving', level: 90, icon: <Zap className="w-4 h-4" />, cat: 'CS' },
];

const TIMELINE = [
  { year: '2026', title: 'Software Engineering Intern', org: 'HumaVolve', desc: 'Building scalable Flutter features in production using Clean Architecture.', accent: 'purple' },
  { year: '2026', title: '350+ Problems Solved', org: 'Codeforces', desc: 'Sharpened algorithmic thinking through competitive programming.', accent: 'cyan' },
  { year: '2025', title: 'Core Tech Member', org: 'GDG Benha', desc: 'Mentored developers and organized technical sessions.', accent: 'cyan' },
  { year: '2024', title: 'DEPI Certified', org: 'Digital Egypt Pioneers Initiative', desc: 'Completed intensive mobile development track with distinction.', accent: 'purple' },
];

const PROJECTS = [
  {
    title: 'LabLink',
    desc: 'Patient-lab digital platform with multi-role workflows and secure scheduling.',
    tech: ['Flutter', 'Firebase', 'Clean Arch'],
    githubUrl: 'https://github.com/Habiba04/LabLink',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&auto=format&fit=crop&q=60',
  },
  {
    title: 'Smart Bonus',
    desc: 'B2B pharmacy-supplier bridge with Supabase sync and offline-first support.',
    tech: ['Flutter', 'Supabase', 'Dio'],
    githubUrl: 'https://github.com/apdo2005/Smart_Bonus',
    image: smartBonusImg,
  },
  {
    title: 'Spider-Man App',
    desc: 'Showcase app using Dio for REST API integration with kinetic UI.',
    tech: ['Flutter', 'Dio', 'REST API'],
    githubUrl: 'https://github.com/apdo2005/Spider-Man-app',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=900&auto=format&fit=crop&q=60',
  },
  {
    title: 'Grocery E-commerce',
    desc: 'High-performance retail storefront tuned for real-world traffic.',
    tech: ['Flutter', 'Performance', 'UX'],
    githubUrl: 'https://github.com/Elfouly282/grocery2',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=60',
  },
];

// ── useTypewriter ─────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 75, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[idx % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setDisplay(cur.slice(0, display.length + 1));
        if (display.length + 1 === cur.length) setTimeout(() => setDel(true), pause);
      } else {
        setDisplay(cur.slice(0, display.length - 1));
        if (display.length === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [display, del, idx, words, speed, pause]);
  return display;
}

// ── ScrollProgress ────────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useScrollSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-gradient-to-r from-[#bc13fe] via-cyan-400 to-[#bc13fe]"
    />
  );
}

// ── AdvancedCursor ────────────────────────────────────────────────────────────
function AdvancedCursor() {
  const canvasRef = useRef(null);
  const ringRef = useRef({ x: -200, y: -200, scale: 1, pulse: 0 });
  const dotRef = useRef({ x: -200, y: -200 });
  const mouseRef = useRef({ x: -200, y: -200 });
  const hoverRef = useRef(false);
  const clickRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize, { passive: true });
    resize();
    document.body.style.cursor = 'none';

    const onMove = (e) => {
      const cx = e.clientX, cy = e.clientY;
      mouseRef.current.x = cx; mouseRef.current.y = cy;
    };

    const onClick = (e) => {
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const spd = Math.random() * 6 + 3;
        clickRef.current.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          size: Math.random() * 3 + 1.5,
          life: 1, decay: .025,
          color: i % 2 === 0 ? '#bc13fe' : '#22d3ee',
        });
      }
      ringRef.current.pulse = 1;
    };

    const onOver = (e) => {
      const el = e.target.closest('a,button');
      hoverRef.current = !!(el || getComputedStyle(e.target).cursor === 'pointer');
      // Magnetic target: snap ring toward center of hovered element
      if (el) {
        const r = el.getBoundingClientRect();
        hoverRef.magnetTarget = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      } else {
        hoverRef.magnetTarget = null;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      dotRef.current.x += (mx - dotRef.current.x) * 0.35;
      dotRef.current.y += (my - dotRef.current.y) * 0.35;

      // Magnetic: ring snaps toward hovered element center
      const magnet = hoverRef.magnetTarget;
      const targetRx = magnet ? mx + (magnet.x - mx) * 0.35 : mx;
      const targetRy = magnet ? my + (magnet.y - my) * 0.35 : my;
      ringRef.current.x += (targetRx - ringRef.current.x) * 0.12;
      ringRef.current.y += (targetRy - ringRef.current.y) * 0.12;
      const targetScale = hoverRef.current ? 2.2 : 1;
      ringRef.current.scale += (targetScale - ringRef.current.scale) * 0.15;
      if (ringRef.current.pulse > 0) ringRef.current.pulse -= 0.04;

      // Click ripple
      for (let i = clickRef.current.length - 1; i >= 0; i--) {
        const p = clickRef.current[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= .92; p.vy *= .92;
        p.life -= p.decay;
        if (p.life <= 0) { clickRef.current.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size * p.life), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 18 * p.life; ctx.shadowColor = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
      }

      ctx.globalAlpha = 1; ctx.shadowBlur = 0;

      // Ring
      const rx = ringRef.current.x, ry = ringRef.current.y;
      const rs = ringRef.current.scale;
      const pulse = Math.max(0, ringRef.current.pulse || 0);
      const ringR = 18 * rs + pulse * 14;

      ctx.beginPath();
      ctx.arc(rx, ry, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = hoverRef.current ? '#bc13fe' : '#22d3ee';
      ctx.lineWidth = hoverRef.current ? 2 : 1.5;
      ctx.shadowBlur = hoverRef.current ? 20 : 10;
      ctx.shadowColor = hoverRef.current ? '#bc13fe' : '#22d3ee';
      ctx.globalAlpha = hoverRef.current ? 0.9 : 0.6;
      ctx.stroke();

      if (hoverRef.current) {
        ctx.beginPath();
        ctx.arc(rx, ry, ringR + 8, 0, Math.PI * 2);
        ctx.strokeStyle = '#bc13fe';
        ctx.lineWidth = .5;
        ctx.globalAlpha = .3;
        ctx.stroke();
      }

      if (pulse > 0) {
        ctx.beginPath();
        ctx.arc(rx, ry, ringR + pulse * 30, 0, Math.PI * 2);
        ctx.strokeStyle = '#bc13fe';
        ctx.lineWidth = 1;
        ctx.globalAlpha = pulse * .5;
        ctx.shadowBlur = 20; ctx.shadowColor = '#bc13fe';
        ctx.stroke();
      }

      ctx.globalAlpha = 1; ctx.shadowBlur = 0;

      // Dot
      ctx.beginPath();
      ctx.arc(dotRef.current.x, dotRef.current.y, hoverRef.current ? 3 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = hoverRef.current ? '#bc13fe' : '#ffffff';
      ctx.shadowBlur = 12; ctx.shadowColor = hoverRef.current ? '#bc13fe' : '#22d3ee';
      ctx.globalAlpha = 1;
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[99998]" />;
}

// ── NeuralBackground ──────────────────────────────────────────────────────────
function NeuralBackground({ darkMode }) {
  const canvasRef = useRef(null);
  const darkModeRef = useRef(darkMode);
  useEffect(() => { darkModeRef.current = darkMode; }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;
    let nodes = [];
    let mouse = { x: -999, y: -999 };
    const NODE_COUNT = 55;
    const MAX_DIST = 160;
    const MOUSE_DIST = 200;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .45,
        vy: (Math.random() - .5) * .45,
        r: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        color: Math.random() > .5 ? '#bc13fe' : '#22d3ee',
      }));
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const draw = () => {
      const isDark = darkModeRef.current;
      ctx.fillStyle = isDark ? 'rgba(5,5,5,0.92)' : 'rgba(245,245,250,0.92)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        n.pulse += 0.018;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        const mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < MOUSE_DIST && md > 0) {
          const force = (MOUSE_DIST - md) / MOUSE_DIST * 0.6;
          n.vx += (mdx / md) * force;
          n.vy += (mdy / md) * force;
          const spd = Math.hypot(n.vx, n.vy);
          if (spd > 2.5) { n.vx = (n.vx / spd) * 2.5; n.vy = (n.vy / spd) * 2.5; }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * (isDark ? 0.35 : 0.25);
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            const ca = a.color === '#bc13fe' ? `rgba(188,19,254,${alpha})` : `rgba(34,211,238,${alpha})`;
            const cb = b.color === '#bc13fe' ? `rgba(188,19,254,${alpha})` : `rgba(34,211,238,${alpha})`;
            grad.addColorStop(0, ca);
            grad.addColorStop(1, cb);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - dist / MAX_DIST) * 1.2;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const r = n.r + glow * 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 8 + glow * 12;
        ctx.shadowColor = n.color;
        ctx.globalAlpha = isDark ? 0.7 + glow * 0.3 : 0.5 + glow * 0.2;
        ctx.fill();
      }

      // Scanline overlay
      ctx.globalAlpha = 0.025;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = isDark ? '#000' : '#aaa';
        ctx.fillRect(0, y, canvas.width, 2);
      }

      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ── BentoCell ─────────────────────────────────────────────────────────────────
function BentoCell({ children, className = '', borderAccent = 'purple', animType = 'fade-up', delay = 0, darkMode = true }) {
  const isCyan = borderAccent === 'cyan';
  const borderClass = isCyan
    ? 'border-cyan-400/30 hover:border-cyan-300/70'
    : 'border-[#bc13fe]/30 hover:border-[#bc13fe]/70';
  const bgClass = darkMode ? 'bg-[#080810]/80' : 'bg-white/80';
  const variants = {
    'fade-up':     { initial: { opacity: 0, y: 50 },       whileInView: { opacity: 1, y: 0 } },
    'slide-left':  { initial: { opacity: 0, x: -50 },      whileInView: { opacity: 1, x: 0 } },
    'slide-right': { initial: { opacity: 0, x: 50 },       whileInView: { opacity: 1, x: 0 } },
    'scale-up':    { initial: { opacity: 0, scale: .85 },  whileInView: { opacity: 1, scale: 1 } },
    'flip':        { initial: { opacity: 0, rotateX: -80 }, whileInView: { opacity: 1, rotateX: 0 } },
  };
  const anim = variants[animType] || variants['fade-up'];
  return (
    <motion.div
      initial={anim.initial} whileInView={anim.whileInView}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay, type: 'spring', bounce: 0.25 }}
      className={`relative rounded-3xl ${bgClass} backdrop-blur-xl p-8 md:p-10 border ${borderClass} shadow-2xl overflow-hidden ${className} group`}
    >
      <div className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-bl ${isCyan ? 'from-cyan-400/10' : 'from-[#bc13fe]/10'} to-transparent rounded-bl-3xl`} />
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 bg-gradient-to-br ${isCyan ? 'from-cyan-400' : 'from-[#bc13fe]'} to-transparent`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ── SkillBar ──────────────────────────────────────────────────────────────────
function SkillBar({ skill, delay, darkMode = true }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const textColor = darkMode ? 'text-white/75' : 'text-gray-700';
  const pctColor = darkMode ? 'text-white/35' : 'text-gray-400';
  const trackColor = darkMode ? 'bg-white/5' : 'bg-gray-200';
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <div className={`flex items-center gap-2 ${textColor} font-mono text-sm`}>
          <span className="text-cyan-400">{skill.icon}</span>{skill.name}
        </div>
        <span className={`text-xs font-mono ${pctColor}`}>{skill.level}%</span>
      </div>
      <div className={`h-1.5 ${trackColor} rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.3, delay: delay * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[#bc13fe] to-cyan-400 relative"
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] -mr-1" />
        </motion.div>
      </div>
    </div>
  );
}

// ── TimelineItem ──────────────────────────────────────────────────────────────
function TimelineItem({ item, index, total, darkMode = true }) {
  const isCyan = item.accent === 'cyan';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const orgColor = darkMode ? 'text-white/35' : 'text-gray-400';
  const descColor = darkMode ? 'text-white/55' : 'text-gray-600';
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.55, delay: index * 0.1, type: 'spring', bounce: 0.2 }}
      className="relative flex gap-5 items-start"
    >
      <div className="flex flex-col items-center shrink-0">
        <motion.div
          whileInView={{ scale: [0, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className={`w-3 h-3 rounded-full mt-1.5 ${isCyan ? 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]' : 'bg-[#bc13fe] shadow-[0_0_12px_#bc13fe]'}`}
        />
        {index < total - 1 && <div className="w-px flex-1 bg-white/8 mt-2 min-h-[3rem]" />}
      </div>
      <div className="pb-7">
        <span className={`text-xs font-mono tracking-widest font-bold ${isCyan ? 'text-cyan-400' : 'text-[#bc13fe]'}`}>{item.year}</span>
        <h4 className={`${titleColor} font-bold text-base mt-0.5`}>{item.title}</h4>
        <p className={`${orgColor} text-xs font-mono mb-1.5 tracking-wider`}>{item.org}</p>
        <p className={`${descColor} text-sm leading-relaxed`}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────────────────
function ProjectCard({ project, index, darkMode = true }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const xS = useSpring(x, { stiffness: 140, damping: 20 });
  const yS = useSpring(y, { stiffness: 140, damping: 20 });
  const rotateX = useTransform(yS, [-.5, .5], ['6deg', '-6deg']);
  const rotateY = useTransform(xS, [-.5, .5], ['-6deg', '6deg']);
  const onMove = useCallback((e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - .5);
    y.set((e.clientY - r.top) / r.height - .5);
  }, [x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  const cardBg = darkMode ? 'bg-[#080810]/80' : 'bg-white/80';

  return (
    <motion.div
      ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 60, scale: .96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, type: 'spring', bounce: 0.3 }}
      style={{ perspective: 1200 }} className="h-full"
    >
      <motion.a
        href={project.githubUrl} target="_blank" rel="noopener noreferrer"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -10 }}
        className={`group relative flex flex-col overflow-hidden rounded-[2rem] ${cardBg} backdrop-blur-2xl border border-white/5 hover:border-cyan-400/25 transition-all duration-500 h-full shadow-2xl`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#bc13fe]/4 via-transparent to-cyan-400/4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2rem]">
          <img src={project.image} alt={project.title} loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ transform: 'translateZ(30px)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute top-5 right-6 font-mono text-lg font-bold text-white/20 group-hover:text-cyan-400/70 transition-colors duration-500" style={{ transform: 'translateZ(50px)' }}>
            0{index + 1}
          </div>
        </div>
        <div className="p-7 md:p-9 flex-1 flex flex-col relative z-10" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex justify-between items-start mb-3">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#bc13fe] group-hover:to-cyan-400 transition-all duration-300`}>
              {project.title}
            </h3>
            <ExternalLink className={`h-5 w-5 ${darkMode ? 'text-white/15' : 'text-gray-300'} group-hover:text-cyan-400 transition-colors duration-500 shrink-0 mt-1`} />
          </div>
          <p className={`${darkMode ? 'text-white/50' : 'text-gray-500'} text-sm leading-relaxed flex-1 font-light`}>{project.desc}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span key={t} className={`text-xs font-mono ${darkMode ? 'bg-white/4 border-white/5 text-white/50' : 'bg-gray-100 border-gray-200 text-gray-500'} px-3 py-1.5 rounded-full border group-hover:border-[#bc13fe]/35 group-hover:text-[#bc13fe] transition-all duration-500`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

// ── BackToTop ─────────────────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .7 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#bc13fe]/15 border border-[#bc13fe]/40 text-[#bc13fe] flex items-center justify-center hover:bg-[#bc13fe] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(188,19,254,0.25)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)]"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── FloatingSocials ───────────────────────────────────────────────────────────
function FloatingSocials() {
  return (
    <div className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-4 after:content-[''] after:w-px after:h-24 after:bg-white/15 after:mt-2">
      {[
        { href: CONTACT.github, icon: <GithubIcon className="w-5 h-5" />, color: 'hover:text-cyan-400' },
        { href: CONTACT.linkedin, icon: <LinkedinIcon className="w-5 h-5" />, color: 'hover:text-[#bc13fe]' },
        { href: `mailto:${CONTACT.email}`, icon: <Mail className="w-5 h-5" />, color: 'hover:text-cyan-400' },
      ].map(({ href, icon, color }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer"
          className={`text-white/30 ${color} transition-all duration-300 hover:-translate-y-1 transform`}>
          {icon}
        </a>
      ))}
    </div>
  );
}

// ── InteractiveProfile ────────────────────────────────────────────────────────
function InteractiveProfile({ darkMode }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const xS = useSpring(x, { stiffness: 120, damping: 18 });
  const yS = useSpring(y, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(yS, [-0.5, 0.5], ['18deg', '-18deg']);
  const rotateY = useTransform(xS, [-0.5, 0.5], ['-18deg', '18deg']);
  const glowX = useTransform(xS, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(yS, [-0.5, 0.5], ['0%', '100%']);
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState([]);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const onClick = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const rx = ((e.clientX - r.left) / r.width) * 100;
    const ry = ((e.clientY - r.top) / r.height) * 100;
    const id = Date.now();
    setClicked(true);
    setRipples(prev => [...prev, { id, x: rx, y: ry }]);
    setTimeout(() => setClicked(false), 300);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 900);
  }, []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
      className="relative cursor-pointer select-none" style={{ perspective: 900 }}>
      {/* Outer spinning rings */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-4 rounded-full opacity-60"
        style={{ background: 'conic-gradient(from 0deg, #bc13fe, #22d3ee, #bc13fe, #22d3ee, #bc13fe)', padding: 2, borderRadius: '50%' }}>
        <div className={`w-full h-full rounded-full ${darkMode ? 'bg-[#050505]' : 'bg-slate-100'}`} />
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-8 rounded-full opacity-25"
        style={{ background: 'conic-gradient(from 90deg, #22d3ee, transparent, #bc13fe, transparent)', padding: 1.5, borderRadius: '50%' }}>
        <div className={`w-full h-full rounded-full ${darkMode ? 'bg-[#050505]' : 'bg-slate-100'}`} />
      </motion.div>

      {/* Main image with 3D tilt */}
      <motion.div
        animate={clicked ? { scale: 0.94 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(188,19,254,0.5), 0 0 120px rgba(34,211,238,0.2)', rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <img src={profileImg} alt="Abdulrahman Mahmoud" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />

        {/* Dynamic glare that follows mouse */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: useTransform([glowX, glowY], ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18) 0%, transparent 65%)`
            ),
          }}
        />

        {/* Click ripples */}
        {ripples.map(r => (
          <span key={r.id} className="absolute rounded-full animate-ping pointer-events-none"
            style={{ left: `${r.x}%`, top: `${r.y}%`, width: 20, height: 20, transform: 'translate(-50%,-50%)', background: 'rgba(188,19,254,0.6)', animationDuration: '0.8s' }} />
        ))}

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#bc13fe]/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
          <span className="text-white text-xs font-mono tracking-widest opacity-90">CLICK ME ✦</span>
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#bc13fe] to-cyan-400 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(188,19,254,0.5)]"
      >
        Available ✦
      </motion.div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const typed = useTypewriter(['Flutter Engineer', 'Clean Architecture', 'Problem Solver', 'Mobile Developer'], 75, 1800);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const bg = darkMode ? 'bg-[#050505] text-white' : 'bg-slate-100 text-gray-900';
  const navBg = darkMode ? 'bg-[#050505]/80' : 'bg-white/80';
  const navText = darkMode ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900';
  const sectionLabel = darkMode ? 'text-white/20' : 'text-gray-300';
  const headingColor = darkMode ? 'text-white' : 'text-gray-900';
  const subColor = darkMode ? 'text-white/50' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-[#080810]/80' : 'bg-white/80';
  const borderColor = darkMode ? 'border-white/5' : 'border-gray-200';

  const skillCategories = useMemo(() => [...new Set(SKILLS.map(s => s.cat))], []);

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-500 overflow-x-hidden`}>
      {/* Background */}
      <NeuralBackground darkMode={darkMode} />

      {/* Cursor */}
      <AdvancedCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* ── Theme Toggle ── */}
      <motion.button
        onClick={() => setDarkMode(d => !d)}
        whileHover={{ rotate: 20, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-24 right-8 z-[9997] w-11 h-11 rounded-full bg-gradient-to-br from-[#bc13fe] to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.7)] transition-shadow duration-300"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
              <Sun className="w-5 h-5 text-white" />
            </motion.span>
          ) : (
            <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
              <Moon className="w-5 h-5 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-[9996] ${navBg} backdrop-blur-xl border-b ${borderColor} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button
            onClick={() => scrollTo('home')}
            whileHover={{ scale: 1.05 }}
            className="font-mono font-bold text-lg bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent"
          >
            apdo.dev
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className={`text-sm font-mono ${navText} transition-colors duration-200 relative group`}>
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#bc13fe] to-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <a href="/cv.pdf" download
              className="text-sm font-mono px-4 py-1.5 rounded-full border border-[#bc13fe]/50 text-[#bc13fe] hover:bg-[#bc13fe] hover:text-white transition-all duration-300">
              Resume
            </a>
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(188,19,254,0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-mono px-5 py-2 rounded-full bg-gradient-to-r from-[#bc13fe] to-cyan-400 text-white font-bold shadow-[0_0_15px_rgba(188,19,254,0.35)] transition-all duration-300"
            >
              Hire Me ✦
            </motion.button>
          </nav>

          {/* Mobile Hamburger */}
          <button className={`md:hidden ${navText} transition-colors`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${navBg} backdrop-blur-xl border-t ${borderColor} overflow-hidden`}
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {NAV.map((n) => (
                  <button key={n.id} onClick={() => scrollTo(n.id)}
                    className={`text-sm font-mono ${navText} text-left transition-colors`}>
                    {n.label}
                  </button>
                ))}
                <a href="/cv.pdf" download className="text-sm font-mono text-[#bc13fe]">Resume ↓</a>
                <button onClick={() => scrollTo('contact')} className="text-sm font-mono px-5 py-2.5 rounded-full bg-gradient-to-r from-[#bc13fe] to-cyan-400 text-white font-bold text-center">
                  Hire Me ✦
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full py-20">
          {/* Text */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, type: 'spring', bounce: 0.3 }}>
            <motion.p
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="font-mono text-sm text-cyan-400 tracking-[0.3em] mb-4 uppercase"
            >
              Flutter Engineer
            </motion.p>
            <h1 className={`text-5xl md:text-7xl font-black leading-tight mb-6 ${headingColor}`}>
              Abdulrahman<br />
              <span className="bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent">Mahmoud</span>
            </h1>
            <div className="h-10 mb-6">
              <span className="text-xl md:text-2xl font-mono text-cyan-400">
                {typed}<span className="animate-pulse">|</span>
              </span>
            </div>
            <p className={`${subColor} text-lg leading-relaxed max-w-lg mb-10`}>
              Building production-grade Flutter apps with Clean Architecture, real-world APIs, and pixel-perfect UIs.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(188,19,254,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('projects')}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#bc13fe] to-cyan-400 text-white font-bold text-sm shadow-[0_0_20px_rgba(188,19,254,0.3)] transition-all duration-300"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo('contact')}
                className={`px-8 py-3.5 rounded-full border ${darkMode ? 'border-white/20 text-white/80 hover:border-cyan-400 hover:text-cyan-400' : 'border-gray-300 text-gray-700 hover:border-cyan-400 hover:text-cyan-400'} font-bold text-sm transition-all duration-300`}
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>

          {/* Profile Image — Interactive 3D tilt + click ripple */}
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2, type: 'spring', bounce: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <InteractiveProfile darkMode={darkMode} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-xs font-mono ${sectionLabel} tracking-widest`}>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#bc13fe] to-transparent" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <p className={`font-mono text-xs tracking-[0.4em] ${sectionLabel} uppercase mb-3`}>01 / About</p>
            <h2 className={`text-4xl md:text-5xl font-black ${headingColor}`}>
              Who I <span className="bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent">Am</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Bio card */}
            <BentoCell className="lg:col-span-2" borderAccent="purple" animType="slide-left" delay={0} darkMode={darkMode}>
              <p className={`font-mono text-xs tracking-widest text-[#bc13fe] mb-4 uppercase`}>Bio</p>
              <p className={`${subColor} text-base leading-relaxed mb-4`}>
                I'm a Flutter engineer passionate about building scalable, production-ready mobile applications. I specialize in Clean Architecture, state management, and real-world API integrations.
              </p>
              <p className={`${subColor} text-base leading-relaxed`}>
                Currently interning at HumaVolve, contributing to live Flutter features. Active in the GDG Benha community and a competitive programmer with 350+ problems solved on Codeforces.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {['Flutter', 'Dart', 'Firebase', 'Supabase', 'Clean Arch', 'REST API'].map(tag => (
                  <span key={tag} className={`text-xs font-mono px-3 py-1 rounded-full border ${darkMode ? 'border-[#bc13fe]/30 text-[#bc13fe]/80 bg-[#bc13fe]/5' : 'border-[#bc13fe]/40 text-[#bc13fe] bg-[#bc13fe]/10'}`}>{tag}</span>
                ))}
              </div>
            </BentoCell>

            {/* GDG Card */}
            <BentoCell borderAccent="cyan" animType="slide-right" delay={0.1} darkMode={darkMode} className="overflow-hidden">
              <div className="relative h-48 -mx-8 -mt-8 md:-mx-10 md:-mt-10 mb-6 overflow-hidden rounded-t-3xl">
                <img src={gdg1Img} alt="GDG Benha" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-mono text-cyan-400 tracking-widest">GDG BENHA</span>
                </div>
              </div>
              <p className={`font-mono text-xs tracking-widest text-cyan-400 mb-2 uppercase`}>Community</p>
              <h3 className={`${headingColor} font-bold text-lg mb-2`}>Core Tech Member</h3>
              <p className={`${subColor} text-sm leading-relaxed`}>Mentoring developers and organizing technical sessions at GDG Benha since 2025.</p>
            </BentoCell>

            {/* Timeline */}
            <BentoCell className="lg:col-span-2" borderAccent="cyan" animType="fade-up" delay={0.15} darkMode={darkMode}>
              <p className={`font-mono text-xs tracking-widest text-cyan-400 mb-6 uppercase`}>Journey</p>
              <div>
                {TIMELINE.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} total={TIMELINE.length} darkMode={darkMode} />
                ))}
              </div>
            </BentoCell>

            {/* HumaVolve Card */}
            <BentoCell borderAccent="purple" animType="scale-up" delay={0.2} darkMode={darkMode} className="overflow-hidden">
              <div className="relative h-40 -mx-8 -mt-8 md:-mx-10 md:-mt-10 mb-6 overflow-hidden rounded-t-3xl">
                <img src={humavolveImg} alt="HumaVolve" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-xs font-mono text-[#bc13fe] tracking-widest">HUMAVOLVE</span>
                </div>
              </div>
              <p className={`font-mono text-xs tracking-widest text-[#bc13fe] mb-2 uppercase`}>Internship</p>
              <h3 className={`${headingColor} font-bold text-lg mb-2`}>Software Engineering Intern</h3>
              <p className={`${subColor} text-sm leading-relaxed`}>Building scalable Flutter features in production using Clean Architecture and real-world workflows.</p>
            </BentoCell>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <p className={`font-mono text-xs tracking-[0.4em] ${sectionLabel} uppercase mb-3`}>02 / Skills</p>
            <h2 className={`text-4xl md:text-5xl font-black ${headingColor}`}>
              Tech <span className="bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent">Stack</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {skillCategories.map((cat, ci) => {
              const catSkills = SKILLS.filter(s => s.cat === cat);
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: ci * 0.1 }}
                  className={`rounded-3xl ${cardBg} backdrop-blur-xl p-8 border ${borderColor} shadow-xl`}
                >
                  <p className="font-mono text-xs tracking-widest text-[#bc13fe] mb-6 uppercase">{cat}</p>
                  <div className="flex flex-col gap-5">
                    {catSkills.map((skill, si) => (
                      <SkillBar key={skill.name} skill={skill} delay={si} darkMode={darkMode} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tag cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className={`rounded-3xl ${cardBg} backdrop-blur-xl p-8 border ${borderColor} shadow-xl`}
          >
            <p className={`font-mono text-xs tracking-widest ${subColor} mb-6 uppercase`}>Also familiar with</p>
            <div className="flex flex-wrap gap-3">
              {['GetX', 'BLoC', 'Provider', 'Riverpod', 'Hive', 'SQLite', 'Push Notifications', 'Google Maps', 'Animations', 'CI/CD', 'Figma', 'Agile/Scrum', 'Unit Testing', 'OOP', 'Data Structures', 'Algorithms'].map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.08, borderColor: '#bc13fe', color: '#bc13fe' }}
                  className={`text-xs font-mono px-4 py-2 rounded-full border ${darkMode ? 'border-white/10 text-white/40' : 'border-gray-200 text-gray-500'} cursor-default transition-all duration-200`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <p className={`font-mono text-xs tracking-[0.4em] ${sectionLabel} uppercase mb-3`}>03 / Projects</p>
            <h2 className={`text-4xl md:text-5xl font-black ${headingColor}`}>
              Featured <span className="bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent">Work</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      <section id="certificates" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <p className={`font-mono text-xs tracking-[0.4em] ${sectionLabel} uppercase mb-3`}>04 / Certificates</p>
            <h2 className={`text-4xl md:text-5xl font-black ${headingColor}`}>
              Credentials &amp; <span className="bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent">Awards</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { img: depiCert, title: 'DEPI Certificate', org: 'Digital Egypt Pioneers Initiative', year: '2024', accent: 'purple' },
              { img: coreCert, title: 'GDG Core Team', org: 'GDG Benha', year: '2025', accent: 'cyan' },
            ].map(({ img, title, org, year, accent }, i) => {
              const isCyan = accent === 'cyan';
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15, type: 'spring', bounce: 0.25 }}
                  className={`group rounded-3xl ${cardBg} backdrop-blur-xl border ${isCyan ? 'border-cyan-400/20 hover:border-cyan-400/50' : 'border-[#bc13fe]/20 hover:border-[#bc13fe]/50'} overflow-hidden shadow-2xl transition-all duration-500`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center ${isCyan ? 'bg-cyan-400/20 border border-cyan-400/40' : 'bg-[#bc13fe]/20 border border-[#bc13fe]/40'}`}>
                      <Award className={`w-5 h-5 ${isCyan ? 'text-cyan-400' : 'text-[#bc13fe]'}`} />
                    </div>
                  </div>
                  <div className="p-8">
                    <span className={`text-xs font-mono tracking-widest ${isCyan ? 'text-cyan-400' : 'text-[#bc13fe]'} uppercase`}>{year}</span>
                    <h3 className={`${headingColor} font-bold text-xl mt-1 mb-1`}>{title}</h3>
                    <p className={`${subColor} text-sm font-mono`}>{org}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
            <p className={`font-mono text-xs tracking-[0.4em] ${sectionLabel} uppercase mb-3`}>05 / Contact</p>
            <h2 className={`text-4xl md:text-5xl font-black ${headingColor}`}>
              Let&apos;s <span className="bg-gradient-to-r from-[#bc13fe] to-cyan-400 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className={`${subColor} mt-4 text-lg`}>Open to opportunities, collaborations, and interesting conversations.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <Mail className="w-6 h-6" />, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, accent: 'purple' },
              { icon: <Phone className="w-6 h-6" />, label: 'Phone', value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneTel}`, accent: 'cyan' },
              { icon: <GithubIcon className="w-6 h-6" />, label: 'GitHub', value: 'apdo2005', href: CONTACT.github, accent: 'cyan' },
              { icon: <LinkedinIcon className="w-6 h-6" />, label: 'LinkedIn', value: 'apdelraman-mahmoud', href: CONTACT.linkedin, accent: 'purple' },
            ].map(({ icon, label, value, href, accent }, i) => {
              const isCyan = accent === 'cyan';
              return (
                <motion.a
                  key={label}
                  href={href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`group flex items-center gap-5 p-6 rounded-2xl ${cardBg} backdrop-blur-xl border ${isCyan ? 'border-cyan-400/20 hover:border-cyan-400/50' : 'border-[#bc13fe]/20 hover:border-[#bc13fe]/50'} shadow-xl transition-all duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCyan ? 'bg-cyan-400/10 text-cyan-400 group-hover:bg-cyan-400/20' : 'bg-[#bc13fe]/10 text-[#bc13fe] group-hover:bg-[#bc13fe]/20'} transition-colors duration-300`}>
                    {icon}
                  </div>
                  <div>
                    <p className={`text-xs font-mono ${subColor} uppercase tracking-widest mb-0.5`}>{label}</p>
                    <p className={`${headingColor} font-medium text-sm`}>{value}</p>
                  </div>
                  <ExternalLink className={`w-4 h-4 ${subColor} ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`relative z-10 border-t ${borderColor} py-10`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`font-mono text-sm ${subColor}`}>
            © {new Date().getFullYear()} Abdulrahman Mahmoud — Built with React &amp; Framer Motion
          </p>
          <div className="flex items-center gap-6">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer"
              className={`${subColor} hover:text-cyan-400 transition-colors duration-200`}>
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer"
              className={`${subColor} hover:text-[#bc13fe] transition-colors duration-200`}>
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href={`mailto:${CONTACT.email}`}
              className={`${subColor} hover:text-cyan-400 transition-colors duration-200`}>
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* ── Floating Socials & Back To Top ── */}
      <FloatingSocials />
      <BackToTop />
    </div>
  );
}
