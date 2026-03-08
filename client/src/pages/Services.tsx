import { Link } from "wouter";
import { ArrowRight, CheckCircle, Palette, Package, Layers, Truck, Settings, Scissors, Shield, Award, Clock, Globe, Zap, ChevronRight, Phone, Star, MapPin } from "lucide-react";
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
  CountUp,
} from "@/components/animations";

/* ─── SEO & GEO-optimized service data ─── */
const services = [
  {
    id: "pattern-drafting",
    icon: Scissors,
    badge: "01",
    title: "Digital Pattern Drafting & Grading",
    subtitle: "Precision Engineering — Sialkot, Pakistan",
    description:
      "Our Sialkot-based pattern engineering team uses advanced Lectra and Gerber CAD/CAM systems to transform your creative sketches into production-ready digital patterns. Whether you're launching a new streetwear line or scaling a performance sportswear collection, we ensure pixel-perfect fit accuracy across all size ranges — from XS to 5XL+ — with optimized fabric consumption that reduces waste by up to 15%.",
    features: [
      "Precision digital grading (XS to 5XL+) with Lectra AccuMark",
      "Full tech-pack development from design brief to production spec",
      "3D virtual prototyping & fit sample validation",
      "Fabric consumption optimization — reduce waste by 15%",
      "NDA-protected design confidentiality for all clients",
    ],
    image: IMAGES.servicePattern,
    ctaText: "Request Pattern Quote",
    stat: { value: "48hr", label: "Pattern turnaround" },
  },
  {
    id: "printing-hub",
    icon: Palette,
    badge: "02",
    title: "Advanced Textile Printing Hub",
    subtitle: "Vibrant, Industrial Scale — Made in Pakistan",
    description:
      "Our Sialkot textile printing facility houses high-performance sublimation presses, 8-color automatic screen printing carousels, and state-of-the-art DTF and DTG systems. We deliver high-contrast, wash-resistant graphics for sportswear, activewear jerseys, and streetwear collections — printing over 5,000 units per day with OEKO-TEX certified, eco-friendly inks that meet EU REACH compliance standards.",
    features: [
      "Full-body sublimation printing — zero fade, unlimited colors",
      "8-color automatic screen printing with soft-hand water-based inks",
      "High-definition DTF & DTG transfers for small-batch runs",
      "Silicone, puff, reflective & metallic specialty printing",
      "OEKO-TEX & EU REACH certified eco-friendly ink systems",
    ],
    image: IMAGES.servicePrinting,
    ctaText: "Get Printing Quote",
    stat: { value: "5000+", label: "Units printed daily" },
  },
  {
    id: "stitching-sewing",
    icon: Settings,
    badge: "03",
    title: "Industrial Stitching & Assembly",
    subtitle: "50+ In-House Sewing Units — Sialkot Manufacturing",
    description:
      "Our factory floor operates 50+ specialized industrial sewing machines optimized for speed, precision, and durability. From flatlock seams in compression sportswear to double-needle reinforced stitching in tactical hunting gear, our 100+ skilled artisans handle everything — T-shirts, hoodies, joggers, bomber jackets, ski suits, and security uniforms — with consistent quality across MOQs as low as 50 pieces.",
    features: [
      "Flatlock, overlock, coverstitch & twin-needle capabilities",
      "Reinforced bartack stitching for tactical & outdoor gear",
      "50+ unit capacity — T-shirts, hoodies, joggers, jackets",
      "Compression & performance-cut sportswear specialization",
      "Automated pocket setting, zipper insertion & tape sealing",
    ],
    image: IMAGES.serviceStitching,
    ctaText: "Get Production Quote",
    stat: { value: "50+", label: "Sewing machines" },
  },
  {
    id: "embroidery",
    icon: Layers,
    badge: "04",
    title: "Luxury Embroidery & Custom Branding",
    subtitle: "Premium Brand Identity — Pakistani Craftsmanship",
    description:
      "Transform your private label apparel into luxury-grade branded products with our 12-head computerized embroidery systems. We specialize in complex 3D puff embroidery, custom chenille patches, metallic thread applications, and precision logo placement — delivering the kind of branding quality that commands premium retail pricing for brands in the USA, UK, Europe, and Middle East markets.",
    features: [
      "12-head Tajima computerized embroidery machines",
      "High-density 3D puff embroidery & raised lettering",
      "Custom woven patches, chenille, & appliqué work",
      "Metallic thread, reflective, & glow-in-the-dark embroidery",
      "Custom woven labels, printed labels & premium hang tags",
    ],
    image: IMAGES.serviceEmbroidery,
    ctaText: "Get Branding Quote",
    stat: { value: "12", label: "Head embroidery system" },
  },
  {
    id: "quality-assurance",
    icon: Shield,
    badge: "05",
    title: "ISO-Certified Quality Assurance",
    subtitle: "99.8% Pass Rate — International Standards",
    description:
      "Every garment produced in our Sialkot facility undergoes a rigorous 7-point quality inspection process. We maintain a 99.8% global quality pass rate across all export markets — USA, Canada, UK, Germany, Australia, UAE — ensuring your brand's reputation remains flawless. Our QC team follows ANSI/ASQ Z1.4 AQL sampling standards and provides detailed inspection reports with every shipment.",
    features: [
      "4-point fabric inspection system before cutting",
      "7-stage in-line & final AQL inspection protocol",
      "ANSI/ASQ Z1.4 Level II sampling — AQL 2.5 standard",
      "Dimensional measurement verification on every size",
      "Needle detection, metal scan & barcode verification",
    ],
    image: IMAGES.serviceQC,
    ctaText: "See QC Standards",
    stat: { value: "99.8%", label: "QC pass rate" },
  },
  {
    id: "global-logistics",
    icon: Truck,
    badge: "06",
    title: "Global B2B Export & Logistics",
    subtitle: "Seamless Factory-to-Door — 40+ Countries",
    description:
      "We handle all international shipping documentation, customs clearance, and logistics for seamless factory-to-door delivery across 40+ countries. Whether you need DDP delivery to your US warehouse, FOB Karachi for European brands, or CIF terms for Australian buyers — our experienced export team ensures on-time, damage-free delivery with full shipment tracking and real-time production status updates.",
    features: [
      "DDP, FOB, CIF & EXW international shipping terms",
      "US/EU/UK customs documentation & compliance",
      "Consolidated bulk container shipping — competitive rates",
      "Real-time shipment tracking & production status dashboard",
      "Export-grade palletized packaging with shock protection",
    ],
    image: IMAGES.serviceLogistics,
    ctaText: "Get Shipping Quote",
    stat: { value: "40+", label: "Countries served" },
  },
];

const processSteps = [
  {
    step: "01",
    title: "Inquiry & Consultation",
    desc: "Submit your RFQ or WhatsApp us directly. Our B2B specialist in Sialkot reviews your requirements — tech packs, design briefs, target pricing — and responds within 24 hours with a detailed production assessment.",
    icon: Phone,
  },
  {
    step: "02",
    title: "Quotation & NDA",
    desc: "We provide a transparent, itemized quote with per-unit pricing, lead times, fabric options, and MOQ details. Upon approval, we sign a mutual NDA and production agreement to protect your brand's designs.",
    icon: Package,
  },
  {
    step: "03",
    title: "Sample Development",
    desc: "Our pattern engineering team develops physical samples based on your tech pack. You receive high-resolution photos, measurement charts, and up to 3 rounds of revisions — until you're 100% satisfied.",
    icon: Scissors,
  },
  {
    step: "04",
    title: "Bulk Production",
    desc: "Upon sample approval and advance deposit, bulk production begins on our factory floor. You receive daily progress photos, production milestones, and a dedicated account manager for your order.",
    icon: Settings,
  },
  {
    step: "05",
    title: "Quality Inspection",
    desc: "Every unit goes through our 7-stage QC protocol. Third-party inspection (SGS, Bureau Veritas) is available upon request. Full inspection reports are shared before shipment approval.",
    icon: CheckCircle,
  },
  {
    step: "06",
    title: "Shipping & Delivery",
    desc: "We handle all export documentation, customs clearance, and freight logistics. Your order ships in export-grade packaging with real-time tracking — delivered on time, every time.",
    icon: Truck,
  },
];

const trustBadges = [
  { value: 15, suffix: "+", label: "Years in Manufacturing", icon: Award },
  { value: 500, suffix: "+", label: "Global Brands Served", icon: Globe },
  { value: 50, suffix: "K+", label: "Units Produced Monthly", icon: Zap },
  { value: 40, suffix: "+", label: "Countries Exported To", icon: MapPin },
];

const industries = [
  { name: "Streetwear", emoji: "🧥", desc: "Hoodies, tees, joggers, bombers" },
  { name: "Sportswear", emoji: "⚽", desc: "Jerseys, shorts, tracksuits, compression" },
  { name: "Hunting Wear", emoji: "🎯", desc: "Camo jackets, tactical pants, vests" },
  { name: "Ski Wear", emoji: "⛷️", desc: "Ski suits, snow pants, insulated jackets" },
  { name: "Security Uniforms", emoji: "🛡️", desc: "Guard uniforms, tactical shirts" },
  { name: "Tech Wear", emoji: "⚙️", desc: "Utility vests, cargo pants, shells" },
];

export default function Services() {
  return (
    <PageWrapper>
      <SEOHead
        title="Custom Clothing Manufacturing Services in Sialkot Pakistan | OEM/ODM Apparel Manufacturer"
        description="Sialkot Sample Masters offers end-to-end custom clothing manufacturing services in Pakistan — digital pattern drafting, sublimation printing, industrial stitching, embroidery, ISO-certified quality control, and global B2B exports to USA, UK, Europe, Australia & Middle East. Low MOQ from 50 pcs."
        keywords="clothing manufacturing services Sialkot Pakistan, custom apparel manufacturer Pakistan, OEM clothing manufacturer Sialkot, private label sportswear Pakistan, sublimation printing factory Pakistan, embroidery services Sialkot, B2B garment export Pakistan, streetwear manufacturer Sialkot, hunting wear manufacturer Pakistan, ski wear manufacturer Pakistan"
        canonical="/services"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Manufacturing Services", item: "/services" },
        ]}
      />

      <main className="bg-background text-foreground min-h-screen">

        {/* ═══════════════════════════════════════════════════════════════
            HERO — Full viewport with factory bg
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[85vh] flex items-end overflow-hidden"
          style={{
            backgroundImage: `url(${IMAGES.servicesBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        >
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-40 w-full">
            <div className="max-w-3xl">
              <FadeIn direction="down" delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1.5px] bg-[#c9a96e]" />
                  <p className="text-[#c9a96e] font-condensed font-semibold tracking-[0.25em] uppercase text-xs">
                    End-to-End Manufacturing
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif text-[2.8rem] sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
                  Custom Clothing{" "}
                  <br className="hidden sm:block" />
                  <span className="italic font-light text-[#c9a96e]">Manufacturing</span>{" "}
                  <br className="hidden sm:block" />
                  Services
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-10 font-light">
                  From pattern engineering to global export — we provide vertically integrated apparel manufacturing from our Sialkot, Pakistan facility. Serving 500+ brands across 40+ countries with MOQs as low as 50 pieces.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/rfq">
                    <button className="group bg-[#c9a96e] text-[#0a0a0a] font-condensed font-bold tracking-[0.18em] uppercase text-[11px] sm:text-xs px-9 py-4 transition-all duration-300 hover:bg-[#b8945a]">
                      <span className="flex items-center gap-2.5">
                        Get a Free Quote
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="group font-condensed font-semibold tracking-[0.15em] uppercase text-[11px] sm:text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-9 py-4 transition-all duration-300 backdrop-blur-sm">
                      WhatsApp Consultation
                    </button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Floating stat badges — right edge (desktop) */}
          <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
            {[
              { val: "15+", sub: "Years" },
              { val: "500+", sub: "Brands" },
              { val: "50K+", sub: "Units/mo" },
            ].map((s, i) => (
              <motion.div
                key={s.val}
                className="bg-[#0a0a0a]/70 backdrop-blur-md border border-white/10 px-5 py-4 text-center min-w-[100px]"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              >
                <div className="text-[#c9a96e] font-condensed font-bold text-xl">{s.val}</div>
                <div className="text-white/40 text-[9px] font-condensed tracking-widest uppercase mt-0.5">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TRUST STRIPE — Key metrics
        ═══════════════════════════════════════════════════════════════ */}
        <section className="bg-card border-y border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
              {trustBadges.map((stat) => (
                <AnimatedChild key={stat.label} direction="up">
                  <div className="text-center">
                    <stat.icon className="w-5 h-5 text-gold mx-auto mb-2.5 opacity-80" />
                    <div className="text-3xl sm:text-4xl font-condensed font-bold text-foreground mb-1">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                </AnimatedChild>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            INDUSTRIES WE SERVE — Quick category overview
        ═══════════════════════════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Industries We Manufacture For"
              title="Specialized Across 6 Apparel Categories"
              subtitle="Every service we offer is fine-tuned for your industry's specific requirements — from fabric selection and construction to finishing and compliance standards."
              className="mb-16"
            />
            <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" stagger={0.06}>
              {industries.map((ind) => (
                <AnimatedChild key={ind.name} direction="scale">
                  <HoverCard>
                    <div className="bg-card border border-border rounded-sm p-5 text-center hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group h-full">
                      <span className="text-3xl block mb-3">{ind.emoji}</span>
                      <h3 className="font-condensed font-bold text-sm text-foreground uppercase tracking-wide mb-1 group-hover:text-gold transition-colors">
                        {ind.name}
                      </h3>
                      <p className="text-muted-foreground text-[11px] leading-snug">{ind.desc}</p>
                    </div>
                  </HoverCard>
                </AnimatedChild>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SERVICES DETAIL — Alternating image + text blocks
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative">
          {/* Subtle ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-0 relative z-10">
            {services.map((service, i) => (
              <FadeIn key={service.id} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-20 sm:py-28 ${i < services.length - 1 ? "border-b border-border" : ""
                    }`}
                >
                  {/* Text column */}
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    {/* Badge + subtitle */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#c9a96e] font-condensed font-bold text-4xl opacity-20">{service.badge}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-9 h-9 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center">
                            <service.icon className="w-4.5 h-4.5 text-gold" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gold font-condensed font-semibold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-2">
                      {service.subtitle}
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3 leading-tight">
                      {service.title}
                    </h2>
                    <div className="w-12 h-[1.5px] bg-[#c9a96e] mb-5" />
                    <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stat chip + CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Link href="/rfq">
                        <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-xs px-7 py-3 h-auto rounded-sm group">
                          {service.ctaText} <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <div className="flex items-center gap-2 bg-card border border-border rounded-sm px-4 py-2.5">
                        <Zap className="w-4 h-4 text-gold" />
                        <div>
                          <span className="text-foreground font-condensed font-bold text-sm">{service.stat.value}</span>
                          <span className="text-muted-foreground text-xs ml-1.5">{service.stat.label}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image column */}
                  <div className={`relative overflow-hidden rounded-sm ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                    <motion.div
                      className="aspect-[4/3] overflow-hidden rounded-sm"
                      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                    >
                      <img
                        src={service.image}
                        alt={`${service.title} - Sialkot Sample Masters Pakistan Factory`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent pointer-events-none" />
                    </motion.div>
                    {/* Floating badge */}
                    <div className="absolute bottom-4 left-4 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-sm">
                      <p className="text-[#c9a96e] font-condensed font-bold text-[10px] tracking-widest uppercase">
                        SIALKOT FACTORY · IN-HOUSE
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PROCESS WORKFLOW — How We Work
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0f1015 50%, #0a0a0f 100%)" }}
        >
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 25% 50%, oklch(0.68 0.13 72) 0%, transparent 60%), radial-gradient(circle at 75% 50%, oklch(0.68 0.13 72) 0%, transparent 60%)" }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <FadeIn>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-[#c9a96e]" />
                  <p className="text-gold font-condensed font-semibold tracking-[0.25em] uppercase text-xs">
                    Our B2B Manufacturing Process
                  </p>
                  <div className="w-8 h-[1px] bg-[#c9a96e]" />
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  From Concept to{" "}
                  <span className="italic font-light text-[#c9a96e]">Delivery</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
                  Our streamlined 6-step production workflow ensures complete transparency, predictable lead times, and zero-defect delivery for every order.
                </p>
              </FadeIn>
            </div>

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
              {processSteps.map((p) => (
                <AnimatedChild key={p.step} direction="up">
                  <HoverCard className="h-full">
                    <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/8 rounded-sm p-6 hover:border-gold/30 transition-all duration-300 h-full group">
                      {/* Step number */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                          <p.icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-5xl font-condensed font-bold text-white/5 group-hover:text-gold/10 transition-colors leading-none">
                          {p.step}
                        </span>
                      </div>
                      <h3 className="font-condensed font-bold text-white uppercase tracking-wide mb-2 group-hover:text-gold transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </HoverCard>
                </AnimatedChild>
              ))}
            </StaggerChildren>

            {/* Lead time callout */}
            <FadeIn className="mt-12 text-center" delay={0.2}>
              <div className="inline-flex items-center gap-3 bg-gold/5 border border-gold/20 rounded-sm px-6 py-3">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-white/70 text-sm">
                  <strong className="text-white font-condensed">Average Lead Time:</strong>{" "}
                  7 days for samples · 21–30 days for bulk production
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            WHY CHOOSE US — Social proof + differentiators
        ═══════════════════════════════════════════════════════════════ */}
        <section className="section-padding bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Why Choose Sialkot Sample Masters"
              title="Pakistan's Most Trusted OEM/ODM Partner"
              subtitle="We're not just a factory — we're your dedicated manufacturing partner. Here's why 500+ global brands trust us with their apparel production."
              className="mb-16"
            />

            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.08}>
              {[
                {
                  icon: Shield,
                  title: "ISO 9001 Certified",
                  desc: "International quality management standards with WRAP ethical certification and OEKO-TEX material compliance.",
                },
                {
                  icon: Globe,
                  title: "40+ Countries",
                  desc: "Trusted export partner for brands in the USA, UK, Germany, France, Australia, Canada, UAE, and beyond.",
                },
                {
                  icon: Package,
                  title: "Low MOQ — 50 Pieces",
                  desc: "Start with as few as 50 units per style. Perfect for private label startups and test runs before scaling.",
                },
                {
                  icon: Star,
                  title: "Full Customization",
                  desc: "Custom fabrics, custom fits, custom branding — every garment is made exactly to your specifications, no compromises.",
                },
              ].map((card) => (
                <AnimatedChild key={card.title} direction="up">
                  <HoverCard className="h-full">
                    <div className="bg-background border border-border rounded-sm p-6 hover:border-gold/25 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 h-full group">
                      <div className="w-12 h-12 rounded-sm bg-gold/8 border border-gold/15 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                        <card.icon className="w-6 h-6 text-gold" />
                      </div>
                      <h3 className="font-condensed font-bold text-foreground uppercase tracking-wide text-sm mb-2 group-hover:text-gold transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </HoverCard>
                </AnimatedChild>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            CTA — Final conversion block
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 overflow-hidden"
          style={{
            backgroundImage: `url(${IMAGES.ctaBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/85" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn direction="down">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-[1px] bg-[#c9a96e]" />
                <p className="text-gold font-condensed font-semibold tracking-[0.25em] uppercase text-xs">
                  Start Your Production Today
                </p>
                <div className="w-8 h-[1px] bg-[#c9a96e]" />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Manufacture{" "}
                <br className="hidden sm:block" />
                <span className="italic font-light text-[#c9a96e]">Your Next Collection?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Get a free, no-obligation quote within 24 hours. Our Sialkot-based B2B team is ready to discuss your manufacturing requirements — from 50 pieces to 50,000+.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/rfq">
                  <Button className="h-14 px-10 bg-gold text-black hover:bg-[#b8945a] font-condensed font-bold tracking-widest uppercase text-sm rounded-sm shadow-xl shadow-gold/10 group">
                    Request Instant Quote <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="h-14 px-10 font-condensed font-bold uppercase tracking-widest text-sm border-white/30 hover:border-gold hover:text-gold bg-transparent text-white">
                    Contact Manufacturing Specialist
                  </Button>
                </Link>
              </div>
            </FadeIn>
            {/* GEO trust signal */}
            <FadeIn delay={0.4}>
              <p className="text-white/25 text-xs font-condensed tracking-widest uppercase mt-10">
                📍 Factory: Chak No. 99GB, Sialkot — 51310, Punjab, Pakistan · Est. 2010
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
