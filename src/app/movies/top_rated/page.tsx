import { TopRatedMoviesContainer } from "@/components/Movies/TopRatedContainer";

export default function MoviesTopRatedPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-sm md:text-2xl font-bold text-center my-6">
        Top rated movies
      </h1>
      <TopRatedMoviesContainer />
    </section>
  );
}
