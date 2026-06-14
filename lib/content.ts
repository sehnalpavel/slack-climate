/**
 * Centrální konfigurace obsahu webu Chalupy ROCKytnice.
 * Veškeré texty, ceny a kontaktní údaje se upravují zde.
 */

export const site = {
  name: "Chalupa ROCKytnice",
  tagline: "Horská chalupa v srdci Krkonoš",
  location: "Dolní Rokytnice nad Jizerou",
  region: "Krkonoše",
  // Inzerát na portálu e-chalupy.cz
  echalupyUrl:
    "https://www.e-chalupy.cz/ubytovani-dolni-rokytnice-nad-jizerou-chalupa-rockytnice-o2981",
};

export const contact = {
  // Upravte na své reálné údaje
  phone: "+420 000 000 000",
  email: "info@chalupa-rockytnice.cz",
  // Kam mají chodit poptávky z rezervačního formuláře.
  // Pokud není nastaveno, použije se hodnota výše.
  reservationEmail:
    process.env.RESERVATION_EMAIL || "info@chalupa-rockytnice.cz",
};

export const hero = {
  headline: "Chalupa ROCKytnice",
  subheadline:
    "Prostorná horská chalupa pro 2 až 20 osob na slunné zimní straně Dolní Rokytnice nad Jizerou. Krb, kulečník, výhledy na hřebeny Krkonoš.",
};

export const about = {
  title: "O chalupě",
  paragraphs: [
    "Chalupa ROCKytnice stojí na malebné zimní straně v Dolní Rokytnici nad Jizerou, jen pár kroků od Dolního náměstí. Je ideální pro rodinné dovolené, sraz přátel i firemní akce.",
    "V přízemí na vás čeká útulná společenská místnost s krbem a samostatný kulečníkový sál. K dispozici je plně vybavená kuchyně, dvě koupelny a dvě oddělené toalety.",
    "Chalupa nabízí komfortní ubytování po celý rok — v zimě vytápěná a kousek od sjezdovek, v létě výchozí bod na túry, výlety a cyklistiku v Krkonoších.",
  ],
};

export type Amenity = { icon: string; label: string };

export const amenities: Amenity[] = [
  { icon: "users", label: "Kapacita 2–20 osob" },
  { icon: "bed", label: "5 ložnic" },
  { icon: "fire", label: "Krb ve společenské místnosti" },
  { icon: "billiard", label: "Kulečníkový sál" },
  { icon: "kitchen", label: "Plně vybavená kuchyně" },
  { icon: "bath", label: "2 koupelny a 2 WC" },
  { icon: "wifi", label: "WiFi zdarma" },
  { icon: "parking", label: "3 parkovací místa u chalupy" },
  { icon: "heating", label: "Topení a teplá voda v ceně" },
  { icon: "towel", label: "Povlečení, ručníky a mýdlo v ceně" },
];

export type PriceRow = { season: string; note: string; price: string };

export const pricing = {
  title: "Ceník",
  intro:
    "Cena je uváděna za celou chalupu a noc. Konečnou kalkulaci podle termínu a počtu osob vám rádi potvrdíme na základě poptávky.",
  rows: [
    {
      season: "Hlavní sezóna",
      note: "Zimní prázdniny, Vánoce, Silvestr",
      price: "na vyžádání",
    },
    {
      season: "Vedlejší sezóna",
      note: "Jaro a podzim",
      price: "na vyžádání",
    },
    {
      season: "Letní sezóna",
      note: "Červenec a srpen",
      price: "na vyžádání",
    },
  ] as PriceRow[],
  footnote:
    "V ceně je povlečení, ručníky, mýdlo, energie, topení a teplá voda. Vratná kauce a poplatek za závěrečný úklid podle dohody.",
};

export const gallery: { src: string; alt: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=70",
    alt: "Horská chalupa v zimě",
  },
  {
    src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=70",
    alt: "Útulný interiér s krbem",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70",
    alt: "Ložnice s výhledem",
  },
  {
    src: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&w=1200&q=70",
    alt: "Vybavená kuchyně",
  },
  {
    src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1200&q=70",
    alt: "Krkonošská příroda",
  },
  {
    src: "https://images.unsplash.com/photo-1486890093247-c9a1de0a86d2?auto=format&fit=crop&w=1200&q=70",
    alt: "Hřebeny Krkonoš",
  },
];

export const surroundings = {
  title: "Okolí a výlety",
  items: [
    "Sjezdovky a lyžařský areál Rokytnice nad Jizerou",
    "Dolní náměstí s obchody a restauracemi pár kroků od chalupy",
    "Výchozí bod na túry do Krkonošského národního parku",
    "Cyklotrasy a Singltrek pod Smrkem v dosahu",
    "Vodopády Jizery a rozhledny v okolí",
  ],
};
