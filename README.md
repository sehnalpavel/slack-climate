# Chalupa ROCKytnice — web s rezervacemi

Webové stránky a rezervační systém pro horskou chalupu **Chalupa ROCKytnice**
v Dolní Rokytnici nad Jizerou ([profil na e-chalupy.cz](https://www.e-chalupy.cz/ubytovani-dolni-rokytnice-nad-jizerou-chalupa-rockytnice-o2981)).

Web nabízí prezentaci objektu, **kalendář dostupnosti synchronizovaný
s e-chalupy.cz** (přes iCal) a **rezervační poptávkový formulář**.

## Technologie

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- Nasazení na [Vercel](https://vercel.com/)
- Volitelně [Resend](https://resend.com/) pro odesílání e-mailových poptávek

## Lokální spuštění

```bash
npm install
cp .env.example .env.local   # vyplňte hodnoty (viz níže)
npm run dev                  # http://localhost:3000
```

## Konfigurace

Veškeré **texty, ceny, vybavení a kontakty** se upravují v jednom souboru:
[`lib/content.ts`](lib/content.ts). Fotky v galerii (`gallery`) jsou zatím
ukázkové z Unsplashe — nahraďte je odkazy na vlastní snímky chalupy.

Proměnné prostředí (viz [`.env.example`](.env.example)):

| Proměnná | Význam |
| --- | --- |
| `GOOGLE_CALENDAR_ICAL_URL` | Tajná/veřejná iCal adresa Google kalendáře (zdroj pravdy) |
| `ECHALUPY_ICAL_URL` | (volitelné) iCal export obsazenosti z e-chalupy.cz – sloučí se |
| `AVAILABILITY_ICAL_URLS` | (volitelné) další iCal zdroje oddělené čárkou – sloučí se |
| `RESERVATION_EMAIL` | Kam chodí poptávky z formuláře |
| `RESEND_API_KEY` | API klíč Resend pro odesílání e-mailů (volitelné) |
| `RESEND_FROM` | Odesílací adresa na ověřené doméně v Resendu |

## Synchronizace kalendáře s e-chalupy.cz

**Zdrojem pravdy o obsazenosti je Google kalendář.** Vy spravujete obsazenost
v jednom Google kalendáři, web ji čte v reálném čase a obsazené noci hosté
nemohou poptat. Stejný kalendář lze sdílet i s e-chalupy.cz, takže všude svítí
stejná dostupnost.

**Napojení Google kalendáře → web:**

1. Doporučujeme založit samostatný kalendář, např. „Chalupa ROCKytnice".
2. V Google Kalendáři otevřete **Nastavení** daného kalendáře →
   **Integrace kalendáře**.
3. Zkopírujte **„Tajná adresa ve formátu iCal"** (odkaz končící na `/basic.ics`).
4. Vložte ho do proměnné `GOOGLE_CALENDAR_ICAL_URL`.

Obsazenost zadáváte jako běžné celodenní události (od příjezdu do odjezdu).
Kalendář se na webu obnovuje automaticky každou hodinu (cache).

**Sdílení dostupnosti s e-chalupy.cz:**

E-chalupy.cz umí importovat cizí iCal kalendář. V jejich administraci nastavte
**import** a vložte tutéž tajnou iCal adresu Google kalendáře — tím se Google
kalendář stane zdrojem pravdy i pro e-chalupy. Obsazenost z e-chalupy pak
nemusíte řešit zvlášť.

Naopak pokud chcete do webu zahrnout i rezervace evidované přímo v e-chalupy,
přidejte jejich iCal **export** (varianta „včetně podrobností",
<https://klient.e-chalupy.cz/obsazenost-export-ics/>) do proměnné
`ECHALUPY_ICAL_URL`. Web pak sloučí obsazenost z obou zdrojů.

**Potvrzené poptávky z webu** zapisujte do Google kalendáře (zdroje pravdy) —
odtud se propíšou na web i do e-chalupy. Automatický zápis poptávky do Google
kalendáře zatím není součástí webu; lze doplnit přes Google Calendar API.

## Rezervační formulář

Host vybere termín v kalendáři (obsazené noci nejdou zvolit) a odešle
nezávaznou poptávku. Zpracování:

- S nastaveným `RESEND_API_KEY` se poptávka **odešle e-mailem** na
  `RESERVATION_EMAIL`.
- Bez klíče web funguje, ale poptávka se pouze zapíše do logu serveru.

Formulář obsahuje ochranu proti spamu (honeypot) a validaci na serveru.

## Nasazení na Vercel

1. Nahrajte repozitář na GitHub.
2. Na [vercel.com](https://vercel.com/) → **Add New Project** → importujte repo.
3. V **Settings → Environment Variables** nastavte proměnné z tabulky výše.
4. **Deploy.** Vercel detekuje Next.js automaticky, žádná další konfigurace
   není potřeba.
5. V **Settings → Domains** připojte vlastní doménu (např.
   `chalupa-rockytnice.cz`).

## Struktura projektu

```
app/
  layout.tsx              kořenový layout, SEO metadata
  page.tsx                složení sekcí stránky
  globals.css             Tailwind + komponentní styly
  api/
    availability/route.ts  načtení obsazenosti z e-chalupy iCal
    reservation/route.ts   příjem a odeslání poptávky
components/                jednotlivé sekce (Hero, Galerie, Kalendář…)
lib/
  content.ts              VŠECHNY texty, ceny a kontakty
  ical.ts                 parser iCalendar
  dates.ts                práce s daty
```
