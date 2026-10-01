import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import JsonLd from "./JsonLd";

export type Crumb = { label: string; href: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. `home` is prepended. */
export default function Breadcrumb({ items, home, label = "Breadcrumb" }: { items: Crumb[]; home: Crumb; label?: string }) {
  const all = [home, ...items];
  return (
    <>
      <nav aria-label={label}>
        <ol className="flex flex-wrap items-center justify-center gap-1.5 text-[13px] text-muted">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="rounded-full bg-card px-3 py-1 text-ink-soft ring-1 ring-line">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="transition-colors hover:text-brand-700">
                      {c.label}
                    </Link>
                    <CaretRight size={11} className="flip-rtl opacity-50" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${site.url}${c.href}` })),
        }}
      />
    </>
  );
}
