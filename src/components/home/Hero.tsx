import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Drop, Factory, Train, AirplaneTilt, Buildings, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Category } from "@/data/products";
import PointerParallax from "@/components/PointerParallax";
import HeroPrompt from "./HeroPrompt";
import ClientMarquee from "./ClientMarquee";

const industryIcons = [Factory, Drop, Train, AirplaneTilt, Buildings];

/* Hand-placed like the reference: loose vertical rhythm, never a rigid column. Logical
   (start/end) offsets mirror automatically in Arabic. */
const industrySpots = [
  { top: "14%", inset: "12%", depth: 10 },
  { top: "33%", inset: "5%", depth: 16 },
  { top: "52%", inset: "13%", depth: 8 },
  { top: "70%", inset: "4%", depth: 14 },
  { top: "86%", inset: "11%", depth: 10 },
];
const productSpots = [
  { top: "9%", inset: "8%", ring: "ring-brand-700", depth: 18 },
  { top: "25%", inset: "15%", ring: "ring-ink", depth: 10 },
  { top: "41%", inset: "5%", ring: "ring-copper", depth: 22 },
  { top: "57%", inset: "13%", ring: "ring-slate", depth: 12 },
  { top: "72%", inset: "6%", ring: "ring-brand-800", depth: 18 },
  { top: "87%", inset: "14%", ring: "ring-ink-soft", depth: 9 },
];

const shift = (depth: number) => ({
  transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px), 0)`,
});

/** A short dotted "comet trail" under each floating badge, as in the reference. */
function Trail() {
  return (
    <svg aria-hidden width="46" height="14" viewBox="0 0 46 14" className="mx-auto mt-1 text-brand-700/35">
      <path d="M2 2 C 14 12, 32 12, 44 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="0.1 4.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero({
  lang,
  t,
  chips,
  categories,
  counts,
  itemsWord,
}: {
  lang: Locale;
  t: Dictionary["home"]["hero"];
  chips: string[];
  categories: Category[];
  counts: Record<string, number>;
  itemsWord: string;
}) {
  const leadWords = t.titleLead.split(" ");

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,#fff_0%,transparent_70%)]" />
      <div aria-hidden className="bg-dots absolute inset-x-0 bottom-0 -z-10 h-48 opacity-50 [mask-image:linear-gradient(to_top,#000,transparent)]" />

      <PointerParallax className="relative">
        {/* Floating industries (start side) — the safety-critical environments named on the About page. */}
        <ul aria-label={t.industriesLabel} className="pointer-events-none absolute inset-0 hidden lg:block">
          {t.industries.map((name, i) => {
            const Icon = industryIcons[i % industryIcons.length];
            const s = industrySpots[i % industrySpots.length];
            return (
              <li key={name} className="absolute transition-transform duration-700 ease-(--ease-out-soft)" style={{ top: s.top, insetInlineStart: s.inset, ...shift(s.depth) }}>
                <div className="animate-pop-in" style={{ animationDelay: `${1150 + i * 110}ms` }}>
                  <div className="float-y flex flex-col items-center text-center" style={{ "--float-dur": `${6 + i}s`, "--float-delay": `${-i * 1.3}s` } as React.CSSProperties}>
                    <Icon size={20} weight="light" className="text-brand-700" />
                    <span className="mt-1.5 max-w-[110px] text-[11px] leading-tight text-ink-soft">{name}</span>
                    <Trail />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Floating product ranges (end side) — real product photos in brand-coloured rings. */}
        <ul aria-label={t.productsLabel} className="absolute inset-0 hidden lg:block">
          {categories.map((c, i) => {
            const s = productSpots[i % productSpots.length];
            return (
              <li key={c.slug} className="absolute transition-transform duration-700 ease-(--ease-out-soft)" style={{ top: s.top, insetInlineEnd: s.inset, ...shift(s.depth) }}>
                <div className="animate-pop-in" style={{ animationDelay: `${1250 + i * 110}ms` }}>
                  <div className="float-y" style={{ "--float-dur": `${7 + (i % 3)}s`, "--float-delay": `${-i * 0.9}s`, "--float-amp": "-14px" } as React.CSSProperties}>
                    <Link href={localeHref(lang, `/products/${c.slug}/`)} className="group flex flex-col items-center text-center">
                      <span className="mb-1.5 max-w-[120px] text-[11px] leading-tight text-ink-soft transition-colors group-hover:text-brand-700">{c.name}</span>
                      <span
                        className={`relative grid size-14 place-items-center overflow-hidden rounded-full bg-white shadow-[0_14px_28px_-14px_rgba(25,25,28,0.45)] ring-[3px] ${s.ring} transition-[scale,box-shadow] duration-500 ease-(--ease-spring) group-hover:scale-[1.35] group-hover:shadow-[0_24px_40px_-18px_rgba(25,25,28,0.5)] xl:size-16`}
                      >
                        <Image src={c.cover} alt="" width={96} height={96} className="size-full object-contain p-1.5" />
                      </span>
                      <span className="mt-2 rounded-full bg-card px-2 py-0.5 text-[10px] text-muted opacity-0 ring-1 ring-line transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        {counts[c.slug]} {itemsWord}
                      </span>
                      <Trail />
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="container-x relative flex flex-col items-center pb-10 pt-12 text-center sm:pt-16 lg:min-h-[760px] lg:pb-14 lg:pt-20">
          <p className="inline-flex animate-hero-in items-center gap-2 rounded-full bg-card px-3 py-1.5 text-[12px] text-ink-soft ring-1 ring-line [animation-delay:100ms]">
            <CheckCircle size={16} weight="fill" className="text-brand-700" />
            {t.eyebrow}
            <span aria-hidden className="text-muted/60">·</span>
            {t.location}
          </p>

          <h1
            className={`font-display-tight mt-7 text-ink ${
              lang === "ar"
                ? "max-w-[30ch] text-[2.1rem] min-[400px]:text-[2.4rem] sm:text-5xl lg:text-[3.5rem]"
                : "max-w-[24ch] text-[2.5rem] min-[400px]:text-[2.8rem] sm:text-6xl lg:text-[4.4rem]"
            }`}
          >
            <span className="word-rise">
              {leadWords.map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                  <span style={{ "--d": `${180 + i * 70}ms` } as React.CSSProperties}>{w}</span>{" "}
                </Fragment>
              ))}
            </span>
            <span
              className="pill-in pill-static relative mt-3 inline-block rounded-[18px] bg-brand-700 px-5 pb-2 pt-1 text-white shadow-[var(--shadow-brand)] sm:whitespace-nowrap sm:px-7 rtl:pb-3 rtl:pt-2"
              style={{ "--d": `${260 + leadWords.length * 70}ms` } as React.CSSProperties}
            >
              <span className="accent !text-white">{t.titleAccent}</span>
              {/* Speech-bubble notch, as on the reference pill. */}
              <span aria-hidden className="absolute -bottom-1.5 start-7 size-4 rotate-45 rounded-[3px] bg-brand-700" />
            </span>
          </h1>

          <p className="mt-8 max-w-[56ch] animate-hero-in text-[15px] leading-relaxed text-muted [animation-delay:950ms] sm:text-base">{t.text}</p>

          <div className="mt-9 w-full animate-hero-in [animation-delay:1080ms]">
            <HeroPrompt
              label={t.promptLabel}
              placeholder={t.promptPlaceholder}
              submitLabel={t.promptSubmit}
              chips={chips}
              contactHref={localeHref(lang, "/contact/")}
            />
          </div>

          {/* Below lg the orbit becomes a tidy, tappable row of product circles. */}
          <ul aria-label={t.productsLabel} className="mt-10 grid w-full max-w-md grid-cols-3 gap-x-2 gap-y-5 min-[480px]:grid-cols-6 min-[480px]:max-w-2xl lg:hidden">
            {categories.map((c, i) => (
              <li key={c.slug} className="animate-pop-in" style={{ animationDelay: `${1150 + i * 80}ms` }}>
                <Link href={localeHref(lang, `/products/${c.slug}/`)} className="flex flex-col items-center gap-2 text-center">
                  <span className={`grid size-14 place-items-center overflow-hidden rounded-full bg-white ring-[3px] ${productSpots[i].ring}`}>
                    <Image src={c.cover} alt="" width={96} height={96} className="size-full object-contain p-1.5" />
                  </span>
                  <span className="text-[11px] leading-tight text-ink-soft">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PointerParallax>

      <div className="container-x animate-fade-in pb-12 [animation-delay:1400ms] sm:pb-16">
        <ClientMarquee title={t.clients} />
      </div>
    </section>
  );
}
