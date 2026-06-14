import { about } from "@/lib/content";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="o-chalupe" className="relative bg-ink-950 py-24">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="section-eyebrow">
            <span className="h-px w-8 bg-ember-500" /> O chalupě
          </p>
          <h2 className="section-title">{about.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-400">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=70"
            alt="Interiér s krbem"
            className="h-72 w-full rounded-2xl border border-white/10 object-cover"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=70"
            alt="Ložnice"
            className="mt-10 h-72 w-full rounded-2xl border border-white/10 object-cover"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
