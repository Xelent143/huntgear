import { useState, useEffect, useCallback } from "react";
import { Link, useLocation as wouterUseLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper, SectionHeading } from "@/components/animations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal, Tag, Package, ArrowRight, Star, Truck, Palette } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

// ─── Static fallback products for when DB is empty ───────────────────────────

// The `DEMO_PRODUCTS` are imported from `@/lib/demo-products.ts` instead of hardcoded here.

const ALL_CATEGORIES = ["All", "Hunting Wear", "Sports Wear", "Ski Wear", "Tech Wear", "Streetwear", "Martial Arts Wear"];

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: typeof DEMO_PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative group/card">
      <Link href={`/shop/${product.slug}`}>
        <article
          className="group relative bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-foreground/10 hover:border-gold/40"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Image container */}
          <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
            <img
              src={product.mainImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
              <span className="flex items-center gap-2 text-white font-condensed font-semibold tracking-wider text-sm uppercase border border-white/60 px-4 py-2 rounded">
                View Product <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isFeatured && (
                <span className="bg-gold text-black text-[10px] font-condensed font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  Featured
                </span>
              )}
              {product.freeShipping && (
                <span className="bg-green-600 text-white text-[10px] font-condensed font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                  <Truck className="w-2.5 h-2.5" /> Free Ship
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-gold font-condensed font-semibold uppercase tracking-widest mb-1">{product.category}</p>
            <h3 className="text-foreground font-serif font-semibold text-base leading-snug mb-2 group-hover:text-gold transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{product.shortDescription}</p>
            <div className="flex items-center justify-between border-t border-border pt-4 mt-3">
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Starting from</p>
                <p className="text-gold font-condensed font-bold text-lg leading-none">{(product as any).startingPrice ?? "Request Quote"}</p>
              </div>

              <div className="flex flex-col items-center justify-center translate-y-1">
                <Link
                  href="/customize"
                  onClick={e => e.stopPropagation()}
                  className="group/btn"
                >
                  <span className="flex items-center gap-1.5 text-[10px] font-condensed font-bold uppercase tracking-wider bg-[#b07d3b] text-white px-4 py-2 rounded shadow-md hover:bg-[#c99551] transition-all transform group-hover/btn:scale-105">
                    <Palette className="w-3.5 h-3.5" />
                    Customize
                  </span>
                </Link>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Min. Order</p>
                <p className="text-foreground font-condensed font-semibold text-lg leading-none">{(product as any).moq ?? "50 pcs"}</p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Shop Page ───────────────────────────────────────────────────────────

export default function Shop() {
  const [location] = wouterUseLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Keep active category synced if URL changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: dbProducts, isLoading } = trpc.product.list.useQuery({
    category: activeCategory === "All" ? undefined : activeCategory,
    search: debouncedSearch || undefined,
    limit: 48,
    offset: 0,
  });

  const { data: categories } = trpc.product.categories.useQuery();

  // Merge DB categories with static list
  const allCategories = ["All", ...Array.from(new Set([
    ...(categories ?? []),
    ...ALL_CATEGORIES.filter(c => c !== "All"),
  ]))];

  // Use DB products if available, else show demo products filtered
  const displayProducts = (dbProducts && dbProducts.length > 0)
    ? dbProducts.map(p => ({
      ...p,
      startingPrice: "Request Quote",
      moq: "50 pcs",
      mainImage: p.mainImage ?? "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    }))
    : DEMO_PRODUCTS.filter(p => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = !debouncedSearch || p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return 0;
    });

  const totalCount = displayProducts.length;

  return (
    <PageWrapper>
      <SEOHead
        title="Shop Custom Streetwear | B2B Wholesale | Sialkot Sample Masters Pakistan"
        description="Browse Sialkot Sample Masters' B2B custom apparel catalog — Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, and Martial Arts Wear. Slab pricing, low MOQ from 50 pcs, private label manufacturing from Sialkot, Pakistan."
        keywords="custom hunting wear manufacturer Pakistan, custom sports wear wholesale, ski wear manufacturer Sialkot, techwear manufacturer Pakistan, custom streetwear manufacturer, BJJ gi manufacturer Pakistan, martial arts wear wholesale, private label apparel manufacturer Pakistan"
        ogType="website"
      />

      {/* JSON-LD: ItemList schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Sialkot Sample Masters Catalog",
          "description": "B2B custom streetwear manufacturing catalog from Sialkot Sample Masters, Pakistan",
          "numberOfItems": totalCount,
          "itemListElement": displayProducts.slice(0, 10).map((p, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": p.title,
            "url": `https://sialkotsamplementasters.com/shop/${p.slug}`,
          })),
        })
      }} />

      <main className="min-h-screen bg-background">
        {/* ── Hero Banner ── */}
        <section
          className="relative pt-16 pb-20 overflow-hidden"
          style={{ backgroundImage: `url(${IMAGES.shopBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="container relative z-10">
            <div className="max-w-3xl flex flex-col items-start text-left">
              <FadeIn direction="down" delay={0.1}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-gold" />
                  <span className="text-gold font-condensed text-sm uppercase tracking-widest">Global Manufacturing Hub</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Premium B2B <br />
                  <span className="text-gradient-gold italic">Apparel Catalog</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-slate-200 text-lg max-w-xl leading-relaxed mb-8">
                  Direct from Sialkot to your warehouse. Explore our export-quality collections across streetwear, sportswear, and technical garments.
                </p>
              </FadeIn>

              {/* Trust badges */}
              <StaggerChildren className="flex flex-wrap gap-x-8 gap-y-4" stagger={0.05}>
                {[
                  { icon: Star, text: "ISO 9001:2015" },
                  { icon: Package, text: "MOQ from 20 pcs" },
                  { icon: Truck, text: "Global DDP/FOB" },
                  { icon: Tag, text: "Tiered Pricing" },
                ].map(({ icon: Icon, text }) => (
                  <AnimatedChild key={text} direction="left">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon className="w-4 h-4 text-gold" />
                      <span className="font-condensed font-semibold uppercase tracking-wider">{text}</span>
                    </div>
                  </AnimatedChild>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </section>

        {/* ── Filters & Search ── */}
        <section className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border py-4 shadow-sm">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-condensed font-semibold uppercase tracking-wider transition-all duration-200 ${activeCategory === cat
                      ? "bg-gold text-black"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Search + Sort */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 bg-secondary border-border text-sm h-10"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-secondary border-border rounded-md text-sm px-3 h-10 text-muted-foreground focus:ring-1 focus:ring-gold outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Name (A-Z)</option>
                </select>
                <span className="text-muted-foreground text-sm whitespace-nowrap hidden lg:inline-block">
                  {isLoading ? "..." : `${totalCount} products`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Product Grid ── */}
        <section className="py-12">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="text-center py-24">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
                <h3 className="font-serif text-2xl text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or category filter.</p>
                <Button onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Featured row (if on All category) */}
                {activeCategory === "All" && !debouncedSearch && (
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <Star className="w-5 h-5 text-gold" />
                      <h2 className="font-condensed text-xl font-bold uppercase tracking-wider text-foreground">Featured Products</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {displayProducts.filter(p => p.isFeatured).slice(0, 4).map(p => (
                        <ProductCard key={p.id} product={p as any} />
                      ))}
                    </div>
                  </div>
                )}

                {/* All products */}
                <div className="mb-6 flex items-center gap-3">
                  <h2 className="font-condensed text-xl font-bold uppercase tracking-wider text-foreground">
                    {activeCategory === "All" ? "All Products" : activeCategory}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {displayProducts.map(p => (
                    <ProductCard key={p.id} product={p as any} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── SEO/GEO Footer Content Section ── */}
        <section className="py-20 bg-background border-t border-border overflow-hidden">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">
                  Sialkot’s Premier hub for
                  <span className="text-gradient-gold italic"> Export-Quality Manufacturing</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    As a leading apparel manufacturer in Sialkot, Pakistan, Sialkot Sample Masters serves as a strategic production partner for emerging and established fashion brands globally. Our facility in the heart of Pakistan's textile hub is equipped with 50+ specialized machines, ensuring every garment meets the highest international standards.
                  </p>
                  <p>
                    We specialize in frictionless B2B exports to the USA, UK, Europe, Australia, and the Middle East. Our logistics team handles complex global shipping requirements, including FOB, CIF, and DDP terms, providing a seamless factory-to-door experience.
                  </p>
                  <p>
                    Whether you are looking for wholesale streetwear, high-performance athletic apparel, or specialized hunting gear, our Sialkot-based team masters the precision of modern garment construction.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-condensed font-bold uppercase tracking-widest text-gold text-lg">Global Reach</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• North American Distribution Support</li>
                    <li>• European Retail Compliance</li>
                    <li>• Middle-Eastern Logistics Hub</li>
                    <li>• Asia-Pacific Rapid Shipping</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-condensed font-bold uppercase tracking-widest text-gold text-lg">Key Capabilities</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 100% In-house Sublimation</li>
                    <li>• Low MOQ OEM/ODM Services</li>
                    <li>• Private Label Full Package (FPP)</li>
                    <li>• Custom Techwear Prototyping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── B2B CTA Banner ── */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-10 rounded-2xl border border-gold/10 bg-secondary/50 backdrop-blur-sm">
              <div className="max-w-xl">
                <h3 className="font-serif text-3xl font-bold text-foreground mb-3">
                  Scale Your Brand with Sialkot’s Finest
                </h3>
                <p className="text-muted-foreground">
                  Need a custom tech-pack developed? Our sample masters are ready to bring your vision to life.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link href="/rfq">
                  <Button className="h-12 px-8 bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-widest text-sm shadow-xl shadow-gold/10">
                    Get an Instant RFQ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
