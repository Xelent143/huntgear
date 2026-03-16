import "dotenv/config";
import { getDb } from "./server/db";
import { products, productImages } from "./drizzle/schema";
import { eq } from "drizzle-orm";

async function run() {
    const db = await getDb();
    if (!db) return console.error("No DB");

    const allProds = await db.select({ slug: products.slug, mainImage: products.mainImage, id: products.id }).from(products);
    for (const p of allProds) {
        if (p.slug.includes("sialkot")) {
            console.log(`Product [${p.id}] ${p.slug}:`);
            console.log(`  mainImage: ${p.mainImage}`);
            const imgs = await db.select().from(productImages).where(eq(productImages.productId, p.id));
            console.log(`  Gallery Images:`, imgs.map(i => i.imageUrl));
        }
    }
    process.exit(0);
}

run();
