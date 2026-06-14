import { site, surroundings } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Surroundings() {
  const { lat, lng } = site.gps;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <section className="border-y border-white/10 bg-ink-900 py-24">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="section-eyebrow">
            <span className="h-px w-8 bg-ember-500" /> Okolí
          </p>
          <h2 className="section-title">{surroundings.title}</h2>
          <ul className="mt-8 space-y-4">
            {surroundings.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-stone-300">
                <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                  <Icon name="pin" className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-stone-500">{site.address}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Mapa — Chalupa ROCKytnice"
              src={mapSrc}
              className="h-80 w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
