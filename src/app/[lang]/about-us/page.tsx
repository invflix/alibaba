import Image from "next/image";
import { DownloadSimple, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Gallery from "@/components/Gallery";
import { SectionHeading, buttonClass } from "@/components/ui";
import { getProjects, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/about-us">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/about-us/", { title: dict.about.title, description: dict.about.metaDescription });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about-us">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta, gallery } = pageKit(lang);
  const a = dict.about;

  return (
    <>
      <PageHero
        title={a.title}
        home={home}
        crumbs={[{ label: a.title, href: h("/about-us/") }]}
        intro={a.intro}
        image="/images/heroes/about.jpg"
        imageAlt={a.heroAlt}
        imagePosition="center 40%"
      >
        <a href={site.docs.profile} target="_blank" rel="noopener" className={buttonClass("primary")}>
          <DownloadSimple size={18} /> {dict.common.downloadProfile}
        </a>
      </PageHero>

      <section className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <SectionHeading lead={a.welcome} />
          <div className="prose-body mt-8 max-w-[68ch] text-base sm:text-[17px]" data-reveal>
            {a.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] shadow-[var(--shadow-float)] lg:sticky lg:top-28 lg:mt-20 lg:self-start" data-reveal="image">
          <Image src="/images/site/scaffold-tower.jpg" alt={a.towerAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-night py-20 text-white sm:py-28">
        <div aria-hidden className="bg-dots-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
        <div className="container-x grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div data-reveal className="rounded-[24px] bg-white/[0.05] p-7 ring-1 ring-white/10 sm:p-10">
            <p className="kicker !text-brand-300">01</p>
            <h2 className="font-display-tight mt-4 text-4xl sm:text-5xl">{a.vision}</h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/70">{a.visionText}</p>
          </div>
          <div data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties} className="rounded-[24px] bg-white/[0.05] p-7 ring-1 ring-white/10 sm:p-10">
            <p className="kicker !text-brand-300">02</p>
            <h2 className="font-display-tight mt-4 text-4xl sm:text-5xl">{a.mission}</h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/70">{a.missionText}</p>
            <ul className="mt-8 space-y-4">
              {a.missionPoints.map((m) => (
                <li key={m} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-brand-300" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <SectionHeading align="center" lead={a.projects} />
        <div className="mt-12">
          <Gallery layout="feature" labels={gallery} items={getProjects(lang).map((p) => ({ src: p.image, alt: p.name, caption: p.name }))} />
        </div>
      </section>

      <CTASection {...cta()} />
    </>
  );
}
