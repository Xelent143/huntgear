var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
var schema_exports = {};
__export(schema_exports, {
  blogPosts: () => blogPosts,
  cartItems: () => cartItems,
  contactSubmissions: () => contactSubmissions,
  orders: () => orders,
  portfolioImages: () => portfolioImages,
  portfolioItems: () => portfolioItems,
  productImages: () => productImages,
  products: () => products,
  rfqSubmissions: () => rfqSubmissions,
  shippingZones: () => shippingZones,
  sizeCharts: () => sizeCharts,
  slabPrices: () => slabPrices,
  testimonials: () => testimonials,
  users: () => users
});
import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  decimal
} from "drizzle-orm/mysql-core";
var users, products, productImages, slabPrices, sizeCharts, shippingZones, cartItems, orders, rfqSubmissions, blogPosts, portfolioItems, portfolioImages, testimonials, contactSubmissions;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      password: varchar("password", { length: 255 }),
      // new: for local email/pass auth
      geminiApiKey: varchar("geminiApiKey", { length: 255 }),
      // per-client Gemini AI key
      role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    products = mysqlTable("products", {
      id: int("id").autoincrement().primaryKey(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      title: varchar("title", { length: 500 }).notNull(),
      category: varchar("category", { length: 100 }).notNull(),
      description: text("description"),
      shortDescription: varchar("shortDescription", { length: 500 }),
      mainImage: varchar("mainImage", { length: 1e3 }),
      samplePrice: decimal("samplePrice", { precision: 10, scale: 2 }),
      weight: decimal("weight", { precision: 8, scale: 3 }),
      // kg per unit, for shipping calc
      availableSizes: text("availableSizes"),
      // JSON array e.g. ["S","M","L","XL","XXL","3XL"]
      availableColors: text("availableColors"),
      // JSON array of color names
      material: varchar("material", { length: 255 }),
      isFeatured: boolean("isFeatured").default(false).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      freeShipping: boolean("freeShipping").default(false).notNull(),
      // SEO fields
      seoTitle: varchar("seoTitle", { length: 255 }),
      seoDescription: text("seoDescription"),
      seoKeywords: text("seoKeywords"),
      sortOrder: int("sortOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    productImages = mysqlTable("product_images", {
      id: int("id").autoincrement().primaryKey(),
      productId: int("productId").notNull(),
      imageUrl: varchar("imageUrl", { length: 1e3 }).notNull(),
      altText: varchar("altText", { length: 255 }),
      sortOrder: int("sortOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    slabPrices = mysqlTable("slab_prices", {
      id: int("id").autoincrement().primaryKey(),
      productId: int("productId").notNull(),
      minQty: int("minQty").notNull(),
      maxQty: int("maxQty"),
      // null = unlimited (e.g. 500+)
      pricePerUnit: decimal("pricePerUnit", { precision: 10, scale: 2 }).notNull(),
      label: varchar("label", { length: 100 }),
      // e.g. "Bulk Discount", "Best Value"
      sortOrder: int("sortOrder").default(0).notNull()
    });
    sizeCharts = mysqlTable("size_charts", {
      id: int("id").autoincrement().primaryKey(),
      productId: int("productId").notNull().unique(),
      // chartData: JSON array of rows, each row: { size, chest, waist, hip, length, ... }
      chartData: text("chartData").notNull(),
      // JSON
      unit: mysqlEnum("unit", ["inches", "cm"]).default("inches").notNull(),
      notes: text("notes"),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    shippingZones = mysqlTable("shipping_zones", {
      id: int("id").autoincrement().primaryKey(),
      zoneName: varchar("zoneName", { length: 100 }).notNull(),
      // e.g. "North America", "Europe"
      countries: text("countries").notNull(),
      // JSON array of ISO country codes
      baseRate: decimal("baseRate", { precision: 10, scale: 2 }).notNull(),
      // base shipping cost in USD
      perUnitRate: decimal("perUnitRate", { precision: 10, scale: 2 }).default("0.00").notNull(),
      // extra per unit
      perKgRate: decimal("perKgRate", { precision: 10, scale: 2 }).default("0.00").notNull(),
      minDays: int("minDays").default(7).notNull(),
      maxDays: int("maxDays").default(21).notNull(),
      currency: varchar("currency", { length: 10 }).default("USD").notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    cartItems = mysqlTable("cart_items", {
      id: int("id").autoincrement().primaryKey(),
      sessionId: varchar("sessionId", { length: 128 }).notNull(),
      // anonymous cart support
      userId: int("userId"),
      // null for guests
      productId: int("productId").notNull(),
      quantity: int("quantity").notNull().default(1),
      selectedSize: varchar("selectedSize", { length: 50 }),
      selectedColor: varchar("selectedColor", { length: 100 }),
      addedAt: timestamp("addedAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    orders = mysqlTable("orders", {
      id: int("id").autoincrement().primaryKey(),
      orderNumber: varchar("orderNumber", { length: 64 }).notNull().unique(),
      userId: int("userId"),
      sessionId: varchar("sessionId", { length: 128 }),
      // Customer info
      customerName: varchar("customerName", { length: 255 }).notNull(),
      customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
      customerPhone: varchar("customerPhone", { length: 64 }),
      companyName: varchar("companyName", { length: 255 }),
      // Shipping address
      addressLine1: varchar("addressLine1", { length: 500 }).notNull(),
      addressLine2: varchar("addressLine2", { length: 500 }),
      city: varchar("city", { length: 100 }).notNull(),
      state: varchar("state", { length: 100 }),
      postalCode: varchar("postalCode", { length: 20 }),
      country: varchar("country", { length: 100 }).notNull(),
      countryCode: varchar("countryCode", { length: 10 }).notNull(),
      // Financials (in USD)
      subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
      shippingCost: decimal("shippingCost", { precision: 10, scale: 2 }).default("0.00").notNull(),
      totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
      // Items snapshot (JSON)
      items: text("items").notNull(),
      // JSON array of { productId, title, qty, size, color, unitPrice }
      // Stripe
      stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
      stripeSessionId: varchar("stripeSessionId", { length: 255 }),
      status: mysqlEnum("status", ["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"]).default("pending").notNull(),
      notes: text("notes"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    rfqSubmissions = mysqlTable("rfq_submissions", {
      id: int("id").autoincrement().primaryKey(),
      companyName: varchar("companyName", { length: 255 }).notNull(),
      contactName: varchar("contactName", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull(),
      phone: varchar("phone", { length: 64 }),
      country: varchar("country", { length: 100 }),
      website: varchar("website", { length: 255 }),
      productType: varchar("productType", { length: 100 }).notNull(),
      quantity: varchar("quantity", { length: 100 }).notNull(),
      customization: text("customization"),
      fabricPreference: varchar("fabricPreference", { length: 255 }),
      timeline: varchar("timeline", { length: 100 }),
      budget: varchar("budget", { length: 100 }),
      additionalNotes: text("additionalNotes"),
      designImageUrl: text("designImageUrl"),
      garmentType: varchar("garmentType", { length: 100 }),
      status: mysqlEnum("status", ["new", "reviewed", "quoted", "closed"]).default("new").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    blogPosts = mysqlTable("blog_posts", {
      id: int("id").autoincrement().primaryKey(),
      slug: varchar("slug", { length: 255 }).notNull().unique(),
      title: varchar("title", { length: 500 }).notNull(),
      excerpt: text("excerpt"),
      content: text("content"),
      category: varchar("category", { length: 100 }),
      tags: text("tags"),
      featuredImage: varchar("featuredImage", { length: 500 }),
      metaTitle: varchar("metaTitle", { length: 255 }),
      metaDescription: text("metaDescription"),
      published: boolean("published").default(false).notNull(),
      publishedAt: timestamp("publishedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    portfolioItems = mysqlTable("portfolio_items", {
      id: int("id").autoincrement().primaryKey(),
      title: varchar("title", { length: 500 }).notNull(),
      category: varchar("category", { length: 100 }).notNull(),
      description: text("description"),
      tags: text("tags"),
      // JSON array of tag strings
      coverImage: varchar("coverImage", { length: 1e3 }),
      // first/hero image URL
      // SEO & Geo fields
      seoTitle: varchar("seoTitle", { length: 255 }),
      seoDescription: text("seoDescription"),
      seoKeywords: text("seoKeywords"),
      geoTarget: varchar("geoTarget", { length: 255 }),
      // e.g. "US, UK, Canada"
      ogImage: varchar("ogImage", { length: 1e3 }),
      // Open Graph image URL
      // Display controls
      isFeatured: boolean("isFeatured").default(false).notNull(),
      isActive: boolean("isActive").default(true).notNull(),
      sortOrder: int("sortOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    portfolioImages = mysqlTable("portfolio_images", {
      id: int("id").autoincrement().primaryKey(),
      portfolioItemId: int("portfolioItemId").notNull(),
      imageUrl: varchar("imageUrl", { length: 1e3 }).notNull(),
      fileKey: varchar("fileKey", { length: 500 }),
      // S3 key for deletion
      altText: varchar("altText", { length: 500 }),
      // SEO alt text
      caption: varchar("caption", { length: 500 }),
      sortOrder: int("sortOrder").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    testimonials = mysqlTable("testimonials", {
      id: int("id").autoincrement().primaryKey(),
      clientName: varchar("clientName", { length: 255 }).notNull(),
      clientTitle: varchar("clientTitle", { length: 255 }),
      companyName: varchar("companyName", { length: 255 }),
      country: varchar("country", { length: 100 }),
      rating: int("rating").default(5),
      testimonial: text("testimonial").notNull(),
      avatar: varchar("avatar", { length: 500 }),
      featured: boolean("featured").default(false).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    contactSubmissions = mysqlTable("contact_submissions", {
      id: int("id").autoincrement().primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      email: varchar("email", { length: 320 }).notNull(),
      company: varchar("company", { length: 255 }),
      phone: varchar("phone", { length: 64 }),
      subject: varchar("subject", { length: 500 }),
      message: text("message").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
      geminiApiKey: process.env.GEMINI_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  addPortfolioImage: () => addPortfolioImage,
  addProductImage: () => addProductImage,
  clearCart: () => clearCart,
  createContactSubmission: () => createContactSubmission,
  createOrder: () => createOrder,
  createPortfolioItem: () => createPortfolioItem,
  createProduct: () => createProduct,
  createRfqSubmission: () => createRfqSubmission,
  createShippingZone: () => createShippingZone,
  deletePortfolioImage: () => deletePortfolioImage,
  deletePortfolioItem: () => deletePortfolioItem,
  deleteProduct: () => deleteProduct,
  deleteProductImage: () => deleteProductImage,
  deleteShippingZone: () => deleteShippingZone,
  findShippingZoneForCountry: () => findShippingZoneForCountry,
  getActiveProducts: () => getActiveProducts,
  getActiveShippingZones: () => getActiveShippingZones,
  getAllOrders: () => getAllOrders,
  getAllProducts: () => getAllProducts,
  getAllRfqSubmissions: () => getAllRfqSubmissions,
  getAllShippingZones: () => getAllShippingZones,
  getBlogPostBySlug: () => getBlogPostBySlug,
  getCartItems: () => getCartItems,
  getDb: () => getDb,
  getFeaturedPortfolioItems: () => getFeaturedPortfolioItems,
  getFeaturedProducts: () => getFeaturedProducts,
  getFeaturedTestimonials: () => getFeaturedTestimonials,
  getOrderByNumber: () => getOrderByNumber,
  getPortfolioCategories: () => getPortfolioCategories,
  getPortfolioImagesForItem: () => getPortfolioImagesForItem,
  getPortfolioItemWithImages: () => getPortfolioItemWithImages,
  getPortfolioItems: () => getPortfolioItems,
  getProductById: () => getProductById,
  getProductBySlug: () => getProductBySlug,
  getProductImages: () => getProductImages,
  getPublishedBlogPosts: () => getPublishedBlogPosts,
  getSizeChart: () => getSizeChart,
  getSlabPrices: () => getSlabPrices,
  getUserByOpenId: () => getUserByOpenId,
  listPortfolioItems: () => listPortfolioItems,
  removeCartItem: () => removeCartItem,
  reorderPortfolioImages: () => reorderPortfolioImages,
  reorderProductImages: () => reorderProductImages,
  setSlabPrices: () => setSlabPrices,
  updateCartItemQty: () => updateCartItemQty,
  updateOrderStatus: () => updateOrderStatus,
  updatePortfolioItem: () => updatePortfolioItem,
  updateProduct: () => updateProduct,
  updateShippingZone: () => updateShippingZone,
  upsertCartItem: () => upsertCartItem,
  upsertSizeChart: () => upsertSizeChart,
  upsertUser: () => upsertUser
});
import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
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
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = { openId: user.openId };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = /* @__PURE__ */ new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}
async function getActiveProducts(opts) {
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
      )
    );
  }
  return db.select().from(products).where(and(...conditions)).orderBy(products.sortOrder, desc(products.createdAt)).limit(opts?.limit ?? 50).offset(opts?.offset ?? 0);
}
async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).orderBy(products.sortOrder, desc(products.createdAt));
}
async function getProductBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result[0];
}
async function getProductById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result[0];
}
async function createProduct(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(products).values(data);
  const result = await db.select().from(products).where(eq(products.slug, data.slug)).limit(1);
  return result[0];
}
async function updateProduct(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}
async function deleteProduct(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}
async function getFeaturedProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products).where(and(eq(products.isFeatured, true), eq(products.isActive, true))).orderBy(products.sortOrder).limit(8);
}
async function getProductImages(productId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productImages).where(eq(productImages.productId, productId)).orderBy(productImages.sortOrder);
}
async function addProductImage(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(productImages).values(data);
}
async function deleteProductImage(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(productImages).where(eq(productImages.id, id));
}
async function reorderProductImages(updates) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const u of updates) {
    await db.update(productImages).set({ sortOrder: u.sortOrder }).where(eq(productImages.id, u.id));
  }
}
async function getSlabPrices(productId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(slabPrices).where(eq(slabPrices.productId, productId)).orderBy(slabPrices.sortOrder);
}
async function setSlabPrices(productId, slabs) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(slabPrices).where(eq(slabPrices.productId, productId));
  if (slabs.length > 0) {
    await db.insert(slabPrices).values(slabs.map((s) => ({ ...s, productId })));
  }
}
async function getSizeChart(productId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(sizeCharts).where(eq(sizeCharts.productId, productId)).limit(1);
  return result[0];
}
async function upsertSizeChart(productId, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSizeChart(productId);
  if (existing) {
    await db.update(sizeCharts).set(data).where(eq(sizeCharts.productId, productId));
  } else {
    await db.insert(sizeCharts).values({ productId, ...data });
  }
}
async function getActiveShippingZones() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(shippingZones).where(eq(shippingZones.isActive, true));
}
async function getAllShippingZones() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(shippingZones).orderBy(shippingZones.zoneName);
}
async function createShippingZone(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(shippingZones).values(data);
}
async function updateShippingZone(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(shippingZones).set(data).where(eq(shippingZones.id, id));
}
async function deleteShippingZone(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(shippingZones).where(eq(shippingZones.id, id));
}
async function findShippingZoneForCountry(countryCode) {
  const zones = await getActiveShippingZones();
  for (const zone of zones) {
    try {
      const countries = JSON.parse(zone.countries);
      if (countries.includes(countryCode.toUpperCase())) return zone;
    } catch {
    }
  }
  return null;
}
async function getCartItems(sessionId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
}
async function upsertCartItem(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select().from(cartItems).where(and(
    eq(cartItems.sessionId, data.sessionId),
    eq(cartItems.productId, data.productId),
    data.selectedSize ? eq(cartItems.selectedSize, data.selectedSize) : sql`1=1`
  )).limit(1);
  if (existing.length > 0) {
    await db.update(cartItems).set({ quantity: (existing[0].quantity ?? 1) + (data.quantity ?? 1), updatedAt: /* @__PURE__ */ new Date() }).where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values(data);
  }
}
async function updateCartItemQty(id, quantity) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  } else {
    await db.update(cartItems).set({ quantity, updatedAt: /* @__PURE__ */ new Date() }).where(eq(cartItems.id, id));
  }
}
async function removeCartItem(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.id, id));
}
async function clearCart(sessionId) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
}
async function createOrder(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(orders).values(data);
  const result = await db.select().from(orders).where(eq(orders.orderNumber, data.orderNumber)).limit(1);
  return result[0];
}
async function getOrderByNumber(orderNumber) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  return result[0];
}
async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).orderBy(desc(orders.createdAt));
}
async function updateOrderStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ status, updatedAt: /* @__PURE__ */ new Date() }).where(eq(orders.id, id));
}
async function createRfqSubmission(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(rfqSubmissions).values(data);
}
async function getAllRfqSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(rfqSubmissions).orderBy(desc(rfqSubmissions.createdAt));
}
async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt));
}
async function getBlogPostBySlug(slug) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true))).limit(1);
  return result[0];
}
async function getPortfolioItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
}
async function getFeaturedPortfolioItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(portfolioItems).where(eq(portfolioItems.isFeatured, true)).orderBy(desc(portfolioItems.createdAt)).limit(6);
}
async function getFeaturedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.featured, true)).orderBy(desc(testimonials.createdAt)).limit(6);
}
async function createContactSubmission(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contactSubmissions).values(data);
}
async function listPortfolioItems(opts) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(portfolioItems).orderBy(portfolioItems.sortOrder, desc(portfolioItems.createdAt));
  return rows.filter((r) => {
    if (opts?.onlyActive && !r.isActive) return false;
    if (opts?.onlyFeatured && !r.isFeatured) return false;
    if (opts?.category && opts.category !== "All" && r.category !== opts.category) return false;
    return true;
  });
}
async function getPortfolioItemWithImages(id) {
  const db = await getDb();
  if (!db) return null;
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, id)).limit(1);
  if (!item) return null;
  const images = await db.select().from(portfolioImages).where(eq(portfolioImages.portfolioItemId, id)).orderBy(portfolioImages.sortOrder);
  return { ...item, images };
}
async function getPortfolioImagesForItem(itemId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(portfolioImages).where(eq(portfolioImages.portfolioItemId, itemId)).orderBy(portfolioImages.sortOrder);
}
async function createPortfolioItem(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(portfolioItems).values(data).$returningId();
  const [item] = await db.select().from(portfolioItems).where(eq(portfolioItems.id, result.id)).limit(1);
  return item;
}
async function updatePortfolioItem(id, data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(portfolioItems).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(portfolioItems.id, id));
}
async function deletePortfolioItem(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(portfolioImages).where(eq(portfolioImages.portfolioItemId, id));
  await db.delete(portfolioItems).where(eq(portfolioItems.id, id));
}
async function addPortfolioImage(data) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(portfolioImages).values(data).$returningId();
  const [img] = await db.select().from(portfolioImages).where(eq(portfolioImages.id, result.id)).limit(1);
  return img;
}
async function deletePortfolioImage(id) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(portfolioImages).where(eq(portfolioImages.id, id));
}
async function reorderPortfolioImages(updates) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  for (const u of updates) {
    await db.update(portfolioImages).set({ sortOrder: u.sortOrder }).where(eq(portfolioImages.id, u.id));
  }
}
async function getPortfolioCategories() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select({ category: portfolioItems.category }).from(portfolioItems).where(eq(portfolioItems.isActive, true));
  return Array.from(new Set(rows.map((r) => r.category).filter(Boolean)));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/ai/gemini.ts
var gemini_exports = {};
__export(gemini_exports, {
  analyzeImageForSeo: () => analyzeImageForSeo,
  chatWithProductAgent: () => chatWithProductAgent,
  generateDesignerGrid: () => generateDesignerGrid,
  generateIndividualView: () => generateIndividualView,
  generateProductData: () => generateProductData,
  generateProductImageBase64: () => generateProductImageBase64,
  prefillProductDataFromGrid: () => prefillProductDataFromGrid
});
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
function getClient(apiKey) {
  const key = apiKey || ENV.geminiApiKey;
  if (!key || key === "your_gemini_api_key_here") {
    throw new Error("GEMINI_API_KEY is not configured. Please set your Gemini API key in the AI Agent settings.");
  }
  if (!_clientCache.has(key)) {
    _clientCache.set(key, new GoogleGenerativeAI(key));
  }
  return _clientCache.get(key);
}
async function chatWithProductAgent(conversationHistory, userMessage, systemPrompt, apiKey, modelId = "gemini-2.1-flash") {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({
    model: modelId,
    systemInstruction: systemPrompt,
    safetySettings
  });
  const chat = model.startChat({
    history: conversationHistory.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }]
    }))
  });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
async function generateProductData(userDescription, brandContext = "Sialkot Sample Masters, a premium B2B eco-friendly apparel manufacturer from Pakistan", apiKey, modelId = "gemini-2.1-flash") {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({
    model: modelId,
    safetySettings,
    generationConfig: {
      responseMimeType: "application/json"
    }
  });
  const prompt = `You are an expert B2B apparel product listing consultant. Generate a complete, SEO and GEO-optimized product listing for: "${userDescription}"

Brand context: ${brandContext}

Return a JSON object with exactly these fields:
{
  "title": "Professional product title (under 70 chars)",
  "slug": "url-safe-slug-lowercase-hyphens",
  "category": "One of: Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, Martial Arts Wear",
  "shortDescription": "Compelling 1-2 sentence summary for product cards (under 160 chars)",
  "description": "Full detailed 3-5 paragraph product description covering features, materials, customization options, and B2B benefits. Rich and keyword-focused.",
  "material": "Specific fabric/material description (e.g. '280GSM Ring-Spun Cotton / Polyester Blend')",
  "availableSizes": ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  "availableColors": ["Black", "Navy", "White", "Olive"],
  "samplePrice": "Price as string e.g. '25.00'",
  "seoTitle": "SEO title under 60 chars, include brand and main keyword",
  "seoDescription": "Meta description 120-155 chars, compelling, include CTA",
  "seoKeywords": "10-15 comma-separated keywords including GEO targets like 'Pakistan manufacturer', 'Sialkot wholesale', etc.",
  "moqSlabs": [
    { "minQty": 50, "maxQty": 99, "pricePerUnit": "18.00", "label": "Starter" },
    { "minQty": 100, "maxQty": 299, "pricePerUnit": "15.00", "label": "Popular" },
    { "minQty": 300, "maxQty": null, "pricePerUnit": "12.00", "label": "Wholesale" }
  ],
  "imagePrompt": "A detailed prompt to generate a professional product photo of this item, suitable for e-commerce, on a clean background, high quality"
}

Important: Return ONLY valid JSON, no markdown, no explanation.`;
  const result = await model.generateContent(prompt);
  const text2 = result.response.text().trim();
  const jsonText = text2.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(jsonText);
}
async function generateProductImageBase64(imagePrompt, logoBase64, logoMimeType, apiKey, modelId = "gemini-2.1-flash") {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({ model: modelId });
  const parts = [
    {
      text: `Generate a professional, high-quality e-commerce product photo. ${imagePrompt}. 
      Studio lighting, clean white or dark background, professional photography style, 
      ultra-realistic, 4K quality. The image should look like it belongs on a premium B2B apparel website.
      ${logoBase64 ? "Incorporate the provided logo prominently but tastefully on the garment." : ""}`
    }
  ];
  if (logoBase64 && logoMimeType) {
    parts.push({
      inlineData: {
        mimeType: logoMimeType,
        data: logoBase64
      }
    });
  }
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: ["image", "text"]
      }
    });
    const response = result.response;
    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType ?? "image/png"
          };
        }
      }
    }
    throw new Error("No image data in Gemini response");
  } catch (err) {
    throw new Error(`Image generation failed: ${String(err)}`);
  }
}
async function analyzeImageForSeo(base64, mimeType, apiKey, modelId = "gemini-2.5-flash") {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({
    model: modelId,
    generationConfig: {
      responseMimeType: "application/json"
    }
  });
  const prompt = `You are an expert SEO and B2B apparel consultant for Sialkot Sample Masters, a premium Pakistan-based manufacturer.
Analyze this raw image and return a JSON object with strictly these three properties:
1. "filename": A highly SEO-optimized, lowercase, kebab-case filename (ending in .jpg) that describes the apparel item perfectly. Include localized B2B keywords where appropriate (e.g. "wholesale-bjj-kimono-manufacturer-pakistan.jpg"). Keep it under 60 characters if possible.
2. "altText": Highly descriptive Alt Text for blind users and search bots. Describe exactly what the apparel item looks like (e.g. "White pearl weave Brazilian Jiu Jitsu Kimono jacket with custom embroidery on the shoulder").
3. "caption": A short, marketing-focused caption summarizing the product, including GEO keywords (like "Sialkot manufacturer" or "Made in Pakistan").

Important: Return ONLY valid JSON, no markdown, no explanation.`;
  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64
        }
      }
    ]);
    const text2 = result.response.text().trim();
    const jsonText = text2.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    return JSON.parse(jsonText);
  } catch (err) {
    throw new Error(`SEO analysis failed: ${err.message}`);
  }
}
async function generateDesignerGrid(prompt, apiKey, modelId = "gemini-2.5-flash") {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({ model: modelId });
  const parts = [
    {
      text: `Act as a senior high-end fashion designer and professional photographer.
Generate a complete multi-view fashion photography grid of a single apparel item: ${prompt}. 
The image MUST be a 2x2 or composite grid showing strictly these 4 DISTINCT views:
1. Full Front View (facing forward)
2. Full Back View (facing away)
3. Full Left Profile View (the clothing item is seen from its left side, facing left)
4. Full Right Profile View (the clothing item is seen from its right side, facing right)
CRITICAL: The Left Profile and Right Profile MUST be different. They are the two opposite sides of the garment. Ensure the orientation is correct. NO DUPLICATE VIEWS.
Studio lighting, clean solid background, ultra-realistic 4K quality, premium B2B catalog style. DO NOT include text in the image.`
    }
  ];
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: ["image", "text"]
      }
    });
    const response = result.response;
    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType ?? "image/jpeg"
          };
        }
      }
    }
    throw new Error("No image data in Gemini response");
  } catch (err) {
    throw new Error(`Grid image generation failed: ${String(err)}`);
  }
}
async function generateIndividualView(basePrompt, viewType, apiKey, modelId = "gemini-2.5-flash", referenceImage) {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({ model: modelId });
  const parts = [];
  if (referenceImage) {
    parts.push({
      inlineData: {
        data: referenceImage.base64,
        mimeType: referenceImage.mimeType
      }
    });
  }
  parts.push({
    text: `Act as a senior high-end fashion designer and professional photographer.
Generate a high-resolution, professional studio photography quality image of the EXACT APPAREL shown in the reference image, but focused ONLY on the ${viewType} view. 

Product Description: ${basePrompt}
View Needed: ${viewType}

STRICT INSTRUCTIONS:
1. The design (colors, patterns, materials, construction) MUST MATCH the reference image perfectly.
2. If the view is "left-side", show the item from its left side (facing left). 
3. If the view is "right-side", show the item from its right side (facing right).
4. The background MUST be solid white.
5. No watermarks or text. High-end 4K commercial lighting.`
  });
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: ["image", "text"]
      }
    });
    const response = result.response;
    for (const candidate of response.candidates ?? []) {
      for (const part of candidate.content?.parts ?? []) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType ?? "image/jpeg"
          };
        }
      }
    }
    throw new Error("No image data in Gemini response");
  } catch (err) {
    throw new Error(`Individual view generation failed: ${viewType} - ${String(err)}`);
  }
}
async function prefillProductDataFromGrid(imagePrompt, base64, mimeType, apiKey, modelId = "gemini-2.5-flash") {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({
    model: modelId,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7
    }
  });
  const prompt = `Act as an elite SEO Expert and E-commerce Manager for Sialkot Sample Masters (a premium B2B custom apparel manufacturer in Pakistan).
I am providing you the original design prompt ("${imagePrompt}") and the generated multi-view design grid image.
Generate a complete, highly-optimized product listing based on this apparel item.
Return ONLY valid JSON matching this exact structure:
{
  "title": "A highly descriptive, SEO-optimized product title (e.g. 'Premium Custom BJJ Kimono - Wholesale')",
  "category": "The most appropriate category (e.g. 'Martial Arts', 'Activewear', 'Outerwear')",
  "description": "A long, persuasive description focusing on material quality, B2B wholesale benefits, customization options, and premium feel.",
  "shortDescription": "A 1-2 sentence quick summary for catalog views.",
  "seoTitle": "Optimal title for Google Search (under 60 chars)",
  "seoDescription": "Meta description for Google (under 160 chars)",
  "seoKeywords": "Comma-separated SEO/GEO keywords (e.g. 'custom jiu jitsu gi, bjj gear bulk, pakistan manufacturer, sialkot custom apparel')",
  "material": "Estimated premium material composition based on the image (e.g. '450gsm Pearl Weave Cotton')",
  "samplePrice": "Estimated expensive sample price (e.g. '85.00')",
  "weight": "Estimated weight in kg (e.g. '1.500')",
  "availableSizes": "JSON array of sizes like [\\"S\\", \\"M\\", \\"L\\", \\"XL\\"]",
  "availableColors": "JSON array of 2-3 most likely requested colors",
  "slabs": [
    { "minQty": 50, "pricePerUnit": "45.00", "label": "Starter Tier" },
    { "minQty": 100, "pricePerUnit": "40.00", "label": "Popular" },
    { "minQty": 500, "pricePerUnit": "35.00", "label": "Wholesale Leader" }
  ]
}`;
  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType,
          data: base64
        }
      }
    ]);
    const text2 = result.response.text().trim();
    const jsonText = text2.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    return JSON.parse(jsonText);
  } catch (err) {
    throw new Error(`Data prefill failed: ${String(err)}`);
  }
}
var _clientCache, safetySettings;
var init_gemini = __esm({
  "server/ai/gemini.ts"() {
    "use strict";
    init_env();
    _clientCache = /* @__PURE__ */ new Map();
    safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
    ];
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import path4 from "path";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

// server/_core/oauth.ts
init_db();

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    const redirectUri = atob(state);
    return redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionCookie ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/routers.ts
import { TRPCError as TRPCError4 } from "@trpc/server";
import { z as z3 } from "zod";

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/ai/agentRouter.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z2 } from "zod";
init_gemini();

// server/storage.ts
init_env();
import fs2 from "fs";
import path from "path";
import { fileURLToPath } from "url";
function getStorageConfig() {
  const baseUrl = ENV.forgeApiUrl;
  const apiKey = ENV.forgeApiKey;
  if (!baseUrl || !apiKey) {
    return null;
  }
  return { baseUrl: baseUrl.replace(/\/+$/, ""), apiKey };
}
function buildUploadUrl(baseUrl, relKey) {
  const url = new URL("v1/storage/upload", ensureTrailingSlash(baseUrl));
  url.searchParams.set("path", normalizeKey(relKey));
  return url;
}
function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}
function normalizeKey(relKey) {
  return relKey.replace(/^\/+/, "");
}
function toFormData(data, contentType, fileName) {
  const blob = typeof data === "string" ? new Blob([data], { type: contentType }) : new Blob([data], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}
function buildAuthHeaders(apiKey) {
  return { Authorization: `Bearer ${apiKey}` };
}
async function storagePut(relKey, data, contentType = "application/octet-stream") {
  const config = getStorageConfig();
  const key = normalizeKey(relKey);
  if (!config) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rootPath = path.resolve(__dirname, "..");
    const uploadDir = path.join(rootPath, "uploads");
    const filePath = path.join(uploadDir, key);
    const fileDir = path.dirname(filePath);
    if (!fs2.existsSync(fileDir)) {
      fs2.mkdirSync(fileDir, { recursive: true });
    }
    const buffer = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
    await fs2.promises.writeFile(filePath, buffer);
    return { key, url: `/uploads/${key}` };
  }
  const { baseUrl, apiKey } = config;
  const uploadUrl = buildUploadUrl(baseUrl, key);
  const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: buildAuthHeaders(apiKey),
    body: formData
  });
  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(
      `Storage upload failed (${response.status} ${response.statusText}): ${message}`
    );
  }
  const url = (await response.json()).url;
  return { key, url };
}

// server/ai/agentRouter.ts
import { nanoid } from "nanoid";
var AGENT_SYSTEM_PROMPT = `You are an Elite B2B Apparel Product Posting Consultant AI for Sialkot Sample Masters \u2014 a premium, eco-friendly custom apparel manufacturer based in Sialkot, Pakistan with 15+ years of experience exporting to 40+ countries.

## Your Expertise:
- Deep knowledge of international apparel manufacturing (MOQ pricing, fabric specs, construction details)
- SEO & GEO optimization for e-commerce product listings targeting global B2B buyers
- Market research for current trends in Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, and Martial Arts Wear
- Price slab / MOQ strategy for bulk apparel buyers
- AliExpress, Alibaba, and direct B2B buyer psychology

## Your Role:
Help admin users create complete, professional product listings by:
1. **Conversing naturally** to understand what product they want to list
2. **Asking clarifying questions** about fabric, target markets, price points, MOQ, customization options
3. **Generating full product data** including SEO-optimized titles, descriptions, keywords, size charts, color options, and MOQ pricing slabs
4. **Offering to generate product images** using AI (with or without a logo)
5. **Presenting a product preview** that can be posted directly to the website with one click

## Response Style:
- Be professional but conversational
- Be proactive \u2014 suggest improvements the user may not have thought of
- Always include both GEO keywords (Sialkot, Pakistan, wholesale) and product-specific SEO keywords
- When you have enough information, say: **"I have all the information needed. Click the '\u{1F680} Generate Product' button below to create the full product listing!"**
- When generating product images, ask if they want to upload a logo to place on the garment

## Important Rules:
- Categories must be one of: Hunting Wear, Sports Wear, Ski Wear, Tech Wear, Streetwear, Martial Arts Wear
- Always suggest at least 3 MOQ price tiers (e.g. 50-99 pcs, 100-299 pcs, 300+ pcs)
- Size charts should be realistic for international buyers (XS-3XL typically)
- Prices should reflect Pakistan manufacturing rates (very competitive globally)`;
var adminProcedure2 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var aiAgentRouter = router({
  // Multi-turn chat with the product consultant
  chat: adminProcedure2.input(z2.object({
    history: z2.array(z2.object({
      role: z2.enum(["user", "model"]),
      text: z2.string()
    })),
    message: z2.string().min(1).max(2e3),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const reply = await chatWithProductAgent(
        input.history,
        input.message,
        AGENT_SYSTEM_PROMPT,
        key,
        input.modelId
      );
      return { reply, success: true };
    } catch (err) {
      if (err.message?.includes("GEMINI_API_KEY") || err.message?.includes("API key")) {
        throw new TRPCError3({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gemini API key not configured. Please add your API key in the AI Agent settings."
        });
      }
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `AI error: ${err.message}`
      });
    }
  }),
  // Generate full structured product data from a description
  generateProduct: adminProcedure2.input(z2.object({
    description: z2.string().min(5).max(1e3),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const productData = await generateProductData(input.description, void 0, key, input.modelId);
      return { product: productData, success: true };
    } catch (err) {
      if (err.message?.includes("GEMINI_API_KEY") || err.message?.includes("API key")) {
        throw new TRPCError3({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gemini API key not configured. Please add your API key in the AI Agent settings."
        });
      }
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `Product generation failed: ${err.message}`
      });
    }
  }),
  // Generate a product image with optional logo, upload to storage, return URL
  generateProductImage: adminProcedure2.input(z2.object({
    imagePrompt: z2.string().min(5).max(1e3),
    logoBase64: z2.string().optional(),
    logoMimeType: z2.string().optional(),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const { base64, mimeType } = await generateProductImageBase64(
        input.imagePrompt,
        input.logoBase64,
        input.logoMimeType,
        key,
        input.modelId
      );
      const buffer = Buffer.from(base64, "base64");
      const ext = mimeType.split("/")[1] ?? "png";
      const storageKey = `ai-generated/${nanoid(12)}.${ext}`;
      const { url } = await storagePut(storageKey, buffer, mimeType);
      return { imageUrl: url, success: true };
    } catch (err) {
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `Image generation failed: ${err.message}`
      });
    }
  }),
  // Analyze a manually uploaded image for SEO optimization (rename, alt, caption)
  optimizeImage: adminProcedure2.input(z2.object({
    base64: z2.string(),
    mimeType: z2.string(),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const { analyzeImageForSeo: analyzeImageForSeo2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const seoData = await analyzeImageForSeo2(input.base64, input.mimeType, key, input.modelId);
      return { seoData, success: true };
    } catch (err) {
      if (err.message?.includes("GEMINI_API_KEY") || err.message?.includes("API key")) {
        throw new TRPCError3({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gemini API key not configured. Please add your API key in the AI Agent settings."
        });
      }
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `Image optimization failed: ${err.message}`
      });
    }
  }),
  // Premium: Generate a 4-view design concept grid
  generateDesignerGrid: adminProcedure2.input(z2.object({
    prompt: z2.string().min(5).max(1e3),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const { generateDesignerGrid: generateDesignerGrid2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const { base64, mimeType } = await generateDesignerGrid2(input.prompt, key, input.modelId);
      return { base64, mimeType, success: true };
    } catch (err) {
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `Grid generation failed: ${err.message}`
      });
    }
  }),
  // Premium: Generate individual high-res view
  generateIndividualView: adminProcedure2.input(z2.object({
    basePrompt: z2.string().min(5).max(1e3),
    viewType: z2.enum(["front", "back", "left-side", "right-side", "side", "close-up", "model"]),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional(),
    referenceImage: z2.object({ base64: z2.string(), mimeType: z2.string() }).optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const { generateIndividualView: generateIndividualView2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const { base64, mimeType } = await generateIndividualView2(
        input.basePrompt,
        input.viewType,
        key,
        input.modelId,
        input.referenceImage
      );
      const buffer = Buffer.from(base64, "base64");
      const ext = mimeType.split("/")[1] ?? "jpeg";
      const storageKey = `portfolio/designer-${input.viewType}-${nanoid(10)}.${ext}`;
      const { url } = await storagePut(storageKey, buffer, mimeType);
      return { imageUrl: url, success: true };
    } catch (err) {
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `Individual view generation failed: ${err.message}`
      });
    }
  }),
  // Premium: Auto-fill product form based on grid image
  prefillProductFromGrid: adminProcedure2.input(z2.object({
    prompt: z2.string(),
    base64: z2.string(),
    mimeType: z2.string(),
    apiKey: z2.string().optional(),
    modelId: z2.string().optional()
  })).mutation(async ({ input, ctx }) => {
    try {
      const { prefillProductDataFromGrid: prefillProductDataFromGrid2 } = await Promise.resolve().then(() => (init_gemini(), gemini_exports));
      const key = input.apiKey || ctx.user.geminiApiKey || void 0;
      const productData = await prefillProductDataFromGrid2(input.prompt, input.base64, input.mimeType, key, input.modelId);
      return { productData, success: true };
    } catch (err) {
      throw new TRPCError3({
        code: "INTERNAL_SERVER_ERROR",
        message: `Product prefill failed: ${err.message}`
      });
    }
  })
});

// server/routers.ts
init_db();
import { nanoid as nanoid2 } from "nanoid";
var adminProcedure3 = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError4({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});
var slabSchema = z3.object({
  minQty: z3.number().int().positive(),
  maxQty: z3.number().int().positive().nullable().optional(),
  pricePerUnit: z3.string(),
  label: z3.string().max(100).optional(),
  sortOrder: z3.number().int().default(0)
});
var productRouter = router({
  list: publicProcedure.input(z3.object({
    category: z3.string().optional(),
    search: z3.string().optional(),
    limit: z3.number().int().min(1).max(100).default(24),
    offset: z3.number().int().min(0).default(0)
  }).optional()).query(async ({ input }) => {
    return getActiveProducts(input);
  }),
  featured: publicProcedure.query(() => getFeaturedProducts()),
  categories: publicProcedure.query(async () => {
    const all = await getActiveProducts();
    const cats = Array.from(new Set(all.map((p) => p.category)));
    return cats;
  }),
  bySlug: publicProcedure.input(z3.object({ slug: z3.string() })).query(async ({ input }) => {
    const product = await getProductBySlug(input.slug);
    if (!product) return null;
    const [images, slabs, sizeChart] = await Promise.all([
      getProductImages(product.id),
      getSlabPrices(product.id),
      getSizeChart(product.id)
    ]);
    return { ...product, images, slabs, sizeChart: sizeChart ?? null };
  }),
  // Admin: full list including inactive
  adminList: adminProcedure3.query(() => getAllProducts()),
  create: adminProcedure3.input(z3.object({
    title: z3.string().min(1).max(500),
    slug: z3.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
    category: z3.string().min(1).max(100),
    description: z3.string().optional(),
    shortDescription: z3.string().max(500).optional(),
    mainImage: z3.string().optional(),
    samplePrice: z3.string().optional(),
    weight: z3.string().optional(),
    availableSizes: z3.string().optional(),
    // JSON
    availableColors: z3.string().optional(),
    // JSON
    material: z3.string().max(255).optional(),
    isFeatured: z3.boolean().default(false),
    isActive: z3.boolean().default(true),
    freeShipping: z3.boolean().default(false),
    seoTitle: z3.string().max(255).optional(),
    seoDescription: z3.string().optional(),
    seoKeywords: z3.string().optional(),
    sortOrder: z3.number().int().default(0),
    slabs: z3.array(slabSchema).optional(),
    sizeChart: z3.object({
      chartData: z3.string(),
      unit: z3.enum(["inches", "cm"]),
      notes: z3.string().optional()
    }).optional()
  })).mutation(async ({ input }) => {
    const { slabs, sizeChart, ...productData } = input;
    const product = await createProduct(productData);
    if (!product) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR" });
    if (slabs && slabs.length > 0) await setSlabPrices(product.id, slabs);
    if (sizeChart) await upsertSizeChart(product.id, sizeChart);
    return product;
  }),
  update: adminProcedure3.input(z3.object({
    id: z3.number().int().positive(),
    title: z3.string().min(1).max(500).optional(),
    slug: z3.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
    category: z3.string().min(1).max(100).optional(),
    description: z3.string().optional(),
    shortDescription: z3.string().max(500).optional(),
    mainImage: z3.string().optional(),
    samplePrice: z3.string().optional(),
    weight: z3.string().optional(),
    availableSizes: z3.string().optional(),
    availableColors: z3.string().optional(),
    material: z3.string().max(255).optional(),
    isFeatured: z3.boolean().optional(),
    isActive: z3.boolean().optional(),
    freeShipping: z3.boolean().optional(),
    seoTitle: z3.string().max(255).optional(),
    seoDescription: z3.string().optional(),
    seoKeywords: z3.string().optional(),
    sortOrder: z3.number().int().optional(),
    slabs: z3.array(slabSchema).optional(),
    sizeChart: z3.object({
      chartData: z3.string(),
      unit: z3.enum(["inches", "cm"]),
      notes: z3.string().optional()
    }).optional()
  })).mutation(async ({ input }) => {
    const { id, slabs, sizeChart, ...data } = input;
    await updateProduct(id, data);
    if (slabs !== void 0) await setSlabPrices(id, slabs);
    if (sizeChart) await upsertSizeChart(id, sizeChart);
    return { success: true };
  }),
  delete: adminProcedure3.input(z3.object({ id: z3.number().int().positive() })).mutation(async ({ input }) => {
    await deleteProduct(input.id);
    return { success: true };
  }),
  uploadImage: adminProcedure3.input(z3.object({
    productId: z3.number().int().positive(),
    imageBase64: z3.string(),
    mimeType: z3.string().default("image/jpeg"),
    altText: z3.string().optional(),
    sortOrder: z3.number().int().default(0)
  })).mutation(async ({ input }) => {
    const buffer = Buffer.from(input.imageBase64, "base64");
    const ext = input.mimeType.split("/")[1] ?? "jpg";
    const key = `products/${input.productId}/${nanoid2(10)}.${ext}`;
    const { url } = await storagePut(key, buffer, input.mimeType);
    await addProductImage({
      productId: input.productId,
      imageUrl: url,
      altText: input.altText,
      sortOrder: input.sortOrder
    });
    return { url };
  }),
  deleteImage: adminProcedure3.input(z3.object({ id: z3.number().int().positive() })).mutation(async ({ input }) => {
    await deleteProductImage(input.id);
    return { success: true };
  }),
  reorderImages: adminProcedure3.input(z3.array(z3.object({ id: z3.number(), sortOrder: z3.number() }))).mutation(async ({ input }) => {
    await reorderProductImages(input);
    return { success: true };
  })
});
var shippingRouter = router({
  zones: publicProcedure.query(() => getActiveShippingZones()),
  adminZones: adminProcedure3.query(() => getAllShippingZones()),
  calculate: publicProcedure.input(z3.object({
    countryCode: z3.string().length(2),
    items: z3.array(z3.object({
      productId: z3.number().int(),
      quantity: z3.number().int().positive()
    }))
  })).query(async ({ input }) => {
    const productDetails = await Promise.all(
      input.items.map((item) => getProductById(item.productId))
    );
    const allFreeShipping = productDetails.every((p) => p?.freeShipping);
    if (allFreeShipping) {
      return { cost: "0.00", currency: "USD", estimatedDays: { min: 7, max: 21 }, freeShipping: true, zoneName: "Free Shipping" };
    }
    const zone = await findShippingZoneForCountry(input.countryCode);
    if (!zone) {
      return { cost: "45.00", currency: "USD", estimatedDays: { min: 14, max: 30 }, freeShipping: false, zoneName: "International" };
    }
    const totalQty = input.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalWeight = productDetails.reduce((sum, p, idx) => {
      const qty = input.items[idx]?.quantity ?? 1;
      return sum + parseFloat(p?.weight ?? "0.3") * qty;
    }, 0);
    const base = parseFloat(zone.baseRate);
    const perUnit = parseFloat(zone.perUnitRate) * totalQty;
    const perKg = parseFloat(zone.perKgRate) * totalWeight;
    const total = Math.max(base + perUnit + perKg, 0);
    return {
      cost: total.toFixed(2),
      currency: zone.currency,
      estimatedDays: { min: zone.minDays, max: zone.maxDays },
      freeShipping: false,
      zoneName: zone.zoneName
    };
  }),
  createZone: adminProcedure3.input(z3.object({
    zoneName: z3.string().min(1).max(100),
    countries: z3.string(),
    // JSON array of ISO codes
    baseRate: z3.string().regex(/^\d+(\.\d{1,2})?$/),
    perUnitRate: z3.string().regex(/^\d+(\.\d{1,2})?$/).default("0.00"),
    perKgRate: z3.string().regex(/^\d+(\.\d{1,2})?$/).default("0.00"),
    minDays: z3.number().int().min(1).default(7),
    maxDays: z3.number().int().min(1).default(21),
    currency: z3.string().max(10).default("USD"),
    isActive: z3.boolean().default(true)
  })).mutation(async ({ input }) => {
    await createShippingZone(input);
    return { success: true };
  }),
  updateZone: adminProcedure3.input(z3.object({
    id: z3.number().int().positive(),
    zoneName: z3.string().min(1).max(100).optional(),
    countries: z3.string().optional(),
    baseRate: z3.string().optional(),
    perUnitRate: z3.string().optional(),
    perKgRate: z3.string().optional(),
    minDays: z3.number().int().optional(),
    maxDays: z3.number().int().optional(),
    currency: z3.string().optional(),
    isActive: z3.boolean().optional()
  })).mutation(async ({ input }) => {
    const { id, ...data } = input;
    await updateShippingZone(id, data);
    return { success: true };
  }),
  deleteZone: adminProcedure3.input(z3.object({ id: z3.number().int().positive() })).mutation(async ({ input }) => {
    await deleteShippingZone(input.id);
    return { success: true };
  })
});
var cartRouter = router({
  get: publicProcedure.input(z3.object({ sessionId: z3.string() })).query(async ({ input }) => {
    const items = await getCartItems(input.sessionId);
    const enriched = await Promise.all(items.map(async (item) => {
      const product = await getProductById(item.productId);
      const slabs = await getSlabPrices(item.productId);
      const slab = slabs.find((s) => {
        const qty = item.quantity;
        return qty >= s.minQty && (s.maxQty === null || qty <= (s.maxQty ?? Infinity));
      }) ?? slabs[0];
      return {
        ...item,
        product: product ?? null,
        unitPrice: slab ? parseFloat(slab.pricePerUnit) : 0,
        lineTotal: slab ? parseFloat(slab.pricePerUnit) * item.quantity : 0
      };
    }));
    return enriched;
  }),
  addItem: publicProcedure.input(z3.object({
    sessionId: z3.string(),
    productId: z3.number().int().positive(),
    quantity: z3.number().int().positive(),
    selectedSize: z3.string().optional(),
    selectedColor: z3.string().optional()
  })).mutation(async ({ input }) => {
    await upsertCartItem(input);
    return { success: true };
  }),
  updateQty: publicProcedure.input(z3.object({ id: z3.number().int().positive(), quantity: z3.number().int().min(0) })).mutation(async ({ input }) => {
    await updateCartItemQty(input.id, input.quantity);
    return { success: true };
  }),
  removeItem: publicProcedure.input(z3.object({ id: z3.number().int().positive() })).mutation(async ({ input }) => {
    await removeCartItem(input.id);
    return { success: true };
  }),
  clear: publicProcedure.input(z3.object({ sessionId: z3.string() })).mutation(async ({ input }) => {
    await clearCart(input.sessionId);
    return { success: true };
  })
});
var orderRouter = router({
  create: publicProcedure.input(z3.object({
    sessionId: z3.string(),
    customerName: z3.string().min(1),
    customerEmail: z3.string().email(),
    customerPhone: z3.string().optional(),
    companyName: z3.string().optional(),
    addressLine1: z3.string().min(1),
    addressLine2: z3.string().optional(),
    city: z3.string().min(1),
    state: z3.string().optional(),
    postalCode: z3.string().optional(),
    country: z3.string().min(1),
    countryCode: z3.string().length(2),
    items: z3.array(z3.object({
      productId: z3.number(),
      title: z3.string(),
      qty: z3.number(),
      size: z3.string().optional(),
      color: z3.string().optional(),
      unitPrice: z3.number()
    })),
    subtotal: z3.number(),
    shippingCost: z3.number(),
    totalAmount: z3.number()
  })).mutation(async ({ input }) => {
    const orderNumber = `SSM-${Date.now()}-${nanoid2(6).toUpperCase()}`;
    const order = await createOrder({
      orderNumber,
      sessionId: input.sessionId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      companyName: input.companyName,
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2,
      city: input.city,
      state: input.state,
      postalCode: input.postalCode,
      country: input.country,
      countryCode: input.countryCode,
      subtotal: input.subtotal.toFixed(2),
      shippingCost: input.shippingCost.toFixed(2),
      totalAmount: input.totalAmount.toFixed(2),
      items: JSON.stringify(input.items),
      status: "pending"
    });
    await clearCart(input.sessionId);
    await notifyOwner({
      title: `New Order: ${orderNumber}`,
      content: `Order from ${input.customerName} (${input.companyName ?? input.customerEmail}) \u2014 Total: $${input.totalAmount.toFixed(2)}`
    });
    return { success: true, orderNumber };
  }),
  byNumber: publicProcedure.input(z3.object({ orderNumber: z3.string() })).query(async ({ input }) => getOrderByNumber(input.orderNumber)),
  adminList: adminProcedure3.query(() => getAllOrders()),
  updateStatus: adminProcedure3.input(z3.object({
    id: z3.number().int().positive(),
    status: z3.enum(["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"])
  })).mutation(async ({ input }) => {
    await updateOrderStatus(input.id, input.status);
    return { success: true };
  })
});
var rfqRouter = router({
  submit: publicProcedure.input(z3.object({
    companyName: z3.string().min(1),
    contactName: z3.string().min(1),
    email: z3.string().email(),
    phone: z3.string().optional(),
    country: z3.string().optional(),
    website: z3.string().optional(),
    productType: z3.string().min(1),
    quantity: z3.string().min(1),
    customizationType: z3.string().optional(),
    fabricPreference: z3.string().optional(),
    timeline: z3.string().optional(),
    budgetRange: z3.string().optional(),
    description: z3.string().optional(),
    serviceType: z3.string().optional(),
    howHeard: z3.string().optional()
  })).mutation(async ({ input }) => {
    await createRfqSubmission({
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      country: input.country,
      website: input.website,
      productType: input.productType,
      quantity: input.quantity,
      customization: input.customizationType,
      fabricPreference: input.fabricPreference,
      timeline: input.timeline,
      budget: input.budgetRange,
      additionalNotes: input.description
    });
    await notifyOwner({
      title: `New RFQ from ${input.companyName}`,
      content: `${input.contactName} (${input.email}) requested a quote for ${input.productType} \u2014 Qty: ${input.quantity}`
    });
    return { success: true };
  }),
  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") return [];
    return getAllRfqSubmissions();
  }),
  // Upload a design screenshot to S3 and return the URL
  uploadDesignImage: publicProcedure.input(z3.object({
    imageBase64: z3.string(),
    mimeType: z3.string().default("image/jpeg")
  })).mutation(async ({ input }) => {
    const buffer = Buffer.from(input.imageBase64, "base64");
    const ext = input.mimeType.split("/")[1] || "jpg";
    const fileKey = `design-quotes/${nanoid2(12)}.${ext}`;
    const { url } = await storagePut(fileKey, buffer, input.mimeType);
    return { url };
  }),
  // Submit an RFQ with an attached 3D design image
  submitWithDesign: publicProcedure.input(z3.object({
    companyName: z3.string().min(1),
    contactName: z3.string().min(1),
    email: z3.string().email(),
    phone: z3.string().optional(),
    country: z3.string().optional(),
    productType: z3.string().min(1),
    quantity: z3.string().min(1),
    timeline: z3.string().optional(),
    budgetRange: z3.string().optional(),
    description: z3.string().optional(),
    designImageUrl: z3.string().url().optional(),
    garmentType: z3.string().optional()
  })).mutation(async ({ input }) => {
    await createRfqSubmission({
      companyName: input.companyName,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone,
      country: input.country,
      productType: input.productType,
      quantity: input.quantity,
      timeline: input.timeline,
      budget: input.budgetRange,
      additionalNotes: input.description,
      designImageUrl: input.designImageUrl,
      garmentType: input.garmentType
    });
    const designNote = input.designImageUrl ? `

\u{1F3A8} Design Preview: ${input.designImageUrl}` : "";
    await notifyOwner({
      title: `New 3D Design Quote from ${input.companyName}`,
      content: `${input.contactName} (${input.email}) submitted a 3D design quote request for ${input.productType} (${input.garmentType ?? ""}) \u2014 Qty: ${input.quantity}${designNote}`
    });
    return { success: true };
  })
});
var blogRouter = router({
  list: publicProcedure.query(() => getPublishedBlogPosts()),
  bySlug: publicProcedure.input(z3.object({ slug: z3.string() })).query(({ input }) => getBlogPostBySlug(input.slug))
});
var portfolioRouter = router({
  // Public queries
  list: publicProcedure.input(z3.object({ category: z3.string().optional() }).optional()).query(({ input }) => listPortfolioItems({ category: input?.category, onlyActive: true })),
  categories: publicProcedure.query(() => getPortfolioCategories()),
  byId: publicProcedure.input(z3.object({ id: z3.number() })).query(({ input }) => getPortfolioItemWithImages(input.id)),
  // Admin: create portfolio item
  create: protectedProcedure.input(z3.object({
    title: z3.string().min(1),
    category: z3.string().min(1),
    description: z3.string().optional(),
    tags: z3.string().optional(),
    seoTitle: z3.string().optional(),
    seoDescription: z3.string().optional(),
    seoKeywords: z3.string().optional(),
    geoTarget: z3.string().optional(),
    isFeatured: z3.boolean().optional(),
    isActive: z3.boolean().optional(),
    sortOrder: z3.number().optional()
  })).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    return createPortfolioItem(input);
  }),
  // Admin: update portfolio item
  update: protectedProcedure.input(z3.object({
    id: z3.number(),
    title: z3.string().optional(),
    category: z3.string().optional(),
    description: z3.string().optional(),
    tags: z3.string().optional(),
    seoTitle: z3.string().optional(),
    seoDescription: z3.string().optional(),
    seoKeywords: z3.string().optional(),
    geoTarget: z3.string().optional(),
    isFeatured: z3.boolean().optional(),
    isActive: z3.boolean().optional(),
    sortOrder: z3.number().optional(),
    coverImage: z3.string().optional(),
    ogImage: z3.string().optional()
  })).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    const { id, ...data } = input;
    await updatePortfolioItem(id, data);
    return { success: true };
  }),
  // Admin: delete portfolio item (cascades images)
  delete: protectedProcedure.input(z3.object({ id: z3.number() })).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    await deletePortfolioItem(input.id);
    return { success: true };
  }),
  // Admin: upload image to S3 and attach to portfolio item
  uploadImage: protectedProcedure.input(z3.object({
    portfolioItemId: z3.number(),
    imageBase64: z3.string(),
    mimeType: z3.string().default("image/jpeg"),
    altText: z3.string().optional(),
    caption: z3.string().optional(),
    sortOrder: z3.number().optional()
  })).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    const buffer = Buffer.from(input.imageBase64, "base64");
    const ext = input.mimeType.split("/")[1] || "jpg";
    const fileKey = `portfolio/${input.portfolioItemId}/${nanoid2(10)}.${ext}`;
    const { url } = await storagePut(fileKey, buffer, input.mimeType);
    const img = await addPortfolioImage({
      portfolioItemId: input.portfolioItemId,
      imageUrl: url,
      fileKey,
      altText: input.altText,
      caption: input.caption,
      sortOrder: input.sortOrder ?? 0
    });
    const existing = await getPortfolioItemWithImages(input.portfolioItemId);
    if (existing && existing.images.length === 1) {
      await updatePortfolioItem(input.portfolioItemId, { coverImage: url, ogImage: url });
    }
    return img;
  }),
  // Admin: delete a single image
  deleteImage: protectedProcedure.input(z3.object({ imageId: z3.number() })).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    await deletePortfolioImage(input.imageId);
    return { success: true };
  }),
  // Admin: reorder images
  reorderImages: protectedProcedure.input(z3.array(z3.object({ id: z3.number(), sortOrder: z3.number() }))).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    await reorderPortfolioImages(input);
    return { success: true };
  }),
  // Admin: set cover image
  setCover: protectedProcedure.input(z3.object({ portfolioItemId: z3.number(), imageUrl: z3.string() })).mutation(async ({ ctx, input }) => {
    if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN" });
    await updatePortfolioItem(input.portfolioItemId, { coverImage: input.imageUrl, ogImage: input.imageUrl });
    return { success: true };
  })
});
var testimonialsRouter = router({
  featured: publicProcedure.query(() => getFeaturedTestimonials())
});
var contactRouter = router({
  submit: publicProcedure.input(z3.object({
    name: z3.string().min(1),
    email: z3.string().email(),
    company: z3.string().optional(),
    phone: z3.string().optional(),
    subject: z3.string().optional(),
    message: z3.string().min(1)
  })).mutation(async ({ input }) => {
    await createContactSubmission(input);
    await notifyOwner({
      title: `New Contact from ${input.name}`,
      content: `${input.email}${input.company ? ` (${input.company})` : ""}: ${input.message.slice(0, 200)}`
    });
    return { success: true };
  })
});
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true };
    })
  }),
  product: productRouter,
  shipping: shippingRouter,
  cart: cartRouter,
  order: orderRouter,
  rfq: rfqRouter,
  blog: blogRouter,
  portfolio: portfolioRouter,
  testimonials: testimonialsRouter,
  contact: contactRouter,
  aiAgent: aiAgentRouter,
  adminSettings: router({
    getApiKey: adminProcedure3.query(async ({ ctx }) => {
      const { getDb: getDatabase } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { users: users2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq2 } = await import("drizzle-orm");
      const db = await getDatabase();
      if (!db) return { hasKey: false, maskedKey: "" };
      const [user] = await db.select().from(users2).where(eq2(users2.id, ctx.user.id)).limit(1);
      const key = user?.geminiApiKey || "";
      return {
        hasKey: !!key,
        maskedKey: key ? key.substring(0, 6) + "..." + key.substring(key.length - 4) : ""
      };
    }),
    saveApiKey: adminProcedure3.input(z3.object({ apiKey: z3.string().max(255) })).mutation(async ({ input, ctx }) => {
      const { getDb: getDatabase } = await Promise.resolve().then(() => (init_db(), db_exports));
      const { users: users2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eq2 } = await import("drizzle-orm");
      const db = await getDatabase();
      if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      await db.update(users2).set({ geminiApiKey: input.apiKey || null }).where(eq2(users2.id, ctx.user.id));
      return { success: true };
    })
  })
});

// server/_core/context.ts
var IS_PRODUCTION = process.env.NODE_ENV === "production";
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (_oauthError) {
  }
  if (!user) {
    try {
      const cookieHeader = opts.req.headers.cookie || "";
      const tokenMatch = cookieHeader.match(/admin_token=([^;]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;
      if (token) {
        const { jwtVerify: jwtVerify2 } = await import("jose");
        const JWT_SECRET = new TextEncoder().encode(
          process.env.JWT_SECRET || "fallback_super_secret_for_local_dev_only_12345"
        );
        const { payload } = await jwtVerify2(token, JWT_SECRET);
        if (payload.userId) {
          const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
          const { users: users2 } = await Promise.resolve().then(() => (init_schema(), schema_exports));
          const { eq: eq2 } = await import("drizzle-orm");
          const db = await getDb2();
          if (db) {
            const results = await db.select().from(users2).where(eq2(users2.id, payload.userId)).limit(1);
            if (results[0]) {
              user = results[0];
            }
          }
        }
      }
    } catch (_jwtError) {
    }
  }
  const bypassEnabled = process.env.ENABLE_ADMIN_BYPASS === "true";
  if ((!IS_PRODUCTION || bypassEnabled) && !user) {
    user = {
      id: 1,
      openId: "remote-admin",
      name: "Admin User",
      email: "admin@sialkotsamplemasters.com",
      role: "admin",
      loginMethod: "local",
      lastSignedIn: /* @__PURE__ */ new Date(),
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs4 from "fs";
import { nanoid as nanoid3 } from "nanoid";
import path3 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs3 from "node:fs";
import path2 from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR = path2.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs3.existsSync(LOG_DIR)) {
    fs3.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs3.existsSync(logPath) || fs3.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs3.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs3.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path2.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs3.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path2.resolve(import.meta.dirname),
  root: path2.resolve(import.meta.dirname, "client"),
  publicDir: path2.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs4.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid3()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path3.resolve(import.meta.dirname, "../..", "dist", "public") : path3.resolve(import.meta.dirname, "public");
  if (!fs4.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  const MODEL_MAP = {
    "oversize-hoodie.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/zuxviTdYwpHzhDSE.glb",
    "sweatshirt.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/nfJjpbTmWQynLNVx.glb",
    "tshirt-normal.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/adtYgrITgJZMRrNl.glb",
    "raglan-tshirt.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/PxqQBXgbWoMAKRZJ.glb",
    "soccer-uniform.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/uhdDWMRBkGKpuvPv.glb",
    "basketball-uniform.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/YqjgRtpukMWNALIs.glb",
    "american-football.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/RnsDwykJBkcaHyOg.glb",
    "trouser.glb": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/ynQDWlpbRtXSgxAB.glb"
  };
  app.get("/api/models/:filename", async (req, res) => {
    const { filename } = req.params;
    const cdnUrl = MODEL_MAP[filename];
    if (!cdnUrl) {
      res.status(404).json({ error: "Model not found" });
      return;
    }
    try {
      const upstream = await fetch(cdnUrl);
      if (!upstream.ok) {
        res.status(502).json({ error: "Upstream fetch failed" });
        return;
      }
      res.setHeader("Content-Type", "model/gltf-binary");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cache-Control", "public, max-age=86400");
      const contentLength = upstream.headers.get("content-length");
      if (contentLength) res.setHeader("Content-Length", contentLength);
      const reader = upstream.body.getReader();
      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        res.write(Buffer.from(value));
        return pump();
      };
      await pump();
    } catch (err) {
      console.error("[GLB proxy] Error:", err);
      res.status(500).json({ error: "Proxy error" });
    }
  });
  registerOAuthRoutes(app);
  const crypto = await import("crypto");
  const { SignJWT: SignJWTLocal } = await import("jose");
  const { getDb: getDbLocal } = await Promise.resolve().then(() => (init_db(), db_exports));
  const JWT_SECRET_LOCAL = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback_super_secret_for_local_dev_only_12345"
  );
  function hashPwd(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const key = crypto.scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${key}`;
  }
  function verifyPwd(password, hash) {
    try {
      const [salt, key] = hash.split(":");
      if (!salt || !key) return false;
      return crypto.scryptSync(password, salt, 64).toString("hex") === key;
    } catch {
      return false;
    }
  }
  try {
    const seedDb = await getDbLocal();
    if (seedDb) {
      const { users: usersTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eqOp } = await import("drizzle-orm");
      const allAdmins = await seedDb.select().from(usersTable).where(eqOp(usersTable.role, "admin"));
      const hasValidAdmin = allAdmins.some((a) => a.password && a.password.includes(":"));
      if (!hasValidAdmin) {
        const noPasswordAdmin = allAdmins.find((a) => !a.password || !a.password.includes(":"));
        if (noPasswordAdmin) {
          console.log("[Auth] Updating admin password for:", noPasswordAdmin.email);
          await seedDb.update(usersTable).set({ password: hashPwd("admin123"), email: "admin@sialkotsamplemasters.com" }).where(eqOp(usersTable.id, noPasswordAdmin.id));
        } else {
          console.log("[Auth] Creating default admin: admin@sialkotsamplemasters.com / admin123");
          await seedDb.insert(usersTable).values({
            openId: "local-admin-" + Date.now(),
            name: "Super Admin",
            email: "admin@sialkotsamplemasters.com",
            role: "admin",
            loginMethod: "local",
            password: hashPwd("admin123")
          });
        }
      } else {
        console.log("[Auth] Admin with valid password exists");
      }
    }
  } catch (seedErr) {
    console.error("[Auth] Admin seed error:", seedErr);
  }
  app.post("/api/admin/login", async (req, res) => {
    try {
      console.log("[Login] Attempt received");
      const loginDb = await getDbLocal();
      if (!loginDb) return res.status(500).json({ error: "Database not available" });
      const { users: usersTable } = await Promise.resolve().then(() => (init_schema(), schema_exports));
      const { eq: eqOp } = await import("drizzle-orm");
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: "Email and password required" });
      console.log("[Login] Looking up:", email);
      const results = await loginDb.select().from(usersTable).where(eqOp(usersTable.email, email)).limit(1);
      const user = results[0];
      if (!user) return res.status(401).json({ error: "Invalid credentials." });
      if (user.role !== "admin") return res.status(401).json({ error: "Not an admin." });
      if (!user.password) return res.status(401).json({ error: "Password not set." });
      if (!verifyPwd(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials." });
      }
      console.log("[Login] Password OK, creating JWT...");
      loginDb.update(usersTable).set({ lastSignedIn: /* @__PURE__ */ new Date() }).where(eqOp(usersTable.id, user.id)).catch(() => {
      });
      const token = await new SignJWTLocal({ userId: user.id, role: user.role }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(JWT_SECRET_LOCAL);
      res.cookie("admin_token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: req.protocol === "https" || req.headers["x-forwarded-proto"] === "https",
        maxAge: 7 * 24 * 60 * 60 * 1e3
      });
      console.log("[Login] Success!", user.email);
      return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      console.error("[Login] ERROR:", err?.message, err?.stack);
      return res.status(500).json({ error: "Login error: " + (err?.message || "unknown") });
    }
  });
  app.post("/api/admin/logout", (_req, res) => {
    res.clearCookie("admin_token", { path: "/" });
    return res.json({ success: true });
  });
  app.get("/api/admin/debug", async (_req, res) => {
    const info = { nodeVersion: process.version, dbUrl: process.env.DATABASE_URL ? "SET" : "NOT SET" };
    try {
      const debugDb = await getDbLocal();
      if (!debugDb) {
        info.error = "Database not connected";
        return res.json(info);
      }
      info.dbConnected = true;
      try {
        const rawResult = await debugDb.execute({ sql: "SELECT id, email, role, password FROM users LIMIT 5", params: [] });
        info.rawQuery = "SUCCESS";
        info.rawRows = rawResult;
      } catch (rawErr) {
        info.rawQuery = "FAILED";
        info.rawError = rawErr?.message;
        info.rawCause = rawErr?.cause?.message || rawErr?.cause?.sqlMessage || String(rawErr?.cause);
        info.rawCode = rawErr?.cause?.code;
        info.rawErrno = rawErr?.cause?.errno;
      }
      try {
        const { users: ut } = await Promise.resolve().then(() => (init_schema(), schema_exports));
        const allUsers = await debugDb.select().from(ut).limit(3);
        info.drizzleQuery = "SUCCESS";
        info.userCount = allUsers.length;
        info.users = allUsers.map((u) => ({
          id: u.id,
          email: u.email,
          role: u.role,
          hasPassword: !!u.password,
          pwdFormat: u.password ? u.password.includes(":") ? "scrypt" : "other_" + u.password.substring(0, 10) : "none"
        }));
      } catch (ormErr) {
        info.drizzleQuery = "FAILED";
        info.drizzleError = ormErr?.message;
        info.drizzleCause = ormErr?.cause?.message || ormErr?.cause?.sqlMessage || String(ormErr?.cause);
      }
      return res.json(info);
    } catch (err) {
      info.error = err?.message;
      info.cause = err?.cause?.message || String(err?.cause);
      return res.json(info);
    }
  });
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  const isProd = process.env.NODE_ENV === "production";
  const uploadsPath = isProd ? path4.resolve(import.meta.dirname, "..", "uploads") : path4.resolve(import.meta.dirname, "..", "..", "uploads");
  console.log(`[Storage] Serving uploads from: ${uploadsPath}`);
  if (!fs.existsSync(uploadsPath)) {
    console.log(`[Storage] Creating uploads directory...`);
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use("/uploads", express2.static(uploadsPath));
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
