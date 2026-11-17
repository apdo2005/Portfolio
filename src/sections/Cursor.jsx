import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Desktop-only blend-mode cursor. Elements can set data-cursor="View" to show a label. */
export default function Cursor() {
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches);
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const el = e.target.closest?.('[data-cursor], a, button');
      setLabel(el?.dataset?.cursor ?? '');
      setHover(!!el);
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;
  const size = label ? 96 : hover ? 56 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', mixBlendMode: label ? 'normal' : 'difference' }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: label ? '#d4ff3a' : '#ffffff',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      {label && <span className="font-mono text-[11px] uppercase tracking-widest text-black">{label}</span>}
    </motion.div>
  );
}
