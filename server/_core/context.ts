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

  // --- LOCAL DEV BYPASS (disabled in production) ---
  // Allows admin access locally without needing OAuth.
  // On Hostinger production this is completely skipped.
  if (!IS_PRODUCTION && !user) {
    user = {
      id: 1,
      openId: "local-dev",
      name: "Local Admin",
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
