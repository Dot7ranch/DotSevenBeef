// Renders every known route to static HTML after `vite build` so crawlers (Google, Bing, and AI
// answer engines that don't run JavaScript) get real content, titles, and structured data.
// Also writes sitemap.xml and llms.txt. Run via `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const server = await import(pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href);
const { render, recipes, SITE_URL } = server;

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--seo:start-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html is missing the <!--seo:start--> markers or the empty #root div.");
}

// Untouched SPA shell for product/collection/recipe URLs added after this build (see vercel.json).
fs.writeFileSync(path.join(dist, "app-shell.html"), template);

const SKIP_COLLECTIONS = new Set(["frontpage"]);

async function mapLimit(items, limit, fn) {
  const results = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await fn(items[i]);
      }
    }),
  );
  return results;
}

// Shopify data. If the Storefront API is unreachable, the static pages still prerender and
// product/collection URLs fall back to the SPA shell instead of failing the deploy.
let products = [];
let productDetails = [];
let collections = [];
try {
  products = await server.fetchProducts(250);
  productDetails = (await mapLimit(products, 6, (p) => server.fetchProductByHandle(p.node.handle))).filter(Boolean);
  const list = await server.fetchCollections(250);
  collections = (
    await mapLimit(
      list.filter((c) => !SKIP_COLLECTIONS.has(c.node.handle)),
      6,
      (c) => server.fetchCollectionByHandle(c.node.handle, 250),
    )
  ).filter((c) => c && c.products.edges.length > 0);
} catch (err) {
  console.warn(`[prerender] Shopify fetch failed, skipping product and collection pages: ${err.message}`);
}

const routes = [
  { url: "/" },
  { url: "/our-story" },
  { url: "/history" },
  { url: "/recipes" },
  { url: "/faq" },
  { url: "/return-your-box" },
  { url: "/shop-all", data: products.length ? { products } : {} },
  { url: "/accessibility" },
  ...recipes.map((r) => ({ url: `/recipes/${r.slug}` })),
  ...collections.map((c) => ({ url: `/collections/${c.handle}`, data: { collection: c } })),
  ...productDetails.map((p) => ({ url: `/product/${p.handle}`, data: { product: p } })),
];

function buildPage(url, data = {}) {
  const { html, head, noindex } = render(url, data);
  const dataScript = Object.keys(data).length
    ? `<script>window.__PRERENDER_DATA__=${JSON.stringify(data).replace(/</g, "\\u003c")}</script>\n    `
    : "";
  const page = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('<script type="module"', `${dataScript}<script type="module"`);
  return { page, noindex };
}

const outFile = (url) => (url === "/" ? path.join(dist, "index.html") : path.join(dist, `${url.slice(1)}.html`));

const indexable = [];
for (const { url, data } of routes) {
  const { page, noindex } = buildPage(url, data);
  const file = outFile(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  if (!noindex) indexable.push(url);
}

// Vercel serves 404.html with a real 404 status for any path with no file and no rewrite.
fs.writeFileSync(path.join(dist, "404.html"), buildPage("/404").page);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((url) => `  <url><loc>${SITE_URL}${url === "/" ? "/" : url}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

const price = (p) => {
  const { amount, currencyCode } = p.priceRange.minVariantPrice;
  return currencyCode === "USD" ? `$${Number(amount).toFixed(2)}` : `${amount} ${currencyCode}`;
};
const llms = `# Dot Seven Ranch

> Dot Seven Ranch is a fourth-generation family cattle ranch in Sanger, California, established in 1948. We raise Angus cattle, finish them on grain for the last 120 days, and sell the beef by the cut, in curated boxes, and as beef shares. Beef ships frozen on dry ice across the country with flat-rate shipping by time zone, and local customers can pick up at Longhorn Feed and Supply in Clovis, CA.

Key facts:
- Angus cattle from a mostly closed herd. Calves receive no added hormones.
- Grass-fed, grain-finished: cattle graze the Sanger foothills, then spend their last 120 days on a nutritionist-built ration of alfalfa, wheat hay, corn silage, rolled corn, and molasses.
- USDA inspected, processed at a small family-owned locker.
- Orders ship Monday or Tuesday for Wednesday or Thursday delivery. The weekly cutoff is Sunday at 11:59pm PT.
- Contact: support@dotsevenranch.com

## Pages
- [Shop all products](${SITE_URL}/shop-all)
- [Beef shipping and ranch FAQ](${SITE_URL}/faq): Shipping schedule, delivery times, local pickup, dry ice, and how the cattle are raised
- [Meet the ranchers](${SITE_URL}/our-story)
- [Ranch history since 1948](${SITE_URL}/history)
- [Return your box](${SITE_URL}/return-your-box): Send the insulated box back for a free pound of ground beef
- [Recipes](${SITE_URL}/recipes)
${collections.length ? `\n## Collections\n${collections.map((c) => `- [${c.title}](${SITE_URL}/collections/${c.handle})`).join("\n")}\n` : ""}${products.length ? `\n## Products\n${products.map((p) => `- [${p.node.title}](${SITE_URL}/product/${p.node.handle}): from ${price(p.node)}`).join("\n")}\n` : ""}
## Recipes
${recipes.map((r) => `- [${r.title}](${SITE_URL}/recipes/${r.slug})`).join("\n")}
`;
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
console.log(`[prerender] Wrote ${routes.length} pages, 404.html, sitemap.xml (${indexable.length} URLs), llms.txt`);
