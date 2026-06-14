import { surroundings } from "@/lib/content";
import Icon from "./Icon";

export default function Surroundings() {
  return (
    <section className="bg-wood-50 py-20">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <img
          src="https://images.unsplash.com/photo-1486890093247-c9a1de0a86d2?auto=format&fit=crop&w=1000&q=70"
          alt="Hřebeny Krkonoš"
          className="h-80 w-full rounded-2xl object-cover shadow-md"
          loading="lazy"
        />
        <div>
          <h2 className="section-title">{surroundings.title}</h2>
          <ul className="mt-6 space-y-3">
            {surroundings.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-forest-900/80">
                <Icon name="pin" className="mt-0.5 h-5 w-5 flex-none text-forest-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
