import type { ShopifyProduct } from "@/lib/shopify";
import type { Review } from "@/lib/judgeme";

/**
 * Shopify data baked into a prerendered page at build time. The server render reads it from
 * globalThis, and the same JSON is inlined into the HTML so the first client render matches
 * without a loading spinner. Pages still refetch so prices and stock stay current.
 */
export interface PrerenderData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product?: any;
  reviews?: Review[];
  collection?: { handle: string; title: string; description: string; products: { edges: { node: ShopifyProduct["node"] }[] } };
  products?: ShopifyProduct[];
}

export function getPrerenderData(): PrerenderData {
  return (globalThis as { __PRERENDER_DATA__?: PrerenderData }).__PRERENDER_DATA__ ?? {};
}
