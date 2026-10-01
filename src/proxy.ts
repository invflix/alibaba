import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing. English is served at the original unprefixed URLs (rewritten internally to the
 * /en segment), Arabic is served at /ar/... . Direct hits on /en/... are redirected to the
 * unprefixed canonical URL so the same page never exists at two addresses.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ar" || pathname.startsWith("/ar/")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals and any path with a file extension (images, PDFs, sitemap.xml, robots.txt, icons).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
