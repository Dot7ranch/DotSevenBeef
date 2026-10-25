export const SITE_URL = "https://www.dotsevenranch.com";
export const SITE_NAME = "Dot Seven Ranch";
export const DEFAULT_IMAGE =
  "https://cdn.shopify.com/s/files/1/0584/0411/0525/files/Untitled_design_24.png?v=1780347788";

export type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;

const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path === "/" ? "" : path}`);

/** Serializes one or more schema.org nodes for a <script type="application/ld+json"> tag. */
export function toJsonLd(data: JsonLd | JsonLd[]) {
  const doc = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  // Escape "<" so content can never close the script tag early.
  return JSON.stringify(doc).replace(/</g, "\\u003c");
}

export function decodeEntities(text: string) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Trims text to a meta-description length, cutting at a word boundary. */
export function summarize(text: string, max = 155) {
  const clean = decodeEntities(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

export const organization = (): JsonLd => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: DEFAULT_IMAGE,
  email: "support@dotsevenranch.com",
  foundingDate: "1948",
  description:
    "Family cattle ranch in Sanger, California raising grass-fed, grain-finished Angus beef and shipping it frozen to homes across the U.S.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sanger",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: ["https://www.instagram.com/dotsevenranch/"],
});

export const website = (): JsonLd => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": ORG_ID },
});

export const breadcrumbs = (items: { name: string; path: string }[]): JsonLd => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absolute(item.path),
  })),
});

export const faqPage = (faqs: { question: string; answer: string }[]): JsonLd => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

interface ProductLike {
  title: string;
  description?: string;
  handle: string;
  productType?: string;
  images?: { edges: { node: { url: string } }[] };
  variants?: {
    edges: {
      node: { title: string; price: { amount: string; currencyCode: string }; availableForSale: boolean };
    }[];
  };
}

export const product = (p: ProductLike): JsonLd => {
  const url = absolute(`/product/${p.handle}`);
  const offers = (p.variants?.edges || []).map(({ node }) => ({
    "@type": "Offer",
    ...(node.title !== "Default Title" && { name: node.title }),
    price: Number(node.price.amount).toFixed(2),
    priceCurrency: node.price.currencyCode,
    availability: node.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    url,
    seller: { "@id": ORG_ID },
  }));
  return {
    "@type": "Product",
    name: p.title,
    url,
    ...(p.description && { description: decodeEntities(p.description) }),
    image: (p.images?.edges || []).map((e) => e.node.url),
    ...(p.productType && { category: p.productType }),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: offers.length === 1 ? offers[0] : offers,
  };
};

export const itemList = (name: string, products: { title: string; handle: string }[]): JsonLd => ({
  "@type": "ItemList",
  name,
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    url: absolute(`/product/${p.handle}`),
  })),
});

function isoDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return undefined;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const recipe = (r: {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  ingredients?: string[];
  instructions?: string[];
}): JsonLd => ({
  "@type": "Recipe",
  name: r.title,
  url: absolute(`/recipes/${r.slug}`),
  description: decodeEntities(r.description),
  image: [r.image],
  ...(isoDate(r.date) && { datePublished: isoDate(r.date) }),
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  ...(r.prepTime && { prepTime: r.prepTime }),
  ...(r.cookTime && { cookTime: r.cookTime }),
  ...(r.servings && { recipeYield: `${r.servings} servings` }),
  ...(r.ingredients?.length && { recipeIngredient: r.ingredients.map(decodeEntities) }),
  ...(r.instructions?.length && {
    recipeInstructions: r.instructions.map((text) => ({ "@type": "HowToStep", text: decodeEntities(text) })),
  }),
});
