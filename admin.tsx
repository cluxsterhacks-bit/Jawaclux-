import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusPill } from "./dashboard";
import { ShieldAlert, Users, Calendar, MessageSquare, DollarSign } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Jawaclux Creations" }] }),
  component: Admin,
});

type Booking = { id: string; user_id: string | null; service_title: string; full_name: string; email: string; phone: string; status: string; event_date: string | null; price: number | null; created_at: string; notes: string | null; location: string | null };
type Contact = { id: string; full_name: string; email: string; subject: string | null; message: string; is_read: boolean; created_at: string };
type Commission = { id: string; affiliate_id: string; amount: number; status: string; created_at: string };
type UserRow = { id: string; email: string | null; full_name: string | null; referral_code: string; created_at: string; referred_by: string | null };

function Admin() {
  const { isAdmin, loading, user } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (loading) return;
    setChecking(false);
    setAllowed(isAdmin);
  }, [isAdmin, loading]);

  if (checking || loading) return <Layout><div className="p-16 text-center text-white/50">Loading…</div></Layout>;

  if (!allowed) {
    return (
      <Layout>
        <div className="mx-auto max-w-md p-16 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-gold" />
          <h1 className="mt-4 text-display text-2xl font-bold uppercase text-white">Admin access required</h1>
          <p className="mt-2 text-sm text-white/60">Your account ({user?.email}) doesn't have admin privileges.</p>
          <p className="mt-4 text-xs text-white/50">To grant yourself admin: open the backend, go to Users → your user, and add an <b>admin</b> role in <code>user_roles</code>.</p>
          <Link to="/dashboard" className="btn-gold mt-6 inline-flex rounded-md px-6 py-3 text-sm uppercase tracking-wider">Back to dashboard</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <h1 className="text-display text-4xl font-extrabold uppercase tracking-wider text-white">Admin Panel</h1>
        <p className="mt-2 text-sm text-white/60">Manage bookings, users, messages and commissions.</p>

        <Tabs defaultValue="bookings" className="mt-8">
          <TabsList className="bg-surface">
            <TabsTrigger value="bookings"><Calendar className="mr-2 h-4 w-4" /> Bookings</TabsTrigger>
            <TabsTrigger value="messages"><MessageSquare className="mr-2 h-4 w-4" /> Messages</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" /> Users</TabsTrigger>
            <TabsTrigger value="commissions"><DollarSign className="mr-2 h-4 w-4" /> Commissions</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings"><BookingsTab /></TabsContent>
          <TabsContent value="messages"><MessagesTab /></TabsContent>
          <TabsContent value="users"><UsersTab /></TabsContent>
          <TabsContent value="commissions"><CommissionsTab /></TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}

function BookingsTab() {
  const [rows, setRows] = useState<Booking[]>([]);
  const load = async () => {
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setRows((data as Booking[]) ?? []);
  };
  useEffect(() => { load(); }, []);

  async function update(id: string, patch: Record<string, unknown>) {
    const { error } = await supabase.from("bookings").update(patch as never).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted"); load();
  }

  return (
    <Card>
      {rows.length === 0 ? <Empty text="No bookings yet." /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-white/50">
              <tr><th className="p-3">Customer</th><th className="p-3">Service</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Price (₦)</th><th className="p-3"></th></tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {rows.map((r) => (
                <tr key={r.id} className="text-white">
                  <td className="p-3"><div className="font-semibold">{r.full_name}</div><div className="text-xs text-white/50">{r.email} · {r.phone}</div></td>
                  <td className="p-3">{r.service_title}</td>
                  <td className="p-3 text-xs">{r.event_date ?? new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <select value={r.status} onChange={(e) => update(r.id, { status: e.target.value })} className="rounded-md border border-border-dark bg-black px-2 py-1 text-xs">
                      {["pending", "confirmed", "in_progress", "completed", "cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3">
                    <input type="number" defaultValue={r.price ?? ""} onBlur={(e) => { const v = e.target.value ? Number(e.target.value) : null; if (v !== r.price) update(r.id, { price: v }); }} className="w-24 rounded-md border border-border-dark bg-black px-2 py-1 text-xs" />
                  </td>
                  <td className="p-3 text-right"><button onClick={() => del(r.id)} className="text-xs text-red-400 hover:underline">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function MessagesTab() {
  const [rows, setRows] = useState<Contact[]>([]);
  const load = async () => { const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }); setRows((data as Contact[]) ?? []); };
  useEffect(() => { load(); }, []);

  async function toggle(r: Contact) { await supabase.from("contact_messages").update({ is_read: !r.is_read }).eq("id", r.id); load(); }
  async function del(id: string) { if (!confirm("Delete?")) return; await supabase.from("contact_messages").delete().eq("id", id); load(); }

  return (
    <Card>
      {rows.length === 0 ? <Empty text="No messages yet." /> : (
        <ul className="divide-y divide-border-dark">
          {rows.map((r) => (
            <li key={r.id} className={"p-4 " + (!r.is_read ? "bg-gold/5" : "")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">{r.full_name} <span className="text-white/40">·</span> <span className="text-xs text-white/60">{r.email}</span></div>
                  {r.subject && <div className="mt-0.5 text-xs uppercase tracking-widest text-gold">{r.subject}</div>}
                  <p className="mt-2 whitespace-pre-wrap text-sm text-white/70">{r.message}</p>
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-white/40">{new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <button onClick={() => toggle(r)} className="text-xs text-gold hover:underline">{r.is_read ? "Mark unread" : "Mark read"}</button>
                  <button onClick={() => del(r.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function UsersTab() {
  const [rows, setRows] = useState<UserRow[]>([]);
  useEffect(() => { supabase.from("profiles").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows((data as UserRow[]) ?? [])); }, []);
  return (
    <Card>
      {rows.length === 0 ? <Empty text="No users yet." /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] uppercase tracking-widest text-white/50"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Referral</th><th className="p-3">Joined</th></tr></thead>
            <tbody className="divide-y divide-border-dark text-white">
              {rows.map((r) => (
                <tr key={r.id}><td className="p-3">{r.full_name ?? "—"}</td><td className="p-3 text-xs">{r.email}</td><td className="p-3 font-mono text-xs text-gold">{r.referral_code}</td><td className="p-3 text-xs">{new Date(r.created_at).toLocaleDateString()}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function CommissionsTab() {
  const [rows, setRows] = useState<Commission[]>([]);
  const load = async () => { const { data } = await supabase.from("commissions").select("*").order("created_at", { ascending: false }); setRows((data as Commission[]) ?? []); };
  useEffect(() => { load(); }, []);
  async function update(id: string, status: string) { await supabase.from("commissions").update({ status: status as "approved" | "paid" | "pending" | "rejected" }).eq("id", id); load(); toast.success("Updated"); }

  return (
    <Card>
      {rows.length === 0 ? <Empty text="No commissions yet." /> : (
        <ul className="divide-y divide-border-dark">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between p-4">
              <div><div className="text-sm font-semibold text-gold">₦{Number(r.amount).toLocaleString()}</div><div className="text-xs text-white/50">Affiliate: {r.affiliate_id.slice(0, 8)}… · {new Date(r.created_at).toLocaleDateString()}</div></div>
              <div className="flex items-center gap-2"><StatusPill status={r.status} />
                <select value={r.status} onChange={(e) => update(r.id, e.target.value)} className="rounded-md border border-border-dark bg-black px-2 py-1 text-xs text-white">
                  {["pending", "approved", "paid", "rejected"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) { return <div className="mt-4 rounded-2xl border border-border-dark bg-surface">{children}</div>; }
function Empty({ text }: { text: string }) { return <div className="p-12 text-center text-sm text-white/50">{text}</div>; }
