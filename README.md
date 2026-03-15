# 🏭 SSM - B2B E-Commerce Template

> A production-ready, AI-customizable website template for B2B businesses.

[![Deploy](https://img.shields.io/badge/deploy-hostinger-blue)](https://www.hostinger.com/)
[![React](https://img.shields.io/badge/react-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

- 🛍️ **Product Catalog** with categories & subcategories
- 🛒 **Shopping Cart** with shipping calculation
- 💳 **Checkout** with Stripe integration
- 👨‍💼 **Admin Panel** for product/order management
- 📝 **Blog System** for content marketing
- 🔐 **Authentication** with role-based access
- 📱 **Mobile Responsive** design
- 🌓 **Dark/Light Mode** support
- 🎨 **AI-Customizable** theme system

## 🚀 Quick Start

### 1. Clone Template
```bash
git clone https://github.com/yourusername/ssm-template.git my-company
cd my-company
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your:
# - DATABASE_URL
# - AWS credentials (for image uploads)
# - Stripe keys (for payments)
```

### 4. Setup Database
```bash
# Run these SQL scripts in your MySQL database:
mysql -u root -p < sql/setup-categories.sql
```

### 5. Start Development
```bash
npm run dev
```

### 6. Build & Deploy
```bash
npm run build:local
git add dist/
git commit -m "Initial build"
git push origin main
```

---

## 🤖 AI Customization (Recommended)

### For AI Agents:

**Modify only these files for rebranding:**

```
template-config/
├── theme.config.ts      # Colors, fonts, styling
├── brand.config.ts      # Company info, contact
└── categories.config.ts # Product categories

public/
├── logo.svg             # Company logo
├── hero.jpg             # Homepage image
└── favicon.ico          # Browser icon
```

**Read:**
- `AI_INSTRUCTIONS.md` - Quick guide for AI
- `TEMPLATE.md` - Detailed customization guide
- `DEPLOYMENT.md` - Deployment instructions

---

## 📁 Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Website pages
│   │   ├── components/  # UI components
│   │   └── lib/         # Utilities
│   └── public/          # Static assets
│
├── server/              # Express backend
│   ├── routers.ts       # API routes
│   ├── db.ts            # Database functions
│   └── _core/           # Server setup
│
├── drizzle/             # Database schema
│   └── schema.ts
│
├── template-config/     # AI customization files
│   ├── theme.config.ts
│   ├── brand.config.ts
│   └── categories.config.ts
│
├── sql/                 # Database setup scripts
│   └── setup-categories.sql
│
└── dist/                # Production build (commit this)
```

---

## 🗄️ Database Schema

### Core Tables:
- `categories` - Product categories
- `subcategories` - Category sub-items
- `products` - Product listings
- `orders` - Customer orders
- `cart_items` - Shopping cart
- `users` - Admin users

See `drizzle/schema.ts` for complete schema.

---

## 🎨 Customization Examples

### Change Colors
```typescript
// template-config/theme.config.ts
export const THEME_CONFIG = {
  colors: {
    primary: { 500: "#D4A853" }  // Your brand color
  }
}
```

### Change Company Info
```typescript
// template-config/brand.config.ts
export const BRAND = {
  name: "Your Company",
  email: "info@yourcompany.com",
  phone: "+1 234 567 8900"
}
```

### Change Categories
```typescript
// template-config/categories.config.ts
export const DEFAULT_CATEGORIES = [
  { name: "Your Category", slug: "your-slug", icon: "🎯" }
]
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `AI_INSTRUCTIONS.md` | Quick guide for AI agents |
| `TEMPLATE.md` | Detailed template documentation |
| `DEPLOYMENT.md` | Deployment & hosting guide |
| `SETUP-GUIDE.md` | Initial setup instructions |

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Express.js, tRPC
- **Database:** MySQL, Drizzle ORM
- **Storage:** AWS S3 (for images)
- **Payments:** Stripe

---

## 📦 Scripts

```bash
npm run dev           # Development server
npm run build:local   # Production build
npm run start         # Start production server
npm run db:push       # Update database schema
npm run db:seed       # Seed sample data
```

---

## 🌐 Deployment

This template is configured for **Hostinger** deployment:

1. Connect GitHub repository to Hostinger
2. Set environment variables in Hostinger panel
3. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use for any project!

---

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/ssm-template/issues)
- **Documentation:** See `/docs` folder

---

**Built with ❤️ for B2B businesses worldwide**
