"use client";

import React, { useEffect, useState } from "react";
import { Movie, TvShow } from "types";
import { useInfiniteQuery } from "react-query";
import { useSearchParams } from "next/navigation";

import { search } from "@/lib/axios/requests/search";

import { MovieCard } from "@/components/Search/MovieCard";
import { TvShowCard } from "@/components/Search/TvShowCard";

export function SearchDisplay() {
  const searchParams = useSearchParams();

  const [mediaType, setMediaType] = useState("movie");
  const [movieResultCount, setMovieResultCount] = useState(0);
  const [tvshowResultCount, setTvshowResultCount] = useState(0);
  const [query, setQuery] = useState<string | null>("");

  const searchQuery = searchParams ? searchParams.get("terms") : null;

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const moviesQuery = useInfiniteQuery(
    "movies_search_" + query,
    async ({ pageParam = 1 }) => {
      const response = await search(query, "movie", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage, _pages) => lastPage?.data.page + 1,
    },
  );

  const tvshowsQuery = useInfiniteQuery(
    "tvshows_search_" + query,
    async ({ pageParam = 1 }) => {
      const response = await search(query, "tv", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage, _pages) => lastPage?.data.page + 1,
    },
  );

  useEffect(() => {
    if (moviesQuery.isSuccess && tvshowsQuery.isSuccess) {
      setMovieResultCount(moviesQuery.data?.pages[0]?.data.total_results);
      setTvshowResultCount(tvshowsQuery.data?.pages[0]?.data.total_results);
    }
    // eslint-disable-next-line
  }, [moviesQuery, tvshowsQuery]);

  if (moviesQuery.status === "loading" || tvshowsQuery.status === "loading") {
    return <div className="text-neutral-100 text-5xl">loading...</div>;
  } else if (
    moviesQuery.status === "error" ||
    tvshowsQuery.status === "error"
  ) {
    return (
      <div>
        Error: <span>{String(moviesQuery.error || tvshowsQuery.error)}</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col rounded bg-neutral-500 my-4 overflow-hidden">
        <div className="bg-emerald-500 p-4 flex items-center justify-center">
          <h2 className="text-base font-semibold text-neutral-50">
            Search results
          </h2>
        </div>
        <div className="flex flex-col py-2">
          <button
            className={`flex items-center justify-between p-2 text-white border-gray-300 
             ${
               mediaType === "movie"
                 ? "bg-emerald-500 font-semibold"
                 : "hover:bg-neutral-600"
             }`}
            onClick={() => setMediaType("movie")}
          >
            Movie
            <span
              className={`text-[10px] text-neutral-800 rounded bg-neutral-200 px-2 py-1 font-medium  
               flex items-center justify-center leading-none`}
            >
              {movieResultCount || "0"}
            </span>
          </button>
          <button
            className={`flex items-center justify-between p-2 text-white border-gray-300 
             ${
               mediaType === "tv"
                 ? "bg-emerald-500 font-semibold"
                 : "hover:bg-neutral-600"
             }`}
            onClick={() => setMediaType("tv")}
          >
            Tv
            <span
              className={`text-[10px] text-neutral-800 rounded bg-neutral-200 px-2 py-1 font-medium  
               flex items-center justify-center leading-none`}
            >
              {tvshowResultCount || "0"}
            </span>
          </button>
        </div>
      </div>
      <div>
        {mediaType === "movie" ? (
          <>
            {moviesQuery.data?.pages.map((group, i) => (
              <div key={i}>
                {group?.data.results.map((movie: Movie, index: number) => (
                  <MovieCard key={index} movie={movie} />
                ))}
              </div>
            ))}
            <div>
              <button
                onClick={() => moviesQuery.fetchNextPage()}
                disabled={
                  !moviesQuery.hasNextPage || moviesQuery.isFetchingNextPage
                }
              >
                {moviesQuery.isFetchingNextPage
                  ? "Loading more..."
                  : moviesQuery.hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {moviesQuery.isFetching && !moviesQuery.isFetchingNextPage
                ? "Fetching..."
                : null}
            </div>
          </>
        ) : (
          <>
            {tvshowsQuery.data?.pages.map((group, i) => (
              <div key={i}>
                {group?.data.results.map((tvshow: TvShow, index: number) => (
                  <TvShowCard key={index} tvshow={tvshow} />
                ))}
              </div>
            ))}
            <div>
              <button
                onClick={() => tvshowsQuery.fetchNextPage()}
                disabled={
                  !tvshowsQuery.hasNextPage || tvshowsQuery.isFetchingNextPage
                }
              >
                {tvshowsQuery.isFetchingNextPage
                  ? "Loading more..."
                  : tvshowsQuery.hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {tvshowsQuery.isFetching && !tvshowsQuery.isFetchingNextPage
                ? "Fetching..."
                : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}
