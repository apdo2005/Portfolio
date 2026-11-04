import { useEffect, useState, useCallback } from 'react';
import DimensionCanvas from './components/DimensionCanvas';
import CustomCursor from './components/CustomCursor';
import TelemetryHUD from './components/TelemetryHUD';
import WorldHero from './components/WorldHero';
import WorldIdentity from './components/WorldIdentity';
import WorldTechConstellation from './components/WorldTechConstellation';
import WorldProjects from './components/WorldProjects';
import WorldMindset from './components/WorldMindset';
import WorldVault from './components/WorldVault';
import WorldPortal from './components/WorldPortal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeWorld, setActiveWorld] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);

  // Smooth scroll progress & active world detection
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Detect active world section
      const sectionIds = ['hero', 'identity', 'universe', 'projects', 'mindset', 'vault', 'portal'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveWorld(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWarpTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030508] text-[#f2f5fa] selection:bg-[#ff2a2a]/30 selection:text-white overflow-x-hidden">
      {/* ── 3D WEBGL DIMENSIONAL UNIVERSE ── */}
      <DimensionCanvas
        scrollProgress={scrollProgress}
        activeWorld={activeWorld}
        hoveredTech={hoveredTech}
      />

      {/* ── AMBIENT SCANLINE GRID MATRIX ── */}
      <div className="fixed inset-0 pointer-events-none z-1 scanline-grid opacity-35" />

      {/* ── PRECISION CUSTOM CURSOR (DESKTOP) ── */}
      <CustomCursor />

      {/* ── GLOBAL TELEMETRY HUD ── */}
      <TelemetryHUD activeWorld={activeWorld} onWarpTo={handleWarpTo} />

      {/* ── MAIN DIMENSIONAL SECTIONS ── */}
      <main className="relative z-10 flex flex-col">
        {/* WORLD 00 // HERO ORIGIN */}
        <WorldHero onWarpTo={handleWarpTo} />

        {/* WORLD 01 // IDENTITY MATRIX */}
        <WorldIdentity />

        {/* WORLD 02 // TECH UNIVERSE CONSTELLATION */}
        <WorldTechConstellation
          onHoverTech={setHoveredTech}
        />

        {/* WORLD 03 // PROJECT DIMENSIONS */}
        <WorldProjects />

        {/* WORLD 04 // ENGINEERING MINDSET */}
        <WorldMindset />

        {/* WORLD 05 // THE VAULT & CREDENTIAL ARCHIVE */}
        <WorldVault />

        {/* WORLD 06 // DIMENSIONAL CONTACT PORTAL */}
        <WorldPortal />
      </main>
    </div>
  );
}
