import type { Metadata } from 'next'

import { PopularMoviesContainer } from '@/components/Movies/PopularContainer'

export const metadata: Metadata = {
  title: 'Movies | Popular',
  description: 'Page with the most popular movies',
}

export default function MoviesPopularPage() {
  return (
    <section className="mx-auto min-h-screen max-w-5xl px-16">
      <h1 className="my-6 text-center text-xl font-bold text-neutral-100 md:text-2xl">
        Popular movies
      </h1>
      <PopularMoviesContainer />
    </section>
  )
}
