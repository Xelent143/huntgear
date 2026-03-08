import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  InsertRfqSubmission, rfqSubmissions,
  InsertBlogPost, blogPosts,
  InsertPortfolioItem, portfolioItems,
  InsertPortfolioImage, portfolioImages, PortfolioItem, PortfolioImage,
  InsertTestimonial, testimonials,
  InsertContactSubmission, contactSubmissions,
  InsertProduct, products,
  InsertProductImage, productImages,
  InsertSlabPrice, slabPrices,
  InsertSizeChart, sizeCharts,
  InsertShippingZone, shippingZones,
  InsertCartItem, cartItems,
  InsertOrder, orders,
  InsertTechPack, techPacks,
  InsertTechPackImage, techPackImages, TechPack, TechPackImage,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) { console.error("[Database] Failed to upsert user:", error); throw error; }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getActiveProducts(opts?: { category?: string; search?: string; limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(products.isActive, true)];
  if (opts?.category && opts.category !== "all") conditions.push(eq(products.category, opts.category));
  if (opts?.search) {
    conditions.push(
      or(
        like(products.title, `%${opts.search}%`),
        like(products.description, `%${opts.search}%`),
        like(products.category, `%${opts.search}%`)
      )!
    );
  }
  return db.select().from(products)
    .where(and(...conditions))
    .orderBy(products.sortOrder, desc(products.createdAt))
    .limit(opts?.limit ?? 50)
    .offset(opts?.offset ?? 0);
}

export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(products.sortOrder, desc(products.createdAt));
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result[0];
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.insert(products).values(data);
  } catch (err: any) {
    const causeCode = err.cause?.code || err.code;
    const causeMsg = err.cause?.message || err.message;

    if (causeCode === "ER_DUP_ENTRY" && causeMsg.includes("slug")) {
      // Auto-recover from duplicate slugs by appending a short random string
      data.slug = data.slug + "-" + Math.random().toString(36).substring(2, 6);
      try {
        await db.insert(products).values(data);
      } catch (retryErr: any) {
        throw new Error("DB Insert Failed after slug retry: " + (retryErr.cause?.message || retryErr.message));
      }
    } else if (causeCode === "ER_BAD_FIELD_ERROR" && causeMsg.includes("weight")) {
      // Auto-recover if the database schema is slightly older and missing the `weight` column
      delete (data as any).weight;
      try {
        await db.insert(products).values(data);
      } catch (retryErr: any) {
        throw new Error("DB Insert Failed after weight retry: " + (retryErr.cause?.message || retryErr.message));
      }
    } else {
      // Unmask the exact MySQL error to the frontend instead of generic Drizzle query string
      throw new Error("DB Insert Failed: " + causeMsg);
    }
  }

  const result = await db.select().from(products).where(eq(products.slug, data.slug)).limit(1);
  return result[0];
}

export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    await db.update(products).set(data).where(eq(products.id, id));
  } catch (err: any) {
    const causeCode = err.cause?.code || err.code;
    const causeMsg = err.cause?.message || err.message;

    if (causeCode === "ER_BAD_FIELD_ERROR" && causeMsg.includes("weight")) {
      delete (data as any).weight;
      try {
        await db.update(products).set(data).where(eq(products.id, id));
      } catch (retryErr: any) {
        throw new Error("DB Update Failed after weight retry: " + (retryErr.cause?.message || retryErr.message));
      }
    } else {
      throw new Error("DB Update Failed: " + causeMsg);
    }
  }
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

export async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products)
    .where(and(eq(products.isFeatured, true), eq(products.isActive, true)))
    .orderBy(products.sortOrder)
    .limit(8);
}

// ─── Product Images ───────────────────────────────────────────────────────────

export async function getProductImages(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productImages)
    .where(eq(productImages.productId, productId))
    .orderBy(productImages.sortOrder);
}

export async function addProductImage(data: InsertProductImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(productImages).values(data);
}

export async function deleteProductImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(productImages).where(eq(productImages.id, id));
}

export async function reorderProductImages(updates: { id: number; sortOrder: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const u of updates) {
    await db.update(productImages).set({ sortOrder: u.sortOrder }).where(eq(productImages.id, u.id));
  }
}

// ─── Slab Prices ──────────────────────────────────────────────────────────────

export async function getSlabPrices(productId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(slabPrices)
    .where(eq(slabPrices.productId, productId))
    .orderBy(slabPrices.sortOrder);
}

export async function setSlabPrices(productId: number, slabs: Omit<InsertSlabPrice, "productId">[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(slabPrices).where(eq(slabPrices.productId, productId));
  if (slabs.length > 0) {
    await db.insert(slabPrices).values(slabs.map(s => ({ ...s, productId })));
  }
}

// ─── Size Charts ──────────────────────────────────────────────────────────────

export async function getSizeChart(productId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(sizeCharts).where(eq(sizeCharts.productId, productId)).limit(1);
  return result[0];
}

export async function upsertSizeChart(productId: number, data: { chartData: string; unit: "inches" | "cm"; notes?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSizeChart(productId);
  if (existing) {
    await db.update(sizeCharts).set(data).where(eq(sizeCharts.productId, productId));
  } else {
    await db.insert(sizeCharts).values({ productId, ...data });
  }
}

// ─── Shipping Zones ───────────────────────────────────────────────────────────

export async function getActiveShippingZones() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(shippingZones).where(eq(shippingZones.isActive, true));
}

export async function getAllShippingZones() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(shippingZones).orderBy(shippingZones.zoneName);
}

export async function createShippingZone(data: InsertShippingZone) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(shippingZones).values(data);
}

export async function updateShippingZone(id: number, data: Partial<InsertShippingZone>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(shippingZones).set(data).where(eq(shippingZones.id, id));
}

export async function deleteShippingZone(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(shippingZones).where(eq(shippingZones.id, id));
}

export async function findShippingZoneForCountry(countryCode: string) {
  const zones = await getActiveShippingZones();
  for (const zone of zones) {
    try {
      const countries: string[] = JSON.parse(zone.countries);
      if (countries.includes(countryCode.toUpperCase())) return zone;
    } catch { /* skip malformed */ }
  }
  return null;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function getCartItems(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
}

export async function upsertCartItem(data: InsertCartItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(cartItems)
    .where(and(
      eq(cartItems.sessionId, data.sessionId),
      eq(cartItems.productId, data.productId),
      data.selectedSize ? eq(cartItems.selectedSize, data.selectedSize) : sql`1=1`
    )).limit(1);
  if (existing.length > 0) {
    await db.update(cartItems)
      .set({ quantity: (existing[0].quantity ?? 1) + (data.quantity ?? 1), updatedAt: new Date() })
      .where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values(data);
  }
}

export async function updateCartItemQty(id: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  } else {
    await db.update(cartItems).set({ quantity, updatedAt: new Date() }).where(eq(cartItems.id, id));
  }
}

export async function removeCartItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.id, id));
}

export async function clearCart(sessionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function createOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(orders).values(data);
  const result = await db.select().from(orders).where(eq(orders.orderNumber, data.orderNumber)).limit(1);
  return result[0];
}

export async function getOrderByNumber(orderNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return result[0];
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(id: number, status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ status, updatedAt: new Date() }).where(eq(orders.id, id));
}

// ─── RFQ ──────────────────────────────────────────────────────────────────────

export async function createRfqSubmission(data: InsertRfqSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(rfqSubmissions).values(data);
}

export async function getAllRfqSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rfqSubmissions).orderBy(desc(rfqSubmissions.createdAt));
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true))).limit(1);
  return result[0];
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export async function getPortfolioItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
}

export async function getFeaturedPortfolioItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(portfolioItems).where(eq(portfolioItems.isFeatured, true)).orderBy(desc(portfolioItems.createdAt)).limit(6);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getFeaturedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.featured, true)).orderBy(desc(testimonials.createdAt)).limit(6);
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactSubmissions).values(data);
}

// ─── Portfolio (new image-based system) ─────────────────────────────────────

export async function listPortfolioItems(opts?: { category?: string; onlyActive?: boolean; onlyFeatured?: boolean }) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(portfolioItems)
    .orderBy(portfolioItems.sortOrder, desc(portfolioItems.createdAt));
  return rows.filter(r => {
    if (opts?.onlyActive && !r.isActive) return false;
    if (opts?.onlyFeatured && !r.isFeatured) return false;
    if (opts?.category && opts.category !== "All" && r.category !== opts.category) return false;
    return true;
  });
}

export async function getPortfolioItemWithImages(id: number) {
  const db = await getDb();
  if (!db) return null;
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id)).limit(1);
  if (!item) return null;
  const images = await db.select().from(portfolioImages)
    .where(eq(portfolioImages.portfolioItemId, id))
    .orderBy(portfolioImages.sortOrder);
  return { ...item, images };
}

export async function getPortfolioImagesForItem(itemId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(portfolioImages)
    .where(eq(portfolioImages.portfolioItemId, itemId))
    .orderBy(portfolioImages.sortOrder);
}

export async function createPortfolioItem(data: InsertPortfolioItem): Promise<PortfolioItem> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(portfolioItems).values(data).$returningId();
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, result.id)).limit(1);
  return item;
}

export async function updatePortfolioItem(id: number, data: Partial<InsertPortfolioItem>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(portfolioItems).set({ ...data, updatedAt: new Date() }).where(eq(portfolioItems.id, id));
}

export async function deletePortfolioItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(portfolioImages).where(eq(portfolioImages.portfolioItemId, id));
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
}

export async function addPortfolioImage(data: InsertPortfolioImage): Promise<PortfolioImage> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(portfolioImages).values(data).$returningId();
  const [img] = await db.select().from(portfolioImages).where(eq(portfolioImages.id, result.id)).limit(1);
  return img;
}

export async function deletePortfolioImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(portfolioImages).where(eq(portfolioImages.id, id));
}

export async function reorderPortfolioImages(updates: { id: number; sortOrder: number }[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const u of updates) {
    await db.update(portfolioImages).set({ sortOrder: u.sortOrder }).where(eq(portfolioImages.id, u.id));
  }
}

export async function getPortfolioCategories(): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({ category: portfolioItems.category }).from(portfolioItems)
    .where(eq(portfolioItems.isActive, true));
  return Array.from(new Set(rows.map(r => r.category).filter(Boolean))) as string[];
}

// ─── Tech Packs ───────────────────────────────────────────────────────────────

export async function createTechPack(data: InsertTechPack) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(techPacks).values(data);
  const result = await db.select().from(techPacks).where(eq(techPacks.referenceNumber, data.referenceNumber)).limit(1);
  return result[0];
}

export async function getTechPackById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(techPacks).where(eq(techPacks.id, id)).limit(1);
  return result[0];
}

export async function getAllTechPacks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(techPacks).orderBy(desc(techPacks.createdAt));
}

export async function updateTechPackStatus(id: number, status: "draft" | "submitted" | "reviewed" | "quoted", notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = { status, updatedAt: new Date() };
  if (notes !== undefined) updateData.adminNotes = notes;

  await db.update(techPacks).set(updateData).where(eq(techPacks.id, id));
}

export async function addTechPackImage(data: InsertTechPackImage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(techPackImages).values(data).$returningId();
  const [img] = await db.select().from(techPackImages).where(eq(techPackImages.id, result.id)).limit(1);
  return img;
}

export async function getTechPackImages(techPackId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(techPackImages)
    .where(eq(techPackImages.techPackId, techPackId))
    .orderBy(techPackImages.sortOrder);
}

// Re-export types for convenience
export type { Order, Product, ProductImage, SlabPrice, SizeChart, ShippingZone, PortfolioItem, PortfolioImage, TechPack, TechPackImage } from "../drizzle/schema";
