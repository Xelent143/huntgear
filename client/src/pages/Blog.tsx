import { Link } from "wouter";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { FadeIn, StaggerChildren, AnimatedChild, HoverCard, PageWrapper, SectionHeading } from "@/components/animations";
import { IMAGES } from "@/lib/images";

const posts = [
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
      />

      {/* Hero */}
      <section className="relative pt-16 pb-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-sm mb-3">Insights & Guides</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-6">
            The Sialkot Sample Masters
            <span className="text-gradient-gold italic"> Manufacturing Blog</span>
          </h1>
          <div className="gold-divider mx-auto" />
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-6">
            Expert guides, industry insights, and manufacturing knowledge for brand owners and B2B buyers across Hunting, Sports, Ski, Tech, Streetwear & Martial Arts.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 px-4 py-1.5 rounded-sm text-xs font-condensed font-semibold tracking-widest uppercase transition-colors ${cat === "All"
                  ? "bg-gold text-background"
                  : "border border-border text-muted-foreground hover:border-gold/30 hover:text-foreground"
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
              <p className="text-gold font-condensed font-semibold tracking-widest uppercase text-xs mb-6">Featured Article</p>
              <Link href={`/blog/${featured.slug}`}>
                <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-sm overflow-hidden hover:border-gold/30 transition-all cursor-pointer">
                  <div className="relative overflow-hidden aspect-[16/9] lg:aspect-auto">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                    <div className="absolute top-4 left-4 bg-gold text-background text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">
                      Featured
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gold text-xs font-condensed font-semibold tracking-widest uppercase">{featured.category}</span>
                      <span className="text-border">·</span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTime}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {featured.date}
                      </span>
                      <span className="text-gold font-condensed font-semibold text-xs tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
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
                <article className="group bg-card border border-border rounded-sm overflow-hidden hover:border-gold/30 transition-all cursor-pointer h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-background/80 backdrop-blur-sm text-gold text-[10px] font-condensed font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif text-lg font-bold text-foreground mb-3 group-hover:text-gold transition-colors leading-tight flex-1">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
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
