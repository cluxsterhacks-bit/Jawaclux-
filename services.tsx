import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "./about";
import { SERVICES, CATEGORIES } from "@/lib/services";
import { Search, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Jawaclux Creations" },
      { name: "description", content: "Explore all photography, printing, branding and media services from Jawaclux Creations in Ebonyi State, Nigeria." },
      { property: "og:title", content: "Our Services — Jawaclux Creations" },
      { property: "og:description", content: "Portraits, weddings, drone, printing, branding and full media coverage." },
    ],
  }),
  component: Services,
});

function Services() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () =>
      SERVICES.filter(
        (s) =>
          (cat === "All" || s.category === cat) &&
          (q === "" || s.title.toLowerCase().includes(q.toLowerCase()) || s.desc.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, cat]
  );

  return (
    <Layout>
      <PageHero title="Our Services" crumb="Home / Services" />

      <section className="bg-bg py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
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
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services…"
                className="w-full rounded-md border border-border-dark bg-surface py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <article key={s.slug} className="card-lift group overflow-hidden rounded-2xl border border-border-dark bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-gold backdrop-blur-md">
                    {s.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-display text-xl font-bold uppercase tracking-wider text-white">{s.title}</h3>
                    <div className="shrink-0 rounded-md border border-border-gold px-2 py-1 text-[11px] font-bold text-gold">
                      From {s.priceFrom}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.desc}</p>
                  <Link to="/booking" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold hover:underline">
                    Book Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-border-dark bg-surface py-16 text-center text-white/50">
              No services match your search.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
