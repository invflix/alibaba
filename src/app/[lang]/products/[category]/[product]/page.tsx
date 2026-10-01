import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, WhatsappLogo, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "@/components/Breadcrumb";
import { ProductGrid, ProductImage, enquireHref } from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { AddToQuote } from "@/components/QuoteList";
import { buttonClass } from "@/components/ui";
import { products } from "@/data/products";
import { catalogKit, getCategoryL, getProductL, getProducts, getSiteText, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[category]/[product]">) {
  const lang = await resolveLang(params);
  const { category, product } = await params;
  const p = getProductL(lang, category, product);
  if (!p) return {};
  const c = getCategoryL(lang, p.category)!;
  const { dict } = pageKit(lang);
  return pageMeta(lang, `/products/${p.category}/${p.slug}/`, {
    title: p.name,
    description: `${p.summary} ${fmt(dict.productPage.metaSuffix, { category: c.name })}`,
    image: p.image,
  });
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[category]/[product]">) {
  const lang = await resolveLang(params);
  const { category, product } = await params;
  const p = getProductL(lang, category, product);
  if (!p) notFound();
  const c = getCategoryL(lang, p.category)!;
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.productPage;
  const kit = catalogKit(lang);
  const s = getSiteText(lang);
  const related = getProducts(lang)
    .filter((x) => x.category === p.category && x.slug !== p.slug)
    .slice(0, 4);
  const whatsappText = encodeURIComponent(fmt(t.whatsappText, { name: p.name }));

  const specs = [
    { label: t.specProduct, value: p.name },
    { label: t.specCategory, value: c.name, href: h(`/products/${c.slug}/`) },
    { label: t.specSupplier, value: s.name },
    { label: t.specLocation, value: `${s.address.city}${lang === "ar" ? "، " : ", "}${s.address.country}` },
    { label: t.specSizes, value: t.specSizesValue },
  ];

  return (
    <>
      <section className="container-x grid gap-8 pb-12 pt-10 sm:pt-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-20">
        <div className="group relative aspect-square w-full animate-hero-in overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_at_50%_40%,#fff_0%,var(--color-surface)_80%)] ring-1 ring-line lg:max-w-[600px]">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_35%,#000_85%)]" />
          <div aria-hidden className="spin-slow absolute left-1/2 top-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-700/20" />
          <div className="bob absolute inset-[6%]">
            <ProductImage product={p} sizes="(min-width: 1024px) 600px, 100vw" priority photoSoon={dict.productsPage.photoSoon} />
          </div>
        </div>

        <div className="flex animate-hero-in flex-col [animation-delay:100ms]">
          <div className="[&_ol]:justify-start">
            <Breadcrumb
              home={home}
              items={[
                { label: dict.nav.products, href: h("/products/") },
                { label: c.name, href: h(`/products/${c.slug}/`) },
                { label: p.name, href: h(`/products/${c.slug}/${p.slug}/`) },
              ]}
            />
          </div>
          <Link href={h(`/products/${c.slug}/`)} className="kicker mt-8 w-fit">
            {c.name}
          </Link>
          <h1 className="font-display-tight mt-3 text-[2.5rem] text-ink sm:text-[3.5rem]">{p.name}</h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">{p.summary}</p>

          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
            <Link href={enquireHref(p, kit.base)} className={buttonClass("primary")}>
              {dict.common.enquireNow} <ArrowRight size={16} className="flip-rtl" />
            </Link>
            <a href={`${site.whatsapp}?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
              <WhatsappLogo size={18} /> {dict.common.whatsapp}
            </a>
            <AddToQuote item={{ id: `product:${p.slug}`, label: p.name }} addLabel={dict.quoteList.add} addedLabel={dict.quoteList.added} className="h-12 px-5" />
          </div>

          <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[15px] text-ink-soft">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-brand-700">
                <Phone size={18} className="text-brand-700" /> <span dir="ltr">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(`${dict.form.productEnquiry} ${p.name}`)}`} className="inline-flex items-center gap-3 hover:text-brand-700">
                <EnvelopeSimple size={18} className="text-brand-700" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <h2 className="font-display-tight text-3xl text-ink">{t.description}</h2>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted">{p.summary}</p>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted">{fmt(t.partOf, { category: c.name })}</p>
          </div>
          <div data-reveal>
            <h2 className="font-display-tight text-3xl text-ink">{t.specifications}</h2>
            <dl className="mt-5 overflow-hidden rounded-[20px] bg-card ring-1 ring-line">
              {specs.map((x, i) => (
                <div key={x.label} className={`grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-6 ${i ? "border-t border-line" : ""}`}>
                  <dt className="text-sm text-muted">{x.label}</dt>
                  <dd className="text-[15px] text-ink">
                    {x.href ? (
                      <Link href={x.href} className="hover:text-brand-700">
                        {x.value}
                      </Link>
                    ) : (
                      x.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t.specNote}</p>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="container-x py-12 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display-tight text-3xl text-ink">{fmt(t.more, { category: c.name })}</h2>
            <Link href={h(`/products/${c.slug}/`)} className="inline-flex shrink-0 items-center gap-1.5 text-[14px] text-brand-700">
              {dict.common.viewAll} <ArrowRight size={14} className="flip-rtl" />
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={related} base={kit.base} t={kit.card} />
          </div>
        </section>
      ) : null}

      <CTASection {...cta(fmt(t.ctaTitle, { name: p.name }), t.ctaText)} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.summary,
          category: c.name,
          ...(p.image ? { image: `${site.url}${p.image}` } : {}),
          brand: { "@type": "Brand", name: "Al-Batin" },
          url: `${site.url}${h(`/products/${c.slug}/${p.slug}/`)}`,
          inLanguage: lang,
        }}
      />
    </>
  );
}
