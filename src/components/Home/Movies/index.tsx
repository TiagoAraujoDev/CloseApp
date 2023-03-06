"use client";

import { useState } from "react";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { Carousel } from "@/components/Carousel";

export interface MoviesProps {
  popular?: {
    id: number;
    original_title: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
  }[];
  topRated?: {
    id: number;
    original_title: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
  }[];
  upcoming?: {
    id: number;
    original_title: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
  }[];
  labels: string[];
}

export function MovieSection({
  popular,
  topRated,
  upcoming,
  labels,
}: MoviesProps) {
  const [label, setLabel] = useState(labels[0]);

  return (
    <section className="flex flex-col gap-3 mb-6 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-neutral-100 font-bold text-xl md:text-2xl">
          Movies
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
      {label === "popular" && <Carousel movies={popular} />}
      {label === "top_rated" && <Carousel movies={topRated} />}
      {label === "upcoming" && <Carousel movies={upcoming} />}
    </section>
  );
}
