import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, PageWrapper } from "@/components/animations";

const products = [
  {
    id: "sportswear",
    name: "Custom Sportswear",
    tag: "Athletic Performance",
    image: IMAGES.catSports,
    description:
      "High-performance athletic apparel built for serious athletes and sports brands. From customized basketball and soccer uniforms to ice hockey, baseball, and American football jerseys. Engineered with advanced moisture-wicking and four-way stretch fabrics.",
    specs: [
      { label: "Fabric Options", value: "Polyester Interlock, Spandex Blend, Mesh, Heavyweight Knit" },
      { label: "Sub-Categories", value: "Basketball, Soccer, Baseball, American Football, Ice Hockey" },
      { label: "Weight Range", value: "140 GSM – 260 GSM" },
      { label: "Customization", value: "Sublimation, Tackle Twill, Screen Print, Embroidery" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "25–35 Days (Bulk)" },
    ],
    features: [
      "Full 360° sublimation printing available",
      "Reinforced flatlock seam construction",
      "Player numbering and naming customization",
      "Breathable, moisture-wicking technology",
      "Anti-pilling fabric treatment",
      "Pantone color matching for team colors",
    ],
  },
  {
    id: "hunting-wear",
    name: "Custom Hunting Wear",
    tag: "Tactical Grade",
    image: IMAGES.catHunting,
    description:
      "Engineered for the field. Our custom hunting wear combines military-grade durability with advanced concealment technology. From multicam jackets to ripstop cargo pants, every piece is built to perform in demanding outdoor environments.",
    specs: [
      { label: "Fabric Options", value: "Ripstop Nylon, Cotton-Poly Blend, Softshell, Fleece Lining" },
      { label: "Camo Patterns", value: "Multicam, Woodland, Digital, Custom Print Available" },
      { label: "Weight Range", value: "180 GSM – 320 GSM" },
      { label: "Customization", value: "Embroidery, Screen Print, Sublimation, Laser Cut Patches" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "30–40 Days (Bulk)" },
    ],
    features: [
      "YKK zippers with silent pull tabs",
      "Velcro patch panels for morale patches",
      "Articulated knee and elbow panels",
      "Scent-control fabric treatment available",
      "Reinforced stress-point stitching",
      "Custom woven labels and hang tags",
    ],
  },
  {
    id: "streetwear",
    name: "Custom Streetwear",
    tag: "Lifestyle & Urban",
    image: IMAGES.catStreetwear,
    description:
      "Premium custom streetwear manufactured for brands that demand quality. From heavyweight oversized hoodies and bomber jackets to cargo joggers and graphic tees, our streetwear line is built on 400-GSM French terry, premium nylon, and ring-spun cotton.",
    specs: [
      { label: "Fabric Options", value: "400 GSM French Terry, Ring-Spun Cotton, Nylon Ripstop, Fleece" },
      { label: "Weight Range", value: "280 GSM – 450 GSM" },
      { label: "Fits Available", value: "Oversized, Boxy, Regular, Slim" },
      { label: "Customization", value: "DTG, DTF, Embroidery, Puff Print, Woven Labels" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "25–35 Days (Bulk)" },
    ],
    features: [
      "Custom pre-shrunk garment washes",
      "Vintage fades, acid wash, and tie-dye",
      "Gold/silver premium hardware options",
      "Eco-friendly fabric options available",
      "Private label packaging",
      "Expert pattern drafting in-house",
    ],
  },
  {
    id: "security-uniforms",
    name: "Custom Security Uniforms",
    tag: "Professional Guard",
    image: IMAGES.catSecurityUniforms,
    description:
      "Authoritative, durable, and comfortable security uniforms designed for 12-hour shifts. We supply global security firms with tactical polos, high-visibility vest systems, reinforced trousers, and weather-resistant outerwear.",
    specs: [
      { label: "Fabric Options", value: "Poly-Cotton Twill, Ripstop, Moisture-Wicking Pique" },
      { label: "Weight Range", value: "180 GSM – 260 GSM" },
      { label: "Visibility", value: "3M Reflective Taping Available" },
      { label: "Customization", value: "Direct Embroidery, Epaulets, Heat Transfer Badges" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "25–35 Days (Bulk)" },
    ],
    features: [
      "Teflon® stain-resistant coating options",
      "Mic loops and badge tabs",
      "Reinforced knees and gusseted crotches",
      "Permanent press finishes",
      "Hidden tactical pockets",
      "Custom brass or silver button details",
    ],
  },
  {
    id: "techwear",
    name: "Custom Techwear",
    tag: "Utility & Futurism",
    image: IMAGES.catTechwear,
    description:
      "Where function meets futurism. Our custom techwear line is engineered for the modern environment — modular utility vests, articulated cargo pants, and multi-pocket shell jackets. Built from DWR-coated technical fabrics with precision construction.",
    specs: [
      { label: "Fabric Options", value: "Nylon Ripstop, Cordura, DWR-Coated Shell, Stretch Woven" },
      { label: "Hardware", value: "ITW Nexus Buckles, YKK Aquaguard Zippers, D-Rings" },
      { label: "Weight Range", value: "160 GSM – 300 GSM" },
      { label: "Customization", value: "Laser Etching, Embroidery, Woven Patches, Custom Hardware" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "30–40 Days (Bulk)" },
    ],
    features: [
      "Modular attachment points (MOLLE/PALS)",
      "Waterproof zipped pockets",
      "Articulated patterning for unrestricted movement",
      "Custom internal organization systems",
      "Laser-cut ventilation panels",
      "Matte and tonal colorway options",
    ],
  },
  {
    id: "ski-wear",
    name: "Custom Ski Wear",
    tag: "Alpine Technical",
    image: IMAGES.catSki,
    description:
      "Technical ski and snowboard apparel manufactured to the highest alpine standards. Our custom ski wear features waterproof-breathable shells, sealed seams, and insulated linings designed for extreme cold-weather performance.",
    specs: [
      { label: "Fabric Options", value: "Gore-Tex Compatible, 3-Layer Shell, Softshell, Primaloft Insulation" },
      { label: "Waterproofing", value: "10,000mm – 20,000mm HH Rating, Taped Seams" },
      { label: "Breathability", value: "10,000g – 20,000g/m²/24hr MVTR" },
      { label: "Customization", value: "Embroidery, Screen Print, Woven Labels, Custom Lining Print" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "35–45 Days (Bulk)" },
    ],
    features: [
      "Fully taped critical seams",
      "Powder skirt and snow gaiters",
      "Helmet-compatible hood design",
      "Articulated patterning for full mobility",
      "Lift pass pocket and goggle wipe",
      "Custom color blocking and branding",
    ],
  },
];

export default function Products() {
  return (
    <PageWrapper>
      <SEOHead
        title="Custom Hunting, Sports, Ski, Tech, Streetwear & Martial Arts Manufacturer Pakistan"
        description="Sialkot Sample Masters manufactures premium custom apparel across 6 categories: Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, and Martial Arts Wear. Low MOQ from 50 pcs. Private label available. Pakistan manufacturer serving 40+ countries."
        keywords="custom hunting wear manufacturer Pakistan, custom sports wear manufacturer, ski wear manufacturer Pakistan, techwear manufacturer, custom streetwear manufacturer Sialkot, martial arts wear manufacturer Pakistan, BJJ gi manufacturer, custom apparel manufacturer Pakistan"
        canonical="/products"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Products", item: "/products" },
        ]}
      />

      {/* ── Light Elite Hero ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#F8F9FA] border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="down" delay={0.1}>
            <div className="inline-flex items-center justify-center gap-4 mb-8">
              <span className="w-10 h-px bg-gold" />
              <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs">
                Production Capabilities
              </p>
              <span className="w-10 h-px bg-gold" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tighter speakable-title">
              6 Specialist Divisions,
              <br />
              <span className="text-gradient-gold italic font-light">One Master Facility</span>
            </h1>
            <p className="speakable-description hidden">Sialkot Sample Masters specializes in manufacturing custom hunting wear, sports wear, ski wear, tech wear, streetwear, and security uniforms in Pakistan.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-foreground/70 font-light text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
              From alpine ski shells to competition-grade gis — we engineer across six high-demand performance and lifestyle categories, all under one roof in Sialkot, Pakistan.
            </p>
          </FadeIn>
          {/* Category Quick Nav */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="text-[10px] font-condensed font-bold tracking-[0.2em] uppercase px-6 py-3 border border-border bg-white text-foreground/70 shadow-sm hover:shadow-md hover:text-white hover:bg-foreground hover:border-foreground transition-all duration-300"
                >
                  {p.name.replace("Custom ", "")}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Light Elite Products Showcase ── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40">
          {products.map((product, i) => (
            <FadeIn key={product.id} direction="up" delay={0.1}>
              <div
                id={product.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                {/* Image Section */}
                <div className={`relative w-full h-full min-h-[550px] overflow-hidden group border border-border shadow-sm hover:shadow-xl transition-shadow duration-700 ${i % 2 !== 0 ? "lg:col-span-5 lg:order-2" : "lg:col-span-7"}`}>
                  <div className="absolute inset-0 bg-[#F8F9FA] z-0" />
                  <img
                    src={product.image}
                    alt={`${product.name} - Custom Manufacturer Pakistan | Sialkot Sample Masters`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-[2s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 z-10"
                    loading="lazy"
                  />

                  {/* Elite Image Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none z-20" />
                  <div className="absolute inset-0 border border-border z-20 pointer-events-none" />

                  {/* Category Tag */}
                  {product.tag && (
                    <div className="absolute top-6 left-6 z-30 bg-white/95 backdrop-blur-md border border-border text-foreground text-[9px] font-condensed font-bold tracking-[0.3em] uppercase px-5 py-2.5 shadow-sm">
                      <span className="text-gold mr-3">/</span>
                      {product.tag}
                    </div>
                  )}

                  {/* Floating Specs overlay on hover (Desktop) */}
                  <div className="absolute bottom-6 left-6 right-6 z-30 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hidden md:block">
                    <div className="p-6 bg-white/95 backdrop-blur-md border border-border shadow-2xl grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <p className="text-[9px] text-foreground/50 uppercase tracking-[0.3em]">Minimum Order</p>
                        <p className="font-condensed font-bold text-foreground tracking-widest text-sm">{product.specs.find(s => s.label === "Minimum Order")?.value}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[9px] text-foreground/50 uppercase tracking-[0.3em]">Lead Time</p>
                        <p className="font-condensed font-bold text-gold tracking-widest text-sm">{product.specs.find(s => s.label === "Lead Time")?.value}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`flex flex-col text-left ${i % 2 !== 0 ? "lg:col-span-7 lg:order-1" : "lg:col-span-5"}`}>
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                    {product.name}
                  </h2>
                  <p className="text-foreground/70 font-light text-base leading-relaxed mb-10 border-l border-gold/40 pl-6">
                    {product.description}
                  </p>

                  {/* Elite Bento Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border mb-12 shadow-sm">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="bg-white p-6 hover:bg-[#FDFCFB] transition-colors duration-300">
                        <span className="block text-gold text-[9px] font-bold uppercase tracking-[0.2em] mb-2">{spec.label}</span>
                        <span className="block text-foreground text-xs leading-relaxed font-light">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Elite Features List */}
                  <div className="mb-12">
                    <h3 className="font-condensed font-bold text-foreground uppercase tracking-[0.3em] text-[10px] mb-6 flex items-center gap-4">
                      <span className="w-6 h-px bg-gold" />
                      Engineering Details
                    </h3>
                    <ul className="grid grid-cols-1 gap-5">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-4">
                          <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-foreground/70 text-sm font-light leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
                    <Link href="/rfq">
                      <Button className="bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-8 py-7 h-auto rounded-none group/btn shadow-xl shadow-black/10">
                        <span className="flex items-center gap-3">
                          Initiate Technical Quote
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-2 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                    <Link href={`/shop?category=${encodeURIComponent(product.name.replace("Custom ", ""))}`}>
                      <Button variant="outline" className="border-border text-foreground hover:bg-[#F8F9FA] hover:text-gold font-condensed font-bold tracking-[0.2em] uppercase text-[10px] px-8 py-7 h-auto rounded-none transition-all duration-300 shadow-sm hover:shadow-md bg-white">
                        View Retail Catalog
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Light Elite CTA ── */}
      <section className="py-40 bg-[#F8F9FA] border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <p className="text-gold font-condensed font-bold uppercase tracking-[0.4em] text-[10px] mb-8 inline-block border border-gold px-6 py-2 bg-white shadow-sm">
              Bespoke Manufacturing
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-8 leading-[1.05] tracking-tighter">
              Require a Custom
              <br />
              <span className="text-gradient-gold italic font-light">Production Category?</span>
            </h2>
            <p className="text-foreground/60 font-light text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
              Our engineering capabilities extend beyond these core divisions. Engage our master pattern makers to architect your proprietary custom garment designs from ground up.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/rfq">
                <Button className="bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[11px] px-12 py-7 h-auto rounded-none group shadow-2xl shadow-black/10">
                  <span className="flex items-center gap-4">
                    Submit Technical Pack
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-border text-foreground hover:bg-white hover:text-gold font-condensed font-bold tracking-[0.2em] uppercase text-[11px] px-12 py-7 h-auto rounded-none transition-all duration-300 shadow-sm hover:shadow-md bg-transparent">
                  Consult an Engineer
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}
