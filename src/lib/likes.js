// Portfolio like counter — resilient client.
// - Shows the last known count instantly (cached in localStorage).
// - Optimistic: the UI updates immediately on click.
// - If Supabase is down/slow, nothing breaks: the user's choice is kept locally
//   and synced silently on the next successful connection.
import { useSyncExternalStore } from 'react';

const URL = import.meta.env.VITE_SUPABASE_URL || 'https://uzmyppqmbwwupmxdvuij.supabase.co';
// Publishable key — safe to ship in the browser (access is limited to the two RPCs below).
const KEY = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_714ZcVG2fI0_PM1Ln3fT2w_V3r1Wje5';
const CACHE = 'apdo-likes-v1';
const TIMEOUT = 6000;

const read = () => {
  try { return JSON.parse(localStorage.getItem(CACHE)) || {}; } catch { return {}; }
};
const write = (data) => {
  try { localStorage.setItem(CACHE, JSON.stringify(data)); } catch { /* storage blocked */ }
};

const newId = () =>
  globalThis.crypto?.randomUUID?.() ??
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

const cached = read();
const visitor = cached.visitor || newId();

let state = {
  count: typeof cached.count === 'number' ? cached.count : null, // null = never loaded
  liked: !!cached.liked,
  pending: !!cached.pending, // local choice not yet confirmed by the server
  online: false,
};
write({ ...cached, visitor });

const listeners = new Set();
const set = (patch) => {
  state = { ...state, ...patch };
  write({ visitor, count: state.count, liked: state.liked, pending: state.pending });
  listeners.forEach((l) => l());
};

async function rpc(fn) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_visitor: visitor }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    if (typeof data?.count !== 'number') throw new Error('bad payload');
    return data;
  } finally {
    clearTimeout(t);
  }
}

let syncing = false;
async function sync() {
  if (syncing) return;
  syncing = true;
  try {
    let data = await rpc('portfolio_likes_get');
    // replay a like/unlike that happened while offline
    if (state.pending && data.liked !== state.liked) data = await rpc('portfolio_likes_toggle');
    set({ count: data.count, liked: data.liked, pending: false, online: true });
  } catch {
    set({ online: false }); // silent: keep showing the last known count
  } finally {
    syncing = false;
  }
}

let started = false;
function start() {
  if (started || typeof window === 'undefined') return;
  started = true;
  sync();
  window.addEventListener('online', sync);
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && sync());
}

export async function toggleLike() {
  const liked = !state.liked;
  const base = state.count ?? 0;
  set({ liked, count: Math.max(0, base + (liked ? 1 : -1)), pending: true });
  if (syncing) return; // the in-flight request will reconcile via `pending`
  syncing = true;
  let resync = false;
  try {
    const data = await rpc('portfolio_likes_toggle');
    if (data.liked !== state.liked) {
      resync = true; // user clicked again while the request was in flight
    } else {
      set({ count: data.count, liked: data.liked, pending: false, online: true });
    }
  } catch {
    set({ online: false }); // stays optimistic; synced later
  } finally {
    syncing = false;
  }
  if (resync) sync();
}

export function useLikes() {
  start();
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => state,
  );
}
