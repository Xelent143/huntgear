import { ArrowLeft, ArrowRight, Check, X, Clock, Calendar, Laptop, Pencil, Zap, TrendingUp, Cpu, FileJson } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

export default function BlogCADvsManual() {
    const comparisonData = [
        { feature: "Pattern Accuracy", manual: "Low (0.5mm - 2mm error)", cad: "Zero-Tolerance Precision", cadBetter: true },
        { feature: "Fabric Utilization", manual: "Manual Masking (Higher Waste)", cad: "AI Auto-Nested (5-12% Savings)", cadBetter: true },
        { feature: "Grading Speed", manual: "3-5 Hours per Size", cad: "Instant (Parameter Based)", cadBetter: true },
        { feature: "Digital Archiving", manual: "Physical Paper Storage", cad: "Cloud Based / Instant Retrieval", cadBetter: true },
        { feature: "Revision Time", manual: "Must Redraw Entirely", cad: "Non-Destructive Adjustments", cadBetter: true },
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="CAD Pattern Drafting vs. Manual: Why Exporters Should Switch to Digital Patterns"
                description="A technical comparison of CAD vs Manual pattern drafting for Sialkot apparel manufacturers. Learn how digital patterns save fabric, speed up production, and ensure export-quality grading."
                canonical="/blog/cad-vs-manual-pattern-drafting-guide"
                ogType="article"
                ogImage={IMAGES.servicePattern}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/svc-pattern-drafting.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <FadeIn>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-gold text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                Efficiency Insights
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 7 min read
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> March 12, 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8 max-w-4xl">
                            CAD vs Manual <span className="text-gradient-gold italic">Pattern Drafting:</span> The Switch for Exporters
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                            In the high-stakes world of apparel exports, a 1% saving in fabric can equal thousands of dollars in profit. Discover why manual drafting is costing you money.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* The Cost of Manual Section */}
            <section className="py-20 bg-card/50">
                <div className="container max-w-4xl">
                    <div className="prose-custom">
                        <h2 className="font-serif text-3xl font-bold mb-6">The "Hidden Tax" on Manual Patterns</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            For decades, Sialkot's master cutters have relied on brown paper and chalk. While legendary, this manual approach introduces human error that cumulative costs add up. A slight misalignment in a sleeve cap or a 2mm error in grading across 6 sizes can lead to massive rejection rates from international buyers.
                        </p>

                        <div className="blog-callout border-destructive/50 bg-destructive/5">
                            <strong>The Reality Check:</strong> Manual markers typically result in 15-20% fabric waste. CAD-based auto-nesting can reduce this to 8-12% almost instantly.
                        </div>
                    </div>
                </div>
            </section>

            {/* Speed Comparison Visual */}
            <section className="py-20">
                <div className="container max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Production Speed Benchmark</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <div className="space-y-12">
                        <div>
                            <div className="blog-progress-label">
                                <span>Manual Grading (6 Sizes)</span>
                                <span>~240 Minutes</span>
                            </div>
                            <div className="blog-progress-bg">
                                <div className="blog-progress-fill w-[100%] bg-muted-foreground/30" />
                            </div>
                        </div>

                        <div>
                            <div className="blog-progress-label">
                                <span className="text-gold font-bold">CAD Digital Grading (6 Sizes)</span>
                                <span className="text-gold font-bold">~15 Minutes</span>
                            </div>
                            <div className="blog-progress-bg">
                                <div className="blog-progress-fill w-[6.25%] animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-muted-foreground italic">
                        *Calculated based on standard hoodie pattern with 12 components.
                    </p>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="py-20 bg-muted/20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-12 px-4">
                        <h2 className="font-serif text-3xl font-bold mb-4">Head-to-Head Comparison</h2>
                        <p className="text-muted-foreground">Why the industry's shift to digital is now mandatory for survival.</p>
                    </div>

                    <div className="blog-table-container">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Manual (Analog)</th>
                                    <th>CAD (Digital)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="font-bold text-foreground">{row.feature}</td>
                                        <td>{row.manual}</td>
                                        <td className={row.cadBetter ? "text-gold font-bold flex items-center gap-2" : ""}>
                                            {row.cadBetter && <Check className="w-4 h-4" />} {row.cad}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* The Tech Stack Section */}
            <section className="py-20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Technology Stack</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AnimatedChild className="p-8 border border-border rounded-sm bg-card hover:border-gold/30 transition-all flex flex-col items-center text-center">
                            <div className="blog-feature-icon">
                                <Laptop className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-xl font-bold mb-3">Optitex & Gerber</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Industry-lead solutions for 2D drafting and high-speed nesting algorithms.
                            </p>
                        </AnimatedChild>

                        <AnimatedChild className="p-8 border border-border rounded-sm bg-card hover:border-gold/30 transition-all flex flex-col items-center text-center">
                            <div className="blog-feature-icon">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-xl font-bold mb-3">AI Nesting</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Smart computation of pattern placement to squeeze every centimeter out of your fabric.
                            </p>
                        </AnimatedChild>

                        <AnimatedChild className="p-8 border border-border rounded-sm bg-card hover:border-gold/30 transition-all flex flex-col items-center text-center">
                            <div className="blog-feature-icon">
                                <FileJson className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-xl font-bold mb-3">Multi-format Export</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Deliver patterns in DXF, ASTM, or AAMA formats compatible with global factory cutters.
                            </p>
                        </AnimatedChild>
                    </StaggerChildren>
                </div>
            </section>

            {/* ROI ROI Visual */}
            <section className="py-20 bg-background border-t border-border">
                <div className="container max-w-4xl">
                    <div className="bg-gold/5 border-2 border-gold/20 rounded-sm p-10">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="md:w-1/2">
                                <h3 className="font-serif font-bold text-3xl mb-6">The ROI Calculator</h3>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    If you are producing 1,000 tracksuits and saving just 0.15 meters per piece through digital nesting, you save **150 meters** of fabric.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Fabric Saved</span>
                                        <span className="font-bold text-gold">150 Meters</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span>Avg. Fabric Cost</span>
                                        <span className="font-bold text-gold">PKR 850/m</span>
                                    </div>
                                    <div className="border-t border-gold/20 pt-4 flex justify-between items-center">
                                        <span className="font-bold">Estimated Savings</span>
                                        <span className="font-serif text-2xl font-bold text-gold">PKR 127,500</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 flex justify-center">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-4 border-gold/30 flex items-center justify-center text-gold">
                                        <TrendingUp className="w-16 h-16" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-gold text-background px-3 py-1 text-xs font-bold rounded-full">
                                        +15% MARGIN
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-foreground">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-background mb-8">
                        Digitize Your Pattern Library Today
                    </h2>
                    <p className="text-background/60 text-lg mb-12 max-w-2xl mx-auto">
                        Stop wasting fabric and risking rejection. Our pattern masters can convert your existing paper patterns into high-precision digital assets.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-gold text-background hover:bg-gold-light px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Get a Digitizing Quote <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-background px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Request a Live Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
