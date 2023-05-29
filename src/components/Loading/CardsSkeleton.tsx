import { memo } from 'react'

function CardsSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_item, i) => (
        <div
          key={i}
          className="mb-3 flex h-48 w-full items-center space-x-8 overflow-hidden rounded-lg border"
        >
          {/* Image */}
          <div className="h-full w-48 animate-pulse bg-neutral-600"></div>
          {/* Info */}
          <div className="w-full space-y-2">
            <div className="h-5 w-2/12 animate-pulse rounded bg-neutral-400"></div>
            <div className="h-5 w-4/12 animate-pulse rounded bg-neutral-400"></div>
            <div className="h-10 w-9/12 animate-pulse rounded bg-neutral-400"></div>
            <div className="h-5 w-5/12 animate-pulse rounded bg-neutral-400"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default memo(CardsSkeleton)
