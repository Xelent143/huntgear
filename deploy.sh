#!/bin/bash

# ═══════════════════════════════════════════════════════════════════════════════
# XELENT HUNTGEAR DEPLOYMENT SCRIPT
# Deploys the full-stack application with backend SQL and admin panel
# ═══════════════════════════════════════════════════════════════════════════════

set -e  # Exit on any error

echo "🚀 Starting Xelent Huntgear Deployment..."
echo "═══════════════════════════════════════════════════════════"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="xelent-huntgear"
NODE_VERSION="20"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo "Please create .env file from .env.example"
    exit 1
fi

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Check Node.js version
echo -e "${BLUE}📦 Checking Node.js version...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    exit 1
fi

NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_CURRENT" -lt "$NODE_VERSION" ]; then
    echo -e "${YELLOW}⚠️  Warning: Node.js version is $NODE_CURRENT. Recommended: $NODE_VERSION+${NC}"
else
    echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${BLUE}📦 Installing pnpm...${NC}"
    npm install -g pnpm
fi
echo -e "${GREEN}✓ pnpm version: $(pnpm -v)${NC}"

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install --frozen-lockfile
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Database check
echo -e "${BLUE}🗄️  Checking database connection...${NC}"
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL not set in .env${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Database URL configured${NC}"

# Push database schema
echo -e "${BLUE}🗄️  Pushing database schema...${NC}"
pnpm db:push
echo -e "${GREEN}✓ Database schema updated${NC}"

# Build for production
echo -e "${BLUE}🔨 Building for production...${NC}"
export NODE_ENV=production
npm run build:local
echo -e "${GREEN}✓ Production build completed${NC}"

# Verify dist folder exists
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed: dist/ folder not found${NC}"
    exit 1
fi

# Check critical files
if [ ! -f "dist/index.js" ]; then
    echo -e "${RED}❌ Build failed: dist/index.js not found${NC}"
    exit 1
fi

if [ ! -d "dist/client" ]; then
    echo -e "${RED}❌ Build failed: dist/client/ not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build artifacts verified${NC}"

# Sync static files to public directory
echo -e "${BLUE}📁 Syncing static files...${NC}"
if [ -d "client/public" ]; then
    cp -r client/public/* dist/client/ 2>/dev/null || true
fi
echo -e "${GREEN}✓ Static files synced${NC}"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Deployment build completed successfully!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "  1. Start the server: ${YELLOW}pnpm start${NC}"
echo "  2. Or use PM2: ${YELLOW}pm2 start ecosystem.config.cjs${NC}"
echo ""
echo "Admin Panel: ${YELLOW}http://your-domain.com/admin-saad${NC}"
echo "Website: ${YELLOW}http://your-domain.com${NC}"
echo ""
