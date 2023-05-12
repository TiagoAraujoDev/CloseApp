import type { Metadata } from 'next'

import { SearchInput } from '@/components/Header/components/SearchInput'
import { MovieSection } from '@/components/Home/MoviesSection'
import { TrendingSection } from '@/components/Home/TrendingSection'
import { TvShowsSection } from '@/components/Home/TvShowsSection'

export const metadata: Metadata = {
  title: 'CloseApp | Home',
  description: 'Home page in CloseApp',
}

export default async function Home() {
  return (
    <main className="max-w-screen-lg mx-auto px-6 md:py-16">
      <div className="sm:hidden block my-4">
        <SearchInput />
      </div>
      <TrendingSection periods={['week', 'day']} variant="movie" />
      <TrendingSection periods={['week', 'day']} variant="tv" />
      <MovieSection labels={['popular', 'upcoming', 'top_rated']} />
      <TvShowsSection labels={['popular', 'on_the_air', 'top_rated']} />
    </main>
  )
}
