import type { Metadata } from "next";
import { localeHref, type Locale } from "./config";

/**
 * Per-page metadata with a locale-correct canonical and hreflang alternates.
 * `path` is the locale-less path, e.g. "/about-us/".
 */
export function pageMeta(
  lang: Locale,
  path: string,
  { title, description, image }: { title?: string; description?: string; image?: string | null },
): Metadata {
  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical: localeHref(lang, path),
      languages: { en: localeHref("en", path), ar: localeHref("ar", path), "x-default": localeHref("en", path) },
    },
    ...(image ? { openGraph: { images: [image] } } : {}),
  };
}
