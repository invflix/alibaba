/**
 * Gives every route a brief, subtle fade/rise-in on navigation (the "entrance transition" a
 * SPA gets for free). Next.js remounts `template.tsx` on every navigation, so the CSS animation
 * replays each time without any client JS or the (unavailable in this React build) experimental
 * View Transitions API. Fully respects `prefers-reduced-motion` via the existing global rule in
 * globals.css, and costs nothing beyond one `animation` on the page's root element.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
