"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Stack, Wrench, ShoppingBag, Truck } from "@phosphor-icons/react";
import { AddToQuote } from "@/components/QuoteList";

export type ExplorerKind = "services" | "products" | "equipment";
export type ExplorerItem = {
  id: string;
  kind: ExplorerKind;
  title: string;
  text: string;
  href: string;
  image?: string;
  bullets?: string[];
  icon?: number;
};

const serviceIcons = [Stack, Wrench, ShoppingBag, Truck];

/**
 * Filterable grid of everything Al-Batin rents, erects, sells and hires (the reference's
 * "Everything for work at height" grid). Every card links to its real page and can be added
 * to the visitor's quote list.
 */
export default function ServicesExplorer({
  items,
  t,
}: {
  items: ExplorerItem[];
  t: {
    filters: Record<"all" | ExplorerKind, string>;
    tags: Record<"service" | "product" | "equipment", string>;
    filterLabel: string;
    add: string;
    added: string;
    details: string;
  };
}) {
  const [filter, setFilter] = useState<"all" | ExplorerKind>("all");
  const visible = filter === "all" ? items : items.filter((i) => i.kind === filter);
  const tabs: ("all" | ExplorerKind)[] = ["all", "services", "products", "equipment"];
  const tagOf = (k: ExplorerKind) => (k === "services" ? t.tags.service : k === "products" ? t.tags.product : t.tags.equipment);

  return (
    <div>
      <div role="tablist" aria-label={t.filterLabel} className="-mx-4 flex justify-start overflow-x-auto px-4 [scrollbar-width:none] sm:justify-center">
        <div className="flex gap-1 rounded-full bg-card p-1 ring-1 ring-line">
          {tabs.map((k) => {
            const count = k === "all" ? items.length : items.filter((i) => i.kind === k).length;
            const active = filter === k;
            return (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setFilter(k)}
                className={`inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[13px] transition-colors duration-300 ${
                  active ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {t.filters[k]}
                <span className={`text-[11px] ${active ? "text-white/60" : "text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul key={filter} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((item, i) => {
          const Icon = serviceIcons[(item.icon ?? 0) % serviceIcons.length];
          return (
            <li key={item.id} className="animate-hero-in" style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}>
              <article className="group flex h-full flex-col rounded-[20px] bg-card p-5 ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-(--ease-out-soft) hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
                <div className="flex items-start justify-between gap-3">
                  {item.image ? (
                    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-line">
                      <Image
                        src={item.image}
                        alt=""
                        width={96}
                        height={96}
                        className={`size-full transition-transform duration-500 group-hover:scale-110 ${item.kind === "equipment" ? "object-cover" : "object-contain p-1"}`}
                      />
                    </span>
                  ) : (
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-700 group-hover:text-white">
                      <Icon size={22} weight="light" />
                    </span>
                  )}
                  <span className="kicker !text-[10px]">{tagOf(item.kind)}</span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold leading-snug text-ink">
                  <Link href={item.href} className="transition-colors hover:text-brand-700">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">{item.text}</p>
                {item.bullets?.length ? (
                  <ul className="mt-4 space-y-1.5">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-ink-soft">
                        <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-brand-700" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <Link href={item.href} className="group/d inline-flex items-center gap-1 text-[13px] text-ink-soft hover:text-brand-700">
                    {t.details}
                    <ArrowRight size={13} className="flip-rtl transition-transform group-hover/d:translate-x-0.5" />
                  </Link>
                  <AddToQuote item={{ id: item.id, label: item.title }} addLabel={t.add} addedLabel={t.added} />
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
