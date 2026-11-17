import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { lenisRef } from './sections/scroll';
import Preloader from './sections/Preloader';
import Cursor from './sections/Cursor';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import About from './sections/About';
import Services from './sections/Services';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function seenIntro() {
  try { return sessionStorage.getItem('intro-seen') === '1'; } catch { return false; }
}

export default function App() {
  const [loading, setLoading] = useState(() => !seenIntro() && !reducedMotion());
  const [ready, setReady] = useState(!loading);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Smooth scrolling (desktop wheel; touch keeps native momentum)
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenisRef.current = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);

  useEffect(() => {
    if (loading) { lenisRef.current?.stop(); window.scrollTo(0, 0); }
    else lenisRef.current?.start();
  }, [loading]);

  const finish = useCallback(() => {
    try { sessionStorage.setItem('intro-seen', '1'); } catch { /* storage unavailable */ }
    setLoading(false);
    setTimeout(() => setReady(true), 350);
  }, []);

  return (
    <div className="grain relative">
      <AnimatePresence>{loading && <Preloader onDone={finish} />}</AnimatePresence>

      <motion.div aria-hidden style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent" />
      <Cursor />
      <Navbar ready={ready} />

      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Experience />
        <Certificates />
      </main>
      <Contact />
    </div>
  );
}
