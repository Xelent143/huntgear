import { Link } from "wouter";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Linkedin, Facebook, ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border text-left">
      {/* ── Pre-footer CTA Strip ── */}
      <div className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-condensed font-extrabold text-2xl sm:text-3xl tracking-wide uppercase leading-tight">
                Ready to manufacture your vision?
              </p>
              <p className="text-background/70 text-sm mt-1.5">
                Get a free quote in 24 hours. No commitment required.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/rfq">
                <button className="flex items-center gap-2 bg-gold text-background font-condensed font-bold uppercase tracking-widest text-sm px-7 py-3.5 rounded-sm hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20 group">
                  Request Free Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a
                href="https://wa.me/923022922242"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-background/20 text-background/80 hover:text-background hover:border-background font-condensed font-semibold uppercase tracking-widest text-sm px-6 py-3.5 rounded-sm transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Dark Professional Theme */}
      <div className="bg-[#0a0a0a] border-t border-border/50 pt-20 pb-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">

            {/* Column 1: Brand & Trust (Col Span 4) */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <img
                  src={IMAGES.logoGold}
                  alt="Sialkot Sample Masters Logo"
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <span className="text-white font-condensed font-bold text-lg tracking-[0.08em] uppercase leading-none block">Sialkot Sample</span>
                  <span className="text-gold font-condensed font-bold text-lg tracking-[0.08em] uppercase leading-none block">Masters</span>
                </div>
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
                Pakistan's premier custom apparel manufacturer. Specializing in high-performance sportswear, streetwear, tactical gear, and martial arts uniforms for global brands.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                  <span className="text-gold text-xs">🏅</span>
                  <span className="text-white/80 text-[10px] font-condensed font-bold tracking-widest uppercase">ISO 9001:2015</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                  <span className="text-green-500 text-xs">🌱</span>
                  <span className="text-white/80 text-[10px] font-condensed font-bold tracking-widest uppercase">Eco-Friendly</span>
                </div>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/50 transition-all hover:-translate-y-1">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/50 transition-all hover:-translate-y-1">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/50 transition-all hover:-translate-y-1">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Manufacturing (Col Span 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-condensed font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gold inline-block"></span> Capabilities
              </h3>
              <ul className="space-y-3">
                {[
                  "Private Label",
                  "Pattern Making",
                  "Sublimation Printing",
                  "Embroidery & DTF",
                  "Cut & Sew",
                  "Tech Pack Design",
                ].map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-white/60 hover:text-gold text-sm transition-colors block">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Apparel Lines (Col Span 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-condensed font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gold inline-block"></span> Apparel Lines
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Sportswear", href: "/products#sports" },
                  { label: "Streetwear", href: "/products#streetwear" },
                  { label: "Hunting Wear", href: "/products#hunting" },
                  { label: "Tech Wear", href: "/products#techwear" },
                  { label: "Security Uniforms", href: "/products#security" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-white/60 hover:text-gold text-sm transition-colors block">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Factory (Col Span 4) */}
            <div className="lg:col-span-4">
              <h3 className="text-white font-condensed font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-gold inline-block"></span> Global Headquarters
              </h3>

              <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Factory Location</p>
                    <p className="text-white/60 text-sm leading-relaxed">Sialkot Industrial Estate,<br />Sialkot 51310, Punjab, Pakistan</p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Direct Sales / WhatsApp</p>
                    <a href="tel:+923022922242" className="text-white/60 hover:text-gold text-sm transition-colors">
                      +92 302 292 2242
                    </a>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Email inquiries</p>
                    <a href="mailto:info@sialkotsamplementasters.com" className="text-white/60 hover:text-gold text-sm transition-colors">
                      info@sialkotsamplementasters.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs font-medium tracking-wide">
              © {currentYear} Sialkot Sample Masters. A globally recognized apparel manufacturer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/40 hover:text-white text-xs font-medium tracking-wide transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-white text-xs font-medium tracking-wide transition-colors">
                Terms of Manufacturing
              </Link>
              <Link href="/shipping" className="text-white/40 hover:text-white text-xs font-medium tracking-wide transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923022922242?text=Hello%20Sialkot%20Sample%20Masters!%20I'm%20interested%20in%20custom%20apparel%20manufacturing."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-black/40 hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </footer>
  );
}
