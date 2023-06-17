"use client";

import { Movie } from "types";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useInfiniteQuery } from "react-query";
import { BsArrowDownCircle } from "react-icons/bs";

import { getMovies } from "@/lib/axios/requests/movies";

import { MovieCard } from "@/components/MovieCard";
import CardsSkeleton from "@/components/Loading/CardsSkeleton";

export function NowPlayingMoviesContainer() {
  const moviesQuery = useInfiniteQuery(
    "now_playing_movies_main",
    async ({ pageParam = 1 }) => {
      const response = await getMovies("now_playing", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage?.data.page < lastPage?.data.total_pages
          ? lastPage?.data.page + 1
          : null,
    },
  );

  if (moviesQuery.status === "loading") {
    return <CardsSkeleton />;
  } else if (moviesQuery.status === "error") {
    return (
      <div>
        Error: <span>{String(moviesQuery.error)}</span>
      </div>
    );
  }

  return (
    <div>
      {moviesQuery.data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </React.Fragment>
      ))}
      <div className="mx-auto w-fit">
        <button
          className="my-4"
          onClick={() => moviesQuery.fetchNextPage()}
          disabled={!moviesQuery.hasNextPage || moviesQuery.isFetchingNextPage}
        >
          {moviesQuery.isFetchingNextPage ? (
            <ImSpinner2 className="animate-spin text-3xl text-emerald-500" />
          ) : moviesQuery.hasNextPage ? (
            <BsArrowDownCircle className="animate-bounce text-3xl text-emerald-500" />
          ) : (
            <span className="text-base text-red-500">No more results</span>
          )}
        </button>
      </div>
    </div>
  );
}
