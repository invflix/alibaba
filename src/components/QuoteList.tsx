"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ClipboardText, Plus, Trash, X } from "@phosphor-icons/react";
import { buttonClass } from "./ui";

export type QuoteItem = { id: string; label: string };

type QuoteState = {
  items: QuoteItem[];
  has: (id: string) => boolean;
  toggle: (item: QuoteItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Label in the current page language (items may have been added on the other locale). */
  labelOf: (item: QuoteItem) => string;
};

const QuoteContext = createContext<QuoteState | null>(null);
const STORAGE_KEY = "albatin-quote-list";

/**
 * Visitor's quote list (services, product ranges, machines). Kept in this browser only — it is a
 * convenience that pre-fills the enquiry form, never the record of a request. The enquiry itself
 * goes through the existing server action.
 */
export function QuoteProvider({ children, labels }: { children: ReactNode; labels: Record<string, string> }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [open, setOpen] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from storage
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* storage unavailable: list simply starts empty */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);
  const toggle = useCallback(
    (item: QuoteItem) => setItems((list) => (list.some((i) => i.id === item.id) ? list.filter((i) => i.id !== item.id) : [...list, item])),
    [],
  );
  const remove = useCallback((id: string) => setItems((list) => list.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const labelOf = useCallback((item: QuoteItem) => labels[item.id] ?? item.label, [labels]);
  const value = useMemo(
    () => ({ items, has, toggle, remove, clear, open, setOpen, labelOf }),
    [items, has, toggle, remove, clear, open, labelOf],
  );
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used inside <QuoteProvider>");
  return ctx;
}

export function AddToQuote({
  item,
  addLabel,
  addedLabel,
  className = "",
}: {
  item: QuoteItem;
  addLabel: string;
  addedLabel: string;
  className?: string;
}) {
  const { has, toggle } = useQuote();
  const added = has(item.id);
  return (
    <button
      type="button"
      onClick={() => toggle(item)}
      aria-pressed={added}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-[background-color,color,box-shadow,scale] duration-300 active:scale-95 ${
        added ? "bg-brand-700 text-white" : "text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50"
      } ${className}`}
    >
      {added ? <Check size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
      {added ? addedLabel : addLabel}
    </button>
  );
}

export function QuoteButton({ label }: { label: string }) {
  const { items, setOpen } = useQuote();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={label}
      className="relative grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-surface hover:text-ink"
    >
      <ClipboardText size={20} />
      {items.length ? (
        <span className="absolute -end-0.5 -top-0.5 grid h-[18px] min-w-[18px] animate-pop-in place-items-center rounded-full bg-brand-700 px-1 text-[10px] font-semibold text-white">
          {items.length}
        </span>
      ) : null}
    </button>
  );
}

export function QuoteDrawer({
  t,
  contactHref,
}: {
  t: { title: string; empty: string; remove: string; submit: string; clear: string; close: string };
  contactHref: string;
}) {
  const { items, remove, clear, open, setOpen, labelOf } = useQuote();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        inert={!open}
        className={`absolute inset-y-0 end-0 flex w-full max-w-[400px] flex-col bg-card transition-[translate,box-shadow] duration-500 ease-(--ease-out-soft) ${
          open ? "translate-x-0 shadow-2xl" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
          <h2 className="font-display-tight text-2xl">{t.title}</h2>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="grid size-10 place-items-center rounded-full ring-1 ring-line hover:bg-surface"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-5">
          {items.length ? (
            <ul className="space-y-2">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-3 rounded-2xl bg-paper px-4 py-3 text-[15px] text-ink ring-1 ring-line">
                  {labelOf(i)}
                  <button
                    type="button"
                    onClick={() => remove(i.id)}
                    aria-label={`${t.remove}: ${labelOf(i)}`}
                    className="grid size-8 shrink-0 place-items-center rounded-full text-muted hover:bg-surface hover:text-brand-700"
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] leading-relaxed text-muted">{t.empty}</p>
          )}
        </div>
        <div className="space-y-2 border-t border-line p-5">
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            aria-disabled={!items.length}
            className={buttonClass("primary", `w-full ${items.length ? "" : "pointer-events-none opacity-50"}`)}
          >
            {t.submit}
          </Link>
          {items.length ? (
            <button type="button" onClick={clear} className="h-10 w-full rounded-full text-sm text-muted hover:text-ink">
              {t.clear}
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
