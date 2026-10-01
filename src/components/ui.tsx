import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.16),var(--shadow-brand)] hover:-translate-y-0.5 hover:bg-brand-800",
  secondary: "bg-card text-ink ring-1 ring-line shadow-[var(--shadow-card-rest)] hover:-translate-y-0.5 hover:ring-ink/25 hover:shadow-[var(--shadow-card-hover)]",
  dark: "bg-ink text-white hover:-translate-y-0.5 hover:bg-black",
  ghost: "text-ink-soft hover:bg-surface hover:text-ink",
  light: "bg-white text-ink hover:-translate-y-0.5 hover:bg-paper",
  "outline-light": "text-white ring-1 ring-white/30 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-white/60",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return [
    "group inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 text-[15px] font-medium",
    "transition-[background-color,box-shadow,translate,scale,color] duration-300 ease-(--ease-out-soft) active:scale-[0.98] active:translate-y-0",
    variants[variant],
    extra,
  ].join(" ");
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link {...props} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/** Arrow that nudges forward (logical direction) on parent hover and mirrors in RTL. */
export function NudgeIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flip-rtl inline-flex">
      <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
    </span>
  );
}

/** Serif headline with an optional italic maroon accent phrase, as in the reference design. */
export function DisplayTitle({
  lead,
  accent,
  as: Tag = "h2",
  className = "",
}: {
  lead?: ReactNode;
  accent?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={`font-display-tight text-ink ${className}`}>
      {lead}
      {lead && accent ? " " : null}
      {accent ? <span className="accent">{accent}</span> : null}
    </Tag>
  );
}

export function SectionHeading({
  kicker,
  lead,
  accent,
  intro,
  align = "start",
  as = "h2",
  className = "",
  tone = "dark",
}: {
  kicker?: ReactNode;
  lead?: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
  tone?: "dark" | "light";
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`} data-reveal>
      {kicker ? <p className={`kicker mb-4 ${tone === "light" ? "!text-brand-300" : ""}`}>{kicker}</p> : null}
      <DisplayTitle
        as={as}
        lead={lead}
        accent={accent}
        className={`text-[2rem] min-[400px]:text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] ${tone === "light" ? "!text-white [&_.accent]:!text-brand-300" : ""}`}
      />
      {intro ? (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-[17px] ${center ? "mx-auto max-w-[58ch]" : "max-w-[62ch]"} ${
            tone === "light" ? "text-white/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
