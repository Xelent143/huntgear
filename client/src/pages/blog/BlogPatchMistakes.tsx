import React from 'react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertTriangle,
    FileWarning,
    Layers,
    Search,
    CheckCircle2,
    XCircle,
    ArrowRight,
    ShieldAlert,
    Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPatchMistakes = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-16">
            <SEOHead
                title="Top 3 Mistakes Sialkot Exporters Make When Ordering Custom Patches | SSM"
                description="Avoid costly mistakes in custom patch and badge ordering. Learn about resolution, backing types, and detail density for international export standards."
                keywords="custom patches Sialkot, apparel badges, embroidery mistakes, patch backing guide, garment finishing"
            />

            <div className="max-w-4xl mx-auto px-6">
                {/* Hero Section */}
                <motion.div {...fadeInUp} className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium tracking-wide">
                            QUALITY ALERT
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Top 3 Mistakes Sialkot Exporters Make When Ordering Custom Patches
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A single poorly executed patch can ruin a multi-thousand dollar export shipment. Ensure your finishing matches your garment quality.
                    </p>
                </motion.div>

                {/* Introduction */}
                <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-headings:text-white mb-16">
                    <p className="text-lg leading-relaxed mb-8">
                        In the competitive world of Sialkot sportswear and streetwear exports, **branding is everything**. While your fabric and stitching might be world-class, the finishing touches—patches, badges, and labels—are what the customer touches first. Unfortunately, many exporters treat patches as an afterthought, leading to rejection from premium EU and US buyers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                        {[
                            { icon: <FileWarning className="w-6 h-6" />, title: "Low Res Files", desc: "Screenshot-to-thread disasters." },
                            { icon: <Layers className="w-6 h-6" />, title: "Wrong Backing", desc: "Peeling labels after one wash." },
                            { icon: <Search className="w-6 h-6" />, title: "Detail Overload", desc: "Small text turning into blobs." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#C5A059]/30 transition-colors">
                                <div className="text-[#C5A059] mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mistake 1: Resolution & Digitizing */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl">1</div>
                        <h2 className="text-3xl font-bold">The "Source File" Trap</h2>
                    </div>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        The most common error is providing low-resolution JPGs or screenshots as artwork. Embroidery is a physical process that requires **vector-based paths**. When you provide a low-quality image, the digitizer has to "guess" the curves, resulting in jagged edges and inconsistent thread density.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl overflow-hidden border border-white/10 bg-[#111] mb-8"
                    >
                        <img
                            src="/patches_bad_vs_good_comparison_1773484450519.png"
                            alt="Comparison of low-quality vs high-quality patch digitizing"
                            className="w-full h-auto"
                        />
                    </motion.div>

                    <div className="bg-[#C5A059]/10 border border-[#C5A059]/20 p-6 rounded-2xl flex gap-4">
                        <CheckCircle2 className="text-[#C5A059] shrink-0 w-6 h-6" />
                        <p className="text-[#C5A059] text-sm font-medium">
                            <strong>SSM SOLUTION:</strong> We always request .AI or .EPS vector files. If you don't have them, our in-house digitizers reconstruct your logo to ensure perfect thread paths.
                        </p>
                    </div>
                </section>

                {/* Mistake 2: Backing Types */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl">2</div>
                        <h2 className="text-3xl font-bold">Backing & Application Mismatch</h2>
                    </div>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Exporters often choose **Heat Seal (Iron-on)** for convenience, but for performance garments like gym wear or football kits, this is a mistake. High-heat application can damage synthetic fabrics, and the adhesive often fails after 10-15 industrial washes.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <img
                            src="/patch_backing_guide_visual_1773484466440.png"
                            alt="Guide to patch backing types"
                            className="w-full h-auto"
                        />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-[#141414] border-red-500/20">
                            <CardContent className="p-6">
                                <XCircle className="text-red-500 mb-4 w-6 h-6" />
                                <h4 className="font-bold mb-2">Wrong Choice</h4>
                                <p className="text-sm text-gray-500">Iron-on patches for Sublimated Polyester. Result: Peeling and fabric scorching.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#141414] border-green-500/20">
                            <CardContent className="p-6">
                                <CheckCircle2 className="text-green-500 mb-4 w-6 h-6" />
                                <h4 className="font-bold mb-2">Right Choice</h4>
                                <p className="text-sm text-gray-500">Sew-on or Velcro for heavy-duty streetwear and tactical gear. Result: Lifetime durability.</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Mistake 3: Detail Density */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl">3</div>
                        <h2 className="text-3xl font-bold">Small Text "Blobbing"</h2>
                    </div>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Embroidery thread has a physical thickness (usually 40W). If your design includes text smaller than **4mm (0.15 inches)**, the stitches will overlap, turning your brand name into an illegible "blob". This is the #1 cause for batch rejection by international buyers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#141414] to-black border border-white/5">
                            <Cpu className="w-8 h-8 text-[#C5A059] mb-6" />
                            <h3 className="text-xl font-bold mb-4">The PVC Alternative</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                If your design is highly detailed, switch to **3D PVC Patches**. They use liquid molding rather than thread, allowing for microscopic detail that embroidery cannot match.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#141414] to-black border border-white/5">
                            <ShieldAlert className="w-8 h-8 text-red-500 mb-6" />
                            <h3 className="text-xl font-bold mb-4">The 4mm Rule</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Always ensure a minimum text height of 4mm. If your logo is smaller, we recommend using **Sublimated Patches** where the image is printed on the fabric before being merrowed.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="p-12 rounded-[40px] bg-gradient-to-r from-[#C5A059] to-[#D4B57E] text-black text-center relative overflow-hidden mb-12"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.05)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.05)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
                    <h2 className="text-3xl font-bold mb-4 relative z-10">Don't Gamble with Your Brand</h2>
                    <p className="text-black/80 mb-8 max-w-lg mx-auto relative z-10 font-medium">
                        Send us your logo files, and our masters will audit them for embroidery compatibility for free.
                    </p>
                    <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8 relative z-10 group">
                        Free Logo Audit <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

            <footer className="max-w-4xl mx-auto px-6 pt-16 border-t border-white/5 text-center">
                <p className="text-gray-500 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Sialkot Sample Masters. Premium Finishing & Trims Division.
                </p>
            </footer>
        </div>
    );
};

export default BlogPatchMistakes;
