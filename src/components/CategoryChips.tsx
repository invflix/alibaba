import Link from "next/link";
import type { Category, Product } from "@/data/products";

export default function CategoryChips({
  active,
  categories,
  products,
  base,
  allLabel,
  navLabel,
}: {
  active?: string;
  categories: Category[];
  products: Product[];
  base: string;
  allLabel: string;
  navLabel: string;
}) {
  const items = [
    { href: `${base}/products/`, label: allLabel, count: products.length, slug: undefined as string | undefined },
    ...categories.map((c) => ({
      href: `${base}/products/${c.slug}/`,
      label: c.name,
      count: products.filter((p) => p.category === c.slug).length,
      slug: c.slug,
    })),
  ];
  return (
    <nav aria-label={navLabel} className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
        {items.map((c) => {
          const isActive = c.slug === active;
          return (
            <li key={c.href}>
              <Link
                href={c.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] transition-colors duration-300 ${
                  isActive ? "bg-ink text-white" : "bg-card text-ink-soft ring-1 ring-line hover:ring-ink/30"
                }`}
              >
                {c.label}
                <span className={`text-[11px] ${isActive ? "text-white/60" : "text-muted"}`}>{c.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
