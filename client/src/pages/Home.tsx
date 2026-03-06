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
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <PageWrapper>
      <SEOHead
        title="Custom Streetwear Manufacturer Pakistan | B2B Apparel Manufacturing"
        description="Sialkot Sample Masters is Pakistan's premier custom streetwear manufacturer in Sialkot. Private label, low MOQ, bulk orders for global brands. T-shirts, hoodies, joggers, bomber jackets. Get a free quote today."
        keywords="custom streetwear manufacturer Pakistan, private label clothing manufacturer Pakistan, bulk streetwear supplier Sialkot, B2B apparel manufacturer Pakistan, custom hoodie manufacturer, wholesale streetwear Pakistan"
        canonical="/"
      />

      {/* ── Elite Hero Section ── */}
      <section
        className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-32 pb-12 group cursor-default bg-[#F8F9FA]"
        onMouseMove={handleMouseMove}
      >
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0 origin-center opacity-40 grayscale-[0.2]"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage: `url(${IMAGES.eliteHeroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* High-Key Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(255,255,255,0.2)_0%,white_100%)] z-0 pointer-events-none" />

        {/* Cursor Spotlight Effect (Light variant) */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 0, 0, 0.03), transparent 40%)`
          }}
        />

        <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-24 pb-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              className="text-gold font-condensed font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              Est. 2010 — Sialkot, Pakistan
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-8 py-2">
              <motion.h1
                className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-foreground leading-[1.05] tracking-tight"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                Architects of<br />
                <span className="text-gradient-gold italic pr-4">Premium</span> Apparel
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              className="text-foreground/70 text-lg sm:text-xl max-w-xl leading-relaxed border-l-2 border-gold pl-6 mb-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Precision manufacturing for the world's leading streetwear labels. Where industrial capability meets refined craftsmanship.
            </motion.p>

            {/* Interactive CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            >
              <Link href="/rfq">
                <Button className="relative overflow-hidden bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-sm px-10 py-6 h-auto rounded-none group">
                  <span className="relative z-10 flex items-center gap-3">
                    INITIATE RFQ
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button variant="ghost" className="text-foreground hover:text-gold hover:bg-transparent font-condensed font-bold tracking-[0.2em] text-sm px-4 py-6 h-auto rounded-none group">
                  EXPLORE CAPABILITIES
                  <motion.span
                    className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300"
                  >
                    ⟶
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Interactive Trust Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-black/20 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center text-white/60 text-xs sm:text-sm font-condensed tracking-widest uppercase">
            <div className="flex gap-8 sm:gap-12 overflow-x-auto no-scrollbar whitespace-nowrap mask-edges max-w-full">
              <span className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-gold/80" /> 15+ Years Excellence</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-gold/80" /> ISO 9001 Certified</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-gold/80" /> 80% Solar Powered</span>
              <span className="hidden sm:flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-gold/80" /> 500+ Global Brands</span>
            </div>

            {/* Scroll indicator */}
            <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-white/10 h-[24px]">
              <span className="text-[10px] text-white/40">SCROLL</span>
              <div className="w-px h-8 bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1/2 bg-gold"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Light Elite Stats Section ── */}
      <section className="bg-white py-24 relative overflow-hidden border-b border-border">
        {/* Subtle top border gradient (Light variant) */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12" stagger={0.15}>
            {stats.map((stat, i) => (
              <AnimatedChild key={stat.label} direction="up">
                <div className={`text-center relative ${i !== 3 ? "lg:after:content-[''] lg:after:absolute lg:after:right-[-24px] lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:w-px lg:after:h-12 lg:after:bg-border" : ""}`}>
                  <div className="inline-flex items-center justify-center mb-6">
                    <stat.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-3 tracking-tighter">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gold font-condensed font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Light Elite Partner Brand Grid ── */}
      <section className="py-24 bg-[#FDFCFB] relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FadeIn>
            <div className="flex items-center gap-6 justify-center">
              <div className="w-16 h-px bg-gold/40" />
              <p className="text-center text-foreground/40 font-condensed font-bold tracking-[0.4em] text-[10px] sm:text-xs uppercase whitespace-nowrap">
                Trusted globally since 2010
              </p>
              <div className="w-16 h-px bg-gold/40" />
            </div>
          </FadeIn>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            {partnerBrands.slice(0, 8).map((brand, i) => (
              <div
                key={i}
                className="bg-white p-10 flex flex-col items-center justify-center gap-3 group relative overflow-hidden min-h-[160px] transition-colors duration-500 hover:bg-secondary/30"
              >
                {/* Subtle gold glow on hover (Light variant) */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                <p className="font-serif italic text-2xl text-foreground/30 group-hover:text-foreground transition-all duration-500 relative z-20 text-center leading-tight tracking-tight">
                  {brand.name}
                </p>
                <div className="h-px w-4 bg-gold/20 group-hover:w-8 group-hover:bg-gold transition-all duration-500" />
                <p className="text-foreground/40 group-hover:text-gold font-condensed font-bold text-[9px] tracking-[0.3em] uppercase transition-colors duration-500 relative z-20 text-center">
                  {brand.region}
                </p>
              </div>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-16 text-center">
            <Link href="/portfolio">
              <span className="inline-flex items-center gap-3 text-foreground/50 hover:text-foreground font-condensed font-bold text-[10px] tracking-[0.3em] uppercase transition-all cursor-pointer group">
                EXPLORE CASE ARCHIVES <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Light Elite Services Overview ── */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.01)_0%,transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Manufacturing Capabilities"
            title="End-to-End Production"
            subtitle="From conceptual tech packs to scaled global distribution. We engineer apparel to exact specifications using advanced industrial techniques."
            className="mb-20"
          />

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {services.map((service, i) => (
              <AnimatedChild key={service.title} direction="up">
                <div className="group relative h-full bg-[#F8F9FA] border border-border p-10 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1">
                  {/* Icon & Index */}
                  <div className="flex items-start justify-between mb-16 relative z-10">
                    <div className="text-4xl text-foreground/20 group-hover:scale-110 group-hover:text-gold transition-all duration-500">
                      {service.icon}
                    </div>
                    <div className="text-foreground/5 font-serif font-bold text-5xl group-hover:text-gold/10 transition-colors duration-500">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-condensed font-bold text-xl text-foreground tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
                      <span className="w-6 h-px bg-gold group-hover:w-10 transition-all duration-500" />
                      {service.title}
                    </h3>
                    <p className="text-foreground/50 text-sm leading-relaxed font-light group-hover:text-foreground/70 transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.4} className="mt-20 text-center">
            <Link href="/services">
              <Button className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-white font-condensed font-bold tracking-[0.3em] uppercase text-[10px] px-12 py-6 h-auto rounded-none transition-all duration-500">
                EXPLORE FULL CAPABILITIES
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>


      {/* ── Light Elite Products Preview ── */}
      <section className="py-24 bg-white relative border-y border-border">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Catalogue d'élite"
            title="Garment Classifications"
            className="mb-24 text-center"
          />

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border" stagger={0.15}>
            {products.map((product) => (
              <AnimatedChild key={product.name} direction="up">
                <Link href={`${product.href}?category=${encodeURIComponent(product.category)}`}>
                  <motion.div
                    className="group relative overflow-hidden bg-white cursor-pointer aspect-[4/5]"
                    whileHover={{ transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} - Custom Streetwear Manufacturer Pakistan`}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-700" />

                    {product.tag && (
                      <div className="absolute top-8 left-8 bg-foreground text-background text-[8px] font-condensed font-bold tracking-[0.4em] uppercase px-4 py-2 border border-white/10 shadow-sm z-20">
                        {product.tag}
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-md border-t border-border z-20">
                      <p className="text-gold font-condensed font-bold text-[10px] tracking-[0.4em] uppercase mb-2">Category Index</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-foreground font-serif italic text-3xl leading-none">
                          {product.name}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <FadeIn className="text-center mt-20" delay={0.2}>
        <Link href="/products">
          <Button className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-white font-condensed font-bold tracking-[0.3em] uppercase text-[10px] px-12 py-6 h-auto rounded-none transition-all duration-500 group">
            <span className="flex items-center gap-3">
              VIEW FULL ARCHIVE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </Link>
      </FadeIn>
    </div>
      </section >

    {/* ── Light Elite About Preview ── */ }
    < section className = "py-24 bg-white relative overflow-hidden" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Image Span 5 */}
          <FadeIn direction="left" className="lg:col-span-5">
            <div className="relative group">
              <motion.div
                className="relative overflow-hidden aspect-[3/4] bg-secondary"
                whileHover={{ transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
              >
                <img
                  src={IMAGES.aboutBg}
                  alt="Sialkot Sample Masters manufacturing facility"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                />
              </motion.div>

              {/* Architectural Floating Badge (Light) */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-white border border-border p-8 shadow-2xl shadow-black/5 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-gold" />
                  <div>
                    <div className="text-4xl font-serif font-bold text-foreground tracking-tighter leading-none mb-1">15<span className="text-gold">yr</span></div>
                    <div className="text-[9px] font-condensed font-bold text-foreground/40 uppercase tracking-[0.2em] leading-tight">Mastery of<br />Craftsmanship</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Content Span 7 */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-6 lg:col-start-7 lg:pl-12">
            <div className="relative">
              <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-8 flex items-center gap-4">
                <span className="w-10 h-px bg-gold" />
                Industrial Pedigree
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
                Pakistan's Foremost
                <br />
                <span className="text-gradient-gold italic font-light">Manufacturing Atelier</span>
              </h2>

              <p className="text-foreground/60 text-base leading-relaxed font-light mb-12 max-w-lg">
                Founded in Sialkot — the artisan capital of Pakistan — we've spent over a decade engineering premium apparel for the global vanguard. Our vertically integrated facility combines irreplaceable human intuition with high-precision industrial output.
              </p>

              {/* Minimalist Bento Grid (Light) */}
              <StaggerChildren className="grid grid-cols-2 gap-px bg-border mb-12 border border-border" stagger={0.1}>
                {bentoCards.map((card) => (
                  <AnimatedChild key={card.label} direction="up">
                    <div className="relative p-8 bg-white group hover:bg-secondary/50 transition-colors duration-500">
                      <card.icon className={`w-4 h-4 mb-4 ${card.accent ? "text-gold" : "text-foreground/20"}`} />
                      <div className="font-serif text-2xl font-bold mb-1 tracking-tight text-foreground">
                        {card.value}
                      </div>
                      <div className="text-foreground/30 font-condensed font-bold text-[9px] uppercase tracking-[0.3em] leading-tight">
                        {card.label}
                      </div>
                    </div>
                  </AnimatedChild>
                ))}
              </StaggerChildren>

              <Link href="/about">
                <Button className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-white transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-12 py-6 h-auto rounded-none group whitespace-nowrap">
                  EXPLORE OUR HERITAGE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
      </section >

    {/* ── Light Elite Masters of the Craft ── */ }
    < section className = "py-24 bg-[#FDFCFB] relative border-b border-border" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Content Span 6 */}
          <FadeIn direction="left" className="lg:col-span-6">
            <div>
              <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-8 flex items-center gap-4">
                <span className="w-10 h-px bg-gold" />
                The Assembly Floor
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground mb-10 leading-[1.1] tracking-tight">
                Crafted by Hands That
                <br />
                <span className="text-gradient-gold italic font-light">Reject Conformity</span>
              </h2>

              {/* Founder quote (Light) */}
              <div className="relative mt-12 mb-12 pl-10 border-l border-gold/30">
                <blockquote className="text-foreground/60 font-light text-lg leading-relaxed italic relative z-10 font-serif">
                  "We initiated Sialkot Sample Masters as an intimate sample room with a singular mandate: to export world-class, undeniable quality. Today, our 250+ team scales that same obsession for global icons."
                </blockquote>
                <div className="mt-12 flex items-center gap-6">
                  <div className="w-14 h-14 rounded-none bg-foreground flex items-center justify-center flex-shrink-0">
                    <span className="text-gold font-serif italic text-2xl font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-foreground font-condensed font-bold text-[11px] uppercase tracking-[0.3em] mb-1">The Founders</p>
                    <p className="text-foreground/40 font-light text-[9px] tracking-[0.2em] uppercase">DIRECTING OPERATIONS FROM SIALKOT SINCE 2010</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Factory Image Span 6 */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-6">
            <div className="relative group">
              <motion.div
                className="relative overflow-hidden aspect-[4/5] bg-secondary"
                whileHover={{ transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
              >
                <img
                  src={IMAGES.servicesBg}
                  alt="Sialkot Sample Masters precision manufacturing"
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                  loading="lazy"
                />
              </motion.div>

              {/* Floating Info (Light) */}
              <div className="absolute bottom-10 left-0 right-10 z-20 transform -translate-x-6">
                <div className="bg-white/95 backdrop-blur-md border border-border p-8 shadow-2xl shadow-black/5">
                  <p className="text-gold font-condensed font-bold text-[10px] tracking-[0.3em] uppercase mb-3">Vanguard of Production</p>
                  <p className="text-foreground font-serif text-xl leading-snug">
                    250+ master craftspeople operating high-precision machinery. Uncompromising excellence across every vertical.
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border-r border-t border-gold/20" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-gold/20" />
            </div>
          </FadeIn>
        </div>
      </div>
      </section >

    {/* ── Light Elite Testimonials ── */ }
    < section className = "py-24 bg-white relative border-b border-border" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          label="Client Protocol"
          title="Endorsed by Global Brands"
          className="mb-24 text-center"
        />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-10" stagger={0.15}>
          {testimonials.map((testimonial) => (
            <AnimatedChild key={testimonial.name} direction="up">
              <div className="relative bg-[#FDFCFB] p-12 border border-border group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-700 h-full flex flex-col">
                {/* Abstract quote mark (Light) */}
                <div className="absolute -top-8 left-10 text-gold/10 font-serif text-[10rem] leading-none italic pointer-events-none transition-colors duration-500 group-hover:text-gold/20">
                  "
                </div>

                <div className="relative z-10 flex flex-col h-full pt-4">
                  {/* Minimal Stars (Light) */}
                  <div className="flex items-center gap-1.5 mb-10">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-gold" />
                    ))}
                  </div>

                  <p className="text-foreground/80 font-light text-lg leading-relaxed mb-12 flex-1 font-serif italic">
                    "{testimonial.text}"
                  </p>

                  <div className="pt-8 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-foreground font-condensed font-bold tracking-[0.2em] text-[11px] uppercase mb-1">
                        {testimonial.name}
                      </p>
                      <p className="text-gold font-condensed font-bold tracking-[0.3em] text-[10px] uppercase">
                        {testimonial.title}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <span className="text-foreground/30 font-serif italic text-sm">{testimonial.country}</span>
                      <span className="inline-flex items-center gap-2 text-green-600/60 text-[8px] font-condensed font-bold uppercase tracking-[0.4em]">
                        <CheckCircle className="w-3.5 h-3.5" /> SECURE PARTNER
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedChild>
          ))}
        </StaggerChildren>
      </div>
      </section >

    {/* ── Light Elite ESG Protocol Ribbon ── */ }
    < section className = "relative py-24 bg-[#F8F9FA] border-b border-border overflow-hidden" >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-24">
          <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-8 flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-gold" />
            Impact Statement
            <span className="w-10 h-px bg-gold" />
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
            Sustainability Engineered at <br />
            <span className="text-gradient-gold italic font-light">Precision Scale</span>
          </h2>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border relative border border-border" stagger={0.15}>
          {esgPillars.map((pillar) => (
            <AnimatedChild key={pillar.title} direction="up" className="bg-white">
              <div className="relative p-10 md:p-16 text-center group h-full hover:bg-secondary/20 transition-colors duration-700">
                <div className="w-20 h-20 rounded-none border border-border flex items-center justify-center mx-auto mb-10 group-hover:bg-foreground group-hover:text-white transition-all duration-500 shadow-sm">
                  <pillar.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="text-foreground font-serif italic text-4xl mb-6 leading-none tracking-tighter">
                  {pillar.stat}
                </p>
                <h3 className="text-gold font-condensed font-bold text-[10px] uppercase tracking-[0.4em] mb-6">
                  {pillar.title}
                </h3>
                <p className="text-foreground/40 text-sm font-light leading-relaxed max-w-[260px] mx-auto">
                  {pillar.body}
                </p>
              </div>
            </AnimatedChild>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center mt-20" delay={0.3}>
          <Link href="/about#certifications">
            <Button className="bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-white transition-all duration-500 font-condensed font-bold tracking-[0.3em] uppercase text-[10px] px-12 py-6 h-auto rounded-none group whitespace-nowrap">
              FACTORY CERTIFICATIONS <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
            </Button>
          </Link>
        </FadeIn>
      </div>
      </section >

    {/* ── Light Elite CTA Section ── */ }
    < section className = "relative py-40 bg-white overflow-hidden border-t border-border" >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="down">
          <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs mb-10 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-gold" />
            Project Initiation
            <span className="w-12 h-px bg-gold" />
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-foreground mb-12 leading-[1.05] tracking-tighter">
            Shall We Build Your
            <br />
            <span className="text-gradient-gold italic font-light">Next Legacy?</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-foreground/50 font-light text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            Engage our master pattern engineers and production leads to bring your technical specifications to fulfillment. Quotations finalized within 24 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/rfq">
              <Button className="bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[11px] px-14 py-7 h-auto rounded-none group shadow-2xl shadow-black/10">
                <span className="flex items-center gap-4">
                  INITIATE RFQ DEPLOYMENT
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </Link>

            <Link href="/contact">
              <Button variant="ghost" className="text-foreground/50 hover:text-foreground font-condensed font-bold tracking-[0.3em] uppercase text-[11px] px-10 py-7 h-auto rounded-none group">
                <span className="flex items-center gap-2">
                  DIRECT CONSULTATION <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-1" />
                </span>
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
      </section >
    </PageWrapper >
  );
}
