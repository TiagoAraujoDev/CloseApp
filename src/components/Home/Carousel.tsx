import { Movie, TvShow } from "types";

import { Card } from "../Card";

interface CarouselProps {
  movies?: Movie[];
  tvshows?: TvShow[];
}

export function Carousel({ movies, tvshows }: CarouselProps) {
  return (
    <div className="flex justify-between gap-2 w-full pb-3 overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
      {movies &&
        movies.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        })}
      {tvshows &&
        tvshows.map((tvshow) => {
          return <Card key={tvshow.id} tvshow={tvshow} />;
        })}
    </div>
  );
}
