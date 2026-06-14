import { NextResponse } from "next/server";
import { contact, site } from "@/lib/content";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  from?: string;
  to?: string;
  guests?: string | number;
  message?: string;
  // honeypot proti spamu
  website?: string;
};

function isValidDate(s?: string): s is string {
  return !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Neplatný požadavek." }, { status: 400 });
  }

  // Honeypot – roboti vyplní skryté pole.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const errors: string[] = [];
  if (!data.name || data.name.trim().length < 2) errors.push("Vyplňte jméno.");
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
    errors.push("Vyplňte platný e-mail.");
  if (!isValidDate(data.from) || !isValidDate(data.to))
    errors.push("Vyberte termín příjezdu a odjezdu.");
  if (isValidDate(data.from) && isValidDate(data.to) && data.to <= data.from)
    errors.push("Datum odjezdu musí být po datu příjezdu.");

  if (errors.length) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 422 });
  }

  const subject = `Nová poptávka pobytu — ${site.name} (${data.from} → ${data.to})`;
  const lines = [
    `Jméno: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || "—"}`,
    `Termín: ${data.from} → ${data.to}`,
    `Počet osob: ${data.guests || "—"}`,
    "",
    "Zpráva:",
    data.message || "—",
  ];
  const body = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || "rezervace@chalupa-rockytnice.cz";
  const to = contact.reservationEmail;

  // Pokud je nakonfigurován Resend, odešleme e-mail. Jinak poptávku jen
  // zalogujeme a vrátíme úspěch (web zůstane funkční i bez e-mailové služby).
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [to],
          reply_to: data.email,
          subject,
          text: body,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", res.status, detail);
        return NextResponse.json(
          { ok: false, error: "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("Reservation send failed:", err);
      return NextResponse.json(
        { ok: false, error: "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu." },
        { status: 502 },
      );
    }
  } else {
    console.log("[REZERVACE] (RESEND_API_KEY není nastaven, poptávka jen zalogována)");
    console.log(subject);
    console.log(body);
  }

  return NextResponse.json({ ok: true });
}
