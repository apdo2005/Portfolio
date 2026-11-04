import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only mount on devices with a mouse/precision pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = !!target.closest('a, button, input, [role="button"], .clickable');
      setIsHovered(isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          willChange: 'transform',
        }}
        className="-ml-1 -mt-1 w-2 h-2 rounded-full bg-[#d4ff00] shadow-[0_0_8px_#d4ff00] transition-opacity duration-150"
      />

      {/* Fluid Outer Ring */}
      <div
        ref={ringRef}
        style={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99998,
          willChange: 'transform',
        }}
        className={`-ml-4 -mt-4 rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border-[#ff2a2a] bg-[#ff2a2a]/10 shadow-[0_0_20px_rgba(255,42,42,0.4)] scale-110'
            : 'w-8 h-8 border-[#d4ff00]/50 shadow-[0_0_10px_rgba(212,255,0,0.2)]'
        }`}
      />
    </>
  );
}

