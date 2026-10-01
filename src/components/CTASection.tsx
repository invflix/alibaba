import Link from "next/link";
import { ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { buttonClass } from "./ui";

/** Closing call-to-action band for inner pages: maroon panel, serif headline, real contact routes. */
export default function CTASection({
  title,
  text,
  contactHref,
  buttonLabel,
}: {
  title: string;
  text: string;
  contactHref: string;
  buttonLabel: string;
}) {
  return (
    <section className="container-x py-16 sm:py-24">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-brand-700 px-6 py-12 text-white shadow-[var(--shadow-float)] sm:px-12 sm:py-16 lg:px-16" data-reveal="scale">
        <div aria-hidden className="bg-dots-light absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_80%_20%,#000,transparent_65%)]" />
        <div aria-hidden className="absolute -bottom-32 -start-24 -z-10 size-96 rounded-full bg-brand-900/50 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display-tight text-[2rem] sm:text-5xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{text}</p>
          </div>
          <div className="flex flex-col gap-3 min-[480px]:flex-row">
            <Link href={contactHref} className={buttonClass("light")}>
              {buttonLabel}
              <ArrowRight size={16} className="flip-rtl" />
            </Link>
            <a href={site.phoneHref} className={buttonClass("outline-light")}>
              <Phone size={16} /> <span dir="ltr">{site.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
