import { amenities } from "@/lib/content";
import Icon from "./Icon";

export default function Amenities() {
  return (
    <section id="vybaveni" className="py-20">
      <div className="container-x">
        <h2 className="section-title text-center">Vybavení chalupy</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-forest-900/70">
          Vše potřebné pro pohodlný pobyt po celý rok.
        </p>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <li
              key={a.label}
              className="flex items-center gap-4 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest-50 text-forest-600">
                <Icon name={a.icon} className="h-6 w-6" />
              </span>
              <span className="font-medium text-forest-900">{a.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
