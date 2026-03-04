import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { aiAgentRouter } from "./ai/agentRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import {
  // Users
  upsertUser, getUserByOpenId,
  // Products
  getActiveProducts, getAllProducts, getProductBySlug, getProductById,
  createProduct, updateProduct, deleteProduct, getFeaturedProducts,
  // Product images
  getProductImages, addProductImage, deleteProductImage, reorderProductImages,
  // Slab prices
  getSlabPrices, setSlabPrices,
  // Size charts
  getSizeChart, upsertSizeChart,
  // Shipping
  getActiveShippingZones, getAllShippingZones, createShippingZone,
  updateShippingZone, deleteShippingZone, findShippingZoneForCountry,
  // Cart
  getCartItems, upsertCartItem, updateCartItemQty, removeCartItem, clearCart,
  // Orders
  createOrder, getOrderByNumber, getAllOrders, updateOrderStatus,
  // RFQ
  createRfqSubmission, getAllRfqSubmissions,
  // Blog
  getPublishedBlogPosts, getBlogPostBySlug,
  // Portfolio (new image-based system)
  listPortfolioItems, getPortfolioItemWithImages, getPortfolioCategories,
  createPortfolioItem, updatePortfolioItem, deletePortfolioItem,
  addPortfolioImage, deletePortfolioImage, reorderPortfolioImages,
  // Testimonials
  getFeaturedTestimonials,
  // Contact
  createContactSubmission,
} from "./db";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

// ─── Admin guard middleware ───────────────────────────────────────────────────

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// ─── Slab price schema ────────────────────────────────────────────────────────

const slabSchema = z.object({
  minQty: z.number().int().positive(),
  maxQty: z.number().int().positive().nullable().optional(),
  pricePerUnit: z.string(),
  label: z.string().max(100).optional(),
  sortOrder: z.number().int().default(0),
});

// ─── Product router ───────────────────────────────────────────────────────────

const productRouter = router({
  list: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      search: z.string().optional(),
      limit: z.number().int().min(1).max(100).default(24),
      offset: z.number().int().min(0).default(0),
    }).optional())
    .query(async ({ input }) => {
      return getActiveProducts(input);
    }),

  featured: publicProcedure.query(() => getFeaturedProducts()),

  categories: publicProcedure.query(async () => {
    const all = await getActiveProducts();
    const cats = Array.from(new Set(all.map(p => p.category)));
    return cats;
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const product = await getProductBySlug(input.slug);
      if (!product) return null;
      const [images, slabs, sizeChart] = await Promise.all([
        getProductImages(product.id),
        getSlabPrices(product.id),
        getSizeChart(product.id),
      ]);
      return { ...product, images, slabs, sizeChart: sizeChart ?? null };
    }),

  // Admin: full list including inactive
  adminList: adminProcedure.query(() => getAllProducts()),

  create: adminProcedure
    .input(z.object({
      title: z.string().min(1).max(500),
      slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
      category: z.string().min(1).max(100),
      description: z.string().optional(),
      shortDescription: z.string().max(500).optional(),
      mainImage: z.string().optional(),
      samplePrice: z.string().optional(),
      weight: z.string().optional(),
      availableSizes: z.string().optional(), // JSON
      availableColors: z.string().optional(), // JSON
      material: z.string().max(255).optional(),
      isFeatured: z.boolean().default(false),
      isActive: z.boolean().default(true),
      freeShipping: z.boolean().default(false),
      seoTitle: z.string().max(255).optional(),
      seoDescription: z.string().optional(),
      seoKeywords: z.string().optional(),
      sortOrder: z.number().int().default(0),
      slabs: z.array(slabSchema).optional(),
      sizeChart: z.object({
        chartData: z.string(),
        unit: z.enum(["inches", "cm"]),
        notes: z.string().optional(),
      }).optional(),
    }))
    .mutation(async ({ input }) => {
      const { slabs, sizeChart, ...productData } = input;
      const product = await createProduct(productData);
      if (!product) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      if (slabs && slabs.length > 0) await setSlabPrices(product.id, slabs);
      if (sizeChart) await upsertSizeChart(product.id, sizeChart);
      return product;
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number().int().positive(),
      title: z.string().min(1).max(500).optional(),
      slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
      category: z.string().min(1).max(100).optional(),
      description: z.string().optional(),
      shortDescription: z.string().max(500).optional(),
      mainImage: z.string().optional(),
      samplePrice: z.string().optional(),
      weight: z.string().optional(),
      availableSizes: z.string().optional(),
      availableColors: z.string().optional(),
      material: z.string().max(255).optional(),
      isFeatured: z.boolean().optional(),
      isActive: z.boolean().optional(),
      freeShipping: z.boolean().optional(),
      seoTitle: z.string().max(255).optional(),
      seoDescription: z.string().optional(),
      seoKeywords: z.string().optional(),
      sortOrder: z.number().int().optional(),
      slabs: z.array(slabSchema).optional(),
      sizeChart: z.object({
        chartData: z.string(),
        unit: z.enum(["inches", "cm"]),
        notes: z.string().optional(),
      }).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, slabs, sizeChart, ...data } = input;
      await updateProduct(id, data);
      if (slabs !== undefined) await setSlabPrices(id, slabs);
      if (sizeChart) await upsertSizeChart(id, sizeChart);
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await deleteProduct(input.id);
      return { success: true };
    }),

  uploadImage: adminProcedure
    .input(z.object({
      productId: z.number().int().positive(),
      imageBase64: z.string(),
      mimeType: z.string().default("image/jpeg"),
      altText: z.string().optional(),
      sortOrder: z.number().int().default(0),
    }))
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.imageBase64, "base64");
      const ext = input.mimeType.split("/")[1] ?? "jpg";
      const key = `products/${input.productId}/${nanoid(10)}.${ext}`;
      const { url } = await storagePut(key, buffer, input.mimeType);
      await addProductImage({
        productId: input.productId,
        imageUrl: url,
        altText: input.altText,
        sortOrder: input.sortOrder,
      });
      return { url };
    }),

  deleteImage: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await deleteProductImage(input.id);
      return { success: true };
    }),

  reorderImages: adminProcedure
    .input(z.array(z.object({ id: z.number(), sortOrder: z.number() })))
    .mutation(async ({ input }) => {
      await reorderProductImages(input);
      return { success: true };
    }),
});

// ─── Shipping router ──────────────────────────────────────────────────────────

const shippingRouter = router({
  zones: publicProcedure.query(() => getActiveShippingZones()),

  adminZones: adminProcedure.query(() => getAllShippingZones()),

  calculate: publicProcedure
    .input(z.object({
      countryCode: z.string().length(2),
      items: z.array(z.object({
        productId: z.number().int(),
        quantity: z.number().int().positive(),
      })),
    }))
    .query(async ({ input }) => {
      // Check if any product has free shipping
      const productDetails = await Promise.all(
        input.items.map(item => getProductById(item.productId))
      );
      const allFreeShipping = productDetails.every(p => p?.freeShipping);
      if (allFreeShipping) {
        return { cost: "0.00", currency: "USD", estimatedDays: { min: 7, max: 21 }, freeShipping: true, zoneName: "Free Shipping" };
      }

      const zone = await findShippingZoneForCountry(input.countryCode);
      if (!zone) {
        // Default fallback rate for unlisted countries
        return { cost: "45.00", currency: "USD", estimatedDays: { min: 14, max: 30 }, freeShipping: false, zoneName: "International" };
      }

      // Calculate: base + per-unit
      const totalQty = input.items.reduce((sum, i) => sum + i.quantity, 0);
      const totalWeight = productDetails.reduce((sum, p, idx) => {
        const qty = input.items[idx]?.quantity ?? 1;
        return sum + (parseFloat(p?.weight ?? "0.3") * qty);
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
        zoneName: zone.zoneName,
      };
    }),

  createZone: adminProcedure
    .input(z.object({
      zoneName: z.string().min(1).max(100),
      countries: z.string(), // JSON array of ISO codes
      baseRate: z.string().regex(/^\d+(\.\d{1,2})?$/),
      perUnitRate: z.string().regex(/^\d+(\.\d{1,2})?$/).default("0.00"),
      perKgRate: z.string().regex(/^\d+(\.\d{1,2})?$/).default("0.00"),
      minDays: z.number().int().min(1).default(7),
      maxDays: z.number().int().min(1).default(21),
      currency: z.string().max(10).default("USD"),
      isActive: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      await createShippingZone(input);
      return { success: true };
    }),

  updateZone: adminProcedure
    .input(z.object({
      id: z.number().int().positive(),
      zoneName: z.string().min(1).max(100).optional(),
      countries: z.string().optional(),
      baseRate: z.string().optional(),
      perUnitRate: z.string().optional(),
      perKgRate: z.string().optional(),
      minDays: z.number().int().optional(),
      maxDays: z.number().int().optional(),
      currency: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateShippingZone(id, data);
      return { success: true };
    }),

  deleteZone: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await deleteShippingZone(input.id);
      return { success: true };
    }),
});

// ─── Cart router ──────────────────────────────────────────────────────────────

const cartRouter = router({
  get: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const items = await getCartItems(input.sessionId);
      // Enrich with product details
      const enriched = await Promise.all(items.map(async item => {
        const product = await getProductById(item.productId);
        const slabs = await getSlabPrices(item.productId);
        // Find applicable slab price
        const slab = slabs.find(s => {
          const qty = item.quantity;
          return qty >= s.minQty && (s.maxQty === null || qty <= (s.maxQty ?? Infinity));
        }) ?? slabs[0];
        return {
          ...item,
          product: product ?? null,
          unitPrice: slab ? parseFloat(slab.pricePerUnit) : 0,
          lineTotal: slab ? parseFloat(slab.pricePerUnit) * item.quantity : 0,
        };
      }));
      return enriched;
    }),

  addItem: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
      selectedSize: z.string().optional(),
      selectedColor: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await upsertCartItem(input);
      return { success: true };
    }),

  updateQty: publicProcedure
    .input(z.object({ id: z.number().int().positive(), quantity: z.number().int().min(0) }))
    .mutation(async ({ input }) => {
      await updateCartItemQty(input.id, input.quantity);
      return { success: true };
    }),

  removeItem: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await removeCartItem(input.id);
      return { success: true };
    }),

  clear: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      await clearCart(input.sessionId);
      return { success: true };
    }),
});

// ─── Order router ─────────────────────────────────────────────────────────────

const orderRouter = router({
  create: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      customerName: z.string().min(1),
      customerEmail: z.string().email(),
      customerPhone: z.string().optional(),
      companyName: z.string().optional(),
      addressLine1: z.string().min(1),
      addressLine2: z.string().optional(),
      city: z.string().min(1),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().min(1),
      countryCode: z.string().length(2),
      items: z.array(z.object({
        productId: z.number(),
        title: z.string(),
        qty: z.number(),
        size: z.string().optional(),
        color: z.string().optional(),
        unitPrice: z.number(),
      })),
      subtotal: z.number(),
      shippingCost: z.number(),
      totalAmount: z.number(),
    }))
    .mutation(async ({ input }) => {
      const orderNumber = `SSM-${Date.now()}-${nanoid(6).toUpperCase()}`;
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
        status: "pending",
      });
      // Clear cart after order creation
      await clearCart(input.sessionId);
      // Notify owner
      await notifyOwner({
        title: `New Order: ${orderNumber}`,
        content: `Order from ${input.customerName} (${input.companyName ?? input.customerEmail}) — Total: $${input.totalAmount.toFixed(2)}`,
      });
      return { success: true, orderNumber };
    }),

  byNumber: publicProcedure
    .input(z.object({ orderNumber: z.string() }))
    .query(async ({ input }) => getOrderByNumber(input.orderNumber)),

  adminList: adminProcedure.query(() => getAllOrders()),

  updateStatus: adminProcedure
    .input(z.object({
      id: z.number().int().positive(),
      status: z.enum(["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"]),
    }))
    .mutation(async ({ input }) => {
      await updateOrderStatus(input.id, input.status);
      return { success: true };
    }),
});

// ─── RFQ router ───────────────────────────────────────────────────────────────

const rfqRouter = router({
  submit: publicProcedure
    .input(z.object({
      companyName: z.string().min(1),
      contactName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      country: z.string().optional(),
      website: z.string().optional(),
      productType: z.string().min(1),
      quantity: z.string().min(1),
      customizationType: z.string().optional(),
      fabricPreference: z.string().optional(),
      timeline: z.string().optional(),
      budgetRange: z.string().optional(),
      description: z.string().optional(),
      serviceType: z.string().optional(),
      howHeard: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
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
        additionalNotes: input.description,
      });
      await notifyOwner({
        title: `New RFQ from ${input.companyName}`,
        content: `${input.contactName} (${input.email}) requested a quote for ${input.productType} — Qty: ${input.quantity}`,
      });
      return { success: true };
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") return [];
    return getAllRfqSubmissions();
  }),

  // Upload a design screenshot to S3 and return the URL
  uploadDesignImage: publicProcedure
    .input(z.object({
      imageBase64: z.string(),
      mimeType: z.string().default('image/jpeg'),
    }))
    .mutation(async ({ input }) => {
      const buffer = Buffer.from(input.imageBase64, 'base64');
      const ext = input.mimeType.split('/')[1] || 'jpg';
      const fileKey = `design-quotes/${nanoid(12)}.${ext}`;
      const { url } = await storagePut(fileKey, buffer, input.mimeType);
      return { url };
    }),

  // Submit an RFQ with an attached 3D design image
  submitWithDesign: publicProcedure
    .input(z.object({
      companyName: z.string().min(1),
      contactName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      country: z.string().optional(),
      productType: z.string().min(1),
      quantity: z.string().min(1),
      timeline: z.string().optional(),
      budgetRange: z.string().optional(),
      description: z.string().optional(),
      designImageUrl: z.string().url().optional(),
      garmentType: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
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
        garmentType: input.garmentType,
      });
      const designNote = input.designImageUrl
        ? `\n\n🎨 Design Preview: ${input.designImageUrl}`
        : '';
      await notifyOwner({
        title: `New 3D Design Quote from ${input.companyName}`,
        content: `${input.contactName} (${input.email}) submitted a 3D design quote request for ${input.productType} (${input.garmentType ?? ''}) — Qty: ${input.quantity}${designNote}`,
      });
      return { success: true };
    }),
});

// ─── Blog router ──────────────────────────────────────────────────────────────

const blogRouter = router({
  list: publicProcedure.query(() => getPublishedBlogPosts()),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getBlogPostBySlug(input.slug)),
});

// ─── Portfolio router ─────────────────────────────────────────────────────────

const portfolioRouter = router({
  // Public queries
  list: publicProcedure
    .input(z.object({ category: z.string().optional() }).optional())
    .query(({ input }) => listPortfolioItems({ category: input?.category, onlyActive: true })),

  categories: publicProcedure.query(() => getPortfolioCategories()),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getPortfolioItemWithImages(input.id)),

  // Admin: create portfolio item
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      category: z.string().min(1),
      description: z.string().optional(),
      tags: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      seoKeywords: z.string().optional(),
      geoTarget: z.string().optional(),
      isFeatured: z.boolean().optional(),
      isActive: z.boolean().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return createPortfolioItem(input);
    }),

  // Admin: update portfolio item
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      category: z.string().optional(),
      description: z.string().optional(),
      tags: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      seoKeywords: z.string().optional(),
      geoTarget: z.string().optional(),
      isFeatured: z.boolean().optional(),
      isActive: z.boolean().optional(),
      sortOrder: z.number().optional(),
      coverImage: z.string().optional(),
      ogImage: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { id, ...data } = input;
      await updatePortfolioItem(id, data);
      return { success: true };
    }),

  // Admin: delete portfolio item (cascades images)
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      await deletePortfolioItem(input.id);
      return { success: true };
    }),

  // Admin: upload image to S3 and attach to portfolio item
  uploadImage: protectedProcedure
    .input(z.object({
      portfolioItemId: z.number(),
      imageBase64: z.string(),
      mimeType: z.string().default("image/jpeg"),
      altText: z.string().optional(),
      caption: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const buffer = Buffer.from(input.imageBase64, "base64");
      const ext = input.mimeType.split("/")[1] || "jpg";
      const fileKey = `portfolio/${input.portfolioItemId}/${nanoid(10)}.${ext}`;
      const { url } = await storagePut(fileKey, buffer, input.mimeType);
      const img = await addPortfolioImage({
        portfolioItemId: input.portfolioItemId,
        imageUrl: url,
        fileKey,
        altText: input.altText,
        caption: input.caption,
        sortOrder: input.sortOrder ?? 0,
      });
      // Set as cover image if it's the first image
      const existing = await getPortfolioItemWithImages(input.portfolioItemId);
      if (existing && existing.images.length === 1) {
        await updatePortfolioItem(input.portfolioItemId, { coverImage: url, ogImage: url });
      }
      return img;
    }),

  // Admin: delete a single image
  deleteImage: protectedProcedure
    .input(z.object({ imageId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      await deletePortfolioImage(input.imageId);
      return { success: true };
    }),

  // Admin: reorder images
  reorderImages: protectedProcedure
    .input(z.array(z.object({ id: z.number(), sortOrder: z.number() })))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      await reorderPortfolioImages(input);
      return { success: true };
    }),

  // Admin: set cover image
  setCover: protectedProcedure
    .input(z.object({ portfolioItemId: z.number(), imageUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      await updatePortfolioItem(input.portfolioItemId, { coverImage: input.imageUrl, ogImage: input.imageUrl });
      return { success: true };
    }),
});

// ─── Testimonials router ──────────────────────────────────────────────────────

const testimonialsRouter = router({
  featured: publicProcedure.query(() => getFeaturedTestimonials()),
});

// ─── Contact router ───────────────────────────────────────────────────────────

const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
      company: z.string().optional(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      await createContactSubmission(input);
      await notifyOwner({
        title: `New Contact from ${input.name}`,
        content: `${input.email}${input.company ? ` (${input.company})` : ""}: ${input.message.slice(0, 200)}`,
      });
      return { success: true };
    }),
});

// ─── App router ───────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
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
    getApiKey: adminProcedure.query(async ({ ctx }) => {
      const { getDb: getDatabase } = await import("./db");
      const { users } = await import("../drizzle/schema");
      const { eq } = await import("drizzle-orm");
      const db = await getDatabase();
      if (!db) return { hasKey: false, maskedKey: "" };
      const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
      const key = (user as any)?.geminiApiKey || "";
      return {
        hasKey: !!key,
        maskedKey: key ? key.substring(0, 6) + "..." + key.substring(key.length - 4) : "",
      };
    }),
    saveApiKey: adminProcedure
      .input(z.object({ apiKey: z.string().max(255) }))
      .mutation(async ({ input, ctx }) => {
        const { getDb: getDatabase } = await import("./db");
        const { users } = await import("../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        const db = await getDatabase();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
        await db.update(users).set({ geminiApiKey: input.apiKey || null } as any).where(eq(users.id, ctx.user.id));
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
