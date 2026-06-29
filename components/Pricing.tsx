import { pricing } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="cenik" className="bg-ink-950 py-24">
      <div className="container-x max-w-5xl">
        <Reveal className="text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-px w-8 bg-ember-500" /> Ceník
          </p>
          <h2 className="section-title">{pricing.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-400">{pricing.intro}</p>
        </Reveal>

        {/* Sezónní ceny */}
        <Reveal delay={100}>
          <div className="card mt-12 overflow-hidden">
            <div className="hidden grid-cols-[1.6fr_1fr_1fr] gap-4 border-b border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-500 sm:grid">
              <span>Sezóna</span>
              <span className="text-right">Týden</span>
              <span className="text-right">Víkend</span>
            </div>
            <div className="divide-y divide-white/10">
              {pricing.seasons.map((s) => (
                <div
                  key={s.name}
                  className="grid grid-cols-2 gap-x-4 gap-y-1 px-6 py-5 transition hover:bg-white/[0.03] sm:grid-cols-[1.6fr_1fr_1fr] sm:items-center"
                >
                  <div className="col-span-2 sm:col-span-1">
                    <p className="font-display text-lg uppercase tracking-wide text-white">
                      {s.name}
                    </p>
                    <p className="text-sm text-stone-500">{s.period}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-stone-500 sm:hidden">Týden: </span>
                    <span className="font-semibold text-ember-500">{s.week}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 sm:hidden">Víkend: </span>
                    <span className="font-semibold text-ember-500">{s.weekend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Speciální termíny */}
        <Reveal delay={160}>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.special.map((s) => (
              <div key={s.name} className="card p-5 text-center">
                <p className="font-display text-lg uppercase tracking-wide text-white">
                  {s.name}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-stone-500">
                  {s.period}
                </p>
                <p className="mt-3 text-xl font-bold text-ember-500">{s.price}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Co je v ceně */}
        <Reveal delay={200}>
          <div className="mt-6 grid gap-6 rounded-2xl border border-white/10 bg-ink-900 p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <h3 className="font-display text-xl uppercase tracking-wide text-white">
                {pricing.includedTitle}
              </h3>
              <p className="mt-3 text-sm text-ember-400">{pricing.deposit}</p>
            </div>
            <ul className="space-y-2.5">
              {pricing.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-stone-300">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-ember-500/10 text-ember-500">
                    <Icon name="pin" className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mt-4 text-center text-sm text-stone-500">{pricing.footnote}</p>

        <div className="mt-8 text-center">
          <a href="#rezervace" className="btn-primary">
            Nezávazně poptat termín
          </a>
        </div>
      </div>
    </section>
  );
}
