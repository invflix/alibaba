export default function Loading() {
  return (
    <div aria-busy="true" className="container-x py-16">
      <div className="mx-auto flex max-w-xl animate-pulse flex-col items-center gap-5">
        <div className="h-4 w-40 rounded-full bg-surface" />
        <div className="h-14 w-3/4 rounded-2xl bg-surface" />
        <div className="h-5 w-full rounded-full bg-surface" />
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[22px] bg-card ring-1 ring-line">
            <div className="aspect-square animate-pulse bg-surface" />
            <div className="space-y-2 p-5">
              <div className="h-3 w-16 animate-pulse rounded bg-surface" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-surface" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
