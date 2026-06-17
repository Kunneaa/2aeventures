export default function ProductDetailLoading() {
  return (
    <div className="app-shell section-shell animate-pulse py-8 md:py-12">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8 h-4 w-48 rounded bg-[#f2f7fb]" />
      
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image Skeleton */}
        <div className="aspect-[4/3] w-full rounded-2xl border border-[#d8e3df] bg-[#f8faf9] p-4 lg:aspect-square">
          <div className="h-full w-full rounded-xl bg-[#f2f7fb]" />
        </div>
        
        {/* Info Skeleton */}
        <div className="space-y-8 pt-4">
          <div className="space-y-4">
            <div className="h-6 w-1/4 rounded-full bg-[#f2f7fb]" />
            <div className="h-10 w-3/4 rounded-lg bg-[#f2f7fb]" />
            <div className="h-6 w-1/2 rounded bg-[#f2f7fb]" />
          </div>
          
          <div className="h-[200px] w-full rounded-xl bg-[#f2f7fb]" />
          
          <div className="h-12 w-full max-w-sm rounded-lg bg-[#f2f7fb]" />
        </div>
      </div>
    </div>
  );
}
