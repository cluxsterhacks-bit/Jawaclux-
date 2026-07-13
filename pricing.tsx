import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "./about";
import { Check, Star } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Price List — Jawaclux Creations" },
      { name: "description", content: "Transparent pricing for photography, printing, video coverage, branding and design services in Ebonyi State." },
      { property: "og:title", content: "Price List — Jawaclux Creations" },
      { property: "og:description", content: "Simple, transparent pricing for all our services." },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Passport & Prints",
    price: "₦2,000",
    unit: "starting",
    popular: false,
    features: ["Standard passport photos", "Instant delivery", "Digital & print copies", "Multiple sizes available", "Free retakes if needed"],
  },
  {
    name: "Portrait Session",
    price: "₦25,000",
    unit: "per session",
    popular: true,
    features: ["1-hour studio session", "20+ edited digital photos", "5 printed portraits", "Multiple outfit changes", "Professional retouching", "Online gallery"],
  },
  {
    name: "Wedding Coverage",
    price: "₦250,000",
    unit: "per event",
    popular: false,
    features: ["Full-day coverage", "2 photographers", "Video highlights reel", "500+ edited photos", "Printed album included", "Drone shots included"],
  },
];

const OTHER = [
  { name: "Frameless Acrylic Portrait", price: "From ₦18,000" },
  { name: "Banner Printing (per sqm)", price: "From ₦2,500" },
  { name: "Business Cards (100 pcs)", price: "₦8,000" },
  { name: "T-Shirt Printing", price: "From ₦3,000" },
  { name: "Mug Printing", price: "₦2,500" },
  { name: "Roll-up Banner", price: "From ₦18,000" },
  { name: "Flyers (1000 pcs)", price: "From ₦15,000" },
  { name: "Logo & Branding Kit", price: "From ₦50,000" },
];

function Pricing() {
  return (
    <Layout>
      <PageHero title="Price List" crumb="Home / Pricing" />

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={
                  "relative overflow-hidden rounded-2xl border p-8 " +
                  (p.popular ? "border-gold bg-linear-to-b from-gold/10 to-transparent" : "border-border-dark bg-surface")
                }
              >
                {p.popular && (
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                    <Star className="h-3 w-3 fill-current" /> Popular
                  </div>
                )}
                <h3 className="text-display text-2xl font-bold uppercase tracking-wider text-white">{p.name}</h3>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-display text-5xl font-extrabold text-gold">{p.price}</span>
                  <span className="pb-2 text-xs text-white/50">{p.unit}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-white/70">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={
                    "mt-8 inline-flex w-full items-center justify-center rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors " +
                    (p.popular ? "btn-gold" : "border border-border-gold text-white hover:bg-gold hover:text-black")
                  }
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <div className="mb-8 text-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">More Services</div>
              <h2 className="mt-3 text-display text-3xl font-extrabold uppercase text-white md:text-4xl">
                Printing & <span className="text-gold">Design</span>
              </h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border-dark">
              {OTHER.map((o, i) => (
                <div
                  key={o.name}
                  className={"flex items-center justify-between gap-4 bg-surface p-5 " + (i > 0 ? "border-t border-border-dark" : "")}
                >
                  <span className="text-sm font-semibold text-white">{o.name}</span>
                  <span className="text-sm font-bold text-gold">{o.price}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-white/50">
              Prices are indicative and may vary based on size, quantity and finishing. Contact us for a personalized quote.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
