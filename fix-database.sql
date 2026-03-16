-- Fix database column names to match Drizzle schema (snake_case)

-- ============================================
-- FIX CATEGORIES TABLE
-- ============================================

-- Check current structure first
DESCRIBE categories;

-- If columns are camelCase, convert to snake_case
ALTER TABLE categories 
  CHANGE COLUMN imageUrl image_url VARCHAR(1000),
  CHANGE COLUMN sortOrder sort_order INT DEFAULT 0,
  CHANGE COLUMN isActive is_active TINYINT(1) DEFAULT 1,
  CHANGE COLUMN seoTitle seo_title VARCHAR(255),
  CHANGE COLUMN seoDescription seo_description TEXT,
  CHANGE COLUMN seoKeywords seo_keywords TEXT,
  CHANGE COLUMN createdAt created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHANGE COLUMN updatedAt updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- ============================================
-- FIX PRODUCTS TABLE  
-- ============================================

DESCRIBE products;

-- Convert products columns to snake_case
ALTER TABLE products 
  CHANGE COLUMN categoryId category_id INT,
  CHANGE COLUMN subcategoryId subcategory_id INT,
  CHANGE COLUMN shortDescription short_description VARCHAR(500),
  CHANGE COLUMN mainImage main_image VARCHAR(1000),
  CHANGE COLUMN samplePrice sample_price DECIMAL(10,2),
  CHANGE COLUMN availableSizes available_sizes TEXT,
  CHANGE COLUMN availableColors available_colors TEXT,
  CHANGE COLUMN manufacturingStory manufacturing_story TEXT,
  CHANGE COLUMN manufacturingInfographic manufacturing_infographic VARCHAR(1000),
  CHANGE COLUMN isFeatured is_featured TINYINT(1) DEFAULT 0,
  CHANGE COLUMN isActive is_active TINYINT(1) DEFAULT 1,
  CHANGE COLUMN freeShipping free_shipping TINYINT(1) DEFAULT 0,
  CHANGE COLUMN seoTitle seo_title VARCHAR(255),
  CHANGE COLUMN seoDescription seo_description TEXT,
  CHANGE COLUMN seoKeywords seo_keywords TEXT,
  CHANGE COLUMN sortOrder sort_order INT DEFAULT 0,
  CHANGE COLUMN createdAt created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHANGE COLUMN updatedAt updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- ============================================
-- VERIFY
-- ============================================

DESCRIBE categories;
DESCRIBE products;

-- Test queries
SELECT id, name, image_url FROM categories LIMIT 1;
SELECT id, title, main_image FROM products LIMIT 1;

SELECT '✅ Database columns fixed!' as status;
