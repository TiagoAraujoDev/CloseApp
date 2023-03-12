import { MovieSection } from "@/components/Home/MoviesSection";
import { TrendingSection } from "@/components/Home/TrendingSection";
import { TvShowsSection } from "@/components/Home/TvShowsSection";

export default async function Home() {
  return (
    <main className="max-w-screen-lg mx-auto py-14 px-6 md:py-16">
      <TrendingSection variant="movie" />
      <TrendingSection variant="tv" />
      <MovieSection labels={["popular", "upcoming", "top_rated"]} />
      <TvShowsSection labels={["popular", "on_the_air", "top_rated"]} />
    </main>
  );
}
