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

export interface FeaturedReview extends Review {
  product: string;
}

/** Parses Judge.me's featured carousel widget: the reviews chosen in the carousel settings in Judge.me. */
export function parseFeaturedCarousel(html: string): FeaturedReview[] {
  return html
    // Product reviews use class 'jdgm-carousel-item ', store reviews 'jdgm-carousel-item jdgm--shop-review'.
    .split(/<div class='jdgm-carousel-item(?:\s[^']*)?' /)
    .slice(1)
    .map((chunk) => {
      const date = attr(chunk, "data-time").match(/^(\d+)\/(\d+)\/(\d{4})$/);
      return {
        id: attr(chunk, "data-review-id"),
        author: toText(inner(chunk, "jdgm-carousel-item__reviewer-name jdgm-ellipsis", "div")) || "Customer",
        rating: Number(chunk.match(/aria-label='(\d) stars?'/)?.[1]) || 0,
        date: date ? `${date[3]}-${date[1].padStart(2, "0")}-${date[2].padStart(2, "0")}` : "",
        title: toText(inner(chunk, "jdgm-carousel-item__review-title", "div")),
        body: toText(inner(chunk, "jdgm-carousel-item__review-body", "div")),
        verified: false,
        product: decodeEntities(attr(chunk, "alt")),
      };
    })
    .filter((r) => r.rating > 0 && (r.body || r.title));
}

async function fetchWidget(widget: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ api_token: JUDGEME_PUBLIC_TOKEN, shop_domain: SHOP_DOMAIN, ...params });
  const response = await fetch(`https://judge.me/api/v1/widgets/${widget}?${query}`);
  return response.ok ? response.json() : null;
}

export async function fetchProductReviews(handle: string): Promise<Review[]> {
  const data = await fetchWidget("product_review", { handle, per_page: "50" });
  return data?.widget ? parseReviewWidget(data.widget) : [];
}

export async function fetchFeaturedReviews(): Promise<FeaturedReview[]> {
  const data = await fetchWidget("featured_carousel");
  return data?.featured_carousel ? parseFeaturedCarousel(data.featured_carousel) : [];
}
