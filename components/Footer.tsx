import { contact, site } from "@/lib/content";
import Icon from "./Icon";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-forest-900 py-16 text-forest-100">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-xl font-bold text-white">{site.name}</h3>
          <p className="mt-3 text-sm text-forest-100/80">
            {site.location}, {site.region}
          </p>
          <p className="mt-2 text-sm text-forest-100/80">
            Prostorná horská chalupa pro 2–20 osob.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-wood-200">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Icon name="phone" className="h-5 w-5 text-wood-200" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Icon name="mail" className="h-5 w-5 text-wood-200" />
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-wood-200">
            Odkazy
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href="#rezervace" className="transition hover:text-white">
                Rezervace a dostupnost
              </a>
            </li>
            <li>
              <a
                href={site.echalupyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                Profil na e-chalupy.cz
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-forest-800 pt-6 text-center text-xs text-forest-100/60">
        © {new Date().getFullYear()} {site.name}. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}
