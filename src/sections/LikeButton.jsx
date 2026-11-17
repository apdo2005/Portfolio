import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { toggleLike, useLikes } from '../lib/likes';
import { ease } from './ease';

const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));

function Heart({ filled, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 2.9 1.4-1.8 3-2.9 5-2.9 3.4 0 5.5 3.3 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small radial burst of particles when a like lands. */
function Burst({ id }) {
  const parts = Array.from({ length: 10 });
  return (
    <span key={id} aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
      <motion.span
        className="absolute h-full w-full rounded-full border-2 border-accent"
        initial={{ scale: 0.4, opacity: 0.9 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {parts.map((_, i) => {
        const a = (i / parts.length) * Math.PI * 2;
        const d = 30 + (i % 2) * 10;
        return (
          <motion.span
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? 'h-1.5 w-1.5 bg-fg' : 'h-2 w-2 bg-accent'}`}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.3, 1] }}
          />
        );
      })}
    </span>
  );
}

/** Odometer-style count that rolls up on like and down on unlike. */
function RollingCount({ value, dir, className = '' }) {
  return (
    <span className={`relative inline-flex overflow-hidden tabular-nums ${className}`}>
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.span
          key={value}
          custom={dir}
          variants={{
            enter: (d) => ({ y: d > 0 ? '100%' : '-100%', opacity: 0 }),
            center: { y: '0%', opacity: 1 },
            exit: (d) => ({ y: d > 0 ? '-100%' : '100%', opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease }}
          className="inline-block"
        >
          {fmt(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function useLikeAction() {
  const { count, liked } = useLikes();
  const [burst, setBurst] = useState(0);
  const [dir, setDir] = useState(1);
  const [toast, setToast] = useState(false);
  const onClick = () => {
    const willLike = !liked;
    setDir(willLike ? 1 : -1);
    if (willLike) {
      setBurst((b) => b + 1);
      setToast(true);
      setTimeout(() => setToast(false), 2200);
      navigator.vibrate?.(12);
    }
    toggleLike();
  };
  return { count, liked, burst, dir, toast, onClick };
}

/** Floating pill, bottom-right, visible after the hero. */
export function FloatingLike() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => {
    const nearEnd = v + window.innerHeight > document.documentElement.scrollHeight - 900;
    setShow(v > window.innerHeight * 0.8 && !nearEnd);
  });
  const { count, liked, burst, dir, toast, onClick } = useLikeAction();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 sm:right-6"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.5, ease }}
        >
          <AnimatePresence>
            {toast && (
              <motion.span
                className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-black shadow-lg"
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4 }}
              >
                Thanks for the love ✦
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={onClick}
            aria-pressed={liked}
            aria-label={liked ? 'Remove like' : 'Like this portfolio'}
            className={`group flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors duration-300 ${
              liked ? 'border-accent/40 bg-[#1a1d10]/90' : 'border-line bg-surface/85 hover:border-white/20'
            }`}
          >
            <span className={`relative grid h-9 w-9 place-items-center rounded-full transition-colors duration-300 ${liked ? 'bg-accent text-black' : 'bg-white/5 text-fg group-hover:text-accent'}`}>
              <motion.span key={`h-${burst}`} initial={{ scale: liked ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
                <Heart filled={liked} className="h-[18px] w-[18px]" />
              </motion.span>
              {burst > 0 && liked && <Burst key={burst} id={burst} />}
            </span>
            {count !== null && <RollingCount value={count} dir={dir} className="text-sm font-medium" />}
            <span className="hidden text-sm text-muted sm:inline">{liked ? 'Liked' : 'Appreciate'}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Large inline version for the contact section. */
export function InlineLike() {
  const { count, liked, burst, dir, onClick } = useLikeAction();
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-line bg-bg/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Enjoyed the experience?</p>
        <p className="mt-2 text-xl font-medium sm:text-2xl">
          {count !== null && count > 0 ? (
            <>
              <RollingCount value={count} dir={dir} className="text-accent" /> {count === 1 ? 'person has' : 'people have'} appreciated this portfolio
            </>
          ) : (
            <>Be the first to appreciate this portfolio</>
          )}
        </p>
      </div>
      <button
        onClick={onClick}
        aria-pressed={liked}
        className={`group relative flex items-center justify-center gap-3 self-start rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300 sm:self-auto ${
          liked ? 'bg-accent text-black' : 'border border-line text-fg hover:border-accent hover:text-accent'
        }`}
      >
        <span className="relative grid h-5 w-5 place-items-center">
          <motion.span key={`i-${burst}`} initial={{ scale: liked ? 0.3 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 12 }}>
            <Heart filled={liked} className="h-5 w-5" />
          </motion.span>
          {burst > 0 && liked && <Burst key={burst} id={burst} />}
        </span>
        {liked ? 'Appreciated — thank you!' : 'Appreciate'}
      </button>
    </div>
  );
}
