import { useEffect } from "react";
import { SITE_NAME, SITE_URL, DEFAULT_IMAGE, toJsonLd, type JsonLd } from "@/lib/structuredData";

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
}

// Filled while rendering on the server so the prerender script can write the page's <head>.
export const ssrSeo: { current: SeoProps | null } = { current: null };

const fullTitle = (title: string) => (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`);

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headEntries({ title, description, path, image = DEFAULT_IMAGE, type = "website", noindex = false }: SeoProps) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title: fullTitle(title),
    url,
    meta: [
      ["name", "description", description],
      ["name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large"],
      ["property", "og:site_name", SITE_NAME],
      ["property", "og:title", fullTitle(title)],
      ["property", "og:description", description],
      ["property", "og:type", type],
      ["property", "og:url", url],
      ["property", "og:image", image],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:site", "@dotsevenranch"],
      ["name", "twitter:title", fullTitle(title)],
      ["name", "twitter:description", description],
      ["name", "twitter:image", image],
    ] as const,
  };
}

/** Static <head> markup for a page, written into the prerendered HTML. */
export function renderHeadTags(seo: SeoProps) {
  const { title, url, meta } = headEntries(seo);
  return [
    `<title>${escapeAttr(title)}</title>`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    ...meta.map(([attr, key, content]) => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`),
  ].join("\n    ");
}

function setMeta(attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const Seo = (props: SeoProps) => {
  if (typeof window === "undefined") ssrSeo.current = props;

  const { title, description, path, image, type, noindex, jsonLd } = props;

  useEffect(() => {
    const { title: docTitle, url, meta } = headEntries({ title, description, path, image, type, noindex });
    document.title = docTitle;
    meta.forEach(([attr, key, content]) => setMeta(attr, key, content));
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image, type, noindex]);

  if (!jsonLd) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />;
};

export default Seo;
