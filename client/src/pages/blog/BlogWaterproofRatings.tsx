import { Link } from "wouter";
import { ArrowRight, Droplets, Thermometer, Wind, Shield, CheckCircle, AlertTriangle, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { FadeIn, PageWrapper } from "@/components/animations";
import { Breadcrumb } from "@/components/Breadcrumb";

// Waterproof rating data
const ratingData = [
  { 
    rating: "5,000mm", 
    label: "Entry", 
    use: "Light rain, short exposure", 
    pressure: "Light shower",
    suitable: ["Upland bird hunting", "Early season", "Backup jacket"],
    unsuitable: ["Heavy rain", "All-day hunts", "Waterfowl"]
  },
  { 
    rating: "10,000mm", 
    label: "Standard", 
    use: "Moderate rain, extended exposure", 
    pressure: "Steady rain",
    suitable: ["Deer hunting", "General use", "3-season"],
    unsuitable: ["Downpours", "Sitting in rain"]
  },
  { 
    rating: "15,000mm", 
    label: "Performance", 
    use: "Heavy rain, all-day hunts", 
    pressure: "Heavy rain",
    suitable: ["All-day sits", "Late season", "Mountain hunting"],
    unsuitable: ["Torrential downpours"]
  },
  { 
    rating: "20,000mm+", 
    label: "Professional", 
    use: "Extreme conditions, waterfowl", 
    pressure: "Torrential rain",
    suitable: ["Waterfowl hunting", "Alaska/Pacific NW", "Guide use"],
    unsuitable: []
  },
];

// Activity recommendations
const activityMatrix = [
  { activity: "Whitetail Treestand (Morning)", minRating: "10,000mm", recommended: "15,000mm", reason: "Long sits, condensation" },
  { activity: "Waterfowl Marsh", minRating: "15,000mm", recommended: "20,000mm", reason: "Constant moisture exposure" },
  { activity: "Elk Spot & Stalk", minRating: "10,000mm", recommended: "15,000mm", reason: "Variable mountain weather" },
  { activity: "Turkey Spring", minRating: "5,000mm", recommended: "10,000mm", reason: "Occasional showers" },
  { activity: "Upland Bird", minRating: "5,000mm", recommended: "10,000mm", reason: "Active movement" },
  { activity: "Late Season Big Game", minRating: "15,000mm", recommended: "20,000mm", reason: "Snow, extended sits" },
];

export default function BlogWaterproofRatings() {
  return (
    <PageWrapper>
      <SEOHead
        title="Waterproof Ratings Explained: 10K vs 20K for Hunting Jackets"
        description="Understand waterproof ratings for hunting apparel. Learn what 10,000mm vs 20,000mm means, hydrostatic head testing, and which rating is right for different hunting conditions."
        keywords="waterproof hunting jacket ratings, 10k vs 20k waterproof, hydrostatic head explained, hunting rain gear ratings, mm waterproof rating, hunting jacket waterproofing"
        canonical="/blog/waterproof-ratings-guide"
        ogImage="https://xelenthuntgear.com/images/blog-waterproof-ratings.jpg"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: "Waterproof Ratings Guide", item: "/blog/waterproof-ratings-guide" },
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { name: "Home", href: "/" },
            { name: "Blog", href: "/blog" },
            { name: "Waterproof Ratings Guide" },
          ]} />
        </div>
      </div>

      <article className="bg-[#0d0d0d] min-h-screen">
        {/* Hero */}
        <header className="relative py-20 bg-gradient-to-b from-[#111111] to-[#0d0d0d]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-center gap-2 text-[#ff6b00] text-sm font-medium mb-4">
                <Droplets className="w-4 h-4" />
                <span>Technical Standards Guide</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Waterproof Ratings:
                <span className="block text-[#ff6b00] italic font-light">10K vs 20K Explained</span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mb-8">
                What do those "mm" numbers actually mean? We break down hydrostatic head testing, 
                breathability trade-offs, and help you choose the right waterproof rating for your hunting apparel line.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#ff6b00]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#ff6b00] font-bold">XH</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Xelent Huntgear</div>
                    <div>ISO 9001 Certified Lab</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>10 min read</div>
                <div className="h-8 w-px bg-white/10" />
                <div>March 2026</div>
              </div>
            </FadeIn>
          </div>
        </header>

        {/* Water Pressure Visualization */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FadeIn>
            <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
              {/* 
                IMAGE PROMPT for AI generation:
                "Technical illustration showing water pressure testing for hunting apparel. 
                Cross-section view of fabric with water droplets under increasing pressure. 
                Show 5K, 10K, 15K, and 20K+ pressure levels with corresponding water column heights. 
                Clean technical diagram style with blue water, dark background, measurement indicators."
              */}
              <div className="aspect-[21/9] bg-gradient-to-b from-blue-900/10 to-[#0d0d0d] relative p-8">
                <h3 className="text-center text-white font-bold mb-8">Hydrostatic Head Pressure Visualization</h3>
                <div className="grid grid-cols-4 gap-4 h-full items-end">
                  {[
                    { rating: "5K", height: "25%", color: "bg-blue-400/40", label: "Light Rain" },
                    { rating: "10K", height: "50%", color: "bg-blue-500/50", label: "Steady Rain" },
                    { rating: "15K", height: "75%", color: "bg-blue-600/60", label: "Heavy Rain" },
                    { rating: "20K+", height: "95%", color: "bg-blue-700/70", label: "Extreme" },
                  ].map((item, i) => (
                    <div key={i} className="relative h-full flex flex-col justify-end">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: item.height }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`w-full ${item.color} rounded-t-lg relative`}
                      >
                        <div className="absolute top-2 left-0 right-0 text-center">
                          <Waves className="w-5 h-5 text-white/70 mx-auto" />
                        </div>
                      </motion.div>
                      <div className="text-center mt-2">
                        <div className="text-white font-bold">{item.rating}</div>
                        <div className="text-white/50 text-xs">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#0a0a0a] px-4 py-3 text-center">
                <p className="text-white/50 text-sm">
                  Higher "mm" ratings = taller water column = more pressure resistance
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What Does mm Mean */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">What Does "mm" Actually Mean?</h2>
              
              <div className="bg-[#111111] border border-white/10 rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Droplets className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Hydrostatic Head Testing (ISO 811)</h3>
                    <p className="text-white/70 mb-4">
                      The "mm" rating represents the height of a water column that fabric can withstand before 
                      leaking. A 10,000mm rating means the fabric holds back a column of water 10 meters (33 feet) tall.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded p-3">
                        <div className="text-blue-400 font-bold text-lg">1. Test Setup</div>
                        <p className="text-white/50 text-sm">Fabric sample secured in test apparatus</p>
                      </div>
                      <div className="bg-black/30 rounded p-3">
                        <div className="text-blue-400 font-bold text-lg">2. Pressure Applied</div>
                        <p className="text-white/50 text-sm">Water pressure increased gradually</p>
                      </div>
                      <div className="bg-black/30 rounded p-3">
                        <div className="text-blue-400 font-bold text-lg">3. Leak Point</div>
                        <p className="text-white/50 text-sm">Pressure at first drop = rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold mb-1">Important Note for Manufacturers</h4>
                    <p className="text-white/70 text-sm">
                      ISO 811 tests new fabric under controlled conditions. Real-world performance decreases with 
                      wear, washing, and contamination (dirt, oils, detergent residue). Always over-spec by 20-30% 
                      for hunting applications.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Rating Comparison Table */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">Waterproof Rating Breakdown</h2>
              
              <div className="space-y-4">
                {ratingData.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                            i === 0 ? 'bg-blue-400/20' : 
                            i === 1 ? 'bg-blue-500/20' : 
                            i === 2 ? 'bg-blue-600/20' : 'bg-blue-700/20'
                          }`}>
                            <Droplets className={`w-8 h-8 ${
                              i === 0 ? 'text-blue-400' : 
                              i === 1 ? 'text-blue-500' : 
                              i === 2 ? 'text-blue-600' : 'text-blue-700'
                            }`} />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">{item.rating}</div>
                            <div className="text-[#ff6b00] font-medium">{item.label} Level</div>
                          </div>
                        </div>
                        <div className="flex-1 md:px-6 md:border-l md:border-white/10">
                          <div className="text-white/70">{item.use}</div>
                          <div className="text-white/50 text-sm">{item.pressure}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-green-400 text-sm font-medium mb-2 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Suitable For
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.suitable.map((use, j) => (
                              <span key={j} className="bg-green-500/10 text-green-400 text-xs px-2 py-1 rounded">
                                {use}
                              </span>
                            ))}
                          </div>
                        </div>
                        {item.unsuitable.length > 0 && (
                          <div>
                            <div className="text-red-400 text-sm font-medium mb-2 flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" /> Not Ideal For
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {item.unsuitable.map((use, j) => (
                                <span key={j} className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded">
                                  {use}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </section>

          {/* Activity Matrix */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">Recommended Ratings by Hunt Type</h2>
              
              <div className="bg-[#111111] border border-white/10 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#161616]">
                        <th className="text-left px-4 py-4 text-white font-bold">Hunting Activity</th>
                        <th className="text-center px-4 py-4 text-white/70 font-medium">Minimum</th>
                        <th className="text-center px-4 py-4 text-[#ff6b00] font-bold">Recommended</th>
                        <th className="text-left px-4 py-4 text-white/70 font-medium">Why?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {activityMatrix.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-4 text-white font-medium">{row.activity}</td>
                          <td className="px-4 py-4 text-center text-white/50">{row.minRating}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="bg-[#ff6b00]/20 text-[#ff6b00] font-bold px-3 py-1 rounded">
                              {row.recommended}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-white/50 text-sm">{row.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Breathability Section */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">The Breathability Trade-Off</h2>
              
              <p className="text-white/70 mb-6">
                Higher waterproof ratings often mean lower breathability. Here's what you need to know 
                when specifying your hunting apparel.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#111111] border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wind className="w-6 h-6 text-[#ff6b00]" />
                    <h3 className="text-xl font-bold text-white">MVTR (Breathability)</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    Moisture Vapor Transmission Rate measures how much sweat can escape (measured in 
                    g/m²/24hr). For hunting:
                  </p>
                  <ul className="space-y-2">
                    {[
                      { label: "Entry", value: "5,000g - Minimal activity" },
                      { label: "Standard", value: "10,000g - Moderate activity" },
                      { label: "Performance", value: "15,000g - Active hunting" },
                      { label: "Professional", value: "20,000g+ - High exertion" },
                    ].map((item, i) => (
                      <li key={i} className="flex justify-between text-sm">
                        <span className="text-white/50">{item.label}:</span>
                        <span className="text-white">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#111111] border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Thermometer className="w-6 h-6 text-[#ff6b00]" />
                    <h3 className="text-xl font-bold text-white">The Sweat Trap</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    A 20K/5K jacket (20K waterproof, 5K breathable) will keep rain out but trap sweat 
                    during active hunts. Result: you're wet from the inside.
                  </p>
                  <div className="bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded p-3">
                    <p className="text-white text-sm">
                      <strong>Rule of Thumb:</strong> Keep waterproof and breathability ratings within 
                      5,000mm of each other for balanced performance.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Manufacturing Pitch */}
          <section className="mb-16">
            <FadeIn>
              <div className="bg-gradient-to-r from-blue-900/20 via-[#111111] to-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Manufacturing Waterproof Hunting Gear</h3>
                <p className="text-white/70 mb-6">
                  Xelent Huntgear is equipped for full waterproof manufacturing: 3-layer laminates, 
                  seam sealing, DWR treatments, and hydrostatic head testing to ISO 811 standards. 
                  We offer ratings from 10K/10K to 20K/20K.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Test Standard", value: "ISO 811" },
                    { label: "Ratings", value: "10K-20K" },
                    { label: "Seam Sealing", value: "Hot Air" },
                    { label: "MOQ", value: "50 pcs" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3 text-center">
                      <div className="text-[#ff6b00] font-bold">{stat.value}</div>
                      <div className="text-white/50 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link href="/rfq">
                  <Button className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-bold">
                    Discuss Waterproof Manufacturing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </section>

          {/* Quick Reference */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-6">Quick Reference: Our Recommendations</h2>
              
              <div className="bg-[#161616] border border-white/10 rounded-lg p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-black/30 rounded-lg">
                    <div className="text-3xl mb-2">🎯</div>
                    <h4 className="text-white font-bold mb-2">Entry Line</h4>
                    <div className="text-[#ff6b00] font-bold">10K/10K</div>
                    <p className="text-white/50 text-sm mt-2">Weekend hunters, budget-conscious</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg border border-[#ff6b00]/30">
                    <div className="text-3xl mb-2">🏆</div>
                    <h4 className="text-white font-bold mb-2">Mid-Range</h4>
                    <div className="text-[#ff6b00] font-bold">15K/15K</div>
                    <p className="text-white/50 text-sm mt-2">Serious hunters, best value</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-lg">
                    <div className="text-3xl mb-2">💎</div>
                    <h4 className="text-white font-bold mb-2">Premium</h4>
                    <div className="text-[#ff6b00] font-bold">20K/20K</div>
                    <p className="text-white/50 text-sm mt-2">Guides, extreme conditions</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* CTA */}
          <section className="mb-16">
            <FadeIn>
              <div className="bg-gradient-to-br from-[#111111] to-[#161616] border border-white/10 rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing the Right Rating?</h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-8">
                  Our technical team can recommend the optimal waterproof/breathability combination 
                  based on your target market and price point. We provide fabric samples for testing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/rfq">
                    <Button size="lg" className="bg-[#ff6b00] hover:bg-[#ff8533] text-black font-bold px-8">
                      Request Waterproof Samples
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button size="lg" variant="outline" className="border-[#ff6b00] text-[#ff6b00] hover:bg-[#ff6b00]/10">
                      View Our Capabilities
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
