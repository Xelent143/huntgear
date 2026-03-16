-- Fix column names to match Drizzle schema expectations

-- Check current products table structure
DESCRIBE products;

-- If columns have wrong names, fix them:
-- (Run these only if needed based on DESCRIBE output)

-- For products table - ensure column names match
ALTER TABLE products 
  CHANGE COLUMN category_id categoryId INT,
  CHANGE COLUMN subcategory_id subcategoryId INT,
  CHANGE COLUMN short_description shortDescription VARCHAR(500),
  CHANGE COLUMN main_image mainImage VARCHAR(1000),
  CHANGE COLUMN sample_price samplePrice DECIMAL(10,2),
  CHANGE COLUMN available_sizes availableSizes TEXT,
  CHANGE COLUMN available_colors availableColors TEXT,
  CHANGE COLUMN manufacturing_story manufacturingStory TEXT,
  CHANGE COLUMN manufacturing_infographic manufacturingInfographic VARCHAR(1000),
  CHANGE COLUMN is_featured isFeatured TINYINT(1),
  CHANGE COLUMN is_active isActive TINYINT(1),
  CHANGE COLUMN free_shipping freeShipping TINYINT(1),
  CHANGE COLUMN seo_title seoTitle VARCHAR(255),
  CHANGE COLUMN seo_description seoDescription TEXT,
  CHANGE COLUMN seo_keywords seoKeywords TEXT,
  CHANGE COLUMN sort_order sortOrder INT,
  CHANGE COLUMN created_at createdAt TIMESTAMP,
  CHANGE COLUMN updated_at updatedAt TIMESTAMP;

-- Same for categories
ALTER TABLE categories
  CHANGE COLUMN image_url imageUrl VARCHAR(1000),
  CHANGE COLUMN parent_id parentId INT,
  CHANGE COLUMN sort_order sortOrder INT,
  CHANGE COLUMN is_active isActive TINYINT(1),
  CHANGE COLUMN created_at createdAt TIMESTAMP,
  CHANGE COLUMN updated_at updatedAt TIMESTAMP;

-- Verify fixes
DESCRIBE products;
DESCRIBE categories;
