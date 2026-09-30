// Link previews (Facebook, Instagram, iMessage, text messages, Slack...).
//
// Link preview bots read the raw HTML and never run JavaScript, so on this
// single-page app every shared link used to show the same image and title
// from index.html. The /api/share edge function uses these helpers to fill in
// the real product, collection or recipe details before the HTML is sent.
//
// Relative imports only: this file is bundled into the edge function, which
// doesn't know the "@/" alias.
import { SHOPIFY_STOREFRONT_URL, SHOPIFY_STOREFRONT_TOKEN } from "./shopifyConfig";
import { recipes } from "../data/recipes";

export interface ShareMeta {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type: "website" | "product" | "article";
  price?: { amount: string; currencyCode: string };
}

const SITE_NAME = "Dot Seven Ranch";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function truncate(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

// Ask Shopify's CDN for a 1200px-wide copy: large enough for big previews,
// small enough to load quickly for the preview bots.
export function sizedShopifyImage(url: string): string {
  if (!url.includes("cdn.shopify.com")) return url;
  const sized = url.replace(/_\d+x(\d+)?(?=\.\w+(\?|$))/, "");
  return sized + (sized.includes("?") ? "&" : "?") + "width=1200";
}

async function storefront<T>(query: string, variables: Record<string, unknown>, fetchImpl: typeof fetch): Promise<T | null> {
  const response = await fetchImpl(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) return null;
  const json = await response.json();
  return json?.data ?? null;
}

const PRODUCT_SHARE_QUERY = `
  query ProductShare($handle: String!) {
    product(handle: $handle) {
      title
      description
      featuredImage { url altText }
      priceRange { minVariantPrice { amount currencyCode } }
    }
  }
`;

const COLLECTION_SHARE_QUERY = `
  query CollectionShare($handle: String!) {
    collection(handle: $handle) {
      title
      description
      image { url altText }
      products(first: 1) { edges { node { featuredImage { url altText } } } }
    }
  }
`;

type ShopifyImage = { url: string; altText: string | null } | null;

export async function getShareMeta(pathname: string, fetchImpl: typeof fetch = fetch): Promise<ShareMeta | null> {
  const [, section, handle] = pathname.split("/");
  if (!handle) return null;
  const slug = decodeURIComponent(handle);

  if (section === "product") {
    const data = await storefront<{
      product: {
        title: string;
        description: string;
        featuredImage: ShopifyImage;
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
      } | null;
    }>(PRODUCT_SHARE_QUERY, { handle: slug }, fetchImpl);
    const product = data?.product;
    if (!product) return null;
    return {
      title: `${product.title} | ${SITE_NAME}`,
      description: truncate(product.description || `Ranch-raised beef from ${SITE_NAME}, delivered to your door.`, 200),
      image: product.featuredImage?.url,
      imageAlt: product.featuredImage?.altText || product.title,
      type: "product",
      price: product.priceRange?.minVariantPrice,
    };
  }

  if (section === "collections") {
    const data = await storefront<{
      collection: {
        title: string;
        description: string;
        image: ShopifyImage;
        products: { edges: Array<{ node: { featuredImage: ShopifyImage } }> };
      } | null;
    }>(COLLECTION_SHARE_QUERY, { handle: slug }, fetchImpl);
    const collection = data?.collection;
    if (!collection) return null;
    const image = collection.image ?? collection.products.edges[0]?.node.featuredImage ?? null;
    return {
      title: `${collection.title} | ${SITE_NAME}`,
      description: truncate(collection.description || `Shop ${collection.title} from ${SITE_NAME}.`, 200),
      image: image?.url,
      imageAlt: image?.altText || collection.title,
      type: "website",
    };
  }

  if (section === "recipes") {
    const recipe = recipes.find(r => r.slug === slug);
    if (!recipe) return null;
    return {
      title: `${recipe.title} | ${SITE_NAME} Recipes`,
      description: truncate(recipe.description, 200),
      image: recipe.image,
      imageAlt: recipe.title,
      type: "article",
    };
  }

  return null;
}

// Swap the generic tags in index.html for page-specific ones.
export function applyShareMeta(html: string, meta: ShareMeta, pageUrl: string): string {
  // Keep the site-wide image for anything that has no photo of its own.
  const defaultImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1];
  if (!meta.image && defaultImage) meta = { ...meta, image: defaultImage.replace(/&amp;/g, "&") };

  const stripped = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+(?:name|property)="(?:description|og:[^"]+|twitter:(?:title|description|image|card))"[^>]*>\s*/gi, "");

  const tags: Array<[string, string, string]> = [
    ["name", "description", meta.description],
    ["property", "og:site_name", SITE_NAME],
    ["property", "og:type", meta.type],
    ["property", "og:url", pageUrl],
    ["property", "og:title", meta.title],
    ["property", "og:description", meta.description],
    ["name", "twitter:card", meta.image ? "summary_large_image" : "summary"],
    ["name", "twitter:title", meta.title],
    ["name", "twitter:description", meta.description],
  ];
  if (meta.image) {
    const image = sizedShopifyImage(meta.image);
    tags.push(["property", "og:image", image], ["name", "twitter:image", image]);
    if (meta.imageAlt) tags.push(["property", "og:image:alt", meta.imageAlt]);
  }
  if (meta.price) {
    tags.push(
      ["property", "product:price:amount", Number(meta.price.amount).toFixed(2)],
      ["property", "product:price:currency", meta.price.currencyCode],
    );
  }

  const block = [
    `<title>${escapeHtml(meta.title)}</title>`,
    ...tags.map(([attr, key, value]) => `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`),
  ].join("\n    ");

  return stripped.replace(/<\/head>/i, `  ${block}\n  </head>`);
}
