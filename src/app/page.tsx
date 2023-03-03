import axios from 'axios'

import { OptionsMenu } from '@/components/ToogleGroup'
import { CardsCarousel } from '@/components/CardsCarousel'

const getData = async () => {
  const apiKey = process.env.API_KEY
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
  )
  const movies = response.data.results
  return movies
}

export default async function Home() {
  const movies = await getData()

  movies.map((movie: any) => {
    return {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
    }
  })

  return (
    <main className="max-w-screen-lg mx-auto px-6 py-4">
      <section className="flex flex-col gap-3 relative">
        <div className="flex items-center justify-between">
          <span className="text-neutral-100 font-bold text-3xl">Trending</span>
          <OptionsMenu labels={['Day', 'Week']} />
        </div>
        <CardsCarousel movies={movies} />
      </section>
    </main>
  )
}
