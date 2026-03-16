import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper, SectionHeading } from "@/components/animations";
import { IMAGES } from "@/lib/images";

const posts = [
  // Hunting Apparel Focus - New Posts
  {
    slug: "realtree-vs-mossy-oak-guide",
    title: "Realtree vs Mossy Oak: Complete Guide for Hunting Apparel Brands",
    excerpt: "Choosing between America's two biggest camouflage brands for your hunting apparel line. We break down licensing costs, terrain effectiveness, and ROI to help you make the right decision.",
    category: "Camo Guide",
    readTime: "15 min read",
    date: "March 16, 2026",
    image: IMAGES.catHunting,
    featured: true,
  },
  {
    slug: "scent-control-technology",
    title: "Scent-Control Technology in Hunting Apparel: Silver-Ion vs Carbon",
    excerpt: "Compare scent-control technologies for hunting clothing. Silver-ion antimicrobial vs activated carbon vs zeolite. Learn which technology works best for your hunting apparel line.",
    category: "Technology Guide",
    readTime: "12 min read",
    date: "March 16, 2026",
    image: IMAGES.catTechwear,
    featured: false,
  },
  {
    slug: "waterproof-ratings-guide",
    title: "Waterproof Ratings Explained: 10K vs 20K for Hunting Jackets",
    excerpt: "Understand waterproof ratings for hunting apparel. Learn what 10,000mm vs 20,000mm means, hydrostatic head testing, and which rating is right for different hunting conditions.",
    category: "Technical Guide",
    readTime: "10 min read",
    date: "March 16, 2026",
    image: IMAGES.capWaterproof,
    featured: false,
  },
  {
    slug: "how-to-find-streetwear-manufacturer-pakistan",
    title: "How to Find a Reliable Custom Streetwear Manufacturer in Pakistan",
    excerpt: "A comprehensive guide for brand owners looking to source custom streetwear from Pakistan. Learn what to look for, questions to ask, and red flags to avoid when choosing a B2B manufacturing partner.",
    category: "Manufacturing Guide",
    readTime: "8 min read",
    date: "February 15, 2026",
    image: IMAGES.servicesBg,
    featured: true,
  },
  {
    slug: "cmt-outsourcing-guide-sialkot",
    title: "The Sialkot Exporter's Guide to Outsourcing CMT Production",
    excerpt: "Transform your production floor without the overhead. Learn how to leverage Sialkot's specialized CMT units to scale your export brand.",
    category: "Manufacturing Guide",
    readTime: "10 min read",
    date: "March 12, 2026",
    image: IMAGES.servicePattern,
    featured: false,
  },
  {
    slug: "sublimation-printing-guide-sportswear",
    title: "Everything You Need to Know About Digital Sublimation Printing for Sportswear in 2026",
    excerpt: "Why the world's top sports brands choose sublimation for performance. A deep dive into the science of gas-to-fiber printing.",
    category: "Technical Guide",
    readTime: "8 min read",
    date: "March 12, 2026",
    image: IMAGES.servicePrinting,
    featured: false,
  },
  {
    slug: "cad-vs-manual-pattern-drafting-guide",
    title: "CAD vs Manual Pattern Drafting: Why Exporters Should Switch to Digital Patterns",
    excerpt: "In the high-stakes world of apparel exports, a 1% saving in fabric can equal thousands of dollars in profit. Discover why manual drafting is costing you money.",
    category: "Efficiency Insights",
    readTime: "7 min read",
    date: "March 12, 2026",
    image: IMAGES.servicePattern,
    featured: false,
  },
  {
    slug: "apparel-manufacturing-qc-checklist",
    title: "The Ultimate Checklist for Quality Control in Sialkot Apparel Manufacturing",
    excerpt: "One 'bad batch' can destroy a decade of trust. Master the AQL standards and auditing pipelines used by the world's most successful exporters.",
    category: "Quality Assurance",
    readTime: "9 min read",
    date: "March 12, 2026",
    image: IMAGES.serviceQC,
    featured: false,
  },
  {
    slug: "3-mistakes-ordering-custom-patches-badges",
    title: "Top 3 Mistakes Sialkot Exporters Make When Ordering Custom Patches and Badges",
    excerpt: "Avoid costly mistakes in custom patch and badge ordering. Learn about resolution, backing types, and detail density for international export standards.",
    date: "March 15, 2026",
    category: "QC & Finishing",
    image: "/patches_bad_vs_good_comparison_1773484450519.png",
    readTime: "6 min read"
  },
  {
    slug: "calculate-cmt-costs-export-shipment",
    title: "How to Calculate CMT Costs for Your Next Export Shipment",
    excerpt: "A definitive guide to calculating Cut, Make, Trim (CMT) costs for streetwear exports. Learn how to optimize your production budget with Sialkot Sample Masters.",
    date: "March 14, 2026",
    category: "Manufacturing strategy",
    image: "/cmt_cost_breakdown_pie_1773440983080.png",
    readTime: "8 min read"
  },
  {
    slug: "cad-grading-international-sizing-importance",
    title: "The Importance of Accurate CAD Grading for International Sizing Charts",
    excerpt: "Discover why digital CAD grading is critical for international apparel exports. Learn about precision, fabric efficiency, and global sizing compliance.",
    category: "Industry Standards",
    readTime: "8 min read",
    date: "March 13, 2026",
    image: "/cad_grading_accuracy_comparison_1773426576624.png",
    featured: false,
  },
  {
    slug: "3d-puff-embroidery-streetwear-impact",
    title: "How 3D Puff Embroidery Can elevate Your Streetwear Export Orders",
    excerpt: "Learn how 3D puff embroidery elevates brand perception and justifies premium pricing for streetwear export orders from Sialkot.",
    category: "Technical Elevation",
    readTime: "6 min read",
    date: "March 12, 2026",
    image: "/3d_puff_anatomy_infographic_1773278576854.png",
    featured: false,
  },
  {
    slug: "5-signs-change-sublimation-vendor",
    title: "5 Signs You Need to Change Your Current Sublimation Printing Vendor",
    excerpt: "Low vibrancy, muddy blacks, or peeling logos? Learn how to spot the red flags in your sublimation apparel production before it costs you an export contract.",
    category: "Quality Alert",
    readTime: "7 min read",
    date: "March 12, 2026",
    image: "/sublimation_red_flags_comparison_1773277691076.png",
    featured: false,
  },
  {
    slug: "why-sportswear-brands-outsource-cmt-sialkot",
    title: "Why Sialkot Sportswear Brands are Outsourcing to Specialized CMT Units",
    excerpt: "Discover why the leading sportswear exporters in Sialkot are moving toward a lean manufacturing model by outsourcing stitching to specialized CMT partner units.",
    category: "Industry Analysis",
    readTime: "8 min read",
    date: "March 12, 2026",
    image: "/cmt_value_chain_infographic_1773276832953.png",
    featured: false,
  },
  {
    slug: "low-moq-streetwear-manufacturing-guide",
    title: "Low MOQ Streetwear Manufacturing: The Complete Guide for Emerging Brands",
    excerpt: "Starting a streetwear brand doesn't require massive upfront investment. Discover how low MOQ manufacturing works, what to expect, and how to scale from 50 to 5,000 units.",
    category: "Brand Building",
    readTime: "6 min read",
    date: "February 8, 2026",
    image: IMAGES.catStreetwear,
    featured: false,
  },

  {
    slug: "private-label-hunting-wear-complete-guide",
    title: "Private Label Hunting Wear: Everything You Need to Know in 2026",
    excerpt: "Private label hunting wear manufacturing is one of the fastest-growing B2B segments. This guide covers everything from camo pattern licensing to technical fabric selection and custom branding.",
    category: "Private Label",
    readTime: "10 min read",
    date: "January 28, 2026",
    image: IMAGES.catHunting,
    featured: false,
  },
  {
    slug: "ski-wear-fabric-guide-b2b",
    title: "The Ultimate Guide to Ski Wear Fabrics for B2B Brands",
    excerpt: "Gore-Tex, softshell, or insulated shell? Waterproof ratings and breathability scores matter more than you think. Our fabric experts break down every option for premium custom ski wear.",
    category: "Fabric Guide",
    readTime: "7 min read",
    date: "January 20, 2026",
    image: IMAGES.catSki,
    featured: false,
  },
  {
    slug: "techwear-trends-2026-b2b-guide",
    title: "Tech Wear & Functional Apparel Trends 2026: What B2B Buyers Need to Know",
    excerpt: "Modular systems, DWR coatings, utility pockets — the 2026 techwear landscape is evolving fast. Our trend report helps brand owners make informed manufacturing decisions.",
    category: "Industry Trends",
    readTime: "9 min read",
    date: "January 12, 2026",
    image: IMAGES.catTechwear,
    featured: false,
  },
  {
    slug: "pakistan-garment-manufacturing-sialkot",
    title: "Why Sialkot, Pakistan is the World's Best-Kept Secret for Streetwear Manufacturing",
    excerpt: "Sialkot has been a global manufacturing hub for decades. Discover why international brands are increasingly choosing Pakistan — and specifically Sialkot — for their custom streetwear production.",
    category: "Industry Insights",
    readTime: "5 min read",
    date: "January 5, 2026",
    image: IMAGES.aboutBg,
    featured: false,
  },
];

const categories = ["All", "Manufacturing Guide", "Brand Building", "Private Label", "Fabric Guide", "Industry Trends", "Industry Insights"];

export default function Blog() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <PageWrapper>
      <SEOHead
        title="Blog | Apparel Manufacturing Insights & B2B Guides | Sialkot Sample Masters Pakistan"
        description="Expert insights on custom apparel manufacturing — Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear & Martial Arts. B2B guides from Sialkot Sample Masters, Pakistan's leading apparel manufacturer."
        keywords="apparel manufacturing blog, hunting wear manufacturer guide, ski wear manufacturer Pakistan, techwear manufacturer insights, B2B apparel guide Pakistan, martial arts wear manufacturer guide"
        canonical="/blog"
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-16 pb-16 bg-[#111111] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#ff6b00] font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Insights & Guides</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-6">
            The Sialkot Sample Masters
            <span className="text-gradient-gold italic"> Manufacturing Blog</span>
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-white/70 text-lg max-w-xl mx-auto mt-6">
            Expert guides, industry insights, and manufacturing knowledge for brand owners and B2B buyers across Hunting, Sports, Ski, Tech, Streetwear & Martial Arts.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-white/10 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 px-4 py-1.5 rounded-sm text-xs font-condensed font-semibold tracking-widest uppercase transition-colors ${cat === "All"
                  ? "bg-[#ff6b00] text-background"
                  : "border border-white/10 text-white/70 hover:border-[#ff6b00]/30 hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {featured && (
            <div className="mb-16">
              <p className="text-[#ff6b00] font-condensed font-semibold tracking-widest uppercase text-xs mb-6">Featured Article</p>
              <Link href={`/blog/${featured.slug}`}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#ff6b00]/30 transition-all cursor-pointer">
                  <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                    <div className="absolute top-4 left-4 bg-[#ff6b00] text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">
                      Featured
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#ff6b00] text-xs font-condensed font-semibold tracking-widest uppercase">{featured.category}</span>
                      <span className="text-border">·</span>
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-[#ff6b00] transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {featured.date}
                      </span>
                      <span className="text-[#ff6b00] font-condensed font-semibold text-xs tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="group bg-[#111111] border border-white/10 rounded-sm overflow-hidden hover:border-[#ff6b00]/30 transition-all cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#0d0d0d]/80 backdrop-blur-sm text-[#ff6b00] text-[10px] font-condensed font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-3 group-hover:text-[#ff6b00] transition-colors leading-tight flex-1">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
