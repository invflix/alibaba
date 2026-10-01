import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { services } from "@/data/services";
import { localeHref } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // Each page is listed in both languages, with hreflang alternates pointing at each other.
  const page = (path: string, priority: number): MetadataRoute.Sitemap =>
    (["en", "ar"] as const).map((lang) => ({
      url: `${site.url}${localeHref(lang, path)}`,
      lastModified: now,
      priority: lang === "en" ? priority : Math.round(priority * 9) / 10,
      alternates: { languages: { en: `${site.url}${localeHref("en", path)}`, ar: `${site.url}${localeHref("ar", path)}` } },
    }));

  return [
    ...page("/", 1),
    ...page("/about-us/", 0.8),
    ...page("/products/", 0.9),
    ...page("/services/", 0.9),
    ...page("/heavy-equipment-rental/", 0.8),
    ...page("/contact/", 0.8),
    ...page("/quality-policy/", 0.5),
    ...page("/certificates/", 0.6),
    ...page("/ohs/", 0.5),
    ...page("/safety-policy/", 0.5),
    ...services.flatMap((s) => page(`/services/${s.slug}/`, 0.8)),
    ...categories.flatMap((c) => page(`/products/${c.slug}/`, 0.8)),
    ...products.flatMap((p) => page(`/products/${p.category}/${p.slug}/`, 0.6)),
  ];
}
