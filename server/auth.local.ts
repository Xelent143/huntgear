import { Router } from "express";
import { z } from "zod";
import * as crypto from "crypto";
import { SignJWT } from "jose";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getSessionCookieOptions } from "./_core/cookies";

export const authLocalRouter = Router();

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "fallback_super_secret_for_local_dev_only_12345"
);

// Hashing helper using native crypto
function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString("hex");
    const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
    return `${salt}:${derivedKey}`;
}

function verifyPassword(password: string, hash: string): boolean {
    const [salt, key] = hash.split(":");
    if (!salt || !key) return false;
    const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
    return key === derivedKey;
}

// Auto-create default admin if none exists
async function ensureDefaultAdmin() {
    const db = await getDb();
    if (!db) return;
    const adminUsers = await db.select().from(users).where(eq(users.role, "admin"));
    if (adminUsers.length === 0) {
        console.log("[Auth] No admin found. Creating default admin: admin@sialkotsamplemasters.com / admin123");
        const hashedPassword = hashPassword("admin123");
        await db.insert(users).values({
            openId: "admin-" + Date.now(),
            name: "Super Admin",
            email: "admin@sialkotsamplemasters.com",
            role: "admin",
            loginMethod: "local",
            password: hashedPassword,
        });
    }
}

// Run the check (safely in background)
ensureDefaultAdmin().catch(console.error);

authLocalRouter.post("/api/admin/login", async (req, res) => {
    try {
        const db = await getDb();
        if (!db) return res.status(500).json({ error: "Database temporarily unavailable." });

        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(1),
        });

        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: "Invalid email or password format." });
        }

        const { email, password } = result.data;

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (!user || user.role !== "admin" || !user.password) {
            return res.status(401).json({ error: "Invalid credentials or not an admin." });
        }

        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Update last signed in
        await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

        // Create JWT
        const token = await new SignJWT({ userId: user.id, role: user.role })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        const cookieOptions = getSessionCookieOptions(req);
        res.cookie("admin_token", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        console.error("[Login Error]", err);
        return res.status(500).json({ error: "Internal server error during login." });
    }
});

authLocalRouter.post("/api/admin/logout", (req, res) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie("admin_token", cookieOptions);
    return res.json({ success: true });
});
