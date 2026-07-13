import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "./about";
import { SERVICES } from "@/lib/services";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { CheckCircle2, Calendar, Clock, MapPin, User, Mail, Phone, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Session — Jawaclux Creations" },
      { name: "description", content: "Reserve your photography or printing appointment with Jawaclux Creations. Fast confirmation, flexible dates." },
      { property: "og:title", content: "Book a Session — Jawaclux Creations" },
      { property: "og:description", content: "Book photography, video, printing or design services online." },
    ],
  }),
  component: Booking,
});

function Booking() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: SERVICES[0].title,
    date: "", time: "", location: "", notes: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const svc = SERVICES.find((s) => s.title === form.service) ?? SERVICES[0];
    const { error } = await supabase.from("bookings").insert({
      user_id: user?.id ?? null,
      service_slug: svc.slug,
      service_title: svc.title,
      full_name: form.name,
      email: form.email,
      phone: form.phone,
      event_date: form.date || null,
      event_time: form.time || null,
      location: form.location || null,
      notes: form.notes || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setSubmitted(true);
  };

  return (
    <Layout>
      <PageHero title="Book a Session" crumb="Home / Booking" />

      <section className="bg-bg py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-2xl border border-gold bg-linear-to-b from-gold/10 to-transparent p-10 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-black">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-display text-3xl font-extrabold uppercase text-white">Booking Received</h3>
                <p className="mt-3 text-white/70">
                  Thank you, <span className="text-gold">{form.name}</span>. We'll confirm your{" "}
                  <span className="text-gold">{form.service}</span> appointment on{" "}
                  <span className="text-gold">{form.date}</span> shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ ...form, name: "", email: "", phone: "", date: "", time: "", location: "", notes: "" }); }}
                  className="btn-gold mt-8 inline-flex rounded-md px-6 py-3 text-sm uppercase tracking-wider"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-2xl border border-border-dark bg-surface p-6 md:p-8">
                <h3 className="text-display text-2xl font-bold uppercase tracking-wider text-white">Session Details</h3>
                <p className="mt-2 text-sm text-white/60">Fill in your details and we'll get back to confirm.</p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field icon={User} label="Full Name" required>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Your name" />
                  </Field>
                  <Field icon={Phone} label="Phone" required>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+234…" />
                  </Field>
                  <Field icon={Mail} label="Email">
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="you@email.com" />
                  </Field>
                  <Field icon={MapPin} label="Location">
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="Studio or venue" />
                  </Field>
                  <Field label="Service" required>
                    <select required value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={inputCls}>
                      {SERVICES.map((s) => (<option key={s.slug} value={s.title}>{s.title}</option>))}
                    </select>
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field icon={Calendar} label="Date" required>
                      <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} />
                    </Field>
                    <Field icon={Clock} label="Time">
                      <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputCls} />
                    </Field>
                  </div>
                  <div className="md:col-span-2">
                    <Field icon={MessageSquare} label="Special Instructions">
                      <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} placeholder="Anything we should know?" />
                    </Field>
                  </div>
                </div>

                <button type="submit" disabled={busy} className="btn-gold mt-6 w-full rounded-md px-6 py-4 text-sm uppercase tracking-wider disabled:opacity-50">
                  {busy ? "Submitting…" : "Confirm Booking"}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border-dark bg-black p-6">
              <h4 className="text-display text-lg font-bold uppercase tracking-wider text-white">Need Help?</h4>
              <p className="mt-2 text-sm text-white/60">Reach us on WhatsApp for the fastest response.</p>
              <a href="https://wa.me/2348101234567" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-bold uppercase tracking-wider text-white">
                Chat on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl border border-border-dark bg-black p-6">
              <h4 className="text-display text-lg font-bold uppercase tracking-wider text-white">Studio Hours</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/60">
                <li className="flex justify-between"><span>Mon – Sat</span> <span className="text-white">8AM – 8PM</span></li>
                <li className="flex justify-between"><span>Sunday</span> <span className="text-white">12PM – 6PM</span></li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border-gold bg-linear-to-b from-gold/10 to-transparent p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Guarantee</div>
              <p className="mt-2 text-sm text-white/70">Free retakes on passport photos and 100% satisfaction on portrait sessions.</p>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

const inputCls =
  "w-full rounded-md border border-border-dark bg-black px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-hidden";

function Field({
  label, children, icon: Icon, required,
}: { label: string; children: React.ReactNode; icon?: React.ComponentType<{ className?: string }>; required?: boolean }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/70">
        {Icon && <Icon className="h-3.5 w-3.5 text-gold" />}
        {label} {required && <span className="text-gold">*</span>}
      </div>
      {children}
    </label>
  );
}
