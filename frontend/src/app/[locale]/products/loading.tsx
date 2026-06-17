export default function ProductsLoading() {
  return (
    <div className="app-shell w-full animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[220px] w-full bg-[#f2f7fb]" />
      
      {/* Filter Bar Skeleton */}
      <div className="h-16 w-full border-b border-[#d8e3df] bg-white" />
      
      {/* Content Skeleton */}
      <div className="section-shell py-8 md:py-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-48 rounded-lg bg-[#f2f7fb]" />
          <div className="h-8 w-24 rounded-lg bg-[#f2f7fb]" />
        </div>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-[360px] rounded-2xl border border-[#d8e3df] bg-white p-3">
              <div className="h-48 w-full rounded-xl bg-[#f2f7fb]" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-1/3 rounded bg-[#f2f7fb]" />
                <div className="h-6 w-3/4 rounded bg-[#f2f7fb]" />
                <div className="h-4 w-1/2 rounded bg-[#f2f7fb]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
