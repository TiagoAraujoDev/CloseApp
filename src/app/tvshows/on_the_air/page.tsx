import { OnTheAirTvshowsContainer } from '@/components/Tvshows/OnTheAirContainer'

export default function TvshowsOnTheAirPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        On the air TV Shows
      </h1>
      <OnTheAirTvshowsContainer />
    </section>
  )
}
