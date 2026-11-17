import { motion } from 'framer-motion';
import { useWarp } from './warp';

const inOut = [0.76, 0, 0.24, 1];
const DARK = '#111113';
const ACCENT = '#d4ff3a';

/* ───────── Variants: each gets { phase, origin } ───────── */

// 1 — staggered vertical columns, lime edge chasing a dark wall
function Curtain({ phase }) {
  const cols = 5;
  return (
    <div className="absolute inset-0 flex">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="relative h-full flex-1">
          {[ACCENT, DARK].map((bg, layer) => (
            <motion.div
              key={layer}
              className="absolute inset-0"
              style={{ background: bg }}
              initial={{ y: '100%' }}
              animate={{ y: phase === 'cover' ? '0%' : '-100%' }}
              transition={{ duration: 0.55, ease: inOut, delay: i * 0.05 + layer * 0.08 + (phase === 'reveal' ? (1 - layer) * 0.08 : 0) }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 2 — circular portal opening from the click point
function Portal({ phase, origin }) {
  const at = `${origin.x}px ${origin.y}px`;
  return [ACCENT, DARK].map((bg, layer) => (
    <motion.div
      key={layer}
      className="absolute inset-0"
      style={{ background: bg }}
      initial={{ clipPath: `circle(0% at ${at})` }}
      animate={{
        clipPath: phase === 'cover' ? `circle(150% at ${at})` : 'circle(0% at 50% 50%)',
      }}
      transition={{ duration: phase === 'cover' ? 0.7 : 0.75, ease: inOut, delay: phase === 'cover' ? layer * 0.1 : (1 - layer) * 0.1 }}
    />
  ));
}

// 3 — horizontal blinds sweeping in from the left, out to the right
function Blinds({ phase }) {
  const rows = 7;
  return (
    <div className="absolute inset-0 flex flex-col">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="w-full flex-1"
          style={{ background: i % 2 ? DARK : '#16161a', transformOrigin: phase === 'cover' ? 'left' : 'right' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'cover' ? 1 : 0 }}
          transition={{ duration: 0.5, ease: inOut, delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

// 4 — pixel tiles flipping in along a diagonal wave
function Tiles({ phase }) {
  const cols = typeof window !== 'undefined' && window.innerWidth < 640 ? 5 : 10;
  const rows = Math.ceil(cols * (window.innerHeight / window.innerWidth)) + 1;
  const max = cols + rows;
  return (
    <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {Array.from({ length: cols * rows }).map((_, n) => {
        const c = n % cols;
        const r = Math.floor(n / cols);
        const wave = (c + r) / max;
        return (
          <motion.div
            key={n}
            className="-m-px"
            style={{ background: (c + r) % 7 === 0 ? ACCENT : DARK }}
            initial={{ scale: 0, rotate: -90, borderRadius: '50%' }}
            animate={phase === 'cover' ? { scale: 1.02, rotate: 0, borderRadius: '0%' } : { scale: 0, rotate: 90, borderRadius: '50%' }}
            transition={{ duration: 0.4, ease: inOut, delay: wave * 0.4 }}
          />
        );
      })}
    </div>
  );
}

// 5 — skewed blade slicing across the screen
function Slice({ phase }) {
  return [ACCENT, DARK].map((bg, layer) => (
    <motion.div
      key={layer}
      className="absolute -inset-y-10 left-[-30vw] w-[160vw]"
      style={{ background: bg, skewX: -18 }}
      initial={{ x: '110%' }}
      animate={{ x: phase === 'cover' ? '0%' : '-110%' }}
      transition={{ duration: 0.7, ease: inOut, delay: phase === 'cover' ? layer * 0.09 : (1 - layer) * 0.09 }}
    />
  ));
}

// 6 — rounded iris that blooms from the click, then lifts away with a curved edge
function Iris({ phase, origin }) {
  const t = (origin.y / window.innerHeight) * 100;
  const l = (origin.x / window.innerWidth) * 100;
  return (
    <motion.div
      className="absolute inset-0"
      style={{ background: DARK }}
      initial={{ clipPath: `inset(${t}% ${100 - l}% ${100 - t}% ${l}% round 50% 50% 50% 50%)`, y: '0%' }}
      animate={
        phase === 'cover'
          ? { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 0% 0%)', y: '0%' }
          : { clipPath: 'inset(0% 0% 0% 0% round 0% 0% 50% 50%)', y: '-110%' }
      }
      transition={{ duration: 0.75, ease: inOut }}
    >
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: inOut }}
      />
    </motion.div>
  );
}

// 7 — camera shutter: two halves snap shut, then open
function Shutter({ phase }) {
  return ['top', 'bottom'].map((side) => (
    <motion.div
      key={side}
      className={`absolute inset-x-0 h-1/2 ${side === 'top' ? 'top-0 border-b' : 'bottom-0 border-t'} border-accent/60`}
      style={{ background: DARK }}
      initial={{ y: side === 'top' ? '-100%' : '100%' }}
      animate={{ y: phase === 'cover' ? '0%' : side === 'top' ? '-100%' : '100%' }}
      transition={{ duration: 0.65, ease: inOut }}
    />
  ));
}

const VARIANTS = { curtain: Curtain, portal: Portal, blinds: Blinds, tiles: Tiles, slice: Slice, iris: Iris, shutter: Shutter };

/* ───────── Destination title shown while the screen is covered ───────── */
function Title({ phase, index, label }) {
  const show = phase === 'cover';
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
      <div>
        <div className="overflow-hidden">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted"
            initial={{ y: '100%' }}
            animate={{ y: show ? '0%' : '-100%' }}
            transition={{ duration: 0.5, ease: inOut, delay: show ? 0.45 : 0 }}
          >
            ({String(index).padStart(2, '0')}) — Navigating to
          </motion.p>
        </div>
        <div className="mt-3 overflow-hidden pb-2">
          <motion.p
            className="text-[clamp(2.5rem,9vw,8rem)] font-medium leading-none tracking-[-0.04em] text-fg"
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: show ? '0%' : '-110%', rotate: show ? 0 : -4 }}
            transition={{ duration: 0.6, ease: inOut, delay: show ? 0.4 : 0 }}
          >
            {label.split(' ').map((w, i) => (
              <span key={i} className={i % 2 ? 'font-serif italic font-normal text-accent' : ''}>{w} </span>
            ))}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default function WarpOverlay() {
  const { warp, phase } = useWarp();
  if (!warp) return null;
  const V = VARIANTS[warp.variant] ?? Curtain;
  return (
    <div key={warp.key} className="fixed inset-0 z-[95] overflow-hidden" aria-hidden>
      <V phase={phase} origin={warp.origin} />
      <Title phase={phase} index={warp.index} label={warp.label} />
    </div>
  );
}
