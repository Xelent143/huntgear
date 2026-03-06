import { Link } from "wouter";
import { ArrowRight, CheckCircle, Palette, Package, Layers, Truck, Settings, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper, SectionHeading } from "@/components/animations";

const services = [
  {
    id: "pattern-drafting",
    icon: Scissors,
    title: "Digital Pattern Drafting & Grading",
    subtitle: "Precision Engineering",
    description:
      "Our Sialkot-based design hub utilizes advanced CAD/CAM technology to translate your creative sketches into production-ready digital patterns. We ensure perfect fit across all size ranges for complex silhouettes.",
    features: [
      "Precision digital grading (XS to 5XL+)",
      "Technical tech-pack development",
      "Prototyping & fit sample validation",
      "Fabric consumption optimization",
      "Confidentiality & design protection",
    ],
    image: IMAGES.servicePattern,
  },
  {
    id: "printing-hub",
    icon: Palette,
    title: "Advanced Textile Printing Hub",
    subtitle: "Vibrant, Industrial Scale",
    description:
      "Equipped with high-performance sublimation, screen printing, DTF, and DTG machinery. We deliver sharp, high-contrast graphics that withstand the rigors of athletic performance and high-frequency wear.",
    features: [
      "No-fade full sublimation printing",
      "Soft-hand water-based screen printing",
      "High-definition DTF & DTG transfers",
      "Silicone & reflective printing specialists",
      "Eco-friendly ink certifications",
    ],
    image: IMAGES.servicePrinting,
  },
  {
    id: "stitching-sewing",
    icon: Settings,
    title: "Industrial Stitching & Assembly",
    subtitle: "50+ Inhouse Sewing Units",
    description:
      "Our factory floor is optimized for speed and durability. From flatlock seams in compression sportswear to reinforced stitching in tactical hunting gear, our skilled artisans master every stitch.",
    features: [
      "Flatlock, overlock, and twin-needle",
      "Reinforced heavy-duty stitching",
      "Industrial-scale capacity",
      "Sportswear & streetwear specialization",
      "Automated pocket & zipper attachment",
    ],
    image: IMAGES.serviceStitching,
  },
  {
    id: "embroidery",
    icon: Layers,
    title: "Luxury Embroidery & Branding",
    subtitle: "Premium Brand Identity",
    description:
      "Transform your apparel into luxury items with our high-precision multi-head embroidery services. We specialize in complex 3D puff embroidery, patches, and metallic thread applications.",
    features: [
      "High-density 3D puff embroidery",
      "Custom woven & chenille patches",
      "Appliqué & metallic thread work",
      "Precise logo placement & branding",
      "Woven labels & custom hang tags",
    ],
    image: IMAGES.serviceEmbroidery,
  },
  {
    id: "quality-assurance",
    icon: CheckCircle,
    title: "ISO-Certified Quality Control",
    subtitle: "Uncompromising Standards",
    description:
      "Every garment undergoes a multi-stage inspection process. We maintain a 99% global quality pass rate, ensuring your brand's reputation remains flawless in the international market.",
    features: [
      "4-point fabric inspection system",
      "In-line and final QC checks",
      "ANSI/ASQ Z1.4 sampling standards",
      "Rigid measurement verification",
      "Standardized needle detection tests",
    ],
    image: IMAGES.serviceQC,
  },
  {
    id: "global-logistics",
    icon: Truck,
    title: "Global Export & Logistics",
    subtitle: "Seamless Factory-to-Door",
    description:
      "Expertise in frictionless B2B exports. We manage all documentation and logistics for shipments to the USA, UK, Europe, Australia, and the Middle East with speed and transparency.",
    features: [
      "DDP, FOB, and CIF shipping terms",
      "USA/EU customs documentation",
      "Consolidated bulk shipping rates",
      "Real-time tracking & delivery stats",
      "Secure palletized B2B packaging",
    ],
    image: IMAGES.serviceLogistics,
  },
];

const process = [
  { step: "01", title: "Inquiry & Consultation", desc: "Submit your RFQ or contact us. Our B2B specialist reviews your requirements and responds within 24 hours." },
  { step: "02", title: "Quotation & Agreement", desc: "We provide a detailed quote with pricing, lead times, and specifications. Upon approval, we sign an NDA and production agreement." },
  { step: "03", title: "Sample Development", desc: "Our team develops samples based on your tech pack or design brief. Revisions continue until you approve." },
  { step: "04", title: "Bulk Production", desc: "Upon sample approval and deposit, bulk production begins. You receive regular production updates and photos." },
  { step: "05", title: "Quality Inspection", desc: "Every order undergoes rigorous QC inspection. Third-party inspection is available upon request." },
  { step: "06", title: "Shipping & Delivery", desc: "We handle packaging, documentation, and shipping. Your order arrives on time, every time." },
];

export default function Services() {
  return (
    <PageWrapper>
      <SEOHead
        title="Custom Apparel Manufacturing & Export Services | Sialkot Pakistan"
        description="Explore Sialkot Sample Masters' comprehensive manufacturing services: Digital Pattern Drafting, Industrial Sublimation, High-Speed Stitching, and Global B2B Logistics. Sialkot's leading OEM/ODM partner for global brands."
        keywords="clothing manufacturing services Sialkot, custom apparel manufacturer Pakistan, sublimation printing wholesale, clothing factory Sialkot, private label apparel manufacturer, export quality garments Pakistan"
        canonical="/services"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
        ]}
      />

      <main className="bg-[#0a0a0a] text-foreground min-h-screen">
        {/* ── Elite Hero ── */}
        <section
          className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-black"
          style={{ backgroundImage: `url(${IMAGES.servicesBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {/* Intense gradient overlays for cinematic depth */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="max-w-3xl">
              <FadeIn direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="w-8 h-px bg-gold" />
                  <p className="text-gold font-condensed font-bold tracking-[0.3em] uppercase text-xs">
                    Industrial Precision & Service
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight speakable-title">
                  High-Performance
                  <br />
                  <span className="text-gradient-gold italic font-light">Manufacturing <span className="font-serif not-italic">Ecosystem</span></span>
                </h1>
                <p className="speakable-description hidden">Sialkot Sample Masters provides vertically integrated manufacturing solutions including pattern drafting, textile printing, assembly, and global B2B logistics.</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex sm:justify-start justify-center mt-8">
                  <p className="text-white/60 font-light text-lg sm:text-xl leading-relaxed max-w-2xl border-l border-gold/30 pl-6 text-left">
                    From technical pattern drafting to global B2B logistics, we provide a vertically integrated manufacturing partner for the world's most ambitious apparel brands.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Elite Services Detail ── */}
        <section className="py-24 bg-black relative border-t border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">
            {services.map((service, i) => (
              <FadeIn key={service.id} direction="up" delay={0.1}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
                >
                  <div className={`flex flex-col text-left ${i % 2 !== 0 ? "lg:col-span-5 lg:order-2" : "lg:col-span-6"}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#050505] border border-white/10 shrink-0">
                        <service.icon className="w-5 h-5 text-gold" />
                      </div>
                      <p className="text-gold font-condensed font-bold tracking-[0.2em] uppercase text-xs">
                        {service.subtitle}
                      </p>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-white/50 font-light text-sm sm:text-base leading-relaxed mb-10 border-l border-gold/30 pl-6">
                      {service.description}
                    </p>

                    <ul className="grid grid-cols-1 gap-4 mb-10">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-4">
                          <CheckCircle className="w-3.5 h-3.5 text-white/20 shrink-0 mt-0.5" />
                          <span className="text-white/60 text-sm font-light">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <Link href="/rfq">
                        <Button className="relative overflow-hidden bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold transition-colors duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-8 py-5 h-auto rounded-none group">
                          <span className="relative z-10 flex items-center gap-2">
                            Request Specification <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className={`relative w-full h-full min-h-[400px] overflow-hidden group ${i % 2 !== 0 ? "lg:col-span-7 lg:order-1" : "lg:col-span-6"}`}>
                    <div className="absolute inset-0 bg-[#050505] z-0" />
                    <img
                      src={service.image}
                      alt={`${service.title} - Sialkot Sample Masters Pakistan`}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 z-10 grayscale-[50%] group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal"
                      loading="lazy"
                    />

                    {/* Architectural Borders */}
                    <div className="absolute inset-0 border border-white/5 z-20 pointer-events-none" />
                    <div className="absolute inset-4 border border-white/10 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-20 opacity-80" />

                    {/* Index Number Overlay */}
                    <div className="absolute bottom-6 left-6 z-30 opacity-50 font-serif text-6xl text-white/10 font-bold select-none">
                      0{i + 1}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Elite Process Pipeline ── */}
        <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 sm:mb-24">
              <FadeIn direction="down" delay={0.1}>
                <div className="inline-flex items-center justify-center gap-3 mb-6">
                  <span className="w-8 h-px bg-gold" />
                  <p className="text-gold font-condensed font-bold tracking-[0.3em] uppercase text-xs">
                    EEAT Framework Compliance
                  </p>
                  <span className="w-8 h-px bg-gold" />
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Strategic Production
                  <br />
                  <span className="text-gradient-gold italic font-light">Workflow</span>
                </h2>
              </FadeIn>
            </div>

            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10" stagger={0.1}>
              {process.map((p, index) => (
                <AnimatedChild key={p.step} direction="up">
                  <div className="bg-[#050505] p-8 sm:p-10 hover:bg-white/[0.02] transition-colors duration-500 h-full relative group">
                    <div className="absolute top-0 left-0 w-0 h-px bg-gold transition-all duration-700 ease-out group-hover:w-full" />

                    <div className="flex items-center justify-between mb-8">
                      <div className="text-5xl font-serif font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                        {p.step}
                      </div>
                      <div className="w-8 h-px bg-white/10 group-hover:bg-gold/50 transition-colors duration-500" />
                    </div>

                    <h3 className="font-condensed font-bold text-white uppercase tracking-[0.2em] mb-4 text-sm sm:text-base group-hover:text-gold transition-colors duration-500">{p.title}</h3>
                    <p className="text-white/40 font-light text-sm sm:text-base leading-relaxed">{p.desc}</p>
                  </div>
                </AnimatedChild>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* ── Elite CTA ── */}
        <section className="py-32 bg-[#050505] relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[rgba(212,175,55,0.05)] via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <h2 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-8 leading-[1.1]">
                Ready to Accelerate Your
                <br />
                <span className="text-gradient-gold italic font-light">Global Market Presence?</span>
              </h2>
              <p className="text-white/50 font-light text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                Partner with Sialkot’s masters of precision. Secure your production slot and receive an expert-led B2B consultation for your next collection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/rfq">
                  <Button className="relative overflow-hidden bg-gold text-black hover:text-white transition-colors duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs px-10 py-6 h-auto rounded-none group border border-transparent hover:border-white/20 shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)]">
                    <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[var(--bezier-out)]" />
                    <span className="relative z-10 flex items-center gap-2">
                      Request Instant Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 hover:text-gold font-condensed font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs px-10 py-6 h-auto rounded-none transition-colors duration-300">
                    Contact Specialist
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
