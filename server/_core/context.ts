import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    // 1. First try OAuth
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // 2. If OAuth fails, try our local admin JWT
    const cookieHeader = opts.req.headers.cookie || "";
    const cookies = require("cookie").parse(cookieHeader);
    const token = cookies["admin_token"];

    if (token) {
      try {
        const { jwtVerify } = require("jose");
        const JWT_SECRET = new TextEncoder().encode(
          process.env.JWT_SECRET || "fallback_super_secret_for_local_dev_only_12345"
        );
        const { payload } = await jwtVerify(token, JWT_SECRET);

        // Fetch full user from DB
        const { getDb } = require("../db");
        const { users } = require("../../drizzle/schema");
        const { eq } = require("drizzle-orm");

        const db = await getDb();
        if (db) {
          const [adminUser] = await db.select().from(users).where(eq(users.id, payload.userId as number)).limit(1);
          if (adminUser) {
            user = adminUser;
          }
        }
      } catch (err) {
        user = null; // invalid local token
      }
    } else {
      user = null;
    }
  }

  // --- LOCAL DEV BYPASS (disabled in production unless explicitly enabled via env) ---
  // Allows admin access locally without needing OAuth.
  const bypassEnabled = process.env.ENABLE_ADMIN_BYPASS === "true";
  if ((!IS_PRODUCTION || bypassEnabled) && !user) {
    user = {
      id: 1,
      openId: "remote-admin",
      name: "Admin User",
      email: "admin@sialkotsamplemasters.com",
      role: "admin",
      loginMethod: "local",
      lastSignedIn: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
