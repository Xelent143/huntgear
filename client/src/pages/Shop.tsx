import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Filter, ChevronDown, Search, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";
import { Breadcrumb, predefinedBreadcrumbs } from "@/components/Breadcrumb";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch live products from the database
  const { data: dbProducts, isLoading } = trpc.product.list.useQuery();

  // Fetch dynamic categories and subcategories
  const { data: categoryTree, isLoading: isLoadingCats } = trpc.category.listWithSubs.useQuery();

  // Map database products to the UI format
  const products = dbProducts?.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.title || "Unnamed Gear",
    category: p.category || "General",
    categoryId: p.categoryId,
    subcategoryId: p.subcategoryId,
    price: p.samplePrice ? `$${p.samplePrice}` : "Contact for Quote",
    image: p.mainImage || IMAGES.catHunting,
    badge: p.isFeatured ? "Featured" : "New",
  })) || [];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSubcategory = selectedSubcategory === "all" || product.subcategoryId === selectedSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubcategory && matchesSearch;
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

      {/* Hero Section */}
      <section className="relative min-h-[40vh] bg-black overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img src={IMAGES.shopBg} alt="Xelent Huntgear Shop" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Elite Technical Systems
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4"
            >
              HUNTING <span className="text-[#ff6b00] italic font-light">CATALOG.</span>
            </motion.h1>
            <div className="w-20 h-1 bg-[#ff6b00] mb-6" />
          </div>
        </div>
      </section>

      {/* Shop Main Area */}
      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Sidebar: Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                  <Filter className="w-4 h-4 text-[#ff6b00]" />
                  <h2 className="text-white font-condensed font-bold uppercase tracking-widest text-sm">Sort By Arsenal</h2>
                </div>

                <div className="space-y-6">
                  {/* All Products Link */}
                  <button
                    onClick={() => { setSelectedCategory("all"); setSelectedSubcategory("all"); }}
                    className={`block w-full text-left font-condensed uppercase tracking-wider text-xs px-4 py-3 border transition-all ${selectedCategory === "all"
                        ? "bg-[#ff6b00] text-black border-[#ff6b00]"
                        : "text-white/40 border-white/5 hover:border-[#ff6b00]/30 hover:text-white"
                      }`}
                  >
                    All Collections
                  </button>

                  {isLoadingCats ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 bg-white/5 animate-pulse rounded" />
                      ))}
                    </div>
                  ) : (
                    categoryTree?.map((cat) => (
                      <div key={cat.id} className="space-y-2">
                        <button
                          onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory("all"); }}
                          className={`w-full text-left flex items-center justify-between group py-1 ${selectedCategory === cat.id ? "text-[#ff6b00]" : "text-white/60 hover:text-white"
                            }`}
                        >
                          <span className="font-condensed font-bold uppercase tracking-widest text-sm">{cat.name}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${selectedCategory === cat.id ? "rotate-180 text-[#ff6b00]" : "text-white/20"}`} />
                        </button>

                        {selectedCategory === cat.id && cat.subcategories && cat.subcategories.length > 0 && (
                          <div className="pl-4 space-y-1 border-l border-white/5 mt-2 ml-1">
                            {cat.subcategories.map((sub: any) => (
                              <button
                                key={sub.id}
                                onClick={() => setSelectedSubcategory(sub.id)}
                                className={`block w-full text-left py-1.5 text-xs font-medium transition-colors ${selectedSubcategory === sub.id ? "text-white" : "text-white/30 hover:text-white"
                                  }`}
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Technical Support Box */}
                <div className="mt-12 p-6 bg-[#111111] border border-white/5">
                  <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Technical Support</h4>
                  <p className="text-white/40 text-[10px] leading-relaxed mb-4 uppercase tracking-wider">
                    Need a custom built technical apparel solution? Our engineering team is ready to assist.
                  </p>
                  <Link href="/contact">
                    <span className="text-[#ff6b00] text-[10px] font-bold uppercase tracking-widest hover:underline cursor-pointer">
                      Consult Specialist →
                    </span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content: Products */}
            <div className="flex-1">
              {/* Search & Stats Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 bg-[#111111] p-4 border border-white/5">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    placeholder="Search Technical Arsenal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none pl-10 pr-4 py-1 text-white text-sm focus:ring-0 placeholder:text-white/10"
                  />
                </div>

                <div className="flex items-center gap-4 text-white/20 font-condensed text-[10px] font-bold uppercase tracking-widest border-l border-white/10 pl-6">
                  Showing <span className="text-white">{filteredProducts.length}</span> Built Results
                </div>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                  <Loader2 className="w-10 h-10 text-[#ff6b00] animate-spin" />
                  <p className="text-white/40 font-condensed tracking-widest uppercase text-sm">Synchronizing Arsenal...</p>
                </div>
              ) : (
                <>
                  <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
                    {filteredProducts.map((product) => (
                      <AnimatedChild key={product.id} direction="up">
                        <Link href={`/shop/${product.slug}`}>
                          <div className="group bg-[#111111] border border-white/5 overflow-hidden hover:border-[#ff6b00]/30 transition-all duration-500 cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                              />
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                              {/* Badge */}
                              <div className="absolute top-4 left-4">
                                <span className="bg-[#ff6b00] text-black text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-xl">
                                  {product.badge}
                                </span>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="p-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20">
                              <p className="text-[#ff6b00] text-[9px] font-bold uppercase tracking-[0.3em] mb-2">{product.category}</p>
                              <h3 className="text-white font-condensed font-bold text-xl uppercase tracking-wider group-hover:text-white transition-colors line-clamp-1 mb-4">
                                {product.name}
                              </h3>
                              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-white/40 text-xs font-bold font-condensed tracking-widest">{product.price}</span>
                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-[#ff6b00] transition-colors">
                                  Inspect <ArrowRight className="w-3" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </AnimatedChild>
                    ))}
                  </StaggerChildren>

                  {/* Empty State */}
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-32 border border-white/5 bg-[#111111]">
                      <Search className="w-12 h-12 text-white/5 mx-auto mb-6" />
                      <p className="text-white/40 font-condensed uppercase tracking-[0.3em] text-sm">No Arsenal Found Matching Selection</p>
                      <button
                        onClick={() => { setSelectedCategory("all"); setSelectedSubcategory("all"); setSearchQuery(""); }}
                        className="mt-8 text-[#ff6b00] text-xs font-bold uppercase tracking-widest border border-[#ff6b00]/30 px-6 py-2 hover:bg-[#ff6b00] hover:text-black transition-all"
                      >
                        Reset All Deployments
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* B2B CTA */}
              <div className="mt-20 p-12 bg-[#111111] border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#ff6b00]/10 transition-colors duration-700" />
                <div className="relative z-10 text-center max-w-2xl mx-auto">
                  <h3 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider font-condensed">Custom Manufacturing Arsenal</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8 uppercase tracking-widest font-medium">
                    All products in our technical catalog are available for white-label manufacturing, custom camo patterns (Optifade, Mossy Oak, RealTree compatible), and private label branding.
                  </p>
                  <Link href="/rfq">
                    <Button className="bg-[#ff6b00] text-black hover:bg-white transition-all duration-300 font-condensed font-bold uppercase tracking-[0.2em] px-10 py-4 h-auto rounded-none">
                      Request Technical Quote <ArrowRight className="ml-3 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
