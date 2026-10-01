import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/quality-policy">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/quality-policy/", { title: dict.qualityPage.title, description: dict.qualityPage.metaDescription });
}

export default async function QualityPolicyPage({ params }: PageProps<"/[lang]/quality-policy">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.qualityPage;

  return (
    <>
      <PageHero
        title={t.title}
        home={home}
        crumbs={[
          { label: dict.nav.about, href: h("/about-us/") },
          { label: t.title, href: h("/quality-policy/") },
        ]}
        intro={t.intro}
        image="/images/heroes/safety-meeting.jpg"
        imageAlt={t.heroAlt}
      />

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div className="prose-body max-w-[68ch] text-base sm:text-[17px]" data-reveal>
          {t.body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[24px] bg-card p-6 ring-1 ring-line min-[400px]:p-7 sm:p-9" data-reveal>
            <h2 className="font-display-tight text-3xl text-ink">{t.principlesTitle}</h2>
            <ol className="mt-6 space-y-5">
              {t.principles.map((p, i) => (
                <li key={p} className="group grid grid-cols-[2.25rem_1fr] gap-3 text-[15px] leading-relaxed text-muted">
                  <span className="grid size-9 place-items-center rounded-full bg-brand-50 text-sm text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1.5">{p}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[24px]" data-reveal="image">
            <Image src="/images/site/safety-meeting.jpg" alt={t.heroAlt} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
        </aside>
      </section>

      <CTASection {...cta()} />
    </>
  );
}
