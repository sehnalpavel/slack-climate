import { NextResponse } from "next/server";
import { parseICalBusy, busyNights } from "@/lib/ical";

// Route musí běžet při každém požadavku (čte env a živá data z e-chalupy);
// samotné stažení iCal je ale cacheované hodinu přes fetch níže.
export const dynamic = "force-dynamic";
const ICAL_REVALIDATE = 3600;

/**
 * Vrací seznam obsazených nocí ve formátu ["YYYY-MM-DD", ...].
 *
 * Zdroj dat: iCal export z administrace e-chalupy.cz uložený v proměnné
 * prostředí ECHALUPY_ICAL_URL. Použijte variantu exportu "včetně podrobností".
 */
export async function GET() {
  const url = process.env.ECHALUPY_ICAL_URL;

  if (!url) {
    return NextResponse.json(
      {
        configured: false,
        busy: [],
        message:
          "Kalendář dostupnosti zatím není propojen. Nastavte proměnnou ECHALUPY_ICAL_URL.",
      },
      { status: 200 },
    );
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "text/calendar, text/plain, */*" },
      next: { revalidate: ICAL_REVALIDATE },
    });

    if (!res.ok) {
      return NextResponse.json(
        { configured: true, busy: [], error: `Zdroj kalendáře vrátil ${res.status}` },
        { status: 200 },
      );
    }

    const text = await res.text();
    const events = parseICalBusy(text);
    const busy = Array.from(busyNights(events)).sort();

    return NextResponse.json(
      { configured: true, busy, count: busy.length },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        configured: true,
        busy: [],
        error: "Kalendář dostupnosti se nepodařilo načíst.",
      },
      { status: 200 },
    );
  }
}
