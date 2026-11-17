import { motion } from 'framer-motion';
import { sections } from '../data';
import { originFrom, warpTo } from './warp';
import { Magnetic } from './ui';
import { ease } from './ease';

/** Small "next section" control placed at the end of a section. */
export default function NextSection({ from, className = '' }) {
  const i = sections.findIndex((s) => s.id === from);
  const next = sections[i + 1];
  if (!next) return null;
  const go = (e) => warpTo(next.id, originFrom(e));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.8, ease }}
      className={`relative mx-auto max-w-[1400px] px-4 sm:px-8 ${className}`}
    >
      <button
        onClick={go}
        className="group relative flex w-full items-center justify-between gap-6 border-t border-line pt-6 text-left"
        aria-label={`Go to next section: ${next.label}`}
      >
        {/* top line fills on hover */}
        <span aria-hidden className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />

        <span className="min-w-0">
          <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span className="text-accent">({String(i + 1).padStart(2, '0')})</span>
            Next section
          </span>
          {/* text roll on hover */}
          <span className="relative mt-2 block h-[1.15em] overflow-hidden text-2xl font-medium tracking-tight sm:text-4xl">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
              {next.label}
            </span>
            <span className="absolute left-0 top-full block font-serif italic font-normal text-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
              {next.label}
            </span>
          </span>
        </span>

        <Magnetic strength={0.4}>
          <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-line transition-colors duration-500 group-hover:border-accent sm:h-16 sm:w-16">
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
            <span className="relative h-5 w-5 overflow-hidden text-fg transition-colors duration-500 group-hover:text-black">
              <svg viewBox="0 0 24 24" className="absolute inset-0 h-5 w-5 transition-transform duration-500 group-hover:translate-y-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
              <svg viewBox="0 0 24 24" className="absolute inset-0 h-5 w-5 -translate-y-full transition-transform duration-500 group-hover:translate-y-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
          </span>
        </Magnetic>
      </button>
    </motion.div>
  );
}
