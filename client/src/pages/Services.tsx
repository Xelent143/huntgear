import { Link } from "wouter";
import { ArrowRight, CheckCircle, Palette, Package, Layers, Truck, Settings, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper, SectionHeading } from "@/components/animations";

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
        {/* Hero */}
        <section
          className="relative pt-16 pb-20 overflow-hidden"
          style={{ backgroundImage: `url(${IMAGES.servicesBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="max-w-3xl">
              <FadeIn direction="down" delay={0.1}>
                <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Industrial Precision & Service</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight speakable-title">
                  High-Performance
                  <br />
                  <span className="text-gradient-gold italic">Manufacturing Ecosystem</span>
                </h1>
                <p className="speakable-description hidden">Sialkot Sample Masters provides vertically integrated manufacturing solutions including pattern drafting, textile printing, assembly, and global B2B logistics.</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="gold-divider" />
                <p className="text-slate-200 text-lg leading-relaxed mt-6">
                  From technical pattern drafting to global B2B logistics, we provide a vertically integrated manufacturing partner for the world's most ambitious apparel brands.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="section-padding bg-[#0a0a0a] relative">
          {/* Subtle dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">
            {services.map((service, i) => (
              <FadeIn key={service.id} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                    <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                      <service.icon className="w-6 h-6 text-gold" />
                    </div>
                    <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-xs mb-2">{service.subtitle}</p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">{service.title}</h2>
                    <div className="gold-divider" />
                    <p className="text-muted-foreground leading-relaxed mt-4 mb-6">{service.description}</p>
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                          <span className="text-foreground text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/rfq">
                      <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm">
                        Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className={`relative overflow-hidden rounded-sm aspect-[4/3] ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                    <img
                      src={service.image}
                      alt={`${service.title} - Sialkot Sample Masters Pakistan`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-black/20 border-y border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">EEAT Framework Compliance</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Strategic Production
                <span className="text-gradient-gold italic"> Workflow</span>
              </h2>
              <div className="gold-divider mx-auto" />
            </div>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.09}>
              {process.map((p) => (
                <AnimatedChild key={p.step} direction="up">
                  <HoverCard className="h-full">
                    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-sm p-6 hover:border-gold/30 transition-colors h-full">
                      <div className="text-5xl font-condensed font-bold text-gold/20 mb-3">{p.step}</div>
                      <h3 className="font-condensed font-bold text-foreground uppercase tracking-wide mb-2">{p.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </HoverCard>
                </AnimatedChild>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/5 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <h2 className="font-serif text-5xl font-bold text-foreground mb-6 leading-tight">
                Ready to Accelerate Your
                <br />
                <span className="text-gradient-gold italic">Global Market Presence?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Partner with Sialkot’s masters of precision. Secure your production slot and receive an expert-led B2B consultation for your next collection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/rfq">
                  <Button className="h-14 px-10 bg-gold text-black hover:bg-gold-light font-condensed font-bold tracking-widest uppercase text-sm rounded-sm shadow-xl shadow-gold/10">
                    Request Instant Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="h-14 px-10 font-bold uppercase tracking-widest text-sm border-gold/40 hover:bg-gold/5">
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
