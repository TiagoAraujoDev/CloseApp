import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie, TvShow } from "types";

import { formatDate } from "@/utils/formatDate";

import placeholderPoster from "../../../public/placeholderPoster.png";

interface CardProps {
  movie?: Movie
  tvshow?: TvShow
}

function Card({ movie, tvshow }: CardProps) {
  return (
    <>
      {movie ? (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="flex min-w-[230px] flex-col border border-transparent hover:rounded hover:border hover:border-emerald-500"
        >
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="Cover"
              width={230}
              height={345}
              className="flex-1 rounded-tl rounded-tr object-contain"
            />
          ) : (
            <Image
              src={placeholderPoster}
              alt=""
              width={230}
              height={345}
              className="flex-1 rounded-tl rounded-tr object-contain"
            />
          )}
          <div className="flex h-20 flex-col justify-center gap-2 rounded-bl rounded-br bg-neutral-500 p-2 text-sm font-medium">
            <h2 className="text-neutral-100">{movie.original_title}</h2>
            <span className="text-xs italic text-neutral-700">
              {formatDate(movie.release_date)}
            </span>
          </div>
        </Link>
      ) : tvshow ? (
        <Link
          href={`/tvshow/${tvshow.id}`}
          key={tvshow.id}
          className="flex min-w-[230px] flex-col border border-transparent hover:rounded hover:border hover:border-emerald-500"
        >
          {tvshow.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original${tvshow.poster_path}`}
              alt=""
              width={230}
              height={345}
              className="flex-1 rounded-tl rounded-tr object-contain"
            />
          ) : (
            <Image
              src={placeholderPoster}
              alt=""
              width={230}
              height={345}
              className="flex-1 rounded-tl  rounded-tr object-contain"
            />
          )}
          <div className="flex h-20 flex-col justify-center gap-2 rounded-bl rounded-br bg-neutral-500 p-2 text-sm font-medium">
            <h2 className="text-neutral-100">{tvshow.original_name}</h2>
            <span className="text-xs italic text-neutral-700">
              {formatDate(tvshow.first_air_date)}
            </span>
          </div>
        </Link>
      ) : (
        <div className="min-w-[230px] border border-transparent hover:rounded hover:border hover:border-emerald-500">
          <Image
            src={placeholderPoster}
            alt=""
            width={230}
            height={345}
            className="flex-1 rounded-tl rounded-tr object-contain"
          />
          <div className="flex h-20 flex-col justify-center gap-2 rounded-bl rounded-br bg-neutral-500 p-2 text-sm font-medium">
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

export default memo(Card);
