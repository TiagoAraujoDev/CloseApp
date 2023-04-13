import type { Metadata } from 'next'

import { TopRatedTvshowsContainer } from '@/components/Tvshows/TopRatedContainer'

export const metadata: Metadata = {
  title: 'Tvshows | Top rated',
  description: 'Page with the top rated TV shows',
}

export default function TvshowsTopRatedPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        Top rated TV Shows
      </h1>
      <TopRatedTvshowsContainer />
    </section>
  )
}
