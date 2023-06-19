"use client";

import { TvShow } from "types";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { ImSpinner2 } from "react-icons/im";
import { BsArrowDownCircle } from "react-icons/bs";

import { getTvShows } from "@/lib/axios/requests/tvshows";

import { TvShowCard } from "@/components/TvShowCard";
import CardsSkeleton from "@/components/Loading/CardsSkeleton";

export function TopRatedTvshowsContainer() {
  const tvshowsQuery = useInfiniteQuery(
    "top_rated_tvshows_main",
    async ({ pageParam = 1 }) => {
      const response = await getTvShows("top_rated", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage?.data.page < lastPage?.data.total_pages
          ? lastPage?.data.page + 1
          : null,
    },
  );

  if (tvshowsQuery.status === "loading") {
    return <CardsSkeleton />;
  } else if (tvshowsQuery.status === "error") {
    return (
      <div>
        Error: <span>{String(tvshowsQuery.error)}</span>
      </div>
    );
  }

  return (
    <div>
      {tvshowsQuery.data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group?.data.results.map((tvshow: TvShow) => (
            <TvShowCard key={tvshow.id} tvshow={tvshow} />
          ))}
        </React.Fragment>
      ))}
      <div className="mx-auto w-fit">
        <button
          className="my-4"
          onClick={() => tvshowsQuery.fetchNextPage()}
          disabled={
            !tvshowsQuery.hasNextPage || tvshowsQuery.isFetchingNextPage
          }
        >
          {tvshowsQuery.isFetchingNextPage ? (
            <ImSpinner2 className="animate-spin text-3xl text-emerald-500" />
          ) : tvshowsQuery.hasNextPage ? (
            <BsArrowDownCircle className="animate-bounce text-3xl text-emerald-500" />
          ) : (
            <span className="text-base text-red-500">No more results</span>
          )}
        </button>
      </div>
    </div>
  );
}
