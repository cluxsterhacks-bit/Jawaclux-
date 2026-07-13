import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { Mail, Lock, User as UserIcon, Phone } from "lucide-react";

const searchSchema = z.object({
  redirect: z.string().optional(),
  ref: z.string().optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign In or Sign Up — Jawaclux Creations" },
      { name: "description", content: "Sign in to your Jawaclux Creations account or create one to book sessions, track orders, and join the affiliate program." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect, ref, mode } = useSearch({ from: "/auth" });
  const [tab, setTab] = useState<"signin" | "signup">(mode ?? "signin");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "", phone: "" });
  const nav = useNavigate();
  const { session, loading } = useAuth();

  useEffect(() => {
    if (!loading && session) nav({ to: redirect ?? "/dashboard" });
  }, [session, loading, redirect, nav]);

  useEffect(() => {
    if (ref) localStorage.setItem("jawaclux_ref", ref.toUpperCase());
  }, [ref]);

  const storedRef = typeof window !== "undefined" ? localStorage.getItem("jawaclux_ref") ?? undefined : undefined;

  async function onSignUp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: form.full_name, phone: form.phone, ref: storedRef },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — check your email if confirmation is required.");
    localStorage.removeItem("jawaclux_ref");
  }

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
  }

  async function onGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    setBusy(false);
    if (result.error) toast.error(result.error.message);
  }

  return (
    <Layout>
      <section className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-16">
        <div className="w-full rounded-2xl border border-border-dark bg-surface p-6 md:p-8">
          <h1 className="text-display text-3xl font-extrabold uppercase tracking-wider text-white">
            {tab === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {tab === "signin" ? "Sign in to manage bookings and referrals." : "Join and start earning with referrals."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-md border border-border-dark p-1">
            {(["signin", "signup"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={"rounded-sm px-3 py-2 text-xs font-bold uppercase tracking-wider " + (tab === t ? "bg-gold text-black" : "text-white/70 hover:text-white")}>
                {t === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <button onClick={onGoogle} disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-md border border-border-gold bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gold hover:text-black disabled:opacity-50">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12.2c0-.8-.1-1.6-.2-2.3H12v4.5h5.6c-.2 1.3-1 2.4-2 3.2v2.6h3.3c1.9-1.8 3.1-4.4 3.1-8z"/><path fill="currentColor" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H2.9v2.6C4.6 19.9 8 22 12 22z"/><path fill="currentColor" d="M6.4 13.9c-.2-.6-.3-1.3-.3-1.9s.1-1.3.3-1.9V7.5H2.9C2.3 8.9 2 10.4 2 12s.3 3.1.9 4.5l3.5-2.6z"/><path fill="currentColor" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9C17 3 14.7 2 12 2 8 2 4.6 4.1 2.9 7.5l3.5 2.6C7.2 7.8 9.4 6 12 6z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/40">
            <div className="h-px flex-1 bg-border-dark" />or<div className="h-px flex-1 bg-border-dark" />
          </div>

          <form onSubmit={tab === "signin" ? onSignIn : onSignUp} className="space-y-3">
            {tab === "signup" && (
              <>
                <Field icon={UserIcon} placeholder="Full name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} required />
                <Field icon={Phone} placeholder="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              </>
            )}
            <Field icon={Mail} type="email" placeholder="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field icon={Lock} type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required />

            {tab === "signup" && storedRef && (
              <div className="rounded-md border border-border-gold bg-gold/5 px-3 py-2 text-xs text-gold">
                Referral code applied: <b>{storedRef}</b>
              </div>
            )}

            <button type="submit" disabled={busy} className="btn-gold w-full rounded-md px-6 py-3 text-sm uppercase tracking-wider disabled:opacity-50">
              {busy ? "Please wait…" : tab === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/50">
            <Link to="/" className="hover:text-gold">← Back to home</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}

type FieldProps = {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};
function Field({ icon: Icon, onChange, ...rest }: FieldProps) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
      <input {...rest} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border-dark bg-black py-3 pl-10 pr-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-hidden" />
    </div>
  );
}
