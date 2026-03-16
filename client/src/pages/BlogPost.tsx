import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { IMAGES } from "@/lib/images";

const blogContent: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}> = {
  "how-to-find-streetwear-manufacturer-pakistan": {
    title: "How to Find a Reliable Custom Streetwear Manufacturer in Pakistan",
    excerpt: "A comprehensive guide for brand owners looking to source custom streetwear from Pakistan.",
    category: "Manufacturing Guide",
    readTime: "8 min read",
    date: "February 15, 2026",
    image: IMAGES.servicesBg,
    content: `
## Why Pakistan for Streetwear Manufacturing?

Pakistan is one of the world's top five textile exporters, and Sialkot — the country's garment manufacturing capital — has been producing high-quality apparel for global brands for decades. The combination of skilled craftsmanship, competitive pricing, and improving infrastructure makes Pakistan an increasingly attractive destination for streetwear brands.

## Key Factors to Evaluate

### 1. Production Capacity and MOQ

Before engaging any manufacturer, understand their production capacity and minimum order quantities. A reliable manufacturer should be transparent about:

- Monthly production capacity (units)
- Minimum order quantities per style
- Lead times for samples and bulk orders
- Ability to scale with your brand

### 2. Quality Management Systems

Look for manufacturers with formal quality management certifications. ISO 9001:2015 certification indicates that the factory follows documented quality processes. Ask about their quality control procedures at each production stage.

### 3. Communication and Responsiveness

In B2B manufacturing, communication is everything. Evaluate how quickly a manufacturer responds to your initial inquiry. A factory that takes days to respond to a quote request will likely cause delays during production.

### 4. Sample Quality

Always request samples before committing to bulk production. A reputable manufacturer will produce accurate, production-representative samples. Evaluate:

- Fabric quality and weight
- Stitching consistency
- Color accuracy (Pantone matching)
- Construction details

### 5. Ethical Manufacturing Practices

Global brands increasingly face scrutiny over their supply chains. Ensure your manufacturer follows ethical practices including fair wages, safe working conditions, and environmental compliance. Look for WRAP or similar certifications.

## Red Flags to Avoid

- Manufacturers who cannot provide references or case studies
- Factories that promise unrealistically low prices or lead times
- No formal quality control process
- Reluctance to sign NDAs or production agreements
- Poor communication or slow response times

## The Sialkot Sample Masters Difference

At Sialkot Sample Masters, we've built our reputation on transparency, quality, and reliability. We welcome factory visits, provide detailed production updates, and have maintained a 98.5% on-time delivery rate across 500+ brand partnerships.

Ready to start your manufacturing journey? [Request a free quote](/rfq) today.
    `,
  },
  "low-moq-streetwear-manufacturing-guide": {
    title: "Low MOQ Streetwear Manufacturing: The Complete Guide for Emerging Brands",
    excerpt: "Starting a streetwear brand doesn't require massive upfront investment.",
    category: "Brand Building",
    readTime: "6 min read",
    date: "February 8, 2026",
    image: IMAGES.productHoodie,
    content: `
## What is Low MOQ Manufacturing?

Low MOQ (Minimum Order Quantity) manufacturing allows emerging brands to produce small quantities of custom garments without the financial risk of large bulk orders. At Sialkot Sample Masters, we offer MOQs starting from just 50 pieces per style.

## Benefits for Emerging Brands

### Test Before You Scale

Low MOQ production lets you test market response before committing to large inventory. Launch with 100 pieces, sell out, validate demand, then scale to 1,000+ units with confidence.

### Reduced Financial Risk

Traditional manufacturers often require 500–1,000 piece minimums. Low MOQ production dramatically reduces upfront capital requirements, making brand launches accessible to more entrepreneurs.

### Design Iteration

With smaller runs, you can iterate on designs based on customer feedback without being stuck with hundreds of unsold units.

## What to Expect with Low MOQ Production

### Pricing

Low MOQ orders typically carry a higher per-unit cost compared to bulk orders. This is expected and normal — the economics improve significantly as you scale.

### Lead Times

Sample production: 7–10 days
Bulk production (50–200 units): 20–28 days
Bulk production (200+ units): 25–35 days

### Quality

At Sialkot Sample Masters, we apply the same quality standards to 50-piece orders as we do to 50,000-piece orders. Every garment undergoes our standard QC inspection.

## How to Maximize Low MOQ Production

1. **Start with core styles** — Focus on 2-3 key pieces rather than spreading across many styles
2. **Invest in samples** — Perfect your designs before bulk production
3. **Plan your colorways** — Limit to 2-3 colors per style initially
4. **Build a relationship** — A long-term manufacturing partner will grow with your brand

Ready to launch your brand? [Request a quote](/rfq) for our low MOQ program.
    `,
  },
};

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm px-6 py-3 h-auto rounded-sm">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="font-serif text-2xl font-bold text-foreground mt-10 mb-4">{line.slice(3)}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={i} className="font-condensed font-bold text-foreground uppercase tracking-wide text-lg mt-6 mb-3">{line.slice(4)}</h3>;
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="text-muted-foreground leading-relaxed ml-4 list-disc">{line.slice(2)}</li>;
      }
      if (line.match(/^\d+\./)) {
        return <li key={i} className="text-muted-foreground leading-relaxed ml-4 list-decimal">{line.replace(/^\d+\.\s/, "")}</li>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <strong key={i} className="text-foreground font-semibold">{line.slice(2, -2)}</strong>;
      }
      if (line.trim() === "") {
        return <br key={i} />;
      }
      // Handle inline links
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        parts.push(
          <Link key={match.index} href={match[2]} className="text-gold hover:underline">
            {match[1]}
          </Link>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }
      return <p key={i} className="text-muted-foreground leading-relaxed">{parts.length > 0 ? parts : line}</p>;
    });
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${slug}`}
        ogType="article"
        ogImage={post.image}
      />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16 overflow-hidden"
        style={{ backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gold text-background text-xs font-condensed font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
              {post.category}
            </span>
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
            <span className="text-muted-foreground text-xs flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article */}
            <article className="lg:col-span-2 prose-custom">
              <div className="space-y-2">
                {renderContent(post.content)}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-condensed font-bold text-foreground uppercase tracking-widest text-xs mb-4">
                  Ready to Manufacture?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get a free quote from Pakistan's leading custom streetwear manufacturer.
                </p>
                <Link href="/rfq">
                  <Button className="w-full bg-gold text-background hover:bg-gold/90 font-condensed font-bold tracking-widest uppercase text-sm py-3 h-auto rounded-sm">
                    Request Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="bg-card border border-border rounded-sm p-6">
                <h3 className="font-condensed font-bold text-foreground uppercase tracking-widest text-xs mb-4">
                  Our Services
                </h3>
                <ul className="space-y-2">
                  {["Custom Manufacturing", "Private Label", "Low MOQ (50 pcs)", "Bulk Orders", "Design Consultation"].map((s) => (
                    <li key={s}>
                      <Link href="/services" className="text-muted-foreground hover:text-gold text-sm transition-colors flex items-center gap-2">
                        <span className="w-3 h-px bg-border" />
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
