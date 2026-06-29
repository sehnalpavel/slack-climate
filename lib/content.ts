/**
 * Centrální konfigurace obsahu webu Chalupy ROCKytnice.
 * Veškeré texty, ceny, vybavení a kontakty se upravují zde.
 */

export const site = {
  name: "Chalupa ROCKytnice",
  tagline: "Horská chalupa s rockovým duchem v srdci Krkonoš",
  location: "Dolní Rokytnice nad Jizerou",
  region: "Krkonoše",
  address: "Dolní Rokytnice 381, 512 44 Rokytnice nad Jizerou",
  gps: { lat: 50.72499, lng: 15.43615 },
  echalupyUrl:
    "https://www.e-chalupy.cz/ubytovani-dolni-rokytnice-nad-jizerou-chalupa-rockytnice-o2981",
};

export const contact = {
  // Upravte na své reálné údaje
  phone: "+420 000 000 000",
  email: "info@chalupa-rockytnice.cz",
  reservationEmail:
    process.env.RESERVATION_EMAIL || "info@chalupa-rockytnice.cz",
};

export const hero = {
  kicker: "Dolní Rokytnice nad Jizerou · Krkonoše",
  headline: "Chalupa ROCKytnice",
  subheadline:
    "Prostorná horská chalupa až pro 20 lidí na slunné zimní straně Rokytnice. Krb, kulečník, sedm pokojů a hory na dosah. Pořádná základna pro partu, rodinu i firmu.",
};

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "20", label: "lůžek" },
  { value: "7", label: "pokojů" },
  { value: "2", label: "koupelny + 2 WC" },
  { value: "365", label: "dní v roce" },
];

export const about = {
  title: "Chalupa, co umí zahrát první housle",
  paragraphs: [
    "Chalupa ROCKytnice stojí na malebné zimní straně v Dolní Rokytnici nad Jizerou, jen pár kroků od Dolního náměstí. Je jako stvořená pro rodinné dovolené, srazy partí i firemní akce — prostě tam, kde se sejde víc lidí a chce to pohodu i pořádné zázemí.",
    "V přízemí vás čeká útulná společenská místnost s krbem a samostatný kulečníkový sál. K dispozici je plně vybavená kuchyně, dvě koupelny se sprchou a dvě oddělené toalety. Nahoře sedm pokojů s kapacitou až 20 lůžek.",
    "V zimě vytápěná chalupa kousek od sjezdovek, v létě výchozí bod na túry, výlety a cyklistiku v Krkonoších. Otevřeno celý rok.",
  ],
};

export type Amenity = { icon: string; label: string };

export const amenities: Amenity[] = [
  { icon: "users", label: "Kapacita až 20 osob" },
  { icon: "bed", label: "7 pokojů v patrech" },
  { icon: "fire", label: "Krb ve společenské místnosti" },
  { icon: "billiard", label: "Kulečníkový sál" },
  { icon: "kitchen", label: "Plně vybavená kuchyně" },
  { icon: "bath", label: "2 koupelny se sprchou + 2 WC" },
  { icon: "wifi", label: "WiFi zdarma" },
  { icon: "parking", label: "3 parkovací místa u chalupy" },
  { icon: "heating", label: "Topení a teplá voda v ceně" },
  { icon: "towel", label: "Povlečení, ručníky a mýdlo v ceně" },
];

export type Room = { name: string; beds: string; floor: string };

export const rooms = {
  title: "Pokoje a rozložení",
  intro:
    "Sedm pokojů ve dvou patrech — od komornějších po prostorné pro velké party. Dohromady až 20 lůžek.",
  list: [
    { name: "Pokoj „Riff“", beds: "3 lůžka", floor: "1. patro" },
    { name: "Pokoj „Bridge“", beds: "4 lůžka", floor: "1. patro" },
    { name: "Pokoj „Solo I“", beds: "privátní pokoj", floor: "1. patro" },
    { name: "Pokoj „Solo II“", beds: "privátní pokoj", floor: "1. patro" },
    { name: "Pokoj „Stage I“", beds: "5 lůžek", floor: "2. patro" },
    { name: "Pokoj „Stage II“", beds: "5 lůžek", floor: "2. patro" },
    { name: "Pokoj „Encore“", beds: "3 lůžka", floor: "2. patro" },
  ] as Room[],
  note: "Názvy pokojů jsou orientační — klidně je přejmenujte v lib/content.ts.",
};

export const gallery: { src: string; alt: string }[] = [
  { src: "/fotky/exterier-zima.webp", alt: "Chalupa ROCKytnice v zimě nad zasněženou Rokytnicí" },
  { src: "/fotky/spolecenska-1.webp", alt: "Společenská místnost s roubenými stěnami a dlouhými stoly" },
  { src: "/fotky/spolecenska-2.webp", alt: "Jídelna s krbem a dřevěným nábytkem" },
  { src: "/fotky/kuchyne.webp", alt: "Plně vybavená kuchyně" },
  { src: "/fotky/exterier-leto.webp", alt: "Chalupa ROCKytnice v létě s červenou střechou" },
];

export type PriceRow = { season: string; note: string; price: string };

export const pricing = {
  title: "Ceník",
  intro:
    "Cena je za celou chalupu a noc. Přesnou kalkulaci podle termínu a počtu osob potvrdíme na základě poptávky.",
  rows: [
    { season: "Hlavní sezóna", note: "Zimní prázdniny, Vánoce, Silvestr", price: "na vyžádání" },
    { season: "Vedlejší sezóna", note: "Jaro a podzim", price: "na vyžádání" },
    { season: "Letní sezóna", note: "Červenec a srpen", price: "na vyžádání" },
  ] as PriceRow[],
  footnote:
    "V ceně je povlečení, ručníky, mýdlo, energie, topení a teplá voda. Vratná kauce a poplatek za závěrečný úklid podle dohody.",
};

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

export type Faq = { q: string; a: string };

export const faq = {
  title: "Časté dotazy",
  items: [
    {
      q: "Pro kolik lidí je chalupa vhodná?",
      a: "Až pro 20 osob v sedmi pokojích. Ideální pro velké rodiny, party přátel i firemní akce.",
    },
    {
      q: "Co je v ceně?",
      a: "Povlečení, ručníky, mýdlo, energie, topení a teplá voda. Vratná kauce a závěrečný úklid se řeší podle dohody.",
    },
    {
      q: "Jak probíhá rezervace?",
      a: "Vyberete termín v kalendáři dostupnosti a odešlete nezávaznou poptávku. Obratem se ozveme s potvrzením a cenovou nabídkou. Rezervace platí po potvrzení a uhrazení zálohy.",
    },
    {
      q: "Je možné parkovat u chalupy?",
      a: "Ano, přímo u chalupy jsou tři parkovací místa.",
    },
    {
      q: "Dá se přijet i mimo sezónu?",
      a: "Jasně, chalupa je otevřená celý rok. V zimě je vytápěná a kousek od sjezdovek, v létě je výchozím bodem na túry a výlety.",
    },
  ] as Faq[],
};
