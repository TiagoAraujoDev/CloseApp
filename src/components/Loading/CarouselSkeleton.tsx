import * as ToogleGroup from '@radix-ui/react-toggle-group'

import { formatLabel } from '@/utils/formatLabel'

interface CarouselSkeletonProps {
  labels: string[]
  label: string
  title: string
}

export function CarouselSkeleton({
  labels,
  label,
  title,
}: CarouselSkeletonProps) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8] // Quantity of cards

  return (
    <div className="flex flex-col gap-3 w-full mb-6 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-neutral-100 font-bold text-xl md:text-2xl">
          {title}
        </span>
        <ToogleGroup.Root
          className="flex items-center w-fit"
          type="single"
          defaultValue={label}
          disabled
        >
          {labels.map((label, index) => {
            return (
              <ToogleGroup.Item
                className="text-sm sm:text-base lg:text-xl bg-neutral-200 text-neutral-800 border border-neutral-800 first:rounded-tl first:rounded-bl last:rounded-br last:rounded-tr py-1 px-3 overflow-hidden radix-state-on:bg-emerald-500 radix-state-on:text-neutral-50"
                key={index}
                value={label}
              >
                {formatLabel(label)}
              </ToogleGroup.Item>
            )
          })}
        </ToogleGroup.Root>
      </div>
      <div className="animate-pulse flex justify-between gap-2 w-full pb-3 overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
        {arr.map((_, i) => {
          return (
            <div
              key={i}
              className="flex flex-col justify-end min-w-[230px] min-h-[420px] bg-neutral-700 rounded"
            >
              <div className="min-w-[230px] min-h-[180px] rounded-tl rounded-tr"></div>
              <div className="flex flex-col justify-center gap-2 min-h-[90px] bg-neutral-500 rounded-bl rounded-br p-2 text-sm font-medium">
                <span className="w-4/5 h-5 bg-neutral-600 rounded"></span>
                <span className="w-2/3 h-5 bg-neutral-600 rounded"></span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
