import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NotificationBell } from "./NotificationBell";
import { AccountMenu } from "./AccountMenu";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Price List", to: "/pricing" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact Us", to: "/contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md">
      {/* Top contact bar */}
      <div className="hidden border-b border-border-dark bg-black text-[12px] text-white/70 md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              Edda, Ebonyi State, Nigeria
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gold" />
              +234 810 123 4567
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gold" />
              jawacluxcreations@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="text-white/70 hover:text-gold"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="text-white/70 hover:text-gold"><Instagram className="h-4 w-4" /></a>
            <a href="https://wa.me/2348101234567" aria-label="WhatsApp" className="text-white/70 hover:text-gold"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border-dark">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "relative text-[13px] font-bold uppercase tracking-wider transition-colors " +
                    (active ? "text-gold" : "text-white hover:text-gold")
                  }
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 right-0 mx-auto h-[3px] w-6 rounded-full bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <NotificationBell />
            <AccountMenu />
            <Link
              to="/booking"
              className="btn-gold hidden rounded-md px-6 py-3 text-[13px] uppercase tracking-wider md:inline-flex"
            >
              Order Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-md border border-border-gold text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-border-dark bg-bg lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-surface hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="btn-gold mt-2 rounded-md px-4 py-3 text-center text-sm uppercase tracking-wider"
              >
                Order Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
