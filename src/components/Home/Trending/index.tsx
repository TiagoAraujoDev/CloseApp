"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { Carousel } from "@/components/Carousel";
import { getTrending } from "@/utils/requests/trending";
import { CarouselSkeleton } from "@/components/Loding/CarouselSkeleton";

interface TrendingProps {
  variant: string;
}

export function Trending({ variant }: TrendingProps) {
  const sectionTitle = variant === "movie" ? "Trending movies" : "Trending TV";

  const periods = ["day", "week"];
  const [period, setPeriod] = useState(periods[0]);

  const queryKey = `${variant}-${period}`;

  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const response = await getTrending(variant, period);
      if (variant === "movie") {
        const movies = response?.data.results;

        return movies;
      } else {
        const tvshows = response?.data.results;

        return tvshows;
      }
    },
    {
      refetchOnMount: false,
      staleTime: 60 * 60 * 2, // 2 hours
    },
  );

  if (isLoading) {
    return (
      <CarouselSkeleton labels={periods} label={period} title={sectionTitle} />
    );
  }

  return (
    <section className="flex flex-col gap-3 mb-6 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-neutral-100 font-bold text-xl md:text-2xl">
          {sectionTitle}
        </span>
        <ToogleGroup.Root
          className="flex items-center w-fit"
          type="single"
          defaultValue={period}
          onValueChange={(value) => {
            if (value) setPeriod(value);
          }}
        >
          {periods.map((period, index) => {
            return (
              <ToogleGroup.Item
                className="bg-neutral-200 text-neutral-800 border border-neutral-800 first:rounded-tl first:rounded-bl last:rounded-br last:rounded-tr py-1 px-3 overflow-hidden radix-state-on:bg-emerald-500 radix-state-on:text-neutral-50"
                key={index}
                value={period}
              >
                {period}
              </ToogleGroup.Item>
            );
          })}
        </ToogleGroup.Root>
      </div>
      {variant === "movie" ? (
        <Carousel movies={data} />
      ) : (
        <Carousel tvshows={data} />
      )}
    </section>
  );
}
