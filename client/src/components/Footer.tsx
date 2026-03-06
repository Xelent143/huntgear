import { Link } from "wouter";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Linkedin, Facebook, ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 text-left relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />

      {/* ── Pre-footer CTA Strip (Elite Style) ── */}
      <div className="relative border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            <div className="text-center md:text-left max-w-2xl">
              <p className="text-gold font-condensed font-semibold tracking-[0.3em] uppercase text-xs mb-3">
                Initiate the Process
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                Ready to manufacture your <span className="text-gradient-gold italic">vision?</span>
              </h2>
              <p className="text-white/60 text-base mt-4 max-w-lg leading-relaxed">
                Experience unparalleled precision manufacturing. Get a comprehensive quote within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 mt-2 md:mt-6">
              <Link href="/rfq">
                <button className="relative overflow-hidden bg-gold text-black hover:bg-white transition-colors duration-500 font-condensed font-bold tracking-[0.15em] uppercase text-[11px] px-8 py-4 h-auto rounded-none group shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                  <span className="relative z-10 flex items-center gap-2">
                    REQUEST COMPREHENSIVE QUOTE
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 w-20 h-full -translate-x-[150%] skew-x-[-20deg] bg-white/40 group-hover:animate-[sweep_1s_ease-in-out_forwards]" />
                </button>
              </Link>
              <a
                href="https://wa.me/923022922242"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 text-white/80 hover:text-gold hover:border-gold font-condensed font-semibold uppercase tracking-[0.15em] text-[11px] px-8 py-4 rounded-none transition-all duration-300"
              >
                WHATSAPP CONCIERGE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Architectural Footer */}
      <div className="relative pt-24 pb-12 text-left z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Row: Massive Brand Name & Newsletter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 border-b border-white/5 pb-20">
            <div className="lg:col-span-7">
              <Link href="/" className="inline-block group mb-6">
                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter text-white leading-[0.9] group-hover:text-gold/90 transition-colors duration-500">
                  Sialkot Sample<br />
                  <span className="italic">Masters</span>
                </h2>
              </Link>
              <p className="text-white/50 text-base leading-relaxed max-w-md font-light">
                Pakistan's premier custom apparel manufacturer. Specializing in high-performance sportswear, streetwear, tactical gear, and martial arts uniforms for global, elite-tier brands.
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-12 lg:border-l border-white/5 flex flex-col justify-end">
              <h3 className="text-gold font-condensed font-bold text-xs tracking-[0.2em] uppercase mb-4">
                Join the Inner Circle
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-sm">
                Receive exclusive insights into manufacturing trends, new fabric technologies, and production slot availability.
              </p>
              <form className="relative max-w-md flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/30 px-0 py-3 focus:outline-none focus:border-gold transition-colors font-light text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gold font-condensed font-bold tracking-widest text-xs uppercase hover:text-white transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Middle Row: Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

            {/* Trust Badges & Socials (Col Span 4) */}
            <div className="lg:col-span-4">
              <h3 className="text-gold font-condensed font-bold text-xs tracking-[0.2em] uppercase mb-8">
                Operating Standards
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-none hover:border-gold/30 transition-colors">
                  <span className="text-white block text-sm font-condensed font-bold tracking-widest uppercase mb-1">ISO 9001:2015</span>
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">Certified Quality</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-none hover:border-gold/30 transition-colors">
                  <span className="text-white block text-sm font-condensed font-bold tracking-widest uppercase mb-1">80% Solar</span>
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">Eco-Friendly</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a href="#" className="text-white/40 hover:text-gold transition-colors p-2 -ml-2">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/40 hover:text-gold transition-colors p-2">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/40 hover:text-gold transition-colors p-2">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Empty spacer for alignment */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Manufacturing (Col Span 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-condensed font-bold text-xs tracking-[0.2em] uppercase mb-8">
                Capabilities
              </h3>
              <ul className="space-y-4">
                {[
                  "Private Label",
                  "Pattern Engineering",
                  "Sublimation Printing",
                  "Embroidery & DTF",
                  "Industrial Stitching",
                  "Tech Pack Design",
                ].map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-white/50 hover:text-gold text-sm font-light transition-colors block relative w-fit group">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Apparel Lines (Col Span 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-condensed font-bold text-xs tracking-[0.2em] uppercase mb-8">
                Apparel Lines
              </h3>
              <ul className="space-y-4">
                {[
                  { label: "Sportswear", href: "/products#sports" },
                  { label: "Streetwear", href: "/products#streetwear" },
                  { label: "Hunting Wear", href: "/products#hunting" },
                  { label: "Tech Wear", href: "/products#techwear" },
                  { label: "Security Uniforms", href: "/products#security" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-white/50 hover:text-gold text-sm font-light transition-colors block relative w-fit group">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empty spacer for alignment */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Contact HQ (Col Span 2) */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-condensed font-bold text-xs tracking-[0.2em] uppercase mb-8">
                Headquarters
              </h3>
              <address className="not-italic space-y-6">
                <div>
                  <p className="text-white font-condensed font-bold text-xs uppercase tracking-widest mb-2">Location</p>
                  <p className="text-white/50 text-sm leading-relaxed font-light">Sialkot Industrial Estate,<br />Sialkot 51310, Pakistan</p>
                </div>
                <div>
                  <p className="text-white font-condensed font-bold text-xs uppercase tracking-widest mb-2">Direct Line</p>
                  <a href="tel:+923022922242" className="text-white/50 hover:text-gold text-sm font-light transition-colors">+92 302 292 2242</a>
                </div>
                <div>
                  <p className="text-white font-condensed font-bold text-xs uppercase tracking-widest mb-2">Inquiries</p>
                  <a href="mailto:info@sialkotsamplementasters.com" className="text-white/50 hover:text-gold text-sm font-light transition-colors">info@sialkotsamplementasters.com</a>
                </div>
              </address>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/30 text-[11px] font-condensed uppercase tracking-widest">
              © {currentYear} Sialkot Sample Masters. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="text-white/30 hover:text-white text-[11px] font-condensed uppercase tracking-widest transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/30 hover:text-white text-[11px] font-condensed uppercase tracking-widest transition-colors">
                Terms OS Manufacturing
              </Link>
              <Link href="/shipping" className="text-white/30 hover:text-white text-[11px] font-condensed uppercase tracking-widest transition-colors">
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
