import type { Metadata } from 'next'

import { OnTheAirTvshowsContainer } from '@/components/Tvshows/OnTheAirContainer'

export const metadata: Metadata = {
  title: 'Tvshows | On the air',
  description: 'Page with TV shows that are currently on the air',
}

export default function TvshowsOnTheAirPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        On the air TV Shows
      </h1>
      <OnTheAirTvshowsContainer />
    </section>
  )
}
