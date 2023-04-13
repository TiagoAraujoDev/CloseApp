import type { Metadata } from 'next'

import { AiringTodayTvshowsContainer } from '@/components/Tvshows/AiringTodayContainer'

export const metadata: Metadata = {
  title: 'Tvshows | Airing today',
  description: 'Page with TV shows that are airing today',
}

export default function TvshowsAiringTodayPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        Airing today TV Shows
      </h1>
      <AiringTodayTvshowsContainer />
    </section>
  )
}
