import Image from 'next/image'
import Link from 'next/link'
import { Movie } from 'types'
import { AiFillStar } from 'react-icons/ai'

import { formatDate } from '@/utils/formatDate'
import { shortenText } from '@/utils/shortenText'

import placeholderPoster from '../../public/placeholderPoster.png'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      className="mb-3 flex w-full cursor-pointer items-center overflow-hidden rounded-lg border border-neutral-100 hover:border-emerald-500"
      href={`/movie/${movie.id}`}
    >
      {movie.poster_path ? (
        <Image
          className="mx-auto h-auto w-24 sm:w-32"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          width={185}
          height={278}
          alt=""
        />
      ) : (
        <Image
          className="mx-auto h-auto w-24 sm:w-32"
          src={placeholderPoster}
          width={185}
          height={278}
          alt=""
        />
      )}
      <div className="flex-1 py-2 px-2">
        <h1 className="text-base font-bold text-neutral-100 md:text-lg">
          {movie.title}
        </h1>
        <span className="block text-sm italic text-neutral-400 md:text-base">
          {formatDate(movie.release_date)}
        </span>
        <span className="hidden text-base font-normal text-neutral-100 md:block">
          {shortenText(movie.overview)}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <AiFillStar size={16} className="mr-1 text-yellow-500" />
            <span className="text-sm font-normal text-neutral-200 md:text-base">
              {movie.vote_average.toFixed(2)}
            </span>
          </div>
          <span className="block h-1 w-1 rounded-full bg-neutral-200"></span>
          <span className="text-sm font-normal text-neutral-200 md:text-base">
            {movie.vote_count} votes
          </span>
        </div>
      </div>
    </Link>
  )
}
