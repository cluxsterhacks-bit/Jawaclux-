import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "./about";
import { GALLERY } from "@/lib/services";
import { X } from "lucide-react";

const CATS = ["All", "Portraits", "Wedding", "Events", "Corporate", "Studio", "Drone", "Printing"] as const;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Jawaclux Creations" },
      { name: "description", content: "Browse our portfolio of portraits, weddings, events, drone and studio photography." },
      { property: "og:title", content: "Gallery — Jawaclux Creations" },
      { property: "og:description", content: "See our latest photography and print work from Ebonyi State, Nigeria." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat)),
    [cat]
  );

  return (
    <Layout>
      <PageHero title="Gallery" crumb="Home / Gallery" />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={
                  "rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors " +
                  (cat === c
                    ? "border-gold bg-gold text-black"
                    : "border-border-gold text-white/70 hover:border-gold hover:text-white")
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {items.map((g, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border-dark"
              >
                <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold">{g.category}</div>
                  <div className="text-sm font-bold text-white">{g.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-border-gold bg-black text-gold"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={items[lightbox].image} alt={items[lightbox].title} className="max-h-[85vh] max-w-full rounded-lg" />
        </div>
      )}
    </Layout>
  );
}
