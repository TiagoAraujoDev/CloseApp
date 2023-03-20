"use client";

import React, { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";

export function SearchInput() {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchValue);
  };

  return (
    <form
      className="hidden shadow-lg shadow-neutral-900 sm:flex items-center justify-between flex-grow focus:border focus:border-emerald-500 rounded-full bg-neutral-800 px-4 py-2 sm:max-w-xs md:max-w-xl h-9"
      onSubmit={handleSubmit}
    >
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className="bg-transparent outline-none w-full placeholder:text-zinc-400 text-neutral-100"
        placeholder="Search for movies and TV shows..."
      />
      <button>
        <RxMagnifyingGlass className="text-2xl text-emerald-500" />
      </button>
    </form>
  );
}
