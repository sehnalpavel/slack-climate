import { pricing } from "@/lib/content";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="cenik" className="bg-ink-950 py-24">
      <div className="container-x max-w-4xl">
        <Reveal className="text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-px w-8 bg-ember-500" /> Ceník
          </p>
          <h2 className="section-title">{pricing.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-stone-400">{pricing.intro}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="card mt-12 overflow-hidden">
            <div className="divide-y divide-white/10">
              {pricing.rows.map((r) => (
                <div
                  key={r.season}
                  className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 transition hover:bg-white/[0.03]"
                >
                  <div>
                    <p className="font-display text-lg uppercase tracking-wide text-white">
                      {r.season}
                    </p>
                    <p className="text-sm text-stone-500">{r.note}</p>
                  </div>
                  <span className="text-lg font-bold text-ember-500">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-sm text-stone-500">{pricing.footnote}</p>

        <div className="mt-10 text-center">
          <a href="#rezervace" className="btn-primary">
            Nezávazně poptat termín
          </a>
        </div>
      </div>
    </section>
  );
}
