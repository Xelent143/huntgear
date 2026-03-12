import { ArrowLeft, ArrowRight, Check, Clock, Calendar, Layers, Printer, Droplets, Shield, Info } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { FadeIn, StaggerChildren, AnimatedChild, CountUp, PageWrapper } from "@/components/animations";

export default function BlogSublimationGuide() {
    const processSteps = [
        {
            title: "Digital Design & Mirroring",
            desc: "Creating high-resolution vector artwork that is mirrored before printing to ensure correct orientation on fabric.",
            icon: <Printer className="w-6 h-6" />
        },
        {
            title: "Ink-to-Paper Transfer",
            desc: "Printing the mirrored design onto specialized heat-transfer paper using premium Italian or Japanese sublimation inks.",
            icon: <Droplets className="w-6 h-6" />
        },
        {
            title: "Heat Press & Gassing",
            desc: "Applying high heat (200°C) and pressure. The solid ink turns into gas and molecules merge with the fabric fibers.",
            icon: <Layers className="w-6 h-6" />
        },
        {
            title: "Cooling & Bond Locking",
            desc: "As the fabric cools, the ink molecules are trapped inside the fibers, making the print permanent and breathable.",
            icon: <Check className="w-6 h-6" />
        }
    ];

    return (
        <PageWrapper>
            <SEOHead
                title="Everything You Need to Know About Digital Sublimation Printing for Sportswear in 2026"
                description="The ultimate B2B guide to digital sublimation printing for sportswear brands. Learn about fabric compatibility, ink quality, and why Sialkot is the hub for performance apparel."
                canonical="/blog/sublimation-printing-guide-sportswear"
                ogType="article"
                ogImage={IMAGES.servicePrinting}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/svc-textile-printing.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                </div>

                <div className="container relative z-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>

                    <FadeIn>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="bg-gold text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                                Technical Guide
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 8 min read
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> March 12, 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-8 max-w-4xl">
                            The 2026 Guide to <span className="text-gradient-gold italic">Digital Sublimation Printing</span> for Sportswear
                        </h1>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                            Why the world's top sports brands choose sublimation for performance. A deep dive into the science of gas-to-fiber printing.
                        </p>
                    </FadeIn>

                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={100} suffix="%" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">Breathability Retained</p>
                        </AnimatedChild>
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={50} suffix="+" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">Wash Cycles (No Fade)</p>
                        </AnimatedChild>
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={16.7} suffix="M" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">Possible Color Shades</p>
                        </AnimatedChild>
                        <AnimatedChild className="blog-stat-card">
                            <p className="text-gold font-serif text-4xl font-bold mb-2">
                                <CountUp to={0} suffix="" />
                            </p>
                            <p className="text-muted-foreground font-condensed font-bold uppercase tracking-wider text-xs">Texture/Feel on Fabric</p>
                        </AnimatedChild>
                    </StaggerChildren>
                </div>
            </section>

            {/* Science Section */}
            <section className="py-20 bg-card/50">
                <div className="container max-w-4xl">
                    <div className="prose-custom">
                        <h2 className="font-serif text-3xl font-bold mb-6">The "Science" of Sublimation</h2>
                        <p className="text-lg leading-relaxed mb-6">
                            Unlike screen printing—where ink sits on <em>top</em> of the fabric—sublimation actually bonds the ink <em>inside</em> the fibers. When the heat hits those polyester-based fibers, they open up like a microscopic pore, allowing the vaporized ink to enter. Once cooled, the pore closes, locking the color in forever.
                        </p>

                        <div className="blog-callout">
                            <strong>Key Advantage:</strong> Because the ink is inside the fiber, it doesn't block the gaps between the threads. This means the moisture-wicking and breathability features of high-performance sportswear are 100% maintained.
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Visualization */}
            <section className="py-20">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16 px-4">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">The Professional Sublimation Pipeline</h2>
                        <div className="gold-divider mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} className="relative group">
                                {idx < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gold/20 z-0 -translate-x-1/4" />
                                )}
                                <div className="bg-card border border-border p-6 rounded-sm relative z-10 h-full hover:border-gold/50 transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-gold text-background flex items-center justify-center font-bold mb-6 shadow-lg shadow-gold/20">
                                        {idx + 1}
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fabric Compatibility Matrix */}
            <section className="py-20 bg-muted/20">
                <div className="container max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl font-bold mb-4">Fabric Compatibility Matrix</h2>
                        <p className="text-muted-foreground">Sublimation requires specific synthetic compositions to achieve vibrant results.</p>
                    </div>

                    <div className="blog-table-container">
                        <table className="blog-table">
                            <thead>
                                <tr>
                                    <th>Fabric Type</th>
                                    <th>Polyester %</th>
                                    <th>Color Vibrancy</th>
                                    <th>Durability</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>100% Performance Poly</td>
                                    <td>100%</td>
                                    <td>Ultra-Vibrant</td>
                                    <td>Exceptional</td>
                                </tr>
                                <tr>
                                    <td>Interlock / Birdseye</td>
                                    <td>100%</td>
                                    <td>High Contrast</td>
                                    <td>High</td>
                                </tr>
                                <tr>
                                    <td>Poly-Spandex Blends</td>
                                    <td>80-92%</td>
                                    <td>Very Good</td>
                                    <td>High (Stretch-Safe)</td>
                                </tr>
                                <tr>
                                    <td>Poly-Cotton Blend</td>
                                    <td>50-65%</td>
                                    <td>Vintage/Faded</td>
                                    <td>Moderate</td>
                                </tr>
                                <tr>
                                    <td>100% Cotton</td>
                                    <td>0%</td>
                                    <td>Not Recommended</td>
                                    <td>N/A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Comparison Sections */}
            <section className="py-20">
                <div className="container max-w-4xl">
                    <h2 className="font-serif text-3xl font-bold mb-10 text-center">Quality Indicators: What to Look For</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 border border-border rounded-sm bg-card hover:border-gold/30 transition-all group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gold/10 text-gold rounded-sm group-hover:bg-gold group-hover:text-background transition-colors">
                                    <Droplets className="w-6 h-6" />
                                </div>
                                <h4 className="font-serif text-xl font-bold">Ink Grade Matters</h4>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Generic inks often lead to "ghosting" or color shifting (e.g., black turning to brown after 5 washes). We exclusively use <strong>J-Teck (Italy)</strong> or <strong>Epson Gen5</strong> inks for deep, true color saturation.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest">
                                <Check className="w-4 h-4" /> Eco-Pass Certified
                            </div>
                        </div>

                        <div className="p-8 border border-border rounded-sm bg-card hover:border-gold/30 transition-all group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-gold/10 text-gold rounded-sm group-hover:bg-gold group-hover:text-background transition-colors">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h4 className="font-serif text-xl font-bold">Paper Thickness</h4>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Low-GSM paper warps under high-speed printing, causing blur. Our <strong>100GSM+ Tackified Paper</strong> ensures the design doesn't move during transfer, providing razor-sharp edges on every logo.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-widest">
                                <Check className="w-4 h-4" /> Anti-Ghosting Tech
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pro Tips Section */}
            <section className="py-20 bg-background border-t border-border">
                <div className="container max-w-3xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-8">
                            <Info className="w-8 h-8" />
                        </div>
                        <h2 className="font-serif text-3xl font-bold mb-8">A Note on Export Standards</h2>
                        <div className="space-y-6 text-left w-full">
                            <div className="flex gap-4 p-6 bg-muted/30 rounded-sm">
                                <div className="shrink-0"><Shield className="w-5 h-5 text-gold" /></div>
                                <div>
                                    <h5 className="font-bold text-sm mb-1 uppercase tracking-wider">REACH Compliance</h5>
                                    <p className="text-muted-foreground text-sm leading-relaxed">For European exports, your inks must be free of harmful chemicals. Our sublimation process passes all OEKO-TEX and REACH stringent tests.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 bg-muted/30 rounded-sm">
                                <div className="shrink-0"><Shield className="w-5 h-5 text-gold" /></div>
                                <div>
                                    <h5 className="font-bold text-sm mb-1 uppercase tracking-wider">Color Consistency</h5>
                                    <p className="text-muted-foreground text-sm leading-relaxed">We use X-Rite spectrophotometers to ensure that the color of the jersey you order in March perfectly matches the re-order in November.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-gold via-gold-dark to-gold">
                <div className="container text-center">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-background mb-8">
                        Level Up Your Sportswear Brand
                    </h2>
                    <p className="text-background/90 text-lg mb-12 max-w-2xl mx-auto">
                        Ready to see the difference premium Italian ink makes? Request a sample kit featuring our latest sublimated performance fabrics.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/rfq">
                            <Button className="bg-background text-foreground hover:bg-background/90 px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm shadow-xl">
                                Request Sample Kit <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground px-12 py-7 h-auto font-condensed font-bold tracking-widest uppercase text-sm rounded-sm">
                                Speak to a Print Expert
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
