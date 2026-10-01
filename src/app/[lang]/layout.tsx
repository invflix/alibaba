import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { DM_Serif_Display, IBM_Plex_Sans_Arabic, Manrope, Noto_Naskh_Arabic } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { QuoteProvider } from "@/components/QuoteList";
import { BackToTop, RevealObserver } from "@/components/ScrollEffects";
import { dirOf, hasLocale, localeHref, locales } from "@/i18n/config";
import { getCategories, getDictionary, getEquipment, getProducts, getServices, getSiteText } from "@/i18n/content";
import { buildNav } from "@/lib/nav";
import { site } from "@/lib/site";
import "../globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
// Arabic faces are only requested on Arabic pages (the CSS only references them under :lang(ar)).
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.siteTitle, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    applicationName: getSiteText(lang).name,
    alternates: {
      canonical: localeHref(lang, "/"),
      languages: { en: "/", ar: "/ar/", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: getSiteText(lang).name,
      locale: dict.meta.ogLocale,
      alternateLocale: lang === "en" ? "ar_SA" : "en_US",
      url: localeHref(lang, "/"),
      images: [{ url: "/images/site/hero.jpg", width: 2000, height: 1335, alt: getSiteText(lang).name }],
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f4f0",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: ["Al Batin Indus", "شركة الباطن للمقاولات المتقدمة المحدودة"],
  url: site.url,
  logo: `${site.url}/images/site/logo.png`,
  image: `${site.url}/images/site/hero.jpg`,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: "362",
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: "SA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  areaServed: "Saudi Arabia",
  sameAs: [site.social.facebook, site.social.instagram],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const categories = getCategories(lang);
  const nav = buildNav(lang, dict, categories);
  // Quote-list ids -> names in this language, so items added on the other locale read correctly.
  const quoteLabels: Record<string, string> = Object.fromEntries([
    ...dict.home.services.cards.map((c) => [`service:${c.slug}`, c.name]),
    ...getServices(lang).map((s) => [`service:${s.slug}`, s.name]),
    ...categories.map((c) => [`category:${c.slug}`, c.name]),
    ...getProducts(lang).map((p) => [`product:${p.slug}`, p.name]),
    ...getEquipment(lang).map((e) => [`equipment:${e.image}`, e.name]),
  ]);
  const fonts = [manrope.variable, dmSerif.variable, lang === "ar" ? `${plexArabic.variable} ${naskh.variable}` : ""].join(" ");

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${fonts} antialiased`} suppressHydrationWarning>
      <head>
        {/* Flags JS support before paint so scroll-reveal styles never hide content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="relative flex min-h-dvh flex-col font-sans">
        <div id="top-sentinel" aria-hidden className="pointer-events-none absolute start-0 top-0 h-6 w-px" />
        <div id="fold-sentinel" aria-hidden className="pointer-events-none absolute start-0 top-0 h-[900px] w-px" />
        <QuoteProvider labels={quoteLabels}>
          <Header
            lang={lang}
            nav={nav}
            common={dict.common}
            quote={dict.quoteList}
            siteName={getSiteText(lang).name}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} dict={dict} categories={categories} services={getServices(lang)} />
        </QuoteProvider>
        <BackToTop label={dict.common.backToTop} />
        <RevealObserver />
        <JsonLd data={organization} />
      </body>
    </html>
  );
}
