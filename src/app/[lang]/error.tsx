"use client";

import Link from "next/link";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui";

// Kept inline (not the full dictionaries) so the error boundary stays tiny on the client.
const copy = {
  en: { eyebrow: "Something went wrong", title: "We couldn’t load this page.", text: "Please try again. If the problem continues, call us on +966 53 104 4002.", retry: "Try again", home: "Back to home", href: "/" },
  ar: { eyebrow: "حدث خطأ ما", title: "تعذّر تحميل هذه الصفحة.", text: "يرجى المحاولة مرة أخرى. إذا استمرت المشكلة، اتصل بنا على ‎+966 53 104 4002.", retry: "حاول مرة أخرى", home: "العودة إلى الرئيسية", href: "/ar/" },
};

export default function Error({ error, unstable_retry }: { error: Error & { digest?: string }; unstable_retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const t = typeof document !== "undefined" && document.documentElement.lang === "ar" ? copy.ar : copy.en;

  return (
    <section className="container-x flex min-h-[60dvh] animate-hero-in flex-col items-center justify-center py-24 text-center">
      <p className="kicker">{t.eyebrow}</p>
      <h1 className="font-display-tight mt-5 text-5xl text-ink sm:text-6xl">{t.title}</h1>
      <p className="mt-6 max-w-[52ch] text-lg text-muted">{t.text}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => unstable_retry()} className={buttonClass("primary")}>
          {t.retry}
        </button>
        <Link href={t.href} className={buttonClass("secondary")}>
          {t.home}
        </Link>
      </div>
    </section>
  );
}
