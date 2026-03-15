// Shop Category Structure with hierarchical navigation
export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  subCategories: SubCategory[];
}

export const SHOP_CATEGORIES: Category[] = [
  {
    id: "ski-wear",
    name: "Ski Wear",
    slug: "ski-wear",
    description: "Technical alpine apparel for skiing and snowboarding",
    icon: "⛷️",
    subCategories: [
      { id: "ski-jackets", name: "Ski Jackets", slug: "ski-jackets", description: "Waterproof insulated jackets" },
      { id: "ski-pants", name: "Ski Pants", slug: "ski-pants", description: "Snow pants and bibs" },
      { id: "base-layers", name: "Base Layers", slug: "base-layers", description: "Thermal underlayers" },
      { id: "mid-layers", name: "Mid Layers", slug: "mid-layers", description: "Fleeces and insulated mid-layers" },
      { id: "ski-suits", name: "Ski Suits", slug: "ski-suits", description: "One-piece snowsuits" },
      { id: "ski-accessories", name: "Accessories", slug: "ski-accessories", description: "Gloves, beanies, neck warmers" },
    ],
  },
  {
    id: "sports-wear",
    name: "Sports Wear",
    slug: "sports-wear",
    description: "High-performance athletic apparel",
    icon: "⚽",
    subCategories: [
      { id: "jerseys", name: "Jerseys", slug: "jerseys", description: "Team and custom jerseys" },
      { id: "shorts", name: "Shorts", slug: "shorts", description: "Athletic shorts" },
      { id: "compression", name: "Compression Wear", slug: "compression", description: "Base layers and compression gear" },
      { id: "training-tops", name: "Training Tops", slug: "training-tops", description: "T-shirts and tanks" },
      { id: "tracksuits", name: "Tracksuits", slug: "tracksuits", description: "Warm-up suits" },
      { id: "team-kits", name: "Team Kits", slug: "team-kits", description: "Complete team uniforms" },
    ],
  },
  {
    id: "hunting-wear",
    name: "Hunting Wear",
    slug: "hunting-wear",
    description: "Tactical and camouflage outdoor gear",
    icon: "🦌",
    subCategories: [
      { id: "hunting-jackets", name: "Hunting Jackets", slug: "hunting-jackets", description: "Waterproof camo jackets" },
      { id: "hunting-pants", name: "Hunting Pants", slug: "hunting-pants", description: "Cargo and field pants" },
      { id: "hunting-vests", name: "Vests", slug: "hunting-vests", description: "Tactical and game vests" },
      { id: "camo-gear", name: "Camo Gear", slug: "camo-gear", description: "Camouflage apparel" },
      { id: "hunting-base", name: "Base Layers", slug: "hunting-base", description: "Scent-control underlayers" },
      { id: "blaze-orange", name: "Blaze Orange", slug: "blaze-orange", description: "High-vis safety gear" },
    ],
  },
  {
    id: "streetwear",
    name: "Streetwear",
    slug: "streetwear",
    description: "Urban fashion and lifestyle apparel",
    icon: "👕",
    subCategories: [
      { id: "hoodies", name: "Hoodies", slug: "hoodies", description: "Pullover and zip hoodies" },
      { id: "t-shirts", name: "T-Shirts", slug: "t-shirts", description: "Graphic and plain tees" },
      { id: "sweatshirts", name: "Sweatshirts", slug: "sweatshirts", description: "Crew neck sweatshirts" },
      { id: "joggers", name: "Joggers", slug: "joggers", description: "Sweatpants and joggers" },
      { id: "cargo-pants", name: "Cargo Pants", slug: "cargo-pants", description: "Utility cargo pants" },
      { id: "bomber-jackets", name: "Bomber Jackets", slug: "bomber-jackets", description: "MA-1 and varsity jackets" },
    ],
  },
  {
    id: "tech-wear",
    name: "Tech Wear",
    slug: "tech-wear",
    description: "Functional urban technical apparel",
    icon: "🔧",
    subCategories: [
      { id: "tech-jackets", name: "Tech Jackets", slug: "tech-jackets", description: "Waterproof shells" },
      { id: "tech-pants", name: "Tech Pants", slug: "tech-pants", description: "Articulated cargo pants" },
      { id: "tech-vests", name: "Tech Vests", slug: "tech-vests", description: "Chest rigs and tactical vests" },
      { id: "tech-bags", name: "Bags", slug: "tech-bags", description: "Sling bags and backpacks" },
      { id: "tech-shorts", name: "Tech Shorts", slug: "tech-shorts", description: "Utility shorts" },
      { id: "modular", name: "Modular Pieces", slug: "modular", description: "Detachable and convertible" },
    ],
  },
  {
    id: "martial-arts",
    name: "Martial Arts Wear",
    slug: "martial-arts",
    description: "BJJ, MMA, and combat sports gear",
    icon: "🥋",
    subCategories: [
      { id: "bjj-gis", name: "BJJ Gis", slug: "bjj-gis", description: "Brazilian Jiu-Jitsu kimonos" },
      { id: "rashguards", name: "Rashguards", slug: "rashguards", description: "Compression rashguards" },
      { id: "mma-shorts", name: "MMA Shorts", slug: "mma-shorts", description: "Fight shorts" },
      { id: "spats", name: "Spats", slug: "spats", description: "Compression leggings" },
      { id: "martial-arts-uniforms", name: "Uniforms", slug: "martial-arts-uniforms", description: "Karate, judo uniforms" },
      { id: "fight-wear", name: "Fight Wear", slug: "fight-wear", description: "Training and competition gear" },
    ],
  },
  {
    id: "security-uniforms",
    name: "Security Uniforms",
    slug: "security-uniforms",
    description: "Professional security and tactical uniforms",
    icon: "👮",
    subCategories: [
      { id: "security-shirts", name: "Security Shirts", slug: "security-shirts", description: "Polo and tactical shirts" },
      { id: "security-pants", name: "Security Pants", slug: "security-pants", description: "Duty trousers" },
      { id: "security-jackets", name: "Security Jackets", slug: "security-jackets", description: "Patrol and hi-vis jackets" },
      { id: "tactical-gear", name: "Tactical Gear", slug: "tactical-gear", description: "Vests and duty belts" },
      { id: "hi-vis", name: "Hi-Vis Wear", slug: "hi-vis", description: "High visibility clothing" },
      { id: "uniform-sets", name: "Uniform Sets", slug: "uniform-sets", description: "Complete uniform packages" },
    ],
  },
];

// Helper function to get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return SHOP_CATEGORIES.find((cat) => cat.slug === slug);
}

// Helper function to get subcategory by slug
export function getSubCategoryBySlug(categorySlug: string, subCategorySlug: string): SubCategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subCategories.find((sub) => sub.slug === subCategorySlug);
}

// Get all subcategories flattened (for search/filtering)
export function getAllSubCategories(): (SubCategory & { categoryId: string; categoryName: string })[] {
  return SHOP_CATEGORIES.flatMap((cat) =>
    cat.subCategories.map((sub) => ({
      ...sub,
      categoryId: cat.id,
      categoryName: cat.name,
    }))
  );
}

// SEO-friendly category descriptions
export const CATEGORY_SEO_CONTENT: Record<string, { title: string; description: string; keywords: string }> = {
  "ski-wear": {
    title: "Custom Ski Wear Manufacturer | Jackets, Pants & Base Layers | Sialkot Pakistan",
    description: "Premium custom ski wear manufacturing. Waterproof ski jackets, insulated pants, base layers. Low MOQ 50pcs. B2B export to USA, Europe. 20K/20K waterproof ratings.",
    keywords: "custom ski wear manufacturer, ski jacket manufacturer Pakistan, snow pants supplier, base layer manufacturer, alpine apparel manufacturer, ski wear wholesale",
  },
  "sports-wear": {
    title: "Custom Sportswear Manufacturer | Team Jerseys & Athletic Wear | Sialkot",
    description: "High-performance custom sportswear manufacturing. Soccer kits, basketball jerseys, compression wear. Sublimation printing. MOQ from 50 pieces. Export quality.",
    keywords: "custom sportswear manufacturer, team jersey supplier, soccer kit manufacturer, basketball jersey Pakistan, compression wear manufacturer, athletic apparel supplier",
  },
  "hunting-wear": {
    title: "Custom Hunting Wear Manufacturer | Camo Apparel & Tactical Gear | Sialkot",
    description: "Tactical hunting wear manufacturing. Custom camo patterns, waterproof jackets, cargo pants. Silent fabric technology. B2B wholesale. Low MOQ options.",
    keywords: "hunting wear manufacturer, camo apparel supplier, tactical gear manufacturer Pakistan, hunting jacket supplier, waterproof hunting gear, custom camo clothing",
  },
  "streetwear": {
    title: "Custom Streetwear Manufacturer | Hoodies, Tees & Joggers | Sialkot Pakistan",
    description: "Premium streetwear manufacturing. 450GSM hoodies, vintage wash tees, cargo pants. OEM & private label. Low MOQ 50pcs. Fast turnaround for brands.",
    keywords: "custom streetwear manufacturer, hoodie manufacturer Pakistan, t-shirt supplier, cargo pants manufacturer, vintage wash clothing, streetwear wholesale",
  },
  "tech-wear": {
    title: "Custom Tech Wear Manufacturer | Technical Urban Apparel | Sialkot",
    description: "Advanced tech wear manufacturing. Waterproof shells, articulated pants, chest rigs. GORE-TEX compatible. Functional urban apparel for innovative brands.",
    keywords: "tech wear manufacturer, technical apparel supplier, waterproof jacket manufacturer, urban tech clothing Pakistan, cargo pants manufacturer, tactical vest supplier",
  },
  "martial-arts": {
    title: "Custom Martial Arts Wear | BJJ Gis, Rashguards & MMA Gear | Sialkot",
    description: "Premium martial arts wear manufacturing. BJJ kimonos, rashguards, MMA shorts. IBJJF compliant. Pearl weave gis. Custom designs for academies. Low MOQ.",
    keywords: "BJJ gi manufacturer, rashguard supplier, MMA shorts manufacturer Pakistan, martial arts wear supplier, custom kimono manufacturer, fight wear supplier",
  },
  "security-uniforms": {
    title: "Security Uniform Manufacturer | Tactical Uniforms & Hi-Vis | Sialkot",
    description: "Professional security uniform manufacturing. Tactical shirts, duty pants, hi-vis jackets. Custom embroidery. Durable fabrics. B2B wholesale for security companies.",
    keywords: "security uniform manufacturer, tactical shirt supplier, duty pants manufacturer Pakistan, hi-vis jacket supplier, security apparel wholesale, uniform supplier",
  },
};
