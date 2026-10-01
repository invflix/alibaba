import { localeHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Category } from "@/data/products";

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

/** Same structure as the original site navigation, with labels and hrefs resolved per locale. */
export function buildNav(lang: Locale, dict: Dictionary, categories: Category[]): NavItem[] {
  const n = dict.nav;
  const h = (path: string) => localeHref(lang, path);
  return [
    { label: n.home, href: h("/") },
    {
      label: n.about,
      href: h("/about-us/"),
      children: [
        { label: n.about, href: h("/about-us/") },
        { label: n.quality, href: h("/quality-policy/") },
        { label: n.certificates, href: h("/certificates/") },
      ],
    },
    {
      label: n.products,
      href: h("/products/"),
      children: [
        { label: n.allProducts, href: h("/products/") },
        ...categories.map((c) => ({ label: c.name, href: h(`/products/${c.slug}/`) })),
      ],
    },
    {
      label: n.services,
      href: h("/services/"),
      children: [
        { label: n.allServices, href: h("/services/") },
        { label: n.rentals, href: h("/services/scaffolding-rentals/") },
        { label: n.erection, href: h("/services/scaffolding-erection/") },
        { label: n.sales, href: h("/services/scaffolding-sales/") },
        { label: n.equipment, href: h("/heavy-equipment-rental/") },
      ],
    },
    {
      label: n.ohs,
      href: h("/ohs/"),
      children: [
        { label: n.ohsFull, href: h("/ohs/") },
        { label: n.safety, href: h("/safety-policy/") },
      ],
    },
    { label: n.contact, href: h("/contact/") },
  ];
}
