-- ═══════════════════════════════════════════════════════════════════════════════
-- XELENT HUNTGEAR - HUNTING CATEGORIES SETUP
-- ═══════════════════════════════════════════════════════════════════════════════
-- Run this SQL to set up hunting-specific categories for Xelent Huntgear
-- This replaces the security/uniform categories with hunting apparel categories

-- Clear existing categories (optional - remove if you want to keep existing data)
-- DELETE FROM subcategories;
-- DELETE FROM categories;

-- ═══════════════════════════════════════════════════════════════════════════════
-- CATEGORY 1: HUNTING JACKETS
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, icon, seo_title, seo_description, seo_keywords, sort_order, is_active, created_at) VALUES
('Hunting Jackets', 'hunting-jackets', 'Waterproof, insulated, and camouflage hunting jackets for all weather conditions', '🧥', 
 'Custom Hunting Jackets Manufacturer | Camo & Waterproof | Xelent Huntgear Pakistan',
 'Premium custom hunting jackets manufacturing. Waterproof camo jackets, insulated parkas, softshell jackets. Low MOQ 50pcs. B2B export to USA, Europe, Australia.',
 'custom hunting jacket manufacturer, camo jacket supplier, waterproof hunting jacket Pakistan, insulated parka manufacturer, hunting apparel wholesale',
 1, true, NOW());

SET @cat1 = LAST_INSERT_ID();

INSERT INTO subcategories (category_id, name, slug, description, sort_order, is_active, created_at) VALUES
(@cat1, 'Camo Jackets', 'camo-jackets', 'Camouflage pattern hunting jackets', 1, true, NOW()),
(@cat1, 'Waterproof Jackets', 'waterproof-jackets', 'Rainproof hunting outerwear', 2, true, NOW()),
(@cat1, 'Insulated Parkas', 'insulated-parkas', 'Heavy winter hunting coats', 3, true, NOW()),
(@cat1, 'Softshell Jackets', 'softshell-jackets', 'Lightweight flexible jackets', 4, true, NOW()),
(@cat1, 'Blaze Orange', 'blaze-orange', 'High-visibility safety jackets', 5, true, NOW()),
(@cat1, 'Hunting Vests', 'vests', 'Game and tactical vests', 6, true, NOW());

-- ═══════════════════════════════════════════════════════════════════════════════
-- CATEGORY 2: HUNTING PANTS
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, icon, seo_title, seo_description, seo_keywords, sort_order, is_active, created_at) VALUES
('Hunting Pants', 'hunting-pants', 'Durable cargo pants, bibs, and trousers for hunting and outdoor activities', '👖',
 'Custom Hunting Pants Manufacturer | Cargo & Bibs | Xelent Huntgear Pakistan',
 'High-quality custom hunting pants manufacturing. Waterproof cargo pants, insulated bibs, tactical trousers. Durable fabrics. MOQ from 50 pieces.',
 'custom hunting pants manufacturer, cargo pants supplier, hunting bib manufacturer Pakistan, tactical trousers, outdoor apparel wholesale',
 2, true, NOW());

SET @cat2 = LAST_INSERT_ID();

INSERT INTO subcategories (category_id, name, slug, description, sort_order, is_active, created_at) VALUES
(@cat2, 'Cargo Pants', 'cargo-pants', 'Multi-pocket hunting trousers', 1, true, NOW()),
(@cat2, 'Bib Overalls', 'bib-overalls', 'Insulated hunting bibs', 2, true, NOW()),
(@cat2, 'Waterproof Pants', 'waterproof-pants', 'Rain gear bottoms', 3, true, NOW()),
(@cat2, 'Softshell Pants', 'softshell-pants', 'Flexible movement pants', 4, true, NOW()),
(@cat2, 'Convertible Pants', 'convertible-pants', 'Zip-off shorts/pants', 5, true, NOW()),
(@cat2, 'Base Layer Bottoms', 'base-layer-bottoms', 'Thermal underwear pants', 6, true, NOW());

-- ═══════════════════════════════════════════════════════════════════════════════
-- CATEGORY 3: CAMO GEAR
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, icon, seo_title, seo_description, seo_keywords, sort_order, is_active, created_at) VALUES
('Camo Gear', 'camo-gear', 'Full camouflage clothing and accessories for concealment', '🌿',
 'Custom Camo Gear Manufacturer | Camouflage Clothing | Xelent Huntgear Pakistan',
 'Custom camouflage apparel manufacturing. Digital camo, woodland, desert patterns. Ghillie suits, camo accessories. Low MOQ. Export quality.',
 'custom camo manufacturer, camouflage clothing supplier, digital camo Pakistan, ghillie suit manufacturer, camo gear wholesale',
 3, true, NOW());

SET @cat3 = LAST_INSERT_ID();

INSERT INTO subcategories (category_id, name, slug, description, sort_order, is_active, created_at) VALUES
(@cat3, 'Woodland Camo', 'woodland-camo', 'Traditional forest patterns', 1, true, NOW()),
(@cat3, 'Digital Camo', 'digital-camo', 'Modern pixelated patterns', 2, true, NOW()),
(@cat3, 'Desert Camo', 'desert-camo', 'Arid environment patterns', 3, true, NOW()),
(@cat3, 'Snow Camo', 'snow-camo', 'Winter white patterns', 4, true, NOW()),
(@cat3, 'Ghillie Suits', 'ghillie-suits', 'Full concealment suits', 5, true, NOW()),
(@cat3, 'Camo Accessories', 'camo-accessories', 'Hats, gloves, face paint', 6, true, NOW());

-- ═══════════════════════════════════════════════════════════════════════════════
-- CATEGORY 4: HUNTING SHIRTS
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, icon, seo_title, seo_description, seo_keywords, sort_order, is_active, created_at) VALUES
('Hunting Shirts', 'hunting-shirts', 'Performance hunting shirts, flannels, and base layers', '👕',
 'Custom Hunting Shirts Manufacturer | Flannel & Performance | Xelent Huntgear',
 'Custom hunting shirts manufacturing. Performance flannels, moisture-wicking shirts, thermal base layers. Scent control technology. B2B export.',
 'custom hunting shirt manufacturer, flannel shirt supplier, performance hunting shirt Pakistan, base layer manufacturer, outdoor apparel',
 4, true, NOW());

SET @cat4 = LAST_INSERT_ID();

INSERT INTO subcategories (category_id, name, slug, description, sort_order, is_active, created_at) VALUES
(@cat4, 'Flannel Shirts', 'flannel-shirts', 'Heavy cotton flannels', 1, true, NOW()),
(@cat4, 'Performance Shirts', 'performance-shirts', 'Moisture-wicking tops', 2, true, NOW()),
(@cat4, 'Long Sleeve', 'long-sleeve', 'Sun protection shirts', 3, true, NOW()),
(@cat4, 'Base Layer Tops', 'base-layer-tops', 'Thermal underwear tops', 4, true, NOW()),
(@cat4, 'Hunting Polo', 'hunting-polo', 'Quick-dry polo shirts', 5, true, NOW()),
(@cat4, 'Quarter Zip', 'quarter-zip', 'Mid-layer pullovers', 6, true, NOW());

-- ═══════════════════════════════════════════════════════════════════════════════
-- CATEGORY 5: OUTDOOR ACCESSORIES
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, icon, seo_title, seo_description, seo_keywords, sort_order, is_active, created_at) VALUES
('Outdoor Accessories', 'outdoor-accessories', 'Hunting hats, gloves, gaiters, and essential gear', '🎒',
 'Hunting Accessories Manufacturer | Hats, Gloves & Gear | Xelent Huntgear',
 'Custom hunting accessories manufacturing. Camo hats, insulated gloves, neck gaiters, boot gaiters. OEM & private label. Low MOQ.',
 'hunting accessories manufacturer, camo hat supplier, hunting glove manufacturer Pakistan, neck gaiter, outdoor gear wholesale',
 5, true, NOW());

SET @cat5 = LAST_INSERT_ID();

INSERT INTO subcategories (category_id, name, slug, description, sort_order, is_active, created_at) VALUES
(@cat5, 'Hunting Hats', 'hunting-hats', 'Caps, beanies, boonie hats', 1, true, NOW()),
(@cat5, 'Gloves', 'gloves', 'Insulated and shooting gloves', 2, true, NOW()),
(@cat5, 'Neck Gaiters', 'neck-gaiters', 'Face and neck protection', 3, true, NOW()),
(@cat5, 'Boot Gaiters', 'boot-gaiters', 'Snake and debris protection', 4, true, NOW()),
(@cat5, 'Hunting Belts', 'belts', 'Shell belts and tactical belts', 5, true, NOW()),
(@cat5, 'Hunting Socks', 'socks', 'Merino wool and cushioned socks', 6, true, NOW());

-- ═══════════════════════════════════════════════════════════════════════════════
-- CATEGORY 6: TACTICAL GEAR
-- ═══════════════════════════════════════════════════════════════════════════════
INSERT INTO categories (name, slug, description, icon, seo_title, seo_description, seo_keywords, sort_order, is_active, created_at) VALUES
('Tactical Gear', 'tactical-gear', 'Tactical vests, packs, and survival equipment', '🎯',
 'Tactical Gear Manufacturer | Vests, Packs & Equipment | Xelent Huntgear',
 'Custom tactical gear manufacturing. Hunting vests, tactical backpacks, survival equipment. MOLLE compatible. Durable construction.',
 'tactical gear manufacturer, hunting vest supplier, tactical backpack Pakistan, survival equipment, MOLLE gear wholesale',
 6, true, NOW());

SET @cat6 = LAST_INSERT_ID();

INSERT INTO subcategories (category_id, name, slug, description, sort_order, is_active, created_at) VALUES
(@cat6, 'Hunting Vests', 'hunting-vests', 'Game and utility vests', 1, true, NOW()),
(@cat6, 'Tactical Backpacks', 'tactical-backpacks', 'Hunting daypacks and packs', 2, true, NOW()),
(@cat6, 'Shell Bags', 'shell-bags', 'Ammo and shot shell holders', 3, true, NOW()),
(@cat6, 'Range Bags', 'range-bags', 'Shooting equipment bags', 4, true, NOW()),
(@cat6, 'Rifle Slings', 'slings', 'Gun carrying straps', 5, true, NOW()),
(@cat6, 'Survival Gear', 'survival-gear', 'Emergency equipment', 6, true, NOW());

-- ═══════════════════════════════════════════════════════════════════════════════
-- VERIFY INSERTION
-- ═══════════════════════════════════════════════════════════════════════════════
SELECT 'Categories inserted:' AS message, COUNT(*) AS count FROM categories;
SELECT 'Subcategories inserted:' AS message, COUNT(*) AS count FROM subcategories;
