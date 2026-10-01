import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "@phosphor-icons/react/dist/ssr";
import type { Product } from "@/data/products";

/** `base` is the locale prefix ("" for English, "/ar" for Arabic). */
export const productHref = (p: Product, base = "") => `${base}/products/${p.category}/${p.slug}/`;
export const enquireHref = (p: Product, base = "") => `${base}/contact/?product=${p.slug}`;

export type ProductCardLabels = { details: string; enquire: string; photoSoon: string; categories: Record<string, string> };

export function ProductImage({ product, sizes, priority, photoSoon }: { product: Product; sizes: string; priority?: boolean; photoSoon: string }) {
  if (!product.image) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-surface text-muted">
        <div className="flex flex-col items-center gap-2 px-2 text-center text-xs sm:text-sm">
          <Package size={36} weight="thin" />
          {photoSoon}
        </div>
      </div>
    );
  }
  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      priority={priority}
      className="object-contain p-4 drop-shadow-[0_16px_14px_rgba(25,25,28,0.12)] transition-transform duration-700 ease-(--ease-out-soft) group-hover:-translate-y-1 group-hover:scale-[1.06] sm:p-6"
    />
  );
}

/** Catalogue card: horizontal row below 640px, floating product stage card above. Plain CSS hover. */
export default function ProductCard({
  product,
  index = 0,
  eager = false,
  base,
  t,
}: {
  product: Product;
  index?: number;
  eager?: boolean;
  base: string;
  t: ProductCardLabels;
}) {
  const href = productHref(product, base);
  return (
    <article
      data-reveal={eager ? undefined : ""}
      style={{ "--reveal-delay": index % 4 } as React.CSSProperties}
      className="group flex overflow-hidden rounded-[22px] bg-card ring-1 ring-line transition-[box-shadow,translate] duration-500 ease-(--ease-out-soft) hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] sm:flex-col"
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative aspect-square w-[38%] max-w-40 shrink-0 overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#fff_0%,var(--color-surface)_85%)] sm:w-full sm:max-w-none"
      >
        <ProductImage product={product} priority={eager && index < 2} photoSoon={t.photoSoon} sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 160px" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="kicker !text-[10px]">{t.categories[product.category]}</p>
        <h3 className="mt-1.5 text-base font-semibold leading-snug text-ink sm:text-[16px]">
          <Link href={href} className="transition-colors hover:text-brand-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">{product.summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-4">
          <Link href={href} className="inline-flex items-center gap-1 text-[13px] text-ink-soft hover:text-brand-700">
            {t.details}
            <ArrowRight size={13} className="flip-rtl" />
          </Link>
          <Link
            href={enquireHref(product, base)}
            className="inline-flex h-8 items-center rounded-full px-3.5 text-[13px] text-brand-700 ring-1 ring-brand-200 transition-colors duration-200 hover:bg-brand-700 hover:text-white hover:ring-brand-700"
            aria-label={`${t.enquire}: ${product.name}`}
          >
            {t.enquire}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, eagerCount = 0, base, t }: { products: Product[]; eagerCount?: number; base: string; t: ProductCardLabels }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={`${p.category}-${p.slug}`} product={p} index={i} eager={i < eagerCount} base={base} t={t} />
      ))}
    </div>
  );
}
