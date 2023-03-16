"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { getTvShows } from "@/utils/requests/tvshows";
import { formatLabel } from "@/utils/formatLabel";

import { Carousel } from "@/components/Home/Carousel";
import { CarouselSkeleton } from "@/components/Loading/CarouselSkeleton";

interface TvShowsProps {
  labels: string[];
}

export function TvShowsSection({ labels }: TvShowsProps) {
  const [label, setLabel] = useState(labels[0]);

  const queryKey = `${label}_tvshows`;

  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const response = await getTvShows(label);
      const tvshows = response?.data.results;

      return tvshows;
    },
    {
      refetchOnMount: false,
      staleTime: 60 * 60 * 2, // 2 hours
    },
  );

  if (isLoading) {
    return <CarouselSkeleton labels={labels} label={label} title="Movies" />;
  }

  return (
    <section className="flex flex-col gap-3 mb-10 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-neutral-100 font-bold text-xl md:text-2xl">
          TV Shows
        </span>
        <ToogleGroup.Root
          className="flex items-center w-fit"
          type="single"
          defaultValue={label}
          onValueChange={(value) => {
            if (value) setLabel(value);
          }}
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
            );
          })}
        </ToogleGroup.Root>
      </div>
      {data && <Carousel tvshows={data} />}
    </section>
  );
}
