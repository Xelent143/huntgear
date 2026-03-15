import { Link } from "wouter";
import { ArrowRight, CheckCircle, Globe, Package, Star, Award, Users, Zap, ChevronRight, Leaf, Shield, Sun, Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerChildren,
  AnimatedChild,
  CountUp,
  HoverCard,
  PageWrapper,
  SectionHeading,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
} from "@/components/animations";

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence", icon: Award },
  { value: 500, suffix: "+", label: "Global Brands Served", icon: Globe },
  { value: 40, suffix: "+", label: "Countries Exported To", icon: Package },
  { value: 50, suffix: "K+", label: "Units Produced Monthly", icon: Zap },
];

const services = [
  {
    title: "Eco-Friendly Production",
    description: "80% of our energy comes from renewable solar power. We incorporate eco-friendly fabrics and sustainable practices into every run.",
    icon: "⚡",
  },
  {
    title: "Comprehensive Facilities",
    description: "In-house pattern drafting, sublimation, screen printing, embroidery, DTF, DTG, and modern sewing lines with 50+ machines.",
    icon: "🏭",
  },
  {
    title: "ISO-Grade Assurance",
    description: "Zero-defect delivery guarantee. Strict QC processes ensuring top quality across sportswear, streetwear, and tactical gear.",
    icon: "✅",
  }
];

const products = [
  { name: "Sportswear", image: IMAGES.catSports, href: "/shop", category: "Sports Wear", tag: "Athletic" },
  { name: "Hunting Wear", image: IMAGES.catHunting, href: "/shop", category: "Hunting Wear", tag: "MIL-SPEC" },
  { name: "Streetwear", image: IMAGES.catStreetwear, href: "/shop", category: "Streetwear", tag: "Lifestyle" },
  { name: "Security Uniforms", image: IMAGES.catSecurityUniforms, href: "/shop", category: "Security Uniforms", tag: "Guard" },
  { name: "Tech Wear", image: IMAGES.catTechwear, href: "/shop", category: "Tech Wear", tag: "Utility" },
  { name: "Ski Wear", image: IMAGES.catSki, href: "/shop", category: "Ski Wear", tag: "Alpine" },
  { name: "Martial Arts Wear", image: IMAGES.catMedical, href: "/shop", category: "Martial Arts", tag: "BJJ / MMA" },
];

const testimonials = [
  {
    name: "Marcus Johnson",
    title: "Founder, UrbanThread Co.",
    country: "🇺🇸",
    countryName: "USA",
    rating: 5,
    text: "Sialkot Sample Masters has been our manufacturing partner for 3 years. The quality is consistently exceptional, and their team is incredibly responsive. They've helped us scale from 500 to 10,000 units per month.",
  },
  {
    name: "Sophie Laurent",
    title: "Creative Director, Rue Noire",
    country: "🇫🇷",
    countryName: "France",
    rating: 5,
    text: "We've worked with manufacturers across Asia, but Sialkot Sample Masters stands apart. Their attention to detail, premium fabric sourcing, and on-time delivery make them our exclusive manufacturing partner.",
  },
  {
    name: "James Chen",
    title: "CEO, Pacific Street",
    country: "🇦🇺",
    countryName: "Australia",
    rating: 5,
    text: "The private label service is world-class. From custom woven labels to branded packaging, every detail was perfect. Our customers can't believe the quality comes from a B2B manufacturer.",
  },
];

// ── Bento capability cards
const bentoCards = [
  { value: "50 pcs", label: "Min. Order Qty", icon: Package, accent: true },
  { value: "7 Days", label: "Sample Turnaround", icon: Zap, accent: false },
  { value: "40+", label: "Countries Served", icon: Globe, accent: false },
  { value: "50K+", label: "Units / Month", icon: Award, accent: true },
  { value: "99.8%", label: "QC Pass Rate", icon: CheckCircle, accent: false },
  { value: "ISO 9001", label: "Certified Quality", icon: Shield, accent: false },
  { value: "80% Solar", label: "Renewable Energy", icon: Sun, accent: true },
  { value: "15+ Yrs", label: "Industry Expertise", icon: Star, accent: false },
];

// ── Partner brand types for ticker
const partnerBrands = [
  { name: "UrbanThread Co.", region: "🇺🇸 USA" },
  { name: "Rue Noire Paris", region: "🇫🇷 France" },
  { name: "Pacific Street", region: "🇦🇺 Australia" },
  { name: "Nordic Sport Labs", region: "🇸🇪 Sweden" },
  { name: "Alpha Tactical", region: "🇬🇧 UK" },
  { name: "Desert Hawk Gear", region: "🇦🇪 UAE" },
  { name: "Summit Alpine Co.", region: "🇩🇪 Germany" },
  { name: "Bushcraft Nation", region: "🇨🇦 Canada" },
  { name: "Athleisure Pro", region: "🇳🇱 Netherlands" },
  { name: "StrikeForce MMA", region: "🇺🇸 USA" },
  { name: "Kimono Masters", region: "🇧🇷 Brazil" },
  { name: "Glacier Outfitters", region: "🇳🇿 New Zealand" },
];

// ── ESG Pillars
const esgPillars = [
  {
    icon: Leaf,
    title: "Environmental",
    stat: "80% Solar",
    body: "80% renewable solar-powered production. GOTS & OEKO-TEX certified fabrics. Water recycling across all dyeing processes.",
  },
  {
    icon: Heart,
    title: "Social",
    stat: "250+ Workers",
    body: "Living-wage workforce in Sialkot. Safe, air-conditioned factory floors with healthcare benefits and professional development.",
  },
  {
    icon: Scale,
    title: "Governance",
    stat: "WRAP Certified",
    body: "ISO 9001 quality management. WRAP-certified ethical production. Full audit-ready transparency with third-party QC available.",
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <SEOHead
        title="Custom Streetwear & BJJ Kimonos Manufacturer | Sialkot Pakistan"
        description="Sialkot Sample Masters is Pakistan's premier custom clothing manufacturer. Private label, low MOQ (50pcs), bulk orders for global brands in USA and UAE. T-shirts, hoodies, streetwear, and BJJ Kimonos. Get a free quote today."
        keywords="custom streetwear manufacturer Pakistan, private label clothing USA, bulk streetwear supplier Sialkot, B2B apparel manufacturer Dubai UAE, custom hoodie manufacturer, wholesale BJJ Kimonos manufacturer, custom rashguards supplier Pakistan"
        canonical="/"
      />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0a]">
        {/* Background Image with subtle Ken Burns zoom */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${IMAGES.heroCustomBg})`,
              backgroundSize: "cover",
              backgroundPosition: "60% center",
            }}
          />
          {/* LEFT vignette: deep dark panel for text — image intentionally dark on left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 lg:via-[#0a0a0a]/50 to-transparent" />
          {/* TOP vignette: for navbar breathing room */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-transparent to-transparent" />
          {/* BOTTOM vignette: keep dark to match the overall Hero tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </motion.div>

        {/* --- Layout Grid --- */}
        <div className="relative z-10 flex flex-col min-h-[100dvh] max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* === Top: vertical spacer for navbar === */}
          <div className="pt-28 sm:pt-36 lg:pt-40" />

          {/* === Main Content Block (left-aligned) === */}
          <div className="flex flex-col items-start max-w-2xl xl:max-w-3xl mt-auto">

            {/* Eyebrow / Category Chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {["Hunting Wear", "Sportswear", "Streetwear", "BJJ Kimonos"].map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] sm:text-[11px] font-condensed font-semibold tracking-[0.2em] uppercase text-white/60 border border-white/15 px-3 py-1.5 backdrop-blur-sm"
                >
                  {cat}
                </span>
              ))}
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="font-serif text-[3.2rem] sm:text-[4.8rem] md:text-[5.5rem] lg:text-[6rem] xl:text-[7rem] leading-[0.95] tracking-[-0.02em] text-white mb-7"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Custom Apparel{" "}
              <span className="italic font-light text-[#c9a96e]">Manufacturer</span>
            </motion.h1>

            {/* Divider line */}
            <motion.div
              className="w-16 h-[1.5px] bg-[#c9a96e] mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            />

            {/* Sub-copy */}
            <motion.p
              className="text-white/65 text-sm sm:text-base lg:text-[17px] leading-[1.75] max-w-lg mb-10 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              B2B bulk manufacturing for global sportswear, streetwear, and martial arts brands. ISO 9001 certified. Low MOQ. Exporting daily to the USA, UAE & Europe.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4 mb-14 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78 }}
            >
              {/* Primary button — solid gold */}
              <Link href="/rfq">
                <button className="group relative overflow-hidden bg-[#c9a96e] text-[#0a0a0a] font-condensed font-bold tracking-[0.18em] uppercase text-[11px] sm:text-xs px-9 py-4 h-auto transition-all duration-500 hover:bg-[#b8945a]">
                  <span className="flex items-center gap-2.5">
                    Get a Free Quote
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>

              {/* Secondary button — ghost */}
              <Link href="/portfolio">
                <button className="group flex items-center gap-2.5 font-condensed font-semibold tracking-[0.15em] uppercase text-[11px] sm:text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-9 py-4 transition-all duration-300 backdrop-blur-sm">
                  View Portfolio
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-10 sm:pb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              {[
                { value: "15+", label: "Years" },
                { value: "500+", label: "Brands" },
                { value: "40+", label: "Countries" },
                { value: "50K+", label: "Units / Month" },
              ].map((s, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="font-condensed font-bold text-white text-xl sm:text-2xl">{s.value}</span>
                  <span className="font-condensed text-white/35 text-xs uppercase tracking-widest">{s.label}</span>
                  {i < 3 && <span className="ml-4 text-white/15 text-sm font-light">|</span>}
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator — bottom right */}
        <motion.div
          className="absolute bottom-8 right-8 lg:right-14 flex items-center gap-3 text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <span className="font-condensed text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-8 h-px bg-white/25"
            animate={{ scaleX: [1, 0.35, 1], originX: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ── Stats Section ── */}
      < section className="bg-card border-y border-border py-12" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.12}>
            {stats.map((stat) => (
              <AnimatedChild key={stat.label} direction="up">
                <div className="text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                  <div className="text-3xl sm:text-4xl font-condensed font-bold text-foreground mb-1 stat-glow">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section >

      {/* ── Partner Brand Cloud ── */}
      < section className="py-10 border-b border-border overflow-hidden bg-background" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <FadeIn>
            <p className="text-center text-muted-foreground text-xs font-condensed font-semibold tracking-[0.25em] uppercase">
              Trusted by 500+ Independent Brands Worldwide
            </p>
          </FadeIn>
        </div>
        <div className="relative overflow-hidden">
          {/* Left/right fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee-slow" aria-hidden="false">
            {/* Duplicate the list twice so the animation is seamless */}
            {[...partnerBrands, ...partnerBrands].map((brand, i) => (
              <div
                key={i}
                className="partner-logo flex-shrink-0 mx-8 flex flex-col items-center gap-1 cursor-default"
              >
                <div className="bg-card border border-border rounded-sm px-5 py-3 min-w-[160px] text-center hover:border-gold/30 transition-colors">
                  <p className="font-condensed font-bold text-sm text-foreground tracking-wide">{brand.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{brand.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* ── Services Overview ── */}
      < section className="section-padding" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What We Offer"
            title="Complete B2B Manufacturing Solutions"
            subtitle="From private label startups to established global brands, we provide end-to-end streetwear manufacturing services tailored to your business needs."
            className="mb-16"
          />

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.09}>
            {services.map((service) => (
              <AnimatedChild key={service.title} direction="scale">
                <HoverCard className="h-full">
                  <div className="bg-card border border-border rounded-sm p-6 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-colors duration-300 group h-full">
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="font-condensed font-bold text-lg text-foreground tracking-wide uppercase mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                </HoverCard>
              </AnimatedChild>
            ))}
          </StaggerChildren>

          <FadeIn className="text-center mt-10" delay={0.1}>
            <Link href="/services">
              <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm bg-transparent">
                Explore All Services <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section >

      {/* ── Products Preview ── */}
      < section className="section-padding bg-card border-y border-border" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Product Catalog"
            title="Premium Streetwear Categories"
            className="mb-16"
          />

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {products.map((product) => (
              <AnimatedChild key={product.name} direction="scale">
                <Link href={`${product.href}?category=${encodeURIComponent(product.category)}`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-sm aspect-[4/5] cursor-pointer"
                    whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} - Custom ${product.category} Manufacturer Pakistan`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="1000"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    {product.tag && (
                      <div className="absolute top-4 left-4 bg-gold text-white text-[10px] font-condensed font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-md">
                        {product.tag}
                      </div>
                    )}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%]">
                      <div className="border border-white/40 group-hover:border-gold group-hover:bg-gold/10 transition-colors duration-300 py-3 text-center backdrop-blur-sm">
                        <p className="text-white font-condensed font-bold text-lg uppercase tracking-wider group-hover:text-gold transition-colors">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedChild>
            ))}
          </StaggerChildren>

          <FadeIn className="text-center mt-10" delay={0.1}>
            <Link href="/products">
              <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm">
                View Full Catalog <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section >

      {/* ── About Preview / Why We're Different (Bento Grid) ── */}
      < section className="section-padding" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <FadeIn direction="left">
              <div className="relative">
                <motion.div
                  className="relative overflow-hidden rounded-sm aspect-[4/3]"
                  whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                >
                  <img
                    src={IMAGES.aboutBg}
                    alt="Sialkot Sample Masters manufacturing facility Sialkot Pakistan"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="900"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
                </motion.div>
                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-gold text-background p-6 rounded-sm shadow-xl"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                >
                  <div className="text-4xl font-condensed font-bold">15+</div>
                  <div className="text-xs font-semibold uppercase tracking-widest mt-1">Years of<br />Excellence</div>
                </motion.div>
              </div>
            </FadeIn>

            {/* Content + Bento Grid */}
            <FadeIn direction="right" delay={0.1}>
              <div>
                <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">
                  Why We're Different
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Pakistan's Most Trusted
                  <br />
                  <span className="text-gradient-gold italic">Streetwear Manufacturer</span>
                </h2>
                <div className="gold-divider" />
                <p className="text-muted-foreground leading-relaxed mb-8 mt-4">
                  Founded in Sialkot — Pakistan's garment manufacturing capital — we've been crafting premium custom streetwear for global brands since 2010. Our vertically integrated facility combines traditional craftsmanship with precision manufacturing technology.
                </p>

                {/* Bento Grid of Capabilities */}
                <StaggerChildren className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8" stagger={0.05}>
                  {bentoCards.map((card) => (
                    <AnimatedChild key={card.label} direction="scale">
                      <div className={`bento-card relative p-3 text-center border rounded-sm cursor-default ${card.accent
                        ? "bg-gold/8 border-gold/25 hover:border-gold/50"
                        : "bg-card border-border hover:border-gold/20"
                        }`}>
                        <card.icon className={`w-4 h-4 mx-auto mb-1.5 ${card.accent ? "text-gold" : "text-muted-foreground"}`} />
                        <div className={`font-condensed font-bold text-base leading-none mb-1 ${card.accent ? "text-gold" : "text-foreground"}`}>
                          {card.value}
                        </div>
                        <div className="text-muted-foreground text-[10px] uppercase tracking-wide leading-tight">
                          {card.label}
                        </div>
                      </div>
                    </AnimatedChild>
                  ))}
                </StaggerChildren>

                <Link href="/about">
                  <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm bg-transparent">
                    Our Full Story <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section >

      {/* ── Masters of the Craft ── */}
      < section className="section-padding bg-card border-y border-border" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <FadeIn direction="left">
              <div>
                <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">
                  Masters of the Craft
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Built by People Who
                  <br />
                  <span className="text-gradient-gold italic">Live for Precision</span>
                </h2>
                <div className="gold-divider" />

                {/* Founder quote */}
                <div className="relative mt-6 mb-8 pl-6 border-l-2 border-gold/30">
                  <span className="text-gold/20 font-serif text-7xl absolute -top-4 -left-3 leading-none select-none">"</span>
                  <blockquote className="text-muted-foreground text-base leading-relaxed italic relative z-10">
                    We started as a sample house with one mission: to make world-class garments from Sialkot. Today, our 250-strong team ships to 40+ countries — and every stitch still carries that same obsession with craft.
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-gold font-condensed font-bold text-sm">SM</span>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-sm">The Founders</p>
                      <p className="text-muted-foreground text-xs">Est. 2010 — Sialkot, Pakistan 🇵🇰</p>
                    </div>
                  </div>
                </div>

                {/* Team specialties */}
                <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-3" stagger={0.07}>
                  {[
                    { emoji: "✂️", title: "Pattern Engineering", desc: "CAD/CAM precision drafting" },
                    { emoji: "🎨", title: "Textile Printing", desc: "Sublimation, DTF, Screen" },
                    { emoji: "🧵", title: "Industrial Stitching", desc: "50+ specialized machines" },
                    { emoji: "🔍", title: "Quality Control", desc: "ISO-grade inspection team" },
                  ].map((spec) => (
                    <AnimatedChild key={spec.title} direction="up">
                      <div className="flex items-start gap-3 p-3 bg-background border border-border rounded-sm hover:border-gold/25 transition-colors group">
                        <span className="text-xl flex-shrink-0 mt-0.5">{spec.emoji}</span>
                        <div>
                          <p className="font-condensed font-bold text-sm text-foreground uppercase tracking-wide group-hover:text-gold transition-colors">{spec.title}</p>
                          <p className="text-muted-foreground text-xs">{spec.desc}</p>
                        </div>
                      </div>
                    </AnimatedChild>
                  ))}
                </StaggerChildren>
              </div>
            </FadeIn>

            {/* Factory imagery */}
            <FadeIn direction="right" delay={0.15}>
              <div className="relative">
                <motion.div
                  className="relative overflow-hidden rounded-sm aspect-[4/5]"
                  whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                >
                  <img
                    src={IMAGES.servicesBg}
                    alt="Sialkot Sample Masters skilled workforce and manufacturing precision"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="1500"
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {/* Overlay stamp */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="border border-gold/30 bg-black/60 backdrop-blur-sm rounded-sm px-4 py-3">
                      <p className="text-gold font-condensed font-bold text-xs tracking-widest uppercase mb-1">
                        Est. 2010 — Sialkot, Pakistan
                      </p>
                      <p className="text-white/80 text-xs leading-relaxed">
                        250+ skilled craftspeople. 50+ industrial machines. One standard: excellence.
                      </p>
                    </div>
                  </div>
                </motion.div>
                {/* Floating stat */}
                <motion.div
                  className="absolute -top-5 -right-5 bg-gold text-background p-4 rounded-sm shadow-xl text-center"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-2xl font-condensed font-bold">250+</div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest mt-0.5">Skilled<br />Craftspeople</div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section >

      {/* ── Testimonials ── */}
      < section className="section-padding" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Client Testimonials"
            title="Trusted by Global Brand Owners"
            className="mb-16"
          />

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.13}>
            {testimonials.map((testimonial) => (
              <AnimatedChild key={testimonial.name} direction="up">
                <HoverCard className="h-full">
                  <div className="relative bg-card border border-border rounded-sm p-6 hover:border-gold/30 transition-colors duration-300 h-full flex flex-col overflow-hidden">
                    {/* Decorative quote mark */}
                    <span className="quote-mark">"</span>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4 relative z-10">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic flex-1 relative z-10">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border relative z-10">
                      <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-muted-foreground text-xs">{testimonial.title}</p>
                      </div>
                      {/* Country + Verified badge */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-lg" title={testimonial.countryName}>{testimonial.country}</span>
                        <span className="inline-flex items-center gap-1 bg-gold/10 text-gold text-[9px] font-condensed font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-sm border border-gold/20">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section >

      {/* ── ESG Commitment Ribbon ── */}
      < section className="relative py-20 overflow-hidden border-y border-border"
        style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #0f1015 50%, #0a0a0f 100%)" }}>
        {/* Background gold mesh */}
        < div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 25% 50%, oklch(0.68 0.13 72) 0%, transparent 60%), radial-gradient(circle at 75% 50%, oklch(0.68 0.13 72) 0%, transparent 60%)" }} />

        < div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
          <FadeIn className="text-center mb-12">
            <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">
              Our Commitment to the Future
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Sustainability at{" "}
              <span className="text-gradient-gold italic">Industrial Scale</span>
            </h2>
            <div className="gold-divider mx-auto" />
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-0 relative" stagger={0.12}>
            {esgPillars.map((pillar, i) => (
              <AnimatedChild key={pillar.title} direction="up">
                <div className={`relative p-8 text-center ${i < esgPillars.length - 1 ? "md:border-r border-gold/10" : ""}`}>
                  {/* Icon circle */}
                  <div className="w-16 h-16 rounded-full border-2 border-gold/30 bg-gold/5 flex items-center justify-center mx-auto mb-5 group-hover:border-gold/60 transition-colors">
                    <pillar.icon className="w-7 h-7 text-gold" />
                  </div>
                  <p className="text-gold font-condensed font-bold text-2xl mb-1">{pillar.stat}</p>
                  <h3 className="text-white font-condensed font-bold text-lg uppercase tracking-widest mb-3">{pillar.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{pillar.body}</p>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>

          <FadeIn className="text-center mt-10" delay={0.2}>
            <Link href="/about#certifications">
              <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm bg-transparent">
                View Our Certifications <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div >
      </section >

      {/* ── CTA Section ── */}
      < section
        className="relative py-28 overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGES.ctaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="down">
            <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-4">
              Ready to Start?
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's Build Your
              <br />
              <span className="text-gradient-gold italic">Streetwear Brand Together</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Get a free, no-obligation quote within 24 hours. Our B2B specialists are ready to discuss your manufacturing needs.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/rfq">
                <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-10 py-4 h-auto rounded-sm group">
                  Request Free Quote
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-foreground/30 text-foreground hover:border-gold hover:text-gold font-condensed font-semibold tracking-widest uppercase text-sm px-10 py-4 h-auto rounded-sm bg-transparent">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section >
    </PageWrapper >
  );
}
