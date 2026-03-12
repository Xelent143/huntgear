import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * setupVite is only called in development mode.
 * All Vite/dev dependencies are loaded dynamically so they are
 * never resolved at module-load time in the production bundle.
 */
export async function setupVite(app: Express, server: any) {
  // Dynamic imports — these will NEVER run in production
  const { createServer: createViteServer } = await import("vite");
  const { default: viteConfig } = await import("../../vite.config");
  const { nanoid } = await import("nanoid");

  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "../..",
        "client",
        "index.html"
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/entry-client.tsx"`,
        `src="/src/entry-client.tsx?v=${nanoid()}"`
      );

      const page = await vite.transformIndexHtml(url, template);

      // Load the server entry
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const { html: appHtml, helmet } = await render(url, req);

      let html = page.replace(`<!--ssr-outlet-->`, appHtml ?? "");

      if (helmet) {
        html = html.replace(
          `</head>`,
          `${helmet.title?.toString() || ""}${helmet.meta?.toString() || ""}${helmet.link?.toString() || ""}${helmet.script?.toString() || ""}</head>`
        );
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distClientPath = path.resolve(__dirname, "client");
  const distServerPath = path.resolve(__dirname, "server");

  if (!fs.existsSync(distClientPath)) {
    console.warn(`[SSR] Could not find the client build directory: ${distClientPath}. Serving from older dist/public format if available.`);
    const fallbackDist = path.resolve(__dirname, "public");
    if (fs.existsSync(fallbackDist)) {
      app.use(express.static(fallbackDist));
      app.use("*", (_req, res) => res.sendFile(path.resolve(fallbackDist, "index.html")));
      return;
    }
  }

  // Serve static assets from the client build
  app.use(express.static(distClientPath, { index: false }));

  // Fallback to SSR
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const clientTemplate = path.resolve(distClientPath, "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      // Load the pre-built SSR entry
      const serverEntryPath = path.resolve(distServerPath, "entry-server.js");
      const { render } = await import(`file://${serverEntryPath}`);
      const { html: appHtml, helmet } = await render(url, req);

      let html = template.replace(`<!--ssr-outlet-->`, appHtml ?? "");

      if (helmet) {
        html = html.replace(
          `</head>`,
          `${helmet.title?.toString() || ""}${helmet.meta?.toString() || ""}${helmet.link?.toString() || ""}${helmet.script?.toString() || ""}</head>`
        );
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      next(e);
    }
  });
}
