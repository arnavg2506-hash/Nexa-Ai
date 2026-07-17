import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

const links = [
  { label: "MAISON", href: "/#maison" },
  { label: "COLLECTION", href: "/collection" },
  { label: "STORY", href: "/story" },
  { label: "ATELIER", href: "/#vessel" },
  { label: "CONTACT", href: "/contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("MAISON");
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observed = ["maison", "collection-preview", "vessel", "contact-cta"].flatMap((id) => {
      const el = document.getElementById(id);
      return el ? [el] : [];
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (!hit) return;
        const map: Record<string, string> = {
          maison: "MAISON",
          "collection-preview": "COLLECTION",
          vessel: "ATELIER",
          "contact-cta": "CONTACT"
        };
        setActive(map[hit.target.id] || "MAISON");
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mobileLinks = useMemo(() => links, []);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 h-[72px] w-full transition duration-300 ${
          scrolled || mobileOpen ? "border-b border-copper/10 bg-obsidian/90 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-full max-w-[1480px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          <Link to="/" className="font-display text-[22px] font-semibold tracking-[0.15em] text-ivory">
            RASA ÉCLAT
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  `relative pb-2 font-body text-[11px] font-light uppercase tracking-[0.14em] transition after:absolute after:bottom-0 after:left-0 after:h-px after:bg-copper after:transition-[width] after:duration-300 hover:text-copper ${
                    isActive || active === link.label ? "text-copper after:w-full" : "text-ivory-dim after:w-0"
                  }`
                }
              >
                {link.label}
                {active === link.label ? <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 bg-copper" /> : null}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/#contact-cta"
              className="hidden border border-copper px-5 py-3 font-body text-[11px] font-light uppercase tracking-[0.14em] text-ivory transition hover:bg-copper hover:text-obsidian md:inline-flex"
            >
              Reserve Your Bottle
            </Link>
            <button
              aria-label="Open cart"
              onClick={openCart}
              className="relative border border-copper/30 p-3 text-ivory transition hover:border-copper hover:text-copper"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 ? (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center bg-copper px-1 font-body text-[10px] text-obsidian">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((value) => !value)}
              className="border border-copper/30 p-3 text-ivory transition hover:border-copper lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian pt-28"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10">
              <nav className="flex flex-col gap-5">
                {mobileLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-[clamp(44px,14vw,76px)] font-light leading-none text-ivory"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex items-center gap-6 border-t border-copper/20 pt-6 font-body text-[12px] uppercase tracking-[0.16em] text-ivory-dim">
                <a href="https://instagram.com/rasaeclat">Instagram</a>
                <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "91XXXXXXXXXX"}`}>WhatsApp</a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
