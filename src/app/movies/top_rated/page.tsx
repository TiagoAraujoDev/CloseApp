import type { Metadata } from "next";

import { TopRatedMoviesContainer } from "@/components/Movies/TopRatedContainer";

export const metadata: Metadata = {
  title: "Movies | Top Rated",
  description: "Page with the best rated movies",
};

export default function MoviesTopRatedPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Top rated movies
      </h1>
      <TopRatedMoviesContainer />
    </section>
  );
}
