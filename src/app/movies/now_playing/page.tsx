import { NowPlayingMoviesContainer } from '@/components/Movies/NowPlayingContainer'

export default function MoviesNowPlayingPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        Now playing movies
      </h1>
      <NowPlayingMoviesContainer />
    </section>
  )
}
