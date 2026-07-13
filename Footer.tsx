import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border-dark bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Professional photography, printing, branding & media services in Ebonyi State, Nigeria. Capturing moments that last forever.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: MessageCircle, href: "https://wa.me/2348101234567", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-md border border-border-gold text-white transition-colors hover:bg-gold hover:text-black"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-display text-lg font-bold uppercase tracking-wider text-white">
              Quick <span className="text-gold">Links</span>
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-white/60">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Services", "/services"],
                ["Price List", "/pricing"],
                ["Gallery", "/gallery"],
                ["Contact", "/contact"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-display text-lg font-bold uppercase tracking-wider text-white">
              Working <span className="text-gold">Hours</span>
            </h4>
            <ul className="mt-6 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Mon – Sat: 8:00 AM – 8:00 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Sunday: 12:00 PM – 6:00 PM</span>
              </li>
              <li className="mt-6 border-t border-border-dark pt-4 text-white/50">
                Bookings are recommended. Walk-ins welcome for passport photos.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-display text-lg font-bold uppercase tracking-wider text-white">
              Get In <span className="text-gold">Touch</span>
            </h4>
            <ul className="mt-6 space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Edda, Ebonyi State, Nigeria</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="tel:+2348101234567" className="hover:text-gold">+234 810 123 4567</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href="mailto:jawacluxcreations@gmail.com" className="hover:text-gold break-all">
                  jawacluxcreations@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-8 text-xs text-white/40 md:flex-row">
          <div>© {new Date().getFullYear()} Jawaclux Creations. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
