'use client'

import { useContext } from 'react'
import { useMutation } from 'react-query'
import { AiFillStar, AiFillHeart } from 'react-icons/ai'
import { IoMdBookmark } from 'react-icons/io'

import { AuthContext } from '@/context/AuthContext'
import {
  addToWatchList,
  setAsFavorite,
} from '@/lib/axios/requests/interactions'

interface InteractableProps {
  voteAverage: number
  voteCount: number
  movieId?: number
  tvshowId?: number
}

interface MutationParams {
  mediaType: string
  id: number | undefined
  sessionId: string | undefined
}

export function Interactable({
  voteAverage,
  voteCount,
  movieId,
  tvshowId,
}: InteractableProps) {
  const { sessionId } = useContext(AuthContext)

  const mediaType = movieId ? 'movie' : 'tv'
  const id = movieId || tvshowId

  const { mutate: mutateWatchlist } = useMutation({
    mutationFn: (media: MutationParams) => addToWatchList(media),
  })

  const { mutate: mutateFavorite } = useMutation({
    mutationFn: (media: MutationParams) => setAsFavorite(media),
  })

  const handleAddToWatchlist = () => {
    const media = {
      mediaType,
      id,
      sessionId,
    }
    console.log(media)
    mutateWatchlist(media)
  }

  const handleAddAsFavorite = () => {
    const media = {
      mediaType,
      id,
      sessionId,
    }
    mutateFavorite(media)
  }

  const handleRating = () => {
    //  TODO:
    console.log('rated')
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
        <button
          onClick={handleAddToWatchlist}
          title="Add to watchlist!"
          className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
        >
          <IoMdBookmark className="text-xs sm:text-base text-emerald-500" />
        </button>
        <button
          onClick={handleAddAsFavorite}
          title="Mark as favorite!"
          className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110  cursor-pointer"
        >
          <AiFillHeart className="text-xs sm:text-base text-emerald-500" />
        </button>
        <button
          onClick={handleRating}
          title="Rate it!"
          className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
        >
          <AiFillStar className="text-xs sm:text-base text-emerald-500" />
        </button>
      </div>
    </div>
  )
}
