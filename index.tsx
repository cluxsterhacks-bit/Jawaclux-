import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Image as ImageIcon, ShieldCheck, Clock, Tag, Headphones, Star, Quote } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { SERVICES, GALLERY } from "@/lib/services";
import heroCamera from "@/assets/hero-camera.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const FEATURES = [
  { icon: ShieldCheck, title: "Premium Quality", desc: "Top-notch equipment and professional service" },
  { icon: Clock, title: "Fast Delivery", desc: "Quick turnaround time without compromising quality" },
  { icon: Tag, title: "Affordable Prices", desc: "Best quality at pocket-friendly prices" },
  { icon: Headphones, title: "Customer Support", desc: "We're always here to serve you better" },
];

const STATS = [
  { value: "1,200+", label: "Happy Clients" },
  { value: "5,000+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "24/7", label: "Customer Support" },
];

const TESTIMONIALS = [
  { name: "Chidera O.", role: "Bride", quote: "Jawaclux captured every moment of our wedding beautifully. The prints came out stunning." },
  { name: "Emeka N.", role: "Business Owner", quote: "My banners and business cards look premium. Fast delivery and great pricing." },
  { name: "Grace A.", role: "Graduate", quote: "Best passport and graduation photos I've ever taken. Highly recommended!" },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border-dark bg-bg">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold" />
              Capturing Moments, Creating Memories
            </div>
            <h1 className="text-display text-5xl font-extrabold uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
              We Capture <br />
              Moments That <br />
              <span className="text-gold">Last Forever</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65">
              We are a professional photography, printing and media company committed to capturing your best moments and delivering quality prints that stand the test of time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services" className="btn-gold inline-flex items-center gap-2 rounded-md px-7 py-4 text-sm uppercase tracking-wider">
                Our Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/gallery" className="btn-outline-gold inline-flex items-center gap-2 rounded-md px-7 py-4 text-sm uppercase tracking-wider">
                View Gallery <ImageIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-linear-to-br from-gold/20 via-transparent to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border-gold">
              <img
                src={heroCamera}
                alt="Professional camera in studio"
                width={1600}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border-dark bg-border-dark sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4 bg-black p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border-gold text-gold">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-display text-sm font-bold uppercase tracking-widest text-white">
                    {f.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-cream py-20 text-cream-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-14 text-center">
            <div className="divider-gold inline-block">
              <h2 className="text-display text-4xl font-extrabold uppercase tracking-wider md:text-5xl">
                Our Services
              </h2>
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-sm text-black/60">
              A complete studio for every visual need — from portraits and weddings to banners, branding and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SERVICES.slice(0, 8).map((s) => (
              <article key={s.slug} className="card-lift group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-gold text-black shadow-md">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-display text-lg font-bold uppercase leading-tight tracking-wide text-cream-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-md bg-black px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-gold hover:text-black">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border-dark bg-black py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-display text-4xl font-extrabold text-gold md:text-5xl">{s.value}</div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                Latest Work
              </div>
              <h2 className="mt-3 text-display text-4xl font-extrabold uppercase text-white md:text-5xl">
                From The <span className="text-gold">Studio</span>
              </h2>
            </div>
            <Link to="/gallery" className="text-sm font-bold uppercase tracking-wider text-gold hover:underline">
              Explore Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {GALLERY.slice(0, 8).map((g, i) => (
              <div
                key={i}
                className={
                  "group relative overflow-hidden rounded-xl border border-border-dark " +
                  (i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")
                }
              >
                <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold">{g.category}</div>
                  <div className="text-sm font-bold text-white">{g.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-border-dark bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-14 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Testimonials</div>
            <h2 className="mt-3 text-display text-4xl font-extrabold uppercase text-white md:text-5xl">
              What Clients <span className="text-gold">Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card-lift rounded-2xl border border-border-dark bg-black p-8">
                <Quote className="h-8 w-8 text-gold" />
                <p className="mt-4 text-sm leading-relaxed text-white/75">"{t.quote}"</p>
                <div className="mt-6 flex items-center justify-between border-t border-border-dark pt-4">
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-current" />))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border-dark bg-black py-24">
        <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-display text-5xl font-extrabold uppercase leading-none text-white md:text-6xl">
            Ready to create <br />
            <span className="text-gold">something iconic?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/60">
            Book your session or place an order today. Our team is ready to bring your vision to life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="btn-gold inline-flex rounded-md px-8 py-4 text-sm uppercase tracking-wider">
              Book Now
            </Link>
            <Link to="/contact" className="btn-outline-gold inline-flex rounded-md px-8 py-4 text-sm uppercase tracking-wider">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
