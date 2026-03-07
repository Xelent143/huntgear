import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  ChevronLeft, ChevronRight, ZoomIn, ShoppingCart, Zap,
  Ruler, Package, Truck, Shield, Star, Check, Info, ChevronDown, Tag, Palette,
  Factory
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

import { DEMO_PRODUCTS } from "@/lib/demo-products";

// ─── Demo products fallback when DB is empty ───────────────────────────────────────


// ─── Image Zoom Component ─────────────────────────────────────────────────────

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary cursor-zoom-in select-none"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-100"
        style={zoomed ? {
          transform: "scale(2.2)",
          transformOrigin: `${position.x}% ${position.y}%`,
        } : {}}
        draggable={false}
      />
      {!zoomed && (
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <ZoomIn className="w-3 h-3" /> Hover to zoom
        </div>
      )}
    </div>
  );
}

function SlabPricingTable({ slabs, quantity }: {
  slabs: { id: number; minQty: number; maxQty: number | null; pricePerUnit: string; label?: string | null; sortOrder: number }[];
  quantity: number;
}) {
  const activeIdx = slabs.findIndex(s =>
    quantity >= s.minQty && (s.maxQty === null || quantity <= (s.maxQty ?? Infinity))
  );

  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
        <Tag className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Wholesale Tiers</span>
      </div>
      <div className="flex flex-col gap-3">
        {slabs.map((slab, idx) => {
          const isActive = idx === activeIdx;
          const qtyLabel = slab.maxQty ? `${slab.minQty}–${slab.maxQty} pcs` : `${slab.minQty}+ pcs`;
          return (
            <div
              key={slab.id}
              className={`flex items-center justify-between transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-foreground' : 'bg-transparent'}`} />
                <div>
                  <span className={`text-sm ${isActive ? 'font-medium' : 'font-light'}`}>{qtyLabel}</span>
                  {slab.label && (
                    <span className={`ml-3 text-[10px] uppercase tracking-wider ${isActive ? "text-foreground" : "text-muted-foreground/60"
                      }`}>{slab.label}</span>
                  )}
                </div>
              </div>

              {/* Leader dots for that luxurious catalog feel */}
              <div className="flex-1 border-b border-dotted border-border/40 mx-4 opacity-50 relative top-1" />

              <span className={`text-sm ${isActive ? "font-medium" : "font-light"}`}>
                ${parseFloat(slab.pricePerUnit).toFixed(2)}<span className="text-[10px] ml-1 opacity-60">/pc</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Size Chart Modal ─────────────────────────────────────────────────────────

function SizeChartModal({ sizeChart, open, onClose }: {
  sizeChart: { unit: "inches" | "cm"; chartData: string; notes?: string | null } | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!sizeChart) return null;
  let rows: Record<string, string>[] = [];
  try { rows = JSON.parse(sizeChart.chartData); } catch { rows = []; }
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground flex items-center gap-2">
            <Ruler className="w-5 h-5 text-gold" /> Size Guide
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary">
                {columns.map(col => (
                  <th key={col} className="px-4 py-2 text-left font-condensed font-bold uppercase tracking-wider text-gold text-xs">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-secondary/50 transition-colors">
                  {columns.map(col => (
                    <td key={col} className={`px-4 py-2.5 ${col === "size" ? "font-condensed font-bold text-foreground" : "text-muted-foreground"}`}>
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Unit: {sizeChart.unit}. {sizeChart.notes}
        </p>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Product Detail Page ─────────────────────────────────────────────────

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(50);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const { addItem, openCart } = useCartStore();

  const { data: dbProduct, isLoading } = trpc.product.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

  // Use DB product or demo
  const product = dbProduct ?? DEMO_PRODUCTS.find(p => p.slug === slug) ?? null;

  const images = product?.images ?? [];
  const slabs = product?.slabs ?? [];
  const sizeChart = (product as any)?.sizeChart ?? null;

  const allImages: any[] = [];
  if (product?.mainImage) {
    allImages.push({ id: "main", imageUrl: product.mainImage, altText: product.title, sortOrder: -1 });
  }
  if (images && images.length > 0) {
    allImages.push(...images.filter((img: any) => img.imageUrl && img.imageUrl.trim() !== ""));
  }
  if (allImages.length === 0) {
    allImages.push({ id: 0, imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=90", altText: product?.title ?? "", sortOrder: 0 });
  }

  const activeImage = allImages[activeImageIdx] ?? allImages[0];

  // Resolve current slab price
  const activeSlab = slabs.find(s =>
    quantity >= s.minQty && (s.maxQty === null || quantity <= (s.maxQty ?? Infinity))
  ) ?? slabs[slabs.length - 1];

  const unitPrice = activeSlab ? parseFloat(activeSlab.pricePerUnit) : 0;
  const lineTotal = unitPrice * quantity;

  const availableSizes: string[] = (() => {
    try { return JSON.parse(product?.availableSizes ?? "[]"); } catch { return []; }
  })();

  const availableColors: string[] = (() => {
    try { return JSON.parse(product?.availableColors ?? "[]"); } catch { return []; }
  })();

  // Auto-select first size
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) setSelectedSize(availableSizes[0]);
  }, [availableSizes.length]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      mainImage: product.mainImage ?? "",
      selectedSize,
      selectedColor,
      quantity,
      unitPrice,
      category: product.category,
    });
    toast.success("Added to cart!", {
      description: `${quantity} × ${product.title}${selectedSize ? ` (${selectedSize})` : ""}`,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    handleAddToCart();
    // Navigate to checkout
    window.location.href = "/checkout";
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="aspect-square rounded" />)}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h2 className="font-serif text-2xl text-foreground mb-2">Product Not Found</h2>
          <Link href="/shop">
            <Button variant="outline" className="mt-4">Back to Shop</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEOHead
        title={(product as any).seoTitle ?? `${product.title} | Sialkot Sample Masters`}
        description={(product as any).seoDescription ?? product.shortDescription ?? ""}
        keywords={(product as any).seoKeywords ?? ""}
        ogType="product"
        ogImage={allImages[0]?.imageUrl}
        product={{
          brand: "Sialkot Sample Masters",
          availability: product.isActive !== false ? "in stock" : "out of stock",
          condition: "new",
          priceAmount: slabs.length > 0 ? slabs[slabs.length - 1]?.pricePerUnit : (product.samplePrice || "0.00"),
          priceCurrency: "USD",
          retailerItemId: product.id.toString(),
          itemGroupId: product.category,
        }}
      />

      {/* JSON-LD Product schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.title,
          "description": product.shortDescription,
          "image": allImages.map(i => i.imageUrl),
          "brand": { "@type": "Brand", "name": "Sialkot Sample Masters" },
          "manufacturer": {
            "@type": "Organization",
            "name": "Sialkot Sample Masters",
            "address": { "@type": "PostalAddress", "addressCountry": "PK", "addressLocality": "Sialkot" },
          },
          "category": product.category,
          "offers": slabs.length > 0 ? {
            "@type": "AggregateOffer",
            "lowPrice": Math.min(...slabs.map(s => parseFloat(s.pricePerUnit))).toFixed(2),
            "highPrice": Math.max(...slabs.map(s => parseFloat(s.pricePerUnit))).toFixed(2),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
          } : undefined,
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sialkotsamplementasters.com" },
              { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://sialkotsamplementasters.com/shop" },
              { "@type": "ListItem", "position": 3, "name": product.title },
            ],
          },
        })
      }} />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary/30">
          <div className="container py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
              <span>/</span>
              <Link href={`/shop?category=${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
              <span>/</span>
              <span className="text-foreground truncate max-w-48">{product.title}</span>
            </nav>
          </div>
        </div>

        <div className="container py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── Left: Image Gallery ── */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main image with strict height constraint for elegant catalog feel */}
              <div className="bg-secondary/20 rounded-xl overflow-hidden flex items-center justify-center p-4">
                <img
                  src={activeImage?.imageUrl ?? ""}
                  alt={(activeImage as any)?.altText ?? product.title}
                  className="w-full h-auto max-h-[75vh] object-contain object-top"
                />
              </div>

              {/* Thumbnail strip - refined */}
              {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-24 w-20 shrink-0 rounded-md overflow-hidden transition-all duration-300 ${idx === activeImageIdx ? "ring-1 ring-foreground opacity-100" : "opacity-50 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={img.imageUrl}
                        alt={(img as any).altText ?? `Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges - refined */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-border mt-10">
                {[
                  { icon: Shield, text: "ISO 9001 Certified Quality" },
                  { icon: Package, text: "Low MOQ from 20 pcs" },
                  { icon: Truck, text: "Ships Worldwide" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground/80">
                    <Icon className="w-3 h-3 text-foreground/50 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Product Info ── */}
            <div className="lg:col-span-4 lg:col-start-9 space-y-8 lg:sticky lg:top-32 lg:self-start">
              {/* Category + title */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.category}</span>
                </div>
                <h1 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-foreground leading-[1.1]">
                  {product.title}
                </h1>
                {product.material && (
                  <p className="text-muted-foreground text-sm mt-4 font-light leading-relaxed">{product.material}</p>
                )}
              </div>

              {/* Sample price */}
              {product.samplePrice && (
                <div className="flex items-baseline gap-2 pt-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Sample</span>
                  <span className="font-light text-2xl tracking-tight text-foreground">${parseFloat(product.samplePrice).toFixed(2)}</span>
                </div>
              )}

              {/* Slab pricing */}
              {slabs.length > 0 && (
                <SlabPricingTable slabs={slabs} quantity={quantity} />
              )}

              {/* Size selector */}
              {availableSizes.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Select Size</span>
                    {sizeChart && (
                      <button
                        onClick={() => setSizeChartOpen(true)}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity underline underline-offset-4"
                      >
                        Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-3 py-2 text-xs uppercase tracking-widest transition-all ${selectedSize === size
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground border border-border hover:border-foreground"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color selector */}
              {availableColors.length > 0 && (
                <div className="pt-6">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">Select Color</span>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs uppercase tracking-widest transition-all ${selectedColor === color
                          ? "bg-foreground text-background"
                          : "bg-transparent text-foreground border border-border hover:border-foreground"
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity input */}
              <div className="pt-6">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">Quantity</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(q => Math.max((slabs[0]?.minQty ?? 1), q - 10))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >−</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-10 text-center bg-transparent text-foreground border-x border-border text-xs focus:outline-none"
                      min={slabs[0]?.minQty ?? 1}
                    />
                    <button
                      onClick={() => setQuantity(q => q + 10)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >+</button>
                  </div>
                  {slabs[0] && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 bg-secondary/50">Min {slabs[0].minQty}</span>
                  )}
                </div>
              </div>

              {/* Price summary */}
              {unitPrice > 0 && (
                <div className="pt-8 pb-4">
                  <div className="flex items-end justify-between border-b border-border pb-4 mb-4">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
                    <div className="text-right">
                      <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">${unitPrice.toFixed(2)} / pc</div>
                      <div className="text-3xl font-light tracking-tight text-foreground">${lineTotal.toFixed(2)}</div>
                    </div>
                  </div>
                  {product.freeShipping && (
                    <div className="text-[10px] uppercase tracking-widest text-green-600/80">
                      Complimentary Shipping Expected
                    </div>
                  )}
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background text-xs uppercase tracking-widest py-6 transition-all"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 text-xs uppercase tracking-widest py-6"
                >
                  Purchase Now
                </Button>
              </div>

              {/* 3D Customizer CTA */}
              <div className="pt-4">
                <Link href="/customize">
                  <Button
                    variant="outline"
                    className="w-full rounded-none border border-border text-muted-foreground hover:border-foreground hover:text-foreground text-[10px] uppercase tracking-widest py-5 group transition-all"
                  >
                    Open 3D Studio
                    <span className="ml-2 w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                  </Button>
                </Link>
              </div>

              {/* Request quote link */}
              <p className="text-center pt-6">
                <Link href="/rfq" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                  Request Custom Manufacturing Quote
                </Link>
              </p>

              {/* Description */}
              {product.description && (
                <div className="pt-12 mt-12 border-t border-border">
                  <h3 className="text-xs uppercase tracking-widest text-foreground font-medium mb-6">Details</h3>
                  <div className="text-muted-foreground/80 font-light text-sm leading-8 whitespace-pre-line tracking-wide">
                    {product.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* High-End Manufacturing Story Section */}
        {(product as any).manufacturingStory && (
          <div className="mt-20 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-zinc-950 text-white min-h-[500px]">
            <div className="container mx-auto px-4 py-24 md:py-32">
              <div className="flex flex-col items-center mb-16 text-center">
                <span className="text-gold font-condensed tracking-[0.3em] text-xs uppercase mb-4 block">Sialkot Sample Masters</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight font-light text-zinc-100">
                  Technical Specifications
                </h2>
                <div className="w-12 h-0.5 bg-gold mt-8"></div>
              </div>

              <div className={`grid gap-16 lg:gap-24 items-start ${(product as any).manufacturingInfographic ? 'lg:grid-cols-12' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
                {/* Text Section */}
                <div className={`${(product as any).manufacturingInfographic ? 'lg:col-span-5 lg:order-last' : ''} space-y-6 pt-4`}>
                  <div className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed whitespace-pre-line tracking-wide">
                    {(product as any).manufacturingStory}
                  </div>
                </div>

                {/* Infographic Section */}
                {(product as any).manufacturingInfographic && (
                  <div className="lg:col-span-7 relative group w-full">
                    {/* Subtle glow effect behind the image */}
                    <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <img
                      src={(product as any).manufacturingInfographic}
                      alt="Manufacturing Process Infographic"
                      className="w-full h-auto object-contain bg-white rounded-xl shadow-2xl relative z-10"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Size chart modal */}
        <SizeChartModal
          sizeChart={sizeChart}
          open={sizeChartOpen}
          onClose={() => setSizeChartOpen(false)}
        />
      </main>
    </>
  );
}
