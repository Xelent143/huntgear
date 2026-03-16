import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";
import { motion } from "framer-motion";
import { FadeIn, StaggerChildren, AnimatedChild, PageWrapper } from "@/components/animations";

const portfolioItems = [
  {
    id: 1,
    title: "Whitetail Pro Line",
    client: "Backcountry Hunters USA",
    category: "Hunting Jackets",
    image: IMAGES.catHunting,
    tags: ["20K Waterproof", "Insulated", "Custom Camo"]
  },
  {
    id: 2,
    title: "Elk Hunter Series",
    client: "Alpine Gear Co.",
    category: "Layering System",
    image: IMAGES.catSports,
    tags: ["Merino Base", "Mid Layer", "Shell"]
  },
  {
    id: 3,
    title: "Waterfowl Collection",
    client: "Marsh Masters",
    category: "Waterfowl Gear",
    image: IMAGES.catStreetwear,
    tags: ["Waders", "Jackets", "Blind Camo"]
  },
  {
    id: 4,
    title: "Tactical Hunt Line",
    client: "Tactical Outdoors",
    category: "Tactical Wear",
    image: IMAGES.catTechwear,
    tags: ["MOLLE", "Ripstop", "Olive Drab"]
  },
  {
    id: 5,
    title: "Turkey Hunt Pro",
    client: "Spring Thunder",
    category: "Spring Gear",
    image: IMAGES.catSecurityUniforms,
    tags: ["Vests", "Masks", "Vest Camo"]
  },
  {
    id: 6,
    title: "Western Big Game",
    client: "Mountain Pursuit",
    category: "Western Hunting",
    image: IMAGES.catHunting,
    tags: ["Lightweight", "Packable", "Vias Camo"]
  },
];

export default function Portfolio() {
  return (
    <PageWrapper>
      <SEOHead
        title="Portfolio | Xelent Huntgear Manufacturing Work"
        description="View our portfolio of custom hunting apparel manufacturing. Waterproof jackets, camo systems, tactical gear produced for global brands. B2B case studies."
        canonical="/portfolio"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[60vh] bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.portfolioBg} alt="Portfolio" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60" />
        </div>

        <div className="relative z-10 min-h-[60vh] flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#ff6b00] font-condensed font-semibold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Our Work
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] mb-6"
            >
              Manufacturing
              <span className="block text-[#ff6b00] italic font-light">Portfolio</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-20 h-1 bg-[#ff6b00] origin-left mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-lg max-w-2xl leading-relaxed"
            >
              Selected projects showcasing our expertise in hunting apparel manufacturing. 
              From waterproof shells to custom camo systems, see what we've built for brands worldwide.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PORTFOLIO GRID
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            {portfolioItems.map((item) => (
              <AnimatedChild key={item.id} direction="up">
                <div className="group bg-[#111111] border border-white/10 overflow-hidden hover:border-[#ff6b00]/50 transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#ff6b00] text-black text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                        {item.category}
                      </span>
                    </div>

                    {/* View Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-[#ff6b00] flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-black" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{item.client}</p>
                    <h3 className="text-white font-condensed font-bold text-xl uppercase mb-4 group-hover:text-[#ff6b00] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-white/50 text-xs border border-white/10 px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedChild>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CTA
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #ff6b00 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Create Your
            <span className="block text-[#ff6b00]">Next Collection?</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Let's discuss your hunting apparel manufacturing needs. 
            Get a free quote with 7-day sample turnaround.
          </p>
          <Link href="/rfq">
            <Button className="bg-[#ff6b00] text-black hover:bg-[#ff8533] font-condensed font-bold uppercase tracking-wider text-lg px-12 py-4 h-auto shadow-[0_0_40px_rgba(255,107,0,0.4)]">
              Start Your Project <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
