import { NextResponse } from "next/server";
import { parseICalBusy, busyNights } from "@/lib/ical";

// Route musí běžet při každém požadavku (čte env a živá data z kalendářů);
// samotné stažení iCal je ale cacheované hodinu přes fetch níže.
export const dynamic = "force-dynamic";
const ICAL_REVALIDATE = 3600;

/**
 * Sestaví seznam zdrojových iCal URL podle proměnných prostředí.
 *
 * Zdrojem pravdy je Google kalendář (GOOGLE_CALENDAR_ICAL_URL — tajná adresa
 * ve formátu iCal). Volitelně lze přidat další zdroje (např. export
 * z e-chalupy.cz) přes ECHALUPY_ICAL_URL nebo seznam v AVAILABILITY_ICAL_URLS.
 * Obsazené noci ze všech zdrojů se sloučí.
 */
function collectSources(): string[] {
  const urls: string[] = [];
  if (process.env.GOOGLE_CALENDAR_ICAL_URL)
    urls.push(process.env.GOOGLE_CALENDAR_ICAL_URL);
  if (process.env.ECHALUPY_ICAL_URL) urls.push(process.env.ECHALUPY_ICAL_URL);
  if (process.env.AVAILABILITY_ICAL_URLS)
    urls.push(...process.env.AVAILABILITY_ICAL_URLS.split(",").map((s) => s.trim()));
  return Array.from(new Set(urls.filter(Boolean)));
}

async function fetchBusy(url: string): Promise<string[]> {
  const res = await fetch(url, {
    headers: { Accept: "text/calendar, text/plain, */*" },
    next: { revalidate: ICAL_REVALIDATE },
  });
  if (!res.ok) throw new Error(`zdroj vrátil ${res.status}`);
  const text = await res.text();
  return Array.from(busyNights(parseICalBusy(text)));
}

/**
 * Vrací seznam obsazených nocí ve formátu ["YYYY-MM-DD", ...]
 * sloučený ze všech nakonfigurovaných kalendářů.
 */
export async function GET() {
  const sources = collectSources();

  if (sources.length === 0) {
    return NextResponse.json(
      {
        configured: false,
        busy: [],
        message:
          "Kalendář dostupnosti zatím není propojen. Nastavte proměnnou GOOGLE_CALENDAR_ICAL_URL.",
      },
      { status: 200 },
    );
  }

  const all = new Set<string>();
  const errors: string[] = [];

  await Promise.all(
    sources.map(async (url) => {
      try {
        for (const night of await fetchBusy(url)) all.add(night);
      } catch (err) {
        errors.push(err instanceof Error ? err.message : String(err));
      }
    }),
  );

  // Historii nepotřebujeme — kalendář na webu zobrazuje jen aktuální a budoucí
  // měsíce. Ořízneme na termíny od (dnešek − 2 dny) výš (rezerva kvůli časovým
  // zónám), čímž výrazně zmenšíme přenášená data.
  const cutoff = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
  const busy = Array.from(all)
    .filter((d) => d >= cutoff)
    .sort();

  return NextResponse.json(
    {
      configured: true,
      busy,
      count: busy.length,
      ...(errors.length ? { error: "Některý zdroj kalendáře se nepodařilo načíst." } : {}),
    },
    { status: 200 },
  );
}
