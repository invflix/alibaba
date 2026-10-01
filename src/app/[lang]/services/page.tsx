import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Wrench, ArrowsClockwise, PaintRoller, Thermometer, Buildings, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { ButtonLink, SectionHeading, buttonClass } from "@/components/ui";
import { getIndustrialScope, getServiceL, getServicesIntro, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/services/", { title: dict.servicesPage.title, description: dict.servicesPage.metaDescription });
}

const scopeIcons = [Wrench, ArrowsClockwise, PaintRoller, Thermometer, Buildings];

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group mt-7 inline-flex items-center gap-2 text-[15px] font-medium text-brand-700 hover:text-brand-800">
      {children}
      <ArrowRight size={16} className="flip-rtl" />
    </Link>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.servicesPage;
  const intro = getServicesIntro(lang);
  const scope = getIndustrialScope(lang);
  const rentals = getServiceL(lang, "scaffolding-rentals")!;
  const erection = getServiceL(lang, "scaffolding-erection")!;
  const sales = getServiceL(lang, "scaffolding-sales")!;

  return (
    <>
      <PageHero
        title={t.title}
        home={home}
        crumbs={[{ label: t.title, href: h("/services/") }]}
        intro={t.intro}
        image="/images/heroes/scaffold-structure.jpg"
        imageAlt={t.heroAlt}
      />

      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="prose-body max-w-[68ch] text-base sm:text-[17px]" data-reveal>
            <p>{intro[0]}</p>
            <p>{intro[1]}</p>
          </div>
          <div data-reveal>
            <h2 className="font-display-tight text-2xl text-ink">{t.scopeTitle}</h2>
            <ul className="mt-6 grid gap-3 min-[480px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {scope.map((x, i) => {
                const Icon = scopeIcons[i];
                return (
                  <li key={x} className="group flex items-center gap-3 rounded-2xl bg-card p-3 text-[14px] leading-snug text-ink-soft ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                      <Icon size={20} weight="light" />
                    </span>
                    {x}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="scaffolding-rentals" className="border-t border-line bg-surface py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-line shadow-[var(--shadow-float)]" data-reveal="image">
            <Image src={rentals.image} alt={rentals.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading kicker={t.rentalsLabel} lead={rentals.title} intro={rentals.summary} />
            <MoreLink href={h(`/services/${rentals.slug}/`)}>{t.rentalsMore}</MoreLink>
          </div>
        </div>
      </section>

      <section id="scaffolding-erection" className="container-x py-16 sm:py-24">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-line sm:aspect-[21/9]" data-reveal="image">
          <Image src="/images/projects/blower-building.jpg" alt={t.erectionAlt} fill sizes="100vw" className="object-cover" />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <h2 className="font-display-tight text-4xl text-ink sm:text-5xl" data-reveal>
            {erection.title}
          </h2>
          <div data-reveal>
            <p className="text-base leading-relaxed text-muted sm:text-[17px]">{erection.summary}</p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-[17px]">{erection.body[1]}</p>
            <MoreLink href={h(`/services/${erection.slug}/`)}>{t.erectionMore}</MoreLink>
          </div>
        </div>
      </section>

      <section id="scaffolding-sales" className="border-y border-line bg-card py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading lead={sales.title} intro={sales.summary} />
            <MoreLink href={h(`/services/${sales.slug}/`)}>{t.salesMore}</MoreLink>
          </div>
          <div data-reveal>
            <h3 className="kicker">{sales.list?.heading}</h3>
            <ul className="mt-4 grid gap-3">
              {sales.list?.items.map((x) => (
                <li key={x} className="group flex items-center gap-4 rounded-2xl bg-paper px-5 py-4 text-[17px] text-ink ring-1 ring-line transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-brand-700 ring-1 ring-line transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                    <Check size={14} weight="bold" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <ButtonLink href={h("/products/")} variant="secondary" className="mt-6">
              {t.browseProducts}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-night py-16 sm:py-24">
        <div aria-hidden className="bg-dots-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_left,#000,transparent_70%)]" />
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading tone="light" lead={t.equipmentTitle} intro={t.equipmentIntro} />
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row" data-reveal>
              <Link href={h("/heavy-equipment-rental/")} className={buttonClass("primary")}>
                {t.viewFleet} <ArrowRight size={16} className="flip-rtl" />
              </Link>
              <a href={site.docs.equipmentBrochure} target="_blank" rel="noopener" className={buttonClass("outline-light")}>
                <DownloadSimple size={16} /> {dict.common.downloadProfile}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-white/5 shadow-[var(--shadow-float)] ring-1 ring-white/10" data-reveal="image">
            <Image src="/images/equipment/crane.jpg" alt={t.craneAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container-x pt-16 sm:pt-24">
        <p className="mx-auto max-w-[72ch] text-center text-base leading-relaxed text-muted sm:text-[17px]" data-reveal>
          {intro[2]}
        </p>
      </section>

      <CTASection {...cta()} />
    </>
  );
}
