"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, X, ArrowsOut } from "@phosphor-icons/react";

export type GalleryItem = { src: string; alt: string; caption?: string };
export type GalleryLabels = { viewLarger: string; close: string; previous: string; next: string; viewer: string };

/**
 * Image grid with a native <dialog> lightbox (keyboard, Esc and backdrop close built in).
 * `layout` controls the thumbnail grid only.
 */
export default function Gallery({
  items,
  layout = "grid",
  aspect = "aspect-[4/3]",
  fit = "cover",
  labels,
}: {
  labels: GalleryLabels;
  items: GalleryItem[];
  layout?: "grid" | "feature";
  aspect?: string;
  fit?: "cover" | "contain";
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const dir = document.documentElement.dir === "rtl" ? -1 : 1;
      if (e.key === "ArrowRight") step(dir);
      if (e.key === "ArrowLeft") step(-dir);
    };
    const onClose = () => setIndex(null);
    el.addEventListener("keydown", onKey);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("close", onClose);
    };
  }, [step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <ul
        className={
          layout === "feature"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:first-child]:col-span-2 lg:[&>li:first-child]:row-span-2"
            : "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
        }
      >
        {items.map((item, i) => (
          <li key={item.src} data-reveal="scale" style={{ "--reveal-delay": i % 3 } as React.CSSProperties}>
            <figure className="flex h-full flex-col">
              <button
                type="button"
                onClick={() => open(i)}
                className={`group relative block w-full overflow-hidden rounded-[20px] bg-surface ring-1 ring-line transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)] ${
                  layout === "feature" && i === 0 ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:flex-1" : aspect
                }`}
                aria-label={`${labels.viewLarger}: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={layout === "feature" && i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className={`${fit === "contain" ? "object-contain p-3" : "object-cover"} transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.06]`}
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {layout === "feature" && i === 0 && item.caption ? (
                  <span className="absolute bottom-4 start-4 max-w-[80%] rounded-2xl bg-card/95 px-5 py-4 text-start shadow-[var(--shadow-elevated)] backdrop-blur">
                    <span className="font-display-tight block text-2xl text-ink sm:text-3xl">{item.caption}</span>
                  </span>
                ) : null}
                <span className="absolute end-3 top-3 grid size-10 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-lg backdrop-blur transition-[opacity,scale] duration-300 ease-(--ease-out-soft) group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                  <ArrowsOut size={16} />
                </span>
              </button>
              {item.caption && !(layout === "feature" && i === 0) ? (
                <figcaption className="mt-3 flex items-center gap-2 text-[15px] text-ink-soft">
                  <span aria-hidden className="h-px w-4 bg-brand-700" />
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/85 backdrop:backdrop-blur-sm open:animate-hero-in"
        aria-label={labels.viewer}
      >
        {current ? (
          <div className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="relative h-full max-h-[80dvh] w-full max-w-6xl">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" quality={85} className="object-contain" />
            </div>
            <p className="text-center text-sm text-white/80">{current.caption ?? current.alt}</p>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              autoFocus
              className="absolute end-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={labels.previous}
                  className="absolute start-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:start-6"
                >
                  <CaretLeft size={20} className="flip-rtl" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={labels.next}
                  className="absolute end-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:end-6"
                >
                  <CaretRight size={20} className="flip-rtl" />
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
