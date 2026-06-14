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
| `ECHALUPY_ICAL_URL` | Odkaz na iCal export obsazenosti z e-chalupy.cz |
| `RESERVATION_EMAIL` | Kam chodí poptávky z formuláře |
| `RESEND_API_KEY` | API klíč Resend pro odesílání e-mailů (volitelné) |
| `RESEND_FROM` | Odesílací adresa na ověřené doméně v Resendu |

## Synchronizace kalendáře s e-chalupy.cz

Web čte obsazenost přímo z vašeho kalendáře na e-chalupy.cz, takže obsazené
termíny se na webu zobrazí automaticky a hosté je nemohou poptat.

**Získání odkazu (export z e-chalupy → web):**

1. Přihlaste se do klientské administrace e-chalupy.cz.
2. Otevřete sekci **OBSAZENOST** → řádek **Synchronizace kalendářů** → **EXPORT**.
   (Přímý odkaz: <https://klient.e-chalupy.cz/obsazenost-export-ics/>.)
3. Zvolte variantu **„včetně podrobností"** a klikněte na **Zkopírovat odkaz**.
   > ⚠️ Variantu *bez* detailů nepoužívejte — vrací chybná data.
4. Tento odkaz vložte do proměnné `ECHALUPY_ICAL_URL`.

Kalendář se obnovuje automaticky každou hodinu (cache).

**Obousměrná synchronizace (rezervace z webu → e-chalupy):**

E-chalupy.cz umí i import cizích kalendářů. Pokud chcete, aby se potvrzené
rezervace z tohoto webu propsaly zpět do e-chalupy, je potřeba doplnit
veřejný iCal *export* z tohoto webu a vložit ho do importu v e-chalupy.
Aktuálně web zatím nemá perzistentní úložiště rezervací (poptávky chodí
e-mailem), takže potvrzené pobyty zadávejte do obsazenosti e-chalupy ručně,
nebo si řekněte o doplnění databáze rezervací s vlastním iCal exportem.

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
