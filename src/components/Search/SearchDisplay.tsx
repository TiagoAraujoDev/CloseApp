"use client";

import { Movie, TvShow } from "types";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { search } from "@/utils/requests/movies";

export function SearchDisplay({
  query,
}: {
  [key: string]: string | string[] | undefined;
}) {
  const [mediaType, setMediaType] = useState("movie");
  const [movies, setMovies] = useState<Movie[]>();
  const [tvshows, setTvshows] = useState<TvShow[]>();

  console.log(query);

  const { data, isLoading } = useQuery(
    mediaType + "_search",
    async () => {
      const response = await search(query, mediaType);
      const results = response?.data.results;

      return results;
    },
    {
      refetchOnMount: true,
      staleTime: 60 * 60 * 2, // 2 hours
    },
  );

  useEffect(() => {
    if (mediaType === "movie") {
      setMovies(data);
    } else {
      setTvshows(data);
    }
  }, [data, mediaType]);

  if (isLoading) return <div>loading</div>;

  console.log(movies);
  console.log(tvshows);

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <button
          className="text-white border-gray-300"
          onClick={() => setMediaType("movie")}
        >
          movie
        </button>
        <button
          className="text-white border-gray-300"
          onClick={() => setMediaType("tv")}
        >
          tv
        </button>
      </div>
      {mediaType === "movie" ? (
        <div className="text-white">
          {movies &&
            movies.map((movie) => {
              return <div key={movie.id}>{movie.title}</div>;
            })}
        </div>
      ) : (
        <div className="text-white">
          {tvshows &&
            tvshows.map((tvshow) => {
              return <div key={tvshow.id}>{tvshow.original_name}</div>;
            })}
        </div>
      )}
    </>
  );
}
