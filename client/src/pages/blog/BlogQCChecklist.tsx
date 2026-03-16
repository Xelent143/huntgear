import { ArrowLeft, ArrowRight, Check, Clock, Calendar, ShieldCheck, Search, ClipboardCheck, Truck, AlertCircle, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

export default function BlogQCChecklist() {
    const qcStages = [
        {
            title: "Pre-Production Audit (PPA)",
            desc: "Checking fabric GSM, color matching (Lab dips), and trim durability before the first cut is made.",
            icon: <Search className="w-6 h-6" />
        },
        {
            title: "Inline Inspection (DPI)",
            desc: "Random sampling during the stitching phase to catch seam defects or sizing drift early in the run.",
            icon: <ClipboardCheck className="w-6 h-6" />
        },
        {
            title: "End-of-Line (EOL) Review",
            desc: "100% inspection of finished garments for loose threads, hardware function, and measurement accuracy.",
            icon: <Check className="w-6 h-6" />
        },
        {
            title: "Final Random Inspection (FRI)",
            desc: "Pre-shipment audit based on AQL 2.5 standards to ensure packing and carton markings are correct.",
            icon: <Truck className="w-6 h-6" />
        }
    ];

    const checklistItems = [
        { category: "Stitching", points: ["No skipped stitches", "Consistent stitch density (SPI)", "Secure back-tacking"] },
        { category: "Fabric / Color", points: ["No shading within the same garment", "Color fastness to sweat/wash", "Correct fabric GSM"] },
        { category: "Hardware / Trims", points: ["YKK Zipper smoothness", "Secure button attachment", "Label placement accuracy"] },
        { category: "Measurements", points: ["Full size set grading check", "Sleeve length +/- 1cm tolerance", "Waistband stretch recovery"] },
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="The Ultimate Checklist for Quality Control in Sialkot Apparel Manufacturing"
                description="Ensure your export orders meet international standards. A comprehensive guide to Quality Control (QC) for Sialkot apparel manufacturers, covering PPA, DPI, and FRI audits."
                canonical="/blog/apparel-manufacturing-qc-checklist"
                ogType="article"
                ogImage={IMAGES.serviceQC}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background border-b border-border">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/svc-quality-control.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <FadeIn>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-gold text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                Quality Assurance
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 9 min read
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> March 12, 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8 max-w-4xl">
                            The <span className="text-gradient-gold italic">Ultimate Checklist</span> for Apparel Quality Control
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                            One "bad batch" can destroy a decade of trust. Master the AQL standards and auditing pipelines used by the world's most successful exporters.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* The Pillars of QC Section */}
            <section className="py-20 bg-card/50">
                <div className="container max-w-4xl">
                    <div className="prose-custom">
                        <h2 className="font-serif text-3xl font-bold mb-6">Why QC is Your Most Profitable Department</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            In Sialkot, "Quality Control" is often treated as a final hurdle just before packing. This is a mistake. Professional QC is a <strong>preventative</strong> system, not an <strong>obstructionist</strong> one. Catching a fabric flaw during Pre-Production costs PKR 0. Catching it after 5,000 units are stitched costs you the entire shipment.
                        </p>

                        <div className="blog-callout">
                            "Quality is not an act, it is a habit. In B2B manufacturing, it's the difference between a one-time buyer and a lifetime partner."
                        </div>
                    </div>
                </div>
            </section>

            {/* QC Pipeline Visualization */}
            <section className="py-20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">The 4-Stage Auditing Pipeline</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {qcStages.map((stage, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} className="relative blog-stat-card border-gold/10 hover:border-gold/40 transition-all p-8 flex flex-col items-center text-center group">
                                <div className="w-14 h-14 rounded-full bg-gold/5 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-background transition-colors duration-300">
                                    {stage.icon}
                                </div>
                                <h4 className="font-serif font-bold text-lg mb-3">{stage.title}</h4>
                                <p className="text-muted-foreground text-xs leading-relaxed">{stage.desc}</p>
                                <div className="mt-auto pt-6 text-[10px] font-condensed font-bold tracking-widest text-gold opacity-30 group-hover:opacity-100 transition-opacity">
                                    STAGE 0{idx + 1}
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Checklist Cards */}
            <section className="py-20 bg-muted/20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold mb-4">The Inspector's Checklist</h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">Critical points our audit teams verify on the production floor every single day.</p>
                    </div>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {checklistItems.map((item, idx) => (
                            <AnimatedChild key={idx} className="bg-card border border-border p-8 rounded-sm hover:shadow-xl hover:shadow-gold/5 transition-all">
                                <h4 className="font-condensed font-bold text-gold uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-border pb-4">
                                    <ShieldCheck className="w-4 h-4" /> {item.category}
                                </h4>
                                <ul className="space-y-4">
                                    {item.points.map((point, pIdx) => (
                                        <li key={pIdx} className="flex gap-3 text-sm text-foreground/80">
                                            <div className="shrink-0 w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </AnimatedChild>
                        ))}
                    </StaggerChildren>
                </div>
            </section>

            {/* AQL Standandard Section */}
            <section className="py-20">
                <div className="container max-w-4xl">
                    <div className="flex flex-col md:flex-row gap-12 items-center bg-foreground text-background p-10 rounded-sm">
                        <div className="md:w-1/3 text-center">
                            <div className="inline-block p-6 rounded-full border-4 border-gold text-gold mb-4">
                                <span className="font-serif text-4xl font-bold italic">AQL</span>
                            </div>
                            <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-xs">Industry Standard</p>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="font-serif text-3xl font-bold mb-4 text-gradient-gold italic">Understanding AQL 2.5</h3>
                            <p className="text-background/70 leading-relaxed mb-6">
                                Acceptable Quality Level (AQL) is the statistical method we use to determine if a full product batch is accepted or rejected. For export orders, we typically operate on <strong>AQL 2.5 for Major Defects</strong> and <strong>4.0 for Minor Defects</strong>.
                            </p>
                            <Link href="/contact" className="text-gold font-bold text-sm underline underline-offset-4 hover:text-gold-light transition-colors">
                                Download our full QA Handbook (PDF)
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pro Tips Section */}
            <section className="py-20 bg-background border-t border-border">
                <div className="container max-w-3xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-8">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold mb-8">Common "Critical" Defects</h2>
                        <p className="text-muted-foreground mb-10">Items that trigger an immediate batch rejection regardless of AQL count.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            <div className="flex gap-4 p-5 bg-destructive/5 border border-destructive/10 rounded-sm text-left">
                                <X className="w-5 h-5 text-destructive shrink-0" />
                                <span className="text-sm font-bold">Broken needle tip in garment</span>
                            </div>
                            <div className="flex gap-4 p-5 bg-destructive/5 border border-destructive/10 rounded-sm text-left">
                                <X className="w-5 h-5 text-destructive shrink-0" />
                                <span className="text-sm font-bold">Incorrect brand labeling</span>
                            </div>
                            <div className="flex gap-4 p-5 bg-destructive/5 border border-destructive/10 rounded-sm text-left">
                                <X className="w-5 h-5 text-destructive shrink-0" />
                                <span className="text-sm font-bold">Fabric holes or weak seams</span>
                            </div>
                            <div className="flex gap-4 p-5 bg-destructive/5 border border-destructive/10 rounded-sm text-left">
                                <X className="w-5 h-5 text-destructive shrink-0" />
                                <span className="text-sm font-bold">Moisture or fungal growth</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-card border-y border-border">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
                        Zero-Compromise <span className="text-gold italic">Quality Assurance</span>
                    </h2>
                    <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                        Experience the peace of mind that comes with a manufacturing partner who cares about your reputation as much as you do.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-gold text-background hover:bg-gold-dark px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Inquire About QC Services <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-border text-foreground hover:bg-muted px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Request Audit Samples
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
