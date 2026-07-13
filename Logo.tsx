import { Link } from "@tanstack/react-router";
import { Crown } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <div className="relative shrink-0">
        <div className="grid h-11 w-11 place-items-center rounded-md border border-gold/40 bg-black text-gold">
          <Crown className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 text-gold" />
          <span className="text-display text-xl font-extrabold tracking-tight">JC</span>
        </div>
      </div>
      <div className="leading-none">
        <div className="text-display text-xl font-extrabold tracking-wider text-white">
          JAWACLUX
        </div>
        {!compact && (
          <div className="mt-1 text-[10px] font-semibold tracking-[0.35em] text-gold">
            CREATIONS
          </div>
        )}
      </div>
    </Link>
  );
}
