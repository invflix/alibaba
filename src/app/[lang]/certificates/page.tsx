import Image from "next/image";
import { DownloadSimple, SealCheck } from "@phosphor-icons/react/dist/ssr";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Gallery from "@/components/Gallery";
import { getCertificates, pageKit, resolveLang } from "@/i18n/content";
import { pageMeta } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/certificates">) {
  const lang = await resolveLang(params);
  const { dict } = pageKit(lang);
  return pageMeta(lang, "/certificates/", { title: dict.certificatesPage.title, description: dict.certificatesPage.metaDescription });
}

export default async function CertificatesPage({ params }: PageProps<"/[lang]/certificates">) {
  const lang = await resolveLang(params);
  const { dict, h, home, cta, gallery } = pageKit(lang);
  const t = dict.certificatesPage;
  const certificates = getCertificates(lang);

  return (
    <>
      <PageHero
        title={t.title}
        home={home}
        crumbs={[
          { label: dict.nav.about, href: h("/about-us/") },
          { label: t.title, href: h("/certificates/") },
        ]}
        intro={t.intro}
      />

      <section className="container-x pb-20 sm:pb-24">
        <ul className="grid gap-5 md:grid-cols-3">
          {certificates.map((c, i) => (
            <li key={c.code} data-reveal style={{ "--reveal-delay": i } as React.CSSProperties}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-card ring-1 ring-line transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                <div className="relative aspect-[5/6] overflow-hidden bg-surface">
                  <Image
                    src={c.image}
                    alt={`${c.code} ${c.name} ${t.certificate}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-contain p-6 drop-shadow-[0_20px_24px_rgba(25,25,28,0.18)] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                  <div className="flex items-start gap-3">
                    <SealCheck size={24} weight="fill" className="mt-1 shrink-0 text-brand-700" />
                    <div>
                      <p className="font-display-tight text-2xl text-ink" dir="ltr">
                        {c.code}
                      </p>
                      <p className="mt-1 text-[14px] text-muted">{c.name}</p>
                    </div>
                  </div>
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex h-10 w-fit items-center gap-2 rounded-full px-4 text-[14px] text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-700 hover:text-white"
                  >
                    <DownloadSimple size={16} /> {dict.common.downloadPdf}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-16">
          <Gallery
            aspect="aspect-[5/7]"
            fit="contain"
            labels={gallery}
            items={certificates.map((c) => ({ src: c.image, alt: `${c.code} ${c.name} ${t.certificate}`, caption: c.code }))}
          />
        </div>
      </section>

      <CTASection {...cta()} />
    </>
  );
}
