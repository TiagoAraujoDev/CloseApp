import { memo } from "react";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { formatLabel } from "@/utils/formatLabel";

interface ToggleCarouselProps {
  onToggleChange: (label: string) => void
  labels: string[]
  currentLabel: string
}

const ToggleCarousel = ({
  labels,
  currentLabel,
  onToggleChange,
}: ToggleCarouselProps) => {
  return (
    <ToogleGroup.Root
      className="flex w-fit items-center"
      type="single"
      defaultValue={currentLabel}
      onValueChange={(value) => {
        if (value) onToggleChange(value);
      }}
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
  );
};

export default memo(ToggleCarousel);
