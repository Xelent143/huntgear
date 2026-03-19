# Xelent Huntgear: Maintenance & Safety Guide

> [!IMPORTANT]
> **CRITICAL RULE**: Never push to the `SSM.git` repository during Huntgear maintenance. All production pushes **MUST** target `https://github.com/Xelent143/huntgear.git`.

## 1. Project Structure & Source of Truth

- **Development Source**: `c:\sialkt sample master\security-uniforms`
  - This is where all code changes, typography updates, and UI redesigns occur.
  - Branding in this folder is hardcoded to **Xelent Huntgear**.
- **Deployment Repository**: `c:\sialkt sample master\xelent-huntgear-website`
  - This is a "Sync Repo" used specifically for pushing to the live Hostinger site.
  - **Remote Verification**: Always run `git remote -v` before pushing. `origin` must be `huntgear.git`.

## 2. Standard Deployment Workflow (The "Safe-Push" Cycle)

To ensure the live site is always updated with the correct branding and latest builds, follow these exact steps:

1. **Build Locally**:
   ```powershell
   cd "c:\sialkt sample master\security-uniforms"
   pnpm build:local
   ```
2. **Synchronize Build Artifacts**:
   ```powershell
   robocopy dist "..\xelent-huntgear-website\dist" /MIR /XF .gitkeep
   ```
3. **Deploy to Production**:
   ```powershell
   cd "..\xelent-huntgear-website"
   git add .
   git commit -m "Deployment: [Short Description of Changes]"
   git push origin main -f
   ```

## 3. Persistent Problems Faced & Fixes

- **Branding Reversion**: Occurred when code from a legacy 'Sialkot Sample Master' branch was pushed to the Huntgear remote. 
  - *Mitigation*: Grep for "Sialkot" in `dist/client/index.html` before every push.
- **Database Schema Mismatch**: The live Hostinger database uses `camelCase` (e.g., `fullName` instead of `full_name`).
  - *Mitigation*: Ensure `drizzle/schema.ts` always uses camelCase for column names.
- **AI Image 404s**: Caused by inconsistent persistent storage paths.
  - *Mitigation*: Production `STORAGE_PATH` must be absolute (e.g., `~/xh_persistent_uploads`) and static serving must align.
- **SSR/Hydration Errors**: Caused by `window` or `document` access in server-side rendered components.
  - *Mitigation*: Use `typeof window !== 'undefined'` checks or `useEffect` for client-only logic (see `SnapshotController.tsx`).

## 4. Environment Safety
Ensure the `.env` file in the production environment (Hostinger) is correctly configured:
- `DATABASE_URL`: Must point to the Huntgear production DB.
- `STORAGE_PATH`: Must be `~/xh_persistent_uploads` for persistence across Git pushes.

---
*Created on 2026-03-19 to ensure Huntgear brand integrity.*
