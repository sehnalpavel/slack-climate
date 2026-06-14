import { rooms } from "@/lib/content";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function Rooms() {
  return (
    <section id="pokoje" className="bg-ink-950 py-24">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="section-eyebrow">
            <span className="h-px w-8 bg-ember-500" /> Pokoje
          </p>
          <h2 className="section-title">{rooms.title}</h2>
          <p className="mt-4 text-stone-400">{rooms.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.list.map((r, i) => (
            <Reveal key={r.name} delay={i * 50}>
              <div className="card flex h-full flex-col justify-between p-6 transition hover:-translate-y-1 hover:border-ember-500/40">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember-500/10 text-ember-500">
                    <Icon name="bed" className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {r.floor}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="display text-xl text-white">{r.name}</h3>
                  <p className="mt-1 text-sm text-ember-400">{r.beds}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-stone-600">{rooms.note}</p>
      </div>
    </section>
  );
}
