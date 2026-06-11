const Skeleton = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-slate-200/70 dark:bg-white/[0.06] rounded-xl ${className}`}
  />
);

export const SkeletonCard = () => (
  <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-5 space-y-3">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-3 w-32" />
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.06] overflow-hidden">
    <div className="p-4 border-b border-slate-100 dark:border-white/[0.06]">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 border-b border-slate-50 dark:border-white/[0.04] flex gap-4">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    ))}
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-5 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="flex items-end gap-2 h-40">
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton
          key={i}
          className="flex-1 rounded-t"
          style={{ height: `${(i * 37 + 20) % 60 + 20}%` }}
        />
      ))}
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
    ))}
  </div>
);

export const SkeletonAvatar = () => (
  <div className="flex items-center gap-3">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="space-y-1.5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6 p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <SkeletonChart />
      </div>
      <div>
        <SkeletonTable rows={4} />
      </div>
    </div>
    <SkeletonTable rows={6} />
  </div>
);

export const SkeletonPage = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-10 w-32 rounded-2xl" />
    </div>
    <SkeletonDashboard />
  </div>
);

export const SkeletonList = ({ rows = 4 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-white/[0.06] p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
