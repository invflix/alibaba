import { ShieldCheck, Student, ClipboardText } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/safety-policy">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/safety-policy/", { title: dict.safetyPage.title, description: dict.safetyPage.metaDescription });
}

const icons = [Student, ClipboardText, ShieldCheck];

export default async function SafetyPolicyPage({ params }: PageProps<"/[lang]/safety-policy">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta } = pageKit(lang);
  const t = dict.safetyPage;

  return (
    <>
      <PageHero
        title={t.title}
        home={home}
        crumbs={[
          { label: dict.nav.ohs, href: h("/ohs/") },
          { label: t.title, href: h("/safety-policy/") },
        ]}
        intro={t.intro}
        image="/images/heroes/scaffold-building.jpg"
        imageAlt={t.heroAlt}
        imagePosition="center 40%"
      />

      <section className="container-x py-20 sm:py-28">
        <p className="font-display-tight mx-auto max-w-4xl text-center text-3xl text-ink sm:text-4xl lg:text-5xl" data-reveal>
          {t.statement}
        </p>
        <ul className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3">
          {t.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} data-reveal style={{ "--reveal-delay": i } as React.CSSProperties}>
                <div className="group h-full rounded-[24px] bg-card p-7 ring-1 ring-line transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] sm:p-8">
                  <span className="grid size-14 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                    <Icon size={26} weight="light" />
                  </span>
                  <h2 className="font-display-tight mt-6 text-2xl text-ink">{p.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <CTASection {...cta()} />
    </>
  );
}
