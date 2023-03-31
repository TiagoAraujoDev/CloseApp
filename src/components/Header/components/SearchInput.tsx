"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

export function SearchInput() {
  const searchParams = useSearchParams()!;
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
    <div className="shadow-lg shadow-neutral-900 flex items-center justify-between flex-grow focus:border focus:border-emerald-500 rounded-full bg-neutral-800 px-4 py-2 sm:max-w-xs md:max-w-xl h-9 mx-auto">
      <input
        onKeyDown={(e) => handleSearch(searchValue, false, e)}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className="bg-transparent outline-none w-full placeholder:text-zinc-400 text-neutral-100"
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
