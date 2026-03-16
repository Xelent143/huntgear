# 🚀 Xelent Huntgear - Production Deployment Guide

Complete guide for deploying the full-stack hunting apparel e-commerce platform with MySQL backend and admin panel.

---

## 📋 Prerequisites

### Server Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **Node.js**: v20.x LTS
- **MySQL**: 8.0+ (or MariaDB 10.6+)
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 20GB SSD minimum
- **Domain**: Configured DNS pointing to server

### Required Software
```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 Process Manager
sudo npm install -g pm2

# MySQL Client
sudo apt-get install -y mysql-client

# Git
sudo apt-get install -y git
```

---

## 🗄️ Database Setup

### 1. Create MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE xelent_huntgear CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'xelent_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON xelent_huntgear.* TO 'xelent_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 2. Configure Environment
Edit `.env` file:
```env
# Database
DATABASE_URL="mysql://xelent_user:your_secure_password@localhost:3306/xelent_huntgear"

# Session Security (Generate new)
SESSION_SECRET="your-super-secret-random-string-min-32-chars"
JWT_SECRET="your-jwt-secret-key-min-32-chars"

# Admin Access
OWNER_OPEN_ID="your-admin-openid-here"

# AWS S3 (Required for image uploads)
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="xelent-huntgear-uploads"

# Stripe (Required for checkout)
STRIPE_SECRET_KEY="sk_live_your_stripe_key"
STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_key"

# Node Environment
NODE_ENV="production"
```

---

## 🚀 Deployment Steps

### Method 1: Automated Deployment Script

```bash
# 1. Clone repository
git clone https://github.com/yourusername/xelent-huntgear.git
cd xelent-huntgear

# 2. Run deployment script
chmod +x deploy.sh
./deploy.sh
```

### Method 2: Manual Deployment

```bash
# 1. Install dependencies
pnpm install

# 2. Setup database
pnpm db:push
pnpm db:seed

# 3. Build for production
export NODE_ENV=production
pnpm build:local

# 4. Start with PM2
pm2 start ecosystem.config.cjs

# 5. Save PM2 config
pm2 save
pm2 startup
```

---

## ⚙️ PM2 Process Management

### Common Commands
```bash
# Start application
pm2 start ecosystem.config.cjs

# View logs
pm2 logs xelent-huntgear
pm2 logs xelent-huntgear --lines 100

# Monitor resources
pm2 monit

# Restart application
pm2 restart xelent-huntgear

# Reload (zero-downtime)
pm2 reload xelent-huntgear

# Stop application
pm2 stop xelent-huntgear

# Delete from PM2
pm2 delete xelent-huntgear
```

---

## 🌐 Nginx Configuration (Recommended)

### 1. Install Nginx
```bash
sudo apt-get install -y nginx
```

### 2. Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/xelent-huntgear
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Certificates (from Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    
    # Static Files Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Proxy to Node.js App
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

### 3. Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/xelent-huntgear /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

---

## 🔥 Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow Node.js (if accessing directly)
sudo ufw allow 3000/tcp

# Enable firewall
sudo ufw enable
```

---

## 📊 Admin Panel Access

### Default Admin URL
```
https://yourdomain.com/admin-saad
```

### First-Time Setup
1. Visit `/admin-saad/login`
2. Use your configured `OWNER_OPEN_ID` to login
3. Create additional admin users from the dashboard

### Admin Features
- ✅ Product Management (CRUD)
- ✅ Order Management
- ✅ Category Management
- ✅ AI Studio (Gemini Integration)
- ✅ Analytics Dashboard
- ✅ Content Management
- ✅ Settings & Configuration

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build:local
        env:
          NODE_ENV: production
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/xelent-huntgear
            git pull origin main
            pnpm install
            pnpm build:local
            pm2 reload xelent-huntgear
```

---

## 🛠️ Troubleshooting

### Database Connection Issues
```bash
# Test MySQL connection
mysql -u xelent_user -p -h localhost xelent_huntgear

# Check if database exists
SHOW DATABASES;

# Check user permissions
SHOW GRANTS FOR 'xelent_user'@'localhost';
```

### Application Won't Start
```bash
# Check logs
pm2 logs xelent-huntgear

# Check if port is in use
sudo lsof -i :3000

# Kill process on port
sudo kill -9 $(sudo lsof -t -i:3000)
```

### Build Errors
```bash
# Clean build
rm -rf dist node_modules
pnpm install
pnpm build:local
```

### Permission Issues
```bash
# Fix permissions
sudo chown -R $USER:$USER /var/www/xelent-huntgear
chmod +x deploy.sh
```

---

## 📈 Monitoring & Maintenance

### Log Rotation
```bash
# Install logrotate
sudo apt-get install -y logrotate

# Create config
sudo nano /etc/logrotate.d/xelent-huntgear
```

```
/var/www/xelent-huntgear/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        pm2 reload xelent-huntgear
    endscript
}
```

### Health Check Endpoint
The app exposes a health check at:
```
GET /api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-16T10:30:00.000Z",
  "database": "connected"
}
```

---

## 📞 Support

### Useful Commands Reference
```bash
# Complete restart
pm2 stop xelent-huntgear && pm2 start ecosystem.config.cjs

# View real-time logs
pm2 logs xelent-huntgear --lines 50 --timestamp

# Update and redeploy
git pull && pnpm install && pnpm build:local && pm2 reload xelent-huntgear

# Database backup
mysqldump -u xelent_user -p xelent_huntgear > backup_$(date +%Y%m%d).sql

# Database restore
mysql -u xelent_user -p xelent_huntgear < backup_20260316.sql
```

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at `https://yourdomain.com`
- [ ] Admin panel accessible at `/admin-saad`
- [ ] Login works with OWNER_OPEN_ID
- [ ] Product images upload successfully
- [ ] Checkout process works end-to-end
- [ ] SSL certificate valid
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

---

**Deployment Complete!** 🎉

Your Xelent Huntgear platform is now live with:
- ✅ Full e-commerce functionality
- ✅ MySQL database backend
- ✅ Admin panel for management
- ✅ SSL security
- ✅ Process monitoring with PM2
- ✅ Nginx reverse proxy
