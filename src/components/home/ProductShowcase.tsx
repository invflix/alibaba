"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

export type ShowcaseCategory = {
  slug: string;
  name: string;
  summary: string;
  cover: string;
  href: string;
  products: { slug: string; name: string; image: string | null; href: string }[];
};

/* Satellite positions around the hero product, as % of the stage. */
const satellites = [
  { top: "8%", start: "6%" },
  { top: "10%", start: "74%" },
  { top: "66%", start: "2%" },
  { top: "70%", start: "76%" },
];

/**
 * Product ranges as a floating stage: pick a category and its real product photography drifts
 * in around a dotted orbit. Each photo links to its product page.
 */
export default function ProductShowcase({
  categories,
  t,
}: {
  categories: ShowcaseCategory[];
  t: { items: string; viewCategory: string; label: string };
}) {
  const [active, setActive] = useState(0);
  const c = categories[active];
  const shots = c.products.filter((p) => p.image && p.image !== c.cover).slice(0, 4);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
      <div role="tablist" aria-label={t.label} className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
        {categories.map((cat, i) => {
          const on = i === active;
          return (
            <button
              key={cat.slug}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-4 rounded-2xl px-4 py-3 text-start transition-colors duration-300 lg:py-4 ${
                on ? "bg-card ring-1 ring-line" : "hover:bg-card/60"
              }`}
            >
              <span aria-hidden className={`absolute inset-y-3 start-0 hidden w-0.5 rounded-full bg-brand-700 transition-transform duration-500 lg:block ${on ? "scale-y-100" : "scale-y-0"}`} />
              <span className="hidden font-display-tight text-sm text-muted tabular-nums lg:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 whitespace-nowrap lg:whitespace-normal">
                <span className={`block text-[15px] font-medium lg:text-[17px] ${on ? "text-brand-700" : "text-ink"}`}>{cat.name}</span>
                <span className="block text-[12px] text-muted">
                  {cat.products.length} {t.items}
                </span>
              </span>
              <ArrowRight size={16} className={`flip-rtl hidden shrink-0 transition-opacity duration-300 lg:block ${on ? "text-brand-700 opacity-100" : "opacity-0"}`} />
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-[radial-gradient(ellipse_at_50%_45%,#fff_0%,var(--color-surface)_75%)] ring-1 ring-line sm:aspect-[16/11]">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,#000_80%)]" />
          {/* Dotted orbit */}
          <div aria-hidden className="spin-slow absolute left-1/2 top-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-700/20" />

          <div key={c.slug} className="absolute inset-0">
            <Link href={c.href} className="absolute left-1/2 top-1/2 block size-[46%] -translate-x-1/2 -translate-y-1/2 animate-pop-in" aria-label={c.name}>
              <span className="bob block size-full">
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 26vw, 50vw"
                  className="object-contain drop-shadow-[0_28px_26px_rgba(25,25,28,0.22)]"
                />
              </span>
            </Link>
            {shots.map((p, i) => (
              <Link
                key={p.slug}
                href={p.href}
                title={p.name}
                className="group absolute hidden size-[20%] animate-pop-in sm:block"
                style={{ top: satellites[i].top, insetInlineStart: satellites[i].start, animationDelay: `${120 + i * 90}ms` }}
              >
                <span className="bob block size-full" style={{ "--float-delay": `${-i * 1.4}s` } as React.CSSProperties}>
                  <span className="relative block size-full overflow-hidden rounded-full bg-white shadow-[var(--shadow-elevated)] ring-1 ring-line transition-transform duration-500 ease-(--ease-spring) group-hover:scale-110">
                    <Image src={p.image!} alt={p.name} fill sizes="12vw" className="object-contain p-2" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div key={`${c.slug}-text`} className="mt-6 flex animate-hero-in flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <h3 className="font-display-tight text-2xl text-ink sm:text-3xl">{c.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.summary}</p>
          </div>
          <Link href={c.href} className="group inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-brand-700">
            {t.viewCategory}
            <span className="grid size-8 place-items-center rounded-full bg-brand-50 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
              <ArrowRight size={14} className="flip-rtl" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
