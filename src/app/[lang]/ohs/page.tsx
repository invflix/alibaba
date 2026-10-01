import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/ohs">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/ohs/", { title: dict.ohsPage.crumb, description: dict.ohsPage.metaDescription });
}

export default async function OhsPage({ params }: PageProps<"/[lang]/ohs">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.ohsPage;

  return (
    <>
      <PageHero
        title={t.title}
        home={home}
        crumbs={[{ label: t.crumb, href: h("/ohs/") }]}
        intro={t.intro}
        image="/images/heroes/site-team.jpg"
        imageAlt={t.heroAlt}
      />

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <h2 className="font-display-tight text-[2rem] text-ink sm:text-[2.75rem] lg:sticky lg:top-28 lg:self-start" data-reveal>
            {t.heading}
          </h2>
          <div className="prose-body max-w-[68ch] text-base sm:text-[17px]" data-reveal>
            {t.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <Link href={h("/safety-policy/")} className="group mt-8 inline-flex items-center gap-2 font-medium text-brand-700 hover:text-brand-800">
              {t.readPolicy}
              <ArrowRight size={16} className="flip-rtl" />
            </Link>
          </div>
        </div>

        <div className="relative mt-16 aspect-[16/10] overflow-hidden rounded-[28px] shadow-[var(--shadow-float)] sm:aspect-[21/9]" data-reveal="image">
          <Image src="/images/site/team.jpg" alt={t.teamAlt} fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      <CTASection {...cta()} />
    </>
  );
}
