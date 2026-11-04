export default function Loading() {
  return (
    <div className="container-page py-10" aria-label="Memuat halaman">
      <div className="h-3 w-40 animate-pulse rounded bg-line/[0.06]" />
      <div className="mt-6 h-10 w-2/3 max-w-md animate-pulse rounded-lg bg-line/[0.06] sm:h-14" />
      <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-line/[0.04]" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[19rem] animate-pulse rounded-2xl border border-line/[0.06] bg-cell/40"
          />
        ))}
      </div>
    </div>
  );
}
