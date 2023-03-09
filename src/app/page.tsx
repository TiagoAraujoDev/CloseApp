import { MovieSection } from "@/components/Home/MoviesSection";
import { TrendingSection } from "@/components/Home/TrendingSection";
import { TVSection } from "@/components/Home/TvShowsSection";

export default async function Home() {
  return (
    <main className="max-w-screen-lg mx-auto px-6 py-16">
      <TrendingSection variant="movie" />
      <TrendingSection variant="tv" />
      <MovieSection labels={["popular", "upcoming", "top_rated"]} />
      <TVSection labels={["popular", "on_the_air", "top_rated"]} />
    </main>
  );
}
