"use client";

import { memo, useCallback, useState } from "react";
import { useQuery } from "react-query";

import { getTvShows } from "@/lib/axios/requests/tvshows";

import Carousel from "@/components/Home/Carousel";
import CarouselSkeleton from "@/components/Loading/CarouselSkeleton";
import ToggleCarousel from "@/components/Home/ToggleCarousel";

interface TvShowsProps {
  labels: string[]
}

function TvShowsSection({ labels }: TvShowsProps) {
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

  const handleToggleClick = useCallback((label: string) => {
    setLabel(label);
  }, []);

  if (isLoading) {
    return <CarouselSkeleton labels={labels} label={label} title="TV Shows" />;
  }

  return (
    <section className="mb-10 flex flex-col gap-3 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-neutral-100 md:text-2xl">
          TV Shows
        </span>
        <ToggleCarousel
          labels={labels}
          currentLabel={label}
          onToggleChange={handleToggleClick}
        />
      </div>
      {data && <Carousel tvshows={data} />}
    </section>
  );
}

export default memo(TvShowsSection);
