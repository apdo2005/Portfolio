import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImg from '../assets/apdo2.jpeg';
import { stats, profile } from '../data';
import { Counter, FadeUp, SectionLabel } from './ui';
import { ease } from './ease';

const statement =
  "I'm a Flutter developer who believes great apps feel effortless. I design clean architectures, obsess over 60fps motion, and ship products people actually enjoy using.";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function ScrollParagraph() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = statement.split(' ');
  return (
    <p ref={ref} className="display-md font-medium" aria-label={statement}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section id="about" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-36">
      <SectionLabel index="01">About me</SectionLabel>
      <div className="mt-10 max-w-6xl">
        <ScrollParagraph />
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-8 sm:mt-28">
        <motion.div
          ref={imgRef}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface md:col-span-5"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease }}
        >
          <motion.img
            src={profileImg}
            alt={profile.name}
            loading="lazy"
            decoding="async"
            style={{ y: imgY }}
            className="absolute inset-0 h-[124%] w-full -top-[12%] object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
          />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
            <div>
              <p className="text-sm font-medium">{profile.name}</p>
              <p className="text-xs text-white/60">Software Engineering Intern @ HumaVolve</p>
            </div>
            <span className="h-2 w-2 rounded-full bg-accent" />
          </div>
        </motion.div>

        <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
          <FadeUp className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Every app is an ecosystem. Beyond the interface lives the machinery that makes it reliable — dependency inversion,
              decoupled state, immutable domain entities and careful memory profiling.
            </p>
            <p>
              I&apos;m a <span className="text-fg">Core Team Member at GDG on Campus Benha</span>, where I mentor developers and run
              Flutter workshops. Today I&apos;m building production features as a Software Engineering Intern at{' '}
              <span className="text-fg">HumaVolve</span>.
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08} className="bg-bg p-5 sm:p-7">
                <div className="text-4xl font-medium tracking-tight sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs text-muted sm:text-sm">{s.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
