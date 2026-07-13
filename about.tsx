import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Award, Eye, Target, Users, CheckCircle2 } from "lucide-react";
import heroCamera from "@/assets/hero-camera.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Jawaclux Creations" },
      { name: "description", content: "Learn about Jawaclux Creations — a premium photography, printing and media studio based in Edda, Ebonyi State, Nigeria." },
      { property: "og:title", content: "About Jawaclux Creations" },
      { property: "og:description", content: "Our story, mission, and the team behind Ebonyi's premier photography and media studio." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <PageHero title="About Us" crumb="Home / About" />

      <section className="bg-bg py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-gold/10 blur-2xl" />
            <img src={heroCamera} alt="Studio" className="rounded-2xl border border-border-gold" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Our Story</div>
            <h2 className="mt-3 text-display text-4xl font-extrabold uppercase text-white md:text-5xl">
              A Studio Built on <span className="text-gold">Passion</span>
            </h2>
            <p className="mt-6 text-white/65 leading-relaxed">
              Jawaclux Creations is a premium photography, printing, branding and media company based in Edda, Ebonyi State, Nigeria. What started as a small passion for visual storytelling has grown into a full-service creative studio trusted by hundreds of clients across the region.
            </p>
            <p className="mt-4 text-white/65 leading-relaxed">
              From intimate portraits and passport photos to grand wedding coverage, large-format printing and complete brand identity systems, we bring together professional equipment, seasoned technique, and genuine care for our clients.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/75">
              {["10+ years of combined studio experience", "Modern equipment and professional workflow", "Serving Ebonyi and surrounding states"].map((i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> {i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border-dark bg-surface py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", desc: "To capture life's most meaningful moments and deliver print and media products that clients are proud to display, share and cherish for a lifetime." },
            { icon: Eye, title: "Our Vision", desc: "To become Ebonyi State's most trusted creative studio — known for quality, professionalism and a deeply personal client experience." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-border-dark bg-black p-8">
              <div className="grid h-14 w-14 place-items-center rounded-md border border-border-gold text-gold"><b.icon className="h-6 w-6" /></div>
              <h3 className="mt-6 text-display text-2xl font-bold uppercase tracking-wider text-white">{b.title}</h3>
              <p className="mt-3 text-white/60 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-bg py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Why Choose Us</div>
            <h2 className="mt-3 text-display text-4xl font-extrabold uppercase text-white md:text-5xl">
              What Sets Us <span className="text-gold">Apart</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Award Quality", desc: "Recognized craftsmanship in every print." },
              { icon: Users, title: "Expert Team", desc: "Photographers, designers and print specialists." },
              { icon: Target, title: "On-Time Delivery", desc: "Reliable turnarounds you can plan around." },
              { icon: Eye, title: "Creative Vision", desc: "We tell your story, not just take photos." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-border-dark bg-surface p-6">
                <div className="grid h-12 w-12 place-items-center rounded-md border border-border-gold text-gold">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-display text-lg font-bold uppercase tracking-wider text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/booking" className="btn-gold inline-flex rounded-md px-8 py-4 text-sm uppercase tracking-wider">Book a Session</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export function PageHero({ title, crumb }: { title: string; crumb: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border-dark bg-black py-20">
      <div className="absolute inset-0 bg-linear-to-br from-gold/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{crumb}</div>
        <h1 className="mt-3 text-display text-5xl font-extrabold uppercase text-white md:text-6xl">
          {title}
        </h1>
        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gold" />
      </div>
    </section>
  );
}
