import * as ToogleGroup from "@radix-ui/react-toggle-group";

interface CarouselSkeletonProps {
  labels: string[];
  label: string;
}

export function CarouselSkeleton({ labels, label }: CarouselSkeletonProps) {
  return (
    <div className="flex flex-col gap-3 w-full mb-6">
      <div className="flex items-center justify-between">
        <span className="text-neutral-100 font-bold text-xl md:text-2xl">
          Trending
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
                className="bg-neutral-200 text-neutral-800 border border-neutral-800 first:rounded-tl first:rounded-bl last:rounded-br last:rounded-tr py-1 px-3 overflow-hidden radix-state-on:bg-emerald-500 radix-state-on:text-neutral-50"
                key={index}
                value={label}
              >
                {label}
              </ToogleGroup.Item>
            );
          })}
        </ToogleGroup.Root>
      </div>
      <div className="animate-pulse flex justify-between gap-2 w-full pb-3 overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
        <div className="h-[420px] min-w-[230px] bg-neutral-700 rounded"></div>
      </div>
    </div>
  );
}
