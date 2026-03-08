import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper } from "@/components/animations";

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

      {/* Hero */}
      <section className="relative pt-16 pb-20 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="down" delay={0.1}>
            <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Product Catalog</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-6 speakable-title">
              6 Specialist Categories,
              <br />
              <span className="text-gradient-gold italic">One Trusted Manufacturer</span>
            </h1>
            <p className="speakable-description hidden">Sialkot Sample Masters specializes in manufacturing custom hunting wear, sports wear, ski wear, tech wear, streetwear, and security uniforms in Pakistan.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="gold-divider mx-auto" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
              From alpine ski shells to competition-grade gis — Sialkot Sample Masters manufactures across six high-demand performance and lifestyle categories, all from our facility in Sialkot, Pakistan.
            </p>
          </FadeIn>
          {/* Category Quick Nav */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="text-xs font-condensed font-semibold tracking-widest uppercase px-4 py-2 border border-gold/30 text-gold hover:bg-gold/10 rounded-sm transition-colors"
                >
                  {p.name.replace("Custom ", "")}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          {products.map((product, i) => (
            <FadeIn key={product.id} direction={i % 2 === 0 ? "left" : "right"}>
              <div
                id={product.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-sm aspect-square ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <img
                    src={product.image}
                    alt={`${product.name} - Custom Manufacturer Pakistan | Sialkot Sample Masters`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.tag && (
                    <div className="absolute top-4 left-4 bg-gold text-background text-xs font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? "lg:order-1" : ""} text-left`}>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">{product.name}</h2>
                  <div className="gold-divider" />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-6">{product.description}</p>

                  {/* Specs Table */}
                  <div className="bg-card border border-border rounded-sm overflow-hidden mb-6 text-left">
                    <div className="px-4 py-2.5 border-b border-border bg-background/50">
                      <h3 className="font-condensed font-semibold text-foreground uppercase tracking-widest text-xs">Technical Specifications</h3>
                    </div>
                    <div className="divide-y divide-border">
                      {product.specs.map((spec) => (
                        <div key={spec.label} className="flex px-4 py-2.5">
                          <span className="text-muted-foreground text-sm w-40 shrink-0 font-medium">{spec.label}</span>
                          <span className="text-foreground text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8 text-left">
                    <h3 className="font-condensed font-semibold text-foreground uppercase tracking-widest text-xs mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-start">
                    <Link href="/rfq">
                      <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm">
                        Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 font-condensed font-semibold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm bg-transparent">
                        View in Shop
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Need a Custom Category?
            </h2>
            <p className="text-muted-foreground mb-8">
              We manufacture beyond these six categories. If you have a specific product in mind, our design and production team will work with you from concept to delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq">
                <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm">
                  Request Custom Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/5 font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}
