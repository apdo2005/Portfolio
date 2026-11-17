import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { navLinks, profile } from '../data';
import { scrollToId, lenisRef } from './scroll';
import { Magnetic } from './ui';
import { ease } from './ease';

export default function Navbar({ ready }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 200 && !open);
    setScrolled(v > 40);
  });

  useEffect(() => {
    const l = lenisRef.current;
    if (open) l?.stop(); else l?.start();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // let the menu close before scrolling
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: ready && !hidden ? 0 : -100 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-8 transition-[padding] duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
          <button onClick={() => go('top')} className="group flex items-center gap-2 text-base font-semibold tracking-tight" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-fg text-bg text-sm font-bold transition-transform duration-500 group-hover:rotate-[360deg]">A</span>
            <span className="hidden sm:inline">{profile.short}<sup className="text-[10px] text-muted">©</sup></span>
          </button>

          <nav className={`hidden md:flex items-center gap-1 rounded-full border border-line px-2 py-1.5 backdrop-blur-xl transition-colors duration-500 ${scrolled ? 'bg-surface/80' : 'bg-transparent'}`}>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="rounded-full px-4 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-fg">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden md:inline-block">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]">
                Let&apos;s talk
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden relative z-[70] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/80 backdrop-blur-xl"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[45] flex flex-col justify-between bg-[#111113] px-6 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 38px) 38px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div>
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">Navigation</p>
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <li key={l.id} className="overflow-hidden">
                    <motion.button
                      onClick={() => go(l.id)}
                      className="text-5xl font-medium tracking-tight"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.06 }}
                    >
                      {l.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="space-y-3 text-sm text-muted">
              <a href={`mailto:${profile.email}`} className="block text-fg">{profile.email}</a>
              <div className="flex gap-5">
                <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
