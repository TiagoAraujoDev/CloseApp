import type { Metadata } from "next";

import { UpcomingMoviesContainer } from "@/components/Movies/UpcomingContainer";

export const metadata: Metadata = {
  title: "Movies | Upcoming",
  description: "Page with the upcoming movies",
};

export default function MoviesUpcomingPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Upcoming movies
      </h1>
      <UpcomingMoviesContainer />
    </section>
  );
}
