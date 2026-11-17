import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { sections } from '../data';
import { originFrom, warpTo } from './warp';
import { ease } from './ease';

/** Fixed side navigator (desktop): shows where you are and jumps anywhere. */
export default function SectionDots() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let idx = 0;
      sections.forEach((s, i) => {
        const el = s.id === 'top' ? document.getElementById('top') : document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.6 }}
    >
      <ul className="flex flex-col items-end gap-3">
        {sections.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.id}>
              <button
                onClick={(e) => (on ? null : warpTo(s.id, originFrom(e)))}
                className="group flex items-center gap-3 py-0.5"
                aria-label={`Go to ${s.label}`}
                aria-current={on ? 'true' : undefined}
              >
                <span
                  className={`whitespace-nowrap rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-md transition-all duration-300 ${
                    on ? 'text-fg' : 'text-muted'
                  } translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100`}
                >
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> {s.label}
                </span>
                <motion.span
                  className="block h-px rounded-full"
                  animate={{ width: on ? 28 : 12, backgroundColor: on ? '#d4ff3a' : 'rgba(237,237,237,0.35)' }}
                  transition={{ duration: 0.4, ease }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
