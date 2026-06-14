/** Pomocné funkce pro práci s daty (bez externích závislostí). */

/** Vrací "YYYY-MM-DD" v lokálním čase. */
export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Vytvoří Date z "YYYY-MM-DD" v lokální půlnoci. */
export function fromISODate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

/** Počet nocí mezi dvěma daty (od < do). */
export function nightsBetween(from: Date, to: Date): number {
  const ms = fromISODate(toISODate(to)).getTime() - fromISODate(toISODate(from)).getTime();
  return Math.round(ms / 86400000);
}

export const CZ_MONTHS = [
  "leden",
  "únor",
  "březen",
  "duben",
  "květen",
  "červen",
  "červenec",
  "srpen",
  "září",
  "říjen",
  "listopad",
  "prosinec",
];

export const CZ_WEEKDAYS = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];

/** Index dne v týdnu s pondělím jako 0. */
export function mondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7;
}
