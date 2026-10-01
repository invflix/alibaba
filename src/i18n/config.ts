/**
 * Locale routing rules (client-safe, no server-only imports).
 *
 * English keeps the original unprefixed WordPress URLs (/about-us/, /products/coupler/ ...) so
 * existing rankings and inbound links carry over; Arabic lives under /ar/. `src/proxy.ts`
 * rewrites unprefixed requests to the internal /en segment.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const dirOf = (lang: Locale) => (lang === "ar" ? "rtl" : "ltr");

/** Public URL for an internal, locale-less path such as "/products/coupler/". */
export function localeHref(lang: Locale, path: string) {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}/` : `/${lang}${path}`;
}

/** Splits a public pathname into its locale and the locale-less path. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const match = pathname.match(/^\/(ar)(\/.*|$)/);
  if (match) return { lang: "ar", path: match[2] || "/" };
  return { lang: defaultLocale, path: pathname || "/" };
}
