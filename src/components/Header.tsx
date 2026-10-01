"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CaretDown, List, X, Phone, ArrowRight, Translate, Calculator } from "@phosphor-icons/react";
import { localeHref, splitLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { NavItem } from "@/lib/nav";
import { site } from "@/lib/site";
import { QuoteButton, QuoteDrawer } from "./QuoteList";
import { buttonClass } from "./ui";

const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

function isActive(pathname: string, href: string, home: string) {
  if (href === home) return norm(pathname) === home;
  return norm(pathname).startsWith(href);
}

const drawerItem = (open: boolean) =>
  `transition-[opacity,translate] duration-500 ease-(--ease-out-soft) ${open ? "translate-x-0 opacity-100" : "translate-x-6 rtl:-translate-x-6 opacity-0"}`;
const stagger = (open: boolean, i: number) => ({ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" });

export default function Header({
  lang,
  nav,
  common,
  quote,
  siteName,
}: {
  lang: Locale;
  nav: NavItem[];
  common: Dictionary["common"];
  quote: Dictionary["quoteList"];
  siteName: string;
}) {
  const pathname = usePathname() || "/";
  const home = localeHref(lang, "/");
  const otherLang: Locale = lang === "en" ? "ar" : "en";
  const switchHref = localeHref(otherLang, splitLocale(norm(pathname)).path);
  const contactHref = localeHref(lang, "/contact/");

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Close the drawer on navigation. Adjusting state during render avoids an extra effect pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const trigger = menuBtn.current;
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
      >
        {common.skipToContent}
      </a>
      <header
        data-scrolled={scrolled}
        className="header-shell sticky top-0 z-40 animate-fade-in transition-[background-color,box-shadow] duration-500"
      >
        <span aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-brand-700/70" />
        <div
          className={`container-x flex items-center justify-between gap-4 transition-[height] duration-500 ease-(--ease-out-soft) ${
            scrolled ? "h-16" : "h-[76px]"
          }`}
        >
          <Link href={home} className="shrink-0" aria-label={`${siteName} ${common.homeLabel}`}>
            <Image src="/images/site/logo.png" alt={siteName} width={640} height={77} priority className="h-auto w-[178px] sm:w-[210px] xl:w-[232px]" />
          </Link>

          <nav aria-label={common.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => {
                const active = isActive(pathname, item.href, home);
                return (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={norm(pathname) === item.href ? "page" : undefined}
                      className={`relative flex h-10 items-center gap-1 rounded-full px-3.5 text-[14px] transition-colors duration-300 ${
                        active ? "text-brand-700" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {item.label}
                      {item.children ? (
                        <CaretDown size={11} weight="bold" className="opacity-50 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180" />
                      ) : null}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3.5 bottom-1 h-px origin-center bg-brand-700 transition-transform duration-500 ease-(--ease-out-soft) ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                    {item.children ? (
                      <div className="invisible absolute start-0 top-full translate-y-2 pt-2 opacity-0 transition-[opacity,translate,visibility] duration-300 ease-(--ease-out-soft) group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <ul className="min-w-60 rounded-2xl border border-line bg-card/95 p-1.5 shadow-[0_24px_60px_-24px_rgba(25,25,28,0.35)] backdrop-blur-xl">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                className={`flex items-center rounded-xl px-4 py-2.5 text-[14px] transition-colors duration-200 ${
                                  norm(pathname) === c.href ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-paper hover:text-ink"
                                }`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={switchHref}
              hrefLang={otherLang}
              lang={otherLang}
              aria-label={common.switchLanguageLabel}
              className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-[14px] text-ink-soft transition-colors hover:bg-surface hover:text-ink sm:inline-flex"
            >
              <Translate size={16} className="opacity-60" />
              {common.switchLanguage}
            </Link>
            <QuoteButton label={quote.open} />
            <span className="hidden sm:block">
              <Link href={contactHref} className={buttonClass("primary", "h-10 px-5 text-[14px]")}>
                {common.requestQuote}
                <Calculator size={16} />
              </Link>
            </span>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={common.openMenu}
              className="grid size-10 place-items-center rounded-full ring-1 ring-line transition-[background-color,scale] hover:bg-surface active:scale-95 xl:hidden"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>

      <QuoteDrawer
        contactHref={contactHref}
        t={{ title: quote.title, empty: quote.empty, remove: quote.remove, submit: quote.submit, clear: quote.clear, close: common.close }}
      />

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 overflow-hidden xl:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={common.menu}
          inert={!open}
          className={`absolute inset-y-0 end-0 flex w-full max-w-[400px] flex-col bg-card transition-[translate,box-shadow] duration-500 ease-(--ease-out-soft) ${
            open ? "translate-x-0 shadow-2xl" : "translate-x-full rtl:-translate-x-full"
          }`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <Link
              href={switchHref}
              hrefLang={otherLang}
              lang={otherLang}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[15px] text-ink ring-1 ring-line hover:bg-surface"
            >
              <Translate size={16} />
              {common.switchLanguage}
            </Link>
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={common.closeMenu}
              className="grid size-10 place-items-center rounded-full ring-1 ring-line hover:bg-surface"
            >
              <X size={18} />
            </button>
          </div>
          <nav aria-label={common.mobileNav} className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            <ul className="space-y-1">
              {nav.map((item, i) =>
                item.children ? (
                  <li key={item.href} style={stagger(open, i)} className={drawerItem(open)}>
                    <details className="group" open={isActive(pathname, item.href, home) || undefined}>
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl px-3 font-display-tight text-2xl text-ink hover:bg-paper [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <CaretDown size={16} className="text-muted transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <ul className="mb-2 ms-3 border-s border-line ps-3">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className={`flex min-h-11 items-center rounded-xl px-3 text-[15px] ${
                                norm(pathname) === c.href ? "text-brand-700" : "text-muted hover:text-ink"
                              }`}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.href} style={stagger(open, i)} className={drawerItem(open)}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center rounded-xl px-3 font-display-tight text-2xl hover:bg-paper ${
                        norm(pathname) === item.href ? "text-brand-700" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className={`space-y-3 border-t border-line p-5 ${drawerItem(open)}`} style={stagger(open, nav.length)}>
            <Link href={contactHref} onClick={() => setOpen(false)} className={buttonClass("primary", "w-full")}>
              {common.requestQuote} <ArrowRight size={16} className="flip-rtl" />
            </Link>
            <a href={site.phoneHref} className={buttonClass("secondary", "w-full")}>
              <Phone size={16} /> <span dir="ltr">{site.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
