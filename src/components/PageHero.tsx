import Image from "next/image";
import type { ReactNode } from "react";
import Breadcrumb, { type Crumb } from "./Breadcrumb";
import { DisplayTitle } from "./ui";

/**
 * Editorial page header for inner pages: centred serif title on the warm canvas, then the page
 * photo as a large rounded panel that unclips into view — the reference's light language instead
 * of the old dark photo banner.
 */
export default function PageHero({
  title,
  accent,
  intro,
  crumbs,
  home,
  image,
  imageAlt = "",
  imagePosition = "center",
  children,
}: {
  title: string;
  accent?: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  home: Crumb;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,#fff_0%,transparent_70%)]" />
      <div className="container-x flex flex-col items-center pb-10 pt-12 text-center sm:pt-16">
        <div className="animate-hero-in">
          <Breadcrumb items={crumbs} home={home} />
        </div>
        <DisplayTitle
          as="h1"
          lead={title}
          accent={accent}
          className="mt-6 max-w-[18ch] animate-hero-in text-[2.5rem] [animation-delay:120ms] min-[400px]:text-[2.8rem] sm:text-6xl lg:text-[4.25rem]"
        />
        {intro ? (
          <p className="mt-6 max-w-[60ch] animate-hero-in text-base leading-relaxed text-muted [animation-delay:240ms] sm:text-[17px]">{intro}</p>
        ) : null}
        {children ? (
          <div className="mt-8 flex animate-hero-in flex-col justify-center gap-3 [animation-delay:340ms] min-[420px]:flex-row min-[420px]:flex-wrap">
            {children}
          </div>
        ) : null}
      </div>
      {image ? (
        <div className="container-x pb-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-surface shadow-[var(--shadow-float)] sm:aspect-[21/9]" data-reveal="image">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1240px) 1180px, 100vw" quality={85} className="object-cover" style={{ objectPosition: imagePosition }} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
