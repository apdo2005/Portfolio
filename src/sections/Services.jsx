import { services } from '../data';
import { FadeUp, RevealText, SectionLabel } from './ui';

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="02">What I do</SectionLabel>
          <h2 className="display-lg mt-6 font-medium">
            <RevealText text="Services &" className="block" />
            <RevealText text="expertise" delay={0.1} className="block font-serif italic font-normal text-accent" />
          </h2>
        </div>
        <FadeUp className="max-w-sm text-muted">
          From architecture to animation, I cover the full journey of building a mobile product that lasts.
        </FadeUp>
      </div>

      <div className="mt-16 border-b border-line">
        {services.map((s, i) => (
          <FadeUp key={s.num} delay={i * 0.05}>
            <div className="group relative grid gap-4 overflow-hidden border-t border-line py-8 sm:py-10 md:grid-cols-12 md:items-center">
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-surface transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              <span className="relative font-mono text-sm text-muted md:col-span-1">{s.num}</span>
              <h3 className="relative text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-5xl md:col-span-5">
                {s.title}
              </h3>
              <div className="relative space-y-4 md:col-span-6">
                <p className="text-muted">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors group-hover:border-accent/40 group-hover:text-fg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
