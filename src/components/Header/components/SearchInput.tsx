"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

export function SearchInput() {
  const searchParams = useSearchParams()!;

  const [searchValue, setSearchValue] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="hidden shadow-lg shadow-neutral-900 sm:flex items-center justify-between flex-grow focus:border focus:border-emerald-500 rounded-full bg-neutral-800 px-4 py-2 sm:max-w-xs md:max-w-xl h-9">
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className="bg-transparent outline-none w-full placeholder:text-zinc-400 text-neutral-100"
        placeholder="Search for movies and TV shows..."
      />
      <Link href={"/search" + "?" + createQueryString("terms", searchValue)}>
        <RxMagnifyingGlass className="text-2xl text-emerald-500" />
      </Link>
    </div>
  );
}
