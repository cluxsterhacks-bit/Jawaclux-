import type { ReactNode } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/2348101234567"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-border-gold bg-black text-gold transition-colors hover:bg-gold hover:text-black"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
