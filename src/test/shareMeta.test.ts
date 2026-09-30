import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { applyShareMeta, getShareMeta, sizedShopifyImage } from "@/lib/shareMeta";

const indexHtml = readFileSync("index.html", "utf8");

const mockShopify = (data: unknown) =>
  (async () => new Response(JSON.stringify({ data }), { status: 200 })) as unknown as typeof fetch;

describe("share link previews", () => {
  it("uses the product photo, title and price for product links", async () => {
    const meta = await getShareMeta("/product/dot-seven-porterhouse-steak", mockShopify({
      product: {
        title: "Dot Seven Porterhouse Steak",
        description: "A filet on one side and a strip steak on the other.",
        featuredImage: { url: "https://cdn.shopify.com/s/files/1/0584/0411/0525/files/F1AB.jpg?v=1779831170", altText: null },
        priceRange: { minVariantPrice: { amount: "52.0", currencyCode: "USD" } },
      },
    }));
    const html = applyShareMeta(indexHtml, meta!, "https://dotsevenranch.com/product/dot-seven-porterhouse-steak");

    expect(html).toContain('<meta property="og:image" content="https://cdn.shopify.com/s/files/1/0584/0411/0525/files/F1AB.jpg?v=1779831170&amp;width=1200" />');
    expect(html).toContain("<title>Dot Seven Porterhouse Steak | Dot Seven Ranch</title>");
    expect(html).toContain('<meta property="product:price:amount" content="52.00" />');
    expect(html).not.toContain("Untitled_design_24");
    // Exactly one of each tag, so preview bots don't pick the old one.
    expect(html.match(/property="og:image"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
    // The app still loads.
    expect(html).toContain('<div id="root"></div>');
  });

  it("uses the recipe photo for recipe links", async () => {
    const meta = await getShareMeta("/recipes/aloha-burgers");
    expect(meta?.image).toContain("cdn.shopify.com");
    const html = applyShareMeta(indexHtml, meta!, "https://dotsevenranch.com/recipes/aloha-burgers");
    expect(html).toContain("Aloha Burgers | Dot Seven Ranch Recipes");
  });

  it("falls back to the first product photo for a collection without an image", async () => {
    const meta = await getShareMeta("/collections/steaks", mockShopify({
      collection: {
        title: "Steaks", description: "", image: null,
        products: { edges: [{ node: { featuredImage: { url: "https://cdn.shopify.com/steak.jpg", altText: "Ribeye" } } }] },
      },
    }));
    expect(meta?.image).toBe("https://cdn.shopify.com/steak.jpg");
  });

  it("returns nothing for unknown products so the default tags stay", async () => {
    expect(await getShareMeta("/product/nope", mockShopify({ product: null }))).toBeNull();
  });

  it("escapes quotes in product text", () => {
    const html = applyShareMeta(indexHtml, { title: 'The "Big" Box', description: "<b>x</b>", type: "product" }, "https://x");
    expect(html).toContain("The &quot;Big&quot; Box");
    expect(html).toContain("&lt;b&gt;x&lt;/b&gt;");
  });

  it("strips Shopify size suffixes before resizing", () => {
    expect(sizedShopifyImage("https://cdn.shopify.com/a/b_600x.jpg?v=1")).toBe("https://cdn.shopify.com/a/b.jpg?v=1&width=1200");
  });
});
