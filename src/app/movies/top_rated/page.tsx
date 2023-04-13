import type { Metadata } from 'next'

import { TopRatedMoviesContainer } from '@/components/Movies/TopRatedContainer'

export const metadata: Metadata = {
  title: 'Movies | Top Rated',
  description: 'Page with the best rated movies',
}

export default function MoviesTopRatedPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        Top rated movies
      </h1>
      <TopRatedMoviesContainer />
    </section>
  )
}
