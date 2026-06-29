import { hero, stats } from "@/lib/content";

export default function Hero() {
  return (
    <section className="grain relative isolate min-h-screen overflow-hidden">
      {/* Pozadí */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/fotky/exterier-leto.webp"
          alt="Chalupa ROCKytnice — pohled na chalupu s červenou střechou"
          className="h-full w-full animate-slow-zoom object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/80 via-ink-950/65 to-ink-950" />

      <div className="container-x flex min-h-screen flex-col justify-end pb-16 pt-28">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            <span className="h-px w-10 bg-ember-500" />
            {hero.kicker}
          </p>
          <h1 className="display text-6xl leading-[0.85] text-white sm:text-7xl lg:text-8xl">
            ROCK<span className="text-ember-500">ytnice</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-300">
            {hero.subheadline}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#rezervace" className="btn-primary">
              Zjistit dostupnost
            </a>
            <a href="#galerie" className="btn-ghost">
              Prohlédnout chalupu
            </a>
          </div>
        </div>

        {/* Statistiky */}
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink-950/70 px-5 py-6 backdrop-blur-sm">
              <dt className="display text-4xl text-ember-500">{s.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-stone-400">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
