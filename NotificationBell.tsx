import { useEffect, useState } from "react";
import { Bell, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";

type N = { id: string; title: string; body: string | null; link: string | null; is_read: boolean; created_at: string; type: string };

export function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState<N[]>([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
      setItems((data as N[]) ?? []);
    };
    load();
    const ch = supabase.channel("notifs-" + user.id)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, load)
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  if (!user) return null;
  const unread = items.filter((i) => !i.is_read).length;

  async function markAll() {
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-md border border-border-gold text-white hover:text-gold">
          <Bell className="h-4 w-4" />
          {unread > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">{unread}</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 border-border-dark bg-surface p-0 text-white">
        <div className="flex items-center justify-between border-b border-border-dark p-3">
          <div className="text-xs font-bold uppercase tracking-widest text-white/70">Notifications</div>
          {unread > 0 && <button onClick={markAll} className="flex items-center gap-1 text-[11px] text-gold hover:underline"><Check className="h-3 w-3" /> Mark all read</button>}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center text-xs text-white/50">No notifications yet.</div>
          ) : items.map((n) => (
            <a key={n.id} href={n.link ?? "#"} className={"block border-b border-border-dark px-3 py-3 text-sm hover:bg-black " + (!n.is_read ? "bg-gold/5" : "")}>
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-white">{n.title}</div>
                {!n.is_read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />}
              </div>
              {n.body && <div className="mt-1 text-xs text-white/60">{n.body}</div>}
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
              </div>
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
