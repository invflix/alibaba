"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Writes the pointer position over its parent section as `--px`/`--py` (-1 to 1) on this wrapper,
 * so descendants can drift in depth with e.g. `translate: calc(var(--px) * 24px) ...`. Uses the
 * independent `translate` property, so it never fights a `transform` animation on the same node.
 *
 * Fine-pointer only and rAF-batched; touch devices and reduced motion attach nothing.
 */
export default function PointerParallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.closest("section") ?? el?.parentElement;
    if (!el || !area) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 2 - 1;
      y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(write);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(write);
    };
    area.addEventListener("pointermove", onMove as EventListener);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove as EventListener);
      area.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
