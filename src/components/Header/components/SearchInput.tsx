"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

export function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = useCallback(
    (
      searchValue: string,
      isClickEvent: boolean,
      event?: React.KeyboardEvent,
    ) => {
      if (!searchValue) return;

      if (event?.key === "Enter") {
        router.push("/search" + "?" + createQueryString("terms", searchValue));
      } else if (isClickEvent) {
        router.push("/search" + "?" + createQueryString("terms", searchValue));
      }
    },
    [createQueryString, router],
  );

  return (
    <div className="mx-auto flex h-9 flex-grow items-center justify-between rounded-full bg-neutral-800 py-2 px-4 shadow-lg shadow-neutral-900 focus:border focus:border-emerald-500 sm:max-w-xs md:max-w-xl">
      <input
        onKeyDown={(e) => handleSearch(searchValue, false, e)}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className="w-full bg-transparent text-neutral-100 outline-none placeholder:text-zinc-400"
        placeholder="Search for movies and TV shows..."
      />
      <button
        className="disabled:cursor-not-allowed"
        disabled={!searchValue}
        onClick={() => handleSearch(searchValue, true)}
      >
        <RxMagnifyingGlass className="text-2xl text-emerald-500" />
      </button>
    </div>
  );
}
