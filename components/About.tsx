import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="o-chalupe" className="bg-wood-50 py-20">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="section-title">{about.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-forest-900/80">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=70"
            alt="Interiér s krbem"
            className="h-64 w-full rounded-2xl object-cover shadow-md"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=70"
            alt="Ložnice"
            className="mt-8 h-64 w-full rounded-2xl object-cover shadow-md"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
