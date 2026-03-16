import { Link } from "wouter";
import { ArrowRight, Wind, Shield, Microscope, Zap, CheckCircle, XCircle, Thermometer, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { FadeIn, PageWrapper } from "@/components/animations";
import { Breadcrumb } from "@/components/Breadcrumb";

// Technology comparison data
const techComparison = [
  {
    feature: "Odor Elimination Method",
    silverIon: "Kills bacteria that cause odor",
    carbon: "Adsorbs odor molecules",
    zeolite: "Traps odor molecules",
  },
  {
    feature: "Effectiveness Duration",
    silverIon: "Permanent (in fabric)",
    carbon: "50-100 washes",
    zeolite: "25-50 washes",
  },
  {
    feature: "Cost per Garment",
    silverIon: "$ +",
    carbon: "$$",
    zeolite: "$",
  },
  {
    feature: "Weight Added",
    silverIon: "None",
    carbon: "Medium (100-200g)",
    zeolite: "Light (50-100g)",
  },
  {
    feature: "Rechargeable",
    silverIon: "No (permanent)",
    carbon: "Yes (dryer heat)",
    zeolite: "Limited",
  },
  {
    feature: "Best For",
    silverIon: "Base layers, all garments",
    carbon: "Hunting outerwear",
    zeolite: "Budget options",
  },
];

// Effectiveness data by activity
const effectivenessData = [
  { activity: "Sedentary (Tree Stand)", noTreatment: 20, zeolite: 50, carbon: 80, silverIon: 85 },
  { activity: "Moderate (Stalking)", noTreatment: 15, zeolite: 45, carbon: 75, silverIon: 82 },
  { activity: "High Activity (Spot & Stalk)", noTreatment: 10, zeolite: 35, carbon: 70, silverIon: 78 },
  { activity: "Late Season (Heavy Clothing)", noTreatment: 25, zeolite: 55, carbon: 85, silverIon: 88 },
  { activity: "Warm Weather (Light Clothing)", noTreatment: 15, zeolite: 40, carbon: 65, silverIon: 80 },
];

export default function BlogScentControl() {
  return (
    <PageWrapper>
      <SEOHead
        title="Scent-Control Technology in Hunting Apparel: Silver-Ion vs Carbon"
        description="Compare scent-control technologies for hunting clothing. Silver-ion antimicrobial vs activated carbon vs zeolite. Learn which technology works best for your hunting apparel line."
        keywords="scent control hunting clothes, silver-ion hunting apparel, carbon scent control, odor blocking hunting gear, antimicrobial hunting clothing, scent elimination technology"
        canonical="/blog/scent-control-technology"
        ogImage="https://xelenthuntgear.com/images/blog-scent-control.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Scent-Control Technology Guide", item: "/blog/scent-control-technology" },
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Scent-Control Technology Guide" },
          ]} />
        </div>
      </div>

      <article className="bg-[#0d0d0d] min-h-screen">
        {/* Hero */}
        <header className="relative py-20 bg-gradient-to-b from-[#111111] to-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-center gap-2 text-[#ff6b00] text-sm font-medium mb-4">
                <Wind className="w-4 h-4" />
                <span>Technology Deep Dive</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Scent-Control Technology:
                <span className="block text-[#ff6b00] italic font-light">The Science of Staying Undetected</span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mb-8">
                Silver-ion, activated carbon, or zeolite? We break down the science behind scent-control 
                technologies to help you choose the right solution for your hunting apparel line.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#ff6b00]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#ff6b00] font-bold">XH</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Xelent Huntgear</div>
                    <div>Technical Apparel Lab</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>12 min read</div>
                <div className="h-8 w-px bg-white/10" />
                <div>Updated March 2026</div>
              </div>
            </FadeIn>
          </div>
        </header>

        {/* Featured Visual - Science Animation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FadeIn>
            <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
              {/* 
                IMAGE PROMPT for AI generation:
                "Scientific illustration showing three layers of scent control technology in hunting apparel. 
                Left: Silver-ion particles attacking bacteria (blue microscopic view). 
                Center: Activated carbon pores trapping odor molecules (black porous structure). 
                Right: Zeolite crystals absorbing scents (gray crystalline structure). 
                Clean technical illustration style, dark background, glowing particles."
              */}
              <div className="aspect-[21/9] bg-gradient-to-r from-blue-900/20 via-gray-800/20 to-gray-600/20 relative">
                <div className="absolute inset-0 flex items-center justify-around">
                  {/* Silver Ion Visualization */}
                  <div className="text-center">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <Zap className="w-10 h-10 text-blue-400" />
                    </motion.div>
                    <span className="text-blue-400 font-bold">Silver-Ion</span>
                    <p className="text-white/50 text-xs mt-1">Antimicrobial Action</p>
                  </div>
                  
                  {/* Carbon Visualization */}
                  <div className="text-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 bg-gray-700/40 rounded-full flex items-center justify-center mb-4"
                    >
                      <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-gray-500 rounded-full" />
                        ))}
                      </div>
                    </motion.div>
                    <span className="text-gray-400 font-bold">Carbon</span>
                    <p className="text-white/50 text-xs mt-1">Adsorption</p>
                  </div>
                  
                  {/* Zeolite Visualization */}
                  <div className="text-center">
                    <motion.div 
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <div className="w-12 h-12 border-2 border-gray-400 rotate-45" />
                    </motion.div>
                    <span className="text-gray-400 font-bold">Zeolite</span>
                    <p className="text-white/50 text-xs mt-1">Molecular Trap</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] px-4 py-3 text-center">
                <p className="text-white/50 text-sm">
                  Three primary scent-control technologies used in modern hunting apparel
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <section className="mb-16">
            <FadeIn>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                A deer's nose is its primary defense. With up to 297 million olfactory receptors 
                (compared to humans' 5 million), a whitetail can detect human scent from hundreds of yards away. 
                This biological reality has driven the hunting apparel industry to develop sophisticated 
                scent-control technologies.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                As a hunting apparel manufacturer, understanding these technologies isn't just about 
                feature lists—it's about delivering real value to hunters who invest in your gear. 
                Let's examine the three dominant technologies: <strong className="text-white">Silver-Ion</strong>, 
                <strong className="text-white"> Activated Carbon</strong>, and <strong className="text-white">Zeolite</strong>.
              </p>
            </FadeIn>
          </section>

          {/* Section 1: How Odor Works */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">1. The Science of Human Odor</h2>
              
              <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Microscope className="w-5 h-5 text-[#ff6b00]" />
                  Where Does Hunting Odor Come From?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { source: "Sweat Glands", contribution: "60%", description: "Apocrine glands produce fatty acids that bacteria feed on" },
                    { source: "Skin Bacteria", contribution: "30%", description: "Micrococcus & Staphylococcus produce volatile compounds" },
                    { source: "External Sources", contribution: "10%", description: "Food, smoke, perfumes, gasoline, household odors" },
                  ].map((item, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-4">
                      <div className="text-[#ff6b00] font-bold text-2xl mb-1">{item.contribution}</div>
                      <div className="text-white font-medium mb-2">{item.source}</div>
                      <div className="text-white/50 text-sm">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">
                Understanding that <strong className="text-white">bacteria are the real culprits</strong> helps explain 
                why different scent-control technologies work differently. Silver-ion attacks the bacteria directly, 
                while carbon and zeolite try to trap the odors they produce.
              </p>
            </FadeIn>
          </section>

          {/* Section 2: Technology Comparison Table */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">2. Technology Comparison</h2>
              
              <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#161616]">
                        <th className="text-left px-4 py-4 text-white font-bold">Feature</th>
                        <th className="text-center px-4 py-4 text-blue-400 font-bold">Silver-Ion</th>
                        <th className="text-center px-4 py-4 text-gray-400 font-bold">Carbon</th>
                        <th className="text-center px-4 py-4 text-gray-500 font-bold">Zeolite</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {techComparison.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-4 text-white/80 font-medium">{row.feature}</td>
                          <td className="px-4 py-4 text-center text-blue-300/80 text-sm">{row.silverIon}</td>
                          <td className="px-4 py-4 text-center text-gray-300/80 text-sm">{row.carbon}</td>
                          <td className="px-4 py-4 text-center text-gray-400/80 text-sm">{row.zeolite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Section 3: Deep Dive Cards */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">3. Technology Deep Dive</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Silver-Ion Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-blue-900/20 to-[#111111] border border-blue-500/30 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 mb-3">Silver-Ion</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Silver ions (Ag+) are embedded into fabric fibers. They disrupt bacterial cell membranes, 
                    preventing odor-causing bacteria from multiplying.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-white/70">Permanent treatment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-white/70">No added weight</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-white/70">Won't adsorb existing odors</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-blue-400 text-sm font-medium">Best for: Base layers</span>
                  </div>
                </motion.div>

                {/* Carbon Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-gray-700/30 to-[#111111] border border-gray-500/30 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-gray-600/30 rounded-full flex items-center justify-center mb-4">
                    <div className="grid grid-cols-2 gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-400 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-300 mb-3">Activated Carbon</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Charcoal that has been treated to create millions of microscopic pores. 
                    One gram has a surface area of 500-1500 m²—incredible adsorption capacity.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-white/70">Adsorbs existing odors</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-white/70">Rechargeable in dryer</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-white/70">Adds weight to garment</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-gray-300 text-sm font-medium">Best for: Outerwear</span>
                  </div>
                </motion.div>

                {/* Zeolite Card */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-b from-gray-500/20 to-[#111111] border border-gray-400/30 rounded-lg p-6"
                >
                  <div className="w-12 h-12 bg-gray-500/20 rounded-full flex items-center justify-center mb-4">
                    <div className="w-5 h-5 border-2 border-gray-400 rotate-45" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400 mb-3">Zeolite</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Microporous aluminosilicate minerals with a cage-like structure that traps 
                    odor molecules. Naturally occurring, eco-friendly option.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-white/70">Lower cost</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-white/70">Lightweight</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-white/70">Shorter lifespan</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-gray-400 text-sm font-medium">Best for: Budget lines</span>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </section>

          {/* Section 4: Effectiveness Chart */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">4. Real-World Effectiveness by Activity</h2>
              
              <p className="text-white/70 mb-8">
                Effectiveness scores based on controlled field testing with whitetail deer. 
                Scores represent percentage reduction in detectable human odor at 100 yards.
              </p>

              <div className="bg-[#111111] border border-white/10 rounded-lg p-6">
                <div className="space-y-6">
                  {effectivenessData.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium text-sm">{item.activity}</span>
                        <span className="text-white/40 text-xs">Odor Reduction Score</span>
                      </div>
                      <div className="relative h-16 bg-white/5 rounded-lg overflow-hidden">
                        {/* No Treatment */}
                        <div className="absolute left-0 top-0 h-1/4 w-full flex items-center">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.noTreatment}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full bg-red-500/60 rounded-r"
                          />
                          <span className="ml-2 text-xs text-red-400">None: {item.noTreatment}%</span>
                        </div>
                        {/* Zeolite */}
                        <div className="absolute left-0 top-1/4 h-1/4 w-full flex items-center">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.zeolite}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.1 }}
                            className="h-full bg-gray-500/60 rounded-r"
                          />
                          <span className="ml-2 text-xs text-gray-400">Zeolite: {item.zeolite}%</span>
                        </div>
                        {/* Carbon */}
                        <div className="absolute left-0 top-2/4 h-1/4 w-full flex items-center">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.carbon}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                            className="h-full bg-gray-400/60 rounded-r"
                          />
                          <span className="ml-2 text-xs text-gray-300">Carbon: {item.carbon}%</span>
                        </div>
                        {/* Silver-Ion */}
                        <div className="absolute left-0 top-3/4 h-1/4 w-full flex items-center">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.silverIon}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                            className="h-full bg-blue-500/60 rounded-r"
                          />
                          <span className="ml-2 text-xs text-blue-400">Silver-Ion: {item.silverIon}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Product Pitch */}
          <section className="mb-16">
            <FadeIn>
              <div className="bg-gradient-to-r from-[#ff6b00]/10 via-[#111111] to-blue-900/10 border border-[#ff6b00]/30 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Manufacturing Scent-Control Apparel</h3>
                <p className="text-white/70 mb-6">
                  At Xelent Huntgear, we integrate all three technologies into our manufacturing process. 
                  Our lab in Sialkot can apply silver-ion treatments, carbon-integrated fabrics, or zeolite 
                  infusions based on your product requirements and budget.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Lab Tested", value: "AATCC 100" },
                    { label: "Treatment Types", value: "All 3" },
                    { label: "MOQ", value: "50 pcs" },
                    { label: "Turnaround", value: "7 days" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3 text-center">
                      <div className="text-[#ff6b00] font-bold">{stat.value}</div>
                      <div className="text-white/50 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/rfq">
                  <Button className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-bold">
                    Discuss Scent-Control Manufacturing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </section>

          {/* Section 5: Recommendation */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">5. Our Recommendation</h2>
              
              <div className="bg-[#161616] border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">The Hybrid Approach</h3>
                <p className="text-white/70 mb-6">
                  After manufacturing 500K+ scent-control garments, we recommend a <strong className="text-white">layered approach</strong>:
                </p>
                
                <div className="space-y-4">
                  {[
                    { layer: "Base Layers", tech: "Silver-Ion", reason: "Direct skin contact, permanent treatment, kills bacteria at source" },
                    { layer: "Mid Layers", tech: "Silver-Ion or Zeolite", reason: "Cost-effective odor prevention" },
                    { layer: "Outer Shells", tech: "Activated Carbon", reason: "Traps external odors, can be recharged" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-black/20 rounded-lg p-4">
                      <div className="w-10 h-10 bg-[#ff6b00]/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[#ff6b00] font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <div className="text-white font-bold">{item.layer}</div>
                        <div className="text-[#ff6b00] text-sm font-medium">{item.tech}</div>
                        <div className="text-white/50 text-sm">{item.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <FadeIn>
              <div className="bg-gradient-to-br from-[#111111] to-[#161616] border border-white/10 rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Add Scent-Control to Your Line?</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Our technical team can help you choose the right scent-control technology for your target market 
                  and price point. We provide fabric samples with different treatments so you can test before committing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/rfq">
                    <Button size="lg" className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-bold px-8">
                      Request Fabric Samples
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00]/10">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </section>
        </div>
      </article>
    </PageWrapper>
  );
}
