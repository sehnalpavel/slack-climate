"use client";

import { useEffect, useState } from "react";
import { gallery } from "@/lib/content";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i! + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i! - 1 + gallery.length) % gallery.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="galerie" className="border-y border-white/10 bg-ink-900 py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="section-eyebrow">
              <span className="h-px w-8 bg-ember-500" /> Galerie
            </p>
            <h2 className="section-title">Nahlédněte dovnitř</h2>
          </div>
          <p className="text-sm text-stone-500">
            Klikněte pro zvětšení. Listujte šipkami.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {gallery.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl border border-white/10 ${
                i % 5 === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                  i % 5 === 0 ? "h-full min-h-[16rem]" : "h-40 sm:h-52"
                }`}
                loading="lazy"
              />
              <span className="absolute inset-0 bg-ink-950/0 transition group-hover:bg-ink-950/20" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl text-white"
            aria-label="Zavřít"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! - 1 + gallery.length) % gallery.length);
            }}
            className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-2xl text-white sm:left-8"
            aria-label="Předchozí"
          >
            ‹
          </button>
          <img
            src={gallery[active].src.replace("w=1200", "w=1800")}
            alt={gallery[active].alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => (i! + 1) % gallery.length);
            }}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-2xl text-white sm:right-8"
            aria-label="Další"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
