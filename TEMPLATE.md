# 🚀 B2B Apparel Manufacturing Website Template

A complete, production-ready template for creating B2B apparel manufacturing websites. Built with React, Express, MySQL, and modern tooling.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Template Structure](#template-structure)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Support](#support)

## ✨ Features

### Core Features
- 🏪 **Product Catalog** - Hierarchical categories with filtering
- 🎨 **3D Design Studio** - Custom apparel design with Three.js
- 🛒 **Shopping Cart** - Full cart and checkout flow
- 📄 **RFQ System** - Request for Quote workflow
- 🔐 **Admin Dashboard** - Manage products, orders, inquiries
- 📝 **Blog System** - Content marketing with SEO
- 🖼️ **Portfolio Gallery** - Showcase your work
- 📐 **Tech Pack Creator** - Technical specification tool

### Technical Features
- ⚡ Vite-powered fast development
- 🎯 TypeScript throughout
- 🎨 Tailwind CSS + shadcn/ui components
- 📱 Fully responsive design
- 🔍 SEO optimized
- 💳 Stripe payment integration
- 📧 Email notifications
- 📊 Analytics ready

## 🚀 Quick Start

### Option 1: Use GitHub Template (Recommended)

1. Click the **"Use this template"** button above
2. Create your new repository
3. Clone your new repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```
4. The template will auto-configure on first push

### Option 2: Manual Setup

```bash
# Clone this repository
git clone https://github.com/original/template-repo.git my-apparel-site
cd my-apparel-site

# Remove the original git history
rm -rf .git
git init

# Install dependencies
pnpm install

# Apply template configuration
pnpm apply-template

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
pnpm db:push
pnpm db:seed

# Start development
pnpm dev
```

## 📁 Template Structure

```
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/             # Page components
│   │   ├── lib/               # Utilities
│   │   └── hooks/             # Custom hooks
│   └── index.html
├── server/                     # Backend Express application
│   ├── _core/                 # Server core
│   └── routes/                # API routes
├── template-config/            # 🎨 YOUR CUSTOMIZATION FILES
│   ├── brand.config.ts        # Brand/site settings
│   ├── categories.config.ts   # Product categories
│   ├── theme.config.ts        # Colors & styling
│   └── seed-data/             # Sample products
├── drizzle/                    # Database schema
├── scripts/
│   └── apply-template.ts      # Template application script
└── package.json
```

## 🎨 Customization Guide

### Step 1: Brand Configuration

Edit `template-config/brand.config.ts`:

```typescript
export const BRAND_CONFIG = {
  siteName: "Your Company Name",
  tagline: "Your Tagline Here",
  legalName: "Your Legal Company Name",
  establishedYear: 2020,
  siteUrl: "https://yoursite.com",
  
  // Contact Information
  supportEmail: "support@yoursite.com",
  salesEmail: "sales@yoursite.com",
  phone: "+1-555-123-4567",
  
  // Location
  location: "New York, USA",
  fullAddress: "123 Manufacturing St\nNew York, NY 10001\nUSA",
  
  // ... more options
};
```

### Step 2: Product Categories

Edit `template-config/categories.config.ts`:

```typescript
export const CATEGORIES_CONFIG: Category[] = [
  {
    id: "your-category",
    name: "Your Category",
    slug: "your-category",
    description: "Description here",
    icon: "🎯",
    showInNav: true,
    sortOrder: 1,
    seo: {
      title: "Custom Category Manufacturer | Your Location",
      description: "Your SEO description here",
      keywords: "keyword1, keyword2, keyword3",
    },
    subCategories: [
      { id: "sub1", name: "Subcategory 1", slug: "sub1", description: "..." },
      // ... more subcategories
    ],
  },
  // ... more categories
];
```

### Step 3: Theme Configuration

Edit `template-config/theme.config.ts`:

```typescript
export const THEME_CONFIG = {
  colors: {
    primary: {
      500: "#your-brand-color",  // Main brand color
      // ... other shades
    },
    // ... more color definitions
  },
  
  typography: {
    fontFamily: {
      sans: ['Your Font', 'sans-serif'],
    },
  },
  
  features: {
    darkMode: true,  // Enable/disable dark mode
  },
};
```

### Step 4: Apply Changes

After editing configuration files:

```bash
pnpm apply-template
```

This will:
- Update category definitions
- Generate CSS variables
- Update HTML metadata
- Create brand constants
- Regenerate README

### Step 5: Add Your Content

1. **Product Images**: Add to `client/public/images/products/`
2. **Company Logo**: Replace `client/public/logo.svg`
3. **Hero Images**: Add to `client/public/images/hero/`
4. **Sample Products**: Edit `template-config/seed-data/sample-products.ts`

### Step 6: Environment Setup

Create `.env` file:

```env
# Database
DATABASE_URL="mysql://user:password@host:3306/database"

# App
VITE_APP_ID="your-app-id"

# APIs
GEMINI_API_KEY="your-gemini-api-key"
JWT_SECRET="your-super-secret-key"

# Stripe (for payments)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_BUCKET_NAME="..."
AWS_REGION="us-east-1"
```

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Hostinger/Shared Hosting

```bash
# Build for production
pnpm build

# Upload dist/ folder to your hosting
```

### Docker Deployment

```bash
# Build Docker image
docker build -t my-apparel-site .

# Run container
docker run -p 3000:3000 my-apparel-site
```

## 📚 Documentation

- [Component Documentation](./docs/components.md)
- [API Documentation](./docs/api.md)
- [Database Schema](./docs/schema.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Support

- 📖 [Documentation](https://docs.yoursite.com)
- 💬 [Discord Community](https://discord.gg/yourserver)
- 📧 Email: support@template-provider.com

## 📝 License

This template is licensed under the MIT License. You are free to use it for personal or commercial projects.

---

<p align="center">
  Made with ❤️ for apparel manufacturers worldwide
</p>
