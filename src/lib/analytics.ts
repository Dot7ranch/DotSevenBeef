// Marketing analytics: Meta Pixel funnel events + first-touch attribution.
//
// The pixel base code in index.html only fires one PageView on the initial
// load. Because this is a single-page app, everything after that (product
// views, add to cart, checkout) is invisible to Meta unless we send it here.
//
// Attribution (UTM tags, fbclid, referrer, landing page) is captured on the
// first visit and written onto the Shopify cart as hidden attributes, so it
// shows up under "Additional details" on every web order in Shopify admin.

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

const ATTRIBUTION_KEY = "d7_attribution";
const ATTRIBUTION_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

function fbq(...args: unknown[]) {
  try {
    window.fbq?.(...args);
  } catch {
    // Never let tracking break the storefront.
  }
}

// "gid://shopify/ProductVariant/123" -> "123"
export function shopifyNumericId(gid: string | undefined | null): string {
  return gid?.split("/").pop() ?? "";
}

// Matches the content_id format used by Shopify's Facebook & Instagram
// channel catalog, so events line up with catalog items for ads.
export function metaContentId(productGid: string, variantGid: string): string {
  return `shopify_US_${shopifyNumericId(productGid)}_${shopifyNumericId(variantGid)}`;
}

export function trackPageView() {
  fbq("track", "PageView");
}

export function trackViewContent(p: { productId: string; variantId: string; title: string; price: number; currency: string }) {
  fbq("track", "ViewContent", {
    content_ids: [metaContentId(p.productId, p.variantId)],
    content_name: p.title,
    content_type: "product",
    value: p.price,
    currency: p.currency,
  });
}

export function trackAddToCart(p: { productId: string; variantId: string; title: string; price: number; currency: string; quantity: number }) {
  fbq("track", "AddToCart", {
    content_ids: [metaContentId(p.productId, p.variantId)],
    content_name: p.title,
    content_type: "product",
    contents: [{ id: metaContentId(p.productId, p.variantId), quantity: p.quantity }],
    value: p.price * p.quantity,
    currency: p.currency,
  });
}

export function trackInitiateCheckout(p: {
  items: Array<{ productId: string; variantId: string; quantity: number }>;
  value: number;
  currency: string;
}) {
  const contents = p.items.map(i => ({ id: metaContentId(i.productId, i.variantId), quantity: i.quantity }));
  fbq("track", "InitiateCheckout", {
    content_ids: contents.map(c => c.id),
    contents,
    content_type: "product",
    num_items: p.items.reduce((sum, i) => sum + i.quantity, 0),
    value: p.value,
    currency: p.currency,
  });
}

export function trackSearch(query: string) {
  fbq("track", "Search", { search_string: query });
}

type Attribution = Record<string, string>;

function readAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Call once on app load. Keeps the first touch, but a new visit that carries
// campaign tags (e.g. clicking a new ad) replaces it.
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const tagged: Attribution = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) tagged[key] = value.slice(0, 250);
    }

    const existing = readAttribution();
    if (existing && Object.keys(tagged).length === 0) return;

    const referrer = document.referrer && !document.referrer.includes(window.location.hostname) ? document.referrer : "";
    const attribution: Attribution = {
      ...tagged,
      landing_page: (window.location.pathname + window.location.search).slice(0, 250),
      first_visit: new Date().toISOString(),
    };
    if (referrer) attribution.referrer = referrer.slice(0, 250);

    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage unavailable (private mode, etc.) — skip attribution.
  }
}

// Shopify cart attributes. Keys starting with "_" are hidden from the
// customer at checkout but still appear on the order in admin.
export function getCartAttributes(): Array<{ key: string; value: string }> {
  const attribution = readAttribution();
  if (!attribution) return [];
  return Object.entries(attribution).map(([key, value]) => ({ key: `_${key}`, value }));
}
