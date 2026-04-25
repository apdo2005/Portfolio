import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence
} from 'framer-motion';
import {
  Code2,
  Globe,
  Mail,
  Phone,
  Sparkles,
  Trophy,
  Award,
} from 'lucide-react';

import profileImg from './assets/apdo2.jpeg';
import gdg1Img from './assets/gdg1.jpeg';
import smartBonusImg from './assets/smar_bouns.png';
import depiCert from './assets/Depi.png';
import coreCert from './assets/Core.png';
import humavolveImg from './assets/huma_volve.jpg';
const magneticSpring = { type: 'spring', stiffness: 280, damping: 28, mass: 0.8 };

const CONTACT = {
  email: 'apdo28011@gmail.com',
  phoneDisplay: '01151684594',
  phoneTel: '+201151684594',
  linkedin: 'https://www.linkedin.com/in/apdelraman-mahmoud-799500306',
};

const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certs', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
];

// ==================== Spark & Continuous Neon Cursor ====================
function SparkCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize handling
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Particle system state
    let particles = [];
    let mouse = { x: -100, y: -100, vx: 0, vy: 0 };
    let lastMouse = { x: -100, y: -100 };

    const handleMouseOver = (e) => {
      const isHoverable = e.target.closest('a') || e.target.closest('button') || window.getComputedStyle(e.target).cursor === 'pointer';
      window.isHoveringElement = !!isHoverable;
    };

    const updateMouse = (clientX, clientY) => {
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.vx = mouse.x - lastMouse.x;
      mouse.vy = mouse.y - lastMouse.y;
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;

      const isHover = window.isHoveringElement;
      const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      // Spawn particles on move continuously
      const spawnCount = isHover ? Math.floor(speed / 2) + 3 : Math.floor(speed / 4) + 1;

      for (let i = 0; i < Math.min(spawnCount, 15); i++) {
        const spreadX = (Math.random() - 0.5) * 15;
        const spreadY = (Math.random() - 0.5) * 15;
        const colorRatio = Math.random();

        particles.push({
          x: mouse.x + spreadX,
          y: mouse.y + spreadY,
          // Blast them backwards/randomly to create tension before they snap back!
          vx: -(mouse.vx * 0.15) + (Math.random() - 0.5) * 18,
          vy: -(mouse.vy * 0.15) + (Math.random() - 0.5) * 18,
          size: Math.random() * (isHover ? 6 : 3.5) + 1.5,
          life: 1, // 1 to 0
          decay: Math.random() * 0.02 + 0.015, // Fade speed
          color: colorRatio > 0.6 ? '#bc13fe' : (colorRatio > 0.2 ? '#22d3ee' : '#ffffff')
        });
      }
    };

    const handleMouseMove = (e) => updateMouse(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    // Occasional ambient spawn when not moving
    const ambientInterval = setInterval(() => {
      if (particles.length < 25) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          size: Math.random() * 2 + 1,
          life: 1,
          decay: 0.02,
          color: '#22d3ee'
        });
      }
    }, 150);

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        // ⚡ MAGNETIC RUBBER BAND PHYSICS ⚡
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;

        // Elasticity force pulling particles violently back to the mouse
        p.vx += dx * 0.08;
        p.vy += dy * 0.08;

        // Premium heavily damped friction so they snap perfectly without endless orbiting
        p.vx *= 0.70;
        p.vy *= 0.70;

        p.x += p.vx;
        p.y += p.vy;

        p.life -= p.decay;

        // Visual size scales down
        const currentSize = Math.max(0, p.size * p.life);

        // Kill particles safely
        if (p.life <= 0 || (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5 && p.life < 0.6)) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Add neon glow
        ctx.shadowBlur = 12 * p.life;
        ctx.shadowColor = p.color;

        // Blend particles to look magical
        ctx.globalAlpha = p.life;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[99998]" />;
}

// ==================== Space Background ====================
function SpaceCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 400 }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        size: Math.random() * 1.5 + 0.5,
      }));
    };

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(s => {
        s.z -= 1.5; // Calm warp speed
        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = Math.random() * canvas.width - centerX;
          s.y = Math.random() * canvas.height - centerY;
        }

        // 3D projection
        const projectX = (s.x * (canvas.width / s.z)) + centerX;
        const projectY = (s.y * (canvas.width / s.z)) + centerY;
        const size = s.size * (canvas.width / s.z) * 0.005 * canvas.width;

        if (projectX >= 0 && projectX <= canvas.width && projectY >= 0 && projectY <= canvas.height) {
          // Fade based on depth
          ctx.fillStyle = `rgba(255,255,255,${1 - s.z / canvas.width})`;
          ctx.beginPath();
          ctx.arc(projectX, projectY, Math.max(0.2, size), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize(); animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
}

// ==================== Bento Cell ====================
function BentoCell({ children, className = '', borderAccent = 'purple', animType = 'fade-up', delay = 0 }) {
  const borderClass = borderAccent === 'cyan'
    ? 'border-cyan-400/40 hover:border-cyan-300'
    : 'border-[#bc13fe]/35 hover:border-[#bc13fe]/90';

  const variants = {
    'fade-up': { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 } },
    'slide-left': { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } },
    'slide-right': { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } },
    'scale-up': { initial: { opacity: 0, scale: 0.8 }, whileInView: { opacity: 1, scale: 1 } },
    'flip': { initial: { opacity: 0, rotateX: -90 }, whileInView: { opacity: 1, rotateX: 0 } },
  };

  const anim = variants[animType] || variants['fade-up'];

  return (
    <motion.div
      initial={anim.initial}
      whileInView={anim.whileInView}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, type: "spring", bounce: 0.3 }}
      className={`relative rounded-3xl bg-black/70 backdrop-blur-xl p-8 md:p-12 border-2 ${borderClass} shadow-2xl overflow-hidden ${className} group`}
    >
      {/* Subtle hover gradient inside the bento cell */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${borderAccent === 'cyan' ? 'from-cyan-400' : 'from-[#bc13fe]'} to-transparent`} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// ==================== Project Card ====================
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2, type: 'spring', bounce: 0.4 }}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -15 }}
        className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-black/60 backdrop-blur-2xl border border-white/5 hover:border-cyan-400/30 transition-all duration-500 h-full w-full shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#bc13fe]/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2.5rem]">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover origin-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ transform: "translateZ(30px)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />

          {/* Project Number */}
          <div className="absolute top-6 right-8 font-mono text-xl font-bold text-white/30 group-hover:text-cyan-400/80 transition-colors duration-500" style={{ transform: "translateZ(50px)" }}>
            0{index + 1}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10 flex-1 flex flex-col relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#bc13fe] group-hover:to-cyan-400 transition-all duration-300">
              {project.title}
            </h3>
            <Code2 className="h-8 w-8 text-white/20 group-hover:text-cyan-400 transition-colors duration-500 shrink-0" />
          </div>
          <p className="text-white/60 text-base leading-relaxed flex-1 font-light tracking-wide">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs font-mono font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5 group-hover:border-[#bc13fe]/40 group-hover:shadow-[0_0_15px_rgba(188,19,254,0.3)] group-hover:text-[#bc13fe] text-white/70 transition-all duration-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -45% 0px' }
    );
    NAV.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 85, behavior: 'smooth' });
    }
  };

  const projects = [
    { title: 'LabLink', desc: 'Patient-lab digital platform with multi-role workflows and secure scheduling.', tech: ['Flutter', 'Firebase', 'Clean Arch'], githubUrl: 'https://github.com/Habiba04/LabLink', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900' },
    { title: 'Smart Bonus', desc: 'B2B pharmacy-supplier bridge with Supabase sync and offline-first support.', tech: ['Flutter', 'Supabase', 'Dio'], githubUrl: 'https://github.com/apdo2005/Smart_Bonus', image: smartBonusImg },
    { title: 'Spider-Man App', desc: 'Showcase app using Dio for REST API integration with kinetic UI.', tech: ['Flutter', 'Dio', 'REST API'], githubUrl: 'https://github.com/apdo2005/Spider-Man-app', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=900' },
    { title: 'Grocery E-commerce', desc: 'High-performance retail storefront tuned for real-world traffic.', tech: ['Flutter', 'Performance', 'UX'], githubUrl: 'https://github.com/Elfouly282/grocery2', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative font-sans selection:bg-[#bc13fe]/30 selection:text-white">
      <SpaceCanvas />
      <SparkCursor />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl px-6 py-5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="font-bold text-3xl tracking-wider text-[#bc13fe] hover:text-cyan-400 transition-colors">AM.</button>
          <nav className="flex gap-2 md:gap-6">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-5 py-2 text-xs md:text-sm font-mono uppercase tracking-widest rounded-full transition-all ${activeSection === item.id ? 'bg-[#bc13fe]/20 text-cyan-300 border border-[#bc13fe]/30 shadow-[0_0_15px_rgba(188,19,254,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section id="home" className="min-h-[100dvh] flex items-center px-6 md:px-8">
          <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="order-2 md:order-1 text-center md:text-left space-y-8"
            >
              <div className="inline-flex items-center gap-3 text-cyan-300 font-mono text-xs md:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                Available for work — focused on real-world mobile systems
              </div>

              <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mt-6">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bc13fe] to-cyan-400">Performant</span><br />
                Mobile Systems.
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-lg mx-auto md:mx-0 leading-relaxed font-light mt-6">
                Software Engineer focused on Flutter and Clean Architecture. I translate complex product requirements into resilient code—backed by an analytical foundation of 350+ algorithms solved on Codeforces.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
                <a onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                  Let's Talk
                </a>
                <a onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer px-8 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">
                  See Code
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer px-6 py-3 rounded-lg text-white/60 hover:text-white font-medium transition-colors flex items-center gap-2"
                >
                  Get Resume
                </a>
              </div>

              {/* Trust Signals */}
              <div className="flex gap-8 justify-center md:justify-start pt-10 mt-2 relative">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">10+</span>
                  <span className="text-xs text-white/50 mt-1 uppercase tracking-wider font-mono">Projects Built</span>
                </div>
                <div className="w-px bg-white/10 hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-cyan-400">350+</span>
                  <span className="text-xs text-white/50 mt-1 uppercase tracking-wider font-mono">Problems Solved</span>
                </div>
                <div className="w-px bg-white/10 hidden md:block"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-[#bc13fe]">Focus</span>
                  <span className="text-xs text-white/50 mt-1 uppercase tracking-wider font-mono">Clean Architecture</span>
                </div>
              </div>
            </motion.div>

            {/* Profile Image with RGB Pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.5, delay: 0.2 }}
              className="order-1 md:order-2 flex justify-center perspective-[1000px]"
            >
              <div className="relative">
                {/* RGB Breathing Background */}
                <motion.div
                  className="absolute -inset-10 rounded-full bg-gradient-to-br from-[#bc13fe] via-cyan-400 to-[#bc13fe] opacity-40 blur-[50px]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 15, rotateX: -10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                  <img src={profileImg} alt="Abdulrahman" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent mix-blend-overlay" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="px-6 py-24 border-t border-white/5 relative">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#bc13fe] opacity-10 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 relative z-10">
            <BentoCell animType="slide-left" className="md:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-cyan-400 opacity-50"></div>
                <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">Engineering Identity</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white leading-snug">
                Mobile Engineer focused on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bc13fe] to-cyan-400">scalable systems</span> and performance.
              </h2>
              <div className="text-white/70 leading-relaxed space-y-5 font-light text-lg max-w-2xl">
                <p>
                  I approach mobile development as a structural engineering discipline rather than just rendering UI. As a CS student, I build robust applications in Flutter and Dart by enforcing strict separation of concerns through Clean Architecture and SOLID principles.
                </p>
                <p>
                  My architectural decisions are rooted in a deep analytical foundation, proven by 350+ algorithmic challenges solved on Codeforces. I don't just assemble plugins; I optimize memory footprints, architect network-resilient flows, and deliver seamless user experiences.
                </p>
              </div>
            </BentoCell>

            <BentoCell animType="slide-right" delay={0.2} className="md:col-span-4 flex flex-col items-center justify-center text-center" borderAccent="cyan">

              {/* IMAGE SECTION */}
              <div className="relative group w-full max-w-[340px] aspect-square mx-auto mb-8">

                {/* Glow Layers */}
                <div className="absolute -inset-8 bg-gradient-to-br from-cyan-400 via-[#bc13fe] to-cyan-400 opacity-30 blur-3xl rounded-[3rem] group-hover:opacity-60 transition-all duration-700"></div>

                <div className="absolute -inset-4 bg-cyan-400/20 rounded-[2.5rem] blur-2xl group-hover:scale-110 transition-transform duration-700"></div>

                {/* Image Frame */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_70px_rgba(34,211,238,0.4)] transition-all duration-500">

                  <img
                    src={gdg1Img}
                    alt="GDG Benha Event"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                GDG Benha
              </h3>

              {/* ROLE */}
              <div className="text-cyan-300 text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 opacity-90 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Core Tech Member
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-white/50 leading-relaxed font-light border-t border-white/10 pt-5 w-full">
                Mentoring developers and organizing technical sessions to empower the local engineering community.
              </p>

            </BentoCell>
            <BentoCell
              animType="slide-right"
              delay={0.25}
              className="md:col-span-4 flex flex-col items-center justify-center text-center relative overflow-hidden group"
              borderAccent="purple"
            >

              {/* IMAGE CONTAINER */}
              <div className="relative w-full aspect-[4/5] mb-6 rounded-[2rem] overflow-hidden">

                {/* glow background */}
                <div className="absolute -inset-2 bg-[#bc13fe]/20 blur-2xl opacity-0 group-hover:opacity-60 transition duration-700"></div>

                {/* YOUR IMAGE */}
                <motion.img
                  src={humavolveImg}   // ← حط صورة ليك هنا
                  alt="HumaVolve Internship"
                  className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                  whileHover={{ rotate: 1 }}
                />

                {/* dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* hover text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition duration-500">
                  <p className="text-[#bc13fe] text-sm font-mono tracking-widest uppercase">
                    Software Engineering Intern
                  </p>
                  <p className="text-white text-xl font-bold mt-1">
                    HumaVolve Experience
                  </p>
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                HumaVolve
              </h3>

              {/* BADGE */}
              <div className="text-[#bc13fe] text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 opacity-90 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bc13fe] animate-pulse"></span>
                Internship
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-white/50 leading-relaxed font-light border-t border-white/10 pt-5 w-full">
                Gaining hands-on experience in building scalable mobile systems using Flutter, focusing on clean architecture, performance optimization, and real-world production workflows.
              </p>

            </BentoCell>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="px-6 py-24 bg-black/40 relative">
          <div className="max-w-7xl mx-auto">
            <BentoCell animType="scale-up">
              <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#bc13fe]">SKILLS & ARSENAL</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {['Flutter', 'Dart', 'Clean Architecture', 'SOLID', 'OOP', 'Firebase', 'Supabase', 'REST API', 'Dio', 'Provider', 'Git & GitHub', 'Agile', 'Problem Solving', 'UI/UX'].map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: -2, y: -5 }}
                    className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all font-mono text-lg"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </BentoCell>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="px-6 py-24 relative">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-400 opacity-5 blur-[120px] rounded-full translate-x-1/3 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center"
            >
              FEATURED <span className="text-[#bc13fe]">WORK</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* CERTIFICATES SECTION */}
        <section id="certificates" className="px-6 py-24 border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-16 text-center text-cyan-400 flex items-center justify-center gap-4"
            >
              <Award className="w-12 h-12" /> CERTIFICATIONS
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
              <BentoCell animType="flip" className="p-0 overflow-hidden group shadow-[0_0_30px_rgba(188,19,254,0.1)]">
                <div className="relative">
                  <img src={depiCert} className="w-full transform group-hover:scale-105 transition-transform duration-700" alt="DEPI Certificate" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <span className="text-2xl font-bold text-white">DEPI Certification</span>
                  </div>
                </div>
              </BentoCell>
              <BentoCell animType="flip" delay={0.2} borderAccent="cyan" className="p-0 overflow-hidden group shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <div className="relative">
                  <img src={coreCert} className="w-full transform group-hover:scale-105 transition-transform duration-700" alt="GDG Core Certificate" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <span className="text-2xl font-bold text-cyan-400">GDG Core Member</span>
                  </div>
                </div>
              </BentoCell>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="px-6 py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#bc13fe]/10 via-black/0 to-black/0 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="relative z-10 bg-white/5 p-12 md:p-20 rounded-[3rem] border border-[#bc13fe]/30 inline-block backdrop-blur-xl shadow-[0_0_50px_rgba(188,19,254,0.1)] group hover:border-[#bc13fe]/70 transition-colors duration-500 max-w-4xl w-full"
          >
            <Mail className="w-16 h-16 text-[#bc13fe] mx-auto mb-8 opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
            <h2 className="text-5xl md:text-7xl font-bold mb-8">LET'S CONNECT</h2>
            <p className="text-xl text-white/50 mb-12 max-w-md mx-auto">Open for opportunities and exciting projects. Let's build something extraordinary together.</p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center font-mono flex-wrap">
              <a href={`mailto:${CONTACT.email}`} className="px-5 py-4 rounded-full bg-[#bc13fe]/20 text-[#bc13fe] border border-[#bc13fe]/50 hover:bg-[#bc13fe] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_#bc13fe] flex items-center justify-center gap-3 w-full md:w-auto">
                <Mail className="w-5 h-5" /> EMAIL ME
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="px-5 py-4 rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_cyan] transition-all duration-300 flex items-center justify-center gap-3 w-full md:w-auto">
                <Phone className="w-5 h-5" /> {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-4 rounded-full bg-[#bc13fe]/20 text-[#bc13fe] border border-[#bc13fe]/50 hover:bg-[#bc13fe] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_#bc13fe] flex items-center justify-center gap-3 w-full md:w-auto">
                LINKEDIN
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}