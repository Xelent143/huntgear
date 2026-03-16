import { Link } from "wouter";
import { ArrowRight, Shield, Droplets, Wind, Thermometer, Target, Layers, Scissors, Printer, Box, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";
import { Breadcrumb, predefinedBreadcrumbs } from "@/components/Breadcrumb";

const mainServices = [
  {
    icon: Shield,
    title: "Waterproof Manufacturing",
    desc: "20K/20K waterproof ratings with seam-sealed construction. DWR treatments and waterproof membranes.",
    features: ["Seam Sealing", "DWR Treatment", "Membrane Bonding", "Hydrostatic Testing"]
  },
  {
    icon: Target,
    title: "Camo Pattern Design",
    desc: "Custom camouflage patterns designed for specific terrains and hunting environments.",
    features: ["Digital Patterns", "Woodland Camo", "Terrain-Specific", "Color Matching"]
  },
  {
    icon: Droplets,
    title: "Scent Control Technology",
    desc: "Silver-ion and carbon-integrated fabrics for odor absorption in the field.",
    features: ["Silver-Ion Treatment", "Carbon Integration", "Anti-Microbial", "Odor Blocking"]
  },
  {
    icon: Thermometer,
    title: "Insulation Systems",
    desc: "PrimaLoft, down, and synthetic insulation for varying temperature conditions.",
    features: ["PrimaLoft Gold", "Goose Down", "Synthetic Fill", "Layer Optimization"]
  },
  {
    icon: Layers,
    title: "Layering Systems",
    desc: "Complete base-to-outer layer systems designed to work together in the field.",
    features: ["Base Layers", "Mid Layers", "Outer Shells", "System Integration"]
  },
  {
    icon: Wind,
    title: "Windproof Technology",
    desc: "Wind-blocking fabrics and membranes for harsh weather protection.",
    features: ["Windstopper", "Laminated Fabrics", "Draft Protection", "Breathability"]
  },
];

const processSteps = [
  { step: "01", title: "Design & Pattern", desc: "CAD pattern drafting and technical specifications" },
  { step: "02", title: "Sampling", desc: "Prototype development with 7-day turnaround" },
  { step: "03", title: "Material Sourcing", desc: "Premium fabrics from certified suppliers worldwide" },
  { step: "04", title: "Production", desc: "Manufacturing with strict QC at every stage" },
  { step: "05", title: "Finishing", desc: "Final QC, packaging, and export documentation" },
];

const capabilities = [
  { icon: Scissors, title: "Pattern Making", desc: "Lectra CAD systems, digital grading, marker making" },
  { icon: Printer, title: "Printing & Embroidery", desc: "DTF, sublimation, DTG, multi-head embroidery" },
  { icon: Box, title: "Private Label", desc: "Custom labels, hang tags, packaging design" },
  { icon: Globe, title: "Global Export", desc: "DHL, FedEx, air & sea freight with full documentation" },
];

export default function Services() {
  return (
    <PageWrapper>
      <SEOHead
        title="Manufacturing Services | Xelent Huntgear Pakistan"
        description="Full-service hunting apparel manufacturing. Waterproof technology, camo design, scent control, insulation systems. OEM/ODM services with low MOQ 50pcs."
        canonical="/services"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#0a0a0a] border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={predefinedBreadcrumbs.services} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.servicesHeroBg} alt="Xelent Huntgear Manufacturing Services - Waterproof hunting apparel production facility with seam sealing and DWR treatment capabilities" className="w-full h-full object-cover opacity-60" />
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
              Manufacturing Capabilities
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6"
            >
              End-to-End
              <span className="block text-[#ff6b00] italic font-light">Production</span>
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
              From concept to delivery, we provide complete hunting apparel manufacturing services.
              Waterproof technology, custom camo, scent control, and full layering systems.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN SERVICES - Grid
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Manufacturing Services</h2>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {mainServices.map((service) => (
              <AnimatedChild key={service.title} direction="up">
                <div className="group bg-[#161616] border border-white/10 p-8 h-full hover:border-[#ff6b00]/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center group-hover:bg-[#ff6b00]/20 transition-colors">
                      <service.icon className="w-7 h-7 text-[#ff6b00]" />
                    </div>
                  </div>
                  <h3 className="font-condensed font-bold text-xl text-white uppercase mb-3 group-hover:text-[#ff6b00] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-white/50 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#ff6b00]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROCESS - Timeline Style
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              How It Works
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Our Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-[#111111] border border-white/10 p-6 h-full hover:border-[#ff6b00]/30 transition-colors">
                  <span className="text-[#ff6b00] font-condensed font-bold text-3xl">{step.step}</span>
                  <h3 className="text-white font-condensed font-bold uppercase mt-4 mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-[#ff6b00]/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ADDITIONAL CAPABILITIES
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-3">
              Full Service
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Additional Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 border border-white/10 hover:border-[#ff6b00]/50 transition-colors group"
              >
                <div className="w-16 h-16 bg-[#ff6b00]/10 border border-[#ff6b00]/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ff6b00]/20 transition-colors">
                  <cap.icon className="w-8 h-8 text-[#ff6b00]" />
                </div>
                <h3 className="font-condensed font-bold text-lg text-white uppercase mb-2">{cap.title}</h3>
                <p className="text-white/50 text-sm">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA
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
            Start Your
            <span className="block text-[#ff6b00]">Manufacturing Project</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Get a free quote for your hunting apparel line. Low MOQ 50pcs,
            7-day samples, and premium quality guaranteed.
          </p>
          <Link href="/rfq">
            <Button className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider text-lg px-12 py-4 h-auto shadow-[0_0_40px_rgba(255,107,0,0.4)]">
              Request Free Quote <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
