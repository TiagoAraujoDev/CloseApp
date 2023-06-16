'use client'

import { useContext } from 'react'
import { BsBookmark } from 'react-icons/bs'
import { AiFillStar, AiOutlineHeart } from 'react-icons/ai'

import { AuthContext } from '@/context/AuthContext'

import { RatingButton } from '@/components/MediaDetails/RatingButton'
import { WatchlistButton } from '@/components/MediaDetails/WatchlistButton'
import { FavoriteButton } from '@/components/MediaDetails/FavoriteButton'

interface InteractableProps {
  voteAverage: number
  voteCount: number
  movieId?: number
  tvshowId?: number
}

export function Interactables({
  voteAverage,
  voteCount,
  movieId,
  tvshowId,
}: InteractableProps) {
  const { sessionId } = useContext(AuthContext)
  const mediaType = movieId ? 'movie' : 'tv'
  const id = movieId || tvshowId

  if (!sessionId) {
    return (
      <div className="flex items-center gap-2 sm:mb-2">
        <div className="flex items-center gap-1">
          <AiFillStar className="flex items-center justify-center text-xs text-yellow-400 sm:text-base md:text-lg" />
          <span className="flex items-center justify-center text-xs sm:text-base md:text-lg">
            {voteAverage.toFixed(2)}
          </span>
          <span className="text-lg">&middot;</span>
          <span className="flex items-center justify-center text-xs sm:text-base md:text-lg">
            {voteCount} votes
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="Add to watchlist!"
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
          >
            <BsBookmark className="text-xs text-emerald-500 sm:text-sm" />
          </button>
          <button
            title="Mark as favorite!"
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
          >
            <AiOutlineHeart className="text-xs text-emerald-500 sm:text-base" />
          </button>
          <button
            title="Rate it!"
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
          >
            <AiFillStar className="text-xs text-emerald-500 sm:text-base" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 sm:mb-2">
      <div className="flex items-center gap-1">
        <AiFillStar className="flex items-center justify-center text-xs text-yellow-400 sm:text-base md:text-lg" />
        <span className="flex items-center justify-center text-xs sm:text-base md:text-lg">
          {voteAverage.toFixed(2)}
        </span>
        <span className="text-lg">&middot;</span>
        <span className="flex items-center justify-center text-xs sm:text-base md:text-lg">
          {voteCount} votes
        </span>
      </div>
      <div className="flex items-center gap-2">
        <WatchlistButton
          sessionId={sessionId}
          mediaId={id}
          mediaType={mediaType}
        />
        <FavoriteButton
          sessionId={sessionId}
          mediaId={id}
          mediaType={mediaType}
        />
        <RatingButton
          mediaId={id}
          mediaType={mediaType}
          sessionId={sessionId}
        />
      </div>
    </div>
  )
}
