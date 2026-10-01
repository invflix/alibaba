import PageHero from "@/components/PageHero";
import CategoryChips from "@/components/CategoryChips";
import ProductBrowser from "@/components/ProductBrowser";
import CTASection from "@/components/CTASection";
import { catalogKit, getCategories, getProducts, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/products/", { title: dict.productsPage.title, description: dict.productsPage.metaDescription });
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.productsPage;
  const products = getProducts(lang);
  const kit = catalogKit(lang);

  return (
    <>
      <PageHero title={t.title} home={home} crumbs={[{ label: dict.nav.products, href: h("/products/") }]} intro={t.intro} />
      <section className="container-x pb-12 sm:pb-16">
        <CategoryChips categories={getCategories(lang)} products={products} base={kit.base} allLabel={t.all} navLabel={t.categoriesLabel} />
        <div className="mt-10">
          <ProductBrowser products={products} label={t.productsWord} base={kit.base} t={kit.browser} card={kit.card} />
        </div>
      </section>
      <CTASection {...cta(t.ctaTitle, t.ctaText)} />
    </>
  );
}
