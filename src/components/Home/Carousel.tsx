import { memo } from 'react'
import { Movie, TvShow } from 'types'

import Card from './Card'

interface CarouselProps {
  movies?: Movie[]
  tvshows?: TvShow[]
}

function Carousel({ movies, tvshows }: CarouselProps) {
  return (
    <div className="flex w-full justify-between gap-2 overflow-auto pb-3 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-emerald-500">
      {movies &&
        movies.map((movie) => {
          return <Card key={movie.id} movie={movie} />
        })}
      {tvshows &&
        tvshows.map((tvshow) => {
          return <Card key={tvshow.id} tvshow={tvshow} />
        })}
    </div>
  )
}

export default memo(Carousel)
