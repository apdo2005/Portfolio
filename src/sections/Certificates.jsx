import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { certificates } from '../data';
import { lenisRef } from './scroll';
import { FadeUp, RevealText, SectionLabel } from './ui';
import { ease } from './ease';

export default function Certificates() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active) lenisRef.current?.stop(); else lenisRef.current?.start();
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <section id="certificates" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-8 sm:pb-36">
      <SectionLabel index="05">Recognition</SectionLabel>
      <h2 className="display-md mt-6 font-medium">
        <RevealText text="Certificates &" className="mr-3" />
        <RevealText text="awards" delay={0.08} className="font-serif italic font-normal text-accent" />
      </h2>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certificates.map((c, i) => (
          <FadeUp key={c.title} delay={i * 0.08}>
            <button
              onClick={() => setActive(c)}
              data-cursor="Open"
              className="group block w-full overflow-hidden rounded-3xl border border-line bg-surface text-left transition-colors hover:border-white/20"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  layoutId={`cert-${c.title}`}
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{c.issuer} · {c.date}</p>
                <p className="mt-2 font-medium leading-snug">{c.title}</p>
              </div>
            </button>
          </FadeUp>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <motion.img
                layoutId={`cert-${active.title}`}
                src={active.img}
                alt={active.title}
                className="max-h-[78svh] w-full rounded-2xl object-contain"
                transition={{ duration: 0.6, ease }}
              />
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{active.title}</p>
                  <p className="text-sm text-muted">{active.issuer} · {active.date}</p>
                </div>
                <button onClick={() => setActive(null)} className="shrink-0 rounded-full border border-line px-5 py-2 text-sm hover:border-fg">
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
