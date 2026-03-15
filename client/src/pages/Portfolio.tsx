import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, Tag, MapPin, Search, Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PortfolioImage {
  id: number;
  imageUrl: string;
  altText?: string | null;
  caption?: string | null;
  sortOrder: number;
}

interface PortfolioItemWithImages {
  id: number;
  title: string;
  category: string;
  description?: string | null;
  tags?: string | null;
  coverImage?: string | null;
  isFeatured: boolean;
  geoTarget?: string | null;
  images: PortfolioImage[];
}

// ─── Sliding Image Card ───────────────────────────────────────────────────────

function PortfolioCard({
  item,
  onOpenLightbox,
}: {
  item: PortfolioItemWithImages;
  onOpenLightbox: (item: PortfolioItemWithImages, index: number) => void;
}) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const images = item.images.length > 0
    ? item.images
    : item.coverImage
      ? [{ id: 0, imageUrl: item.coverImage, altText: item.title, caption: null, sortOrder: 0 }]
      : [];

  const hasMultiple = images.length > 1;

  // Auto-slide on hover
  useEffect(() => {
    if (isHovered && hasMultiple) {
      intervalRef.current = setInterval(() => {
        setCurrentImg(prev => (prev + 1) % images.length);
      }, 1200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isHovered) setCurrentImg(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, hasMultiple, images.length]);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(i => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(i => (i + 1) % images.length);
  };

  const tags: string[] = (() => {
    try { return item.tags ? JSON.parse(item.tags) : []; }
    catch { return []; }
  })();

  if (images.length === 0) {
    return (
      <div className="rounded-xl overflow-hidden bg-secondary border border-border aspect-square flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No images</span>
      </div>
    );
  }

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer"
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenLightbox(item, currentImg)}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={images[currentImg].imageUrl}
            alt={images[currentImg].altText || item.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>

        {/* Featured badge */}
        {item.isFeatured && (
          <div className="absolute top-3 left-3 bg-[#C9A84C] text-black text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Image counter */}
        {hasMultiple && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {currentImg + 1}/{images.length}
          </div>
        )}

        {/* Prev/Next arrows */}
        {hasMultiple && isHovered && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-1.5 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                className={`h-1.5 rounded-full transition-all ${i === currentImg ? "bg-[#C9A84C] w-3" : "bg-white/50 w-1.5"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-foreground font-semibold text-sm leading-tight line-clamp-2">{item.title}</h3>
          <Badge variant="outline" className="text-[#C9A84C] border-[#C9A84C]/40 text-xs shrink-0">
            {item.category}
          </Badge>
        </div>
        {item.description && (
          <p className="text-muted-foreground text-xs line-clamp-2 mb-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag: string) => (
              <span key={tag} className="text-muted-foreground text-xs flex items-center gap-0.5">
                <Tag className="w-2.5 h-2.5" />{tag}
              </span>
            ))}
          </div>
          {item.geoTarget && (
            <span className="text-muted-foreground text-xs flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" />{item.geoTarget.split(",")[0]}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  item,
  initialIndex,
  onClose,
}: {
  item: PortfolioItemWithImages;
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const images = item.images.length > 0
    ? item.images
    : item.coverImage
      ? [{ id: 0, imageUrl: item.coverImage, altText: item.title, caption: null, sortOrder: 0 }]
      : [];

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  const tags: string[] = (() => {
    try { return item.tags ? JSON.parse(item.tags) : []; }
    catch { return []; }
  })();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl flex flex-col lg:flex-row gap-4 items-center"
        onClick={e => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]?.imageUrl}
              alt={images[current]?.altText || item.title}
              className="w-full max-h-[75vh] object-contain rounded-xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#C9A84C] hover:text-black text-white rounded-full p-3 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#C9A84C] hover:text-black text-white rounded-full p-3 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {current + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Info panel */}
        <div className="lg:w-72 bg-card/95 backdrop-blur-sm rounded-xl p-5 border border-border">
          <Badge className="bg-[#C9A84C]/20 text-[#C9A84C] border-[#C9A84C]/30 mb-3">{item.category}</Badge>
          <h2 className="text-foreground font-bold text-lg mb-2">{item.title}</h2>
          {item.description && <p className="text-muted-foreground text-sm mb-3">{item.description}</p>}
          {images[current]?.caption && (
            <p className="text-muted-foreground text-xs italic mb-3 border-l-2 border-gold/40 pl-2">{images[current].caption}</p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag: string) => (
                <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          )}
          {item.geoTarget && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <MapPin className="w-3 h-3" />
              <span>Ships to: {item.geoTarget}</span>
            </div>
          )}
          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setCurrent(i)}
                  className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${i === current ? "border-[#C9A84C]" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-card/90 hover:bg-secondary text-foreground rounded-full p-2 transition-all border border-border"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ─── Category Filter Bar ──────────────────────────────────────────────────────

const STATIC_CATEGORIES = [
  "All",
  "Hunting Wear",
  "Sports Wear",
  "Ski Wear",
  "Tech Wear",
  "Streetwear",
  "Martial Arts Wear",
];

function CategoryFilterBar({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (cat: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {STATIC_CATEGORIES.map(cat => {
        const count = cat === "All"
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[cat] ?? 0);
        const isActive = active === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat)}
            whileTap={{ scale: 0.95 }}
            className={`relative shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
              ? "bg-gold text-white shadow-lg shadow-gold/20"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
              }`}
          >
            {cat}
            {count > 0 && (
              <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-muted-foreground"}`}>
                ({count})
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ category }: { category: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <Filter className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-foreground font-semibold text-lg mb-2">
        {category === "All" ? "No portfolio items yet" : `No ${category} items yet`}
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Portfolio items will appear here once they are added via the admin panel.
      </p>
    </div>
  );
}

// ─── Main Portfolio Page ──────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItemWithImages | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: items = [], isLoading } = trpc.portfolio.list.useQuery(
    { category: activeCategory === "All" ? undefined : activeCategory },
    { staleTime: 30_000 }
  );

  // All items for count calculation
  const { data: allItems = [] } = trpc.portfolio.list.useQuery(undefined, { staleTime: 60_000 });
  const counts = (allItems as unknown as { category: string }[]).reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Client-side search
  const filtered = search.trim()
    ? (items as unknown as PortfolioItemWithImages[]).filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.toLowerCase().includes(search.toLowerCase())
    )
    : (items as unknown as PortfolioItemWithImages[]);

  const openLightbox = useCallback((item: PortfolioItemWithImages, index: number) => {
    setLightboxItem(item);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  return (
    <PageWrapper>
      <SEOHead
        title="Portfolio | Custom Apparel Manufacturing | Sialkot Sample Masters"
        description="Browse our portfolio of custom hunting wear, sportswear, ski wear, techwear, streetwear, and martial arts apparel manufactured in Sialkot, Pakistan for global brands."
        keywords="custom apparel portfolio, streetwear manufacturer portfolio, hunting wear manufacturer, ski wear manufacturer Pakistan, techwear manufacturer Sialkot, martial arts wear manufacturer"
        canonical="/portfolio"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Portfolio", item: "/portfolio" },
        ]}
      />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* Hero */}
        <section className="relative pt-16 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08),transparent_60%)]" />
          <div className="container max-w-7xl mx-auto px-4 relative">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="inline-block text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase mb-4 border border-[#C9A84C]/30 px-4 py-1.5 rounded-full">
                  Our Work
                </span>
                <h1
                  className="text-4xl md:text-6xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Product Portfolio
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Explore our manufacturing capabilities across 6 apparel categories. Every piece crafted in Sialkot, Pakistan for global brands.
                </p>
              </div>
            </FadeIn>

            {/* Search */}
            <FadeIn delay={0.1}>
              <div className="relative max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search portfolio..."
                  className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-gold rounded-full"
                />
              </div>
            </FadeIn>

            {/* Category filter */}
            <FadeIn delay={0.15}>
              <CategoryFilterBar
                active={activeCategory}
                onChange={cat => { setActiveCategory(cat); setSearch(""); }}
                counts={counts}
              />
            </FadeIn>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24">
          <div className="container max-w-7xl mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-secondary animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="grid grid-cols-1">
                <EmptyState category={activeCategory} />
              </div>
            ) : (
              <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(item => (
                  <AnimatedChild key={item.id}>
                    <PortfolioCard item={item} onOpenLightbox={openLightbox} />
                  </AnimatedChild>
                ))}
              </StaggerChildren>
            )}

            {!isLoading && filtered.length > 0 && (
              <p className="text-center text-muted-foreground text-sm mt-8">
                Showing {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
              </p>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-border">
          <FadeIn>
            <div className="container max-w-3xl mx-auto px-4 text-center">
              <h2
                className="text-3xl font-bold text-foreground mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Create Your Collection?
              </h2>
              <p className="text-muted-foreground mb-8">
                Get a custom sample or bulk quote for any of our 6 apparel categories. Low MOQ, fast turnaround, worldwide shipping.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.location.href = "/rfq"}
                  className="bg-gold hover:bg-gold-dark text-white font-semibold px-8"
                >
                  Request a Quote
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/contact"}
                  className="border-border text-foreground hover:bg-secondary px-8"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </FadeIn>
        </section>

        <Footer />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} initialIndex={lightboxIndex} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
