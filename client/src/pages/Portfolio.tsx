import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, MapPin, Search, Filter, Shield } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  useEffect(() => {
    if (isHovered && hasMultiple) {
      intervalRef.current = setInterval(() => {
        setCurrentImg(prev => (prev + 1) % images.length);
      }, 1500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isHovered) setCurrentImg(0);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, hasMultiple, images.length]);

  const tags: string[] = (() => {
    try { return item.tags ? JSON.parse(item.tags) : []; }
    catch { return []; }
  })();

  return (
    <motion.div
      className="group relative bg-black border border-white/5 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenLightbox(item, currentImg)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={images[currentImg]?.imageUrl}
            alt={images[currentImg]?.altText || item.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <div className="absolute inset-0 border border-white/0 group-hover:border-gold/30 transition-all duration-700 m-2" />

        {/* Featured Badge */}
        {item.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-gold text-black text-[9px] font-condensed font-bold tracking-[0.2em] uppercase px-3 py-1 shadow-lg">
              Featured Asset
            </div>
          </div>
        )}

        {/* Zoom Icon */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-none bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <ZoomIn className="w-3.5 h-3.5 text-gold" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-gold font-condensed font-bold tracking-[0.2em] uppercase text-[9px] mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            {item.category}
          </p>
          <h3 className="text-white font-serif text-xl font-bold leading-tight mb-2 truncate">
            {item.title}
          </h3>
          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200">
            <span className="w-6 h-px bg-gold/50" />
            <div className="flex gap-2">
              {tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-white/40 text-[9px] uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-xl p-4 lg:p-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex flex-col lg:flex-row gap-12 items-stretch"
        onClick={e => e.stopPropagation()}
      >
        {/* Main interactive area */}
        <div className="flex-1 relative flex items-center justify-center min-h-0 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]?.imageUrl}
              alt={images[current]?.altText || item.title}
              className="max-w-full max-h-full object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            />
          </AnimatePresence>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-gold/80 hover:text-black text-white rounded-none border border-white/10 flex items-center justify-center transition-all group-hover:left-8 opacity-0 group-hover:opacity-100">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-black/40 hover:bg-gold/80 hover:text-black text-white rounded-none border border-white/10 flex items-center justify-center transition-all group-hover:right-8 opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Aesthetic Info Panel */}
        <div className="lg:w-[400px] flex flex-col justify-between py-4 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12">
          <div>
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <p className="text-gold font-condensed font-bold tracking-[0.2em] uppercase text-[10px]">
                {item.category}
              </p>
            </div>

            <h2 className="text-white font-serif text-3xl sm:text-4xl font-bold mb-6 italic tracking-tight">{item.title}</h2>

            <div className="w-16 h-px bg-white/10 mb-8" />

            {item.description && (
              <p className="text-white/50 font-light text-sm leading-relaxed mb-8 max-h-[200px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                {item.description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag: string) => (
                  <span key={tag} className="text-[10px] text-white/30 uppercase tracking-[0.2em] border border-white/5 px-3 py-1.5">{tag}</span>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {item.geoTarget && (
                <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-gold/60" />
                  <span>Deployment: {item.geoTarget}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5 text-gold/60" />
                <span>NDA Protected Manufacturing</span>
              </div>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-12">
            <p className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold mb-4">Perspective Strip</p>
            <div className="flex flex-wrap gap-3">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setCurrent(i)}
                  className={`relative w-16 h-16 transition-all duration-500 ${i === current ? "ring-1 ring-gold ring-offset-4 ring-offset-black" : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"}`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 bg-black/40 hover:bg-white text-white hover:text-black border border-white/10 transition-all flex items-center justify-center z-[110]"
      >
        <X className="w-6 h-6" />
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
      className="flex gap-8 overflow-x-auto pb-6 border-b border-white/5 no-scrollbar"
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
            className={`relative shrink-0 text-[10px] font-condensed font-bold tracking-[0.3em] uppercase transition-all duration-300 pb-2 ${isActive
              ? "text-gold"
              : "text-white/30 hover:text-white/60"
              }`}
          >
            {cat}
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-gold"
              />
            )}
            {count > 0 && !isActive && (
              <span className="ml-2 text-[8px] text-white/10 font-sans">
                {count < 10 ? `0${count}` : count}
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
    <div className="col-span-full flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-white/[0.02]">
      <div className="w-16 h-16 rounded-none border border-white/10 flex items-center justify-center mb-8">
        <Filter className="w-6 h-6 text-gold/40" />
      </div>
      <h3 className="text-white font-serif text-2xl font-bold mb-4 italic">
        {category === "All" ? "Archive Empty" : `No ${category} assets`}
      </h3>
      <p className="text-white/30 text-sm font-light max-w-xs leading-relaxed">
        Our industrial repository currently contains no records for this sector. Please select an alternative category or contact our atelier.
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

  const { data: allItems = [] } = trpc.portfolio.list.useQuery(undefined, { staleTime: 60_000 });
  const counts = (allItems as unknown as { category: string }[]).reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
        title="Asset Portfolio | Industrial Craftsmanship | Sialkot Sample Masters"
        description="A visual study in precision-engineered apparel. Explore our global manufacturing portfolio across technical sports, hunting, and industrial streetwear categories."
        keywords="custom apparel portfolio, industrial manufacturing, textile craftsmanship, Sialkot export, B2B garment production"
        canonical="https://sialkotsamplementasters.com/portfolio"
      />

      <div className="min-h-screen bg-black text-white">
        {/* Cinematic Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(201,168,76,0.1),transparent_70%)]" />

          <div className="container max-w-7xl mx-auto px-6 relative">
            <FadeIn>
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-px bg-gold" />
                  <span className="text-gold text-[10px] font-condensed font-bold tracking-[0.4em] uppercase">
                    Asset Repository
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tighter mb-8 italic">
                  Manufacturing <br />
                  <span className="text-white/20 not-italic">Perspective.</span>
                </h1>

                <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-12">
                  An architectural archive of our most significant technical triumphs. Every garment represents a synthesis of industrial precision and athletic performance.
                </p>
              </div>
            </FadeIn>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mt-12">
              <FadeIn delay={0.2} className="flex-1 w-full max-w-xl">
                <CategoryFilterBar
                  active={activeCategory}
                  onChange={cat => { setActiveCategory(cat); setSearch(""); }}
                  counts={counts}
                />
              </FadeIn>

              <FadeIn delay={0.3} className="shrink-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Filter by Asset ID..."
                    className="bg-transparent border-0 border-b border-white/10 rounded-none pl-8 focus-visible:ring-0 focus:border-gold placeholder:text-white/10 text-sm font-condensed tracking-widest uppercase"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Cinematic Masonry Grid */}
        <section className="py-24">
          <div className="container max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState category={activeCategory} />
            ) : (
              <StaggerChildren className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                {filtered.map(item => (
                  <AnimatedChild key={item.id} className="break-inside-avoid">
                    <PortfolioCard item={item} onOpenLightbox={openLightbox} />
                  </AnimatedChild>
                ))}
              </StaggerChildren>
            )}

            {!isLoading && filtered.length > 0 && (
              <div className="mt-20 flex items-center justify-center gap-6">
                <span className="w-12 h-px bg-white/10" />
                <p className="text-[10px] text-white/20 font-condensed tracking-[0.4em] uppercase">
                  End of Archive — {filtered.length} Indices Found
                </p>
                <span className="w-12 h-px bg-white/10" />
              </div>
            )}
          </div>
        </section>

        {/* Industrial CTA */}
        <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 blur-[120px] rounded-full translate-x-1/2" />

          <FadeIn>
            <div className="container max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic">
                Ready to Initiate <br /> Production?
              </h2>
              <p className="text-white/40 text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
                Whether you require a single technical prototype or a full global deployment, our atelier is prepared to execute your vision.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={() => window.location.href = "/rfq"}
                  className="bg-gold hover:bg-white text-black font-condensed font-bold tracking-[0.2em] uppercase px-12 py-8 rounded-none transition-all duration-500 h-auto"
                >
                  Request Technical Quote
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/contact"}
                  className="bg-transparent border-white/10 hover:border-white text-white font-condensed font-bold tracking-[0.2em] uppercase px-12 py-8 rounded-none transition-all duration-500 h-auto"
                >
                  Consultation
                </Button>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      <AnimatePresence>
        {lightboxItem && (
          <Lightbox item={lightboxItem} initialIndex={lightboxIndex} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
