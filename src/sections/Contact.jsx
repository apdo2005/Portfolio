import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data';
import portrait from '../assets/portrait.webp';
import { scrollToId } from './scroll';
import { ArrowUpRight, FadeUp, Magnetic, RevealText } from './ui';

function CairoClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return <span>{time} Cairo (GMT+2)</span>;
}

const socials = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'WhatsApp', href: profile.whatsapp },
  { label: 'Resume', href: profile.cv },
];

export default function Contact() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-10%', '0%']);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden rounded-t-[40px] bg-[#111113] pt-24 sm:pt-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-accent ring-offset-4 ring-offset-[#111113] sm:h-20 sm:w-20">
            <img src={portrait} alt={profile.name} loading="lazy" decoding="async" className="h-full w-full scale-125 object-cover object-[50%_18%] grayscale-[0.6]" />
          </span>
          <FadeUp y={16} className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Have a project in mind?</FadeUp>
        </div>

        <h2 className="display-xl mt-8 font-medium">
          <RevealText text="Let's work" className="block" />
          <RevealText text="together" delay={0.12} className="block font-serif italic font-normal text-accent" />
        </h2>

        <div className="relative mt-14 border-t border-line">
          <div className="absolute right-0 top-0 -translate-y-1/2 sm:right-12">
            <Magnetic strength={0.5}>
              <a
                href={`mailto:${profile.email}`}
                className="grid h-32 w-32 place-items-center rounded-full bg-accent text-center text-sm font-medium text-black transition-transform duration-500 hover:scale-105 sm:h-44 sm:w-44 sm:text-base"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>

          <div className="flex flex-col gap-3 pt-24 sm:flex-row sm:pt-16">
            <button
              onClick={copy}
              className="group flex items-center justify-between gap-4 rounded-full border border-line px-6 py-4 text-left transition-colors hover:border-fg sm:justify-start"
            >
              <span className="truncate">{profile.email}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-accent">{copied ? 'Copied ✓' : 'Copy'}</span>
            </button>
            <a href={profile.phoneHref} className="rounded-full border border-line px-6 py-4 transition-colors hover:border-fg">
              {profile.phone}
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              download={s.label === 'Resume' ? true : undefined}
              className="group flex items-center justify-between bg-[#111113] p-5 transition-colors hover:bg-surface sm:p-7"
            >
              <span className="text-lg">{s.label}</span>
              <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-accent" />
            </a>
          ))}
        </div>
      </div>

      <motion.div aria-hidden style={{ x }} className="pointer-events-none mt-16 select-none whitespace-nowrap text-[22vw] font-semibold leading-[0.8] tracking-[-0.06em] text-white/[0.04]">
        APDO · FLUTTER
      </motion.div>

      <footer className="mx-auto flex max-w-[1400px] flex-col gap-4 border-t border-line px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="font-mono text-xs uppercase tracking-widest"><CairoClock /></span>
        <button onClick={() => scrollToId('top')} className="link-underline self-start text-fg sm:self-auto">
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
