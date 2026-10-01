"use client";

import { useEffect, useRef } from "react";

/**
 * Server-renders the final value (good for SEO and no-JS), then counts up from zero
 * the first time it scrolls into view. Writes to textContent directly, so no re-renders.
 */
export default function Counter({ value, suffix = "", duration = 1600 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const format = (n: number) => `${Math.round(n).toLocaleString("en-US")}${suffix}`;
    let frame = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = format(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    // Only reset to zero if it is still off-screen, so nobody sees the number jump.
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.textContent = format(0);
      io.observe(el);
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
