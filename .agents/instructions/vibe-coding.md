# Antigravity Agent Instructions: Xelent Huntgear Vibe Coding Standards

This document establishes the mandatory visual and technical protocols for all Antigravity agents working on **Xelent Huntgear**.

## 1. The "Vibe Coding" Aesthetic Standard
Xelent Huntgear is a high-performance, technical hunting brand. The UI must reflect a "Vibe Coding" aesthetic:
- **Cinematic Visuals**: Use high-contrast, moody landscapes (Misty mountains, dense forests).
- **Typography**: 
    - **Headlines**: **Oswald** (Bold/Black) with tight tracking (`tracking-tighter`).
    - **Sub-headings**: **Montserrat** (Semi-Bold/Spaced).
    - **Body**: **Inter** (Clean/Legible).
- **Color Palette**:
    - **Primary**: Hunter Orange (`#ff6b00`) for CTAs and accents.
    - **Background**: Pure Black (`#000000`) or Deep Charcoal (`#0a0a0a`).
    - **Accents**: White/Translucency via glassmorphism (`backdrop-blur`).
- **Motion**: Use `framer-motion` for smooth, high-end transitions (FadeIn, StaggerChildren).

## 2. Mandatory Repository Safety (Preventing SSM Push)
To prevent the "Sialkot Sample Master" (SSM) branding from resurfacing, every agent **MUST** follow these steps:

### A. Pre-Push Validation
Before every `git push`, the agent **MUST** run a grep check on the built client index:
```powershell
grep -r "Sialkot" dist/client/index.html
```
If any result is found, the agent must immediately stop and fix the branding in the source code (`security-uniforms`).

### B. Correct Remote Targeting
- **NEVER** push the `security-uniforms` branch directly to a production server unless explicitly asked.
- **ALWAYS** push from the `xelent-huntgear-website` directory.
- **REMOTE VERIFICATION**: Run `git remote -v`. Ensure `origin` is `https://github.com/Xelent143/huntgear.git`.

## 3. Deployment Workflow
1. **Develop** in `c:\sialkt sample master\security-uniforms`.
2. **Build** with `pnpm build:local`.
3. **Sync** `dist` to `..\xelent-huntgear-website\dist` using `robocopy /MIR`.
4. **Push** from `xelent-huntgear-website` to `origin main -f`.

## 4. Technical Constraints
- **Database**: Use `camelCase` for all schema definitions to align with the production Hostinger database.
- **SSR**: Always check `typeof window !== 'undefined'` for client-side logic to avoid hydration errors.
- **AI Images**: Store generated products in the persistent `~/xh_persistent_uploads` volume.

---
*Signed: Antigravity "Vibe" Design Lead*
