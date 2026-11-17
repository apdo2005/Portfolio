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
import { FloatingLike } from './sections/LikeButton';
import NextSection from './sections/NextSection';
import SectionDots from './sections/SectionDots';
import WarpOverlay from './sections/WarpOverlay';

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
        {/* desktop uses the hero's scroll cue; phones get an explicit next link */}
        <NextSection from="top" className="pt-12 md:hidden" />
        <About />
        <NextSection from="about" className="-mt-8 pb-8 sm:-mt-16" />
        <Services />
        <NextSection from="services" className="-mt-4 pb-8 sm:-mt-8" />
        <Work />
        <NextSection from="work" className="pt-16 pb-8 sm:pt-24" />
        <Experience />
        <NextSection from="experience" className="-mt-8 pb-8 sm:-mt-16" />
        <Certificates />
        <NextSection from="certificates" className="-mt-8 pb-20 sm:-mt-16 sm:pb-28" />
      </main>
      <Contact />
      {ready && <FloatingLike />}
      {ready && <SectionDots />}
      <WarpOverlay />
    </div>
  );
}
