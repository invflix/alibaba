import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { AddToQuote } from "@/components/QuoteList";
import { buttonClass } from "@/components/ui";
import { getIndustrialScope, getServiceL, getServices, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { services } from "@/data/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const s = getServiceL(lang, slug);
  if (!s) return {};
  return pageMeta(lang, `/services/${s.slug}/`, { title: s.name, description: s.summary, image: s.image });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const lang = await resolveLang(params);
  const { slug } = await params;
  const s = getServiceL(lang, slug);
  if (!s) notFound();
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.servicesPage;
  const others = [
    ...getServices(lang)
      .filter((x) => x.slug !== s.slug)
      .map((x) => ({ name: x.name, href: h(`/services/${x.slug}/`) })),
    { name: dict.nav.equipment, href: h("/heavy-equipment-rental/") },
  ];
  const list = s.list ?? { heading: t.industrialFor, items: getIndustrialScope(lang) };

  return (
    <>
      <PageHero
        title={s.title}
        home={home}
        crumbs={[
          { label: t.title, href: h("/services/") },
          { label: s.name, href: h(`/services/${s.slug}/`) },
        ]}
        intro={s.summary}
        image={s.hero}
        imageAlt={s.imageAlt}
      >
        <Link href={h("/contact/")} className={buttonClass("primary")}>
          {dict.common.requestQuote} <ArrowRight size={16} className="flip-rtl" />
        </Link>
      </PageHero>

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="prose-body max-w-[68ch] text-base sm:text-[17px]" data-reveal>
          {s.body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[24px] bg-card p-7 ring-1 ring-line" data-reveal>
            <h2 className="font-display-tight text-2xl text-ink">{list.heading}</h2>
            <ul className="mt-5 space-y-3.5">
              {list.items.map((x) => (
                <li key={x} className="flex gap-3 text-[15px] text-ink-soft">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-700" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <AddToQuote item={{ id: `service:${s.slug}`, label: s.name }} addLabel={dict.quoteList.add} addedLabel={dict.quoteList.added} />
              {s.list ? (
                <Link href={h("/products/")} className="inline-flex items-center gap-2 text-[14px] text-brand-700">
                  {t.browseProducts} <ArrowRight size={14} className="flip-rtl" />
                </Link>
              ) : null}
            </div>
          </div>
          <nav aria-label={t.otherServices} className="rounded-[24px] bg-surface p-7" data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
            <h2 className="font-display-tight text-2xl text-ink">{t.otherServices}</h2>
            <ul className="mt-4 divide-y divide-line">
              {others.map((o) => (
                <li key={o.href}>
                  <Link href={o.href} className="group flex items-center justify-between py-3.5 text-[15px] text-ink-soft transition-colors hover:text-brand-700">
                    {o.name}
                    <ArrowRight size={14} className="flip-rtl" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </section>

      {s.slug === "scaffolding-erection" ? (
        <section className="container-x">
          <div className="relative aspect-[21/9] overflow-hidden rounded-[24px]" data-reveal="image">
            <Image src="/images/projects/blower-building.jpg" alt={t.erectionAlt} fill sizes="100vw" className="object-cover" />
          </div>
        </section>
      ) : null}

      <CTASection {...cta()} />
    </>
  );
}
