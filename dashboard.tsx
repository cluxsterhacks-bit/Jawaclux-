import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Copy, Users, DollarSign, Calendar, Share2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — Jawaclux Creations" }] }),
  component: Dashboard,
});

type Profile = { id: string; full_name: string | null; email: string | null; referral_code: string; phone: string | null };
type Booking = { id: string; service_title: string; status: string; event_date: string | null; created_at: string; price: number | null };
type Commission = { id: string; amount: number; status: string; created_at: string };

function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [refCount, setRefCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: p }, { data: b }, { data: c }, { count }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("bookings").select("id,service_title,status,event_date,created_at,price").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("commissions").select("id,amount,status,created_at").eq("affiliate_id", user.id).order("created_at", { ascending: false }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("referred_by", user.id),
      ]);
      setProfile(p as Profile);
      setBookings((b as Booking[]) ?? []);
      setCommissions((c as Commission[]) ?? []);
      setRefCount(count ?? 0);
    })();
  }, [user]);

  const totalEarned = commissions.filter((c) => c.status === "paid").reduce((s, c) => s + Number(c.amount), 0);
  const pending = commissions.filter((c) => c.status === "pending" || c.status === "approved").reduce((s, c) => s + Number(c.amount), 0);
  const link = profile ? `${window.location.origin}/?ref=${profile.referral_code}` : "";

  const copy = () => { navigator.clipboard.writeText(link); toast.success("Referral link copied"); };
  const share = async () => {
    if (navigator.share) await navigator.share({ title: "Jawaclux Creations", text: "Book premium photography with my link", url: link });
    else copy();
  };

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 className="text-display text-4xl font-extrabold uppercase tracking-wider text-white">
          Hi, <span className="text-gold">{profile?.full_name ?? "there"}</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">Manage your bookings and referral earnings.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Stat icon={Calendar} label="Bookings" value={bookings.length} />
          <Stat icon={Users} label="Referrals" value={refCount} />
          <Stat icon={DollarSign} label="Earned (Paid)" value={`₦${totalEarned.toLocaleString()}`} />
          <Stat icon={DollarSign} label="Pending" value={`₦${pending.toLocaleString()}`} />
        </div>

        {/* Referral card */}
        <div className="mt-8 rounded-2xl border border-border-gold bg-linear-to-b from-gold/10 to-transparent p-6 md:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Affiliate Program</div>
          <h2 className="mt-2 text-display text-2xl font-bold uppercase text-white">Earn 10% on every referred booking</h2>
          <p className="mt-2 text-sm text-white/60">Share your link. When someone signs up and completes a booking, you earn a commission.</p>
          <div className="mt-5 flex flex-col gap-2 md:flex-row">
            <div className="flex-1 truncate rounded-md border border-border-dark bg-black px-4 py-3 text-sm text-white/80">{link}</div>
            <button onClick={copy} className="btn-outline-gold flex items-center gap-2 rounded-md border border-border-gold px-4 py-3 text-sm text-white hover:bg-gold hover:text-black"><Copy className="h-4 w-4" /> Copy</button>
            <button onClick={share} className="btn-gold flex items-center gap-2 rounded-md px-4 py-3 text-sm"><Share2 className="h-4 w-4" /> Share</button>
          </div>
          <div className="mt-4 text-xs text-white/50">Your code: <span className="font-mono text-gold">{profile?.referral_code}</span></div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Panel title="My Bookings">
            {bookings.length === 0 ? <Empty text="No bookings yet." /> : (
              <ul className="divide-y divide-border-dark">
                {bookings.map((b) => (
                  <li key={b.id} className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{b.service_title}</div>
                      <div className="text-xs text-white/50">{b.event_date ?? new Date(b.created_at).toLocaleDateString()}</div>
                    </div>
                    <StatusPill status={b.status} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Commission History">
            {commissions.length === 0 ? <Empty text="No commissions yet — start sharing your link." /> : (
              <ul className="divide-y divide-border-dark">
                {commissions.map((c) => (
                  <li key={c.id} className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm font-semibold text-gold">₦{Number(c.amount).toLocaleString()}</div>
                      <div className="text-xs text-white/50">{new Date(c.created_at).toLocaleDateString()}</div>
                    </div>
                    <StatusPill status={c.status} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-dark bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-widest text-white/50">{label}</div>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="mt-2 text-display text-3xl font-extrabold text-white">{value}</div>
    </div>
  );
}
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-dark bg-surface p-6">
      <h3 className="text-display text-lg font-bold uppercase tracking-wider text-white">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
function Empty({ text }: { text: string }) { return <div className="rounded-md border border-dashed border-border-dark py-8 text-center text-sm text-white/50">{text}</div>; }
export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
    confirmed: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    in_progress: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    completed: "border-green-500/40 text-green-400 bg-green-500/10",
    cancelled: "border-red-500/40 text-red-400 bg-red-500/10",
    paid: "border-green-500/40 text-green-400 bg-green-500/10",
    approved: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    rejected: "border-red-500/40 text-red-400 bg-red-500/10",
  };
  return <span className={"rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest " + (map[status] ?? "border-white/20 text-white/60")}>{status.replace("_", " ")}</span>;
}
