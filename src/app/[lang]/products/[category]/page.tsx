import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CategoryChips from "@/components/CategoryChips";
import ProductBrowser from "@/components/ProductBrowser";
import CTASection from "@/components/CTASection";
import { categories } from "@/data/products";
import { catalogKit, getCategories, getCategoryL, getProducts, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[category]">) {
  const lang = await resolveLang(params);
  const { category } = await params;
  const c = getCategoryL(lang, category);
  if (!c) return {};
  const { dict } = pageKit(lang);
  return pageMeta(lang, `/products/${c.slug}/`, { title: c.name, description: `${c.summary} ${dict.productsPage.categoryMetaSuffix}`, image: c.cover });
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/products/[category]">) {
  const lang = await resolveLang(params);
  const { category } = await params;
  const c = getCategoryL(lang, category);
  if (!c) notFound();
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.productsPage;
  const all = getProducts(lang);
  const list = all.filter((p) => p.category === c.slug);
  const kit = catalogKit(lang);

  return (
    <>
      <PageHero
        title={c.name}
        home={home}
        crumbs={[
          { label: dict.nav.products, href: h("/products/") },
          { label: c.name, href: h(`/products/${c.slug}/`) },
        ]}
        intro={c.summary}
        image={c.hero}
      />
      <section className="container-x py-12 sm:py-16">
        <CategoryChips active={c.slug} categories={getCategories(lang)} products={all} base={kit.base} allLabel={t.all} navLabel={t.categoriesLabel} />
        <div className="mt-10">
          <ProductBrowser products={list} label={lang === "en" ? `${c.name} ${t.productsWord}` : t.productsWord} base={kit.base} t={kit.browser} card={kit.card} />
        </div>
      </section>
      <CTASection {...cta(t.categoryCtaTitle, fmt(t.categoryCtaText, { category: lang === "en" ? c.name.toLowerCase() : c.name }))} />
    </>
  );
}
