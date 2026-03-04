import { Link } from "wouter";
import { motion } from "framer-motion";
import {
    ArrowRight, Palette, Type, Image, Layers, MousePointer2,
    CheckCircle, Star, Zap, Shield, Smartphone, Download,
    Move, RotateCcw, ChevronDown, Wand2, Package, Users, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

/* ─── Feature data ──────────────────────────────────────────────────────── */

const FEATURES = [
    {
        icon: <Palette className="w-7 h-7" />,
        title: "Real-Time Color Customization",
        description:
            "Instantly change the color of every individual garment panel — body, sleeves, collar, pockets — using a curated 32-color palette or any custom hex value. Changes render live without page reloads.",
    },
    {
        icon: <Image className="w-7 h-7" />,
        title: "Logo & Emblem Placement",
        description:
            "Upload your company logo, emblem, or badge in PNG, JPG, or SVG format. Tap any body part to place the logo — the tool precisely clips it to that exact garment region with no overflow.",
    },
    {
        icon: <Type className="w-7 h-7" />,
        title: "Custom Text & Typography",
        description:
            "Add custom text — names, ranks, department labels, or slogans — in multiple fonts including Barlow Condensed, Impact, and Georgia. Pick font size and color, then tap any garment zone to place it.",
    },
    {
        icon: <Layers className="w-7 h-7" />,
        title: "Patterns & Camouflage",
        description:
            "Apply professional camouflage patterns (Woodland, Desert, Urban) or tactical stripes to any individual panel. Each pattern is contained within the selected zone for a realistic, professional look.",
    },
    {
        icon: <MousePointer2 className="w-7 h-7" />,
        title: "Drag, Resize & Rotate",
        description:
            "Every placed element is fully interactive. Drag to reposition, use corner handles to resize, and rotate freely. The canvas behaves exactly like a professional vector design tool.",
    },
    {
        icon: <Smartphone className="w-7 h-7" />,
        title: "Mobile-First Design",
        description:
            "Built specifically for touch screens. The bottom tab bar, slide-up toolsheet, and 44px minimum touch targets provide a native app experience on any iOS or Android device.",
    },
    {
        icon: <Download className="w-7 h-7" />,
        title: "High-Resolution Export",
        description:
            "Export your finished design as a high-quality 2x resolution PNG. Send directly to your production team, include in your RFQ, or share with decision-makers for approval.",
    },
    {
        icon: <Wand2 className="w-7 h-7" />,
        title: "Smart Placement Mode",
        description:
            "Upload a logo or write your text first, then simply tap any region on the garment to place it there. The AI automatically clips the element to that exact zone with zero manual masking.",
    },
];

/* ─── How it works ──────────────────────────────────────────────────────── */

const STEPS = [
    {
        number: "01",
        title: "Choose Your Garment Template",
        description:
            "Start by selecting from our pre-loaded garment templates — Tactical Jacket, Pullover Hoodie, Security Shirt, and more. Each template is a precision-mapped SVG with individually selectable zones.",
    },
    {
        number: "02",
        title: "Customize Colors & Patterns",
        description:
            "Open the Colors tool from the sidebar and click any part of the garment on the canvas. Pick from the color palette or enter a custom hex. Switch to Patterns to apply camo or texture to specific zones.",
    },
    {
        number: "03",
        title: "Add Logos, Text & Branding",
        description:
            "Upload your logo or type your text, then tap the body part where you want it placed. The system automatically centers and clips the element within the selected zone.",
    },
    {
        number: "04",
        title: "Export & Submit for Production",
        description:
            "When satisfied, click Export to download a 2x high-resolution PNG of your design. Attach it to a Request for Quote (RFQ) and our team will begin sampling within 24 hours.",
    },
];

/* ─── Products ──────────────────────────────────────────────────────────── */

const PRODUCTS = [
    { emoji: "🧥", name: "Tactical Jackets", desc: "Full-zip and pullover tactical shells with multi-zone color mapping" },
    { emoji: "👕", name: "Security Shirts", desc: "Short & long sleeve guard shirts with breast pocket and epaulette zones" },
    { emoji: "🦺", name: "High-Visibility Vests", desc: "HV vests with retro-reflective tape and ANSI Class 2 & 3 options" },
    { emoji: "👖", name: "Cargo Trousers", desc: "Tactical cargo pants with multiple pocket zones for color customization" },
    { emoji: "🧣", name: "Pullover Hoodies", desc: "Heavyweight fleece hoodies with hood, body, and sleeve independent coloring" },
    { emoji: "🎿", name: "Softshell Jackets", desc: "Windproof softshell jackets for corporate outdoor and ski patrol uniforms" },
    { emoji: "🪖", name: "Caps & Headwear", desc: "6-panel caps and beanies with logo placement zones and color customization" },
    { emoji: "🥾", name: "Bomber Jackets", desc: "MA-1 style bombers with sleeve, body, and lining customization zones" },
];

/* ─── Benefits ──────────────────────────────────────────────────────────── */

const BENEFITS = [
    {
        icon: <Zap className="w-5 h-5" />,
        title: "Zero Design Software Required",
        description: "No Photoshop, no Illustrator, no learning curve. Design professional B2B uniforms directly in your browser in minutes.",
    },
    {
        icon: <Users className="w-5 h-5" />,
        title: "Better Client Communication",
        description: "Share visual designs with procurement teams and end clients before sampling. Cut revision cycles in half.",
    },
    {
        icon: <Shield className="w-5 h-5" />,
        title: "Production-Ready Output",
        description: "High-resolution exports are used directly as design briefs for our sampling team, reducing miscommunication errors.",
    },
    {
        icon: <Globe className="w-5 h-5" />,
        title: "Works Anywhere, Any Device",
        description: "Accessible on desktop, tablet, and mobile. Your entire team — from procurement to field managers — can view and approve designs.",
    },
    {
        icon: <Package className="w-5 h-5" />,
        title: "Instant MOQ & RFQ Integration",
        description: "Attach exported designs directly to our RFQ form. Our team receives a clear production brief and responds within 24 hours.",
    },
    {
        icon: <RotateCcw className="w-5 h-5" />,
        title: "Unlimited Design Iterations",
        description: "Experiment freely. Reset, re-color, swap patterns, and try different logo positions with no cost or commitment.",
    },
];

/* ─── FAQ ───────────────────────────────────────────────────────────────── */

const FAQS = [
    {
        q: "Is the 2D Uniform Customizer free to use?",
        a: "Yes — the 2D Uniform Designer is completely free to use. No registration is required. You can design, experiment, and export your uniform concepts at no cost.",
    },
    {
        q: "Can I use my own logo or artwork in the customizer?",
        a: "Absolutely. The logo upload tool accepts PNG, JPG, and SVG files. Your logo is placed directly on the selected garment zone and displayed proportionally with the correct aspect ratio.",
    },
    {
        q: "What is the minimum order quantity (MOQ) after designing?",
        a: "Our standard MOQ is 100 pieces per style. For custom blank garments with simple color changes, MOQ can be as low as 50 pieces. Contact us via RFQ for exact pricing.",
    },
    {
        q: "How do I submit my design for a quote?",
        a: "Export your design as a PNG from the designer, then navigate to our Request for Quote page and attach the image. Our team reviews all RFQs within 24 business hours.",
    },
    {
        q: "Does the tool work on mobile phones and tablets?",
        a: "Yes. The 2D designer is built mobile-first with a native-style bottom tab bar, touch-optimized controls, and slide-up tool panels. It works on iOS Safari, Android Chrome, and all modern mobile browsers.",
    },
    {
        q: "Can I save my design and come back to it later?",
        a: "Currently, you can export your design as a high-resolution PNG at any time. We are actively developing account-based design saving, which will allow you to store and retrieve designs across sessions.",
    },
    {
        q: "Which garment parts can be individually colored?",
        a: "Each SVG template in the designer has individually named zones. For example, the Tactical Jacket has separate zones for the body, left sleeve, right sleeve, collar, breast pockets, and lower pockets — each colorable independently.",
    },
    {
        q: "Is this a 3D or 2D preview?",
        a: "This is a precision 2D flat-lay SVG designer, which provides a clean, print-ready visualization. We also offer a separate full 3D rotatable customizer for clients who require a photorealistic preview.",
    },
];

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function DesignStudio() {
    return (
        <PageWrapper>
            {/* ── SEO HEAD ── */}
            <SEOHead
                title="Free 2D Uniform Designer & Customizer | Sialkot Sample Masters — Design Security & Tactical Gear Online"
                description="Design custom security uniforms, tactical jackets, hoodies, and workwear online — free. Sialkot Sample Masters' 2D Customizer lets B2B buyers add logos, choose colors, apply camo patterns, and export production-ready designs in minutes. No software needed."
                canonical="/design-studio"
            />

            {/* ── HERO ─────────────────────────────────────────────────────────── */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-background">
                {/* Animated background grid */}
                <div className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: "linear-gradient(rgba(212,175,55,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.07) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                {/* Gold glow blob */}
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-5 bg-gold blur-[120px] z-0" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left — copy */}
                        <FadeIn>
                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-bold uppercase tracking-widest mb-6">
                                    <Wand2 className="w-3.5 h-3.5" /> Free Online Tool
                                </span>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-condensed tracking-tight text-foreground leading-none mb-6">
                                    Design Your<br />
                                    <span className="text-gold">Uniform</span><br />
                                    Online — Free
                                </h1>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                                    Sialkot Sample Masters' <strong className="text-foreground">2D Uniform Customizer</strong> lets B2B buyers, procurement teams, and distributors design custom security uniforms, tactical jackets, hoodies, and workwear directly in their browser — with zero software, zero cost, and zero friction.
                                </p>
                                <div className="flex flex-wrap gap-4 mb-10">
                                    {["No signup required", "Mobile-friendly", "Export in HD"].map(b => (
                                        <span key={b} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" /> {b}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/design">
                                        <Button size="lg" className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-8 py-4 rounded-sm gap-2 shadow-lg shadow-gold/20">
                                            Launch 2D Designer <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                    <Link href="/rfq">
                                        <Button size="lg" variant="outline" className="border-border font-condensed font-semibold tracking-widest uppercase text-sm px-8 py-4 rounded-sm gap-2">
                                            Request Quote
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right — mockup preview card */}
                        <FadeIn delay={0.2}>
                            <div className="relative">
                                <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-foreground/10">
                                    <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-destructive/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                        <span className="ml-3 text-xs text-muted-foreground font-mono">sialkotsamplemasters.com/design</span>
                                    </div>
                                    <div className="p-8 bg-[#0d0d18] min-h-[320px] flex items-center justify-center relative"
                                        style={{
                                            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                                            backgroundSize: "20px 20px",
                                        }}>
                                        {/* Jacket SVG placeholder illustration */}
                                        <div className="text-center">
                                            <div className="text-8xl mb-4">🧥</div>
                                            <div className="flex gap-2 justify-center mb-3">
                                                {["#1a1a2e", "#0f3460", "#d4af37", "#2d6a4f", "#8b0000"].map(c => (
                                                    <div key={c} className="w-7 h-7 rounded-full border-2 border-white/10 cursor-pointer hover:scale-110 transition-transform" style={{ background: c }} />
                                                ))}
                                            </div>
                                            <p className="text-xs text-white/30 font-mono tracking-wider">SELECT A PART · CHOOSE COLOR · PLACE LOGO</p>
                                        </div>
                                    </div>
                                    {/* Bottom toolbar preview */}
                                    <div className="bg-[#080812] border-t border-white/5 px-6 py-3 flex justify-around">
                                        {[
                                            { icon: "🎨", label: "Colors" },
                                            { icon: "🖼️", label: "Logo" },
                                            { icon: "✏️", label: "Text" },
                                            { icon: "🎭", label: "Pattern" },
                                            { icon: "💾", label: "Export" },
                                        ].map(t => (
                                            <div key={t.label} className="flex flex-col items-center gap-1">
                                                <span className="text-lg">{t.icon}</span>
                                                <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{t.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Floating badge */}
                                <div className="absolute -top-4 -right-4 bg-gold text-background text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                                    100% Free
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
            <section className="border-y border-border bg-card/30">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
                        {[
                            { value: "8", label: "Garment Templates" },
                            { value: "32+", label: "Preset Colors" },
                            { value: "4", label: "Camo Patterns" },
                            { value: "2×", label: "HD Export Resolution" },
                            { value: "<1 min", label: "To First Design" },
                        ].map(s => (
                            <div key={s.label} className="flex flex-col items-center">
                                <span className="text-2xl font-extrabold font-condensed text-gold tracking-wide">{s.value}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Simple 4-Step Process</p>
                            <h2 className="text-4xl sm:text-5xl font-extrabold font-condensed text-foreground tracking-tight">
                                How the 2D Uniform Designer Works
                            </h2>
                            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
                                From blank canvas to production-ready design in under five minutes — no design background required.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                className="relative"
                            >
                                <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-gold/30 transition-colors">
                                    <div className="text-5xl font-black font-condensed text-gold/15 leading-none mb-4">{step.number}</div>
                                    <h3 className="text-lg font-bold text-foreground mb-3 font-condensed tracking-wide">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <ArrowRight className="w-5 h-5 text-gold/30" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/design">
                            <Button size="lg" className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase px-10 gap-2">
                                Start Designing Now <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ─────────────────────────────────────────────────────── */}
            <section className="py-24 bg-card/20 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Tool Capabilities</p>
                            <h2 className="text-4xl sm:text-5xl font-extrabold font-condensed text-foreground tracking-tight">
                                Everything You Need to Design<br />Professional Uniforms Online
                            </h2>
                            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
                                The Sialkot Sample Masters 2D Uniform Designer packs professional-grade customization tools into a simple, mobile-friendly interface designed for B2B buyers.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerChildren>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {FEATURES.map((f) => (
                                <AnimatedChild key={f.title}>
                                    <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all group">
                                        <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4 group-hover:bg-gold/15 transition-colors">
                                            {f.icon}
                                        </div>
                                        <h3 className="text-base font-bold text-foreground mb-2 font-condensed tracking-wide">{f.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                                    </div>
                                </AnimatedChild>
                            ))}
                        </div>
                    </StaggerChildren>
                </div>
            </section>

            {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Supported Garments</p>
                            <h2 className="text-4xl sm:text-5xl font-extrabold font-condensed text-foreground tracking-tight">
                                Products You Can Customize Online
                            </h2>
                            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
                                Design any of our core uniform categories directly in the 2D customizer. New templates are added regularly.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {PRODUCTS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                            >
                                <Link href="/design">
                                    <div className="bg-card border border-border rounded-xl p-5 text-center hover:border-gold/40 hover:bg-card/80 transition-all cursor-pointer group">
                                        <div className="text-4xl mb-3">{p.emoji}</div>
                                        <h3 className="text-sm font-bold text-foreground font-condensed tracking-wide mb-1 group-hover:text-gold transition-colors">{p.name}</h3>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
            <section className="py-24 bg-card/20 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div>
                                <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Why Use It</p>
                                <h2 className="text-4xl sm:text-5xl font-extrabold font-condensed text-foreground tracking-tight mb-6">
                                    Built for B2B Buyers,<br />Procurement Teams &amp;<br />Distributors
                                </h2>
                                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                                    Ordering bulk uniforms from overseas manufacturers has historically required multiple rounds of physical samples, lengthy email chains, and costly revision fees. Sialkot Sample Masters's 2D designer eliminates this entirely — giving your team a shared visual tool to align on design before a single stitch is made.
                                </p>
                                <Link href="/design">
                                    <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase gap-2">
                                        Open the Designer <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </FadeIn>
                        <StaggerChildren>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {BENEFITS.map(b => (
                                    <AnimatedChild key={b.title}>
                                        <div className="bg-card border border-border rounded-xl p-5 hover:border-gold/30 transition-colors">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-gold">{b.icon}</span>
                                                <h3 className="text-sm font-bold text-foreground font-condensed tracking-wide">{b.title}</h3>
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                                        </div>
                                    </AnimatedChild>
                                ))}
                            </div>
                        </StaggerChildren>
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────────────────── */}
            <section className="py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-3">Common Questions</p>
                            <h2 className="text-4xl sm:text-5xl font-extrabold font-condensed text-foreground tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <motion.details
                                key={faq.q}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className="group bg-card border border-border rounded-xl overflow-hidden"
                            >
                                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none hover:bg-secondary/30 transition-colors">
                                    <span className="font-semibold text-foreground text-sm font-condensed tracking-wide pr-4">{faq.q}</span>
                                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-6 pb-5">
                                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                                </div>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
            <section className="py-24 bg-card/20 border-t border-border">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-1.5 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
                            <span className="text-xs text-muted-foreground ml-2">Trusted by procurement teams in 40+ countries</span>
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-extrabold font-condensed tracking-tight text-foreground mb-6">
                            Ready to Design Your<br /><span className="text-gold">Custom Uniform?</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                            Launch the free 2D Uniform Designer now. No account, no download, no fee. Start from a template and have a production-ready visual in under 5 minutes.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/design">
                                <Button size="lg" className="bg-gold text-background hover:bg-gold/90 font-condensed font-black tracking-widest uppercase text-base px-12 py-5 rounded-sm gap-2 shadow-xl shadow-gold/20">
                                    Launch Free Designer <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/rfq">
                                <Button size="lg" variant="outline" className="border-border font-condensed font-semibold tracking-widest uppercase text-sm px-8 rounded-sm">
                                    Request a Sample Quote
                                </Button>
                            </Link>
                        </div>
                        <p className="text-xs text-muted-foreground mt-6">
                            Based in Sialkot, Pakistan · ISO-aligned manufacturing · MOQ from 50 pieces · 24-hour RFQ response
                        </p>
                    </FadeIn>
                </div>
            </section>
        </PageWrapper>
    );
}
