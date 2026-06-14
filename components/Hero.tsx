import { hero, site } from "@/lib/content";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(36,54,34,0.55), rgba(36,54,34,0.7)), url('https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=2000&q=70')",
        }}
      />
      <div className="container-x flex min-h-[78vh] flex-col justify-center py-24 text-white">
        <p className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-wood-100">
          <Icon name="pin" className="h-4 w-4" />
          {site.location} · {site.region}
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-wood-50/95">
          {hero.subheadline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#rezervace" className="btn-primary">
            Zjistit dostupnost a rezervovat
          </a>
          <a href="#galerie" className="btn-outline !border-white !text-white hover:!bg-white/10">
            Prohlédnout fotky
          </a>
        </div>
      </div>
    </section>
  );
}
