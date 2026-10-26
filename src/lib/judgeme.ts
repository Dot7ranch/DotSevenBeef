import { decodeEntities } from "@/lib/structuredData";

// Judge.me public token: read-only and meant for storefront use, like the Shopify Storefront token.
const JUDGEME_PUBLIC_TOKEN = "PDo1KXiFhTZ9EtapNVfVMqNv1j0";
const SHOP_DOMAIN = "dot-seven-ranch.myshopify.com";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

const attr = (html: string, name: string) => html.match(new RegExp(`${name}='([^']*)'`))?.[1] ?? "";
const inner = (html: string, cls: string, tag: string) =>
  html.match(new RegExp(`<${tag} class='${cls}'[^>]*>([\\s\\S]*?)</${tag}>`))?.[1] ?? "";

const toText = (html: string) =>
  decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+/g, " ")
    .trim();

/**
 * Parses the review list out of Judge.me's product widget HTML. Plain string parsing so it runs
 * the same at build time (no DOM) and in the browser.
 */
export function parseReviewWidget(html: string): Review[] {
  return html
    .split("<div class='jdgm-rev jdgm-divider-top'")
    .slice(1)
    .map((chunk) => ({
      id: attr(chunk, "data-review-id"),
      author: toText(inner(chunk, "jdgm-rev__author", "span")) || "Customer",
      rating: Number(attr(chunk, "data-score")) || 0,
      date: attr(chunk, "datetime"),
      title: toText(inner(chunk, "jdgm-rev__title", "b")),
      body: toText(inner(chunk, "jdgm-rev__body", "div")),
      verified: attr(chunk, "data-verified-buyer") === "true",
    }))
    .filter((r) => r.rating > 0 && (r.body || r.title));
}

export async function fetchProductReviews(handle: string): Promise<Review[]> {
  const params = new URLSearchParams({
    api_token: JUDGEME_PUBLIC_TOKEN,
    shop_domain: SHOP_DOMAIN,
    handle,
    per_page: "50",
  });
  const response = await fetch(`https://judge.me/api/v1/widgets/product_review?${params}`);
  if (!response.ok) return [];
  const data = await response.json();
  return data?.widget ? parseReviewWidget(data.widget) : [];
}
