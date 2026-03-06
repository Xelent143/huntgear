import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // GLB model proxy — streams CDN-hosted GLB files with correct CORS headers
  // so Three.js can load them from the browser without CORS errors
  const MODEL_MAP: Record<string, string> = {
    'oversize-hoodie.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/zuxviTdYwpHzhDSE.glb',
    'sweatshirt.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/nfJjpbTmWQynLNVx.glb',
    'tshirt-normal.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/adtYgrITgJZMRrNl.glb',
    'raglan-tshirt.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/PxqQBXgbWoMAKRZJ.glb',
    'soccer-uniform.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/uhdDWMRBkGKpuvPv.glb',
    'basketball-uniform.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/YqjgRtpukMWNALIs.glb',
    'american-football.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/RnsDwykJBkcaHyOg.glb',
    'trouser.glb': 'https://files.manuscdn.com/user_upload_by_module/session_file/310419663026792105/ynQDWlpbRtXSgxAB.glb',
  };
  app.get('/api/models/:filename', async (req, res) => {
    const { filename } = req.params;
    const cdnUrl = MODEL_MAP[filename];
    if (!cdnUrl) { res.status(404).json({ error: 'Model not found' }); return; }
    try {
      const upstream = await fetch(cdnUrl);
      if (!upstream.ok) { res.status(502).json({ error: 'Upstream fetch failed' }); return; }
      res.setHeader('Content-Type', 'model/gltf-binary');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      const contentLength = upstream.headers.get('content-length');
      if (contentLength) res.setHeader('Content-Length', contentLength);
      const reader = upstream.body!.getReader();
      const pump = async (): Promise<void> => {
        const { done, value } = await reader.read();
        if (done) { res.end(); return; }
        res.write(Buffer.from(value));
        return pump();
      };
      await pump();
    } catch (err) {
      console.error('[GLB proxy] Error:', err);
      res.status(500).json({ error: 'Proxy error' });
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // ── INLINE Admin Auth Routes (esbuild was not bundling the external file) ──
  const crypto = await import("crypto");
  const { SignJWT: SignJWTLocal } = await import("jose");
  const { getDb: getDbLocal } = await import("../db");

  const JWT_SECRET_LOCAL = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback_super_secret_for_local_dev_only_12345"
  );

  function hashPwd(password: string): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const key = crypto.scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${key}`;
  }
  function verifyPwd(password: string, hash: string): boolean {
    try {
      const [salt, key] = hash.split(":");
      if (!salt || !key) return false;
      return crypto.scryptSync(password, salt, 64).toString("hex") === key;
    } catch { return false; }
  }

  // Seed default admin
  try {
    const seedDb = await getDbLocal();
    if (seedDb) {
      const { users: usersTable } = await import("../../drizzle/schema");
      const { eq: eqOp } = await import("drizzle-orm");
      const allAdmins = await seedDb.select().from(usersTable).where(eqOp(usersTable.role, "admin"));
      const hasValidAdmin = allAdmins.some((a: any) => a.password && a.password.includes(":"));
      if (!hasValidAdmin) {
        const noPasswordAdmin = allAdmins.find((a: any) => !a.password || !a.password.includes(":"));
        if (noPasswordAdmin) {
          console.log("[Auth] Updating admin password for:", noPasswordAdmin.email);
          await seedDb.update(usersTable).set({ password: hashPwd("admin123"), email: "admin@sialkotsamplemasters.com" }).where(eqOp(usersTable.id, noPasswordAdmin.id));
        } else {
          console.log("[Auth] Creating default admin: admin@sialkotsamplemasters.com / admin123");
          await seedDb.insert(usersTable).values({
            openId: "local-admin-" + Date.now(),
            name: "Super Admin",
            email: "admin@sialkotsamplemasters.com",
            role: "admin",
            loginMethod: "local",
            password: hashPwd("admin123"),
          });
        }
      } else {
        console.log("[Auth] Admin with valid password exists");
      }
    }
  } catch (seedErr) {
    console.error("[Auth] Admin seed error:", seedErr);
  }

  // POST /api/admin/login
  app.post("/api/admin/login", async (req, res) => {
    try {
      console.log("[Login] Attempt received");
      const loginDb = await getDbLocal();
      if (!loginDb) return res.status(500).json({ error: "Database not available" });

      const { users: usersTable } = await import("../../drizzle/schema");
      const { eq: eqOp } = await import("drizzle-orm");

      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ error: "Email and password required" });

      console.log("[Login] Looking up:", email);
      const results = await loginDb.select().from(usersTable).where(eqOp(usersTable.email, email)).limit(1);
      const user = results[0];

      if (!user) return res.status(401).json({ error: "Invalid credentials." });
      if (user.role !== "admin") return res.status(401).json({ error: "Not an admin." });
      if (!user.password) return res.status(401).json({ error: "Password not set." });

      if (!verifyPwd(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      console.log("[Login] Password OK, creating JWT...");
      loginDb.update(usersTable).set({ lastSignedIn: new Date() }).where(eqOp(usersTable.id, user.id)).catch(() => { });

      const token = await new SignJWTLocal({ userId: user.id, role: user.role })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(JWT_SECRET_LOCAL);

      res.cookie("admin_token", token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: req.protocol === "https" || req.headers["x-forwarded-proto"] === "https",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log("[Login] Success!", user.email);
      return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err: any) {
      console.error("[Login] ERROR:", err?.message, err?.stack);
      return res.status(500).json({ error: "Login error: " + (err?.message || "unknown") });
    }
  });

  // POST /api/admin/logout
  app.post("/api/admin/logout", (_req, res) => {
    res.clearCookie("admin_token", { path: "/" });
    return res.json({ success: true });
  });

  // GET /api/admin/debug — Diagnostic endpoint
  app.get("/api/admin/debug", async (_req, res) => {
    const isProd = process.env.NODE_ENV === "production";
    const resolvedUploadsPath = isProd
      ? path.resolve(process.cwd(), 'uploads')
      : path.resolve(process.cwd(), 'uploads');

    const productsUploadsPath = path.join(resolvedUploadsPath, 'products');

    const info: any = {
      nodeVersion: process.version,
      dbUrl: process.env.DATABASE_URL ? "SET" : "NOT SET",
      env: process.env.NODE_ENV,
      cwd: process.cwd(),
      dirname: typeof __dirname !== 'undefined' ? __dirname : "undefined_in_esm",
      resolvedUploadsPath,
      productsUploadsPath,
      uploadsDirExists: fs.existsSync(resolvedUploadsPath),
      productsDirExists: fs.existsSync(productsUploadsPath)
    };

    try {
      if (info.uploadsDirExists) {
        const readdirRecursive = (dir: string): string[] => {
          const results: string[] = [];
          const list = fs.readdirSync(dir);
          list.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat && stat.isDirectory()) {
              results.push(...readdirRecursive(filePath));
            } else {
              results.push(filePath);
            }
          });
          return results;
        }
        info.filesInUploads = readdirRecursive(resolvedUploadsPath).slice(0, 50); // limit to 50
      }
    } catch (e: any) {
      info.fsError = e.message;
    }

    try {
      const debugDb = await getDbLocal();
      if (!debugDb) { info.error = "Database not connected"; return res.json(info); }
      info.dbConnected = true;
      return res.json(info);
    } catch (err: any) {
      info.error = err?.message;
      return res.json(info);
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Serve local uploads
  const isProd = process.env.NODE_ENV === "production";
  const uploadsPath = isProd
    ? path.resolve(process.cwd(), 'uploads')
    : path.resolve(process.cwd(), 'uploads');

  console.log(`[Storage] Serving uploads from: ${uploadsPath}`);
  if (!fs.existsSync(uploadsPath)) {
    console.log(`[Storage] Creating uploads directory...`);
    fs.mkdirSync(uploadsPath, { recursive: true });
  }

  app.use("/uploads", express.static(uploadsPath));
  // Specific handler for missing uploads so they don't fall through to the SPA index.html (which causes 422 image errors)
  app.use("/uploads", (req, res) => {
    res.status(404).send("File not found");
  });
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
