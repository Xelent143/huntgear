// Shop Category Structure with hierarchical navigation
// AUTO-GENERATED from template-config/categories.config.ts
// Run 'pnpm apply-template' to regenerate after editing

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
    "id": "hunting-jackets",
    "name": "Hunting Jackets",
    "slug": "hunting-jackets",
    "description": "Waterproof, insulated, and camouflage hunting jackets for all weather conditions",
    "icon": "🧥",
    "showInNav": true,
    "sortOrder": 1,
    "seo": {
      "title": "Custom Hunting Jackets Manufacturer | Camo & Waterproof | Xelent Huntgear Pakistan",
      "description": "Premium custom hunting jackets manufacturing. Waterproof camo jackets, insulated parkas, softshell jackets. Low MOQ 50pcs. B2B export to USA, Europe, Australia.",
      "keywords": "custom hunting jacket manufacturer, camo jacket supplier, waterproof hunting jacket Pakistan, insulated parka manufacturer, hunting apparel wholesale"
    },
    "subCategories": [
      {
        "id": "camo-jackets",
        "name": "Camo Jackets",
        "slug": "camo-jackets",
        "description": "Camouflage pattern hunting jackets"
      },
      {
        "id": "waterproof-jackets",
        "name": "Waterproof Jackets",
        "slug": "waterproof-jackets",
        "description": "Rainproof hunting outerwear"
      },
      {
        "id": "insulated-parkas",
        "name": "Insulated Parkas",
        "slug": "insulated-parkas",
        "description": "Heavy winter hunting coats"
      },
      {
        "id": "softshell-jackets",
        "name": "Softshell Jackets",
        "slug": "softshell-jackets",
        "description": "Lightweight flexible jackets"
      },
      {
        "id": "blaze-orange",
        "name": "Blaze Orange",
        "slug": "blaze-orange",
        "description": "High-visibility safety jackets"
      },
      {
        "id": "vests",
        "name": "Hunting Vests",
        "slug": "vests",
        "description": "Game and tactical vests"
      }
    ]
  },
  {
    "id": "hunting-pants",
    "name": "Hunting Pants",
    "slug": "hunting-pants",
    "description": "Durable cargo pants, bibs, and trousers for hunting and outdoor activities",
    "icon": "👖",
    "showInNav": true,
    "sortOrder": 2,
    "seo": {
      "title": "Custom Hunting Pants Manufacturer | Cargo & Bibs | Xelent Huntgear Pakistan",
      "description": "High-quality custom hunting pants manufacturing. Waterproof cargo pants, insulated bibs, tactical trousers. Durable fabrics. MOQ from 50 pieces.",
      "keywords": "custom hunting pants manufacturer, cargo pants supplier, hunting bib manufacturer Pakistan, tactical trousers, outdoor apparel wholesale"
    },
    "subCategories": [
      {
        "id": "cargo-pants",
        "name": "Cargo Pants",
        "slug": "cargo-pants",
        "description": "Multi-pocket hunting trousers"
      },
      {
        "id": "bib-overalls",
        "name": "Bib Overalls",
        "slug": "bib-overalls",
        "description": "Insulated hunting bibs"
      },
      {
        "id": "waterproof-pants",
        "name": "Waterproof Pants",
        "slug": "waterproof-pants",
        "description": "Rain gear bottoms"
      },
      {
        "id": "softshell-pants",
        "name": "Softshell Pants",
        "slug": "softshell-pants",
        "description": "Flexible movement pants"
      },
      {
        "id": "convertible-pants",
        "name": "Convertible Pants",
        "slug": "convertible-pants",
        "description": "Zip-off shorts/pants"
      },
      {
        "id": "base-layer-bottoms",
        "name": "Base Layer Bottoms",
        "slug": "base-layer-bottoms",
        "description": "Thermal underwear pants"
      }
    ]
  },
  {
    "id": "camo-gear",
    "name": "Camo Gear",
    "slug": "camo-gear",
    "description": "Full camouflage clothing and accessories for concealment",
    "icon": "🌿",
    "showInNav": true,
    "sortOrder": 3,
    "seo": {
      "title": "Custom Camo Gear Manufacturer | Camouflage Clothing | Xelent Huntgear Pakistan",
      "description": "Custom camouflage apparel manufacturing. Digital camo, woodland, desert patterns. Ghillie suits, camo accessories. Low MOQ. Export quality.",
      "keywords": "custom camo manufacturer, camouflage clothing supplier, digital camo Pakistan, ghillie suit manufacturer, camo gear wholesale"
    },
    "subCategories": [
      {
        "id": "woodland-camo",
        "name": "Woodland Camo",
        "slug": "woodland-camo",
        "description": "Traditional forest patterns"
      },
      {
        "id": "digital-camo",
        "name": "Digital Camo",
        "slug": "digital-camo",
        "description": "Modern pixelated patterns"
      },
      {
        "id": "desert-camo",
        "name": "Desert Camo",
        "slug": "desert-camo",
        "description": "Arid environment patterns"
      },
      {
        "id": "snow-camo",
        "name": "Snow Camo",
        "slug": "snow-camo",
        "description": "Winter white patterns"
      },
      {
        "id": "ghillie-suits",
        "name": "Ghillie Suits",
        "slug": "ghillie-suits",
        "description": "Full concealment suits"
      },
      {
        "id": "camo-accessories",
        "name": "Camo Accessories",
        "slug": "camo-accessories",
        "description": "Hats, gloves, face paint"
      }
    ]
  },
  {
    "id": "hunting-shirts",
    "name": "Hunting Shirts",
    "slug": "hunting-shirts",
    "description": "Performance hunting shirts, flannels, and base layers",
    "icon": "👕",
    "showInNav": true,
    "sortOrder": 4,
    "seo": {
      "title": "Custom Hunting Shirts Manufacturer | Flannel & Performance | Xelent Huntgear",
      "description": "Custom hunting shirts manufacturing. Performance flannels, moisture-wicking shirts, thermal base layers. Scent control technology. B2B export.",
      "keywords": "custom hunting shirt manufacturer, flannel shirt supplier, performance hunting shirt Pakistan, base layer manufacturer, outdoor apparel"
    },
    "subCategories": [
      {
        "id": "flannel-shirts",
        "name": "Flannel Shirts",
        "slug": "flannel-shirts",
        "description": "Heavy cotton flannels"
      },
      {
        "id": "performance-shirts",
        "name": "Performance Shirts",
        "slug": "performance-shirts",
        "description": "Moisture-wicking tops"
      },
      {
        "id": "long-sleeve",
        "name": "Long Sleeve",
        "slug": "long-sleeve",
        "description": "Sun protection shirts"
      },
      {
        "id": "base-layer-tops",
        "name": "Base Layer Tops",
        "slug": "base-layer-tops",
        "description": "Thermal underwear tops"
      },
      {
        "id": "hunting-polo",
        "name": "Hunting Polo",
        "slug": "hunting-polo",
        "description": "Quick-dry polo shirts"
      },
      {
        "id": "quarter-zip",
        "name": "Quarter Zip",
        "slug": "quarter-zip",
        "description": "Mid-layer pullovers"
      }
    ]
  },
  {
    "id": "outdoor-accessories",
    "name": "Outdoor Accessories",
    "slug": "outdoor-accessories",
    "description": "Hunting hats, gloves, gaiters, and essential gear",
    "icon": "🎒",
    "showInNav": true,
    "sortOrder": 5,
    "seo": {
      "title": "Hunting Accessories Manufacturer | Hats, Gloves & Gear | Xelent Huntgear",
      "description": "Custom hunting accessories manufacturing. Camo hats, insulated gloves, neck gaiters, boot gaiters. OEM & private label. Low MOQ.",
      "keywords": "hunting accessories manufacturer, camo hat supplier, hunting glove manufacturer Pakistan, neck gaiter, outdoor gear wholesale"
    },
    "subCategories": [
      {
        "id": "hunting-hats",
        "name": "Hunting Hats",
        "slug": "hunting-hats",
        "description": "Caps, beanies, boonie hats"
      },
      {
        "id": "gloves",
        "name": "Gloves",
        "slug": "gloves",
        "description": "Insulated and shooting gloves"
      },
      {
        "id": "neck-gaiters",
        "name": "Neck Gaiters",
        "slug": "neck-gaiters",
        "description": "Face and neck protection"
      },
      {
        "id": "boot-gaiters",
        "name": "Boot Gaiters",
        "slug": "boot-gaiters",
        "description": "Snake and debris protection"
      },
      {
        "id": "belts",
        "name": "Hunting Belts",
        "slug": "belts",
        "description": "Shell belts and tactical belts"
      },
      {
        "id": "socks",
        "name": "Hunting Socks",
        "slug": "socks",
        "description": "Merino wool and cushioned socks"
      }
    ]
  },
  {
    "id": "tactical-gear",
    "name": "Tactical Gear",
    "slug": "tactical-gear",
    "description": "Tactical vests, packs, and survival equipment",
    "icon": "🎯",
    "showInNav": true,
    "sortOrder": 6,
    "seo": {
      "title": "Tactical Gear Manufacturer | Vests, Packs & Equipment | Xelent Huntgear",
      "description": "Custom tactical gear manufacturing. Hunting vests, tactical backpacks, survival equipment. MOLLE compatible. Durable construction.",
      "keywords": "tactical gear manufacturer, hunting vest supplier, tactical backpack Pakistan, survival equipment, MOLLE gear wholesale"
    },
    "subCategories": [
      {
        "id": "hunting-vests",
        "name": "Hunting Vests",
        "slug": "hunting-vests",
        "description": "Game and utility vests"
      },
      {
        "id": "tactical-backpacks",
        "name": "Tactical Backpacks",
        "slug": "tactical-backpacks",
        "description": "Hunting daypacks and packs"
      },
      {
        "id": "shell-bags",
        "name": "Shell Bags",
        "slug": "shell-bags",
        "description": "Ammo and shot shell holders"
      },
      {
        "id": "range-bags",
        "name": "Range Bags",
        "slug": "range-bags",
        "description": "Shooting equipment bags"
      },
      {
        "id": "slings",
        "name": "Rifle Slings",
        "slug": "slings",
        "description": "Gun carrying straps"
      },
      {
        "id": "survival-gear",
        "name": "Survival Gear",
        "slug": "survival-gear",
        "description": "Emergency equipment"
      }
    ]
  }
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
  "hunting-jackets": {
    "title": "Custom Hunting Jackets Manufacturer | Camo & Waterproof | Xelent Huntgear Pakistan",
    "description": "Premium custom hunting jackets manufacturing. Waterproof camo jackets, insulated parkas, softshell jackets. Low MOQ 50pcs. B2B export to USA, Europe, Australia.",
    "keywords": "custom hunting jacket manufacturer, camo jacket supplier, waterproof hunting jacket Pakistan, insulated parka manufacturer, hunting apparel wholesale"
  },
  "hunting-pants": {
    "title": "Custom Hunting Pants Manufacturer | Cargo & Bibs | Xelent Huntgear Pakistan",
    "description": "High-quality custom hunting pants manufacturing. Waterproof cargo pants, insulated bibs, tactical trousers. Durable fabrics. MOQ from 50 pieces.",
    "keywords": "custom hunting pants manufacturer, cargo pants supplier, hunting bib manufacturer Pakistan, tactical trousers, outdoor apparel wholesale"
  },
  "camo-gear": {
    "title": "Custom Camo Gear Manufacturer | Camouflage Clothing | Xelent Huntgear Pakistan",
    "description": "Custom camouflage apparel manufacturing. Digital camo, woodland, desert patterns. Ghillie suits, camo accessories. Low MOQ. Export quality.",
    "keywords": "custom camo manufacturer, camouflage clothing supplier, digital camo Pakistan, ghillie suit manufacturer, camo gear wholesale"
  },
  "hunting-shirts": {
    "title": "Custom Hunting Shirts Manufacturer | Flannel & Performance | Xelent Huntgear",
    "description": "Custom hunting shirts manufacturing. Performance flannels, moisture-wicking shirts, thermal base layers. Scent control technology. B2B export.",
    "keywords": "custom hunting shirt manufacturer, flannel shirt supplier, performance hunting shirt Pakistan, base layer manufacturer, outdoor apparel"
  },
  "outdoor-accessories": {
    "title": "Hunting Accessories Manufacturer | Hats, Gloves & Gear | Xelent Huntgear",
    "description": "Custom hunting accessories manufacturing. Camo hats, insulated gloves, neck gaiters, boot gaiters. OEM & private label. Low MOQ.",
    "keywords": "hunting accessories manufacturer, camo hat supplier, hunting glove manufacturer Pakistan, neck gaiter, outdoor gear wholesale"
  },
  "tactical-gear": {
    "title": "Tactical Gear Manufacturer | Vests, Packs & Equipment | Xelent Huntgear",
    "description": "Custom tactical gear manufacturing. Hunting vests, tactical backpacks, survival equipment. MOLLE compatible. Durable construction.",
    "keywords": "tactical gear manufacturer, hunting vest supplier, tactical backpack Pakistan, survival equipment, MOLLE gear wholesale"
  }
};
