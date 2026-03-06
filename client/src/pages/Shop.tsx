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
    <div className="relative group/card h-full">
      <Link href={`/shop/${product.slug}`}>
        <article
          className="group relative bg-[#FDFCFB] border border-border h-full flex flex-col overflow-hidden cursor-pointer transition-all duration-500 hover:border-gold/30 hover:shadow-xl hover:shadow-black/5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Subtle gold top border on hover */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

          {/* Image container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F9FA]">
            {/* Minimalist image placeholder effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_100%)] pointer-events-none" />

            <img
              src={product.mainImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              loading="lazy"
            />

            {/* Cinematic Overlay on hover (Light mode version) */}
            <div className={`absolute inset-0 bg-white/80 flex flex-col items-center justify-center transition-all duration-500 ${hovered ? "opacity-100 backdrop-blur-[2px]" : "opacity-0"}`}>
              <span className="flex items-center gap-3 text-foreground font-condensed font-bold tracking-[0.2em] text-[10px] uppercase border border-border px-6 py-3 hover:bg-foreground hover:text-white transition-colors duration-300">
                View Specifications <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isFeatured && (
                <span className="bg-white/90 backdrop-blur-md border border-gold/30 text-gold text-[9px] font-condensed font-bold uppercase tracking-[0.2em] px-3 py-1 shadow-sm">
                  Featured
                </span>
              )}
              {product.freeShipping && (
                <span className="bg-white/90 backdrop-blur-md border border-border text-foreground/80 text-[9px] font-condensed font-bold uppercase tracking-[0.2em] px-3 py-1 flex items-center gap-1.5 shadow-sm">
                  <Truck className="w-3 h-3" /> EXW / FOB
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col flex-grow">
            <p className="text-[9px] text-foreground/50 font-condensed font-bold uppercase tracking-[0.2em] mb-2">{product.category}</p>
            <h3 className="text-foreground font-serif font-light text-lg leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
              {product.title}
            </h3>

            <p className="text-foreground/60 font-light text-xs leading-relaxed mb-6 line-clamp-2 flex-grow">
              {product.shortDescription}
            </p>

            <div className="pt-4 mt-auto flex items-end justify-between border-t border-border group-hover:border-gold/20 transition-colors duration-300">
              <div className="flex flex-col">
                <p className="text-[9px] text-foreground/50 uppercase tracking-[0.2em] mb-1">Starting From</p>
                <p className="text-foreground font-serif italic text-sm">{(product as any).startingPrice ?? "Request Quote"}</p>
              </div>

              <div className="flex flex-col items-end text-right">
                <p className="text-[9px] text-foreground/50 uppercase tracking-[0.2em] mb-1">Min. Order</p>
                <p className="text-gold font-condensed font-bold text-sm tracking-wider">{(product as any).moq ?? "50 pcs"}</p>
              </div>
            </div>

            {/* Customize Button */}
            <div className="mt-6 sm:mt-0 sm:absolute sm:bottom-6 sm:left-6 sm:right-6 sm:opacity-0 sm:translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 z-20">
              <Link
                href="/customize"
                onClick={e => e.stopPropagation()}
              >
                <span className="flex items-center justify-center gap-2 w-full bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-300 font-condensed font-bold uppercase tracking-[0.2em] text-[10px] py-4 group/btn shadow-lg">
                  <Palette className="w-3 h-3 group-hover/btn:animate-pulse" />
                  Customize Design
                </span>
              </Link>
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
    <div className="bg-white border border-border overflow-hidden h-full flex flex-col">
      <Skeleton className="aspect-[3/4] w-full bg-black/5 rounded-none" />
      <div className="p-6 space-y-4 flex-grow">
        <Skeleton className="h-2 w-16 bg-black/10" />
        <Skeleton className="h-5 w-3/4 bg-black/10" />
        <Skeleton className="h-3 w-full bg-black/10" />
        <Skeleton className="h-3 w-2/3 bg-black/10" />
        <div className="flex justify-between pt-4 mt-4 border-t border-border">
          <Skeleton className="h-8 w-20 bg-black/10" />
          <Skeleton className="h-8 w-16 bg-black/10" />
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

      <main className="min-h-screen bg-white">
        {/* ── Light Elite Hero Banner ── */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
          {/* Cinematic Cinematic Background (Light) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-out scale-105 grayscale-[0.2]"
            style={{ backgroundImage: `url(${IMAGES.shopBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-transparent to-white/50" />

          <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl flex flex-col items-start text-left">
              <FadeIn direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-4 mb-8">
                  <span className="w-10 h-px bg-gold" />
                  <p className="text-gold font-condensed font-bold tracking-[0.4em] uppercase text-[10px] sm:text-xs">
                    Industrial Production Archive
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tighter">
                  The Complete
                  <br />
                  <span className="text-gradient-gold italic font-light">OEM Catalog</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-foreground/70 font-light text-lg sm:text-xl leading-relaxed mb-12 border-l border-gold/30 pl-8 max-w-2xl">
                  Direct factory access to high-performance textiles and precision engineering. Source your next collection with industry-leading MOQs.
                </p>
              </FadeIn>

              {/* Elite Trust Badges (Light) */}
              <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full pt-10 border-t border-border" stagger={0.1}>
                {[
                  { icon: Star, label: "CERTIFIED", value: "ISO 9001:2015" },
                  { icon: Package, label: "CAPACITY", value: "Min 50pcs/Color" },
                  { icon: Truck, label: "LOGISTICS", value: "Global DDP/FOB" },
                  { icon: Tag, label: "COMMERCIAL", value: "Tiered Pricing" },
                ].map(({ icon: Icon, label, value }) => (
                  <AnimatedChild key={label} direction="up">
                    <div className="flex flex-col gap-2">
                      <Icon className="w-5 h-5 text-gold mb-2" />
                      <span className="text-foreground/50 font-condensed font-bold text-[9px] uppercase tracking-[0.2em]">{label}</span>
                      <span className="text-foreground font-serif italic text-sm">{value}</span>
                    </div>
                  </AnimatedChild>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </section>

        {/* ── Light Elite Filters & Search ── */}
        <section className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-border py-5 shadow-sm">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Category tabs */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 text-[10px] font-condensed font-bold uppercase tracking-[0.2em] transition-all duration-300 ${activeCategory === cat
                      ? "bg-foreground text-background border border-foreground shadow-md"
                      : "bg-transparent text-foreground/60 border border-border hover:text-foreground hover:border-foreground/30 hover:bg-[#F8F9FA]"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search + Sort */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-gold transition-colors duration-300" />
                  <Input
                    placeholder="Refine catalog..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-12 bg-[#F8F9FA] border-border text-foreground placeholder:text-foreground/40 rounded-none h-11 focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold transition-all duration-300 shadow-inner"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-[#F8F9FA] border border-border text-foreground text-[10px] uppercase tracking-[0.1em] font-condensed rounded-none h-11 px-6 focus:ring-1 focus:ring-gold focus:border-gold outline-none cursor-pointer transition-all duration-300 shadow-inner"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Alphanumeric (A-Z)</option>
                </select>
                <span className="text-foreground/40 text-[10px] uppercase font-condensed tracking-[0.2em] whitespace-nowrap hidden lg:inline-block">
                  {isLoading ? "..." : `[ ${totalCount} ITEMS ]`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Light Elite Product Grid ── */}
        <section className="py-24 bg-[#F8F9FA] relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.01)_0%,transparent_100%)] pointer-events-none" />

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="text-center py-32 bg-white border border-border">
                <Package className="w-12 h-12 text-foreground/20 mx-auto mb-6" />
                <h3 className="font-serif text-3xl text-foreground mb-4">No Inventory Matches</h3>
                <p className="text-foreground/50 mb-8 max-w-md mx-auto">The specified criteria did not match any active production lines in our system.</p>
                <Button
                  onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                  className="bg-transparent border border-foreground/20 text-foreground hover:bg-foreground hover:text-background hover:border-foreground rounded-none font-condensed uppercase tracking-[0.2em] text-[10px] px-8 py-6 h-auto transition-all duration-300"
                >
                  Reset Parameters
                </Button>
              </div>
            ) : (
              <>
                {/* Featured row (if on All category) */}
                {activeCategory === "All" && !debouncedSearch && (
                  <div className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <span className="w-4 h-px bg-gold" />
                        <h2 className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Featured Collections</h2>
                      </div>
                      <div className="flex-1 ml-6 h-px bg-border" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {displayProducts.filter(p => p.isFeatured).slice(0, 4).map(p => (
                        <ProductCard key={p.id} product={p as any} />
                      ))}
                    </div>
                  </div>
                )}

                {/* All products */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-px bg-foreground/40" />
                    <h2 className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70">
                      {activeCategory === "All" ? "Complete Archive" : `${activeCategory} Collection`}
                    </h2>
                  </div>
                  <div className="flex-1 ml-6 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayProducts.map(p => (
                    <ProductCard key={p.id} product={p as any} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Light Elite SEO/GEO Footer Content Section ── */}
        <section className="py-24 bg-white border-t border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <p className="text-gold font-condensed font-bold tracking-[0.3em] uppercase text-[10px] mb-4">Strategic Location</p>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-8 text-foreground leading-[1.1]">
                  Sialkot’s Premier hub for
                  <br />
                  <span className="text-gradient-gold italic font-light">Export-Quality Manufacturing</span>
                </h2>
                <div className="space-y-6 text-foreground/60 font-light text-sm leading-relaxed max-w-lg">
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
              <div className="grid sm:grid-cols-2 gap-12 lg:pt-12">
                <div className="space-y-6">
                  <h4 className="font-condensed font-bold uppercase tracking-[0.2em] text-foreground text-xs flex items-center gap-3">
                    <span className="w-4 h-px bg-gold" />
                    Global Reach
                  </h4>
                  <ul className="space-y-4 text-sm text-foreground/50 font-light">
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> North American Distribution Support</li>
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> European Retail Compliance</li>
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> Middle-Eastern Logistics Hub</li>
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> Asia-Pacific Rapid Shipping</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-condensed font-bold uppercase tracking-[0.2em] text-foreground text-xs flex items-center gap-3">
                    <span className="w-4 h-px bg-gold" />
                    Key Capabilities
                  </h4>
                  <ul className="space-y-4 text-sm text-foreground/50 font-light">
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> 100% In-house Sublimation</li>
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> Low MOQ OEM/ODM Services</li>
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> Private Label Full Package (FPP)</li>
                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 mt-1 text-gold/80" /> Custom Techwear Prototyping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Light Elite B2B CTA Banner ── */}
        <section className="py-24 bg-[#F8F9FA] border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-12 lg:p-16 border border-border bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500 relative group">
              {/* Animated hover border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 transition-colors duration-1000 z-0 pointer-events-none" />

              <div className="max-w-2xl relative z-10">
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                  Scale Your Brand with Sialkot’s <span className="text-gold italic font-light">Finest</span>
                </h3>
                <p className="text-foreground/60 font-light text-lg">
                  Need a custom tech-pack developed? Our sample masters are ready to bring your vision to life with uncompromising precision.
                </p>
              </div>
              <div className="flex shrink-0 relative z-10 w-full md:w-auto">
                <Link href="/rfq" className="w-full md:w-auto">
                  <Button className="w-full relative overflow-hidden bg-foreground text-background hover:bg-gold hover:text-foreground transition-all duration-500 font-condensed font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs px-10 py-8 h-auto rounded-none group/rfq border border-transparent shadow-lg hover:shadow-xl">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Initiate Production Quote
                      <ArrowRight className="w-4 h-4 group-hover/rfq:translate-x-2 transition-transform" />
                    </span>
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
