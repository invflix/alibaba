"use client";

import { useDeferredValue, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import type { Product } from "@/data/products";
import { fmt } from "@/i18n/format";
import { ProductGrid, type ProductCardLabels } from "./ProductCard";

export type BrowserLabels = {
  showing: string;
  search: string;
  clearSearch: string;
  noMatch: string;
  noMatchText: string;
};

export default function ProductBrowser({
  products,
  label,
  base,
  t,
  card,
}: {
  products: Product[];
  label: string;
  base: string;
  t: BrowserLabels;
  card: ProductCardLabels;
}) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const q = deferred.trim().toLowerCase();
  const visible = q ? products.filter((p) => p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)) : products;

  return (
    <div>
      <h2 className="sr-only">{label}</h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {fmt(t.showing, { count: visible.length, total: products.length, label })}
        </p>
        <label className="relative block w-full sm:w-80">
          <span className="sr-only">{t.search}</span>
          <MagnifyingGlass size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            className="h-12 w-full rounded-full border border-line bg-card pe-11 ps-11 text-[15px] text-ink placeholder:text-muted/80 transition-colors focus:border-brand-600 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-brand-100 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t.clearSearch}
              className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface hover:text-ink"
            >
              <X size={16} />
            </button>
          ) : null}
        </label>
      </div>

      {visible.length ? (
        <div className="mt-8">
          <ProductGrid products={visible} eagerCount={4} base={base} t={card} />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-[24px] border border-dashed border-line bg-card px-6 py-16 text-center">
          <MagnifyingGlass size={36} weight="thin" className="text-muted" />
          <p className="mt-4 text-lg text-ink">{fmt(t.noMatch, { query })}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{t.noMatchText}</p>
          <button type="button" onClick={() => setQuery("")} className="mt-6 h-11 rounded-full px-5 text-sm text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50">
            {t.clearSearch}
          </button>
        </div>
      )}
    </div>
  );
}
