"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CZ_MONTHS,
  CZ_WEEKDAYS,
  addDays,
  fromISODate,
  mondayIndex,
  nightsBetween,
  startOfMonth,
  toISODate,
} from "@/lib/dates";
import { contact } from "@/lib/content";

type Availability = {
  configured: boolean;
  busy: string[];
  message?: string;
  error?: string;
};

type Status = "idle" | "loading" | "ok" | "error";

export default function BookingSection() {
  const [busy, setBusy] = useState<Set<string>>(new Set());
  const [calMessage, setCalMessage] = useState<string | null>(null);
  const [calLoaded, setCalLoaded] = useState(false);

  const [monthCursor, setMonthCursor] = useState<Date>(startOfMonth(new Date()));
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    let active = true;
    fetch("/api/availability")
      .then((r) => r.json())
      .then((data: Availability) => {
        if (!active) return;
        setBusy(new Set(data.busy || []));
        if (!data.configured) setCalMessage(data.message || null);
        else if (data.error) setCalMessage(data.error);
        setCalLoaded(true);
      })
      .catch(() => {
        if (!active) return;
        setCalMessage("Kalendář dostupnosti se nepodařilo načíst.");
        setCalLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const today = useMemo(() => fromISODate(toISODate(new Date())), []);

  function isBusyNight(iso: string): boolean {
    return busy.has(iso);
  }

  /** Je některá noc v intervalu [a, b) obsazená? */
  function rangeHasConflict(aIso: string, bIso: string): boolean {
    let cur = fromISODate(aIso);
    const end = fromISODate(bIso);
    while (cur < end) {
      if (isBusyNight(toISODate(cur))) return true;
      cur = addDays(cur, 1);
    }
    return false;
  }

  function handleDayClick(iso: string) {
    const d = fromISODate(iso);
    if (d < today) return;

    // Začínáme nový výběr.
    if (!from || (from && to)) {
      if (isBusyNight(iso)) return; // na obsazenou noc nelze přijet
      setFrom(iso);
      setTo(null);
      return;
    }

    // Druhý klik – nastavení odjezdu.
    if (iso === from) {
      setFrom(null);
      setTo(null);
      return;
    }
    if (iso < from) {
      if (isBusyNight(iso)) return;
      setFrom(iso);
      setTo(null);
      return;
    }
    // iso > from → odjezd. Nesmí přeskočit obsazenou noc.
    if (rangeHasConflict(from, iso)) {
      setFeedback("Vybraný termín obsahuje již obsazené noci. Zvolte prosím jiný.");
      setFrom(iso);
      setTo(null);
      return;
    }
    setTo(iso);
    setFeedback("");
  }

  const nights = from && to ? nightsBetween(fromISODate(from), fromISODate(to)) : 0;

  function inSelectedRange(iso: string): boolean {
    if (!from) return false;
    if (!to) return iso === from;
    return iso >= from && iso <= to;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) {
      setStatus("error");
      setFeedback("Vyberte prosím termín příjezdu a odjezdu v kalendáři.");
      return;
    }
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, from, to }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("ok");
        setFeedback("");
      } else {
        setStatus("error");
        setFeedback(data.error || "Poptávku se nepodařilo odeslat.");
      }
    } catch {
      setStatus("error");
      setFeedback("Poptávku se nepodařilo odeslat. Zkuste to prosím znovu.");
    }
  }

  return (
    <section id="rezervace" className="bg-forest-50 py-20">
      <div className="container-x">
        <h2 className="section-title text-center">Dostupnost a rezervace</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-forest-900/70">
          Vyberte termín v kalendáři a odešlete nezávaznou poptávku. Obsazené
          termíny se načítají z našeho kalendáře v reálném čase. Rezervace je
          platná po našem potvrzení.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Kalendář */}
          <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                className="rounded-full p-2 text-forest-700 transition hover:bg-forest-50 disabled:opacity-30"
                disabled={monthCursor <= startOfMonth(new Date())}
                aria-label="Předchozí měsíc"
              >
                ‹
              </button>
              <span className="font-serif text-lg font-semibold text-forest-800">
                Kalendář dostupnosti
              </span>
              <button
                type="button"
                onClick={() => setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                className="rounded-full p-2 text-forest-700 transition hover:bg-forest-50"
                aria-label="Další měsíc"
              >
                ›
              </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <MonthGrid
                month={monthCursor}
                today={today}
                isBusy={isBusyNight}
                inRange={inSelectedRange}
                from={from}
                to={to}
                onPick={handleDayClick}
              />
              <MonthGrid
                month={new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1)}
                today={today}
                isBusy={isBusyNight}
                inRange={inSelectedRange}
                from={from}
                to={to}
                onPick={handleDayClick}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-forest-900/70">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-forest-600" /> vybráno
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-wood-200" /> obsazeno
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded border border-forest-200 bg-white" /> volné
              </span>
            </div>

            {calLoaded && calMessage && (
              <p className="mt-4 rounded-lg bg-wood-50 p-3 text-xs text-wood-800">
                {calMessage}
              </p>
            )}
          </div>

          {/* Formulář */}
          <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
            {status === "ok" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 text-2xl text-forest-700">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-forest-800">
                  Poptávka odeslána
                </h3>
                <p className="mt-2 max-w-sm text-sm text-forest-900/70">
                  Děkujeme! Ozveme se vám co nejdříve s potvrzením dostupnosti a
                  cenovou nabídkou pro termín {from} → {to}.
                </p>
                <button
                  type="button"
                  className="btn-outline mt-6"
                  onClick={() => {
                    setStatus("idle");
                    setFrom(null);
                    setTo(null);
                    setForm({ name: "", email: "", phone: "", guests: "", message: "", website: "" });
                  }}
                >
                  Nová poptávka
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-xl bg-forest-50 p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-forest-900/70">Vybraný termín</span>
                    <span className="font-semibold text-forest-800">
                      {from && to
                        ? `${from} → ${to} · ${nights} ${nightWord(nights)}`
                        : from
                          ? `${from} → vyberte odjezd`
                          : "vyberte v kalendáři"}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Jméno a příjmení" required>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Počet osob">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className={inputClass}
                      placeholder="2–20"
                    />
                  </Field>
                  <Field label="E-mail" required>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Telefon">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Zpráva">
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass}
                    placeholder="Dotazy, požadavky, počet dětí…"
                  />
                </Field>

                {/* Honeypot – skryté pole proti spamu */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />

                {status === "error" && feedback && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{feedback}</p>
                )}
                {status !== "error" && feedback && (
                  <p className="rounded-lg bg-wood-50 p-3 text-sm text-wood-800">{feedback}</p>
                )}

                <button type="submit" className="btn-primary w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Odesílám…" : "Odeslat nezávaznou poptávku"}
                </button>
                <p className="text-center text-xs text-forest-900/60">
                  Nebo nám zavolejte na{" "}
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="underline">
                    {contact.phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-forest-200 bg-white px-3 py-2 text-sm text-forest-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-forest-900/80">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function nightWord(n: number): string {
  if (n === 1) return "noc";
  if (n >= 2 && n <= 4) return "noci";
  return "nocí";
}

function MonthGrid({
  month,
  today,
  isBusy,
  inRange,
  from,
  to,
  onPick,
}: {
  month: Date;
  today: Date;
  isBusy: (iso: string) => boolean;
  inRange: (iso: string) => boolean;
  from: string | null;
  to: string | null;
  onPick: (iso: string) => void;
}) {
  const year = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(year, m, 1);
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const leading = mondayIndex(first);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, m, d));

  return (
    <div>
      <div className="mb-2 text-center font-semibold capitalize text-forest-800">
        {CZ_MONTHS[m]} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-forest-900/50">
        {CZ_WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} />;
          const iso = toISODate(cell);
          const past = cell < today;
          const busy = isBusy(iso);
          const selected = inRange(iso);
          const isEdge = iso === from || iso === to;
          const disabled = past || (busy && !selected);

          let cls = "relative h-9 rounded-lg text-sm transition ";
          if (past) cls += "cursor-not-allowed text-forest-900/25 ";
          else if (busy) cls += "cursor-not-allowed bg-wood-200 text-wood-800/70 line-through ";
          else if (isEdge) cls += "bg-forest-600 font-semibold text-white ";
          else if (selected) cls += "bg-forest-200 text-forest-900 ";
          else cls += "text-forest-900 hover:bg-forest-100 ";

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              className={cls}
            >
              {cell.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
