import { gallery } from "@/lib/content";

export default function Gallery() {
  return (
    <section id="galerie" className="bg-forest-800 py-20">
      <div className="container-x">
        <h2 className="section-title text-center text-white">Galerie</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-wood-100">
          Ukázkové fotografie. Nahraďte je prosím vlastními snímky chalupy.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((img, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
