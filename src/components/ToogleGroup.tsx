'use client'

import * as ToogleGroup from '@radix-ui/react-toggle-group'

interface OptionsMenuProps {
  labels: string[]
}

export function OptionsMenu({ labels }: OptionsMenuProps) {
  const defaultValue = labels[0]

  return (
    <ToogleGroup.Root
      className="flex items-center w-fit"
      type="single"
      defaultValue={defaultValue}
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
        )
      })}
    </ToogleGroup.Root>
  )
}
