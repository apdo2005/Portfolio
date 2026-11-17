import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data';
import { ArrowUpRight, FadeUp, RevealText, SectionLabel } from './ui';

function Card({ project, i, total, progress }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(-5vh + ${i * 22}px)`, backgroundColor: project.color }}
        className="relative grid h-[78svh] w-full origin-top grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-[28px] border border-white/10 md:grid-cols-12 md:grid-rows-1"
      >
        <div className="flex flex-col justify-between gap-6 p-6 sm:p-10 md:col-span-5 order-2 md:order-1">
          <div>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-white/50">
              <span>{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="mt-4 text-4xl font-medium tracking-tight sm:mt-8 sm:text-6xl">{project.title}</h3>
            <p className="mt-1 font-serif text-xl italic text-accent sm:text-2xl">{project.category}</p>
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/60 sm:mt-6 sm:line-clamp-none sm:text-base">{project.desc}</p>
          </div>
          <div className="space-y-5">
            <div className="hidden flex-wrap gap-2 sm:flex">
              {project.tech.map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">{t}</span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-fg py-2.5 pl-5 pr-2.5 text-sm font-medium text-bg"
            >
              View on GitHub
              <span className="grid h-7 w-7 place-items-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="View"
          aria-label={`${project.title} on GitHub`}
          className="relative order-1 m-3 min-h-0 overflow-hidden rounded-[20px] md:order-2 md:col-span-7 md:m-4"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{ scale: imgScale }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </a>
      </motion.article>
    </div>
  );
}

export default function Work() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section id="work" className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-8 sm:pt-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="03">Selected work</SectionLabel>
          <h2 className="display-lg mt-6 font-medium">
            <RevealText text="Featured" className="block" />
            <RevealText text="projects" delay={0.1} className="block font-serif italic font-normal text-accent" />
          </h2>
        </div>
        <FadeUp className="max-w-sm text-muted">
          A selection of production apps — engineered for real users, real traffic and uncompromising performance.
        </FadeUp>
      </div>

      <div ref={container} className="relative mt-10">
        {projects.map((p, i) => (
          <Card key={p.title} project={p} i={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
