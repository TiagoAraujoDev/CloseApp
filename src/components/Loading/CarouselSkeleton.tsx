import { memo } from "react";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { formatLabel } from "@/utils/formatLabel";

interface CarouselSkeletonProps {
  labels: string[]
  label: string
  title: string
}

function CarouselSkeleton({ labels, label, title }: CarouselSkeletonProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-3 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-neutral-100 md:text-2xl">
          {title}
        </span>
        <ToogleGroup.Root
          className="flex w-fit items-center"
          type="single"
          defaultValue={label}
          disabled
        >
          {labels.map((label, index) => {
            return (
              <ToogleGroup.Item
                className="overflow-hidden border border-neutral-800 bg-neutral-200 py-1 px-3 text-sm text-neutral-800 first:rounded-tl first:rounded-bl last:rounded-br last:rounded-tr radix-state-on:bg-emerald-500 radix-state-on:text-neutral-50 sm:text-base lg:text-xl"
                key={index}
                value={label}
              >
                {formatLabel(label)}
              </ToogleGroup.Item>
            );
          })}
        </ToogleGroup.Root>
      </div>
      <div className="flex w-full animate-pulse justify-between gap-2 overflow-auto pb-3 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-emerald-500">
        {Array.from({ length: 8 }).map((_, i) => {
          return (
            <div
              key={i}
              className="flex min-h-[420px] min-w-[230px] flex-col justify-end rounded bg-neutral-700"
            >
              <div className="min-h-[180px] min-w-[230px] rounded-tl rounded-tr"></div>
              <div className="flex min-h-[90px] flex-col justify-center gap-2 rounded-bl rounded-br bg-neutral-500 p-2 text-sm font-medium">
                <span className="h-5 w-4/5 rounded bg-neutral-600"></span>
                <span className="h-5 w-2/3 rounded bg-neutral-600"></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(CarouselSkeleton);
