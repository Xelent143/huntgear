import React from 'react';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calculator,
    Scissors,
    CheckCircle2,
    TrendingDown,
    Package,
    ArrowRight,
    ShieldCheck,
    Scale
} from 'lucide-react';
import { motion } from 'framer-motion';

const BlogCMTCosting = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-16">
            <SEOHead
                title="How to Calculate CMT Costs for Your Next Export Shipment | Sialkot Sampling"
                description="A definitive guide to calculating Cut, Make, Trim (CMT) costs for streetwear exports. Learn how to optimize your production budget with Sialkot Sample Masters."
                keywords="CMT cost calculation, Sialkot export, streetwear manufacturing, Cut Make Trim pricing, garment production budget"
            />

            <div className="max-w-4xl mx-auto px-6">
                {/* Hero Section */}
                <motion.div {...fadeInUp} className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-sm font-medium tracking-wide">
                            MANUFACTURING STRATEGY
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
                        How to Calculate CMT Costs for Your Next Export Shipment
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Transparent pricing is the foundation of a successful export partnership. Learn the exact formula Sialkot factories use to quote your streetwear designs.
                    </p>
                </motion.div>

                {/* Introduction */}
                <div className="prose prose-invert max-w-none prose-p:text-gray-400 prose-headings:text-white mb-16">
                    <p className="text-lg leading-relaxed mb-8">
                        For many international streetwear brands, moving from a fully factored (FOB) model to **CMT (Cut, Make, Trim)** is a significant milestone. It offers more control over fabric quality and material costs. However, calculating CMT accurately is crucial to avoid hidden charges and production delays.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
                        {[
                            { icon: <Scissors className="w-6 h-6" />, title: "Cut", desc: "Precision fabric cutting based on graded patterns." },
                            { icon: <CheckCircle2 className="w-6 h-6" />, title: "Make", desc: "Expert assembly, stitching, and construction." },
                            { icon: <Package className="w-6 h-6" />, title: "Trim", desc: "Thread cleaning, QC, and export packaging." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-[#141414] border border-white/5">
                                <div className="text-[#C5A059] mb-4">{item.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Infographic 1: Cost Breakdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mb-16 rounded-3xl overflow-hidden border border-white/10 bg-[#111] p-1"
                >
                    <div className="aspect-video relative">
                        <img
                            src="/cmt_cost_breakdown_pie_1773440983080.png"
                            alt="CMT Cost Distribution Infographic"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-6 text-center italic text-gray-400 text-sm">
                        Standard CMT weightage in a high-complexity streetwear production line.
                    </div>
                </motion.div>

                {/* The Calculation Formula */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Calculator className="text-[#C5A059]" /> The CMT Calculation Formula
                    </h2>
                    <Card className="bg-[#141414] border-white/5 p-8 mb-8">
                        <CardContent className="p-0">
                            <div className="text-center py-6 border-b border-white/5 mb-6">
                                <code className="text-2xl md:text-3xl font-mono text-[#C5A059]">
                                    CMT = (SAM × Cost Per Minute) + Overheads
                                </code>
                            </div>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2.5 shrink-0" />
                                    <div>
                                        <span className="font-bold text-white block">SAM (Standard Allowed Minutes):</span>
                                        <span className="text-gray-400">The total time required for an operator to complete the garment assembly under standard conditions. Simple hoodies usually average 18-24 SAM, while technical jackets can exceed 45 SAM.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2.5 shrink-0" />
                                    <div>
                                        <span className="font-bold text-white block">Cost Per Minute:</span>
                                        <span className="text-gray-400">Includes direct labor wages, insurance, and local labor compliance costs in Sialkot.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2.5 shrink-0" />
                                    <div>
                                        <span className="font-bold text-white block">Factory Overheads:</span>
                                        <span className="text-gray-400">Electricity (critical in Pakistan), machine maintenance, supervision, and building rent. Typically calculated at 110-140% of standard labor costs.</span>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                {/* CMT vs FOB Comparison */}
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                    <Scale className="text-[#C5A059]" /> CMT vs. FOB: Making the Choice
                </h2>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="mb-16 rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
                >
                    <img
                        src="/cmt_vs_fob_comparison_visual_1773441011260.png"
                        alt="CMT vs FOB Comparison Table"
                        className="w-full h-auto"
                    />
                </motion.div>

                {/* Benefits Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#141414] to-black border border-white/5">
                        <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-6" />
                        <h3 className="text-xl font-bold mb-4">Quality Control</h3>
                        <p className="text-gray-400 leading-relaxed italic">
                            "By providing your own fabric, you eliminate variables in shrinkage, pilling, and wash-fastness before the first cut is made."
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#141414] to-black border border-white/5">
                        <TrendingDown className="w-8 h-8 text-[#C5A059] mb-6" />
                        <h3 className="text-xl font-bold mb-4">Cost Transparency</h3>
                        <p className="text-gray-400 leading-relaxed italic">
                            "Understand exactly where every dollar goes. No more 'bulk fabric markups' hidden in your FOB price."
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-12 rounded-[32px] bg-gradient-to-r from-[#C5A059] to-[#D4B57E] text-black text-center relative overflow-hidden group mb-12"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <h2 className="text-3xl font-bold mb-4 relative z-10">Need a Precise Quote?</h2>
                    <p className="text-black/80 mb-8 max-w-lg mx-auto relative z-10 font-medium italic">
                        Send us your tech pack today. Our sampling masters will provide a detailed SAM breakdown and CMT quote within 24 hours.
                    </p>
                    <Button size="lg" className="bg-black text-white hover:bg-black/90 rounded-full px-8 relative z-10 group">
                        Request CMT Quote <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            </div>

            <footer className="max-w-4xl mx-auto px-6 pt-16 border-t border-white/5 text-center">
                <p className="text-gray-500 text-sm italic">
                    &copy; {new Date().getFullYear()} Sialkot Sample Masters. All rights reserved. Specialized streetwear CMT for global exports.
                </p>
            </footer>
        </div>
    );
};

export default BlogCMTCosting;
