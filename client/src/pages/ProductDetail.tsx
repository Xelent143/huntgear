import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { IMAGES } from "@/lib/images";
import {
  ZoomIn, ShoppingCart, Zap, Ruler, Package, Truck,
  Shield, Star, CheckCircle, Clock, Factory, Award, Check, MapPin, ChevronDown
} from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

// ─── Zoomable Image Component ────────────────────────────────────────────────
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
      className="relative aspect-auto min-h-[500px] w-full overflow-hidden bg-white cursor-zoom-in select-none"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-100 mix-blend-multiply"
        style={zoomed ? {
          transform: "scale(2.2)",
          transformOrigin: `${position.x}% ${position.y}%`,
        } : {}}
        draggable={false}
      />
      {!zoomed && (
        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur border border-border text-foreground text-[10px] uppercase tracking-widest px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
          <ZoomIn className="w-3.5 h-3.5" /> Hover to Zoom
        </div>
      )}
    </div>
  );
}

// ─── Alibaba Style Slab Pricing Table ────────────────────────────────────────
function AlibabaPricingTable({ slabs, formatCurrency }: { slabs: any[], formatCurrency: (v: string | number) => string }) {
  if (!slabs || slabs.length === 0) return null;

  return (
    <div className="flex bg-secondary/20 rounded border border-border overflow-hidden mb-6 divide-x divide-border">
      {slabs.slice(0, 3).map((slab, i) => {
        const qtyLabel = slab.maxQty ? `${slab.minQty} - ${slab.maxQty}` : `≥${slab.minQty}`;
        return (
          <div key={i} className="flex-1 py-3 px-2 text-center hover:bg-secondary/40 transition-colors">
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {formatCurrency(slab.pricePerUnit)}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 whitespace-nowrap">
              {qtyLabel} {slab.label || "Pieces"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Size Chart Modal ────────────────────────────────────────────────────────
function SizeChartModal({ sizeChart, open, onClose }: {
  sizeChart: any;
  open: boolean;
  onClose: () => void;
}) {
  if (!sizeChart) return null;
  let rows: Record<string, string>[] = [];
  try { rows = JSON.parse(sizeChart.chartData); } catch { rows = []; }
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-background border-border p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-border bg-secondary/30">
          <DialogTitle className="font-serif text-2xl text-foreground flex items-center gap-2">
            <Ruler className="w-5 h-5 text-gold" /> Comprehensive Tech Pack Size Guide
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            All measurements in <strong>{sizeChart.unit}</strong>. {sizeChart.notes && `Note: ${sizeChart.notes}`}
          </p>
        </DialogHeader>
        <div className="overflow-x-auto p-6">
          <table className="w-full text-sm text-left border border-border">
            <thead className="bg-secondary/50 text-foreground border-b border-border">
              <tr>
                {columns.map(col => (
                  <th key={col} className="px-4 py-3 font-semibold text-xs tracking-wider uppercase whitespace-nowrap border-r border-border last:border-0">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-secondary/10 transition-colors">
                  {columns.map(col => (
                    <td key={col} className={`px-4 py-3 whitespace-nowrap border-r border-border last:border-0 ${col.toLowerCase() === "size" ? "font-bold text-foreground bg-secondary/20" : "text-muted-foreground"}`}>
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  const { addItem } = useCartStore();

  const { data: dbProduct, isLoading } = trpc.product.bySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: !!slug }
  );

  const product = dbProduct ?? DEMO_PRODUCTS.find(p => p.slug === slug) ?? null;

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [slug]);

  const availableSizes: string[] = (() => {
    try {
      return JSON.parse(product?.availableSizes ?? "[]");
    } catch {
      return [];
    }
  })();

  const availableColors: string[] = (() => {
    try {
      return JSON.parse(product?.availableColors ?? "[]");
    } catch {
      return [];
    }
  })();

  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) setSelectedSize(availableSizes[0]);
    if (availableColors.length > 0 && !selectedColor) setSelectedColor(availableColors[0]);
  }, [availableSizes.length, availableColors.length, selectedSize, selectedColor]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f8fa] dark:bg-background pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4"><div className="h-[600px] bg-secondary/50 animate-pulse rounded" /></div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h2 className="font-serif text-2xl text-foreground mb-4">Product Not Found</h2>
          <Link href="/shop"><Button variant="outline">Back to Catalog</Button></Link>
        </div>
      </main>
    );
  }

  const images = product?.images ?? [];
  const slabs = product?.slabs ?? [];
  const sizeChart = (product as any)?.sizeChart ?? null;

  const allImages: any[] = [];
  if (product?.mainImage) allImages.push({ id: "main", imageUrl: product.mainImage, altText: product.title, sortOrder: -1 });
  if (images && images.length > 0) allImages.push(...images.filter((img: any) => img.imageUrl && img.imageUrl.trim() !== ""));
  if (allImages.length === 0) allImages.push({ id: 0, imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=90", altText: product?.title ?? "", sortOrder: 0 });

  const activeImage = allImages[activeImageIdx] ?? allImages[0];
  const formatCurrency = (val: string | number) => `$${Number(val).toFixed(2)}`;

  const activeSlab = slabs.find(s => quantity >= s.minQty && (s.maxQty === null || quantity <= (s.maxQty ?? Infinity))) ?? slabs[slabs.length - 1];
  const unitPrice = activeSlab ? parseFloat(activeSlab.pricePerUnit) : (product.samplePrice ? parseFloat(product.samplePrice) : 0);
  const lineTotal = unitPrice * quantity;

  const handleAddToCart = () => {
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
    toast.success("Added to Order requirements", { description: `${quantity} pcs × ${product.title}` });
  };

  const handleStartOrder = () => {
    handleAddToCart();
    window.location.href = "/rfq"; // B2B typically goes to RFQ/Checkout
  };

  return (
    <>
      <SEOHead
        title={`${product.title} | Wholesale Manufacturer Sialkot`}
        description={product.shortDescription ?? `High-quality ${product.title} manufactured in Sialkot, Pakistan.`}
        keywords={`wholesale ${product.category}, custom ${product.title}, garment manufacturer sialkot, b2b clothing supplier`}
        ogType="product"
        ogImage={activeImage.imageUrl}
      />

      {/* Structured Data for Product & Manufacturer */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.title,
          "description": product.shortDescription,
          "image": allImages.map(i => i.imageUrl),
          "sku": `SSM-${product.id}`,
          "brand": { "@type": "Brand", "name": "Sialkot Sample Masters OEM/ODM" },
          "manufacturer": {
            "@type": "Organization",
            "name": "Sialkot Sample Masters",
            "address": { "@type": "PostalAddress", "addressCountry": "PK", "addressLocality": "Sialkot" }
          },
          "offers": slabs.length > 0 ? {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": Math.min(...slabs.map(s => parseFloat(s.pricePerUnit))).toFixed(2),
            "highPrice": Math.max(...slabs.map(s => parseFloat(s.pricePerUnit))).toFixed(2),
            "offerCount": slabs.length,
            "availability": "https://schema.org/InStock"
          } : undefined
        })
      }} />

      <main className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        {/* Top Breadcrumb Nav */}
        <div className="bg-white dark:bg-card border-b border-border text-xs py-3 px-4 sm:px-8">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>&gt;</span>
            <Link href="/shop" className="hover:text-foreground">Apparel Manufacturing</Link>
            <span>&gt;</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">{product.category}</Link>
            <span>&gt;</span>
            <span className="text-foreground font-medium truncate">{product.title}</span>
          </div>
        </div>

        {/* ─── Above the Fold: 3-Column B2B Layout ─── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* COLUMN 1: Image Gallery (Left, Span 4) */}
            <div className="lg:col-span-4 bg-white dark:bg-card p-4 rounded-md shadow-sm border border-border sticky top-24">
              <ZoomableImage src={activeImage.imageUrl} alt={activeImage.altText || product.title} />

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-20 shrink-0 rounded overflow-hidden border-2 transition-all ${idx === activeImageIdx ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                    >
                      <img src={img.imageUrl} alt="thumbnail" className="w-full h-full object-cover bg-secondary/50" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* COLUMN 2: Product Info & Pricing (Center, Span 5) */}
            <div className="lg:col-span-5 bg-transparent lg:px-2 space-y-6">
              {/* Header Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[28px] font-bold text-foreground leading-tight mb-3">
                  {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                  <div className="flex items-center text-[#ff9900]">
                    {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                    <span className="text-foreground ml-2 font-medium">4.9/5</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">78 Reviews</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-muted-foreground">1,200+ Orders</span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {product.shortDescription || product.material}
                </p>

                <div className="flex gap-2 mb-6">
                  <span className="inline-flex items-center gap-1 bg-[#fff5eb] text-[#ff9900] dark:bg-[#ff9900]/10 dark:text-[#ff9900] px-2 py-1 text-xs font-semibold rounded-sm">
                    <Shield className="w-3 h-3" /> Trade Assurance
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[#f0f8ff] text-[#0066cc] dark:bg-[#0066cc]/10 dark:text-[#0066cc] px-2 py-1 text-xs font-semibold rounded-sm">
                    <CheckCircle className="w-3 h-3" /> Verified Factory
                  </span>
                </div>
              </div>

              {/* Alibaba Style Tiered Pricing */}
              {slabs.length > 0 && <AlibabaPricingTable slabs={slabs} formatCurrency={formatCurrency} />}

              {/* Quick Specs List */}
              <div className="bg-white dark:bg-card p-5 rounded-md border border-border shadow-sm text-sm space-y-3">
                <div className="grid grid-cols-3 gap-2 border-b border-border pb-3">
                  <span className="text-muted-foreground">Material:</span>
                  <span className="col-span-2 text-foreground font-medium">{product.material || "Custom Export Quality Blend"}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 border-b border-border pb-3">
                  <span className="text-muted-foreground">Min. Order:</span>
                  <span className="col-span-2 text-foreground font-medium">{slabs[0]?.minQty || 50} Pieces</span>
                </div>
                <div className="grid grid-cols-3 gap-2 border-b border-border pb-3">
                  <span className="text-muted-foreground">Lead Time:</span>
                  <span className="col-span-2 text-foreground font-medium">7 Days (Sample) | 21 Days (Bulk)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-muted-foreground">Customization:</span>
                  <span className="col-span-2 text-foreground font-medium">OEM/ODM, Custom Logo, Custom Tags</span>
                </div>
              </div>
            </div>

            {/* COLUMN 3: Floating Buy Box & Supplier Info (Right, Span 3) */}
            <div className="lg:col-span-3 space-y-4">

              {/* Action Box */}
              <div className="bg-white dark:bg-card border border-border rounded-md p-5 shadow-lg sticky top-24">
                <h3 className="font-bold text-foreground mb-4 pb-2 border-b border-border">Order Requirements</h3>

                {/* Size Selection */}
                {availableSizes.length > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-foreground">Size:</span>
                      {sizeChart && (
                        <button onClick={() => setSizeChartOpen(true)} className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline">
                          View Size Guide
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {availableSizes.map(size => (
                        <button key={size} onClick={() => setSelectedSize(size)}
                          className={`min-w-[40px] px-2 py-1.5 text-xs text-center border rounded-sm transition-all ${selectedSize === size ? "border-gold bg-gold/5 text-foreground font-bold" : "border-border text-muted-foreground hover:border-foreground"
                            }`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {availableColors.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-foreground block mb-2">Color Setup:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {availableColors.map(color => (
                        <button key={color} onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs border rounded-sm transition-all ${selectedColor === color ? "border-gold bg-gold/5 text-foreground font-bold" : "border-border text-muted-foreground hover:border-foreground"
                            }`}>
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Input */}
                <div className="mb-6">
                  <span className="text-xs font-semibold text-foreground block mb-2">Quantity (Pieces):</span>
                  <div className="flex items-center border border-border rounded-sm w-full">
                    <button onClick={() => setQuantity(q => Math.max((slabs[0]?.minQty ?? 1), q - 10))} className="w-10 h-10 flex items-center justify-center bg-secondary/50 hover:bg-secondary text-foreground text-lg">−</button>
                    <input type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="flex-1 h-10 text-center bg-transparent border-x border-border text-sm font-medium focus:outline-none" min={slabs[0]?.minQty ?? 1} />
                    <button onClick={() => setQuantity(q => q + 10)} className="w-10 h-10 flex items-center justify-center bg-secondary/50 hover:bg-secondary text-foreground text-lg">+</button>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-secondary/30 p-3 rounded-sm mb-6 border border-border/50">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-muted-foreground">Unit Price:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-border/50">
                    <span className="text-foreground font-bold">Subtotal:</span>
                    <span className="font-bold text-xl text-[#e63946] dark:text-[#f25c69]">{formatCurrency(lineTotal)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  <Button onClick={handleStartOrder} className="w-full bg-[#ff6a00] hover:bg-[#e65c00] text-white font-bold rounded-full py-6">
                    Start Order
                  </Button>
                  <Button onClick={handleAddToCart} variant="outline" className="w-full border-[#ff6a00] text-[#ff6a00] hover:bg-[#ff6a00]/10 font-bold rounded-full py-6">
                    Add to Inquiry Cart
                  </Button>

                  <div className="text-center mt-2">
                    <span className="text-[10px] text-muted-foreground flex justify-center items-center gap-1">
                      <Lock className="w-3 h-3" /> Safe & Secure Payments
                    </span>
                  </div>
                </div>
              </div>

              {/* Supplier Identity Card (Alibaba Style) */}
              <div className="bg-white dark:bg-card border border-border rounded-md p-5 shadow-sm">
                <div className="flex items-start gap-4 mb-4 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center overflow-hidden border border-border">
                    <img src={IMAGES.logoGold} alt="SSM Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground leading-tight">Sialkot Sample Masters<br />Manufacturing Factory</h4>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /> Punjab, Pakistan
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs mb-5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Factory Type</span>
                    <span className="font-medium text-foreground text-right w-1/2">OEM / ODM Manufacturer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Years in Business</span>
                    <span className="font-medium text-foreground flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-gold" /> 15+ Years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certifications</span>
                    <span className="font-medium text-foreground">ISO 9001, WRAP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="font-medium text-green-600 dark:text-green-400">98.5% (&lt; 4h)</span>
                  </div>
                </div>

                <Link href="/contact">
                  <Button variant="outline" className="w-full text-xs font-semibold">Contact Supplier</Button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ─── Below the Fold: Deep Scroll Content ─── */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
          <div className="bg-white dark:bg-card border border-border rounded-md shadow-sm overflow-hidden">

            {/* Sticky Tab Menu */}
            <div className="flex overflow-x-auto border-b border-border bg-secondary/20 sticky top-0 z-10 scrollbar-hide">
              {['Product Details', 'Technical Specifications', 'Manufacturing & Factory'].map((tab, i) => (
                <button key={tab} className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${i === 0 ? "text-gold border-b-2 border-gold bg-background" : "text-muted-foreground hover:text-foreground"}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-10 space-y-16">

              {/* DESCRIPTION SECTION */}
              {product.description && (
                <section>
                  <h2 className="text-xl font-bold font-serif text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gold rounded-full"></span> Product Overview
                  </h2>
                  <div className="text-muted-foreground text-sm leading-8 whitespace-pre-line max-w-4xl">
                    {product.description}
                  </div>
                </section>
              )}

              {/* TECHNICAL SPECIFICATIONS TAB (Tabular) */}
              <section>
                <h2 className="text-xl font-bold font-serif text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gold rounded-full"></span> Technical Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 border-t border-l border-border rounded overflow-hidden text-sm">
                  {[
                    { label: "Product Name", value: product.title },
                    { label: "Material Composition", value: product.material || "Refer to care label" },
                    { label: "Place of Origin", value: "Sialkot, Punjab, Pakistan" },
                    { label: "Brand Name", value: "OEM / Custom Brand" },
                    { label: "Feature", value: "Breathable, Sustainable, Anti-Shrink" },
                    { label: "Fabric Weight", value: "Custom GSM as per requirement" },
                    { label: "Technics", value: "Yarn Dyed / Cut & Sew / Sublimation" },
                    { label: "Design", value: "Blank or fully customized via tech pack" },
                    { label: "Season", value: "All-Season Capability" },
                    { label: "Minimum Order", value: `${slabs[0]?.minQty || 50} Pieces` },
                    { label: "Packaging Details", value: "1pc/polybag, 50pcs/carton (Custom pkg available)" },
                    { label: "Sample Time", value: "7-10 working days" },
                  ].map((row, i) => (
                    <div key={i} className="flex border-b border-r border-border">
                      <div className="w-1/3 bg-secondary/40 p-3 font-semibold text-muted-foreground">{row.label}</div>
                      <div className="w-2/3 p-3 text-foreground">{row.value}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* MANUFACTURING STORY & INFOGRAPHIC (Redesigned) */}
              {((product as any).manufacturingStory || (product as any).manufacturingInfographic) && (
                <section>
                  <h2 className="text-xl font-bold font-serif text-foreground mb-8 flex items-center gap-2">
                    <span className="w-1 h-6 bg-gold rounded-full"></span> Manufacturing Process & Capability
                  </h2>

                  <div className="bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
                    {/* B2B Infographic Banner Style */}
                    {(product as any).manufacturingInfographic && (
                      <div className="relative w-full border-b border-zinc-800">
                        <img
                          src={(product as any).manufacturingInfographic}
                          alt="Manufacturing Flow"
                          className="w-full h-auto object-cover max-h-[500px]"
                        />
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm border border-gold/30">
                          Sialkot Factory Floor
                        </div>
                      </div>
                    )}

                    {/* Story Text Box */}
                    {(product as any).manufacturingStory && (
                      <div className="p-8 md:p-12 mt-0">
                        <div className="max-w-4xl mx-auto">
                          <h3 className="text-2xl font-serif text-white mb-6">Built by Masters of the Craft</h3>
                          <p className="text-zinc-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {(product as any).manufacturingStory}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Visual Factory Process Grid replacing old text */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-zinc-800 mt-0">
                      {[
                        { title: "Pattern engineering", img: IMAGES.servicePattern },
                        { title: "Cutting & Printing", img: IMAGES.servicePrinting },
                        { title: "Industrial Sewing", img: IMAGES.serviceStitching },
                        { title: "Quality Control", img: IMAGES.serviceQC }
                      ].map((step, i) => (
                        <div key={i} className="relative aspect-square group bg-zinc-900 overflow-hidden">
                          <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                            <div className="text-gold font-condensed font-bold text-xl leading-none">0{i + 1}</div>
                            <div className="text-white text-xs font-semibold uppercase tracking-wider mt-1">{step.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* LOGISTICS & COMPANY TRUST SIGNALS */}
              <section className="bg-secondary/20 rounded-xl p-8 border border-border mt-12">
                <h3 className="text-lg font-bold text-foreground mb-6 uppercase tracking-wider">Packaging & Global Delivery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex gap-4">
                    <Package className="w-8 h-8 text-muted-foreground shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">Custom Packaging</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Poly bags, frosted zipper bags, or custom branded boxes. Insert cards and silica gels included to prevent moisture damage during transit.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Truck className="w-8 h-8 text-muted-foreground shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">Air & Sea Freight</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Partnered with DHL, FedEx, and major sea lines. DDP (Delivered Duty Paid) options available for US and EU markets to handle all customs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Factory className="w-8 h-8 text-muted-foreground shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-1">Factory Direct</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">No middlemen. Manufactured in our Sialkot facility and shipped directly to your warehouse. Full supply chain transparency.</p>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Size chart modal */}
        <SizeChartModal sizeChart={sizeChart} open={sizeChartOpen} onClose={() => setSizeChartOpen(false)} />
      </main>
    </>
  );
}

// Icon helper to avoid missing import errors
function Lock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
