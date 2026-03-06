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
    try { return !sessionStorage.getItem("ssm-ann-dismissed"); } catch { return true; }
  });

  const dismiss = () => {
    try { sessionStorage.setItem("ssm-ann-dismissed", "1"); } catch { /* noop */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      className="bg-[#121212] border-b border-gold/20 relative overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
          <span className="text-white/90">
            <span className="text-gold font-bold tracking-wider">SS2026 PRODUCTION OPEN</span>
            {" — "}7-day sample turnaround. Heritage-grade craftsmanship.
          </span>
          <Link href="/rfq">
            <span className="hidden sm:inline-flex items-center gap-1 text-gold font-condensed font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer group">
              Technical Consultation <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
        <button
          onClick={dismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/80 transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}



// ── Megamenu: Product Categories ─────────────────────────────────────────────
const productCategories = [
  { name: "Sportswear & Team Kits", image: IMAGES.catSports, href: "/products#sportswear", tag: "Athletic" },
  { name: "Hunting Wear", image: IMAGES.catHunting, href: "/products#hunting-wear", tag: "MIL-SPEC" },
  { name: "Streetwear", image: IMAGES.catStreetwear, href: "/products#streetwear", tag: "Lifestyle" },
  { name: "Security Uniforms", image: IMAGES.catSecurityUniforms, href: "/products#security-uniforms", tag: "Guard" },
  { name: "Tech Wear", image: IMAGES.catTechwear, href: "/products#techwear", tag: "Utility" },
  { name: "Ski Wear", image: IMAGES.catSki, href: "/products#ski-wear", tag: "Alpine" },
];

// ── Megamenu: Company links ────────────────────────────────────────────────────
const companyLinks = [
  { label: "About Us", href: "/about", icon: Award, desc: "Our story, certifications & values" },
  { label: "Our Services", href: "/services", icon: Factory, desc: "Manufacturing, private label, design" },
  { label: "Portfolio", href: "/portfolio", icon: Globe, desc: "Completed work for global brands" },
  { label: "Blog & Insights", href: "/blog", icon: BarChart2, desc: "Industry news & manufacturing guides" },
];

type MegamenuKey = "company" | "products" | null;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Company", href: "#", megamenu: "company" as MegamenuKey },
  { label: "Products", href: "#", megamenu: "products" as MegamenuKey },
  { label: "Shop", href: "/shop" },
  { label: "3D Design", href: "/customize" },
  { label: "Contact", href: "/contact" },
];

// ── Products Megamenu ──────────────────────────────────────────────────────────
function ProductsMegamenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white border border-border shadow-2xl shadow-black/5 rounded-none overflow-hidden"
      style={{ zIndex: 200 }}
    >
      {/* Header row */}
      <div className="bg-secondary/30 px-6 py-6 border-b border-border flex items-center justify-between">
        <div>
          <p className="font-condensed font-bold text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Industrial Repository</p>
          <p className="text-foreground text-xl font-serif italic border-l-2 border-gold pl-4">Product Catalog Archive</p>
        </div>
        <Link href="/products" onClick={onClose}>
          <Button size="sm" className="bg-foreground text-background hover:bg-gold hover:text-foreground font-condensed font-bold uppercase tracking-[0.2em] text-[10px] rounded-none py-6 px-8 gap-2 transition-all duration-300">
            EXPLORE ALL INDICES <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-6 gap-px bg-border p-px">
        {productCategories.map((cat) => (
          <Link key={cat.href} href={cat.href} onClick={onClose}>
            <div className="group relative overflow-hidden bg-white cursor-pointer h-full">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-100 opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute top-3 left-3">
                <div className="bg-white/90 backdrop-blur-sm text-foreground text-[8px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 border border-border">
                  {cat.tag}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-foreground font-condensed font-bold text-[10px] uppercase tracking-widest leading-tight group-hover:text-gold transition-colors">
                  {cat.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer strip */}
      <div className="bg-white border-t border-border px-6 py-4 flex items-center justify-center gap-10 text-[9px] font-condensed font-bold tracking-[0.2em] uppercase text-muted-foreground/60">
        {["Direct Sialkot Export", "Full Customization", "7-Day Prototyping", "Global Deployment"].map((item) => (
          <span key={item} className="flex items-center gap-2">
            <span className="w-1.5 h-px bg-gold" />
            {item}
          </span>
        ))}
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
      className="absolute top-full left-0 w-72 bg-white border border-border shadow-2xl shadow-black/5 rounded-none overflow-hidden"
      style={{ zIndex: 200 }}
    >
      <div className="p-1">
        {companyLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} onClick={onClose}>
              <div className="group flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-none bg-secondary flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-condensed font-bold text-[10px] text-foreground uppercase tracking-[0.2em] group-hover:text-gold transition-colors">
                    {link.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 leading-tight mt-0.5 font-light">{link.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-border px-5 py-4 bg-secondary/20">
        <Link href="/rfq" onClick={onClose}>
          <button className="w-full text-[10px] font-condensed font-bold uppercase tracking-[0.3em] text-foreground hover:text-gold transition-colors flex items-center justify-center gap-2 group">
            INITIATE RFQ <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
      className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {totalQty > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
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
    closeTimer.current = setTimeout(() => setActiveMegamenu(null), 150);
  };

  const closeMegamenu = () => setActiveMegamenu(null);

  return (
    <>
      <AnnouncementBar />
      <nav
        ref={menuRef}
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white/80 backdrop-blur-sm border-b border-border/50"
          }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <img
                src={IMAGES.logoGold}
                alt="Sialkot Sample Masters Logo"
                className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2 lg:gap-8">
              {navLinks.map((link) =>
                link.megamenu ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.megamenu as MegamenuKey)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`flex items-center gap-1.5 py-2 text-[11px] font-condensed font-bold tracking-[0.25em] uppercase transition-colors relative group ${activeMegamenu === link.megamenu ? "text-gold" : "text-foreground/70 hover:text-foreground"
                        }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMegamenu === link.megamenu ? "rotate-180 text-gold" : "opacity-40 group-hover:opacity-100"}`}
                      />
                      {/* Animated gold underline */}
                      <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold origin-left transition-transform duration-300 ease-out ${activeMegamenu === link.megamenu ? "scale-x-100" : "scale-x-0"
                        }`} />
                    </button>

                    <AnimatePresence>
                      {activeMegamenu === link.megamenu && (
                        <div
                          onMouseEnter={() => handleMouseEnter(link.megamenu as MegamenuKey)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {link.megamenu === "products" ? (
                            <ProductsMegamenu onClose={closeMegamenu} />
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
                    className={`relative py-2 text-[11px] font-condensed font-bold tracking-[0.25em] uppercase transition-colors group ${location === link.href ? "text-gold" : "text-foreground/70 hover:text-foreground"
                      }`}
                  >
                    {link.label}
                    {/* Animated gold underline */}
                    <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold origin-left transition-transform duration-300 ease-out ${location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                  </Link>
                )
              )}
            </div>

            {/* CTA + Cart */}
            <div className="hidden lg:flex items-center gap-8 shrink-0">
              <CartIconButton />
              <Link href="/rfq">
                <Button className="relative overflow-hidden bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-10 py-5 h-auto rounded-none group">
                  <span className="relative z-10 flex items-center gap-3">
                    INITIATE RFQ
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Mobile: Cart + Menu */}
            <div className="lg:hidden flex items-center gap-2">
              <CartIconButton />
              <button
                className="text-foreground p-2"
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
              className="lg:hidden absolute top-full left-0 w-full bg-background border-t border-border shadow-2xl h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="px-6 py-8 space-y-8 pb-32">
                {/* Company section */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border pb-3">Company</p>
                  <div className="grid gap-2">
                    {companyLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 text-foreground transition-all group active:scale-[0.98]">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors shadow-inner">
                            <Icon className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <span className="block text-sm font-black uppercase tracking-widest group-hover:text-gold transition-colors">{link.label}</span>
                            <span className="block text-xs text-muted-foreground mt-1 opacity-80">{link.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4 pt-4">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-border pb-3">Quick Links</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Home", href: "/" },
                      { label: "Shop", href: "/shop" },
                      { label: "Products", href: "/products" },
                      { label: "3D Design", href: "/customize" },
                      { label: "Contact", href: "/contact" },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex justify-center items-center text-center p-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98] ${location === link.href ? "bg-gold/10 text-gold border border-gold/20" : "bg-card border border-border/50 hover:border-gold/30 hover:bg-secondary text-foreground"
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
                    <Button className="w-full h-14 bg-gold text-black hover:bg-gold/90 font-condensed font-black tracking-[0.15em] uppercase text-sm rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.2)]">
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

