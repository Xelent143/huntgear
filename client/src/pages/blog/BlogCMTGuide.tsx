import { ArrowLeft, ArrowRight, Check, Clock, Calendar, ShieldCheck, Factory, Ruler, Zap, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, CountUp, PageWrapper } from "@/components/animations";

export default function BlogCMTGuide() {
    const cmtSteps = [
        {
            title: "Cut (Precision Cutting)",
            desc: "Laying, marking, and cutting fabric according to approved digital patterns with zero-tolerance precision.",
            icon: <Ruler className="w-6 h-6" />
        },
        {
            title: "Make (Stitching & Assembly)",
            desc: "Industrial-grade stitching using mult-head machines, ensuring export-standard seams and structural integrity.",
            icon: <Factory className="w-6 h-6" />
        },
        {
            title: "Trim (Finishing & Packing)",
            desc: "Adding labels, hardware, final pressing, and poly-bagging according to buyer-specific guidelines.",
            icon: <Check className="w-6 h-6" />
        }
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="The Sialkot Exporter's Guide to Outsourcing CMT Production"
                description="A complete guide for Sialkot apparel exporters on how to find, vet, and manage reliable CMT (Cut, Make, Trim) sub-contractors for sportswear & fashion exports."
                canonical="/blog/cmt-outsourcing-guide-sialkot"
                ogType="article"
                ogImage={IMAGES.servicesBg}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/svc-stitching-sewing.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <FadeIn>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-gold text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                Manufacturing Guide
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 10 min read
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> March 12, 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8 max-w-4xl">
                            The Sialkot Exporter's Guide to <span className="text-gradient-gold italic">Outsourcing CMT Production</span>
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                            Transform your production floor without the overhead. Learn how to leverage Sialkot's specialized CMT units to scale your export brand.
                        </p>
                    </FadeIn>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={98.5} suffix="%" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">On-Time Delivery Rate</p>
                        </AnimatedChild>
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={40} suffix="%" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">Avg. Overhead Reduction</p>
                        </AnimatedChild>
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={500} suffix="+" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">Exporters Served in Sialkot</p>
                        </AnimatedChild>
                    </StaggerChildren>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-20 bg-card/50">
                <div className="container max-w-4xl">
                    <div className="prose-custom">
                        <p className="text-xl leading-relaxed">
                            If you are a garment exporter in Sialkot, you already know the single most stressful part of your business isn't finding international clients—it's <strong>fulfilling their orders on time and to quality</strong>. Your reputation, and your next order, rides entirely on the production floor.
                        </p>

                        <div className="blog-callout">
                            "Outsourcing to a CMT unit in Sialkot is no longer just a trend; it's a structural shift allowing brands to stay lean while scaling exponentially."
                        </div>
                    </div>
                </div>
            </section>

            {/* Infographic: CMT Process Flow */}
            <section className="py-20">
                <div className="container max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">The 3-Step CMT Workflow</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <div className="space-y-4">
                        {cmtSteps.map((step, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} className="blog-process-step">
                                <div className="blog-process-number">{idx + 1}</div>
                                <div className="flex gap-4 items-start">
                                    <div className="p-3 rounded-sm bg-gold/10 text-gold">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cost Table Section */}
            <section className="py-20 bg-muted/20">
                <div className="container max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl font-bold mb-4">CMT Cost Benchmarks (2026)</h2>
                        <p className="text-muted-foreground">Estimated per-piece rates for export-quality production in Sialkot.</p>
                    </div>

                    <div className="blog-table-container">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Garment Type</th>
                                    <th>Basics (PKR)</th>
                                    <th>Technical (PKR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>T-Shirts / Polos</td>
                                    <td>80 - 150</td>
                                    <td>150 - 250</td>
                                </tr>
                                <tr>
                                    <td>Hoodies / Sweatshirts</td>
                                    <td>180 - 300</td>
                                    <td>300 - 550</td>
                                </tr>
                                <tr>
                                    <td>Tracksuits / Joggers</td>
                                    <td>250 - 450</td>
                                    <td>450 - 800</td>
                                </tr>
                                <tr>
                                    <td>Industrial Workwear</td>
                                    <td>400 - 650</td>
                                    <td>650 - 1200</td>
                                </tr>
                                <tr>
                                    <td>Sublimated Uniforms</td>
                                    <td>300 - 500</td>
                                    <td>500 - 900</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-xs italic text-muted-foreground text-center">
                        *Note: Final pricing depends on order volume, fabric type, and complexity of tech packs.
                    </p>
                </div>
            </section>

            {/* Red Flags / Warning Section */}
            <section className="py-20">
                <div className="container max-w-4xl">
                    <div className="bg-destructive/5 border border-destructive/20 rounded-sm p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <AlertTriangle className="w-24 h-24 text-destructive" />
                        </div>

                        <h3 className="font-serif text-2xl font-bold text-destructive mb-6 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6" /> Red Flags When Vetting CMT Units
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                                    <span className="text-destructive font-bold">01.</span>
                                    No formal Quality Control station on the floor.
                                </li>
                                <li className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                                    <span className="text-destructive font-bold">02.</span>
                                    Old machines without proper maintenance logs.
                                </li>
                            </ul>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                                    <span className="text-destructive font-bold">03.</span>
                                    Lack of specialized folders for specific operations.
                                </li>
                                <li className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                                    <span className="text-destructive font-bold">04.</span>
                                    Unwillingness to provide a first-piece strike-off.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Grid */}
            <section className="py-20 bg-background border-t border-border">
                <div className="container">
                    <div className="text-center mb-16">
                        <p className="text-gold font-condensed font-bold tracking-widest uppercase text-xs mb-3">Professional Standards</p>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Sialkot Exporters Trust Our Branch</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatedChild className="flex flex-col items-center text-center group">
                            <div className="blog-feature-icon">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-lg font-bold mb-2">AQL Standard QC</h4>
                            <p className="text-muted-foreground text-sm">We follow international AQL 2.5/4.0 standards consistently.</p>
                        </AnimatedChild>

                        <AnimatedChild className="flex flex-col items-center text-center group">
                            <div className="blog-feature-icon">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-lg font-bold mb-2">Swift Lead Times</h4>
                            <p className="text-muted-foreground text-sm">Priority lines for urgent export shipments and sampling.</p>
                        </AnimatedChild>

                        <AnimatedChild className="flex flex-col items-center text-center group">
                            <div className="blog-feature-icon">
                                <Factory className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-lg font-bold mb-2">Modern Machines</h4>
                            <p className="text-muted-foreground text-sm">Latest Juki and Brother machines for consistent stitching.</p>
                        </AnimatedChild>

                        <AnimatedChild className="flex flex-col items-center text-center group">
                            <div className="blog-feature-icon">
                                <Check className="w-6 h-6" />
                            </div>
                            <h4 className="font-serif text-lg font-bold mb-2">Ethical Floor</h4>
                            <p className="text-muted-foreground text-sm">Zero child labor and fair wage compliance verified.</p>
                        </AnimatedChild>
                    </StaggerChildren>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gold">
                <div className="container text-center">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-background mb-8">
                        Ready to Scale Your Production?
                    </h2>
                    <p className="text-background/80 text-lg mb-10 max-w-2xl mx-auto">
                        Book a factory visit or request a custom CMT quote for your next export order. Our specialists are ready to assist.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-background text-foreground hover:bg-background/90 px-10 py-6 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Get a CMT Quote <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground px-10 py-6 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Contact Our Branch
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
