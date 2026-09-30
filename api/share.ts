// Serves index.html with link-preview tags for the page being shared.
// vercel.json rewrites /product/*, /collections/* and /recipes/* here.
import { applyShareMeta, getShareMeta } from "../src/lib/shareMeta";

export const config = { runtime: "edge" };

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  // The original path, passed by the vercel.json rewrite.
  const pathname = url.searchParams.get("path") || "/";
  const pageUrl = `${url.origin}${pathname}`;

  // Forward cookies so this also works on password-protected preview deploys.
  const shell = await fetch(new URL("/index.html", url.origin), {
    headers: { cookie: request.headers.get("cookie") ?? "" },
  });
  if (!shell.ok) return shell;
  let html = await shell.text();

  try {
    const meta = await getShareMeta(pathname);
    if (meta) html = applyShareMeta(html, meta, pageUrl);
  } catch (error) {
    // Fall back to the generic tags; the page itself still works.
    console.error("share meta failed", pathname, error);
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Cache at Vercel's edge for 10 minutes; new deploys clear it.
      "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
