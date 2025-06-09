import { Skeleton } from './Skeleton'

export default function PostDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-2/3 h-8" />
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-5/6 h-4" />
    </div>
  )
}
