import { ArrowLeft, ArrowRight, Check, Clock, Calendar, TrendingUp, BarChart3, Rocket, Zap, Target } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, CountUp, PageWrapper } from "@/components/animations";

export default function BlogOutsourcingBenefits() {
    const brandPillars = [
        {
            title: "Cost Efficiency",
            desc: "Eliminate the overhead of maintaining a heavy stitching floor, staff salaries, and machinery maintenance.",
            icon: <BarChart3 className="w-6 h-6" />
        },
        {
            title: "Scaling Agility",
            desc: "Rapidly expand your production capacity during peak seasons without investing in new workspace.",
            icon: <Rocket className="w-6 h-6" />
        },
        {
            title: "Specialized Quality",
            desc: "Access specialized machine folders and skilled operators for complex technical sportswear seams.",
            icon: <Target className="w-6 h-6" />
        },
        {
            title: "Operational Focus",
            desc: "Free up your team to focus on what actually grows the business: innovative design and global marketing.",
            icon: <Zap className="w-6 h-6" />
        }
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="Why Sialkot Sportswear Brands are Outsourcing to Specialized CMT Units"
                description="Discover why the leading sportswear exporters in Sialkot are moving toward a lean manufacturing model by outsourcing stitching to specialized CMT partner units."
                canonical="/blog/why-sportswear-brands-outsource-cmt-sialkot"
                ogType="article"
                ogImage="/cmt_value_chain_infographic_1773276832953.png"
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
                                <span className="bg-gold text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                    Industry Analysis
                                </span>
                                <span className="text-muted-foreground text-xs flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> 8 min read
                                </span>
                                <span className="text-muted-foreground text-xs flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> March 12, 2026
                                </span>
                            </div>

                            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8">
                                The Sialkot Shift: Why Brands are <span className="text-gradient-gold italic">Outsourcing CMT</span>
                            </h1>

                            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                                In a global market where speed-to-market is the ultimate currency, Sialkot’s legacy apparel brands are abandoning the 'all-under-one-roof' model in favor of agile, specialized outsourcing.
                            </p>

                            <div className="flex items-center gap-8 border-t border-border pt-8">
                                <div>
                                    <p className="text-gold font-serif text-3xl font-bold"><CountUp to={65} suffix="%" /></p>
                                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Market Adoption</p>
                                </div>
                                <div className="w-[1px] h-10 bg-border" />
                                <div>
                                    <p className="text-gold font-serif text-3xl font-bold"><CountUp to={22} suffix="%" /></p>
                                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Avg. Profit Increase</p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn direction="left" className="relative">
                            <div className="aspect-square rounded-sm overflow-hidden border border-gold/20 shadow-2xl shadow-gold/5">
                                <img
                                    src="/cmt_value_chain_infographic_1773276832953.png"
                                    alt="CMT Manufacturing Value Chain"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* The Lean Revolution */}
            <section className="py-24 bg-card/30 border-y border-border">
                <div className="container max-w-4xl">
                    <div className="prose-custom">
                        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-center">The Lean Manufacturing Revolution</h2>
                        <p className="text-xl leading-relaxed mb-8 first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                            For decades, the mark of a "successful" export house in Sialkot was the number of machines on the factory floor. But in 2026, those mountains of machinery represent something else: <strong>fixed overhead and liability.</strong> Forward-thinking brands are turning to specialized Cut, Make, and Trim (CMT) units to handle the heavy lifting, allowing them to remain light, fast, and remarkably profitable.
                        </p>

                        <div className="blog-callout border-gold">
                            "Agility is the new competitive advantage. By decoupling design from production, Sialkot brands are finally moving at the speed of global fashion."
                        </div>
                    </div>
                </div>
            </section>

            {/* Strategic Benefits Diagram */}
            <section className="py-24 overflow-hidden">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div className="aspect-[4/5] rounded-sm overflow-hidden border border-border">
                                <img
                                    src="/outsourcing_benefits_diagram_1773276849626.png"
                                    alt="Strategic Benefits of CMT Outsourcing"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeIn>

                        <div>
                            <div className="mb-12">
                                <p className="text-gold font-condensed font-bold tracking-widest uppercase text-xs mb-3">Core Advantages</p>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">4 Pillars of Modern Sub-Contracting</h2>
                                <div className="gold-divider" />
                            </div>

                            <StaggerChildren className="space-y-8">
                                {brandPillars.map((pillar, idx) => (
                                    <AnimatedChild key={idx} className="group p-6 bg-card border border-border hover:border-gold/30 transition-all rounded-sm">
                                        <div className="flex gap-6">
                                            <div className="blog-feature-icon shrink-0 group-hover:scale-110">
                                                {pillar.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-xl font-bold mb-2 group-hover:text-gold transition-colors">{pillar.title}</h4>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                                            </div>
                                        </div>
                                    </AnimatedChild>
                                ))}
                            </StaggerChildren>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-muted/20">
                <div className="container max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold mb-4">In-House vs. Outsourced: The Reality</h2>
                        <p className="text-muted-foreground">A candid breakdown of the structural differences in 2026.</p>
                    </div>

                    <div className="blog-table-container shadow-2xl shadow-black/5">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Production Metric</th>
                                    <th>In-House Model</th>
                                    <th>Specialized CMT Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-bold">Setup Capital</td>
                                    <td>High (USD 50k - 200k+)</td>
                                    <td className="text-gold font-bold">Zero (Service Based)</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Scaling Speed</td>
                                    <td>Slow (Months to Hire/Buy)</td>
                                    <td className="text-gold font-bold">Instant (Switch Lines)</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Labor Liability</td>
                                    <td>Full Responsibility</td>
                                    <td className="text-gold font-bold">Vendor Responsibility</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Fabric Waste</td>
                                    <td>Variable (Internal Bias)</td>
                                    <td className="text-gold font-bold">Strict (AQL/Contractual)</td>
                                </tr>
                                <tr>
                                    <td className="font-bold">Technical Skill</td>
                                    <td>Generalized</td>
                                    <td className="text-gold font-bold">Hyper-Specialized</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Pro Tip Section */}
            <section className="py-24 bg-background border-t border-border">
                <div className="container max-w-3xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-8">
                            <TrendingUp className="w-8 h-8" />
                        </div>
                        <h2 className="font-serif text-4xl font-bold mb-8">The Exporter's Pro Tip</h2>

                        <div className="p-10 bg-card border border-gold/20 rounded-sm text-left shadow-lg">
                            <h4 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                                <Check className="w-5 h-5 text-gold" /> Selecting Your Partner
                            </h4>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Don't just look for the lowest price. In Sialkot, the best CMT units are the ones that specialize in <strong>one thing.</strong> If your brand sells high-performance joggers, don't use a unit that mostly switches between hoodies and t-shirts. Specialized units have custom folders and machine settings specifically for heavy stretch/interlock seams.
                            </p>
                            <Link href="/rfq" className="text-gold font-bold text-sm underline underline-offset-4 hover:text-gold-light transition-colors">
                                Request a tour of our specialized production lines
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gold relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/svc-pattern-drafting.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="container relative z-10 text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-background mb-8">
                        Scale Your Brand Without the Stress
                    </h2>
                    <p className="text-background/90 text-lg mb-12 max-w-2xl mx-auto">
                        Ready to transition to a lean, profitable manufacturing model? Let’s discuss how our CMT unit can become your brand's secret competitive advantage.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-background text-foreground hover:bg-background/90 px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm shadow-xl">
                                Get a Custom Audit <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Discuss Strategy
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
