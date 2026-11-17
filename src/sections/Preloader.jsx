import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ease } from './ease';

const greetings = ['Hello', 'مرحبا', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'APDO'];

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const duration = 1600;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      setWord(Math.min(Math.floor(p * greetings.length), greetings.length - 1));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#111113] p-6 sm:p-10"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="flex justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span>Abdelrahman Mahmoud</span>
        <span className="hidden sm:block">Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center justify-center gap-3">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-4xl sm:text-6xl font-medium tracking-tight"
        >
          {greetings[word]}
        </motion.span>
      </div>

      <div className="flex items-end justify-between">
        <div className="h-px flex-1 mr-6 mb-4 bg-line overflow-hidden">
          <div className="h-full bg-accent origin-left" style={{ transform: `scaleX(${count / 100})` }} />
        </div>
        <span className="font-medium tabular-nums text-6xl sm:text-8xl leading-none tracking-tighter">{count}</span>
      </div>
    </motion.div>
  );
}
