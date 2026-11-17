import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { profile } from '../data';
import { scrollToId } from './scroll';
import { Magnetic, RevealText, ArrowUpRight } from './ui';
import { ease } from './ease';
import Portrait from './Portrait';

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  // mouse-follow glow (desktop)
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const gx = useSpring(mx, { stiffness: 40, damping: 20 });
  const gy = useSpring(my, { stiffness: 40, damping: 20 });
  const glowLeft = useTransform(gx, (v) => `${v}%`);
  const glowTop = useTransform(gy, (v) => `${v}%`);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, ease, delay },
  });

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative min-h-[100svh] overflow-hidden">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob absolute -left-[10%] top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-accent/[0.07] blur-[100px]" />
        <div className="blob absolute -right-[15%] bottom-[-10%] h-[40vmax] w-[40vmax] rounded-full bg-[#5b5bff]/[0.08] blur-[110px]" style={{ animationDelay: '-6s' }} />
        <motion.div
          className="absolute hidden h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[90px] md:block"
          style={{ left: glowLeft, top: glowTop }}
        />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-between px-4 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:text-xs">
          <motion.span {...fade(0.2)}>Flutter Developer — {profile.location}</motion.span>
          <motion.span {...fade(0.3)} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-fg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work
          </motion.span>
        </div>

        <div className="flex flex-col gap-8 py-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-10">
          <h1 className="display-hero order-2 font-medium uppercase lg:order-1 lg:col-span-8">
            <RevealText text="Abdelrahman" start={ready} delay={0.1} className="block" />
            <RevealText text="Mahmoud" start={ready} delay={0.25} className="block font-serif normal-case italic font-normal tracking-[-0.02em] text-accent" />
            <motion.span
              {...fade(0.9)}
              className="mt-6 hidden max-w-sm text-base normal-case leading-relaxed tracking-normal text-muted lg:block"
            >
              Crafting fast, beautiful cross-platform apps with Flutter &amp; Clean Architecture.
            </motion.span>
          </h1>
          <Portrait
            ready={ready}
            className="order-1 w-[68%] max-w-[300px] self-center sm:max-w-[340px] lg:order-2 lg:col-span-4 lg:w-full lg:max-w-[420px] lg:justify-self-end"
          />
        </div>

        <div className="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:items-end">
          <motion.p {...fade(0.7)} className="max-w-md text-base leading-relaxed text-muted md:col-span-6 sm:text-lg">
            I turn ideas into <span className="text-fg">polished, high-performance mobile products</span> — from first sketch to the App Store.
          </motion.p>
          <motion.div {...fade(0.85)} className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end">
            <Magnetic>
              <button
                onClick={() => scrollToId('work')}
                className="group flex items-center gap-3 rounded-full bg-fg py-3 pl-6 pr-3 text-sm font-medium text-bg"
              >
                View my work
                <span className="grid h-8 w-8 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <a href={profile.cv} download className="block rounded-full border border-line px-6 py-3.5 text-sm transition-colors hover:border-fg">
                Download CV
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId('about')}
        {...fade(1.1)}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:flex"
        aria-label="Scroll down"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-fg"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.button>
    </section>
  );
}
