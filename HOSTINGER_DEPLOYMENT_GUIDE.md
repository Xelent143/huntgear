# 🚀 Hostinger Deployment Guide - Xelent Huntgear

Complete step-by-step guide for deploying Xelent Huntgear on Hostinger VPS/Shared Hosting.

---

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] Hostinger VPS or Premium Shared Hosting account
- [ ] Domain name pointing to Hostinger (or use Hostinger domain)
- [ ] SSH access to your server (for VPS)
- [ ] Git installed locally

---

## Step 1: Create Git Repository (Local)

### Option A: Use Existing Repository
```bash
# Your code is already committed
cd "c:\sialkt sample master\security-uniforms"
git log --oneline -5
```

### Option B: Create New GitHub Repository (Recommended)

1. Go to https://github.com/new
2. Repository name: `xelent-huntgear`
3. Description: `Custom Hunting Apparel Manufacturer - Xelent Huntgear`
4. Make it **Private** (recommended for commercial projects)
5. Click "Create repository"

6. Push your code to GitHub:
```bash
cd "c:\sialkt sample master\security-uniforms"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/xelent-huntgear.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Hostinger VPS Setup

### 2.1 Connect to Your VPS

```bash
# SSH into your Hostinger VPS (replace with your actual IP)
ssh root@YOUR_SERVER_IP

# Or if using a non-root user
ssh ubuntu@YOUR_SERVER_IP
```

### 2.2 Update System Packages

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git nginx mysql-server
```

### 2.3 Install Node.js 20

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v

# Install PM2 globally
sudo npm install -g pm2
```

### 2.4 Install MySQL

```bash
# Secure MySQL installation
sudo mysql_secure_installation

# Follow prompts:
# - Enter current password: (press Enter for none)
# - Set root password: YES
# - Remove anonymous users: YES
# - Disallow root login remotely: YES
# - Remove test database: YES
# - Reload privilege tables: YES
```

### 2.5 Create Database

```bash
# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE xelent_huntgear CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'xelent_user'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD';
GRANT ALL PRIVILEGES ON xelent_huntgear.* TO 'xelent_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Step 3: Deploy Application

### 3.1 Create Application Directory

```bash
# Create directory
sudo mkdir -p /var/www/xelent-huntgear
sudo chown -R $USER:$USER /var/www/xelent-huntgear
cd /var/www/xelent-huntgear
```

### 3.2 Clone Repository

```bash
# Clone from GitHub (replace with your repo URL)
git clone https://github.com/YOUR_USERNAME/xelent-huntgear.git .

# Or if you have the files locally, use SFTP to upload them
```

### 3.3 Install Dependencies & Build

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install --frozen-lockfile

# Build for production
export NODE_ENV=production
pnpm build:local
```

---

## Step 4: Environment Variables Configuration

### 4.1 Create .env File

```bash
# Create environment file
nano /var/www/xelent-huntgear/.env
```

### 4.2 Copy This Complete .env Configuration

```env
# ═══════════════════════════════════════════════════════════════════════════════
# NODE ENVIRONMENT
# ═══════════════════════════════════════════════════════════════════════════════
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# ═══════════════════════════════════════════════════════════════════════════════
# DATABASE (MySQL on Hostinger)
# ═══════════════════════════════════════════════════════════════════════════════
# Replace with your actual Hostinger MySQL credentials
DATABASE_URL="mysql://xelent_user:YOUR_SECURE_PASSWORD@localhost:3306/xelent_huntgear"

# ═══════════════════════════════════════════════════════════════════════════════
# AUTHENTICATION & SECURITY
# ═══════════════════════════════════════════════════════════════════════════════
# Generate secure random keys (run: openssl rand -base64 32)
SESSION_SECRET="YOUR_SESSION_SECRET_HERE_MIN_32_CHARS_LONG"
JWT_SECRET="YOUR_JWT_SECRET_HERE_MIN_32_CHARS_LONG"

# Admin user OpenID for initial access
# This is your unique identifier for admin access
OWNER_OPEN_ID="admin@xelenthuntgear.com"

# ═══════════════════════════════════════════════════════════════════════════════
# AWS S3 STORAGE (Required for image uploads)
# Get these from AWS IAM Console
# ═══════════════════════════════════════════════════════════════════════════════
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="us-east-1"
AWS_S3_BUCKET="xelent-huntgear-uploads"

# ═══════════════════════════════════════════════════════════════════════════════
# STRIPE PAYMENTS (Required for checkout)
# Get from Stripe Dashboard: https://dashboard.stripe.com/apikeys
# ═══════════════════════════════════════════════════════════════════════════════
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Stripe Webhook Secret (for webhooks)
STRIPE_WEBHOOK_SECRET="whsec_..."

# ═══════════════════════════════════════════════════════════════════════════════
# GOOGLE GEMINI AI (Optional - for AI product descriptions)
# Get from Google AI Studio: https://makersuite.google.com/app/apikey
# ═══════════════════════════════════════════════════════════════════════════════
GEMINI_API_KEY="AIzaSy..."

# ═══════════════════════════════════════════════════════════════════════════════
# EMAIL / SMTP (Optional - for order notifications)
# ═══════════════════════════════════════════════════════════════════════════════
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Xelent Huntgear <info@xelenthuntgear.com>"

# ═══════════════════════════════════════════════════════════════════════════════
# GOOGLE RECAPTCHA (Optional - for form spam protection)
# ═══════════════════════════════════════════════════════════════════════════════
RECAPTCHA_SITE_KEY="..."
RECAPTCHA_SECRET_KEY="..."

# ═══════════════════════════════════════════════════════════════════════════════
# APP CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════
APP_NAME="Xelent Huntgear"
APP_URL="https://xelenthuntgear.com"
APP_DEBUG=false

# Session Configuration
SESSION_MAX_AGE=86400000
SESSION_NAME="xelent.sid"

# Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES="image/jpeg,image/png,image/webp"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4.3 Secure .env File

```bash
# Set proper permissions (only owner can read)
chmod 600 /var/www/xelent-huntgear/.env
```

---

## Step 5: Database Setup

### 5.1 Push Database Schema

```bash
cd /var/www/xelent-huntgear

# Push schema to database
pnpm db:push

# Seed initial data (optional)
pnpm db:seed
```

### 5.2 Import Categories SQL

```bash
# If you have the categories SQL file
mysql -u xelent_user -p xelent_huntgear < sql/xelent-huntgear-categories.sql
```

---

## Step 6: PM2 Process Manager Setup

### 6.1 Create PM2 Config

The `ecosystem.config.cjs` file is already in your repository.

### 6.2 Start Application with PM2

```bash
cd /var/www/xelent-huntgear

# Start with PM2
pm2 start ecosystem.config.cjs

# Check status
pm2 status
pm2 logs xelent-huntgear

# Save PM2 config
pm2 save

# Setup PM2 startup script
pm2 startup
# Run the command it outputs, then:
pm2 save
```

---

## Step 7: Nginx Configuration

### 7.1 Install Nginx

```bash
sudo apt install -y nginx
```

### 7.2 Create Nginx Config

```bash
sudo nano /etc/nginx/sites-available/xelent-huntgear
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name xelenthuntgear.com www.xelenthuntgear.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;

    # Static files - serve directly with caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API and tRPC routes
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
    
    # Admin panel
    location /admin-saad {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 7.3 Enable Site

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/xelent-huntgear /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

## Step 8: SSL Certificate (Let's Encrypt)

### 8.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 8.2 Obtain SSL Certificate

```bash
sudo certbot --nginx -d xelenthuntgear.com -d www.xelenthuntgear.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose whether to share email
# - Select redirect HTTP to HTTPS: YES
```

### 8.3 Auto-Renewal Test

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot automatically sets up cron job for renewal
```

---

## Step 9: Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Step 10: Post-Deployment Verification

### 10.1 Check Application Status

```bash
# Check PM2 status
pm2 status
pm2 logs xelent-huntgear --lines 50

# Check if app is running on port 3000
sudo lsof -i :3000
```

### 10.2 Test URLs

Visit these URLs in your browser:
- ✅ `https://xelenthuntgear.com` - Homepage
- ✅ `https://xelenthuntgear.com/admin-saad` - Admin panel
- ✅ `https://xelenthuntgear.com/sitemap.xml` - SEO sitemap
- ✅ `https://xelenthuntgear.com/robots.txt` - Robots file

### 10.3 Admin Setup

1. Visit `https://xelenthuntgear.com/admin-saad/login`
2. Login with your OWNER_OPEN_ID from .env
3. Create additional admin users
4. Configure site settings in admin panel

---

## 🔧 Maintenance Commands

### Restart Application
```bash
pm2 restart xelent-huntgear
```

### View Logs
```bash
# Real-time logs
pm2 logs xelent-huntgear

# Last 100 lines
pm2 logs xelent-huntgear --lines 100
```

### Update Application
```bash
cd /var/www/xelent-huntgear

# Pull latest changes
git pull origin main

# Install new dependencies
pnpm install

# Rebuild
pnpm build:local

# Restart
pm2 reload xelent-huntgear
```

### Database Backup
```bash
# Create backup
mysqldump -u xelent_user -p xelent_huntgear > backup_$(date +%Y%m%d).sql

# Download backup (from local machine)
scp root@YOUR_SERVER_IP:/var/www/xelent-huntgear/backup_20260316.sql .
```

### Database Restore
```bash
mysql -u xelent_user -p xelent_huntgear < backup_20260316.sql
```

---

## 🆘 Troubleshooting

### Issue: Application won't start
```bash
# Check logs
pm2 logs xelent-huntgear

# Check if port is in use
sudo lsof -i :3000
sudo kill -9 $(sudo lsof -t -i:3000)

# Restart
pm2 restart xelent-huntgear
```

### Issue: 502 Bad Gateway
```bash
# Check if Node app is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

### Issue: Database connection failed
```bash
# Test MySQL connection
mysql -u xelent_user -p -h localhost

# Check MySQL status
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql
```

### Issue: Permission denied
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/xelent-huntgear
sudo chmod -R 755 /var/www/xelent-huntgear
sudo chmod 600 /var/www/xelent-huntgear/.env
```

---

## 📊 Monitoring

### Setup Log Rotation
```bash
sudo nano /etc/logrotate.d/xelent-huntgear
```

Add:
```
/var/www/xelent-huntgear/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
}
```

### Health Check
The app exposes a health endpoint:
```bash
curl https://xelenthuntgear.com/api/health
```

---

## ✅ Deployment Checklist

- [ ] Git repository created and pushed
- [ ] VPS provisioned on Hostinger
- [ ] Domain DNS pointing to VPS
- [ ] Node.js 20 installed
- [ ] MySQL installed and configured
- [ ] Database created
- [ ] Application files deployed
- [ ] Environment variables configured
- [ ] Database schema pushed
- [ ] PM2 process started
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall enabled
- [ ] Admin panel accessible
- [ ] Website loads correctly
- [ ] HTTPS working
- [ ] Image uploads working
- [ ] Checkout process tested

---

**🎉 Your Xelent Huntgear website is now live!**

For support, refer to:
- Application logs: `pm2 logs`
- Nginx logs: `/var/log/nginx/`
- This deployment guide
