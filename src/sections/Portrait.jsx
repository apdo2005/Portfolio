import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import portrait from '../assets/portrait.webp';
import { profile } from '../data';
import { ease } from './ease';

const ringText = 'FLUTTER DEVELOPER • CLEAN CODE • ';

function RotatingBadge({ className = '' }) {
  return (
    <div className={`grid place-items-center rounded-full bg-bg/80 backdrop-blur-md border border-line ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]" aria-hidden>
        <defs>
          <path id="ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-fg font-mono text-[8.5px] uppercase">
          <textPath href="#ring" textLength="236" lengthAdjust="spacing">{ringText}</textPath>
        </text>
      </svg>
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-accent text-black">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
    </div>
  );
}

export default function Portrait({ ready, className = '' }) {
  // subtle 3D tilt that follows the cursor (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.14), transparent 55%)`);

  const onMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className={`relative [perspective:1200px] ${className}`}>
      {/* lime halo behind the card */}
      <motion.div
        aria-hidden
        className="absolute -inset-6 rounded-[40px] bg-accent/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 0.6 } : {}}
        transition={{ duration: 1.6, delay: 0.8 }}
      />

      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative"
        data-cursor="Hi!"
      >
        <motion.div
          className="relative aspect-[5/6] overflow-hidden rounded-[28px] border border-white/10 bg-surface"
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
          animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 28px)' } : {}}
          transition={{ duration: 1.3, ease, delay: 0.35 }}
        >
          <motion.img
            src={portrait}
            alt={`${profile.name} — portrait`}
            width="900"
            height="1080"
            fetchPriority="high"
            decoding="async"
            initial={{ scale: 1.35 }}
            animate={ready ? { scale: 1 } : {}}
            transition={{ duration: 1.8, ease, delay: 0.35 }}
            className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.85] contrast-[1.08] brightness-90 transition-[filter] duration-700 group-hover:grayscale-0 group-hover:brightness-100"
          />
          {/* tone the studio blue into the dark theme */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/95" />
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(11,11,12,0.55))]" />
          <motion.div aria-hidden className="absolute inset-0 hidden md:block mix-blend-overlay" style={{ background: glare }} />

          {/* corner meta */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Open to work
          </div>
          <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">©2026</span>

          {/* name plate */}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3" style={{ transform: 'translateZ(40px)' }}>
            <div>
              <p className="text-lg font-medium leading-tight sm:text-xl">{profile.name}</p>
              <p className="font-serif text-base italic text-accent sm:text-lg">{profile.role}</p>
            </div>
            <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 xl:inline">{profile.location}</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute -left-10 bottom-24 hidden lg:block"
          style={{ transform: 'translateZ(70px)' }}
          initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, ease, delay: 1.1 }}
        >
          <RotatingBadge className="relative h-28 w-28" />
        </motion.div>
      </motion.div>
    </div>
  );
}
