"use client";

import { useState } from "react";
import { faq } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-ink-950 py-24">
      <div className="container-x max-w-3xl">
        <div className="text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-px w-8 bg-ember-500" /> FAQ
          </p>
          <h2 className="section-title">{faq.title}</h2>
        </div>

        <div className="mt-12 space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg uppercase tracking-wide text-white">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border border-white/20 text-ember-500 transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-stone-400">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
