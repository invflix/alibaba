import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Medal,
  Stack,
  ShieldCheck,
  HardHat,
  Certificate,
  DownloadSimple,
  Wrench,
  ArrowsClockwise,
  PaintRoller,
  Thermometer,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import Hero from "@/components/home/Hero";
import ServicesExplorer, { type ExplorerItem } from "@/components/home/ServicesExplorer";
import ProductShowcase from "@/components/home/ProductShowcase";
import PointerParallax from "@/components/PointerParallax";
import Counter from "@/components/Counter";
import Gallery from "@/components/Gallery";
import EnquirySection from "@/components/EnquirySection";
import { ButtonLink, NudgeIcon, SectionHeading } from "@/components/ui";
import { hasLocale, localeHref } from "@/i18n/config";
import {
  galleryLabels,
  getCategories,
  getCertificates,
  getDictionary,
  getEquipment,
  getIndustrialScope,
  getProducts,
  getProjects,
  getServices,
} from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMeta(lang, "/", {});
}

const strengthIcons = [Medal, Stack, ShieldCheck, HardHat];
const scopeIcons = [Wrench, ArrowsClockwise, PaintRoller, Thermometer, Buildings];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const h = dict.home;
  const href = (p: string) => localeHref(lang, p);

  const categories = getCategories(lang);
  const products = getProducts(lang);
  const certificates = getCertificates(lang);
  const services = getServices(lang);
  const scope = getIndustrialScope(lang);
  const projects = getProjects(lang);
  const counts = Object.fromEntries(categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length]));

  const stats = h.stats.map((s, i) => ({
    ...s,
    value: i === 2 ? products.length : i === 3 ? certificates.length : s.value,
  }));

  // Services, product ranges and the hire fleet, all real pages, in one filterable grid.
  const explorer: ExplorerItem[] = [
    ...h.services.cards.map((c, i) => {
      const svc = services.find((s) => s.slug === c.slug);
      return {
        id: `service:${c.slug}`,
        kind: "services" as const,
        title: c.name,
        text: c.text,
        href: href(c.slug === "heavy-equipment-rental" ? "/heavy-equipment-rental/" : `/services/${c.slug}/`),
        bullets: svc?.list?.items,
        icon: i,
      };
    }),
    ...categories.map((c) => ({
      id: `category:${c.slug}`,
      kind: "products" as const,
      title: c.name,
      text: c.summary,
      href: href(`/products/${c.slug}/`),
      image: c.cover,
    })),
    ...getEquipment(lang).map((e) => ({
      id: `equipment:${e.image}`,
      kind: "equipment" as const,
      title: e.name,
      text: e.description,
      href: href("/heavy-equipment-rental/"),
      image: e.image,
    })),
  ];

  return (
    <>
      <Hero
        lang={lang}
        t={h.hero}
        chips={h.services.cards.map((c) => c.name)}
        categories={categories}
        counts={counts}
        itemsWord={dict.common.items}
      />

      {/* Figures band */}
      <section aria-label={h.about.label} className="relative isolate border-y border-line bg-surface">
        <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-70" />
        <dl className="container-x grid grid-cols-2 gap-y-10 py-12 sm:py-16 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center" data-reveal="scale" style={{ "--reveal-delay": i } as React.CSSProperties}>
              <dd className="font-display-tight text-5xl text-ink sm:text-6xl" dir="ltr">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-3 text-[13px] text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Company introduction */}
      <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <PointerParallax className="relative grid grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-line shadow-[var(--shadow-float)] [transition:translate_0.6s_var(--ease-out-soft)] [translate:calc(var(--px,0)*8px)_calc(var(--py,0)*8px)]"
            data-reveal="image"
          >
            <Image src="/images/site/scaffold-building.jpg" alt={dict.about.towerAlt} fill sizes="(min-width: 1024px) 26vw, 55vw" className="object-cover" />
            <div className="absolute bottom-3 start-3 rounded-2xl bg-card/95 px-4 py-3 shadow-[var(--shadow-elevated)] backdrop-blur">
              <p className="font-display-tight text-3xl text-brand-700" dir="ltr">12+</p>
              <p className="mt-1 text-xs text-muted">{h.about.years}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-12 [transition:translate_0.6s_var(--ease-out-soft)] [translate:calc(var(--px,0)*-14px)_calc(var(--py,0)*-14px)] sm:gap-4 sm:pt-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-line shadow-[var(--shadow-elevated)]" data-reveal="image">
              <Image src="/images/site/scaffold-tower.jpg" alt={dict.about.towerAlt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-line shadow-[var(--shadow-elevated)]" data-reveal="image">
              <Image src="/images/site/scaffold-props.jpg" alt={dict.servicesPage.heroAlt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
          </div>
        </PointerParallax>

        <div>
          <SectionHeading kicker={h.about.label} lead={h.about.titleLead} accent={h.about.titleAccent} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-[17px]" data-reveal>
            {h.about.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
            {[
              [h.about.vision, h.about.visionText],
              [h.about.mission, h.about.missionText],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[20px] bg-card p-5 ring-1 ring-line transition-[box-shadow,translate] duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
                <dt className="font-display-tight text-xl text-brand-700">{title}</dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-muted">{text}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={href("/about-us/")} variant="secondary" className="mt-8" data-reveal>
            {h.about.cta}
            <NudgeIcon>
              <ArrowRight size={16} />
            </NudgeIcon>
          </ButtonLink>
        </div>
      </section>

      {/* Services, products and fleet */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" kicker={h.services.label} lead={h.services.titleLead} accent={h.services.titleAccent} intro={h.services.intro} />
          <div className="mt-10">
            <ServicesExplorer
              items={explorer}
              t={{
                filters: h.services.filters,
                tags: h.services.tags,
                filterLabel: h.services.filterLabel,
                add: dict.quoteList.add,
                added: dict.quoteList.added,
                details: dict.common.viewDetails,
              }}
            />
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="relative isolate overflow-hidden bg-surface py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading kicker={h.products.label} lead={h.products.titleLead} accent={h.products.titleAccent} intro={h.products.intro} />
            <ButtonLink href={href("/products/")} variant="secondary" className="self-start md:self-auto" data-reveal>
              {h.products.cta}
            </ButtonLink>
          </div>
          <div className="mt-12" data-reveal>
            <ProductShowcase
              t={{ items: dict.common.items, viewCategory: h.products.viewCategory, label: dict.productsPage.categoriesLabel }}
              categories={categories.map((c) => ({
                slug: c.slug,
                name: c.name,
                summary: c.summary,
                cover: c.cover,
                href: href(`/products/${c.slug}/`),
                products: products
                  .filter((p) => p.category === c.slug)
                  .map((p) => ({ slug: p.slug, name: p.name, image: p.image, href: href(`/products/${p.category}/${p.slug}/`) })),
              }))}
            />
          </div>
        </div>
      </section>

      {/* Strengths — the reference's four numbered columns */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading align="center" kicker={h.strengths.label} lead={h.strengths.titleLead} accent={h.strengths.titleAccent} />
        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {h.strengths.items.map((s, i) => {
            const Icon = strengthIcons[i];
            return (
              <li key={s.title} className="group relative border-t border-line pt-6" data-reveal style={{ "--reveal-delay": i } as React.CSSProperties}>
                <span aria-hidden className="absolute -top-px start-0 h-px w-0 bg-brand-700 transition-[width] duration-700 ease-(--ease-out-soft) group-hover:w-full" />
                <span className="font-display-tight text-sm text-muted" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={26} weight="light" className="mt-5 text-brand-700 transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="font-display-tight mt-4 text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Industrial scope — bento of real service areas */}
      <section className="container-x pb-20 sm:pb-28">
        <SectionHeading align="center" kicker={h.industries.label} lead={h.industries.titleLead} accent={h.industries.titleAccent} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
          {scope.map((x, i) => {
            const Icon = scopeIcons[i];
            const styles = [
              "lg:col-span-2 lg:row-span-2 bg-brand-700 text-white",
              "lg:col-span-2 bg-card ring-1 ring-line",
              "lg:col-span-2 bg-night text-white",
              "lg:col-span-2 bg-card ring-1 ring-line",
              "lg:col-span-2 bg-surface ring-1 ring-line",
            ][i];
            const dark = i === 0 || i === 2;
            return (
              <li
                key={x}
                data-reveal="scale"
                style={{ "--reveal-delay": i } as React.CSSProperties}
                className={`group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-[24px] p-6 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] sm:p-7 ${styles}`}
              >
                {i === 0 ? (
                  <Image src="/images/projects/blower-building.jpg" alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="-z-10 object-cover opacity-25 mix-blend-luminosity transition-transform duration-1000 group-hover:scale-105" />
                ) : null}
                <span className={`grid size-12 place-items-center rounded-full ${dark ? "bg-white/10 text-white" : "bg-brand-50 text-brand-700"}`}>
                  <Icon size={22} weight="light" />
                </span>
                <p className={`font-display-tight mt-8 ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"} ${dark ? "text-white" : "text-ink"}`}>{x}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Projects */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" kicker={h.projects.label} lead={h.projects.titleLead} accent={h.projects.titleAccent} />
          <div className="mt-12">
            <Gallery layout="feature" labels={galleryLabels(lang)} items={projects.map((p) => ({ src: p.image, alt: p.name, caption: p.name }))} />
          </div>
        </div>
      </section>

      {/* Safety & quality — dark band with the real ISO certificates */}
      <section className="relative isolate overflow-hidden bg-night py-20 text-white sm:py-28">
        <div aria-hidden className="bg-dots-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_20%_30%,#000,transparent_70%)]" />
        <div aria-hidden className="absolute -end-40 -top-40 -z-10 size-[520px] rounded-full bg-brand-700/25 blur-3xl" />
        <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading tone="light" kicker={h.safety.label} lead={h.safety.titleLead} accent={h.safety.titleAccent} intro={h.safety.text} />
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px]" data-reveal>
              <Link href={href("/safety-policy/")} className="group inline-flex items-center gap-2 text-white underline-offset-4 hover:underline">
                {h.safety.safetyPolicy} <ArrowRight size={14} className="flip-rtl" />
              </Link>
              <Link href={href("/quality-policy/")} className="group inline-flex items-center gap-2 text-white underline-offset-4 hover:underline">
                {h.safety.qualityPolicy} <ArrowRight size={14} className="flip-rtl" />
              </Link>
            </div>
          </div>
          <div>
            <p className="text-[13px] text-white/50" data-reveal>
              {h.safety.certified}
            </p>
            <ul className="mt-4 space-y-3">
              {certificates.map((c, i) => (
                <li key={c.code} data-reveal style={{ "--reveal-delay": i } as React.CSSProperties}>
                  <div className="group flex items-center gap-4 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]">
                    <Link href={href("/certificates/")} className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={c.image} alt={`${c.code} ${c.name}`} fill sizes="48px" className="object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium text-white" dir="ltr">
                        {c.code}
                      </p>
                      <p className="text-[13px] text-white/55">{c.name}</p>
                    </div>
                    <a
                      href={c.pdf}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${dict.common.downloadPdf}: ${c.code}`}
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-700"
                    >
                      <DownloadSimple size={17} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3" data-reveal>
              <a href={site.docs.profile} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-medium text-ink hover:bg-paper">
                <DownloadSimple size={16} /> {dict.common.downloadCompanyProfile}
              </a>
              <Link href={href("/certificates/")} className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] text-white ring-1 ring-white/20 hover:bg-white/10">
                <Certificate size={16} /> {dict.nav.certificates}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <EnquirySection lang={lang} dict={dict} />
    </>
  );
}
