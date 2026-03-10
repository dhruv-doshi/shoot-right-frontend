import { Skeleton } from '@/components/ui/skeleton'

export default function AnalysisSkeleton() {
  return (
    <div className="space-y-6">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      {/* Overlay controls skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-72 rounded-full" />
      </div>
      {/* Summary panel skeleton */}
      <div className="flex gap-6 rounded-xl border border-[var(--border)] p-6">
        <Skeleton className="h-28 w-28 flex-shrink-0 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      {/* Card skeletons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
    </div>
  )
}
