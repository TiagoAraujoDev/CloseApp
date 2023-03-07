"use client";

import { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { Carousel } from "@/components/Carousel";
import { MovieType, TrendingContext, TVType } from "@/context/TrendingContext";
import { CarouselSkeleton } from "@/components/Loding/CarouselSkeleton";

interface TrendingProps {
  type: string;
}

export function Trending({ type }: TrendingProps) {
  const { getTrending } = useContext(TrendingContext);
  const sectionTitle = `Trending ${type}`;

  const periods = ["day", "week"];
  const [period, setPeriod] = useState(periods[0]);

  const queryKey = `${type}-${period}`;

  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const response = await getTrending(type, period);
      if (type === "movie") {
        const movieResponse = response?.data.results.map((item: MovieType) => {
          return {
            id: item.id,
            original_title: item.original_title,
            release_date: item.release_date,
            backdrop_path: item.backdrop_path,
            poster_path: item.poster_path,
          };
        });
        return movieResponse;
      } else {
        const tvResponse = response?.data.results.map((item: TVType) => {
          return {
            id: item.id,
            original_name: item.original_name,
            first_air_date: item.first_air_date,
            backdrop_path: item.backdrop_path,
            poster_path: item.poster_path,
          };
        });
        return tvResponse;
      }
    },
    {
      refetchOnMount: false,
      staleTime: 60 * 60 * 2, // 2 hours
    },
  );

  if (isLoading) {
    return <CarouselSkeleton labels={periods} label={period} />;
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
      {type === "movie" ? (
        <Carousel movies={data} />
      ) : (
        <Carousel tvshows={data} />
      )}
    </section>
  );
}
