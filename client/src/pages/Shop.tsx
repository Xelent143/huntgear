import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Filter, ChevronDown, Search, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";
import { SHOP_CATEGORIES } from "@/lib/shop-categories";
import { Breadcrumb, predefinedBreadcrumbs } from "@/components/Breadcrumb";

// Sample products - in real app, fetch from API
const sampleProducts = [
  { id: 1, name: "Pro Hunter Jacket", category: "Hunting Jackets", price: "Contact", image: IMAGES.catHunting, badge: "20K Waterproof" },
  { id: 2, name: "Tactical Cargo Pants", category: "Hunting Pants", price: "Contact", image: IMAGES.catSports, badge: "Reinforced" },
  { id: 3, name: "Digital Camo Shell", category: "Camo Gear", price: "Contact", image: IMAGES.catStreetwear, badge: "Custom Pattern" },
  { id: 4, name: "Merino Base Layer", category: "Base Layers", price: "Contact", image: IMAGES.catSecurityUniforms, badge: "Odor Control" },
  { id: 5, name: "Insulated Parka", category: "Hunting Jackets", price: "Contact", image: IMAGES.catHunting, badge: "800 Fill" },
  { id: 6, name: "Softshell Jacket", category: "Hunting Jackets", price: "Contact", image: IMAGES.catTechwear, badge: "Windproof" },
  { id: 7, name: "Bib Overalls", category: "Hunting Pants", price: "Contact", image: IMAGES.catSports, badge: "Insulated" },
  { id: 8, name: "Woodland Camo Set", category: "Camo Gear", price: "Contact", image: IMAGES.catStreetwear, badge: "Pattern Design" },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch live products from the database
  const { data: dbProducts, isLoading } = trpc.product.list.useQuery();

  // Map database products to the UI format
  const products = dbProducts?.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.title || "Unnamed Gear",
    category: p.category || "General",
    price: p.samplePrice ? `$${p.samplePrice}` : "Contact for Quote",
    image: p.mainImage || IMAGES.catHunting,
    badge: p.isFeatured ? "Featured" : "New",
  })) || [];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper>
      <SEOHead
        title="Shop Hunting Gear Catalog | Xelent Huntgear Pakistan"
        description="Browse our hunting apparel catalog. Waterproof jackets, camo gear, tactical pants, base layers. B2B wholesale manufacturer. Custom orders available."
        canonical="/shop"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Shop", item: "/shop" },
        ]}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-[#0a0a0a] border-b border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={predefinedBreadcrumbs.shop} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[45vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.shopBg} alt="Xelent Huntgear Shop - B2B Hunting Apparel Catalog with Waterproof Jackets Camo Gear and Tactical Pants" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 min-h-[50vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Product Catalog
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6"
            >
              Hunting Gear
              <span className="block text-[#ff6b00] italic font-light">Collection</span>
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
              Browse our hunting apparel catalog. All products available for custom manufacturing
              with your branding. Low MOQ 50pcs per style.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SHOP SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 text-sm font-condensed uppercase tracking-wider transition-all ${selectedCategory === "all"
                  ? "bg-[#ff6b00] text-black"
                  : "bg-[#161616] text-white/70 border border-white/10 hover:border-[#ff6b00]/50"
                  }`}
              >
                All Products
              </button>
              {SHOP_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 text-sm font-condensed uppercase tracking-wider transition-all ${selectedCategory === cat.name
                    ? "bg-[#ff6b00] text-black"
                    : "bg-[#161616] text-white/70 border border-white/10 hover:border-[#ff6b00]/50"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative md:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-[#161616] border border-white/10 pl-10 pr-4 py-2 text-white focus:border-[#ff6b00] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-10 h-10 text-[#ff6b00] animate-spin" />
              <p className="text-white/40 font-condensed tracking-widest uppercase text-sm">Loading Arsenal...</p>
            </div>
          ) : (
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
              {filteredProducts.map((product: any) => (
                <AnimatedChild key={product.id} direction="up">
                  <Link href={`/shop/${product.slug}`}>
                    <div className="group bg-[#111111] border border-white/10 overflow-hidden hover:border-[#ff6b00]/50 transition-all duration-300 cursor-pointer">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        {/* Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#ff6b00] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                            {product.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{product.category}</p>
                        <h3 className="text-white font-condensed font-bold text-lg uppercase group-hover:text-[#ff6b00] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-white/60 text-sm">{product.price}</span>
                          <span className="text-[#ff6b00] text-xs font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Details <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedChild>
              ))}
            </StaggerChildren>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="mt-4 text-[#ff6b00] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center p-12 bg-[#111111] border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Need Custom Manufacturing?</h3>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto">
              All products shown can be manufactured with your branding, custom patterns,
              and specific technical requirements. Low MOQ 50pcs per style.
            </p>
            <Link href="/rfq">
              <Button className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider px-8 py-3">
                Request Custom Quote <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
