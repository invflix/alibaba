"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUp, Stack, Wrench, ShoppingBag, Truck } from "@phosphor-icons/react";

const chipIcons = [Stack, Wrench, ShoppingBag, Truck];

/**
 * The reference's "tell us what you're planning" bar. Submitting carries the text to the existing
 * enquiry form (as ?message=), so it is a real entry point, not a decorative input.
 */
export default function HeroPrompt({
  label,
  placeholder,
  submitLabel,
  chips,
  contactHref,
}: {
  label: string;
  placeholder: string;
  submitLabel: string;
  chips: string[];
  contactHref: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const go = (text: string) => {
    const msg = text.trim();
    router.push(msg ? `${contactHref}?message=${encodeURIComponent(msg)}#enquiry` : `${contactHref}#enquiry`);
  };

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        className="group/prompt relative flex items-center gap-2 rounded-full bg-card p-1.5 ps-5 shadow-[0_1px_0_rgba(25,25,28,0.04),0_18px_40px_-26px_rgba(25,25,28,0.35)] ring-1 ring-line transition-[box-shadow] duration-300 focus-within:ring-brand-300"
      >
        <label htmlFor="hero-prompt" className="sr-only">
          {label}
        </label>
        <input
          ref={input}
          id="hero-prompt"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="h-11 min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted/80 focus:outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          aria-label={submitLabel}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition-[background-color,scale] duration-300 hover:bg-brand-700 active:scale-95"
        >
          <ArrowUp size={18} weight="bold" />
        </button>
      </form>
      <ul className="mt-5 flex flex-wrap justify-center gap-x-1 gap-y-2">
        {chips.map((c, i) => {
          const Icon = chipIcons[i % chipIcons.length];
          return (
            <li key={c}>
              <button
                type="button"
                onClick={() => {
                  setValue(c);
                  input.current?.focus();
                }}
                className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] text-ink-soft transition-colors hover:bg-card hover:text-brand-700"
              >
                <Icon size={14} className="text-brand-700" />
                {c}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
