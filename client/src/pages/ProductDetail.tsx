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
  Ruler, Package, Truck, Shield, Star, Check, Info, ChevronDown, Tag, Palette
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
      className="relative aspect-square overflow-hidden rounded-lg bg-secondary cursor-zoom-in select-none"
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

// ─── Slab Pricing Table ───────────────────────────────────────────────────────

function SlabPricingTable({ slabs, quantity }: {
  slabs: { id: number; minQty: number; maxQty: number | null; pricePerUnit: string; label?: string | null; sortOrder: number }[];
  quantity: number;
}) {
  const activeIdx = slabs.findIndex(s =>
    quantity >= s.minQty && (s.maxQty === null || quantity <= (s.maxQty ?? Infinity))
  );

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="bg-secondary px-4 py-2 flex items-center gap-2">
        <Tag className="w-4 h-4 text-gold" />
        <span className="font-condensed font-bold uppercase tracking-wider text-sm text-foreground">Slab Pricing (MOQ Tiers)</span>
      </div>
      <div className="divide-y divide-border">
        {slabs.map((slab, idx) => {
          const isActive = idx === activeIdx;
          const qtyLabel = slab.maxQty ? `${slab.minQty}–${slab.maxQty} pcs` : `${slab.minQty}+ pcs`;
          return (
            <div
              key={slab.id}
              className={`flex items-center justify-between px-4 py-3 transition-colors ${isActive ? "bg-gold/10 border-l-2 border-l-gold" : "hover:bg-secondary/50"
                }`}
            >
              <div className="flex items-center gap-3">
                {isActive && <Check className="w-4 h-4 text-gold shrink-0" />}
                {!isActive && <div className="w-4" />}
                <div>
                  <span className="font-condensed font-semibold text-sm text-foreground">{qtyLabel}</span>
                  {slab.label && (
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded font-condensed font-bold uppercase tracking-wider ${isActive ? "bg-gold text-black" : "bg-secondary text-muted-foreground"
                      }`}>{slab.label}</span>
                  )}
                </div>
              </div>
              <span className={`font-condensed font-bold text-lg ${isActive ? "text-gold" : "text-foreground"}`}>
                ${parseFloat(slab.pricePerUnit).toFixed(2)}<span className="text-xs font-normal text-muted-foreground">/pc</span>
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

  const allImages = images.length > 0
    ? images
    : [{ id: 0, imageUrl: product?.mainImage || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=90", altText: product?.title ?? "", sortOrder: 0 }];

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
              <Skeleton className="aspect-square w-full rounded-lg" />
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

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">

            {/* ── Left: Image Gallery ── */}
            <div className="space-y-4">
              {/* Main zoomable image */}
              <ZoomableImage
                src={activeImage?.imageUrl ?? ""}
                alt={(activeImage as any)?.altText ?? product.title}
              />

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`aspect-square rounded overflow-hidden border-2 transition-all ${idx === activeImageIdx ? "border-gold" : "border-border hover:border-gold/50"
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

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: Shield, text: "ISO 9001 Certified Quality" },
                  { icon: Package, text: "Low MOQ from 20 pcs" },
                  { icon: Truck, text: "Ships Worldwide" },
                  { icon: Star, text: "500+ Brands Served" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded px-3 py-2">
                    <Icon className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Product Info ── */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Category + title */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gold font-condensed text-sm font-bold uppercase tracking-widest">{product.category}</span>
                  {product.freeShipping && (
                    <span className="bg-green-600/20 text-green-400 text-xs font-condensed font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Free Shipping
                    </span>
                  )}
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {product.title}
                </h1>
                {product.material && (
                  <p className="text-muted-foreground text-sm mt-2">{product.material}</p>
                )}
              </div>

              {/* Sample price */}
              {product.samplePrice && (
                <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-border">
                  <Info className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Sample Price</span>
                    <span className="ml-2 font-condensed font-bold text-foreground">${parseFloat(product.samplePrice).toFixed(2)}</span>
                    <span className="text-xs text-muted-foreground ml-1">(includes shipping)</span>
                  </div>
                </div>
              )}

              {/* Slab pricing */}
              {slabs.length > 0 && (
                <SlabPricingTable slabs={slabs} quantity={quantity} />
              )}

              {/* Size selector */}
              {availableSizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-condensed font-bold uppercase tracking-wider text-sm text-foreground">
                      Size: <span className="text-gold">{selectedSize}</span>
                    </label>
                    {sizeChart && (
                      <button
                        onClick={() => setSizeChartOpen(true)}
                        className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors underline underline-offset-2"
                      >
                        <Ruler className="w-3.5 h-3.5" /> Size Guide
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded border font-condensed font-semibold text-sm transition-all ${selectedSize === size
                          ? "border-gold bg-gold text-black"
                          : "border-border text-muted-foreground hover:border-gold/60 hover:text-foreground"
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
                <div>
                  <label className="font-condensed font-bold uppercase tracking-wider text-sm text-foreground block mb-2">
                    Color: <span className="text-gold">{selectedColor || "Select"}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded border font-condensed text-sm transition-all ${selectedColor === color
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border text-muted-foreground hover:border-gold/60 hover:text-foreground"
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity input */}
              <div>
                <label className="font-condensed font-bold uppercase tracking-wider text-sm text-foreground block mb-2">
                  Quantity (pieces)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max((slabs[0]?.minQty ?? 1), q - 10))}
                      className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-bold transition-colors"
                    >−</button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center bg-background text-foreground py-2 border-x border-border text-sm font-condensed font-bold focus:outline-none"
                      min={slabs[0]?.minQty ?? 1}
                    />
                    <button
                      onClick={() => setQuantity(q => q + 10)}
                      className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-bold transition-colors"
                    >+</button>
                  </div>
                  {slabs[0] && (
                    <span className="text-xs text-muted-foreground">Min. {slabs[0].minQty} pcs</span>
                  )}
                </div>
              </div>

              {/* Price summary */}
              {unitPrice > 0 && (
                <div className="p-4 bg-secondary/50 rounded-lg border border-gold/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground text-sm">Unit Price</span>
                    <span className="font-condensed font-bold text-foreground">${unitPrice.toFixed(2)}/pc</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Order Total ({quantity} pcs)</span>
                    <span className="font-condensed font-bold text-xl text-gold">${lineTotal.toFixed(2)}</span>
                  </div>
                  {product.freeShipping && (
                    <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
                      <Truck className="w-3 h-3" /> Free shipping included
                    </div>
                  )}
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 border-gold text-gold hover:bg-gold hover:text-black font-condensed font-bold uppercase tracking-wider py-6 text-base transition-all"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gold text-black hover:bg-gold-light font-condensed font-bold uppercase tracking-wider py-6 text-base"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              {/* 3D Customizer CTA */}
              <Link href="/customize">
                <Button
                  variant="outline"
                  className="w-full border-primary/40 text-primary hover:bg-primary/10 hover:border-primary font-condensed font-bold uppercase tracking-wider py-5 text-sm gap-2 group transition-all"
                >
                  <Palette className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Customize This Product in 3D
                  <span className="ml-auto text-xs font-normal normal-case text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Live Designer</span>
                </Button>
              </Link>

              {/* Request quote link */}
              <p className="text-center text-sm text-muted-foreground">
                Need a custom quote?{" "}
                <Link href="/rfq" className="text-gold hover:text-gold-light underline underline-offset-2">
                  Submit an RFQ
                </Link>
              </p>

              {/* Description */}
              {product.description && (
                <div className="border-t border-border pt-6">
                  <h3 className="font-condensed font-bold uppercase tracking-wider text-sm text-foreground mb-3">
                    Product Description
                  </h3>
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

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
