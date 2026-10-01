import { notFound } from "next/navigation";

/** Unmatched URLs inside a locale render the localized not-found page within the site chrome. */
export default function CatchAll() {
  notFound();
}
