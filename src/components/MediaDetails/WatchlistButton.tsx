'use client'

import { useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

import { AuthContext } from '@/context/AuthContext'
import {
  addToWatchList,
  getAccountState,
} from '@/lib/axios/requests/interactions'

interface MutationParams {
  mediaType: string
  mediaId: number | undefined
  sessionId: string | undefined
}

interface WatchlistButtonProps {
  mediaId: number | undefined
  mediaType: string
}

export const WatchlistButton = ({
  mediaType,
  mediaId,
}: WatchlistButtonProps) => {
  const { sessionId } = useContext(AuthContext)

  const { data: isInWatchlist, isLoading } = useQuery(
    `${mediaType}_${mediaId}_watchlist`,
    async () => {
      const response = await getAccountState({ mediaId, mediaType, sessionId })

      return response?.data.watchlist
    },
    {
      notifyOnChangeProps: ['data'],
      refetchOnMount: false,
    },
  )

  const { mutate: mutateWatchlist } = useMutation({
    mutationFn: (media: MutationParams) => addToWatchList(media),
  })

  const handleAddToWatchlist = () => {
    const media = {
      mediaType,
      mediaId,
      sessionId,
    }

    mutateWatchlist(media)
  }

  if (isLoading) {
    return (
      <button
        disabled={true}
        title="Add to watchlist!"
        className="bg-neutral-700 text-sm w-4 h-4 sm:text-lg sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
      >
        <BsBookmark className="text-xs sm:text-base text-emerald-500" />
      </button>
    )
  }

  return (
    <button
      onClick={handleAddToWatchlist}
      title="Add to watchlist!"
      className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
    >
      {isInWatchlist ? (
        <BsBookmarkFill className="text-xs sm:text-sm text-emerald-500" />
      ) : (
        <BsBookmark className="text-xs sm:text-sm text-emerald-500" />
      )}
    </button>
  )
}
