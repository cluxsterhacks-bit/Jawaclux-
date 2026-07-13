import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "./about";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Jawaclux Creations" },
      { name: "description", content: "Get in touch with Jawaclux Creations in Edda, Ebonyi State, Nigeria. Phone, WhatsApp, email and studio location." },
      { property: "og:title", content: "Contact Jawaclux Creations" },
      { property: "og:description", content: "Reach our studio in Edda, Ebonyi State — phone, WhatsApp, email." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <Layout>
      <PageHero title="Contact Us" crumb="Home / Contact" />

      <section className="bg-bg py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-3">
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: "Edda, Ebonyi State, Nigeria" },
              { icon: Phone, label: "Phone", value: "+234 810 123 4567", href: "tel:+2348101234567" },
              { icon: Mail, label: "Email", value: "jawacluxcreations@gmail.com", href: "mailto:jawacluxcreations@gmail.com" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/2348101234567" },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-border-dark bg-surface p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border-gold text-gold">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-white/50">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block break-words text-sm font-semibold text-white hover:text-gold">
                        {c.value}
                      </a>
                    ) : (
                      <div className="mt-1 text-sm font-semibold text-white">{c.value}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-border-dark bg-surface p-6">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/50">Follow Us</div>
              <div className="mt-3 flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: MessageCircle, href: "https://wa.me/2348101234567", label: "WhatsApp" },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-md border border-border-gold text-white transition-colors hover:bg-gold hover:text-black">
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {sent ? (
              <div className="rounded-2xl border border-gold bg-linear-to-b from-gold/10 to-transparent p-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-black">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-display text-3xl font-extrabold uppercase text-white">Message Sent</h3>
                <p className="mt-3 text-white/70">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => { e.preventDefault(); const { error } = await supabase.from("contact_messages").insert({ full_name: form.name, email: form.email, subject: form.subject || null, message: form.message }); if (error) return toast.error(error.message); setSent(true); }}
                className="rounded-2xl border border-border-dark bg-surface p-6 md:p-8"
              >
                <h3 className="text-display text-2xl font-bold uppercase tracking-wider text-white">Send a Message</h3>
                <p className="mt-2 text-sm text-white/60">We'd love to hear from you.</p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className={inputCls} />
                  <div className="md:col-span-2">
                    <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className={inputCls} />
                  </div>
                  <div className="md:col-span-2">
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message…" className={inputCls} />
                  </div>
                </div>
                <button type="submit" className="btn-gold mt-6 inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm uppercase tracking-wider">
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            )}

            <div className="mt-6 overflow-hidden rounded-2xl border border-border-dark">
              <iframe
                title="Jawaclux Creations location"
                src="https://www.google.com/maps?q=Edda%2C+Ebonyi+State%2C+Nigeria&output=embed"
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const inputCls =
  "w-full rounded-md border border-border-dark bg-black px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-hidden";
