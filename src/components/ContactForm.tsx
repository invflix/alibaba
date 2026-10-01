"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, WarningCircle, PaperPlaneTilt, CircleNotch, X } from "@phosphor-icons/react";
import { sendEnquiry, type EnquiryState } from "@/lib/enquiry";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import { site } from "@/lib/site";
import { useQuote } from "./QuoteList";
import { buttonClass } from "./ui";

const inputClass =
  "w-full rounded-xl border bg-paper/60 px-4 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow,background-color] duration-200 hover:border-ink/20 focus:bg-white focus:outline-none focus-visible:outline-none focus:ring-4";

function Field({
  id,
  label,
  error,
  optional,
  optionalLabel,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  optionalLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink-soft">
        {label} {optional ? <span className="font-normal text-muted">({optionalLabel})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-brand-700">
          <WarningCircle size={16} /> {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ContactForm({
  lang,
  t,
  optionalLabel,
  productNames,
}: {
  lang: Locale;
  t: Dictionary["form"];
  optionalLabel: string;
  /** slug -> localized product name, for ?product= deep links from product pages. */
  productNames: Record<string, string>;
}) {
  const params = useSearchParams();
  const { items, remove, clear, labelOf } = useQuote();
  const productSlug = params.get("product");
  const productName = productSlug ? productNames[productSlug] : undefined;
  const defaultSubject = productName ? `${t.productEnquiry} ${productName}` : (params.get("subject") ?? "").slice(0, 200);
  const defaultMessage = productName ? fmt(t.productMessage, { name: productName }) : (params.get("message") ?? "").slice(0, 2000);

  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });

  useEffect(() => {
    if (state.status === "sent") clear();
    if (state.status !== "fallback" || !state.values) return;
    const v = state.values;
    const list = v.items ? `\n\n${v.items}` : "";
    const body = `${v.message}${list}\n\nName: ${v.name}\nPhone: ${v.phone || "-"}\nCompany: ${v.company || "-"}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(v.subject || "Website enquiry")}&body=${encodeURIComponent(body)}`;
  }, [state, clear]);

  if (state.status === "sent") {
    return (
      <div className="flex animate-hero-in flex-col items-start rounded-[24px] bg-card p-8 ring-1 ring-line sm:p-10" role="status">
        <CheckCircle size={44} weight="light" className="text-brand-700" />
        <h3 className="font-display-tight mt-5 text-3xl text-ink">{t.sentTitle}</h3>
        <p className="mt-3 max-w-md text-muted">{t.sentText}</p>
      </div>
    );
  }

  const e = state.errors ?? {};
  const v = state.values ?? {};
  const ring = (err?: string) => (err ? "border-brand-600 focus:ring-brand-100" : "border-line focus:border-brand-600 focus:ring-brand-100");

  return (
    <form action={action} noValidate className="relative rounded-[24px] bg-card p-5 shadow-[var(--shadow-elevated)] ring-1 ring-line min-[400px]:p-6 sm:p-9">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="items" value={items.map(labelOf).join("\n")} />

      {items.length ? (
        <div className="mb-6 rounded-2xl bg-paper p-4 ring-1 ring-line">
          <p className="text-[13px] font-medium text-ink-soft">{t.quoteItems}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {items.map((i) => (
              <li key={i.id} className="inline-flex items-center gap-1 rounded-full bg-white py-1 pe-1 ps-3 text-[13px] text-ink ring-1 ring-line">
                {labelOf(i)}
                <button type="button" onClick={() => remove(i.id)} aria-label={labelOf(i)} className="grid size-6 place-items-center rounded-full text-muted hover:bg-surface hover:text-brand-700">
                  <X size={12} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={t.name} error={e.name} optionalLabel={optionalLabel}>
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!e.name} aria-describedby={e.name ? "name-error" : undefined} className={`${inputClass} h-12 ${ring(e.name)}`} />
        </Field>
        <Field id="email" label={t.email} error={e.email} optionalLabel={optionalLabel}>
          <input id="email" name="email" type="email" dir="ltr" autoComplete="email" required defaultValue={v.email} aria-invalid={!!e.email} aria-describedby={e.email ? "email-error" : undefined} className={`${inputClass} h-12 rtl:text-right ${ring(e.email)}`} />
        </Field>
        <Field id="phone" label={t.phone} optional error={e.phone} optionalLabel={optionalLabel}>
          <input id="phone" name="phone" type="tel" dir="ltr" autoComplete="tel" defaultValue={v.phone} aria-invalid={!!e.phone} aria-describedby={e.phone ? "phone-error" : undefined} className={`${inputClass} h-12 rtl:text-right ${ring(e.phone)}`} />
        </Field>
        <Field id="company" label={t.company} optional optionalLabel={optionalLabel}>
          <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={`${inputClass} h-12 ${ring()}`} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="subject" label={t.subject} optional optionalLabel={optionalLabel}>
            <input id="subject" name="subject" defaultValue={v.subject ?? defaultSubject} className={`${inputClass} h-12 ${ring()}`} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="message" label={t.message} error={e.message} optionalLabel={optionalLabel}>
            <textarea
              id="message"
              name="message"
              rows={5}
              required={!items.length}
              defaultValue={v.message ?? defaultMessage}
              aria-invalid={!!e.message}
              aria-describedby={e.message ? "message-error" : undefined}
              className={`${inputClass} resize-y py-3 ${ring(e.message)}`}
            />
          </Field>
        </div>
        {/* Honeypot */}
        <div aria-hidden className="absolute -start-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
          <WarningCircle size={18} className="mt-px shrink-0" /> {state.message}
        </p>
      ) : null}
      {state.status === "fallback" ? (
        <p role="status" className="mt-6 rounded-xl bg-paper px-4 py-3 text-sm text-ink-soft">
          {t.fallback}{" "}
          <a className="text-brand-700 underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {t.preferTalk}{" "}
          <a href={site.phoneHref} className="text-ink-soft underline-offset-4 hover:text-brand-700 hover:underline">
            {t.call} <span dir="ltr">{site.phone}</span>
          </a>
        </p>
        <button type="submit" disabled={pending} className={buttonClass("primary", "disabled:cursor-wait disabled:opacity-70")}>
          {pending ? (
            <>
              <CircleNotch size={16} className="animate-spin" /> {t.sending}
            </>
          ) : (
            <>
              {t.send} <PaperPlaneTilt size={16} className="flip-rtl" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export function ContactFormSkeleton() {
  return (
    <div className="rounded-[24px] bg-card p-6 ring-1 ring-line sm:p-9" aria-hidden>
      <div className="grid animate-pulse gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 rounded bg-surface" />
            <div className="h-12 rounded-xl bg-surface" />
          </div>
        ))}
        <div className="space-y-2 sm:col-span-2">
          <div className="h-4 w-40 rounded bg-surface" />
          <div className="h-32 rounded-xl bg-surface" />
        </div>
      </div>
    </div>
  );
}
