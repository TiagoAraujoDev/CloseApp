import { memo } from 'react'

function SearchSkeleton() {
  return (
    <>
      <div className="mx-auto my-4 w-full overflow-hidden rounded bg-neutral-500 md:w-80">
        <h2 className="bg-emerald-500 p-4 text-center text-base font-semibold text-white md:text-xl">
          Search results
        </h2>
        <div className="flex flex-col py-2">
          <button className="flex items-center justify-between border-gray-300 bg-emerald-500 p-2 text-sm text-white md:text-base">
            Movie
            <span className="flex h-6 w-10 animate-pulse items-center justify-center rounded bg-neutral-200 px-2 py-1 text-[10px] font-normal leading-none text-neutral-600 shadow shadow-neutral-800 md:text-sm"></span>
          </button>
          <button className="flex items-center justify-between border-gray-300 p-2 text-sm text-white hover:bg-neutral-600 md:text-base">
            Tv
            <span className="flex h-6 w-10 animate-pulse items-center justify-center rounded bg-neutral-200 px-2 py-1 text-[10px] font-normal leading-none text-neutral-600 shadow shadow-neutral-800 md:text-sm"></span>
          </button>
        </div>
      </div>
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

export default memo(SearchSkeleton)
