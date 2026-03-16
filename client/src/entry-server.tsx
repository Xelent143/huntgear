import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import superjson from "superjson";
import { Router } from "wouter";
import App from "./App";
import { memoryLocation } from "wouter/memory-location";

export async function render(url: string) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
        },
    });

    const trpcClient = trpc.createClient({
        links: [
            httpBatchLink({
                url: `http://localhost:${process.env.PORT || 3000}/api/trpc`,
                // Need absolute URL for SSR fetch, assuming same host/port.
                transformer: superjson,
                fetch(input, init) {
                    // Note: credentials aren't passed automatically in SSR, 
                    // but this is an initial render. Auth flows might require manual cookie passing.
                    return globalThis.fetch(input, init);
                },
            }),
        ],
    });

    const helmetContext: any = {};

    // Use wouter's memory location hook for SSR routing
    const { hook } = memoryLocation({ path: url, static: true });

    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <HelmetProvider context={helmetContext}>
                <Router hook={hook}>
                    <trpc.Provider client={trpcClient} queryClient={queryClient}>
                        <QueryClientProvider client={queryClient}>
                            <App />
                        </QueryClientProvider>
                    </trpc.Provider>
                </Router>
            </HelmetProvider>
        </React.StrictMode>
    );

    const { helmet } = helmetContext;

    return { html, helmet };
}
