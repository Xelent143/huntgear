import { Link } from "wouter";
import { Award, Globe, Users, ArrowRight, Shield, Leaf, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerChildren,
  AnimatedChild,
  PageWrapper,
  SectionHeading,
} from "@/components/animations";

const milestones = [
  { year: "2010", title: "Industrial Foundation", desc: "Established Sialkot Sample Masters as a specialist prototype and sample house for global garment exporters." },
  { year: "2013", title: "OEM Expansion", desc: "Successfully transitioned into full-scale OEM manufacturing, securing major B2B contracts in the European market." },
  { year: "2016", title: "Quality Benchmarking", desc: "Achieved ISO 9001:2015 certification, setting the standard for precision-engineered custom apparel in Pakistan." },
  { year: "2019", title: "Facility Modernization", desc: "Upgraded our production floor with 50+ specialized machines for technical techwear and pro-grade ski wear." },
  { year: "2022", title: "The Solar Revolution", desc: "Pioneered sustainable manufacturing in Sialkot by converting 80% of our operations to renewable solar energy." },
  { year: "2024", title: "Market Leadership", desc: "Now the preferred strategic partner for 500+ brands across streetwear, sportswear, and hunting categories." },
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Quality Management System", icon: Award, detail: "Certified since 2016" },
  { name: "GOTS Certified", desc: "Global Organic Textile Standard", icon: Leaf, detail: "Organic fabric sourcing" },
  { name: "OEKO-TEX 100", desc: "Harmful Substance Testing", icon: Shield, detail: "Zero harmful chemicals" },
  { name: "WRAP Certified", desc: "Worldwide Responsible Accredited Production", icon: Globe, detail: "Ethical production" },
];

const machines = [
  { brand: "Juki", type: "High-Speed Lockstitch", flag: "🇯🇵" },
  { brand: "Yamato", type: "Flatlock Coverstitch", flag: "🇯🇵" },
  { brand: "PFAFF", type: "Industrial Overlock", flag: "🇩🇪" },
  { brand: "Brother", type: "Multi-Needle Embroidery", flag: "🇯🇵" },
  { brand: "Tajima", type: "15-Head Embroidery", flag: "🇯🇵" },
  { brand: "Mimaki", type: "Industrial DTF / Sublimation", flag: "🇯🇵" },
  { brand: "Epson", type: "DTG Garment Printer", flag: "🇯🇵" },
  { brand: "Lectra", type: "CAM Auto Cutter", flag: "🇫🇷" },
  { brand: "Eastman", type: "Round Knife Cutter", flag: "🇺🇸" },
  { brand: "Gerber", type: "CAD Pattern System", flag: "🇺🇸" },
];

const capabilities = [
  { label: "Monthly Production", value: "50,000+ Units" },
  { label: "Minimum Order Quantity", value: "50 Pieces/Style" },
  { label: "Sample Lead Time", value: "7–10 Days" },
  { label: "Bulk Lead Time", value: "25–35 Days" },
  { label: "Quality Pass Rate", value: "99.8%" },
  { label: "On-Time Delivery", value: "98.5%" },
  { label: "Countries Served", value: "40+" },
  { label: "Active Brand Partners", value: "500+" },
];

const values = [
  {
    icon: Award,
    title: "Technical Precision",
    desc: "From 4-way stretch sportswear to DWR-coated techwear, our precision manufacturing ensures every garment meets rigorous B2B performance standards.",
  },
  {
    icon: Clock,
    title: "Scalable OEM/ODM",
    desc: "We specialize in rapid scaling. Whether it's a 50-piece sample run or 100,000 unit bulk contract, our logistics and production stay on schedule.",
  },
  {
    icon: Users,
    title: "Global Supply Chain",
    desc: "Serving 40+ countries with seamless export logistics. We act as a silent partner for the world's most demanding streetwear and athletic brands.",
  },
  {
    icon: Leaf,
    title: "ESG-Led Manufacturing",
    desc: "We prioritize Environmental, Social, and Governance (ESG) standards with 80% solar-powered operations and sustainable material innovation.",
  },
];

export default function About() {
  return (
    <PageWrapper>
      <SEOHead
        title="About Sialkot Sample Masters | Custom Streetwear Manufacturer Sialkot Pakistan"
        description="Learn about Sialkot Sample Masters, Pakistan's leading custom streetwear manufacturer based in Sialkot. 15+ years of experience, ISO certified, serving 500+ global brands in 40+ countries. Excellence in technical apparel since 2010."
        keywords="about Sialkot Sample Masters, streetwear manufacturer Sialkot Pakistan, clothing manufacturer Pakistan history, ISO certified garment factory Pakistan, B2B apparel manufacturer Pakistan"
        canonical="/about"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "About", item: "/about" },
        ]}
      />

      {/* ── Light Elite Hero ── */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-white">
        {/* Cinematic Parallax Background (Light) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-out scale-105 hover:scale-100 grayscale-[0.2]"
          style={{ backgroundImage: `url(${IMAGES.aboutBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-transparent to-white/50" />

        {/* Subtle geometric overlay (Light) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <FadeIn direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-4 mb-10">
                <span className="w-10 h-px bg-gold" />
                <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs">
                  The Vanguard of Sialkot
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.05] tracking-tighter">
                Engineering <br />
                <span className="text-gradient-gold italic font-light">Global Apparel</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-foreground/70 font-light text-lg sm:text-xl leading-relaxed max-w-2xl mb-12 border-l border-gold/30 pl-8">
                For over a decade, we have operated as the silent architectural force behind 500+ premier brands. We bridge the critical gap between conceptual design and commercial-scale production.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Light Elite Trust Bar ── */}
      <section className="bg-[#F8F9FA] border-b border-border relative z-20 -mt-10 lg:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-white border border-border shadow-2xl shadow-black/5">
          {[
            { stat: "15+", label: "Years Legacy" },
            { stat: "500+", label: "Brand Partners" },
            { stat: "ISO", label: "9001:2015" },
            { stat: "80%", label: "Solar Powered" },
          ].map((item, i) => (
            <div key={i} className={`p-10 text-center ${i < 3 ? 'md:border-r md:border-border' : ''} ${i % 2 === 0 ? 'border-r border-border md:border-r-0' : ''} ${i < 2 ? 'border-b border-border md:border-b-0' : ''} hover:bg-secondary/20 transition-colors duration-500`}>
              <p className="text-foreground font-serif italic text-4xl mb-3">{item.stat}</p>
              <p className="text-gold font-condensed font-bold text-[10px] uppercase tracking-[0.3em]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Light Elite Mission & Story ── */}
      <section className="py-32 bg-white relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

            <FadeIn direction="left" className="lg:col-span-6">
              <div className="relative">
                <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-8 flex items-center gap-4">
                  <span className="w-10 h-px bg-gold" />
                  Expertise & Heritage
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-10 leading-[1.05] tracking-tight">
                  Sialkot’s Premier Specialist in
                  <br />
                  <span className="text-gradient-gold italic font-light">High-Frequency Apparel</span>
                </h2>

                <div className="space-y-6 text-foreground/70 font-light text-sm sm:text-base leading-relaxed max-w-lg">
                  <p>
                    Headquartered in Sialkot, Pakistan — the historic global epicenter of textile excellence — Sialkot Sample Masters engineers the complex manufacturing requirements of elite modern apparel brands. We are not a conventional factory; we are a specialized production atelier equipped with over 50+ cutting-edge industrial machines and proprietary pattern-drafting algorithms.
                  </p>
                  <p>
                    Our facility operates as a vertically integrated hub for Sublimation, Screen Printing, DTF, and DTG, ensuring absolute quality control across six critical domains: Sportswear, Hunting Wear, Streetwear, Security Uniforms, Techwear, and professional Ski Wear.
                  </p>
                  <p className="pl-6 border-l-2 border-gold/30 italic text-foreground/60 mt-8 font-serif">
                    "Sustainability engineered as standard: With 80% of our production powered by renewable solar energy, we reduce the carbon footprint of your supply chain without compromising technical performance."
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2} className="lg:col-span-5 lg:col-start-8">
              <StaggerChildren className="grid grid-cols-2 gap-px bg-border border border-border" stagger={0.1}>
                {capabilities.map((cap) => (
                  <AnimatedChild key={cap.label} direction="up">
                    <div className="bg-white p-8 hover:bg-[#FDFCFB] transition-colors duration-500 group relative overflow-hidden h-full flex flex-col justify-center">
                      <div className="relative z-10">
                        <div className="text-3xl font-serif italic text-foreground mb-3 group-hover:text-gold transition-colors duration-500">{cap.value}</div>
                        <div className="text-foreground/40 font-condensed font-bold text-[9px] uppercase tracking-[0.3em] leading-tight">{cap.label}</div>
                      </div>
                    </div>
                  </AnimatedChild>
                ))}
              </StaggerChildren>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Light Elite Timeline ── */}
      <section className="py-32 bg-[#F8F9FA] relative border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Corporate Archive"
            title="15 Years of Evolution"
            className="mb-24 text-center"
          />

          <div className="relative max-w-4xl mx-auto">
            {/* Architectural Center Line (Light) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-16">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px 0px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline Node (Light) */}
                  <div className="absolute left-[20px] md:left-1/2 top-8 w-4 h-4 rounded-none bg-white border border-gold/50 md:-translate-x-1/2 rotate-45 z-20 flex items-center justify-center shadow-sm">
                    <div className="w-1.5 h-1.5 bg-gold" />
                  </div>

                  {/* Content Panel (Light) */}
                  <div className="md:w-1/2 pl-16 md:pl-0 md:px-12 w-full">
                    <div className={`relative p-10 bg-white border border-border shadow-sm hover:shadow-xl hover:shadow-black/5 hover:border-gold/30 transition-all duration-500 group ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      {/* Decorative Line linking to center node */}
                      <div className={`absolute top-[42px] w-12 h-px bg-border group-hover:bg-gold/30 transition-colors duration-500 hidden md:block ${i % 2 === 0 ? "-right-12" : "-left-12"}`} />

                      <span className="text-gold font-serif text-4xl italic leading-none mb-5 block group-hover:text-foreground transition-colors duration-500">{m.year}</span>
                      <h3 className="text-foreground font-condensed font-bold text-sm tracking-[0.2em] uppercase mb-4">{m.title}</h3>
                      <p className="text-foreground/60 font-light text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Light Elite Values ── */}
      <section className="py-32 bg-white relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Core Philosophy"
            title="What Drives Our Production"
            className="mb-24 text-center"
          />

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {values.map((v) => (
              <AnimatedChild key={v.title} direction="up">
                <div className="relative bg-[#FDFCFB] border border-border p-10 hover:border-gold/30 hover:bg-white transition-all duration-500 group h-full overflow-hidden hover:shadow-xl hover:shadow-black/5">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-none border border-border flex items-center justify-center mb-8 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
                      <v.icon className="w-6 h-6 text-foreground/30 group-hover:text-gold transition-colors duration-500" />
                    </div>

                    <h3 className="font-condensed font-bold text-foreground text-[11px] uppercase tracking-[0.2em] mb-4 group-hover:text-gold transition-colors duration-500">
                      {v.title}
                    </h3>

                    <p className="text-foreground/60 font-light text-xs leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Light Elite Certifications (Seal Style) ── */}
      <section id="certifications" className="py-32 bg-[#F8F9FA] relative border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Compliance & Standards"
            title="Internationally Certified Facility"
            className="mb-24 text-center"
          />
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-12" stagger={0.15}>
            {certifications.map((cert) => (
              <AnimatedChild key={cert.name} direction="scale">
                <div className="flex flex-col items-center text-center group cursor-default">
                  {/* Circular elite seal (Light) */}
                  <div className="relative w-36 h-36 flex flex-col items-center justify-center mb-8 bg-white rounded-full shadow-sm hover:shadow-xl transition-shadow duration-700 border border-border">
                    <div className="absolute inset-1 border border-border rounded-full group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-700 ease-[var(--bezier-out)]" />

                    <cert.icon className="w-8 h-8 text-gold mb-3 group-hover:scale-110 transition-transform duration-500 relative z-10" />

                    <span className="text-[10px] font-condensed font-bold text-foreground uppercase tracking-[0.2em] leading-tight px-4 text-center transition-colors duration-500 relative z-10">
                      {cert.name}
                    </span>
                  </div>
                  <div className="font-condensed font-bold text-foreground text-[11px] uppercase tracking-[0.2em] mb-2 group-hover:text-gold transition-colors duration-500">
                    {cert.desc}
                  </div>
                  <div className="text-foreground/50 font-light text-xs">
                    {cert.detail}
                  </div>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Light Elite Machine Inventory Strip ── */}
      <section className="py-16 bg-white border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <FadeIn>
            <p className="text-center text-gold text-[10px] font-condensed font-bold tracking-[0.4em] uppercase flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-gold" />
              Machine Fleet Archive — 50+ Specialized Units
              <span className="w-12 h-px bg-gold" />
            </p>
          </FadeIn>
        </div>
        <div className="relative overflow-hidden flex">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {[...machines, ...machines, ...machines].map((machine, i) => (
              <div key={i} className="flex-shrink-0 mx-4">
                <div className="bg-[#F8F9FA] border border-border rounded-none px-8 py-5 min-w-[220px] hover:border-gold/40 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-base grayscale opacity-80 hover:grayscale-0 transition-all duration-300">{machine.flag}</span>
                    <span className="font-condensed font-bold text-[11px] text-foreground tracking-[0.2em] uppercase">{machine.brand}</span>
                  </div>
                  <p className="text-foreground/50 font-light text-xs">{machine.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Light Elite Final CTA ── */}
      <section className="relative py-40 bg-white overflow-hidden border-t border-border">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-[1.05] tracking-tighter">
              Ready to Engineer Your
              <br />
              <span className="text-gradient-gold italic font-light">Next Collection?</span>
            </h2>
            <p className="text-foreground/50 font-light text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Engage our master pattern engineers and secure your production timeline. Capacity is limited for new brand partners.
            </p>
            <Link href="/rfq">
              <Button className="bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[11px] px-14 py-7 h-auto rounded-none group shadow-2xl shadow-black/10">
                <span className="flex items-center gap-4">
                  Request Secure Quotation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}
