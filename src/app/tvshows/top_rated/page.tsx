import type { Metadata } from "next";

import { TopRatedTvshowsContainer } from "@/components/Tvshows/TopRatedContainer";

export const metadata: Metadata = {
  title: "Tvshows | Top rated",
  description: "Page with the top rated TV shows",
};

export default function TvshowsTopRatedPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Top rated TV Shows
      </h1>
      <TopRatedTvshowsContainer />
    </section>
  );
}
