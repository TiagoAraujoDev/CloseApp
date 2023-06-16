import type { Metadata } from 'next'

import { PopularTvshowsContainer } from '@/components/Tvshows/PopularContainer'

export const metadata: Metadata = {
  title: 'Tvshows | Popular',
  description: 'Page with current popular TV shows',
}

export default function TvshowsPopularPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Popular TV Shows
      </h1>
      <PopularTvshowsContainer />
    </section>
  )
}
