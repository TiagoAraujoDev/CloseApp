import { PopularTvshowsContainer } from "@/components/Tvshows/PopularContainer";

export default function TvshowsPopularPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-sm md:text-2xl font-bold text-center my-6">
        Popular TV Shows
      </h1>
      <PopularTvshowsContainer />
    </section>
  );
}
