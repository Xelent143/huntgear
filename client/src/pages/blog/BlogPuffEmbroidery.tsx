import { ArrowLeft, ArrowRight, Check, Clock, Calendar, Box, Layers, Zap, Award, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

export default function BlogPuffEmbroidery() {
    const benefitCards = [
        {
            title: "Three-Dimensional Impact",
            desc: "Creates a bold, raised effect that flat embroidery cannot replicate, making your brand literally pop off the garment.",
            icon: <Box className="w-6 h-6" />
        },
        {
            title: "Luxury Brand Perception",
            desc: "The heavy, tactile finish is a staple of premium high-street and hypebeast brands, justify higher retail price points.",
            icon: <Award className="w-6 h-6" />
        },
        {
            title: "Extreme Durability",
            desc: "High-density satin stitching encapsulates the EVA foam, providing a finish that outlasts the garment itself.",
            icon: <Layers className="w-6 h-6" />
        },
        {
            title: "Memorable Texture",
            desc: "The 'expensive' feel of the 3D texture creates a physical connection between the consumer and the brand.",
            icon: <Zap className="w-6 h-6" />
        }
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="Impact of 3D Puff Embroidery on Technical Apparel Export Orders"
                description="Learn how 3D puff embroidery elevates brand perception and justifies premium pricing for streetwear export orders from Sialkot."
                canonical="/blog/3d-puff-embroidery-streetwear-impact"
                ogType="article"
                ogImage="/3d_puff_anatomy_infographic_1773278576854.png"
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <FadeIn>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-gold text-white text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                    Technical Elevation
                                </span>
                                <span className="text-muted-foreground text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> 6 min read
                                </span>
                                <span className="text-muted-foreground text-xs flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> March 12, 2026
                                </span>
                            </div>

                            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8">
                                The Power of <span className="text-gradient-gold italic">3D Puff</span> in Technical Apparel Export
                            </h1>

                            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                                In a crowded market, your logo needs to stand out—literally. Discover why the world's leading hypebeast brands are obsessed with 3D embroidery.
                            </p>

                            <div className="blog-callout border-gold/40">
                                <strong>Exporter Insight:</strong> Orders with 3D puff embroidery typically see a 25-40% higher retail perceived value compared to flat prints.
                            </div>
                        </FadeIn>

                        <FadeIn direction="left">
                            <div className="aspect-square rounded-sm overflow-hidden border border-gold/10 shadow-2xl">
                                <img
                                    src="/3d_puff_anatomy_infographic_1773278576854.png"
                                    alt="Anatomy of 3D Puff Embroidery"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-card/50 border-y border-border">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">Why Invest in 3D Puff?</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefitCards.map((benefit, idx) => (
                            <AnimatedChild key={idx} className="blog-stat-card text-center flex flex-col items-center">
                                <div className="blog-feature-icon mb-6">
                                    {benefit.icon}
                                </div>
                                <h4 className="font-serif text-xl font-bold mb-4">{benefit.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                            </AnimatedChild>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* The Value Advantage Diagram */}
            <section className="py-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border shadow-xl">
                                <img
                                    src="/embroidery_value_scorecard_1773278607449.png"
                                    alt="3D Puff Value Advantage Scorecard"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>

                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Beyond Aesthetics: The B2B Math</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                For Sialkot exporters, 3D puff isn't just a design choice; it's a strategic move to secure higher-tier clients. While the production cost per unit increases slightly, the ability to anchor your brand in the "Luxury Technical Apparel" category far outweighs the initial investment.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-6 bg-muted/30 rounded-sm">
                                    <div className="shrink-0"><Award className="w-5 h-5 text-gold" /></div>
                                    <div>
                                        <h5 className="font-bold text-sm mb-1 uppercase tracking-wider text-gold">Premium Branding</h5>
                                        <p className="text-muted-foreground text-xs leading-relaxed">Instantly separates your export samples from generic 'budget' apparel competitors.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-6 bg-muted/30 rounded-sm">
                                    <div className="shrink-0"><Layers className="w-5 h-5 text-gold" /></div>
                                    <div>
                                        <h5 className="font-bold text-sm mb-1 uppercase tracking-wider text-gold">Texture Contrast</h5>
                                        <p className="text-muted-foreground text-xs leading-relaxed">Works perfectly alongside screen printing or sublimation to create a multi-layer premium look.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Standards Section */}
            <section className="py-24 bg-foreground text-background">
                <div className="container max-w-4xl text-center">
                    <div className="inline-block p-4 rounded-full bg-gold/10 text-gold mb-8">
                        <Info className="w-10 h-10" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8">Technical Standards for Export</h2>
                    <p className="text-background/70 text-lg mb-12">
                        To achieve export-quality 3D puff, we follow strict digitization protocols. This includes the use of premium 3mm EVA high-density foam and specialized Tajima or Barudan machine settings.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                        <div className="p-6 border border-background/20 rounded-sm">
                            <h6 className="text-gold font-bold text-xs uppercase mb-3 tracking-widest">Minimal Width</h6>
                            <p className="text-2xl font-serif font-bold">5.0mm</p>
                            <p className="text-[10px] text-background/50">To ensure foam coverage</p>
                        </div>
                        <div className="p-6 border border-background/20 rounded-sm">
                            <h6 className="text-gold font-bold text-xs uppercase mb-3 tracking-widest">Foam Density</h6>
                            <p className="text-2xl font-serif font-bold">Hard-EVA</p>
                            <p className="text-[10px] text-background/50">For sharp vertical walls</p>
                        </div>
                        <div className="p-6 border border-background/20 rounded-sm">
                            <h6 className="text-gold font-bold text-xs uppercase mb-3 tracking-widest">Stitch Count</h6>
                            <p className="text-2xl font-serif font-bold">2.5X</p>
                            <p className="text-[10px] text-background/50">Compared to flat stitch</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-card border-t border-border">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
                        Elevate Your <span className="text-gold italic">Technical Apparel</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                        Ready to add that luxury three-dimensional touch to your next production run? Our embroidery masters are ready to digitize your vision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-gold text-background hover:bg-gold-dark px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Inquire About Embroidery <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-border text-foreground hover:bg-muted px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Request Swatch Samples
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
