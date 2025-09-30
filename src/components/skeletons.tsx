import { Skeleton } from "@/components/ui/skeleton"

// Базовый skeleton компонент для карт
export function MapSkeleton() {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Skeleton className="w-16 h-16 mx-auto mb-4" />
        <Skeleton className="w-32 h-4 mx-auto" />
      </div>
    </div>
  )
}

// Skeleton для формы поиска
export function SearchFormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

// Skeleton для карточек свойств
export function PropertyCardSkeleton() {
  return (
    <div className="border rounded-lg p-4">
      <Skeleton className="w-full h-48 mb-4" />
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="w-20 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
    </div>
  )
}
