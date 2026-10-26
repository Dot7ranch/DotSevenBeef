// Build-time entry used by scripts/prerender.mjs to render each route to static HTML.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppContent, AppProviders } from "./App";
import { ssrSeo, renderHeadTags } from "@/components/Seo";
import type { PrerenderData } from "@/lib/prerenderData";

export { fetchProducts, fetchProductByHandle, fetchCollections, fetchCollectionByHandle } from "@/lib/shopify";
export { fetchProductReviews } from "@/lib/judgeme";
export { recipes } from "@/data/recipes";
export { SITE_URL } from "@/lib/structuredData";

export function render(url: string, data: PrerenderData = {}) {
  (globalThis as { __PRERENDER_DATA__?: PrerenderData }).__PRERENDER_DATA__ = data;
  ssrSeo.current = null;
  const html = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </AppProviders>,
  );
  const seo = ssrSeo.current;
  return { html, head: seo ? renderHeadTags(seo) : "", noindex: Boolean(seo?.noindex) };
}
