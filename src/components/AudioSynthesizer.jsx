import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Procedural Web Audio Ambient Synthesizer
 * Generates an ethereal, cinematic, generative space drone with interactive resonance.
 * Zero external audio assets needed. Fully autonomous and lightweight.
 */
export default function AudioSynthesizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const filterNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Atmospheric Resonant Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);
      filter.connect(masterGain);
      filterNodeRef.current = filter;

      // Harmonic Chord Oscillators (D-minor cinematic drone: D1, A1, D2, F2, A2)
      const freqs = [73.42, 110.00, 146.83, 174.61, 220.00];
      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        // Subtle slow LFO detuning for organic breathing motion
        const detuneLFO = ctx.createOscillator();
        const detuneGain = ctx.createGain();
        detuneLFO.frequency.setValueAtTime(0.08 + i * 0.03, ctx.currentTime);
        detuneGain.gain.setValueAtTime(3.5, ctx.currentTime);
        detuneLFO.connect(detuneGain);
        detuneGain.connect(osc.detune);
        detuneLFO.start();

        oscGain.gain.setValueAtTime(0.08 / (i + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();

        return { osc, detuneLFO };
      });

      oscillatorsRef.current = oscs;
    } catch (e) {
      console.warn('Web Audio not available:', e);
    }
  }, []);

  const toggleSound = () => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    const ctx = audioCtxRef.current;
    if (!ctx || !gainNodeRef.current) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      gainNodeRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.5);
      setIsPlaying(false);
    } else {
      gainNodeRef.current.gain.setTargetAtTime(0.18, ctx.currentTime, 0.8);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? "Mute Generative Soundscape" : "Activate Spatial Soundscape"}
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full obsidian-panel border border-[rgba(240,244,248,0.12)] hover:border-[#d4ff00]/60 transition-all duration-300 text-xs font-mono"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4ff00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4ff00]" />
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#94a3b8]" />
        )}
      </span>
      <span className="text-[11px] font-mono tracking-wider text-[#94a3b8] group-hover:text-white transition-colors">
        {isPlaying ? (
          <span className="text-[#d4ff00] flex items-center gap-1.5">
            AUDIO: ACTIVE <Volume2 className="w-3.5 h-3.5" />
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            SOUNDSCAPE <VolumeX className="w-3.5 h-3.5" />
          </span>
        )}
      </span>
    </button>
  );
}

