"use client";

import { useInfiniteQuery } from "react-query";

import { TvShow } from "types";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { BsArrowDownCircle } from "react-icons/bs";

import { getTvShows } from "@/lib/axios/requests/tvshows";

import { TvShowCard } from "../TvShowCard";

export function AiringTodayTvshowsContainer() {
  const tvshowsQuery = useInfiniteQuery(
    "airing_today_tvshows_main",
    async ({ pageParam = 1 }) => {
      const response = await getTvShows("airing_today", pageParam);

      return response;
    },
    {
      getNextPageParam: (lastPage, _pages) =>
        lastPage?.data.page < lastPage?.data.total_pages
          ? lastPage?.data.page + 1
          : null,
    },
  );

  if (tvshowsQuery.status === "loading") {
    return <h1 className="text-white text-xl">loading</h1>;
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
      <div className="w-fit mx-auto">
        <button
          className="my-4"
          onClick={() => tvshowsQuery.fetchNextPage()}
          disabled={
            !tvshowsQuery.hasNextPage || tvshowsQuery.isFetchingNextPage
          }
        >
          {tvshowsQuery.isFetchingNextPage ? (
            <ImSpinner2 className="text-emerald-500 text-3xl animate-spin" />
          ) : tvshowsQuery.hasNextPage ? (
            <BsArrowDownCircle className="text-emerald-500 text-3xl animate-bounce" />
          ) : (
            <span className="text-red-500 text-base">No more results</span>
          )}
        </button>
      </div>
    </div>
  );
}
