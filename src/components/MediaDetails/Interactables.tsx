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
          <AiFillStar className="text-xs sm:text-base text-yellow-400 md:text-lg flex items-center justify-center" />
          <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
            {voteAverage.toFixed(2)}
          </span>
          <span className="text-lg">&middot;</span>
          <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
            {voteCount} votes
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="Add to watchlist!"
            className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
          >
            <BsBookmark className="text-xs sm:text-sm text-emerald-500" />
          </button>
          <button
            title="Mark as favorite!"
            className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110  cursor-pointer"
          >
            <AiOutlineHeart className="text-xs sm:text-base text-emerald-500" />
          </button>
          <button
            title="Rate it!"
            className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
          >
            <AiFillStar className="text-xs sm:text-base text-emerald-500" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 sm:mb-2">
      <div className="flex items-center gap-1">
        <AiFillStar className="text-xs sm:text-base text-yellow-400 md:text-lg flex items-center justify-center" />
        <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
          {voteAverage.toFixed(2)}
        </span>
        <span className="text-lg">&middot;</span>
        <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
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
