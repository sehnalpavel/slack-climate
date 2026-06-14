import { site } from "@/lib/content";

const links = [
  { href: "#o-chalupe", label: "O chalupě" },
  { href: "#galerie", label: "Galerie" },
  { href: "#vybaveni", label: "Vybavení" },
  { href: "#cenik", label: "Ceník" },
  { href: "#rezervace", label: "Rezervace" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-wood-50/90 backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#" className="font-serif text-lg font-bold text-forest-800">
          {site.name}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-forest-700 transition hover:text-forest-900"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#rezervace" className="btn-primary !px-5 !py-2">
          Nezávazná poptávka
        </a>
      </nav>
    </header>
  );
}
