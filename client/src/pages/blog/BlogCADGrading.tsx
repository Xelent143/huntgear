import { ArrowLeft, ArrowRight, Check, Clock, Calendar, Laptop, Maximize, Cpu, Globe, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

export default function BlogCADGrading() {
    const features = [
        {
            title: "Millimeter Precision",
            desc: "Unlike manual rulers, CAD grading eliminates human error, ensuring every size (S to 5XL) maintains identical fit proportions.",
            icon: <Maximize className="w-6 h-6" />
        },
        {
            title: "Global Compatibility",
            desc: "Instantly convert patterns between US, EU, and Asian size charts without redrafting the entire technical file.",
            icon: <Globe className="w-6 h-6" />
        },
        {
            title: "Material Efficiency",
            desc: "Precise digital markers can reduce fabric waste by 3-5%, potentially saving thousands of dollars on large export shipments.",
            icon: <Cpu className="w-6 h-6" />
        },
        {
            title: "Rapid Iteration",
            desc: "Adjust grading rules across an entire collection in seconds rather than hours of manual paper cutting.",
            icon: <Laptop className="w-6 h-6" />
        }
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="Accurate CAD Grading for International Sizing Charts | SSM Blog"
                description="Discover why digital CAD grading is critical for international apparel exports. Learn about precision, fabric efficiency, and global sizing compliance."
                canonical="/blog/cad-grading-international-sizing-importance"
                ogType="article"
                ogImage="/cad_grading_accuracy_comparison_1773426576624.png"
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <FadeIn>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-gold/10 text-gold text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm border border-gold/20">
                                Industry Standards
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 8 min read
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> March 13, 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8 max-w-4xl">
                            The Critical Role of <span className="text-gradient-gold italic">CAD Grading</span> in Global Exports
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mb-10">
                            In the high-stakes world of international apparel, a 1-centimeter error can lead to a rejected shipment. Learn how digital precision is replacing manual guesswork.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Accuracy Comparison Section */}
            <section className="py-20 bg-card/50">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">Precision: The Invisible Profit Maker</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                Manual grading relies on the physical accuracy of a pattern maker's hand. Even the most skilled artisan cannot match the 0.001mm precision of a modern CAD system. For exporters, this means consistency that survives the transition from a sample to mass production.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-widest">
                                    <Check className="w-4 h-4" /> ISO-Compliant Digital Files
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-widest">
                                    <Check className="w-4 h-4" /> Instant ASTM Standard Mapping
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-gold uppercase tracking-widest">
                                    <Check className="w-4 h-4" /> Seamless .DXF Export Capability
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <div className="aspect-video rounded-sm overflow-hidden border border-border shadow-2xl">
                                <img
                                    src="/cad_grading_accuracy_comparison_1773426576624.png"
                                    alt="Manual vs CAD Grading Accuracy Infographic"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24">
                <div className="container">
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <AnimatedChild key={idx} className="blog-feature-card text-center p-8 border border-border bg-card hover:border-gold/30 transition-all rounded-sm flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full bg-gold/5 text-gold flex items-center justify-center mb-6 border border-gold/10">
                                    {feature.icon}
                                </div>
                                <h4 className="font-serif text-xl font-bold mb-4">{feature.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                            </AnimatedChild>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* Strategy Section */}
            <section className="py-24 bg-foreground text-background overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 skew-x-12 transform translate-x-1/2" />
                <div className="container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="aspect-square rounded-sm overflow-hidden border border-gold/20 shadow-2xl">
                                <img
                                    src="/global_sizing_strategy_map_1773426593535.png"
                                    alt="Global Sizing Strategy Map"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <h2 className="font-serif text-4xl font-bold mb-8 text-gradient-gold">Navigating International Standards</h2>
                            <p className="text-background/70 leading-relaxed mb-8 text-lg">
                                Shipping to both Germany and the United States? The 'Large' in Berlin is not the same as the 'Large' in New York. CAD systems allow us to apply different grading rule tables to the same digital master pattern instantly.
                            </p>
                            <div className="space-y-6">
                                <div className="p-6 bg-background/5 border border-background/10 rounded-sm">
                                    <h5 className="font-bold text-gold uppercase tracking-widest text-xs mb-2">Regional Scaling</h5>
                                    <p className="text-sm">Automated adjustments for sleeve length, chest breadth, and torso height based on regional anthropometric data.</p>
                                </div>
                                <div className="p-6 bg-background/5 border border-background/10 rounded-sm">
                                    <h5 className="font-bold text-gold uppercase tracking-widest text-xs mb-2">Zero-Error Repetition</h5>
                                    <p className="text-sm">Once a size chart is perfected in CAD, every subsequent production run is identical to the millimeter.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-24 bg-background border-t border-border">
                <div className="container max-w-4xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-8">
                            <Info className="w-8 h-8" />
                        </div>
                        <h2 className="font-serif text-4xl font-bold mb-8 text-foreground">The Cost of Manual Mistakes</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-10 italic">
                            "In B2B apparel exports, a single size chart discrepancy doesn't just result in a return—it results in a lost partnership. Digital CAD grading is the insurance policy for your brand's international reputation."
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full text-left">
                            <div className="p-8 bg-destructive/5 border border-destructive/20 rounded-sm">
                                <h5 className="text-destructive font-bold uppercase tracking-widest text-xs mb-4">Manual Risks</h5>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>• Creeping measurement errors</li>
                                    <li>• Inconsistent seam allowances</li>
                                    <li>• High paper pattern storage costs</li>
                                    <li>• Slow revision turnaround</li>
                                </ul>
                            </div>
                            <div className="p-8 bg-gold/5 border border-gold/20 rounded-sm">
                                <h5 className="text-gold font-bold uppercase tracking-widest text-xs mb-4">CAD Advantages</h5>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>• Dynamic grading rule libraries</li>
                                    <li>• Precision marker making</li>
                                    <li>• Instant digital sharing</li>
                                    <li>• 100% reproducible accuracy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-background to-card border-t border-border">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
                        Ready for <span className="text-gradient-gold">Global Scaling?</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ensure your next export order fits perfectly in every market. Leverage our advanced CAD grading services for your technical apparel manufacturing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-gold text-background hover:bg-gold-dark px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm shadow-xl transition-all hover:-translate-y-1">
                                Start Tech-Pack Consultation <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-border text-foreground hover:bg-muted px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm transition-all hover:-translate-y-1">
                                Request Sample Sizes
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
