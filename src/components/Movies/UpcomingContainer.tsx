"use client";

import { useInfiniteQuery } from "react-query";

import { Movie } from "types";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsArrowDownCircle } from "react-icons/bs";

import { getMovies } from "@/lib/axios/requests/movies";

import { MovieCard } from "@/components/MovieCard";
import { CardsSkeleton } from "../Loading/CardsSkeleton";

export function UpcomingMoviesContainer() {
  const moviesQuery = useInfiniteQuery(
    "upcoming_movies_main",
    async ({ pageParam = 1 }) => {
      const response = await getMovies("upcoming", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage, _pages) =>
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
      <div className="w-fit mx-auto">
        <button
          className="my-4"
          onClick={() => moviesQuery.fetchNextPage()}
          disabled={!moviesQuery.hasNextPage || moviesQuery.isFetchingNextPage}
        >
          {moviesQuery.isFetchingNextPage ? (
            <ImSpinner2 className="text-emerald-500 text-3xl animate-spin" />
          ) : moviesQuery.hasNextPage ? (
            <BsArrowDownCircle className="text-emerald-500 text-3xl animate-bounce" />
          ) : (
            <span className="text-red-500 text-base">No more results</span>
          )}
        </button>
      </div>
    </div>
  );
}
