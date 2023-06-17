import type { Metadata } from "next";

import { SearchInput } from "@/components/Header/components/SearchInput";
import MovieSection from "@/components/Home/MoviesSection";
import TrendingSection from "@/components/Home/TrendingSection";
import TvShowsSection from "@/components/Home/TvShowsSection";
import { getConfig } from "@/lib/axios/requests/search";

export const metadata: Metadata = {
  title: "CloseApp | Home",
  description: "Home page in CloseApp",
};

export default async function Home() {
  const config = await getConfig();
  console.log(config?.data);
  return (
    <main className="mx-auto max-w-screen-lg px-6 md:py-16">
      <div className="my-4 block sm:hidden">
        <SearchInput />
      </div>
      <TrendingSection periods={["week", "day"]} variant="movie" />
      <TrendingSection periods={["week", "day"]} variant="tv" />
      <MovieSection labels={["popular", "upcoming", "top_rated"]} />
      <TvShowsSection labels={["popular", "on_the_air", "top_rated"]} />
    </main>
  );
}
