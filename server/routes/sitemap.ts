import { Router } from "express";
import { getDb } from "../db";
import { products, blogPosts, portfolioItems } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

const DOMAIN = "https://sialkotsamplemasters.com";

router.get("/sitemap.xml", async (req, res) => {
    try {
        const db = await getDb();
        if (!db) {
            return res.status(500).send("Database not available");
        }

        // Fetch all active entities
        const activeProducts = await db.select({ slug: products.slug, updatedAt: products.updatedAt })
            .from(products)
            .where(eq(products.isActive, true))
            .orderBy(desc(products.updatedAt));

        const publishedPosts = await db.select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt })
            .from(blogPosts)
            .where(eq(blogPosts.published, true))
            .orderBy(desc(blogPosts.publishedAt));

        const activePortfolio = await db.select({ id: portfolioItems.id, updatedAt: portfolioItems.updatedAt })
            .from(portfolioItems)
            .where(eq(portfolioItems.isActive, true))
            .orderBy(desc(portfolioItems.updatedAt));

        const staticPages = [
            { path: "", priority: "1.0", changefreq: "daily" },
            { path: "/about", priority: "0.9", changefreq: "monthly" },
            { path: "/services", priority: "0.9", changefreq: "monthly" },
            { path: "/products", priority: "0.9", changefreq: "weekly" },
            { path: "/portfolio", priority: "0.8", changefreq: "weekly" },
            { path: "/blog", priority: "0.8", changefreq: "daily" },
            { path: "/rfq", priority: "0.9", changefreq: "monthly" },
            { path: "/contact", priority: "0.8", changefreq: "monthly" },
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Static pages
        staticPages.forEach(page => {
            xml += `
  <url>
    <loc>${DOMAIN}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
        });

        // Dynamic Products
        activeProducts.forEach(p => {
            xml += `
  <url>
    <loc>${DOMAIN}/product/${p.slug}</loc>
    <lastmod>${(p.updatedAt || new Date()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        });

        // Dynamic Blog Posts
        publishedPosts.forEach(post => {
            xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${(post.publishedAt || new Date()).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        // GEO Landing Pages
        const regions = ["usa", "uk", "europe", "australia", "canada"];
        regions.forEach(region => {
            xml += `
  <url>
    <loc>${DOMAIN}/manufacturing/${region}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
        });

        xml += `
</urlset>`;

        res.header("Content-Type", "application/xml");
        res.status(200).send(xml);
    } catch (error) {
        console.error("[Sitemap] Generation error:", error);
        res.status(500).send("Error generating sitemap");
    }
});

export default router;
