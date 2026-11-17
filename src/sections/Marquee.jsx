import { marquee } from '../data';

function Row({ reverse, outline }) {
  const items = [...marquee, ...marquee];
  return (
    <div className="flex overflow-hidden">
      <div className={`marquee-track flex shrink-0 items-center ${reverse ? 'reverse' : ''}`}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`whitespace-nowrap px-6 text-4xl font-medium uppercase tracking-tight sm:text-6xl ${
                outline ? 'text-transparent [-webkit-text-stroke:1px_rgba(237,237,237,0.35)]' : ''
              }`}
            >
              {t}
            </span>
            <span className="text-2xl text-accent sm:text-4xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Skills" className="relative overflow-hidden border-y border-line py-8 sm:py-12">
      <div className="space-y-4 -rotate-2 scale-105">
        <Row />
        <Row reverse outline />
      </div>
    </section>
  );
}
