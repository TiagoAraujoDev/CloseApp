import { AiFillStar } from 'react-icons/ai'

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
  const mediaType = movieId ? 'movie' : 'tv'
  const id = movieId || tvshowId

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
        <WatchlistButton mediaId={id} mediaType={mediaType} />
        <FavoriteButton mediaId={id} mediaType={mediaType} />
        <RatingButton mediaId={id} mediaType={mediaType} />
      </div>
    </div>
  )
}
