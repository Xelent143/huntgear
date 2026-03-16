@echo off
chcp 65001 >nul
cls

echo ═══════════════════════════════════════════════════════════
echo 🚀 XELENT HUNTGEAR - WINDOWS DEPLOYMENT SCRIPT
echo ═══════════════════════════════════════════════════════════
echo.

REM Configuration
set "NODE_VERSION=20"
set "APP_NAME=xelent-huntgear"

REM Check if .env exists
if not exist .env (
    echo [31m❌ Error: .env file not found![0m
    echo Please create .env file from .env.example
    pause
    exit /b 1
)

echo 📦 Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo [31m❌ Node.js is not installed![0m
    echo Please install Node.js 20+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1" %%a in ('node -v') do set "NODE_CURRENT=%%a"
echo [32m✓ Node.js version: %NODE_CURRENT%[0m

REM Check pnpm
call pnpm -v >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing pnpm...
    npm install -g pnpm
)

for /f "tokens=1" %%a in ('pnpm -v') do echo [32m✓ pnpm version: %%a[0m

echo.
echo 📦 Installing dependencies...
call pnpm install --frozen-lockfile
if errorlevel 1 (
    echo [31m❌ Dependency installation failed![0m
    pause
    exit /b 1
)
echo [32m✓ Dependencies installed[0m

echo.
echo 🔨 Building for production...
set "NODE_ENV=production"
call npm run build:local
if errorlevel 1 (
    echo [31m❌ Build failed![0m
    pause
    exit /b 1
)
echo [32m✓ Production build completed[0m

REM Verify dist folder
if not exist dist (
    echo [31m❌ Build failed: dist\ folder not found![0m
    pause
    exit /b 1
)

if not exist dist\index.js (
    echo [31m❌ Build failed: dist\index.js not found![0m
    pause
    exit /b 1
)

if not exist dist\client (
    echo [31m❌ Build failed: dist\client\ not found![0m
    pause
    exit /b 1
)

echo [32m✓ Build artifacts verified[0m

echo.
echo 📁 Syncing static files...
if exist client\public (
    xcopy /E /I /Y client\public\* dist\client\ >nul 2>&1
)
echo [32m✓ Static files synced[0m

echo.
echo ═══════════════════════════════════════════════════════════
echo [32m🎉 Deployment build completed successfully![0m
echo ═══════════════════════════════════════════════════════════
echo.
echo Next steps:
echo   1. Start the server: [33mpnpm start[0m
if exist ecosystem.config.cjs (
    echo   2. Or use PM2: [33mpm2 start ecosystem.config.cjs[0m
)
echo.
echo Admin Panel: [33mhttp://localhost:3000/admin-saad[0m
pause
