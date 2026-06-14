import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} — pronájem horské chalupy, ${site.location}`,
  description:
    "Pronájem prostorné horské chalupy až pro 20 osob v Dolní Rokytnici nad Jizerou v Krkonoších. Krb, kulečník, sedm pokojů. Online rezervace a kalendář dostupnosti.",
  keywords: [
    "chalupa Rokytnice nad Jizerou",
    "pronájem chalupy Krkonoše",
    "ubytování Dolní Rokytnice",
    "horská chalupa pro 20 osob",
    "Chalupa ROCKytnice",
  ],
  openGraph: {
    title: `${site.name} — ${site.location}`,
    description:
      "Prostorná horská chalupa až pro 20 osob v Krkonoších. Online rezervace a kalendář dostupnosti.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
