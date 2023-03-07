import Image from "next/image";
import Link from "next/link";

interface CarouselProps {
  movies?: {
    id: number;
    original_title: string;
    release_date: string;
    backdrop_path: string;
    poster_path: string;
  }[];
  tvshows?: {
    id: number;
    original_name: string;
    first_air_date: string;
    backdrop_path: string;
    poster_path: string;
  }[];
}

export function Carousel({ movies, tvshows }: CarouselProps) {
  return (
    <div className="flex justify-between gap-2 w-full pb-3 overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
      {movies &&
        movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="min-w-[230px] border border-transparent hover:border hover:border-emerald-500 hover:rounded"
            >
              <Link href={`/${movie.id}`}>
                <Image
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`}
                  alt="Movie cover"
                  width={230}
                  height={180}
                  className="rounded-tl rounded-tr"
                />
                <div className="flex flex-col justify-center gap-2 h-20 bg-neutral-500 rounded-bl rounded-br p-2 text-sm font-medium">
                  <h2 className="text-neutral-100">{movie.original_title}</h2>
                  <span className="text-xs italic text-neutral-700">
                    {movie.release_date}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      {tvshows &&
        tvshows.map((tvshow) => {
          return (
            <div
              key={tvshow.id}
              className="min-w-[230px] border border-transparent hover:border hover:border-emerald-500 hover:rounded"
            >
              <Link href={`/${tvshow.id}`}>
                <Image
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${tvshow.backdrop_path}`}
                  alt="Movie cover"
                  width={230}
                  height={180}
                  className="rounded-tl rounded-tr"
                />
                <div className="flex flex-col justify-center gap-2 h-20 bg-neutral-500 rounded-bl rounded-br p-2 text-sm font-medium">
                  <h2 className="text-neutral-100">{tvshow.original_name}</h2>
                  <span className="text-xs italic text-neutral-700">
                    {tvshow.first_air_date}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
