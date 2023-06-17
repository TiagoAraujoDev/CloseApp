import type { Metadata } from "next";

import { NowPlayingMoviesContainer } from "@/components/Movies/NowPlayingContainer";

export const metadata: Metadata = {
  title: "Movies | Now playing",
  description: "Page with the movies that are playing now",
};

export default function MoviesNowPlayingPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Now playing movies
      </h1>
      <NowPlayingMoviesContainer />
    </section>
  );
}
