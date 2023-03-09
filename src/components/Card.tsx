import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/utils/formatDate";
import { Movie, TvShow } from "types";

import placeholderPoster from "../../public/placeholderPoster.jpg";

interface CardProps {
  movie?: Movie;
  tvshow?: TvShow;
}

export function Card({ movie, tvshow }: CardProps) {
  return (
    <>
      {movie ? (
        <div
          key={movie.id}
          className="min-w-[230px] border border-transparent hover:border hover:border-emerald-500 hover:rounded"
        >
          <Link href={`/${movie.id}`}>
            <Image
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.backdrop_path}`}
              alt="Cover"
              width={230}
              height={180}
              className="rounded-tl rounded-tr"
            />
            <div className="flex flex-col justify-center gap-2 h-20 bg-neutral-500 rounded-bl rounded-br p-2 text-sm font-medium">
              <h2 className="text-neutral-100">{movie.original_title}</h2>
              <span className="text-xs italic text-neutral-700">
                {formatDate(movie.release_date)}
              </span>
            </div>
          </Link>
        </div>
      ) : tvshow ? (
        <div
          key={tvshow.id}
          className="min-w-[230px] border border-transparent hover:border hover:border-emerald-500 hover:rounded"
        >
          <Link href={`/${tvshow.id}`}>
            <Image
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${tvshow.backdrop_path}`}
              alt="Cover"
              width={230}
              height={180}
              className="rounded-tl rounded-tr"
            />
            <div className="flex flex-col justify-center gap-2 h-20 bg-neutral-500 rounded-bl rounded-br p-2 text-sm font-medium">
              <h2 className="text-neutral-100">{tvshow.original_name}</h2>
              <span className="text-xs italic text-neutral-700">
                {formatDate(tvshow.first_air_date)}
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="min-w-[230px] border border-transparent hover:border hover:border-emerald-500 hover:rounded">
          <Image
            src={placeholderPoster}
            alt="Fallback"
            width={230}
            height={180}
            className="rounded-tl rounded-tr min-h-[342px]"
          />
          <div className="flex flex-col justify-center gap-2 h-20 bg-neutral-500 rounded-bl rounded-br p-2 text-sm font-medium">
            <h2 className="text-neutral-100">Show not found</h2>
            <span className="text-xs italic text-neutral-700">
              No date found
            </span>
          </div>
        </div>
      )}
    </>
  );
}
