import Image from "next/image";
import { clients } from "@/lib/site";

/**
 * Infinite logo marquee with the original full-colour logos (the previous site greyscaled them).
 * The list is rendered twice and the track slides by half its width, so the loop never jumps.
 * Forced LTR so the loop maths stay identical in Arabic; pauses on hover/focus and stops for
 * reduced motion via the global rule.
 */
export default function ClientMarquee({ title }: { title: string }) {
  const row = [...clients, ...clients];
  return (
    <section aria-label={title} className="flex flex-col items-center gap-5">
      <h2 className="text-[12px] text-muted">{title}</h2>
      <div className="mask-x hover-pause w-full overflow-hidden" dir="ltr">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center">
              {row.map((c, i) => (
                <li key={`${c.name}-${i}`} className="flex w-36 shrink-0 justify-center px-5 sm:w-48">
                  <Image
                    src={c.logo}
                    alt={copy === 1 || i >= clients.length ? "" : c.name}
                    width={109}
                    height={92}
                    className="h-12 w-auto transition-transform duration-300 hover:scale-110 sm:h-14"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
