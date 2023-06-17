import type { Metadata } from "next";

import { AiringTodayTvshowsContainer } from "@/components/Tvshows/AiringTodayContainer";

export const metadata: Metadata = {
  title: "Tvshows | Airing today",
  description: "Page with TV shows that are airing today",
};

export default function TvshowsAiringTodayPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Airing today TV Shows
      </h1>
      <AiringTodayTvshowsContainer />
    </section>
  );
}
