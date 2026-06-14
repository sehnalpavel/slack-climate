import { contact, site } from "@/lib/content";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-ink-950 py-16">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <span className="display text-2xl tracking-tighter text-white">
            ROCK<span className="text-ember-500">ytnice</span>
          </span>
          <p className="mt-4 text-sm text-stone-400">{site.address}</p>
          <p className="mt-2 text-sm text-stone-500">
            Horská chalupa až pro 20 osob v Krkonoších.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-stone-300 transition hover:text-white">
                <Icon name="phone" className="h-5 w-5 text-ember-500" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-stone-300 transition hover:text-white">
                <Icon name="mail" className="h-5 w-5 text-ember-500" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            Odkazy
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="#rezervace" className="text-stone-300 transition hover:text-white">
                Rezervace a dostupnost
              </a>
            </li>
            <li>
              <a href={site.echalupyUrl} target="_blank" rel="noopener noreferrer" className="text-stone-300 transition hover:text-white">
                Profil na e-chalupy.cz
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-white/10 pt-6 text-center text-xs text-stone-600">
        © {new Date().getFullYear()} {site.name}. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}
