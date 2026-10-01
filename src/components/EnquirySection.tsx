import { Suspense } from "react";
import { Phone, EnvelopeSimple, WhatsappLogo, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getProducts, getSiteText } from "@/i18n/content";
import { site } from "@/lib/site";
import ContactForm, { ContactFormSkeleton } from "./ContactForm";
import { SectionHeading } from "./ui";

/**
 * Enquiry block: heading and a dark "Prefer to talk?" card on one side, the enquiry form
 * (existing server action) on the other. `id="enquiry"` is the target of the hero prompt.
 */
export default function EnquirySection({
  lang,
  dict,
  lead,
  accent,
  intro,
  as = "h2",
  showAddress = false,
}: {
  lang: Locale;
  dict: Dictionary;
  lead?: string;
  accent?: string;
  intro?: string;
  as?: "h1" | "h2";
  showAddress?: boolean;
}) {
  const productNames = Object.fromEntries(getProducts(lang).map((p) => [p.slug, p.name]));
  const s = getSiteText(lang);
  const c = dict.contactPage;
  const rows = [
    { icon: Phone, label: c.callLabel, value: <span dir="ltr">{site.phone}</span>, href: site.phoneHref },
    { icon: EnvelopeSimple, label: c.mailLabel, value: site.email, href: `mailto:${site.email}` },
    { icon: WhatsappLogo, label: dict.common.whatsapp, value: dict.common.chatOnWhatsapp, href: site.whatsapp, external: true },
  ];

  return (
    <section id="enquiry" className="relative isolate overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_30%_40%,#000,transparent_70%)]" />
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading as={as} kicker={dict.form.title} lead={lead ?? dict.cta.title} accent={accent} intro={intro ?? dict.cta.text} />
          <div className="rounded-[24px] bg-night p-6 text-white shadow-[var(--shadow-float)] sm:p-8" data-reveal>
            <p className="font-display-tight text-2xl">{dict.cta.talk}</p>
            <ul className="mt-6 space-y-4">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-brand-300 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <r.icon size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] text-white/50">{r.label}</span>
                      <span className="block break-words text-[15px] text-white/90 group-hover:text-white">{r.value}</span>
                    </span>
                  </a>
                </li>
              ))}
              {showAddress ? (
                <li className="flex items-center gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-brand-300">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="block text-[12px] text-white/50">{c.visitLabel}</span>
                    <span className="block text-[15px] text-white/90">
                      {lang === "ar" ? c.visitValue : `Al Batin Advanced Contracting Co. Ltd, ${s.address.line1}, ${s.address.city}, KSA`}
                    </span>
                  </span>
                </li>
              ) : null}
              <li className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-brand-300">
                  <Clock size={18} />
                </span>
                <span>
                  <span className="block text-[12px] text-white/50">{c.hours}</span>
                  {c.hoursList.map((h) => (
                    <span key={h.days} className="block text-[15px] text-white/90">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div data-reveal>
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm lang={lang} t={dict.form} optionalLabel={dict.common.optional} productNames={productNames} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
