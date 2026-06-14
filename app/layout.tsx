import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} — pronájem horské chalupy, ${site.location}`,
  description:
    "Pronájem prostorné horské chalupy pro 2–20 osob v Dolní Rokytnici nad Jizerou v Krkonoších. Krb, kulečník, plně vybavená kuchyně. Online rezervace a kalendář dostupnosti.",
  keywords: [
    "chalupa Rokytnice nad Jizerou",
    "pronájem chalupy Krkonoše",
    "ubytování Dolní Rokytnice",
    "horská chalupa",
    "Chalupa ROCKytnice",
  ],
  openGraph: {
    title: `${site.name} — ${site.location}`,
    description:
      "Prostorná horská chalupa pro 2–20 osob v Krkonoších. Online rezervace a kalendář dostupnosti.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
