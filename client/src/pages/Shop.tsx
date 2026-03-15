import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation as wouterUseLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper } from "@/components/animations";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  SlidersHorizontal, 
  Tag, 
  Package, 
  ArrowRight, 
  Star, 
  Truck, 
  Palette,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Grid3X3,
  List,
  Filter
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import { SHOP_CATEGORIES, getCategoryBySlug, CATEGORY_SEO_CONTENT } from "@/lib/shop-categories";
import { cn } from "@/lib/utils";

// ─── Product Card ─────────────────────────────────────────────────────────────

interface ProductType {
  id: number;
  slug: string;
  title: string;
  category: string;
  subCategory?: string;
  shortDescription: string;
  mainImage?: string;
  isFeatured?: boolean;
  freeShipping?: boolean;
  startingPrice?: string;
  moq?: string;
}

function ProductCard({ product }: { product: ProductType }) {
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
              decoding="async"
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
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gold font-condensed font-semibold uppercase tracking-widest">{product.category}</p>
              {product.subCategory && (
                <>
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{product.subCategory}</p>
                </>
              )}
            </div>
            <h3 className="text-foreground font-serif font-semibold text-base leading-snug mb-2 group-hover:text-gold transition-colors">
              {product.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{product.shortDescription}</p>
            <div className="flex items-center justify-between border-t border-border pt-4 mt-3">
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Starting from</p>
                <p className="text-gold font-condensed font-bold text-lg leading-none">{product.startingPrice ?? "Request Quote"}</p>
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
                <p className="text-foreground font-condensed font-semibold text-lg leading-none">{product.moq ?? "50 pcs"}</p>
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

// ─── Sidebar Category Navigation ──────────────────────────────────────────────

interface CategoryNavProps {
  activeCategory: string | null;
  activeSubCategory: string | null;
  onCategoryChange: (category: string | null, subCategory: string | null) => void;
  productCounts: Record<string, number>;
}

function CategorySidebar({ activeCategory, activeSubCategory, onCategoryChange, productCounts }: CategoryNavProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    activeCategory ? [activeCategory] : []
  );

  useEffect(() => {
    if (activeCategory && !expandedCategories.includes(activeCategory)) {
      setExpandedCategories((prev) => [...prev, activeCategory]);
    }
  }, [activeCategory]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const getTotalCount = (categoryId: string) => {
    return productCounts[categoryId] || 0;
  };

  return (
    <div className="space-y-2">
      {/* All Products Link */}
      <button
        onClick={() => onCategoryChange(null, null)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          !activeCategory
            ? "bg-gold text-black"
            : "text-foreground hover:bg-secondary"
        )}
      >
        <span className="flex items-center gap-2">
          <Grid3X3 className="w-4 h-4" />
          All Products
        </span>
        <Badge variant={!activeCategory ? "secondary" : "outline"} className="text-xs">
          {Object.values(productCounts).reduce((a, b) => a + b, 0)}
        </Badge>
      </button>

      <Separator className="my-3" />

      {/* Category Tree */}
      <div className="space-y-1">
        {SHOP_CATEGORIES.map((category) => {
          const isExpanded = expandedCategories.includes(category.slug);
          const isActive = activeCategory === category.slug;
          const hasSubCategories = category.subCategories.length > 0;

          return (
            <div key={category.id} className="space-y-1">
              {/* Category Header */}
              <button
                onClick={() => {
                  if (hasSubCategories) {
                    toggleCategory(category.slug);
                  }
                  onCategoryChange(category.slug, null);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive && !activeSubCategory
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{category.icon}</span>
                  {category.name}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    {getTotalCount(category.slug)}
                  </Badge>
                  {hasSubCategories && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  )}
                </div>
              </button>

              {/* Subcategories */}
              {hasSubCategories && isExpanded && (
                <div className="ml-4 pl-4 border-l border-border space-y-1 animate-in slide-in-from-top-1 duration-200">
                  {category.subCategories.map((sub) => {
                    const isSubActive = activeSubCategory === sub.slug && isActive;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onCategoryChange(category.slug, sub.slug)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200",
                          isSubActive
                            ? "bg-gold text-black font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        <span>{sub.name}</span>
                        <span className="text-xs opacity-60">
                          {productCounts[`${category.slug}-${sub.slug}`] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile Filter Sheet ──────────────────────────────────────────────────────

function MobileFilterSheet({ 
  children, 
  activeCategory, 
  activeSubCategory 
}: { 
  children: React.ReactNode;
  activeCategory: string | null;
  activeSubCategory: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {(activeCategory || activeSubCategory) && (
            <Badge variant="secondary" className="ml-1 text-xs">1</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
        <SheetHeader className="p-4 pb-2">
          <SheetTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Products
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-80px)] px-4 pb-4">
          {children}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// ─── Breadcrumb Navigation ────────────────────────────────────────────────────

function BreadcrumbNav({ 
  activeCategory, 
  activeSubCategory 
}: { 
  activeCategory: string | null; 
  activeSubCategory: string | null;
}) {
  const category = activeCategory ? getCategoryBySlug(activeCategory) : null;
  const subCategory = category && activeSubCategory 
    ? category.subCategories.find(s => s.slug === activeSubCategory) 
    : null;

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
      
      {category && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className={cn("hover:text-foreground transition-colors", !subCategory && "text-foreground font-medium")}>
            {category.name}
          </span>
        </>
      )}
      
      {subCategory && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{subCategory.name}</span>
        </>
      )}
    </nav>
  );
}

// ─── Main Shop Page ───────────────────────────────────────────────────────────

export default function Shop() {
  const [location, setLocation] = wouterUseLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category");
  const subCategoryParam = searchParams.get("subcategory");

  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(subCategoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Keep URL params synced with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (activeSubCategory) params.set("subcategory", activeSubCategory);
    if (debouncedSearch) params.set("search", debouncedSearch);
    
    const newUrl = `/shop${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState({}, "", newUrl);
  }, [activeCategory, activeSubCategory, debouncedSearch]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const { data: dbProducts, isLoading } = trpc.product.list.useQuery({
    category: activeCategory || undefined,
    search: debouncedSearch || undefined,
    limit: 48,
    offset: 0,
  });

  // Filter and process products
  const displayProducts = useMemo(() => {
    let products: ProductType[] = (dbProducts && dbProducts.length > 0)
      ? dbProducts.map(p => ({
          ...p,
          startingPrice: "Request Quote",
          moq: "50 pcs",
          mainImage: p.mainImage ?? undefined,
        }))
      : DEMO_PRODUCTS.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          shortDescription: p.shortDescription,
          mainImage: p.mainImage,
          isFeatured: p.isFeatured,
          freeShipping: p.freeShipping,
          startingPrice: p.startingPrice,
          moq: p.moq,
          subCategory: (p as any).subCategory,
        }));

    // Filter by subcategory if selected
    if (activeSubCategory && activeCategory) {
      // In real implementation, this would filter by actual subcategory data
      // For now, we'll simulate by filtering based on product name patterns
      products = products.filter(p => {
        const categoryData = getCategoryBySlug(activeCategory);
        const subCategoryData = categoryData?.subCategories.find(s => s.slug === activeSubCategory);
        
        if (!subCategoryData) return true;
        
        // Simple keyword matching for demo
        const nameLower = p.title.toLowerCase();
        const subNameLower = subCategoryData.name.toLowerCase();
        
        // Match subcategory keywords to product names
        if (subNameLower.includes("jacket") && nameLower.includes("jacket")) return true;
        if (subNameLower.includes("pant") && (nameLower.includes("pant") || nameLower.includes("trouser") || nameLower.includes("bib"))) return true;
        if (subNameLower.includes("hoodie") && nameLower.includes("hoodie")) return true;
        if (subNameLower.includes("t-shirt") && (nameLower.includes("tee") || nameLower.includes("shirt"))) return true;
        if (subNameLower.includes("gi") && nameLower.includes("gi")) return true;
        if (subNameLower.includes("rashguard") && nameLower.includes("rashguard")) return true;
        if (subNameLower.includes("short") && nameLower.includes("short")) return true;
        if (subNameLower.includes("vest") && nameLower.includes("vest")) return true;
        if (subNameLower.includes("cargo") && nameLower.includes("cargo")) return true;
        
        // Default: show category products when exact match not found
        return p.category.toLowerCase().replace(/\s+/g, "-") === activeCategory.toLowerCase() ||
               p.category === categoryData?.name;
      });
    }

    // Apply search filter
    if (debouncedSearch) {
      products = products.filter(p => 
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply sorting
    products = [...products].sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "featured") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      if (sortBy === "price-low") {
        const aPrice = parseFloat(a.startingPrice?.replace(/[^0-9.]/g, "") || "0");
        const bPrice = parseFloat(b.startingPrice?.replace(/[^0-9.]/g, "") || "0");
        return aPrice - bPrice;
      }
      return 0;
    });

    return products;
  }, [dbProducts, activeCategory, activeSubCategory, debouncedSearch, sortBy]);

  // Calculate product counts for sidebar
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Count by category
    DEMO_PRODUCTS.forEach(p => {
      const catSlug = p.category.toLowerCase().replace(/\s+/g, "-");
      counts[catSlug] = (counts[catSlug] || 0) + 1;
    });

    return counts;
  }, []);

  const totalCount = displayProducts.length;

  // Handle category change
  const handleCategoryChange = (category: string | null, subCategory: string | null) => {
    setActiveCategory(category);
    setActiveSubCategory(subCategory);
  };

  // Get SEO content
  const seoContent = activeCategory ? CATEGORY_SEO_CONTENT[activeCategory] : null;
  const seoTitle = activeSubCategory && activeCategory
    ? `${getCategoryBySlug(activeCategory)?.subCategories.find(s => s.slug === activeSubCategory)?.name} | ${getCategoryBySlug(activeCategory)?.name} | Sialkot Sample Masters`
    : seoContent?.title || (activeCategory 
      ? `${getCategoryBySlug(activeCategory)?.name} | Custom Manufacturer | Sialkot Sample Masters`
      : "Shop Custom Streetwear | B2B Wholesale Catalog | Sialkot Sample Masters Pakistan");
  
  const seoDescription = seoContent?.description || (activeCategory
    ? `Custom ${getCategoryBySlug(activeCategory)?.name.toLowerCase()} manufacturing. Low MOQ from 50 pieces. OEM & private label services from Sialkot, Pakistan.`
    : "Browse Sialkot Sample Masters' B2B custom apparel catalog. Ski wear, streetwear, sportswear & more. Slab pricing, low MOQ from 50 pcs, private label manufacturing.");

  return (
    <PageWrapper>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoContent?.keywords || "custom apparel manufacturer Pakistan, B2B clothing wholesale, private label manufacturing, low MOQ clothing supplier"}
        canonical={`/shop${activeCategory ? `?category=${activeCategory}` : ""}${activeSubCategory ? `&subcategory=${activeSubCategory}` : ""}`}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Shop", item: "/shop" },
          ...(activeCategory ? [{ name: getCategoryBySlug(activeCategory)?.name || activeCategory, item: `/shop?category=${activeCategory}` }] : []),
          ...(activeSubCategory && activeCategory ? [{ name: getCategoryBySlug(activeCategory)?.subCategories.find(s => s.slug === activeSubCategory)?.name || activeSubCategory, item: `/shop?category=${activeCategory}&subcategory=${activeSubCategory}` }] : []),
        ]}
      />

      {/* JSON-LD: ItemList schema for SEO */}
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "${activeCategory ? getCategoryBySlug(activeCategory)?.name + ' Catalog' : 'Sialkot Sample Masters Catalog'}",
          "description": "${seoDescription?.replace(/"/g, '\\"')}",
          "numberOfItems": ${totalCount},
          "itemListElement": [${displayProducts.slice(0, 10).map((p, i) => `{
            "@type": "ListItem",
            "position": ${i + 1},
            "name": "${p.title?.replace(/"/g, '\\"')}",
            "url": "https://sialkotsamplemasters.com/shop/${p.slug}"
          }`).join(',')}]`}
        }
      </script>

      <main className="min-h-screen bg-background">
        {/* ── Hero Banner ──────────────────────────────────────────── */}
        <section
          className="relative pt-16 pb-12 overflow-hidden"
          style={{ backgroundImage: `url(${IMAGES.shopBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <FadeIn direction="down" delay={0.1}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-gold" />
                  <span className="text-gold font-condensed text-sm uppercase tracking-widest">Global Manufacturing Hub</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {activeCategory ? (
                    <>
                      {getCategoryBySlug(activeCategory)?.icon} {getCategoryBySlug(activeCategory)?.name}
                    </>
                  ) : activeSubCategory ? (
                    <>
                      {getCategoryBySlug(activeCategory || "")?.subCategories.find(s => s.slug === activeSubCategory)?.name}
                    </>
                  ) : (
                    <>
                      Premium B2B <span className="text-gradient-gold italic">Apparel Catalog</span>
                    </>
                  )}
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-slate-200 text-lg max-w-xl leading-relaxed mb-6">
                  {activeCategory 
                    ? getCategoryBySlug(activeCategory)?.description
                    : "Direct from Sialkot to your warehouse. Explore our export-quality collections across streetwear, sportswear, and technical garments."
                  }
                </p>
              </FadeIn>

              {/* Trust badges */}
              <StaggerChildren className="flex flex-wrap gap-x-6 gap-y-2" stagger={0.05}>
                {[
                  { icon: Star, text: "ISO 9001:2015" },
                  { icon: Package, text: "MOQ from 50 pcs" },
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

        {/* ── Breadcrumb ───────────────────────────────────────────── */}
        <div className="border-b border-border bg-card/50">
          <div className="container py-3">
            <BreadcrumbNav activeCategory={activeCategory} activeSubCategory={activeSubCategory} />
          </div>
        </div>

        {/* ── Main Content Area ────────────────────────────────────── */}
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* ── Sidebar Navigation ───────────────── */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              {/* Mobile: Filter Sheet Button */}
              <div className="block lg:hidden mb-4">
                <MobileFilterSheet activeCategory={activeCategory} activeSubCategory={activeSubCategory}>
                  <CategorySidebar
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    onCategoryChange={handleCategoryChange}
                    productCounts={productCounts}
                  />
                </MobileFilterSheet>
              </div>

              {/* Desktop: Always Visible Sidebar */}
              <div className="hidden lg:block" style={{ display: 'block !important' }}>
                <div className="bg-card border border-border rounded-xl p-4 sticky top-24" style={{ position: 'sticky', top: '96px' }}>
                  <h3 className="font-condensed font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2 text-foreground">
                    <List className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin">
                    <CategorySidebar
                      activeCategory={activeCategory}
                      activeSubCategory={activeSubCategory}
                      onCategoryChange={handleCategoryChange}
                      productCounts={productCounts}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Product Area ───────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Filters & Search Bar */}
              <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  {/* Active Filter Display */}
                  <div className="flex items-center gap-2">
                    <h2 className="font-condensed font-bold text-lg">
                      {activeSubCategory && activeCategory
                        ? getCategoryBySlug(activeCategory)?.subCategories.find(s => s.slug === activeSubCategory)?.name
                        : activeCategory
                          ? getCategoryBySlug(activeCategory)?.name
                          : "All Products"
                      }
                    </h2>
                    <Badge variant="outline" className="text-xs">
                      {totalCount} items
                    </Badge>
                    {(activeCategory || activeSubCategory) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCategoryChange(null, null)}
                        className="text-xs h-7 px-2"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>

                  {/* Search & Sort */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
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
                      <option value="featured">Featured</option>
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price: Low to High</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                </div>
              ) : displayProducts.length === 0 ? (
                <div className="text-center py-24 bg-card border border-border rounded-xl">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
                  <h3 className="font-serif text-2xl text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your filters or search query. We have products across all major apparel categories.
                  </p>
                  <Button onClick={() => { handleCategoryChange(null, null); setSearchQuery(""); }}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Featured Products Row (when showing all) */}
                  {!activeCategory && !debouncedSearch && (
                    <div className="mb-10">
                      <div className="flex items-center gap-3 mb-6">
                        <Star className="w-5 h-5 text-gold" />
                        <h3 className="font-condensed text-lg font-bold uppercase tracking-wider text-foreground">Featured Products</h3>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {displayProducts.filter(p => p.isFeatured).slice(0, 4).map(p => (
                          <ProductCard key={`featured-${p.id}`} product={p} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Products Grid */}
                  <div className={cn(
                    "grid gap-5",
                    viewMode === "grid" 
                      ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
                      : "grid-cols-1"
                  )}>
                    {displayProducts
                      .filter(p => !(!activeCategory && !debouncedSearch && p.isFeatured))
                      .map(p => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── SEO Content Section ─────────────────────────────────── */}
        {activeCategory && (
          <section className="py-16 bg-card border-t border-border mt-12">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-serif text-3xl font-bold mb-4">
                  Custom {getCategoryBySlug(activeCategory)?.name} Manufacturing
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Looking for a reliable {getCategoryBySlug(activeCategory)?.name.toLowerCase()} manufacturer in Pakistan? 
                  Sialkot Sample Masters offers premium quality with low MOQ starting at 50 pieces. 
                  OEM and private label services available for global brands.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/rfq">
                    <Button className="bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-widest">
                      Request Quote
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="font-condensed font-bold uppercase tracking-widest">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}
