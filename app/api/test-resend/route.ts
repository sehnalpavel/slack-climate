import { NextResponse } from "next/server";
import { contact } from "@/lib/content";

// DOČASNÝ diagnostický endpoint pro ověření napojení Resend. Po otestování smazat.
export const dynamic = "force-dynamic";

export async function GET() {
  const apiKey =
    process.env.RESEND_API_KEY ||
    process.env["resend-rockytnice"] ||
    process.env["resend_rockytnice"] ||
    process.env.RESEND_ROCKYTNICE;
  const from = process.env.RESEND_FROM || "rezervace@chalupa-rockytnice.cz";
  const to = process.env.RESERVATION_EMAIL || contact.reservationEmail;

  const diag = {
    hasKey: !!apiKey,
    keyLen: apiKey ? apiKey.length : 0,
    from,
    to,
  };

  if (!apiKey) {
    return NextResponse.json({ ok: false, reason: "RESEND_API_KEY není nastaven", ...diag });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "Test napojení Resend — Chalupa ROCKytnice",
        text: "Toto je testovací e-mail ověřující napojení Resend na webu Chalupy ROCKytnice. Pokud vám dorazil, odesílání poptávek funguje. Tento endpoint pak smažeme.",
      }),
    });
    const detail = (await res.text()).slice(0, 600);
    return NextResponse.json({ ok: res.ok, status: res.status, detail, ...diag });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err), ...diag });
  }
}
