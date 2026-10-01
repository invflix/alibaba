import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { ButtonLink } from "@/components/ui";
import { hasLocale, localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/content";

export default async function NotFound() {
  const raw = await rootLang().catch(() => "en");
  const lang: Locale = raw && hasLocale(raw) ? raw : "en";
  const t = getDictionary(lang).notFound;
  const h = (p: string) => localeHref(lang, p);

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="container-x flex min-h-[70dvh] animate-hero-in flex-col items-center justify-center py-24 text-center">
        <p className="kicker">{t.eyebrow}</p>
        <h1 className="font-display-tight mt-5 max-w-[18ch] text-5xl text-ink sm:text-7xl">{t.title}</h1>
        <p className="mt-6 max-w-[52ch] text-lg text-muted">{t.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={h("/")}>{t.home}</ButtonLink>
          <ButtonLink href={h("/products/")} variant="secondary">
            {t.products}
          </ButtonLink>
        </div>
        <p className="mt-10 text-[15px] text-muted">
          {t.specific}{" "}
          <Link href={h("/contact/")} className="text-brand-700 underline-offset-4 hover:underline">
            {t.contact}
          </Link>
        </p>
      </div>
    </section>
  );
}
