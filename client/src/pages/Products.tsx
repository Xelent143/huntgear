import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper } from "@/components/animations";
import { Breadcrumb, predefinedBreadcrumbs } from "@/components/Breadcrumb";

const products = [
  {
    id: "hunting-jackets",
    name: "Hunting Jackets & Outerwear",
    tag: "Field Tested",
    image: IMAGES.catHunting,
    description:
      "Premium hunting jackets engineered for every season and terrain. From insulated late-season parkas to lightweight early-season shells, our outerwear delivers unmatched weather protection, silent movement, and strategic camo patterns designed by hunters for hunters.",
    specs: [
      { label: "Shell Fabrics", value: "Quiet brushed polyester, Softshell, 3-Layer waterproof laminate" },
      { label: "Insulation", value: "Primaloft Gold, Thinsulate, Premium down blend" },
      { label: "Camo Options", value: "Realtree EDGE, Mossy Oak Break-Up, Kryptek, Custom prints" },
      { label: "Waterproofing", value: "10,000mm – 20,000mm (ISO 811 Certified)" },
      { label: "Breathability", value: "8,000 – 15,000 g/m²/24h (ASTM E96)" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "30–40 Days (Bulk)" },
    ],
    features: [
      "Silent brushed fabric eliminates noise in the field",
      "Scent-control technology with antimicrobial treatment",
      "Strategic ventilation zippers for temperature regulation",
      "Magnetic closures on pockets for silent access",
      "Kill-switch D-ring and license holder",
      "Customizable internal embroidered labels",
    ],
  },
  {
    id: "hunting-pants",
    name: "Hunting Pants & Bibs",
    tag: "Tactical Grade",
    image: IMAGES.catSports,
    description:
      "Rugged hunting pants and bibs built to withstand brush, briars, and miles of backcountry hiking. Articulated knees, gusseted crotches, and reinforced high-wear zones ensure durability season after season. Available in multiple camo patterns and solid earth tones.",
    specs: [
      { label: "Fabric Options", value: "6.5oz canvas, Stretch woven, Waterproof/breathable laminate" },
      { label: "Reinforcement", value: "Cordura knee panels, Double-layer seat" },
      { label: "Camo Patterns", value: "Realtree, Mossy Oak, Kryptek, Solids" },
      { label: "Breathability", value: "High-permeability ASTM E96 compliant" },
      { label: "Features", value: "Articulated knees, Gusseted crotch, Boot zipper" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "25–35 Days (Bulk)" },
    ],
    features: [
      "Reinforced knees and seat for durability",
      "Silent snap closures won't spook game",
      "Multiple cargo pockets with secure closures",
      "Side zippers for easy on/off over boots",
      "Suspender-compatible design",
      "Scent-blocking fabric treatment",
    ],
  },
  {
    id: "base-layers",
    name: "Base Layers & Mid Layers",
    tag: "Performance",
    image: IMAGES.catTechwear,
    description:
      "Technical base and mid layers that regulate body temperature across all hunting conditions. Moisture-wicking merino wool blends, grid fleece mid layers, and thermal compression gear keep hunters comfortable from dawn sit to dusk stalk.",
    specs: [
      { label: "Base Materials", value: "Merino wool blend, Synthetic grid fleece, Compression knit" },
      { label: "Mid Layer", value: "Grid fleece, Thermal waffle, Softshell hybrid" },
      { label: "Weight Range", value: "Lightweight (150gsm) to Expedition (400gsm)" },
      { label: "Technology", value: "Moisture-wicking, Odor control, Thermal regulation" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "25–35 Days (Bulk)" },
    ],
    features: [
      "Merino wool naturally resists odor",
      "Flatlock seams prevent chafing under packs",
      "UPF 30+ sun protection for early season",
      "Thumb loops keep sleeves in place",
      "Drop-tail hem for coverage while sitting",
      "Custom colorways and branding available",
    ],
  },
  {
    id: "security-uniforms",
    name: "Security & Tactical Uniforms",
    tag: "Pro Duty",
    image: IMAGES.catSecurityUniforms,
    description:
      "High-performance security and tactical uniforms designed for professional guards, law enforcement, and private security firms. Our garments combine professional appearance with tactical functionality, featuring durable ripstop fabrics, reinforced stitching, and integrated duty belt compatibility.",
    specs: [
      { label: "Fabric Options", value: "Poly-cotton ripstop, Tactical stretch woven, Teflon™ coated" },
      { label: "Durability", value: "Reinforced elbows/knees, Bar-tack stitching at stress points" },
      { label: "Features", value: "Badge tabs, Epaulettes, Hidden document pockets" },
      { label: "Safety", value: "High-visibility options, Slash-resistant lining available" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "25–35 Days (Bulk)" },
    ],
    features: [
      "Moisture-wicking mesh interior for all-day comfort",
      "Gusseted construction for full range of motion",
      "Hidden tactical pockets for gear storage",
      "Permanent military creases for sharp professional look",
      "Stain and liquid repellent fabric treatment",
      "Custom department embroidery and patch options",
    ],
  },
  {
    id: "cold-weather",
    name: "Cold Weather & Late Season",
    tag: "Extreme",
    image: IMAGES.catSki,
    description:
      "Heavy-duty late season gear for sub-zero hunts. Insulated bibs, parkas with wind-blocking technology, and hand-warmer muffs designed for all-day sits in frigid conditions. When the rut is on and temperatures drop, this gear keeps hunters in the field longer.",
    specs: [
      { label: "Insulation", value: "200g-400g Thinsulate, Down-fill, Synthetic loft" },
      { label: "Outer Shell", value: "Waterproof/breathable, Wind-blocking membrane" },
      { label: "Temperature Rating", value: "0°F to -20°F comfort range" },
      { label: "Extras", value: "Hand warmer pockets, Fleece-lined collar" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "35–45 Days (Bulk)" },
    ],
    features: [
      "Heat-retaining interior lining reflects body heat",
      "Two-way front zipper for sitting comfort",
      "Insulated detachable hood",
      "Snow skirt keeps powder out",
      "Oversized hand warmer pockets",
      "Quiet fabric technology eliminates swishing",
    ],
  },
  {
    id: "technical-gear",
    name: "Technical Field Gear",
    tag: "Pro-Series",
    image: IMAGES.catHuntingGear,
    description:
      "Full private label manufacturing for hunting brands, outfitters, and retailers. From concept sketches to finished garments, we handle pattern development, fabric sourcing, prototyping, and production. Create your own hunting gear line with professional-grade quality.",
    specs: [
      { label: "Services", value: "Design, Pattern making, Sampling, Full production" },
      { label: "Labeling", value: "Woven labels, Hang tags, Poly bags, Cartons" },
      { label: "Decoration", value: "Embroidery, Screen print, Heat transfer, Woven patches" },
      { label: "Customization", value: "Colors, Patterns, Fits, Features per spec" },
      { label: "Minimum Order", value: "50 Pieces/Style" },
      { label: "Lead Time", value: "7 Days (Sample) | 30–45 Days (Bulk)" },
    ],
    features: [
      "Tech pack development from sketches or ideas",
      "3D prototyping for fit verification",
      "Full compliance with hunting safety standards",
      "Blaze orange requirements for all states",
      "Small batch production for boutique brands",
      "Dropshipping and fulfillment support",
    ],
  },
];

export default function Products() {
  return (
    <PageWrapper>
      <SEOHead
        title="Custom Hunting Apparel Manufacturer | Xelent Huntgear Pakistan"
        description="Xelent Huntgear manufactures premium custom hunting apparel: jackets, pants, base layers, vests, and cold weather gear. Private label hunting clothing manufacturer in Pakistan. Low MOQ from 50 pieces. Realtree & Mossy Oak camo patterns."
        keywords="custom hunting apparel manufacturer, hunting clothing manufacturer Pakistan, private label hunting gear, Realtree camo manufacturer, hunting jacket supplier, hunting pants manufacturer, custom hunting vest, blaze orange gear manufacturer"
        canonical="/products"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Products", item: "/products" },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={predefinedBreadcrumbs.products} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#111111]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${IMAGES.productsHeroBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0d0d0d]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="down" delay={0.1}>
            <p className="text-[#ff6b00] font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Product Catalog</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 speakable-title">
              6 Specialist Categories,
              <br />
              <span className="text-gradient-orange italic">One Trusted Manufacturer</span>
            </h1>
            <p className="speakable-description hidden">Xelent Huntgear specializes in manufacturing custom hunting apparel including jackets, pants, base layers, and accessories for hunting brands worldwide.</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="gold-divider mx-auto" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto mt-6">
              From early season base layers to late season insulated parkas — Xelent Huntgear manufactures premium hunting apparel built for the field. Realtree & Mossy Oak licensed camo. Low MOQ from 50 pieces.
            </p>
          </FadeIn>
          {/* Category Quick Nav */}
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {products.map((p) => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className="text-xs font-condensed font-semibold tracking-widest uppercase px-4 py-2 border border-[#ff6b00]/30 text-[#ff6b00] hover:bg-[#ff6b00]/10 rounded-sm transition-colors"
                >
                  {p.name.replace("Hunting ", "").replace("Custom ", "").replace(" & Accessories", "").replace(" & Late Season", "").replace(" & Bibs", "").replace(" & Mid Layers", "").replace(" & Outerwear", "")}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-[#0d0d0d]">
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
                    <div className="absolute top-4 left-4 bg-[#ff6b00] text-black text-xs font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                      {product.tag}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className={`${i % 2 !== 0 ? "lg:order-1" : ""} text-left`}>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">{product.name}</h2>
                  <div className="gold-divider" />
                  <p className="text-white/70 leading-relaxed mt-4 mb-6">{product.description}</p>

                  {/* Specs Table */}
                  <div className="bg-[#111111] border border-white/10 rounded-sm overflow-hidden mb-6 text-left">
                    <div className="px-4 py-2.5 border-b border-white/10 bg-[#0d0d0d]/50">
                      <h3 className="font-condensed font-semibold text-white uppercase tracking-widest text-xs">Technical Specifications</h3>
                    </div>
                    <div className="divide-y divide-white/10">
                      {product.specs.map((spec) => (
                        <div key={spec.label} className="flex px-4 py-2.5">
                          <span className="text-white/70 text-sm w-40 shrink-0 font-medium">{spec.label}</span>
                          <span className="text-white text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8 text-left">
                    <h3 className="font-condensed font-semibold text-white uppercase tracking-widest text-xs mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
                          <span className="text-white text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 justify-start">
                    <Link href="/rfq">
                      <Button className="bg-[#ff6b00] text-black hover:bg-[#ff6b00]/90 font-condensed font-bold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm">
                        Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/shop">
                      <Button variant="outline" className="border-[#ff6b00]/30 text-[#ff6b00] hover:bg-[#ff6b00]/5 font-condensed font-semibold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm bg-transparent">
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
      <section className="section-padding bg-[#111111] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              Build Your Hunting Brand
            </h2>
            <p className="text-white/70 mb-8">
              From concept to field-ready gear — we help hunting brands bring their vision to life. Tech pack development, prototyping, licensed camo patterns, and full-scale production. Your brand, built for the hunt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rfq">
                <Button className="bg-[#ff6b00] text-black hover:bg-[#ff6b00]/90 font-condensed font-bold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm">
                  Start Your Line
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-[#ff6b00]/30 text-[#ff6b00] hover:bg-[#ff6b00]/5 font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-3 h-auto rounded-sm bg-transparent">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageWrapper>
  );
}
