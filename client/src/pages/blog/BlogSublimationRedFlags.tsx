import { ArrowLeft, ArrowRight, AlertTriangle, Check, Clock, Calendar, Droplets, Zap, ShieldAlert, Palette, Search } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

export default function BlogSublimationRedFlags() {
    const redFlags = [
        {
            title: "Dull or Faded Colors",
            desc: "If your jerseys look 'washed out' compared to the 3D design, your vendor is likely using low-density inks or skipping the pre-heat process.",
            icon: <Palette className="w-6 h-6" />
        },
        {
            title: "Muddy Blacks & Color Shifting",
            desc: "Blacks that look brown or purple after 3 washes indicate cheap ink that can't handle performance sweat or high-temp cycles.",
            icon: <Droplets className="w-6 h-6" />
        },
        {
            title: "Ghosting & Blurry Edges",
            desc: "Fuzzy logos or 'double images' happen when the transfer paper moves. This is a sign of lack of tack-paper or proper equipment calibration.",
            icon: <Zap className="w-6 h-6" />
        },
        {
            title: "Visible Banding Lines",
            desc: "Horizontal lines across the print are caused by clogged printheads. A professional vendor never ships banding.",
            icon: <Search className="w-6 h-6" />
        },
        {
            title: "Fabric Grinning",
            desc: "When white fabric shows through as the garment stretches, it means the ink didn't penetrate the fibers deep enough.",
            icon: <AlertTriangle className="w-6 h-6" />
        }
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="5 Signs You Need to Change Your Current Sublimation Printing Vendor"
                description="Low vibrancy, muddy blacks, or peeling logos? Learn how to spot the red flags in your sublimation apparel production before it costs you an export contract."
                canonical="/blog/5-signs-change-sublimation-vendor"
                ogType="article"
                ogImage="/sublimation_red_flags_comparison_1773277691076.png"
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <FadeIn>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-destructive text-destructive-foreground text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                Quality Alert
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 7 min read
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> March 12, 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8 max-w-4xl">
                            5 Signs You Need to <span className="text-gradient-gold italic text-destructive">Change Your Vendor</span>
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                            Your reputation as an exporter depends on your print quality. Don't let a sub-standard vendor ruin your brand's international standing.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Comparison Visual Section */}
            <section className="py-20 bg-card/50">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">The Visual Truth: Quality vs Compromise</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                Cheap sublimation is easy to spot—but only if you know where to look. In the export world, these 'minor' defects lead to full shipment rejections. A premium vendor ensures that the ink becomes part of the fiber, not just a layer on top.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-widest">
                                    <Check className="w-4 h-4" /> Deep Fiber Saturation
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-widest">
                                    <Check className="w-4 h-4" /> Razor Sharp Logo Edges
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-widest">
                                    <Check className="w-4 h-4" /> Zero-Ghosting Technology
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="aspect-square rounded-sm overflow-hidden border border-border shadow-2xl">
                                <img
                                    src="/sublimation_red_flags_comparison_1773277691076.png"
                                    alt="Quality Comparison Infographic"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* The 5 Red Flags */}
            <section className="py-24">
                <div className="container max-w-5xl">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-4xl font-bold mb-4">The 5 "Critical" Red Flags</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {redFlags.map((flag, idx) => (
                            <AnimatedChild key={idx} className="p-8 border border-border bg-card hover:border-destructive/30 transition-all group rounded-sm flex flex-col items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6 group-hover:bg-destructive group-hover:text-white transition-colors">
                                    {flag.icon}
                                </div>
                                <h4 className="font-serif text-xl font-bold mb-4">{flag.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{flag.desc}</p>
                            </AnimatedChild>
                        ))}
                        <AnimatedChild className="p-8 border-2 border-dashed border-gold/20 bg-gold/5 rounded-sm flex flex-col items-center justify-center text-center">
                            <ShieldAlert className="w-12 h-12 text-gold mb-4" />
                            <h4 className="font-serif text-xl font-bold mb-2">Feeling Unsure?</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed mb-6">Receive a free technical audit of your current production samples.</p>
                            <Link href="/contact" className="text-gold font-bold text-xs underline uppercase tracking-widest">Book Audit</Link>
                        </AnimatedChild>
                    </StaggerChildren>
                </div>
            </section>

            {/* Scorecard Dashboard Section */}
            <section className="py-24 bg-foreground text-background">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-gold/20">
                                <img
                                    src="/sublimation_vendor_scorecard_1773277706132.png"
                                    alt="Sublimation Vendor Quality Scorecard"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <h2 className="font-serif text-4xl font-bold mb-8 text-gradient-gold">How Does Your Vendor Score?</h2>
                            <p className="text-background/70 leading-relaxed mb-8">
                                We use professional grading software and color spectrophotometers to ensure every batch hit 99% accuracy. If your current vendor doesn't have a formal QA scorecard, your export orders are at risk of inconsistent branding.
                            </p>
                            <div className="space-y-6">
                                <div className="p-6 bg-background/10 border border-background/20 rounded-sm">
                                    <h5 className="font-bold text-gold uppercase tracking-widest text-xs mb-2">Color Matching</h5>
                                    <p className="text-sm">Pantone TCX/TPG accuracy tracking for every batch.</p>
                                </div>
                                <div className="p-6 bg-background/10 border border-background/20 rounded-sm">
                                    <h5 className="font-bold text-gold uppercase tracking-widest text-xs mb-2">Wash Fastness</h5>
                                    <p className="text-sm">4.5+ Grade on the Greyscale for color change after 50 washes.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Final Advice Section */}
            <section className="py-24 bg-background border-t border-border">
                <div className="container max-w-4xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-8">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h2 className="font-serif text-4xl font-bold mb-8">The High Cost of Cheap Printing</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                            Switching vendors is a hassle, but it’s nowhere near as expensive as a rejected shipment of 5,000 jerseys. A reputable manufacturing partner in Sialkot should be transparent about their ink sources (e.g., Italian vs Local) and paper thickness.
                        </p>

                        <div className="blog-callout border-destructive bg-destructive/5 text-foreground italic">
                            "In B2B apparel, the most expensive vendor is the one who delivers a shipment your customer won't accept."
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-gold via-gold-dark to-gold">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-background mb-8">
                        Stop Settling for Second-Best
                    </h2>
                    <p className="text-background/90 text-lg mb-12 max-w-2xl mx-auto">
                        Experience what true Italian-ink sublimation looks like. Request a tech-pack audit and a free sample of our performance-grade printing today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-background text-foreground hover:bg-background/90 px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm shadow-xl">
                                Get a Printing Quote <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Request Samples
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
