"use client";

import { Movie, TvShow } from "types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

import { search } from "@/lib/axios/requests/search";

import { MovieCard } from "@/components/Search/MovieCard";
import { TvShowCard } from "@/components/Search/TvShowCard";

export function SearchDisplay() {
  const searchParams = useSearchParams();

  const [mediaType, setMediaType] = useState("movie");
  const [movies, setMovies] = useState<Movie[]>();
  const [movieResultCount, setMovieResultCount] = useState(0);
  const [tvshowResultCount, setTvshowResultCount] = useState(0);
  const [tvshows, setTvshows] = useState<TvShow[]>();
  const [query, setQuery] = useState<string | null>("");

  const searchQuery = searchParams ? searchParams.get("terms") : null;

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  console.log("render");

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
      console.log(pageParam);
      const response = await search(query, "tv", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage, _pages) => lastPage?.data.page + 1,
    },
  );

  // return (
  //   <div>
  //     {moviesQuery.data &&
  //       moviesQuery.data.pages.map((page, i) => {
  //         return (
  //           <div key={i}>
  //             {page &&
  //               page.data.results.map((item: any, i: number) => {
  //                 return (
  //                   <div className={`text-white`} key={i}>
  //                     {item.title}
  //                   </div>
  //                 );
  //               })}
  //           </div>
  //         );
  //       })}
  //     <div>
  //       <button
  //         className="bg-emerald-500 text-neutral-100 px-2 rounded"
  //         onClick={() => moviesQuery.fetchNextPage()}
  //         type="button"
  //       >
  //         {moviesQuery.isFetchingNextPage
  //           ? "Loading more..."
  //           : moviesQuery.hasNextPage
  //             ? "Load More"
  //             : "Nothing more to load"}
  //       </button>
  //     </div>
  //   </div>
  // );

  if (moviesQuery.status === "loading" || tvshowsQuery.status === "loading") {
    return <div>loading</div>;
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
             ${mediaType === "movie"
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
              {movies ? movieResultCount : "0"}
            </span>
          </button>
          <button
            className={`flex items-center justify-between p-2 text-white border-gray-300 
             ${mediaType === "tv"
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
              {tvshows ? tvshowResultCount : "0"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
