/**
 * Minimalistický parser formátu iCalendar (RFC 5545) zaměřený na zjištění
 * obsazených dní z VEVENT záznamů. Záměrně bez externích závislostí.
 */

import { addDays, toISODate } from "./dates";

export type BusyEvent = { start: string; end: string }; // end je VYLUČUJÍCÍ (exkluzivní)

/** Rozbalí složené řádky (RFC 5545: pokračovací řádek začíná mezerou/tabem). */
function unfold(raw: string): string[] {
  const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const out: string[] = [];
  for (const line of normalized.split("\n")) {
    if ((line.startsWith(" ") || line.startsWith("\t")) && out.length > 0) {
      out[out.length - 1] += line.slice(1);
    } else {
      out.push(line);
    }
  }
  return out;
}

/** Parsuje hodnotu DTSTART/DTEND na Date. Podporuje DATE i DATE-TIME. */
function parseDateValue(value: string): Date | null {
  // formát "YYYYMMDD"
  const dateMatch = value.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (dateMatch) {
    const [, y, m, d] = dateMatch;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  // formát "YYYYMMDDTHHMMSS" (případně Z)
  const dtMatch = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/);
  if (dtMatch) {
    const [, y, m, d] = dtMatch;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  return null;
}

export function parseICalBusy(raw: string): BusyEvent[] {
  const lines = unfold(raw);
  const events: BusyEvent[] = [];
  let inEvent = false;
  let start: Date | null = null;
  let end: Date | null = null;
  let isAllDay = false;

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      start = null;
      end = null;
      isAllDay = false;
      continue;
    }
    if (line.startsWith("END:VEVENT")) {
      if (start) {
        // Pokud chybí DTEND, bereme jednodenní událost.
        let effectiveEnd = end ?? addDays(start, 1);
        // Pro DATE-TIME události (s konkrétním časem) je DTEND skutečný konec;
        // pro celodenní (DATE) je DTEND už exkluzivní. V obou případech
        // chceme exkluzivní hranici v rozlišení dní.
        if (!isAllDay && end) {
          // Zaokrouhlíme nahoru na celý den, aby noc s odjezdem byla volná.
          effectiveEnd = addDays(
            new Date(end.getFullYear(), end.getMonth(), end.getDate()),
            0,
          );
        }
        events.push({
          start: toISODate(start),
          end: toISODate(effectiveEnd),
        });
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    const [rawKey, ...rest] = line.split(":");
    const value = rest.join(":");
    const key = rawKey.split(";")[0];
    if (rawKey.includes("VALUE=DATE") && !rawKey.includes("DATE-TIME")) {
      isAllDay = true;
    }
    if (key === "DTSTART") {
      if (!rawKey.includes("DATE-TIME") && value.length === 8) isAllDay = true;
      start = parseDateValue(value);
    } else if (key === "DTEND") {
      end = parseDateValue(value);
    }
  }

  return events;
}

/** Vrátí množinu obsazených nocí ("YYYY-MM-DD") z VEVENT záznamů. */
export function busyNights(events: BusyEvent[]): Set<string> {
  const nights = new Set<string>();
  for (const ev of events) {
    let cur = new Date(
      Number(ev.start.slice(0, 4)),
      Number(ev.start.slice(5, 7)) - 1,
      Number(ev.start.slice(8, 10)),
    );
    const end = new Date(
      Number(ev.end.slice(0, 4)),
      Number(ev.end.slice(5, 7)) - 1,
      Number(ev.end.slice(8, 10)),
    );
    // end je exkluzivní – poslední obsazená noc je end - 1.
    while (cur < end) {
      nights.add(toISODate(cur));
      cur = addDays(cur, 1);
    }
  }
  return nights;
}
