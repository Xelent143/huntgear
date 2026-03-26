import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { IMAGES } from "@/lib/images";
import { trpc } from "@/lib/trpc";
import {
    Loader2, Shield, ChevronLeft, ChevronRight, ArrowRight,
    Droplets, Thermometer, Wind, Scale
} from "lucide-react";

interface Product {
    id: string;
    name: string;
    category: string;
    image: string;
    specs: {
        label: string;
        value: string;
        icon: any;
    }[];
    price?: string;
    tag?: string;
}

// We will now use dynamic data, so featuredProducts is moved inside the component

export default function FeaturedProductCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Fetch live products
    const { data: dbProducts, isLoading } = trpc.product.list.useQuery();

    // Map database products to the carousel format
    const products = dbProducts?.filter(p => p.isFeatured).map(p => ({
        id: p.id.toString(),
        slug: p.slug,
        name: p.title || "Elite Gear",
        category: p.category || "General",
        image: p.mainImage || IMAGES.catHunting,
        tag: "Custom Built",
        specs: [
            { label: "Material", value: p.material || "High Performance", icon: Shield },
            { label: "Weight", value: p.weight || "TBD", icon: Scale },
            { label: "Protection", value: "Professional Grade", icon: Droplets }
        ]
    })) || [];

    // Fallback if no featured products are found in DB
    const displayProducts = products.length > 0 ? products : [];

    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const scrollAmount = direction === "left" ? -400 : 400;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-b border-white/[0.05] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-[1px] bg-[#ff6b00]" />
                            <span className="text-[#ff6b00] text-[10px] font-condensed font-bold uppercase tracking-[0.3em]">Precision Engineering</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tighter">
                            FEATURED <span className="text-white/40 italic">GEAR.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`p-3 rounded-full border border-white/10 transition-all ${canScrollLeft ? "hover:bg-white/5 text-white" : "opacity-30 text-white/40 cursor-not-allowed"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`p-3 rounded-full border border-white/10 transition-all ${canScrollRight ? "hover:bg-white/5 text-white" : "opacity-30 text-white/40 cursor-not-allowed"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory min-h-[400px]"
                >
                    {isLoading ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
                            <Loader2 className="w-8 h-8 text-[#ff6b00] animate-spin" />
                            <p className="text-white/40 font-condensed tracking-widest uppercase text-xs">Accessing Arsenal...</p>
                        </div>
                    ) : displayProducts.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center py-20 bg-[#111111]/50 border border-white/5 rounded">
                            <p className="text-white/40 font-condensed tracking-widest uppercase text-xs">No Featured Gear Available</p>
                        </div>
                    ) : (
                        displayProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="min-w-[280px] md:min-w-[300px] group relative bg-[#111111] border border-white/[0.05] snap-start hover:border-[#ff6b00]/30 transition-all duration-500 overflow-hidden"
                            >
                                {/* Product Image */}
                                <div className="aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />

                                    {/* Product Tag */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-[#ff6b00] text-black text-[9px] font-condensed font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                                            {product.tag}
                                        </span>
                                    </div>

                                    {/* Technical Overlay (Bottom to Top) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Tech Specs Hover State */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        <div className="grid grid-cols-1 gap-4 mb-6">
                                            {product.specs.map((spec, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                        <spec.icon className="w-3.5 h-3.5 text-[#ff6b00]" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[9px] text-white/40 uppercase tracking-widest">{spec.label}</div>
                                                        <div className="text-xs text-white font-bold">{spec.value}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Link href={`/shop/${product.slug}`}>
                                            <button className="w-full py-4 bg-white text-black font-condensed font-bold uppercase tracking-wider text-xs hover:bg-[#ff6b00] hover:text-black transition-colors flex items-center justify-center gap-2">
                                                View Technical Data <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Product Info (Visible always) */}
                                <div className="p-6 border-t border-white/[0.05] bg-[#0d0d0d] group-hover:bg-[#111111] transition-colors">
                                    <div className="text-[10px] text-[#ff6b00] font-condensed font-bold uppercase tracking-[0.15em] mb-1">
                                        {product.category}
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#ff6b00] transition-colors leading-tight">
                                        {product.name}
                                    </h3>
                                </div>
                            </motion.div>
                        )))}

                    {/* See More Card */}
                    <div className="min-w-[280px] md:min-w-[300px] h-full flex flex-col items-center justify-center bg-[#0d0d0d] border border-dashed border-white/10 group hover:border-[#ff6b00]/30 transition-all">
                        <Link href="/shop">
                            <div className="flex flex-col items-center gap-4 cursor-pointer">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ff6b00] transition-colors">
                                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#ff6b00] transform transition-transform group-hover:translate-x-1" />
                                </div>
                                <span className="text-white/40 font-condensed font-bold uppercase tracking-widest text-[10px] group-hover:text-white transition-colors">
                                    Explore Full Arsenal
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
