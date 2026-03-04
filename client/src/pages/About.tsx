import { Link } from "wouter";
import { CheckCircle, Award, Globe, Users, ArrowRight, Shield, Leaf, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerChildren,
  AnimatedChild,
  HoverCard,
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

      {/* ── Hero ── */}
      <section
        className="relative pt-16 pb-20 overflow-hidden"
        style={{ backgroundImage: `url(${IMAGES.aboutBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-3xl">
            <FadeIn direction="down" delay={0.1}>
              <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">The Sialkot Sample Masters Advantage</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight speakable-title">
                Your Strategic Partner in
                <br />
                <span className="text-gradient-gold italic">Global Apparel Manufacturing</span>
              </h1>
              <p className="speakable-description hidden">Sialkot Sample Masters is a trusted OEM/ODM partner for 500+ global brands, specializing in high-performance and luxury apparel manufacturing in Pakistan.</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="gold-divider" />
              <p className="text-slate-200 text-lg leading-relaxed mt-6 max-w-2xl">
                For over 15 years, Sialkot Sample Masters has been the trusted OEM/ODM partner for 500+ global brands. We bridge the gap between creative concept and retail-ready production with specialized expertise in high-performance and luxury apparel.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SEO Trust Bar ── */}
      <section className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gold font-bold text-2xl">15+ Years</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">Industry Expertise</p>
            </div>
            <div>
              <p className="text-gold font-bold text-2xl">500+ Brands</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">Global Partnerships</p>
            </div>
            <div>
              <p className="text-gold font-bold text-2xl">ISO 9001</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">Certified Quality</p>
            </div>
            <div>
              <p className="text-gold font-bold text-2xl">80% Solar</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">Renewable Energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Story ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Expertise & Heritage</p>
                <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                  Sialkot’s Premier Specialist in
                  <span className="text-gradient-gold italic"> High-Frequency Apparel</span>
                </h2>
                <div className="gold-divider" />
                <div className="space-y-4 mt-6 text-muted-foreground leading-relaxed">
                  <p>
                    Headquartered in Sialkot, Pakistan — the global epicenter of textile excellence — Sialkot Sample Masters specializes in the complex manufacturing requirements of modern apparel brands. We are not just a factory; we are an engineering-led production house equipped with over 50+ in-house specialized sewing machines and advanced pattern-drafting technology.
                  </p>
                  <p>
                    Our facility is a vertically integrated hub for Sublimation, Screen Printing, DTF, and DTG, allowing us to maintain absolute quality control. We specialize in six critical categories: high-performance Sportswear, tactical Hunting Wear, premium Streetwear, professional Security Uniforms, functional Techwear, and technical Ski Wear.
                  </p>
                  <p>
                    Sustainability as a Standard: We lead the industry in eco-conscious manufacturing. With 80% of our production powered by renewable solar energy, we help brands reduce their carbon footprint without compromising on the durability or performance of the final garment.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <StaggerChildren className="grid grid-cols-2 gap-4" stagger={0.07}>
                {capabilities.map((cap) => (
                  <AnimatedChild key={cap.label} direction="scale">
                    <HoverCard>
                      <div className="bg-card border border-border rounded-sm p-4 hover:border-gold/30 transition-colors">
                        <div className="text-2xl font-condensed font-bold text-gold mb-1">{cap.value}</div>
                        <div className="text-muted-foreground text-xs uppercase tracking-wide">{cap.label}</div>
                      </div>
                    </HoverCard>
                  </AnimatedChild>
                ))}
              </StaggerChildren>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-padding bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Journey"
            title="15 Years of Growth"
            className="mb-16"
          />

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.55, delay: 0.05, ease: "easeOut" }}
                >
                  <div className="md:w-1/2 md:px-10 pl-10 md:pl-0">
                    <HoverCard>
                      <div className={`bg-background border border-border rounded-sm p-5 hover:border-gold/30 transition-colors ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        <span className="text-gold font-condensed font-bold text-xl">{m.year}</span>
                        <h3 className="text-foreground font-semibold mt-1 mb-2">{m.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </HoverCard>
                  </div>
                  <motion.div
                    className="absolute left-4 md:left-1/2 top-5 w-3 h-3 rounded-full bg-gold border-2 border-background md:-translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Values"
            title="What Drives Everything We Do"
            className="mb-16"
          />
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {values.map((v) => (
              <AnimatedChild key={v.title} direction="up">
                <HoverCard className="h-full">
                  <div className="bg-card border border-border rounded-sm p-6 hover:border-gold/30 transition-colors text-center h-full">
                    <motion.div
                      className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 5, scale: 1.1, transition: { duration: 0.2 } }}
                    >
                      <v.icon className="w-6 h-6 text-gold" />
                    </motion.div>
                    <h3 className="font-condensed font-bold text-foreground uppercase tracking-wide mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </HoverCard>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Certifications (Seal Style) ── */}
      <section id="certifications" className="section-padding bg-black/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Compliance & Standards"
            title="Internationally Certified Facility"
            className="mb-12"
          />
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {certifications.map((cert) => (
              <AnimatedChild key={cert.name} direction="scale">
                <motion.div
                  className="flex flex-col items-center text-center group cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Circular seal */}
                  <div className="cert-seal w-28 h-28 flex flex-col items-center justify-center mb-4 bg-card">
                    <motion.div whileHover={{ rotate: -8, scale: 1.1, transition: { duration: 0.25 } }}>
                      <cert.icon className="w-8 h-8 text-gold mb-1" />
                    </motion.div>
                    <span className="text-[9px] font-condensed font-bold text-gold/70 uppercase tracking-widest leading-tight px-2 text-center">{cert.name}</span>
                  </div>
                  <div className="font-condensed font-bold text-foreground text-sm uppercase tracking-wide mb-1 group-hover:text-gold transition-colors">{cert.desc}</div>
                  <div className="text-muted-foreground text-xs">{cert.detail}</div>
                </motion.div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Machine Inventory Strip ── */}
      <section className="py-10 border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <FadeIn>
            <p className="text-center text-muted-foreground text-xs font-condensed font-semibold tracking-[0.25em] uppercase">
              Our Industrial Machine Fleet — 50+ Specialized Units
            </p>
          </FadeIn>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee" aria-hidden="false">
            {[...machines, ...machines].map((machine, i) => (
              <div key={i} className="flex-shrink-0 mx-4">
                <div className="bg-card border border-border rounded-sm px-4 py-2.5 min-w-[180px] hover:border-gold/25 transition-colors">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm">{machine.flag}</span>
                    <span className="font-condensed font-bold text-sm text-foreground tracking-wide">{machine.brand}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">{machine.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Ready to Partner
              <span className="text-gradient-gold italic"> With Us?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join 500+ global brands who trust Sialkot Sample Masters for their custom streetwear manufacturing needs.
            </p>
            <Link href="/rfq">
              <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-10 py-4 h-auto rounded-sm">
                Request a Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}
