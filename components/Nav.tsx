"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const links = [
  { href: "#o-chalupe", label: "Chalupa" },
  { href: "#pokoje", label: "Pokoje" },
  { href: "#galerie", label: "Galerie" },
  { href: "#cenik", label: "Ceník" },
  { href: "#rezervace", label: "Rezervace" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#" className="group flex items-center gap-2">
          <span className="display text-xl tracking-tighter text-white">
            ROCK<span className="text-ember-500">ytnice</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium uppercase tracking-wide text-stone-300 transition hover:text-ember-400"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#rezervace" className="btn-primary hidden !px-5 !py-2 sm:inline-flex">
            Rezervovat
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 backdrop-blur-md md:hidden">
          <ul className="container-x flex flex-col py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-wide text-stone-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#rezervace" onClick={() => setOpen(false)} className="btn-primary w-full">
                Rezervovat termín
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
