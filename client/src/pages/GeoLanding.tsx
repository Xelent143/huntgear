import { useParams, Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import {
    Globe,
    Truck,
    ShieldCheck,
    Clock,
    ArrowRight,
    Factory,
    CheckCircle2,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";
import { IMAGES } from "@/lib/images";

const REGION_MAP: Record<string, {
    name: string;
    shipping: string;
    specialty: string;
}> = {
    usa: {
        name: "United States",
        shipping: "7-10 Days Express",
        specialty: "Streetwear & Tech Pack Precision"
    },
    uk: {
        name: "United Kingdom",
        shipping: "8-12 Days Express",
        specialty: "Premium Quality & Low MOQ"
    },
    europe: {
        name: "European Union",
        shipping: "10-14 Days Express",
        specialty: "High-End Garment Exports"
    },
    australia: {
        name: "Australia",
        shipping: "12-16 Days Express",
        specialty: "Eco-Friendly Manufacturing"
    },
    canada: {
        name: "Canada",
        shipping: "9-13 Days Express",
        specialty: "Heavyweight Fleece & Streetwear"
    }
};

export default function GeoLanding() {
    const { region } = useParams<{ region: string }>();
    const data = REGION_MAP[region?.toLowerCase() || "usa"] || REGION_MAP["usa"];

    return (
        <PageWrapper>
            <SEOHead
                title={`Premier Streetwear Manufacturer for ${data.name} Brands | Sialkot Sample Masters`}
                description={`Custom apparel manufacturing for ${data.name} based streetwear brands. High-quality production, low MOQ, and fast shipping to ${data.name}. Direct from Sialkot factory.`}
                keywords={`streetwear manufacturer ${data.name}, custom clothing supplier ${data.name}, wholesale apparel ${data.name}, garment factory Pakistan`}
                canonical={`/manufacturing/${region || "usa"}`}
            />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
                    <img
                        src={IMAGES.mfgHero}
                        alt="Manufacturing Facility"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
                        <Globe className="w-4 h-4 text-gold" />
                        <span className="text-gold text-xs font-bold uppercase tracking-widest">Global Manufacturing Hub</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        The Preferred Streetwear Manufacturer <br />
                        <span className="text-gold italic">for {data.name} Brands</span>
                    </h1>

                    <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-10 drop-shadow">
                        Scale your {data.name} base brand with premium quality manufacturing from Sialkot.
                        We specialize in {data.specialty} with door-to-door delivery.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-gold hover:bg-gold/90 text-black font-bold px-8 py-6 rounded-sm">
                                Get Your Quote <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/portfolio">
                            <Button variant="outline" className="border-zinc-700 text-white hover:bg-white/10 px-8 py-6 rounded-sm backdrop-blur-sm">
                                View Our Work
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Signals */}
            <section className="py-12 border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gold/10 rounded-sm">
                                <Truck className="w-6 h-6 text-gold shrink-0" />
                            </div>
                            <div>
                                <p className="text-foreground font-bold text-sm">Fast Shipping</p>
                                <p className="text-zinc-500 text-xs">{data.shipping}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gold/10 rounded-sm">
                                <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
                            </div>
                            <div>
                                <p className="text-foreground font-bold text-sm">Quality Guaranteed</p>
                                <p className="text-zinc-500 text-xs">ISO Certified Facility</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gold/10 rounded-sm">
                                <Clock className="w-6 h-6 text-gold shrink-0" />
                            </div>
                            <div>
                                <p className="text-foreground font-bold text-sm">Low MOQs</p>
                                <p className="text-zinc-500 text-xs">Starting from 50pcs</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gold/10 rounded-sm">
                                <Users className="w-6 h-6 text-gold shrink-0" />
                            </div>
                            <div>
                                <p className="text-foreground font-bold text-sm">B2B Support</p>
                                <p className="text-zinc-500 text-xs">Dedicated Account Mgr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                                Why {data.name} Brands Partner <br />
                                <span className="text-gold">With Sialkot Sample Masters</span>
                            </h2>
                            <div className="w-20 h-1 bg-gold" />
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                As a direct manufacturer based in the world's apparel hub, we eliminate the middlemen,
                                giving you better pricing and full control over your supply chain in {data.name}.
                            </p>

                            <ul className="space-y-4 pt-4">
                                {[
                                    "Tech Pack & Design Assistance",
                                    "Premium Fabric Sourcing (Custom GSM)",
                                    "Ethical & Sustainable Production",
                                    "Door-to-Door DDP Shipping Available",
                                    "Transparent Quality Control Reports"
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-zinc-300">
                                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                                        <span className="text-sm md:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <div className="rounded-sm overflow-hidden aspect-[4/5] border border-zinc-800 shadow-2xl">
                                    <img src={IMAGES.mfgProcess} alt="Garment Production Process" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-gold p-8 rounded-sm shadow-xl">
                                    <p className="text-black font-condensed font-bold text-5xl mb-1">98%</p>
                                    <p className="text-black/80 text-sm font-bold uppercase tracking-wider">Client Retention</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm shadow-xl">
                                    <p className="text-gold font-condensed font-bold text-5xl mb-1">5+</p>
                                    <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">Major {data.name} Clients</p>
                                </div>
                                <div className="rounded-sm overflow-hidden aspect-[4/5] border border-zinc-800 shadow-2xl">
                                    <img src={IMAGES.mfgDetail} alt="Quality Check Detail" className="w-full h-full object-cover transition-transform hover:scale-105 duration-700" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gold py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">
                        Ready to manufacture your next collection?
                    </h2>
                    <p className="text-black/70 text-lg mb-10">
                        Join the elite {data.name} brands sourcing directly from the source.
                        Response guaranteed within 24 hours.
                    </p>
                    <Link href="/rfq">
                        <Button size="lg" className="bg-black text-white hover:bg-zinc-800 px-12 py-8 text-xl font-bold uppercase tracking-tighter">
                            Start Your Tech Pack Inquiry
                        </Button>
                    </Link>
                </div>
            </section>
        </PageWrapper>
    );
}
