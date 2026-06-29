# Chalupa ROCKytnice — web s rezervacemi

Webové stránky a rezervační systém horské chalupy **Chalupa ROCKytnice**
v Dolní Rokytnici nad Jizerou (Krkonoše).

🌐 **Web:** https://rockytnice.cz
🏔️ **Inzerát:** [e-chalupy.cz – objekt 2981](https://www.e-chalupy.cz/ubytovani-dolni-rokytnice-nad-jizerou-chalupa-rockytnice-o2981)

Web nabízí prezentaci objektu, **kalendář dostupnosti synchronizovaný
s Google kalendářem a e-chalupy.cz**, **rezervační poptávkový formulář**
s odesíláním e-mailů přes Resend, ceník, FAQ a fotogalerii.

---

## Technologie

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (tmavý „rockový" design)
- Nasazení na [Vercel](https://vercel.com/) (auto-deploy z GitHubu)
- [Resend](https://resend.com/) pro e-mailové poptávky
- `sharp` pro úpravu/optimalizaci fotek (build-time skript)

## Lokální spuštění

```bash
npm install
cp .env.example .env.local   # vyplňte hodnoty (viz níže)
npm run dev                  # http://localhost:3000
npm run build                # produkční build
```

## Proměnné prostředí

Nastavují se na Vercelu (**Settings → Environment Variables**), lokálně v `.env.local`.

| Proměnná | Význam |
| --- | --- |
| `GOOGLE_CALENDAR_ICAL_URL` | iCal odkaz Google kalendáře = **zdroj pravdy** o obsazenosti |
| `ECHALUPY_ICAL_URL` | (volitelné) základní iCal export z e-chalupy.cz – sloučí se s Googlem |
| `AVAILABILITY_ICAL_URLS` | (volitelné) další iCal zdroje oddělené čárkou |
| `RESEND_API_KEY` | API klíč Resend pro odesílání poptávek |
| `RESEND_FROM` | Odesílací adresa na ověřené doméně (`info@rockytnice.cz`) |
| `RESERVATION_EMAIL` | Schránka, kam chodí poptávky z formuláře |

> ⚠️ Hodnoty obsahující klíče/tokeny nikdy necommitujte do repozitáře (je veřejný).

---

## Synchronizace kalendáře

**Zdrojem pravdy je Google kalendář** „Chalupa ROCKytnice". Obsazenost spravujete
na jednom místě (v Google kalendáři) a propisuje se všude:

```
Google kalendář (master)
   ├──► web   (GOOGLE_CALENDAR_ICAL_URL)         – kalendář dostupnosti
   └──► e-chalupy.cz (Import ICAL)               – portál blokuje termíny

e-chalupy.cz ──► web (ECHALUPY_ICAL_URL)         – web ukáže i rezervace z portálu
```

- **Web → Google:** API `/api/availability` načítá iCal z `GOOGLE_CALENDAR_ICAL_URL`
  (+ volitelně další zdroje) a vrací obsazené noci. Cache ~1 h, ořez na budoucí termíny.
- **e-chalupy → Google sync:** v klientské sekci e-chalupy (objekt 2981) je
  v **Import kalendáře (ICAL)** vložený iCal odkaz Google kalendáře — e-chalupy si
  každé ~4 h natáhne obsazené termíny a vytvoří z nich rezervace.
- **e-chalupy → web:** `ECHALUPY_ICAL_URL` ukazuje na základní export e-chalupy
  (`https://www.e-chalupy.cz/api/calendar/<ID>/<TOKEN>/default.ics`, varianta
  „bez podrobností" — veřejná, bezpečná). Web slučuje Google i e-chalupy
  (termíny se nezdvojují).

Potvrzené poptávky z webu zapisujte do Google kalendáře — odtud se propíšou dál.

---

## Rezervační formulář

Host vybere termín v kalendáři (obsazené noci nejdou zvolit) a odešle nezávaznou
poptávku. API `/api/reservation`:

- Validuje vstup na serveru, obsahuje ochranu proti spamu (honeypot).
- S nastaveným `RESEND_API_KEY` odešle poptávku **e-mailem** na `RESERVATION_EMAIL`
  (s `reply_to` na e-mail hosta — lze rovnou odpovědět).
- Bez klíče poptávku jen zaloguje (web zůstane funkční).

---

## Úprava obsahu

Veškeré texty, ceny, vybavení, pokoje, FAQ a kontakty jsou na jednom místě:
[`lib/content.ts`](lib/content.ts). Není potřeba sahat do komponent.

### Fotky

Fotky leží v [`public/fotky/`](public/fotky) (WebP) a odkazují se z `lib/content.ts`
(`gallery`) a z komponent `Hero`, `About`, `Surroundings`.

Nové fotky se upravují skriptem se `sharp` (auto-prosvětlení, kontrast, doostření,
převod do WebP, odstranění EXIF). Postup: vložte zdrojové fotky, prožeňte je
skriptem do `public/fotky/`, doplňte cesty do `gallery` v `lib/content.ts`.

---

## Nasazení a doména

- **Hosting:** Vercel, projekt `rockytnice`. Každý push do produkční větve na GitHubu
  spustí build a nasazení.
- **Doména:** `rockytnice.cz` (A záznam na apex + CNAME pro `www`, DNS u registrátora;
  nameservery zůstávají u registrátora kvůli e-mailu). HTTPS certifikát řeší Vercel.
- **E-mail:** doména `rockytnice.cz` ověřená v Resendu (DKIM/SPF), příjem `info@rockytnice.cz`.

## Struktura projektu

```
app/
  layout.tsx               kořenový layout, SEO metadata, favicon, fonty
  page.tsx                 složení sekcí stránky
  globals.css              Tailwind + komponentní styly (tmavé téma)
  icon.svg / apple-icon.png / favicon.ico   favicon (ember štít)
  robots.ts / sitemap.ts   SEO
  api/
    availability/route.ts  obsazenost z Google (+ e-chalupy) iCal, sloučení
    reservation/route.ts   příjem poptávky + odeslání přes Resend
components/                 sekce webu (Hero, About, Amenities, Rooms,
                            Gallery, Surroundings, Pricing, Faq,
                            BookingSection, Nav, Footer, Icon, Reveal)
lib/
  content.ts               VŠECHEN obsah – texty, ceny, pokoje, FAQ, kontakty
  ical.ts                  parser iCalendar
  dates.ts                 práce s daty
public/fotky/              fotografie chalupy (WebP)
```
