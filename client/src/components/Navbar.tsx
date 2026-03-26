import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ShoppingCart, ArrowRight, Factory, Award, Globe, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";
import { IMAGES } from "@/lib/images";
import { motion, AnimatePresence } from "framer-motion";

// ── Announcement Bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    try { return !sessionStorage.getItem("xh-ann-dismissed"); } catch { return true; }
  });

  const dismissAnnouncement = () => {
    try { sessionStorage.setItem("xh-ann-dismissed", "1"); } catch { /* noop */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      className="relative overflow-hidden bg-[#0d0d0d] border-b border-white/10"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] animate-pulse shrink-0" />
          <span className="text-white/90">
            <span className="text-[#ff6b00] font-semibold">New Fall/Winter Hunting Collection</span>
            {" — "}Field-tested gear with 7-day sample turnaround
          </span>
          <Link href="/rfq">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#ff6b00] font-condensed font-bold uppercase tracking-wider hover:text-[#ff8533] transition-colors cursor-pointer group">
              Request a Sample Kit <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
        <button
          onClick={dismissAnnouncement}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}



// ── Megamenu: Species ───────────────────────────────────────────────────────
const speciesCategories = [
  { name: "Whitetail", image: IMAGES.navSpecWhitetail, href: "/products?category=Whitetail", tag: "Hardwoods" },
  { name: "Big Game", image: IMAGES.navSpecBigGame, href: "/products?category=Big+Game", tag: "Alpine" },
  { name: "Waterfowl", image: IMAGES.navSpecWaterfowl, href: "/products?category=Waterfowl", tag: "Marsh" },
  { name: "Turkey", image: IMAGES.navSpecTurkey, href: "/products?category=Turkey", tag: "Spring" },
];

// ── Megamenu: Systems ────────────────────────────────────────────────────────
const systemCategories = [
  { name: "Base Layers", image: IMAGES.navSysBase, href: "/products?system=Base+Layer", tag: "Next-to-Skin" },
  { name: "Insulation", image: IMAGES.navSysInsulation, href: "/products?system=Insulation", tag: "Thermal" },
  { name: "Outerwear", image: IMAGES.navSysShell, href: "/products?system=Outerwear", tag: "Protection" },
  { name: "Rain Gear", image: IMAGES.navSysRain, href: "/products?system=Rain+Gear", tag: "Waterproof" },
];

// ── Megamenu: Company links ────────────────────────────────────────────────────
const companyLinks = [
  { label: "About Us", href: "/about", icon: Award, desc: "Heritage, mission & values" },
  { label: "Our Services", href: "/services", icon: Factory, desc: "Custom hunting gear solutions" },
  { label: "Create Tech Pack", href: "/tech-pack", icon: Factory, desc: "Build your gear specs" },
  { label: "Portfolio", href: "/portfolio", icon: Globe, desc: "Field-proven products" },
  { label: "Blog & Insights", href: "/blog", icon: BarChart2, desc: "Hunting tips & gear guides" },
];

type MegamenuKey = "species" | "systems" | "company" | null;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop by Species", href: "#", megamenu: "species" as MegamenuKey },
  { label: "Shop by System", href: "#", megamenu: "systems" as MegamenuKey },
  { label: "Shop", href: "/shop" },
  { label: "Innovation", href: "#", megamenu: "company" as MegamenuKey },
  { label: "3D Design", href: "/customize" },
  { label: "Contact", href: "/contact" },
];

// ── Species Megamenu ──────────────────────────────────────────────────────────
function SpeciesMegamenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t-2 border-[#ff6b00] shadow-2xl shadow-black/90 overflow-hidden"
      style={{ zIndex: 200 }}
    >
      <div className="absolute -top-3 left-0 right-0 h-3 pointer-events-auto" />
      <div className="max-w-7xl mx-auto">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between text-left">
          <div>
            <p className="font-serif font-black text-[10px] tracking-[0.4em] uppercase text-[#ff6b00] mb-1">Shop by Species</p>
            <h3 className="text-white text-2xl font-heading font-bold tracking-tight">Engineered Systems for Every Environment</h3>
          </div>
          <Link href="/products" onClick={onClose}>
            <Button size="sm" className="bg-[#ff6b00] text-black hover:bg-white transition-all font-serif font-black uppercase tracking-widest text-xs rounded-none h-11 px-8 gap-3 vibe-glow-orange group">
              Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 p-10 pb-12">
          {speciesCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} onClick={onClose}>
              <div className="group relative overflow-hidden cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="absolute top-4 left-4 border border-white/20 bg-black/40 backdrop-blur-md text-white text-[9px] font-serif font-black tracking-[0.2em] uppercase px-2 py-1">
                  {cat.tag}
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <p className="text-white font-serif font-black text-xl uppercase tracking-tighter leading-none group-hover:text-[#ff6b00] transition-colors mb-1">
                    {cat.name}
                  </p>
                  <div className="w-0 group-hover:w-full h-0.5 bg-[#ff6b00] transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Systems Megamenu ──────────────────────────────────────────────────────────
function SystemsMegamenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t-2 border-[#ff6b00] shadow-2xl shadow-black/90 overflow-hidden"
      style={{ zIndex: 200 }}
    >
      <div className="absolute -top-3 left-0 right-0 h-3 pointer-events-auto" />
      <div className="max-w-7xl mx-auto">
        <div className="px-8 py-6 border-b border-white/5 text-left">
          <p className="font-serif font-black text-[10px] tracking-[0.4em] uppercase text-[#ff6b00] mb-1">Shop by System</p>
          <h3 className="text-white text-2xl font-heading font-bold tracking-tight">Technical Layering for Peak Performance</h3>
        </div>

        <div className="grid grid-cols-4 gap-8 p-10 pb-12">
          {systemCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} onClick={onClose}>
              <div className="group relative overflow-hidden cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <p className="text-[10px] text-[#ff6b00] font-serif font-black tracking-widest uppercase mb-1">{cat.tag}</p>
                  <p className="text-white font-serif font-black text-xl uppercase tracking-tighter leading-none group-hover:text-[#ff6b00] transition-colors">
                    {cat.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Company Megamenu ───────────────────────────────────────────────────────────
function CompanyMegamenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 w-72 bg-[#0a0a0a] border-t-2 border-[#ff6b00] shadow-2xl shadow-black/50 overflow-hidden"
      style={{ zIndex: 200 }}
    >
      {/* Invisible hit bridge to prevent menu from closing when moving mouse from button to menu */}
      <div className="absolute -top-3 left-0 right-0 h-3 pointer-events-auto" />
      <div className="p-1">
        {companyLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} onClick={onClose}>
              <div className="group flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-[#ff6b00]/5 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-sm bg-[#161616] flex items-center justify-center shrink-0 group-hover:bg-[#ff6b00]/15 transition-colors">
                  <Icon className="w-4 h-4 text-[#ff6b00]" />
                </div>
                <div>
                  <p className="font-condensed font-bold text-sm text-white uppercase tracking-wide group-hover:text-[#ff6b00] transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-white/60 leading-tight">{link.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <Link href="/rfq" onClick={onClose}>
          <button className="w-full text-xs font-condensed font-bold uppercase tracking-widest text-[#ff6b00] hover:text-[#ff6b00]-light transition-colors flex items-center justify-center gap-1 py-1">
            Get a Free Quote <ArrowRight className="w-3 h-3" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Cart Icon ──────────────────────────────────────────────────────────────────
function CartIconButton() {
  const { items, openCart } = useCartStore();
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  return (
    <button
      onClick={openCart}
      className="relative p-2 text-white/60 hover:text-white transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {totalQty > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#ff6b00] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
          {totalQty > 9 ? "9+" : totalQty}
        </span>
      )}
    </button>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<MegamenuKey>(null);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveMegamenu(null);
  }, [location]);

  const handleMouseEnter = (key: MegamenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMegamenu(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMegamenu(null), 200);
  };

  const closeMegamenu = () => setActiveMegamenu(null);

  return (
    <>
      <AnnouncementBar />
      <nav
        ref={menuRef}
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/10"
          : "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <img
                src={IMAGES.logoGold}
                alt="Xelent Huntgear Logo"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.megamenu ? (
                  <div
                    key={link.label}
                    className={(link.megamenu === "species" || link.megamenu === "systems") ? "" : "relative"}
                    onMouseEnter={() => handleMouseEnter(link.megamenu as MegamenuKey)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors relative group ${activeMegamenu === link.megamenu ? "text-[#ff6b00]" : "text-white/70 hover:text-white"
                        }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${activeMegamenu === link.megamenu ? "rotate-180 text-[#ff6b00]" : ""}`}
                      />
                      {/* Animated underline */}
                      <span className={`absolute bottom-0 left-4 right-4 h-px bg-[#ff6b00] origin-left transition-transform duration-300 ${activeMegamenu === link.megamenu ? "scale-x-100" : "scale-x-0"
                        }`} />
                    </button>

                    <AnimatePresence>
                      {activeMegamenu === link.megamenu && (
                        <div
                          onMouseEnter={() => handleMouseEnter(link.megamenu as MegamenuKey)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {link.megamenu === "species" ? (
                            <SpeciesMegamenu onClose={closeMegamenu} />
                          ) : link.megamenu === "systems" ? (
                            <SystemsMegamenu onClose={closeMegamenu} />
                          ) : (
                            <CompanyMegamenu onClose={closeMegamenu} />
                          )}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors group ${location === link.href ? "text-[#ff6b00]" : "text-white/70 hover:text-white"
                      }`}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span className={`absolute bottom-0 left-4 right-4 h-px bg-[#ff6b00] origin-left transition-transform duration-300 ${location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                  </Link>
                )
              )}
            </div>

            {/* CTA + Cart */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <CartIconButton />
              <Link href="/rfq">
                <Button className="bg-[#ff6b00] text-background hover:bg-[#ff6b00]/90 font-condensed font-semibold tracking-widest uppercase text-sm px-6 py-2 rounded-sm shadow-md shadow-[#ff6b00]/20 hover:shadow-[#ff6b00]/30 transition-all">
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Mobile: Cart + Menu */}
            <div className="lg:hidden flex items-center gap-2">
              <CartIconButton />
              <button
                className="text-white p-2"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-6 h-6" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-6 h-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-white/10 shadow-2xl shadow-black/50 h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-6 py-8 space-y-8 pb-32">
                {/* Company section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] border-b border-white/10 pb-3">Company</p>
                  <div className="grid gap-2">
                    {companyLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3 hover:bg-[#161616] text-white transition-all group active:scale-[0.98]">
                          <div className="w-12 h-12 bg-[#161616] flex items-center justify-center shrink-0 group-hover:bg-[#ff6b00]/20 transition-colors">
                            <Icon className="w-5 h-5 text-[#ff6b00]" />
                          </div>
                          <div>
                            <span className="block text-sm font-black uppercase tracking-widest group-hover:text-[#ff6b00] transition-colors">{link.label}</span>
                            <span className="block text-xs text-white/50 mt-1">{link.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Shop by Species (Mobile) */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-[#ff6b00]/70 uppercase tracking-[0.3em] border-b border-white/10 pb-3">Shop by Species</p>
                  <div className="grid grid-cols-2 gap-3">
                    {speciesCategories.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col gap-2 p-3 bg-[#111111] border border-white/10 hover:border-[#ff6b00]/30 transition-all rounded-sm"
                      >
                        <span className="text-[10px] font-serif font-black uppercase tracking-widest text-white leading-tight">{link.name}</span>
                        <span className="text-[8px] text-[#ff6b00] font-serif font-bold uppercase tracking-[0.2em]">{link.tag}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Shop by System (Mobile) */}
                <div className="space-y-4 pt-4">
                  <p className="text-[10px] font-black text-[#ff6b00]/70 uppercase tracking-[0.3em] border-b border-white/10 pb-3">Technical Systems</p>
                  <div className="grid grid-cols-2 gap-3">
                    {systemCategories.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col gap-2 p-3 bg-[#111111] border border-white/10 hover:border-[#ff6b00]/30 transition-all rounded-sm"
                      >
                        <span className="text-[10px] font-serif font-black uppercase tracking-widest text-white leading-tight">{link.name}</span>
                        <span className="text-[8px] text-white/40 font-serif font-bold uppercase tracking-[0.2em]">{link.tag}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4 pt-4">
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] border-b border-white/10 pb-3">Quick Links</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Home", href: "/" },
                      { label: "Shop All", href: "/shop" },
                      { label: "3D Custom", href: "/customize" },
                      { label: "Our Story", href: "/about" },
                      { label: "Services", href: "/services" },
                      { label: "Contact", href: "/contact" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex justify-center items-center text-center p-4 text-[10px] font-black uppercase tracking-widest transition-all active:scale-[0.98] ${location === link.href ? "bg-[#ff6b00]/10 text-[#ff6b00] border border-[#ff6b00]/30" : "bg-[#111111] border border-white/10 hover:border-[#ff6b00]/30 hover:bg-[#161616] text-white"
                          }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <Link href="/rfq" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 bg-[#ff6b00] text-black hover:bg-[#ff6b00]/90 font-condensed font-black tracking-[0.15em] uppercase text-sm rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                      Get a Free Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

