import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { experience } from '../data';
import { FadeUp, RevealText, SectionLabel } from './ui';

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });

  return (
    <section id="experience" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-36">
      <SectionLabel index="04">Experience</SectionLabel>
      <h2 className="display-lg mt-6 font-medium">
        <RevealText text="My" className="mr-4" />
        <RevealText text="journey" delay={0.08} className="font-serif italic font-normal text-accent" />
      </h2>

      <div ref={ref} className="relative mt-16 pl-6 sm:pl-10">
        <span className="absolute left-0 top-0 h-full w-px bg-line" />
        <motion.span style={{ scaleY: scrollYProgress }} className="absolute left-0 top-0 h-full w-px origin-top bg-accent" />

        {experience.map((e, i) => (
          <FadeUp key={i} delay={0.05} className="relative grid gap-3 border-b border-line py-10 md:grid-cols-12 md:gap-8">
            <span className="absolute -left-6 top-11 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-bg bg-accent sm:-left-10" />
            <span className="font-mono text-sm text-muted md:col-span-3">{e.period}</span>
            <div className="md:col-span-4">
              <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{e.role}</h3>
              <p className="mt-1 text-accent">{e.org}</p>
            </div>
            <p className="leading-relaxed text-muted md:col-span-5">{e.desc}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
