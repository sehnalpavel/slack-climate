import { NextResponse } from "next/server";

// DOČASNÝ endpoint – načte inzerát na e-chalupy ze serveru (Vercel) a vytáhne
// z HTML adresy fotek. Po stažení galerie ho zase odstraníme.
export const dynamic = "force-dynamic";

const LISTING =
  "https://www.e-chalupy.cz/ubytovani-dolni-rokytnice-nad-jizerou-chalupa-rockytnice-o2981";

export async function GET() {
  try {
    const res = await fetch(LISTING, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "cs-CZ,cs;q=0.9,en;q=0.8",
        Referer: "https://www.e-chalupy.cz/",
      },
      redirect: "follow",
    });

    const html = await res.text();

    // Posbírej všechny adresy obrázků (i z atributů src/data-src a JSON bloků).
    const urls = new Set<string>();
    const re = /https?:\\?\/\\?\/[^"'\s)\\]+?\.(?:jpe?g|png|webp)/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) {
      urls.add(m[0].replace(/\\/g, ""));
    }
    // Relativní cesty /fotky/... → doplň doménu
    const reRel = /["'(](\/[^"'\s)]+?\.(?:jpe?g|png|webp))/gi;
    while ((m = reRel.exec(html))) {
      urls.add("https://www.e-chalupy.cz" + m[1]);
    }

    const all = Array.from(urls);
    // Fotky galerie typicky obsahují ID objektu nebo cestu k fotkám.
    const gallery = all.filter((u) => /2981|fotk|gallery|galerie|/i.test(u) && /\.(jpe?g|png|webp)/i.test(u));

    return NextResponse.json({
      httpStatus: res.status,
      htmlLength: html.length,
      totalImages: all.length,
      galleryGuess: gallery,
      allImages: all,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 200 });
  }
}
