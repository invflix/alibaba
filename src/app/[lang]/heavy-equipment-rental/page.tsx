import Image from "next/image";
import Link from "next/link";
import { DownloadSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Gallery from "@/components/Gallery";
import { AddToQuote } from "@/components/QuoteList";
import { SectionHeading, buttonClass } from "@/components/ui";
import { getEquipment, getFleetGallery, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/heavy-equipment-rental">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/heavy-equipment-rental/", { title: dict.equipmentPage.title, description: dict.equipmentPage.metaDescription });
}

export default async function HeavyEquipmentPage({ params }: PageProps<"/[lang]/heavy-equipment-rental">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta, gallery } = pageKit(lang);
  const t = dict.equipmentPage;

  return (
    <>
      <PageHero
        title={t.title}
        home={home}
        crumbs={[
          { label: dict.servicesPage.title, href: h("/services/") },
          { label: t.title, href: h("/heavy-equipment-rental/") },
        ]}
        intro={t.intro}
        image="/images/heroes/wheel-loader.jpg"
        imageAlt={t.heroAlt}
        imagePosition="70% 60%"
      >
        <Link href={h("/contact/")} className={buttonClass("primary")}>
          {dict.common.requestQuote} <ArrowRight size={16} className="flip-rtl" />
        </Link>
        <a href={site.docs.equipmentBrochure} target="_blank" rel="noopener" className={buttonClass("secondary")}>
          <DownloadSimple size={18} /> {dict.common.downloadProfile}
        </a>
      </PageHero>

      <section className="container-x py-20 sm:py-24">
        <div className="prose-body mx-auto max-w-[72ch] text-center text-base sm:text-lg" data-reveal>
          {t.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <SectionHeading align="center" lead={t.fleet} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {getEquipment(lang).map((e, i) => (
            <li key={e.image} data-reveal style={{ "--reveal-delay": i % 3 } as React.CSSProperties}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-card ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={e.image}
                    alt={e.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display-tight text-2xl text-ink">{e.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{e.description}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                    <Link
                      href={`${h("/contact/")}?subject=${encodeURIComponent(`${dict.form.rentalEnquiry} ${e.name}`)}`}
                      className="inline-flex items-center gap-1.5 text-[14px] text-brand-700 hover:text-brand-800"
                    >
                      {t.enquireHire}
                      <ArrowRight size={14} className="flip-rtl" />
                    </Link>
                    <AddToQuote item={{ id: `equipment:${e.image}`, label: e.name }} addLabel={dict.quoteList.add} addedLabel={dict.quoteList.added} />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" lead={t.more} />
          <div className="mt-12">
            <Gallery labels={gallery} items={getFleetGallery(lang)} />
          </div>
        </div>
      </section>

      <CTASection {...cta(t.ctaTitle, t.ctaText)} />
    </>
  );
}
