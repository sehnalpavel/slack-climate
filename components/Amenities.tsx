import { amenities } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Amenities() {
  return (
    <section id="vybaveni" className="border-y border-white/10 bg-ink-900 py-24">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">
            <span className="h-px w-8 bg-ember-500" /> Vybavení
          </p>
          <h2 className="section-title">Všechno, co potřebujete</h2>
          <p className="mt-4 text-stone-400">
            Připraveno na celý rok — od zimního lyžování po letní výpravy do hor.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a, i) => (
            <Reveal key={a.label} delay={i * 40}>
              <li className="group flex items-center gap-4 rounded-xl border border-white/10 bg-ink-850 p-5 transition hover:border-ember-500/50">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-ember-500/10 text-ember-500 transition group-hover:bg-ember-500 group-hover:text-ink-950">
                  <Icon name={a.icon} className="h-6 w-6" />
                </span>
                <span className="font-medium text-stone-200">{a.label}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
