import { Link } from "wouter";
import { ArrowRight, ChevronRight, Award, Globe, Package, Zap, CheckCircle, Shield, Target, Wind, Thermometer, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import {
  FadeIn,
  StaggerChildren,
  AnimatedChild,
  CountUp,
  PageWrapper,
} from "@/components/animations";
import FeaturedProductCarousel from "@/components/FeaturedProductCarousel";

// Stats
const stats = [
  { value: 15, suffix: "+", label: "Years", sublabel: "Excellence" },
  { value: 500, suffix: "+", label: "Brands", sublabel: "Served" },
  { value: 40, suffix: "+", label: "Countries", sublabel: "Exported" },
  { value: 50, suffix: "K+", label: "Units", sublabel: "Monthly" },
];

// Product Categories with hunting focus
const categories = [
  {
    name: "Outerwear",
    items: "Shells • Insulated • Softshell",
    image: IMAGES.catHunting,
    tag: "20K Waterproof"
  },
  {
    name: "Mid Layers",
    items: "Fleece • Down • Synthetic",
    image: IMAGES.catSports,
    tag: "Thermal"
  },
  {
    name: "Base Layers",
    items: "Merino • Synthetic • Blends",
    image: IMAGES.catHuntingGear,
    tag: "Moisture Wicking"
  },
  {
    name: "Bottoms",
    items: "Pants • Bibs • Shorts",
    image: IMAGES.catTechwear,
    tag: "Reinforced"
  },
];

// Technical capabilities with images for redesign
const capabilities = [
  {
    title: "Waterproof Production",
    desc: "20K/20K Seam-Sealed",
    detail: "Advanced moisture protection using high-performance membranes and precision seam-sealing technology.",
    image: IMAGES.capWaterproof
  },
  {
    title: "Camo Pattern Design",
    desc: "Custom Terrains",
    detail: "Proprietary camouflage systems engineered for specific environments, from alpine peaks to deep timber.",
    image: IMAGES.capCamoDesign
  },
  {
    title: "Scent Control Tech",
    desc: "Silver-Ion Integration",
    detail: "Odor-absorbing fabric treatments that keep you undetected in the heat of the pursuit.",
    image: IMAGES.capScentControl
  },
];

// Hunt types for the visual grid - Redesigned with images and descriptions
const huntTypes = [
  {
    species: "Whitetail",
    season: "Sep - Jan",
    terrain: "Deep Woods",
    color: "#2d5016",
    description: "Silent, scent-controlled gear engineered for close-range timber pursuits.",
    image: IMAGES.specWhitetail
  },
  {
    species: "Elk",
    season: "Sep - Nov",
    terrain: "Alpine Peaks",
    color: "#4a3728",
    description: "Breathable, high-mobility layering systems for demanding mountain ascents.",
    image: IMAGES.specElk
  },
  {
    species: "Waterfowl",
    season: "Oct - Feb",
    terrain: "Frozen Wetlands",
    color: "#1e3a5f",
    description: "20K waterproof shells and insulated systems for harsh wet environments.",
    image: IMAGES.specWaterfowl
  },
  {
    species: "Turkey",
    season: "Apr - May",
    terrain: "Mixed Hardwoods",
    color: "#5c4a2a",
    description: "Full-coverage concealment systems with precision camo for wary spring gobblers.",
    image: IMAGES.specTurkey
  },
  {
    species: "Mule Deer",
    season: "Sep - Nov",
    terrain: "High Desert",
    color: "#8b6914",
    description: "Versatile, windproof systems designed for glassing and spot-and-stalk hunts.",
    image: IMAGES.specMuleDeer
  },
  {
    species: "Predator",
    season: "Year-round",
    terrain: "Open Country",
    color: "#3d3d3d",
    description: "Tactical-grade concealment gear for long-range surveillance and fast performance.",
    image: IMAGES.specPredator
  },
];

// Testimonials
const testimonials = [
  {
    quote: "The waterproof technology and attention to detail rivals any brand in our lineup. Xelent understands what hunters need.",
    author: "Marcus Johnson",
    role: "Product Director",
    company: "Backcountry Hunters",
    location: "USA"
  },
  {
    quote: "We've sourced from manufacturers across Asia. Xelent's quality control and camo pattern expertise are unmatched.",
    author: "Sophie Laurent",
    role: "Founder",
    company: "Alpine Gear Co.",
    location: "France"
  },
  {
    quote: "From custom patterns to scent-control fabrics, every specification was executed perfectly. Our customers notice the difference.",
    author: "James Chen",
    role: "CEO",
    company: "Outback Outfitters",
    location: "Australia"
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <SEOHead
        title="Premium Hunting Apparel Manufacturer | Xelent Huntgear"
        description="Custom hunting gear manufacturer. Waterproof shells, insulated parkas, camo systems. B2B wholesale. Low MOQ 50pcs. Export to USA, Europe, Australia."
        canonical="/"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - Cinematic Full Screen
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroAlpineExtreme}
            alt="Alpine Extreme - Precision Hunting Apparel Systems by Xelent"
            className="w-full h-full object-cover opacity-80"
          />
          {/* Enhanced Gradient Overlays for Cinematic Feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 glass-vibe px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-[#ff6b00] rounded-full animate-vibe-pulse shadow-[0_0_12px_#ff6b00]" />
              <span className="text-white text-[10px] font-heading font-medium uppercase tracking-[0.3em]">Premium B2B OEM Partner</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif font-black text-white leading-[0.85] mb-8 tracking-tighter text-vibe-glow"
            >
              PRECISION<br />
              <span className="text-[#ff6b00]">AT THE EDGE.</span>
            </motion.h1>

            {/* Sub-tagline: Montserrat Spaced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-lg sm:text-xl text-white font-heading font-semibold uppercase tracking-[0.25em] mb-2">
                Technical Hunting Systems
              </p>
              <div className="w-12 h-1 bg-[#ff6b00] mb-4" />
              <p className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed italic border-l-2 border-white/20 pl-4">
                Engineered for the most unforgiving environments on Earth.
              </p>
            </motion.div>

            {/* Brief BLUF Cards instead of the large block */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { label: "Waterproof", value: "20,000mm", icon: Droplets },
                { label: "Breathable", value: "ASTM E96", icon: Wind },
                { label: "Certified", value: "OEKO-TEX", icon: Shield },
                { label: "Response", value: "24h Quote", icon: Zap },
              ].map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-vibe p-4 transition-all duration-300 hover:bg-white/10 group/spec"
                >
                  <spec.icon className="w-4 h-4 text-[#ff6b00] mb-2 vibe-glow-orange group-hover/spec:scale-110 transition-transform" />
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{spec.label}</div>
                  <div className="text-xs text-white font-bold">{spec.value}</div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/rfq">
                <button className="group bg-[#ff6b00] hover:bg-[#ff8533] text-black font-condensed font-bold uppercase tracking-wider px-8 py-4 transition-all duration-300 shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_50px_rgba(255,107,0,0.6)]">
                  <span className="flex items-center gap-3">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <Link href="/portfolio">
                <button className="border border-white/40 hover:border-[#ff6b00] text-white hover:text-[#ff6b00] font-condensed font-bold uppercase tracking-wider px-8 py-4 transition-all duration-300 backdrop-blur-sm bg-black/30">
                  View Portfolio
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats Row - Moved into flow to prevent overlap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-x-12 gap-y-6 mt-16 pb-12"
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-condensed font-bold text-white">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/60 text-xs uppercase tracking-wider">{stat.label}</div>
                <div className="text-white/40 text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 text-white/40 text-xs uppercase tracking-[0.3em] hidden lg:block"
        >
          <div className="flex flex-col items-center gap-2">
            <span>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#ff6b00] to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FEATURED PRODUCTS - Technical Carousel
          ═══════════════════════════════════════════════════════════════════════ */}
      <FeaturedProductCarousel />

      {/* ═══════════════════════════════════════════════════════════════════════
          HUNT TYPES - Visual Species Grid
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ff6b00] text-xs font-condensed uppercase tracking-[0.2em]">Pursuit-Driven Manufacturing</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Gear for Every Species</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {huntTypes.map((hunt, i) => (
              <motion.div
                key={hunt.species}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative h-[300px] overflow-hidden bg-[#111111]"
              >
                {/* Background Image */}
                <img
                  src={hunt.image}
                  alt={`${hunt.species} hunting gear - ${hunt.description} Custom ${hunt.species} apparel manufactured by Xelent Huntgear`}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-70"
                />

                {/* Accent Bar at Bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 z-20 transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: hunt.color }}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#ff6b00] text-[10px] font-bold uppercase tracking-widest">{hunt.season}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{hunt.terrain}</span>
                    </div>

                    <h3 className="text-white font-condensed font-bold text-3xl uppercase mb-2 group-hover:text-[#ff6b00] transition-colors">
                      {hunt.species}
                    </h3>

                    {/* Brief Description - Hidden until hover */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
                        {hunt.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRODUCT CATEGORIES - Large Cards
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-[#ff6b00] text-xs font-condensed uppercase tracking-[0.2em]">Product Lines</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">Complete Systems</h2>
            </div>
            <p className="text-white/60 max-w-md mt-4 md:mt-0">
              From base layers to outer shells, manufacture complete layering systems for any hunt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} - ${cat.items} - Custom hunting ${cat.name.toLowerCase()} manufacturer Pakistan - ${cat.tag}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#ff6b00] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                    {cat.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-condensed font-bold text-2xl uppercase mb-1 group-hover:text-[#ff6b00] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-white/60 text-sm">{cat.items}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#ff6b00] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <span className="text-xs font-bold uppercase tracking-wider">Explore</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CAPABILITIES - Technical Grid
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#ff6b00] text-xs font-condensed uppercase tracking-[0.2em]">Manufacturing Excellence</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">Technical Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[450px] overflow-hidden"
              >
                {/* Background Image */}
                <img
                  src={cap.image}
                  alt={`${cap.title} - ${cap.desc} Manufacturing Capability at Xelent Huntgear`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-[#ff6b00]/10 transition-colors duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end overflow-hidden">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-[#ff6b00] text-xs font-condensed font-bold uppercase tracking-[0.2em] mb-2 block">
                      {cap.desc}
                    </span>
                    <h3 className="text-white font-condensed font-bold text-3xl uppercase mb-3">
                      {cap.title}
                    </h3>

                    {/* Animated Description */}
                    <motion.p
                      className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                    >
                      {cap.detail}
                    </motion.p>

                    {/* Bottom Line */}
                    <div className="mt-6 w-12 h-1 bg-[#ff6b00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT / WHY US
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={IMAGES.aboutBg}
                  alt="Modern Hunting Apparel Manufacturing Site in Sialkot - ISO 9001 Certified Production"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#ff6b00] text-black p-6">
                <div className="text-4xl font-condensed font-bold">15+</div>
                <div className="text-xs font-bold uppercase tracking-wider">Years</div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-[#ff6b00] text-xs font-condensed uppercase tracking-[0.2em]">About Xelent</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
                Pakistan's Premier
                <span className="block text-[#ff6b00] italic font-light">Hunting Manufacturer</span>
              </h2>
              <div className="w-16 h-1 bg-[#ff6b00] mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Founded in Sialkot, we've been crafting premium hunting apparel since 2009.
                Our vertically integrated facility specializes in waterproof gear, custom camo patterns,
                and tactical equipment for brands worldwide.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-2 border-[#ff6b00] pl-4">
                  <div className="text-2xl font-condensed font-bold text-white">50 pcs</div>
                  <div className="text-white/50 text-sm">Minimum Order</div>
                </div>
                <div className="border-l-2 border-[#ff6b00] pl-4">
                  <div className="text-2xl font-condensed font-bold text-white">7 Days</div>
                  <div className="text-white/50 text-sm">Sample Turnaround</div>
                </div>
                <div className="border-l-2 border-[#ff6b00] pl-4">
                  <div className="text-2xl font-condensed font-bold text-white">ISO 9001</div>
                  <div className="text-white/50 text-sm">Certified Quality</div>
                </div>
                <div className="border-l-2 border-[#ff6b00] pl-4">
                  <div className="text-2xl font-condensed font-bold text-white">24h</div>
                  <div className="text-white/50 text-sm">Quote Response</div>
                </div>
              </div>

              <Link href="/about">
                <Button variant="outline" className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00] hover:text-black font-condensed font-bold uppercase tracking-wider px-8 py-3">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#ff6b00] text-xs font-condensed uppercase tracking-[0.2em]">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Trusted by Brands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 p-8 hover:border-[#ff6b00]/30 transition-colors"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-2 h-2 bg-[#ff6b00]" />
                  ))}
                </div>
                <p className="text-white/80 text-base leading-relaxed mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-10 h-10 bg-[#ff6b00]/20 flex items-center justify-center text-[#ff6b00] font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.author}</div>
                    <div className="text-white/50 text-sm">{t.role}, {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #ff6b00 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Build Your
            <span className="block text-[#ff6b00]">Hunting Brand?</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Get a free quote for custom manufacturing. Low MOQ 50pcs.
            Fast sample turnaround. Premium quality guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rfq">
              <button className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-condensed font-bold uppercase tracking-wider px-10 py-4 transition-all shadow-[0_0_40px_rgba(255,107,0,0.4)] hover:shadow-[0_0_60px_rgba(255,107,0,0.6)]">
                Request Free Quote
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white/30 hover:border-[#ff6b00] text-white hover:text-[#ff6b00] font-condensed font-bold uppercase tracking-wider px-10 py-4 transition-all bg-black/30 backdrop-blur">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper >
  );
}
