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
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
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
