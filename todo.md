# Xelent B2B Website - Project TODO

## Foundation
- [x] Database schema: rfq_submissions, blog_posts, testimonials, portfolio_items, contact_submissions tables
- [x] Server routes: RFQ submission, contact submission, blog listing, portfolio listing, testimonials
- [x] Global layout with top navigation and footer
- [x] Theme setup: elegant dark/gold color palette (OKLCH)
- [x] Google Fonts: Playfair Display (serif) + Barlow Condensed + Inter

## Pages
- [x] Homepage: hero section, stats, services overview, product preview, testimonials, CTA
- [x] About Us: company story, expertise, certifications, production capacity, team
- [x] Services: custom manufacturing, private label, design consultation, MOQ, bulk orders
- [x] Product Categories: T-shirts, Hoodies, Joggers, Sweatshirts, Bomber Jackets
- [x] Portfolio/Case Studies: completed projects, client testimonials, results
- [x] Blog: SEO articles listing, individual post pages
- [x] RFQ System: detailed quote request form with validation
- [x] Contact: inquiry form, WhatsApp, map, business hours

## SEO Infrastructure
- [x] Meta tags and Open Graph on all pages
- [x] JSON-LD schema markup (Organization, LocalBusiness, WebSite) in index.html
- [x] XML sitemap at /sitemap.xml
- [x] Robots.txt
- [x] Pakistan geo-targeting keywords throughout content
- [x] Canonical tags
- [x] Structured internal linking
- [x] SEOHead component with per-page meta management
- [x] Twitter Card meta tags

## Technical
- [x] Mobile-responsive design (all breakpoints)
- [x] Fast loading: CDN images, lazy loading
- [x] WhatsApp floating button integration
- [x] Google Maps embed on Contact page
- [x] Vitest tests for all routers (19 tests passing)
- [x] DB migration: contact_submissions table added

## Assets
- [x] Logo and brand identity (X mark + wordmark)
- [x] Hero section background image (CDN)
- [x] Product category images (CDN)
- [x] Portfolio showcase images (CDN)
- [x] Services and About background images (CDN)

## E-Commerce System (B2B Shop)

### Database Schema
- [x] products table: title, slug, description, category, mainImage, samplePrice, isFeatured, isActive, freeShipping, seoTitle, seoDescription, seoKeywords
- [x] product_images table: productId, imageUrl, sortOrder, altText
- [x] slab_prices table: productId, minQty, maxQty, pricePerUnit, label
- [x] size_charts table: productId, chartData (JSON), notes
- [x] shipping_zones table: country, region, baseRate, perKgRate, estimatedDays, currency
- [x] cart_items table: sessionId/userId, productId, quantity, selectedSize
- [x] orders table: full order details, status, shippingCost, totalAmount, stripePaymentIntentId

### Server / API
- [x] product.list — paginated, filterable by category/search
- [x] product.bySlug — full product detail with images, slabs, size chart
- [x] product.create / update / delete (admin only)
- [x] product.uploadImage — S3 upload for product images
- [x] cart.get / cart.addItem / cart.updateItem / cart.removeItem / cart.clear
- [x] shipping.calculate — dynamic rate based on country + weight/qty
- [x] shipping.listZones / createZone / updateZone / deleteZone (admin)
- [x] order.create — Stripe PaymentIntent creation (Stripe-ready, integrate later)
- [x] admin.listProducts / admin.listOrders

### Shop Page
- [x] Creative asymmetric grid layout with category filter tabs
- [x] Search bar with real-time filtering
- [x] Product cards: main image, title, starting price, MOQ badge, hover overlay with quick-view CTA
- [x] Pagination / infinite scroll
- [x] SEO: meta tags, JSON-LD ProductCollection schema, geo-optimized headings
- [x] Empty state and loading skeletons

### Product Detail Page
- [x] Main image with zoom-on-hover (CSS transform or react-medium-image-zoom)
- [x] Thumbnail gallery strip for additional images (clickable to swap main)
- [x] Product title, description (rich text rendered)
- [x] Slab pricing table: qty range → price per unit (highlighted active tier)
- [x] Sample price displayed separately with label
- [x] Size chart link → modal popup with full sizing guide table
- [x] Size selector (S, M, L, XL, XXL, custom)
- [x] Quantity input (validates against MOQ slabs)
- [x] Add to Cart button
- [x] Direct Buy / Request Quote button (Stripe-ready)
- [x] SEO: JSON-LD Product schema with offers, breadcrumbs, canonical

### Cart & Checkout
- [x] Slide-out cart drawer with item list, quantities, subtotal
- [x] Checkout page: order summary, shipping address form
- [x] Country selector → auto-calculate shipping cost from shipping_zones table
- [x] Free shipping badge if product has freeShipping = true
- [x] Order total breakdown: subtotal + shipping + tax (if applicable)
- [x] Stripe checkout integration (placeholder until keys provided)
- [x] Order confirmation page

### Admin Panel
- [x] Admin route guard (role = admin only)
- [x] Product list table with edit/delete/toggle active
- [x] Add/Edit product form: all fields, image upload (S3), slab pricing editor, size chart editor
- [x] Shipping zones manager: add/edit/delete country shipping rates
- [x] Orders list with status management
- [x] Free shipping toggle per product

## Rebranding: Sialkot Sample Masters

- [x] Process logo — remove black background, make transparent PNG
- [x] Upload transparent logo to CDN
- [x] Update all brand text (Xelent → Sialkot Sample Masters)
- [x] Update SEO meta tags, geo-targeting, and JSON-LD structured data
- [x] Update Navbar with new logo and brand name
- [x] Update Footer with new brand name and Sialkot location
- [x] Update all page-level copy (headings, descriptions, CTAs)
- [x] Update sitemap.xml and robots.txt domain references
- [x] Update VITE_APP_TITLE secret

## Animations & UX Polish

- [x] Scroll-to-top on every route change
- [x] Reusable animation components (FadeIn, SlideUp, StaggerContainer, CountUp)
- [x] Page transition wrapper (fade in/out between routes)
- [x] Home page: hero parallax, stats count-up, section entrance animations
- [x] About, Services, Products pages: card/section entrance animations
- [x] Shop, Portfolio, Blog, RFQ, Contact pages: entrance animations

## Product Category Overhaul

- [x] Replace Products page: 6 new categories (Hunting, Sports, Ski, Tech, Streetwear, Martial Arts)
- [x] Update Homepage product preview section with new categories
- [x] Update Shop page category filters with new categories
- [x] Update all SEO meta tags and keywords for new categories
- [x] Update Footer product links
- [x] Update sitemap.xml with new category anchors
- [x] Update index.html structured data / JSON-LD for new categories

## Portfolio Gallery Redesign

- [x] portfolioItems + portfolioImages tables in schema
- [x] DB helpers for portfolio CRUD and image management
- [x] tRPC routers: portfolio.list, portfolio.byId, portfolio.create/update/delete (admin), portfolio.uploadImage/deleteImage/reorderImages (admin)
- [x] Public Portfolio page: sticky category filter, product grid, sliding thumbnail carousel per card, lightbox modal
- [x] Admin Portfolio panel: multi-image S3 upload, drag-to-reorder, SEO/geo metadata fields
- [x] Per-item JSON-LD schema, alt text on all images, Open Graph image
- [x] Tests for portfolio routers (22 tests, 58 total passing)

## 3D Product Customizer Integration

- [x] /customize page with full-screen iframe embedding clothing-designer-app.vercel.app
- [x] Branded header on /customize page with logo + back button
- [x] "Customize This Product" CTA button on ProductDetail page
- [x] "Customize" button on Shop product cards
- [x] /customize route registered in App.tsx
- [x] Customize link in Navbar

## Native 3D Designer (Fayr3D) Integration

- [x] Cloned Xelent143/3D-Designer repo and extracted all components
- [x] Installed three, @react-three/fiber, @react-three/drei, zustand, postprocessing, @google/generative-ai, @capacitor/core, @capacitor/filesystem
- [x] Copied all designer components to client/src/designer/
- [x] Uploaded all 8 GLB garment models to CDN (Hoodie, Sweatshirt, T-Shirt, Raglan, Soccer, Basketball, American Football, Trousers)
- [x] Uploaded all camo textures (Woodland, Desert, Urban, Arctic) and effect maps (Embroidery, Applique) to CDN
- [x] Updated models.ts with CDN URLs for all GLB files
- [x] Updated TextureUploader.tsx and DecalRenderer.tsx with CDN texture URLs
- [x] Rewrote /customize page as native Three.js app (no iframe, no login wall)
- [x] Xelent-branded header with gold Back link on /customize page
- [x] 0 TypeScript errors

## 3D Designer Bug Fixes
- [x] Fix R3F "Cannot set data-loc" error when rotating logo decal
- [x] Fix logo decal z-fighting / disappearing when enlarged on garment

## Send Design with Quote Feature
- [x] Screenshot capture from Three.js canvas (gl.domElement.toDataURL)
- [x] Upload screenshot to S3 via tRPC mutation
- [x] DesignQuoteModal: design image preview + pre-filled RFQ form
- [x] tRPC endpoint: designQuote.submit (saves to rfq_submissions with design_image_url)
- [x] Owner notification with design image link
- [x] "Send Design with Quote" button in Customize.tsx header

## Multi-View Design Capture
- [x] Capture front, back, left, right views automatically on "Send Design with Quote"
- [x] Include uploaded logos and textures metadata in the quote (asset chips in modal)
- [x] Display all 4 view thumbnails in DesignQuoteModal (2x2 grid, click-to-enlarge)
- [x] Store all 4 view URLs in rfq_submissions additionalNotes field
- [x] Admin RFQ panel: "Quotes" tab with all 4 design view thumbnails per submission

## Light Theme Conversion
- [x] Rewrite :root CSS variables from dark to light (warm off-white backgrounds, charcoal text, gold accent)
- [x] Switch ThemeProvider defaultTheme from "dark" to "light"
- [x] Fix Portfolio.tsx: replace all bg-zinc-*, bg-black, text-white, text-zinc-* with semantic tokens
- [x] Fix Shop.tsx: replace shadow-black with shadow-foreground
- [x] Fix Navbar.tsx: replace shadow-black with shadow-foreground
- [x] Fix Footer.tsx: replace shadow-black with shadow-foreground
- [x] Update scrollbar colors to match light theme
- [x] Update ::selection color to match light theme
