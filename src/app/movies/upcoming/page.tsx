import type { Metadata } from 'next'

import { UpcomingMoviesContainer } from '@/components/Movies/UpcomingContainer'

export const metadata: Metadata = {
  title: 'Movies | Upcoming',
  description: 'Page with the upcoming movies',
}

export default function MoviesUpcomingPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        Upcoming movies
      </h1>
      <UpcomingMoviesContainer />
    </section>
  )
}
