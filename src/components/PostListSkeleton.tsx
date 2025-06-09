import { Skeleton } from './Skeleton'

export default function PostListSkeleton() {
  return (
    <ul className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className="bg-white p-4 rounded shadow border space-y-3">
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-1/2 h-4" />
          <div className="flex gap-2">
            <Skeleton className="w-16 h-6" />
            <Skeleton className="w-20 h-6" />
          </div>
        </li>
      ))}
    </ul>
  )
}
