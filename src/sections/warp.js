// Section-to-section "warp": plays a full-screen cover animation, jumps to the
// target while the screen is covered, then reveals the new section.
import { useSyncExternalStore } from 'react';
import { sections } from '../data';
import { lenisRef, scrollToId } from './scroll';

export const COVER_MS = 850;  // time for the cover to fully hide the page
export const REVEAL_MS = 900; // time for the cover to leave

let state = { warp: null, phase: 'idle' }; // phase: idle | cover | reveal
const listeners = new Set();
const set = (patch) => { state = { ...state, ...patch }; listeners.forEach((l) => l()); };

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function warpTo(id, origin) {
  if (state.phase !== 'idle') return;
  const index = sections.findIndex((s) => s.id === id);
  const target = id === 'top' ? document.body : document.getElementById(id);
  if (index < 0 || !target) return scrollToId(id);
  if (reduced()) return scrollToId(id);

  const s = sections[index];
  set({
    phase: 'cover',
    warp: {
      id,
      index,
      label: s.label,
      variant: s.transition,
      origin: origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      key: Date.now(),
    },
  });
  lenisRef.current?.stop();

  setTimeout(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.start();
      lenis.scrollTo(id === 'top' ? 0 : target, { immediate: true, force: true });
    } else {
      window.scrollTo(0, id === 'top' ? 0 : target.getBoundingClientRect().top + window.scrollY);
    }
    set({ phase: 'reveal' });
    setTimeout(() => set({ phase: 'idle', warp: null }), REVEAL_MS);
  }, COVER_MS);
}

/** Pass a click event to start the transition from the pointer position. */
export const originFrom = (e) =>
  e && 'clientX' in e && e.clientX ? { x: e.clientX, y: e.clientY } : undefined;

export function useWarp() {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => state,
  );
}
