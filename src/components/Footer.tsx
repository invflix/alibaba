import Image from "next/image";
import Link from "next/link";
import { Phone, EnvelopeSimple, MapPin, FacebookLogo, InstagramLogo, WhatsappLogo, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { localeHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Category } from "@/data/products";
import type { Service } from "@/data/services";
import { site } from "@/lib/site";
import { siteAr } from "@/data/ar";

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[14px] text-white/55 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({
  lang,
  dict,
  categories,
  services,
}: {
  lang: Locale;
  dict: Dictionary;
  categories: Category[];
  services: Service[];
}) {
  const h = (p: string) => localeHref(lang, p);
  const n = dict.nav;
  const name = lang === "ar" ? siteAr.name : site.name;
  const addr = lang === "ar" ? siteAr.address : site.address;
  const sep = lang === "ar" ? "، " : ", ";

  const company = [
    { label: n.about, href: h("/about-us/") },
    { label: n.quality, href: h("/quality-policy/") },
    { label: n.certificates, href: h("/certificates/") },
    { label: n.ohs, href: h("/ohs/") },
    { label: n.safety, href: h("/safety-policy/") },
    { label: n.contact, href: h("/contact/") },
  ];
  const serviceLinks = [
    ...services.map((s) => ({ label: s.name, href: h(`/services/${s.slug}/`) })),
    { label: n.equipment, href: h("/heavy-equipment-rental/") },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="bg-dots-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <Link href={h("/")} aria-label={`${name} ${dict.common.homeLabel}`} className="inline-block rounded-2xl bg-white px-4 py-3">
            <Image src="/images/site/logo.png" alt={name} width={640} height={77} className="h-auto w-[210px]" />
          </Link>
          <p className="mt-6 text-[14px] leading-relaxed text-white/55">{dict.footer.blurb}</p>
          <ul className="mt-6 space-y-3 text-[14px]">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 text-white/75 hover:text-white">
                <Phone size={17} className="text-brand-300" /> <span dir="ltr">{site.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white/75 hover:text-white">
                <EnvelopeSimple size={17} className="text-brand-300" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brand-300" />
              <span>
                {name}
                {sep}
                {addr.line1}
                <br />
                {addr.city} {addr.postalCode}
                {sep}
                {addr.country}
              </span>
            </li>
          </ul>
        </div>

        <Col title={dict.footer.company} links={company} />
        <Col title={dict.footer.products} links={categories.map((c) => ({ label: c.name, href: h(`/products/${c.slug}/`) }))} />
        <div>
          <Col title={dict.footer.services} links={serviceLinks} />
          <a
            href={site.docs.profile}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
          >
            <DownloadSimple size={16} /> {dict.common.downloadCompanyProfile}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {name}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.footer.facebook}
              className="grid size-9 place-items-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              <FacebookLogo size={17} />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.footer.instagram}
              className="grid size-9 place-items-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              <InstagramLogo size={17} />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.common.chatOnWhatsapp}
              className="grid size-9 place-items-center rounded-full ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white"
            >
              <WhatsappLogo size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
