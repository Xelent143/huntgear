import { Link } from "wouter";
import { ArrowRight, Award, Globe, Users, CheckCircle, Shield, Leaf, Clock, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";
import { Breadcrumb, predefinedBreadcrumbs } from "@/components/Breadcrumb";

const milestones = [
  { year: "2009", title: "Founded", desc: "Started as a specialist sample house for hunting apparel manufacturers in Sialkot." },
  { year: "2012", title: "OEM Expansion", desc: "Transitioned into full-scale OEM manufacturing for US and European hunting brands." },
  { year: "2016", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification for quality management systems." },
  { year: "2019", title: "Tech Upgrade", desc: "Installed 50+ specialized machines for waterproof hunting gear production." },
  { year: "2022", title: "Solar Power", desc: "Converted 80% of operations to renewable solar energy." },
  { year: "2024", title: "Market Leader", desc: "Preferred partner for 500+ hunting apparel brands worldwide." },
];

const stats = [
  { value: "15+", label: "Years", sublabel: "Experience" },
  { value: "500+", label: "Brands", sublabel: "Partners" },
  { value: "50K+", label: "Units", sublabel: "Monthly" },
  { value: "40+", label: "Countries", sublabel: "Exported" },
];

const values = [
  { icon: Shield, title: "Quality First", desc: "ISO 9001 certified with 99.8% QC pass rate. Every garment tested for field conditions." },
  { icon: Clock, title: "Fast Turnaround", desc: "7-day sample delivery. 25-35 day bulk production. On-time guaranteed." },
  { icon: Globe, title: "Global Export", desc: "Direct shipping to USA, Canada, Europe, Australia. Full customs documentation." },
  { icon: Leaf, title: "Sustainable", desc: "80% solar-powered facility. OEKO-TEX certified materials. Eco-friendly production." },
];

const capabilities = [
  { label: "Waterproof Rating", value: "20K/20K" },
  { label: "Min Order", value: "50 PCS" },
  { label: "Sample Time", value: "7 Days" },
  { label: "Bulk Time", value: "25-35 Days" },
  { label: "QC Pass Rate", value: "99.8%" },
  { label: "On-Time Delivery", value: "98.5%" },
];

export default function About() {
  return (
    <PageWrapper>
      <SEOHead
        title="About Xelent Huntgear | Premium Hunting Apparel Manufacturer"
        description="Pakistan's premier hunting apparel manufacturer. 15+ years experience, ISO 9001 certified, serving 500+ global brands. Waterproof gear, custom camo, tactical equipment."
        canonical="/about"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "About Us", item: "/about" },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#0a0a0a] border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={predefinedBreadcrumbs.about} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION - Full Screen like Homepage
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.aboutHeroBg} alt="Xelent Huntgear Technical Manufacturing Facility in Sialkot - ISO 9001 Certified Factory" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        <div className="relative z-10 min-h-[70vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            >
              About Xelent Huntgear
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6"
            >
              Pakistan's Premier
              <span className="block text-[#ff6b00] italic font-light">Hunting Gear</span>
              Manufacturer
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-20 h-1 bg-[#ff6b00] origin-left mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-lg max-w-2xl leading-relaxed"
            >
              For over 15 years, we've been the trusted OEM partner for 500+ global hunting brands.
              From waterproof shells to custom camo patterns, we manufacture gear that performs in the field.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Verification Bar (GEO Signal) */}
      <section className="bg-black py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff6b00]/20 flex items-center justify-center border border-[#ff6b00]/30">
              <Users className="w-4 h-4 text-[#ff6b00]" />
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase">
              Verified by <span className="text-white/80 font-bold">Xelent Huntgear Technical Team</span>
            </p>
          </div>
          <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase">
            Last Fact-Checked: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          STATS BAR - Dark with orange accents
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#111111] border-y border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-condensed font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
                <div className="text-white/40 text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          OUR STORY - Two Column Layout
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={IMAGES.servicesBg} alt="Advanced Hunting Apparel Production Line - Technical Stitching and Ultrasonic Sealing" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#ff6b00] text-black p-6">
                  <div className="text-4xl font-condensed font-bold">15+</div>
                  <div className="text-xs font-bold uppercase tracking-wider">Years of<br />Excellence</div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div>
                <p className="text-[#ff6b00] font-condensed font-bold tracking-[0.2em] uppercase text-sm mb-4">
                  Our Story
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                  Built by Hunters,
                  <span className="block text-[#ff6b00] italic font-light">For Hunters</span>
                </h2>
                <div className="w-16 h-1 bg-[#ff6b00] mb-6" />
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Founded in Sialkot — Pakistan's manufacturing hub — Xelent Huntgear began as a specialist
                  sample house for hunting apparel brands. Today, we're a vertically integrated manufacturer
                  serving 500+ global brands.
                </p>
                <p className="text-white/60 leading-relaxed mb-8">
                  Our facility features 50+ specialized machines for waterproof construction,
                  seam sealing, and camo pattern printing. We understand what hunters need because
                  we work with brands that live the hunting lifestyle.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {capabilities.map((cap) => (
                    <div key={cap.label} className="border-l-2 border-[#ff6b00] pl-4">
                      <div className="text-xl font-condensed font-bold text-white">{cap.value}</div>
                      <div className="text-white/50 text-sm">{cap.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <Button className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider px-8 py-3">
                    Work With Us <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CERTIFICATIONS & COMPLIANCE - GEO SIGNAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex flex-col items-center">
              <span className="text-white font-condensed font-bold text-xl mb-1">REACH</span>
              <span className="text-white/40 text-[10px] uppercase tracking-tighter">EU Compliance</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-condensed font-bold text-xl mb-1">OEKO-TEX®</span>
              <span className="text-white/40 text-[10px] uppercase tracking-tighter">Standard 100</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-condensed font-bold text-xl mb-1">ISO 9001</span>
              <span className="text-white/40 text-[10px] uppercase tracking-tighter">Quality MGMT</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-condensed font-bold text-xl mb-1">ISO 811</span>
              <span className="text-white/40 text-[10px] uppercase tracking-tighter">Hydrostatic Lab</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-white font-condensed font-bold text-xl mb-1">ISO 14001</span>
              <span className="text-white/40 text-[10px] uppercase tracking-tighter">Environmental</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TIMELINE
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Our Journey
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">15 Years of Growth</h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="md:w-1/2 md:px-12 pl-10 md:pl-0">
                    <div className={`bg-[#0d0d0d] border border-white/10 p-6 hover:border-[#ff6b00]/30 transition-colors ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <span className="text-[#ff6b00] font-condensed font-bold text-2xl">{m.year}</span>
                      <h3 className="text-white font-semibold text-lg mt-2 mb-2">{m.title}</h3>
                      <p className="text-white/50 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 bg-[#ff6b00] border-2 border-[#0d0d0d] md:-translate-x-1/2" />
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #ff6b00 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Partner With
            <span className="block text-[#ff6b00]">Xelent Huntgear?</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Let's discuss your hunting apparel manufacturing needs.
            Get a free quote with 7-day sample turnaround.
          </p>
          <Link href="/rfq">
            <Button className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider text-lg px-12 py-4 h-auto shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:shadow-[0_0_60px_rgba(255,107,0,0.6)]">
              Request Free Quote <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
