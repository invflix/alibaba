import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import { notFound } from "next/navigation";
import { hasLocale, localeHref, type Locale } from "./config";
import { categories, products, type Category, type Product } from "@/data/products";
import { services, servicesIntro, industrialScope, type Service } from "@/data/services";
import { equipment, fleetGallery } from "@/data/equipment";
import { certificates, projects, site } from "@/lib/site";
import {
  categoriesAr,
  certificatesAr,
  equipmentAr,
  fleetGalleryAr,
  industrialScopeAr,
  productsAr,
  projectsAr,
  salesRentalsBodyAr,
  servicesAr,
  servicesIntroAr,
  siteAr,
  supplyListAr,
} from "@/data/ar";

const dictionaries = { en, ar };

export const getDictionary = (lang: Locale) => dictionaries[lang];

/*
  Localized views over the English source data. In English they return the original objects
  untouched; in Arabic only the human-readable text is swapped, slugs and image paths stay.
*/

export function getCategories(lang: Locale): Category[] {
  if (lang === "en") return categories;
  return categories.map((c) => ({ ...c, ...categoriesAr[c.slug] }));
}

export function getCategoryL(lang: Locale, slug: string) {
  return getCategories(lang).find((c) => c.slug === slug);
}

export function getProducts(lang: Locale): Product[] {
  if (lang === "en") return products;
  return products.map((p) => ({ ...p, ...(productsAr[p.slug] ?? {}) }));
}

export function getProductL(lang: Locale, category: string, slug: string) {
  return getProducts(lang).find((p) => p.category === category && p.slug === slug);
}

export function getServices(lang: Locale): Service[] {
  if (lang === "en") return services;
  return services.map((s) => {
    const t = servicesAr[s.slug];
    return {
      ...s,
      name: t.name,
      title: t.title,
      summary: t.summary,
      imageAlt: t.imageAlt,
      body: t.body.length ? t.body : salesRentalsBodyAr,
      list: s.list ? supplyListAr : undefined,
    };
  });
}

export function getServiceL(lang: Locale, slug: string) {
  return getServices(lang).find((s) => s.slug === slug);
}

export const getServicesIntro = (lang: Locale) => (lang === "en" ? servicesIntro : servicesIntroAr);
export const getIndustrialScope = (lang: Locale) => (lang === "en" ? industrialScope : industrialScopeAr);

export function getEquipment(lang: Locale) {
  if (lang === "en") return equipment;
  return equipment.map((e) => ({ ...e, ...equipmentAr[e.name] }));
}

export function getFleetGallery(lang: Locale) {
  if (lang === "en") return fleetGallery;
  return fleetGallery.map((g) => ({ ...g, alt: fleetGalleryAr[g.src] ?? g.alt }));
}

export function getProjects(lang: Locale) {
  if (lang === "en") return projects;
  return projects.map((p) => ({ ...p, name: projectsAr[p.name] ?? p.name }));
}

export function getCertificates(lang: Locale) {
  if (lang === "en") return certificates;
  return certificates.map((c) => ({ ...c, name: certificatesAr[c.code] ?? c.name }));
}

export function getSiteText(lang: Locale) {
  if (lang === "en") return { name: site.name, shortName: site.shortName, address: site.address };
  return siteAr;
}

export const galleryLabels = (lang: Locale) => {
  const c = getDictionary(lang).common;
  return { viewLarger: c.viewLarger, close: c.close, previous: c.previousImage, next: c.nextImage, viewer: c.imageViewer };
};

/** Validates the [lang] route param (404 for anything but en/ar). */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}

/** Everything an inner page needs: dictionary, href builder, home crumb and CTA props. */
export function pageKit(lang: Locale) {
  const dict = getDictionary(lang);
  const h = (p: string) => localeHref(lang, p);
  return {
    dict,
    h,
    home: { label: dict.common.home, href: h("/") },
    cta: (title: string = dict.cta.title, text: string = dict.cta.text) => ({
      title,
      text,
      contactHref: h("/contact/"),
      buttonLabel: dict.common.requestQuote,
    }),
    gallery: galleryLabels(lang),
  };
}

/** Labels for the client-side product browser and cards, plus the locale URL prefix. */
export function catalogKit(lang: Locale) {
  const d = getDictionary(lang);
  const p = d.productsPage;
  return {
    base: lang === "en" ? "" : `/${lang}`,
    browser: { showing: p.showing, search: p.search, clearSearch: p.clearSearch, noMatch: p.noMatch, noMatchText: p.noMatchText },
    card: {
      details: d.common.viewDetails,
      enquire: d.common.enquire,
      photoSoon: p.photoSoon,
      categories: Object.fromEntries(getCategories(lang).map((c) => [c.slug, c.name])),
    },
  };
}
