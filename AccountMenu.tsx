import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, LayoutDashboard, ShieldCheck, User as UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AccountMenu() {
  const { user, isAdmin } = useAuth();
  const nav = useNavigate();

  if (!user) {
    return (
      <Link to="/auth" className="hidden rounded-md border border-border-gold px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-white hover:bg-gold hover:text-black md:inline-flex">
        Sign in
      </Link>
    );
  }

  const initial = (user.email ?? "?")[0].toUpperCase();

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-border-gold bg-black text-sm font-bold text-gold hover:bg-gold hover:text-black">
          {initial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-border-dark bg-surface text-white">
        <div className="px-2 py-2 text-xs text-white/60">{user.email}</div>
        <DropdownMenuSeparator className="bg-border-dark" />
        <DropdownMenuItem asChild><Link to="/dashboard" className="cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link to="/dashboard" className="cursor-pointer"><UserIcon className="mr-2 h-4 w-4" /> My bookings</Link></DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem asChild><Link to="/admin" className="cursor-pointer text-gold"><ShieldCheck className="mr-2 h-4 w-4" /> Admin</Link></DropdownMenuItem>
        )}
        <DropdownMenuSeparator className="bg-border-dark" />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer"><LogOut className="mr-2 h-4 w-4" /> Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
