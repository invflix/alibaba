"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";

/**
 * One shared IntersectionObserver reveals every [data-reveal] element on the page.
 * A MutationObserver picks up elements added later (route changes, filtered product grids).
 */
export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (reduce) el.classList.add("is-in");
        else io.observe(el);
      });
    };
    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches("[data-reveal]:not(.is-in)")) {
            if (reduce) n.classList.add("is-in");
            else io.observe(n);
          }
          scan(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("fold-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 end-5 z-30 grid size-12 place-items-center rounded-full bg-ink text-white shadow-lg transition-[opacity,transform,translate,scale] duration-500 ease-(--ease-out-soft) hover:bg-brand-700 active:scale-95 sm:bottom-8 sm:end-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
