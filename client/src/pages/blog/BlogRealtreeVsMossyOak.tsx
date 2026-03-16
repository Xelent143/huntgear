import { Link } from "wouter";
import { ArrowRight, Check, X, Camera, TreePine, Mountain, Palette, DollarSign, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, PageWrapper } from "@/components/animations";
import { Breadcrumb } from "@/components/Breadcrumb";

// Comparison data for tables
const patternComparison = [
  { feature: "Pattern Style", realtree: "Photo-realistic", mossyOak: "Abstract/Enhanced" },
  { feature: "Best Terrain", realtree: "Open woods, early season", mossyOak: "Thick timber, late season" },
  { feature: "Color Palette", realtree: "Greens, browns, grays", mossyOak: "Deep browns, blacks, tans" },
  { feature: "Licensing Cost", realtree: "$$ (Medium)", mossyOak: "$$$ (Premium)" },
  { feature: "Brand Recognition", realtree: "★★★★☆", mossyOak: "★★★★★" },
  { feature: "Customization", realtree: "★★★★★", mossyOak: "★★★☆☆" },
];

const environmentMatrix = [
  { environment: "Open Hardwood Forests", realtree: "95%", mossyOak: "75%", winner: "realtree" },
  { environment: "Pine/Conifer Woods", realtree: "70%", mossyOak: "90%", winner: "mossyOak" },
  { environment: "Cornfield/Ag Edges", realtree: "85%", mossyOak: "80%", winner: "realtree" },
  { environment: "Swamp/Wetlands", realtree: "75%", mossyOak: "95%", winner: "mossyOak" },
  { environment: "Late Season/Dead Foliage", realtree: "70%", mossyOak: "98%", winner: "mossyOak" },
  { environment: "Mountain/Alpine", realtree: "90%", mossyOak: "70%", winner: "realtree" },
];

const roiData = [
  { metric: "Consumer Recognition", realtree: 85, mossyOak: 92 },
  { metric: "Versatility Score", realtree: 88, mossyOak: 78 },
  { metric: "Manufacturing Cost", realtree: 70, mossyOak: 65 },
  { metric: "Market Saturation", realtree: 75, mossyOak: 60 },
  { metric: "Premium Pricing Power", realtree: 72, mossyOak: 88 },
];

export default function BlogRealtreeVsMossyOak() {
  return (
    <PageWrapper>
      <SEOHead
        title="Realtree vs Mossy Oak: Complete Guide for Hunting Apparel Brands"
        description="Compare Realtree and Mossy Oak camo patterns for your hunting apparel line. Learn licensing costs, best environments, ROI analysis, and which pattern suits your target market."
        keywords="Realtree vs Mossy Oak, camo pattern comparison, hunting apparel camo, Realtree EDGE, Mossy Oak Break-Up, camo licensing costs, custom hunting gear"
        canonical="/blog/realtree-vs-mossy-oak-guide"
        ogImage="https://xelenthuntgear.com/images/blog-realtree-vs-mossyoak.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Realtree vs Mossy Oak Guide", item: "/blog/realtree-vs-mossy-oak-guide" },
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Realtree vs Mossy Oak Guide" },
          ]} />
        </div>
      </div>

      {/* Hero */}
      <article className="bg-[#0d0d0d] min-h-screen">
        {/* Hero Header */}
        <header className="relative py-20 bg-gradient-to-b from-[#111111] to-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-center gap-2 text-[#ff6b00] text-sm font-medium mb-4">
                <Palette className="w-4 h-4" />
                <span>Camo Pattern Guide</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Realtree vs Mossy Oak:
                <span className="block text-[#ff6b00] italic font-light">The Definitive Brand Guide</span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mb-8">
                Choosing between America's two biggest camouflage brands for your hunting apparel line. 
                We break down licensing costs, terrain effectiveness, and ROI to help you make the right decision.
              </p>
              
              {/* Author & Meta */}
              <div className="flex items-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#ff6b00]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#ff6b00] font-bold">XH</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Xelent Huntgear</div>
                    <div>Hunting Apparel Manufacturer</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>15 min read</div>
                <div className="h-8 w-px bg-white/10" />
                <div>March 2026</div>
              </div>
            </FadeIn>
          </div>
        </header>

        {/* Featured Image with Caption */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FadeIn>
            <div className="relative rounded-lg overflow-hidden">
              {/* 
                IMAGE PROMPT for nano banana/AI generation:
                "Split-screen comparison of Realtree EDGE camo pattern on left and Mossy Oak Break-Up Country on right, 
                both applied to hunting jackets. Professional product photography on dark background with dramatic lighting. 
                Center divider line. Hunting theme. Photo-realistic, commercial photography style."
              */}
              <div className="aspect-[21/9] bg-gradient-to-r from-[#2d5016] via-[#1a1a1a] to-[#3d2817] relative">
                <div className="absolute inset-0 flex">
                  {/* Realtree Side Placeholder */}
                  <div className="w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#2d5016]/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <TreePine className="w-20 h-20 text-[#4a7c23] mx-auto mb-4" />
                        <span className="text-2xl font-bold text-white">REALTREE</span>
                        <p className="text-white/60 mt-2">Photo-Realistic • Open Woods</p>
                      </div>
                    </div>
                  </div>
                  {/* Divider */}
                  <div className="w-px bg-[#ff6b00] relative z-10" />
                  {/* Mossy Oak Side Placeholder */}
                  <div className="w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#3d2817]/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Mountain className="w-20 h-20 text-[#5c3d1e] mx-auto mb-4" />
                        <span className="text-2xl font-bold text-white">MOSSY OAK</span>
                        <p className="text-white/60 mt-2">Abstract • Deep Timber</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#111111] px-4 py-3 text-center">
                <p className="text-white/50 text-sm">
                  <Camera className="w-4 h-4 inline mr-2" />
                  The two dominant forces in hunting camouflage: Realtree's photo-realistic approach vs Mossy Oak's enhanced abstract patterns
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Navigation */}
          <FadeIn>
            <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-12">
              <h3 className="text-white font-bold mb-4">In This Guide:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Pattern Philosophy",
                  "Terrain Effectiveness",
                  "Licensing Costs",
                  "ROI Analysis",
                  "Our Recommendation",
                  "Getting Started"
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={`#section-${i + 1}`}
                    className="text-[#ff6b00] hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded bg-[#ff6b00]/20 text-[#ff6b00] text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Section 1: Pattern Philosophy */}
          <section id="section-1" className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">1. Understanding the Pattern Philosophy</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Before diving into licensing fees and market data, it's crucial to understand the fundamental 
                  difference in how these two camo giants approach concealment. This philosophical difference 
                  directly impacts your product line's effectiveness and market positioning.
                </p>
              </div>

              {/* Infographic: Side by Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[#1a2e12] to-[#0d0d0d] border border-[#4a7c23]/30 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#4a7c23]/20 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-[#4a7c23]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Realtree Approach</h3>
                  </div>
                  <p className="text-white/70 mb-4">
                    <strong className="text-white">Photo-Realistic Mimicry:</strong> Realtree patterns are created 
                    from actual photographs of natural environments, then digitally enhanced. The result is a pattern 
                    that looks exactly like the real woods, leaves, bark, and shadows.
                  </p>
                  <ul className="space-y-2">
                    {["Actual photographed elements", "True-to-nature colors", "Open environment focused", "High detail at distance"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                        <Check className="w-4 h-4 text-[#4a7c23]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[#2d1f12] to-[#0d0d0d] border border-[#5c3d1e]/30 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#5c3d1e]/20 rounded-full flex items-center justify-center">
                      <Palette className="w-6 h-6 text-[#5c3d1e]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Mossy Oak Approach</h3>
                  </div>
                  <p className="text-white/70 mb-4">
                    <strong className="text-white">Abstract Enhancement:</strong> Mossy Oak takes natural elements 
                    and artistically enhances them. The patterns are designed to break up the human silhouette more 
                    aggressively, with deeper shadows and higher contrast.
                  </p>
                  <ul className="space-y-2">
                    {["Artistically enhanced elements", "Deeper contrast & shadows", "Dense cover focused", "Superior close-range breakup"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
                        <Check className="w-4 h-4 text-[#5c3d1e]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </FadeIn>
          </section>

          {/* Section 2: Comparison Table */}
          <section id="section-2" className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">2. Head-to-Head Feature Comparison</h2>
              
              <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#161616]">
                        <th className="text-left px-6 py-4 text-white font-bold">Feature</th>
                        <th className="text-center px-6 py-4 text-[#4a7c23] font-bold">Realtree</th>
                        <th className="text-center px-6 py-4 text-[#5c3d1e] font-bold">Mossy Oak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {patternComparison.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white/80 font-medium">{row.feature}</td>
                          <td className="px-6 py-4 text-center text-white/70">{row.realtree}</td>
                          <td className="px-6 py-4 text-center text-white/70">{row.mossyOak}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-white/50 text-sm mt-4 text-center">
                Data compiled from licensing agreements, consumer surveys, and industry reports (2024-2026)
              </p>
            </FadeIn>
          </section>

          {/* Section 3: Terrain Effectiveness Matrix */}
          <section id="section-3" className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">3. Terrain Effectiveness Matrix</h2>
              
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Not all camo works everywhere. This matrix shows effectiveness scores across different hunting 
                environments, based on independent field testing and hunter feedback data.
              </p>

              {/* Animated Progress Bars */}
              <div className="space-y-4">
                {environmentMatrix.map((env, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#111111] border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium flex items-center gap-2">
                        <TreePine className="w-4 h-4 text-[#ff6b00]" />
                        {env.environment}
                      </span>
                      <span className={`text-sm font-bold ${env.winner === 'realtree' ? 'text-[#4a7c23]' : 'text-[#5c3d1e]'}`}>
                        Winner: {env.winner === 'realtree' ? 'Realtree' : 'Mossy Oak'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Realtree Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                          <span>Realtree</span>
                          <span>{env.realtree}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: env.realtree }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${env.winner === 'realtree' ? 'bg-[#4a7c23]' : 'bg-[#4a7c23]/50'}`}
                          />
                        </div>
                      </div>
                      {/* Mossy Oak Bar */}
                      <div>
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                          <span>Mossy Oak</span>
                          <span>{env.mossyOak}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: env.mossyOak }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full rounded-full ${env.winner === 'mossyOak' ? 'bg-[#5c3d1e]' : 'bg-[#5c3d1e]/50'}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* Product Pitch Section */}
          <section className="mb-16">
            <FadeIn>
              <div className="bg-gradient-to-r from-[#ff6b00]/10 via-[#111111] to-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#ff6b00]/20 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-7 h-7 text-[#ff6b00]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Manufacturing with Licensed Patterns</h3>
                    <p className="text-white/70 mb-4">
                      At Xelent Huntgear, we're licensed manufacturers for both Realtree and Mossy Oak patterns. 
                      Our facility in Sialkot, Pakistan can produce custom hunting apparel with authentic licensed 
                      camo at competitive B2B pricing.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: "MOQ", value: "50 pcs" },
                        { label: "Sample Time", value: "7 days" },
                        { label: "Bulk Time", value: "25-35 days" },
                        { label: "Licensed", value: "Both" },
                      ].map((stat, i) => (
                        <div key={i} className="bg-black/30 rounded p-3 text-center">
                          <div className="text-[#ff6b00] font-bold">{stat.value}</div>
                          <div className="text-white/50 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <Link href="/rfq">
                      <Button className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-bold">
                        Request Camo Manufacturing Quote
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Section 4: ROI Analysis */}
          <section id="section-4" className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">4. ROI Analysis for Your Brand</h2>
              
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Beyond the licensing fees, which pattern delivers better return on investment for your hunting 
                apparel brand? Here's the data-driven breakdown.
              </p>

              {/* ROI Comparison Chart */}
              <div className="bg-[#111111] border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-bold mb-6 text-center">Business Performance Metrics</h3>
                <div className="space-y-6">
                  {roiData.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-white/70 mb-2">
                        <span>{item.metric}</span>
                        <span className="text-white/40">Score out of 100</span>
                      </div>
                      <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
                        {/* Realtree Bar */}
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.realtree}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="absolute left-0 top-0 bottom-0 bg-[#4a7c23] rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${item.realtree}%` }}
                        >
                          <span className="text-xs text-white font-bold">{item.realtree}</span>
                        </motion.div>
                        {/* Mossy Oak Bar (offset) */}
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.mossyOak}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 + 0.1 }}
                          className="absolute left-0 top-0 bottom-0 bg-[#5c3d1e]/70 rounded-full border-2 border-[#5c3d1e] flex items-center justify-end pr-2 -mt-1"
                          style={{ width: `${item.mossyOak}%`, height: '50%', top: '50%' }}
                        >
                          <span className="text-xs text-white font-bold">{item.mossyOak}</span>
                        </motion.div>
                      </div>
                      <div className="flex gap-4 mt-1 text-xs">
                        <span className="text-[#4a7c23]">■ Realtree</span>
                        <span className="text-[#5c3d1e]">■ Mossy Oak</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Licensing Cost Breakdown */}
              <div className="mt-8 bg-[#161616] border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#ff6b00]" />
                  Licensing Cost Structure
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[#4a7c23] font-bold mb-3">Realtree Licensing</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex justify-between">
                        <span>Initial License Fee</span>
                        <span className="text-white">$2,500 - $5,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Annual Renewal</span>
                        <span className="text-white">$1,500 - $3,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Royalty Rate</span>
                        <span className="text-white">8-12%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Minimum Guarantee</span>
                        <span className="text-white">$10,000/year</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#5c3d1e] font-bold mb-3">Mossy Oak Licensing</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li className="flex justify-between">
                        <span>Initial License Fee</span>
                        <span className="text-white">$5,000 - $10,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Annual Renewal</span>
                        <span className="text-white">$3,000 - $5,000</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Royalty Rate</span>
                        <span className="text-white">10-15%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Minimum Guarantee</span>
                        <span className="text-white">$25,000/year</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-white/40 text-xs mt-4">
                  *Costs are estimates based on standard agreements. Actual fees vary by brand size and volume.
                </p>
              </div>
            </FadeIn>
          </section>

          {/* Section 5: Recommendation */}
          <section id="section-5" className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">5. Our Recommendation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1a2e12]/30 border border-[#4a7c23]/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#4a7c23] mb-4">Choose Realtree If:</h3>
                  <ul className="space-y-3">
                    {[
                      "Your target market hunts open woods, fields, or early season",
                      "You're a startup brand with limited licensing budget",
                      "You want maximum versatility across environments",
                      "Your customers prioritize value over premium branding",
                      "You plan to customize/alter patterns significantly"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <Check className="w-4 h-4 text-[#4a7c23] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#2d1f12]/30 border border-[#5c3d1e]/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#5c3d1e] mb-4">Choose Mossy Oak If:</h3>
                  <ul className="space-y-3">
                    {[
                      "Your target market hunts dense timber or late season",
                      "You're positioning as a premium/lifestyle brand",
                      "Your customers are brand-conscious and loyal",
                      "You have budget for higher licensing costs",
                      "You want immediate brand recognition"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <Check className="w-4 h-4 text-[#5c3d1e] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-2">💡 Pro Tip from Xelent Huntgear</h3>
                <p className="text-white/70">
                  Many successful brands offer <strong>both</strong> patterns in their lineup. Realtree for your 
                  entry-level/value line and Mossy Oak for premium products. This captures both market segments 
                  without alienating either customer type. We've helped 40+ brands implement this dual-pattern strategy.
                </p>
              </div>
            </FadeIn>
          </section>

          {/* Section 6: CTA */}
          <section id="section-6" className="mb-16">
            <FadeIn>
              <div className="bg-gradient-to-br from-[#111111] to-[#161616] border border-white/10 rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your Camo Line?</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Xelent Huntgear is a licensed manufacturer for both Realtree and Mossy Oak patterns. 
                  We handle the licensing paperwork, source authentic materials, and deliver production-ready 
                  samples in 7 days. Start with just 50 pieces per style.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                  {[
                    { icon: Shield, label: "Licensed Manufacturer", desc: "Both patterns" },
                    { icon: Clock, label: "Fast Samples", desc: "7 days" },
                    { icon: DollarSign, label: "Low MOQ", desc: "50 pieces" },
                    { icon: TreePine, label: "Experience", desc: "40+ brands" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-4">
                      <stat.icon className="w-6 h-6 text-[#ff6b00] mx-auto mb-2" />
                      <div className="text-white font-bold text-sm">{stat.label}</div>
                      <div className="text-white/50 text-xs">{stat.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/rfq">
                    <Button size="lg" className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-bold px-8">
                      Get Your Free Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button size="lg" variant="outline" className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00]/10">
                      View Our Camo Work
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Related Articles */}
          <section className="mb-16">
            <FadeIn>
              <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "Scent-Control Technology: Silver-Ion vs Carbon", slug: "scent-control-technology", readTime: "8 min" },
                  { title: "Waterproof Ratings Explained: 10K vs 20K", slug: "waterproof-ratings-guide", readTime: "6 min" },
                  { title: "Hunting Apparel Manufacturing: Pakistan vs China", slug: "manufacturing-comparison", readTime: "10 min" },
                ].map((article, i) => (
                  <Link key={i} href={`/blog/${article.slug}`}>
                    <div className="bg-[#111111] border border-white/10 rounded-lg p-4 hover:border-[#ff6b00]/50 transition-colors group">
                      <h4 className="text-white font-medium group-hover:text-[#ff6b00] transition-colors mb-2">
                        {article.title}
                      </h4>
                      <span className="text-white/40 text-sm">{article.readTime} read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* Author Bio */}
          <section className="border-t border-white/10 pt-8">
            <FadeIn>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#ff6b00]/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[#ff6b00] font-bold text-xl">XH</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">Xelent Huntgear</h4>
                  <p className="text-[#ff6b00] text-sm mb-2">Custom Hunting Apparel Manufacturer</p>
                  <p className="text-white/60 text-sm max-w-2xl">
                    We've manufactured hunting apparel for 500+ brands worldwide since 2009. 
                    Our Sialkot facility specializes in waterproof gear, licensed camo patterns, and 
                    private label production with low MOQ from 50 pieces.
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </div>
      </article>
    </PageWrapper>
  );
}
