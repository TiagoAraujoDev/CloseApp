'use client'

import { useMutation, useQuery } from 'react-query'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

import {
  addToWatchList,
  getAccountState,
} from '@/lib/axios/requests/interactions'
import { queryClient } from '@/lib/ReactQuery'

interface MutationParams {
  mediaType: string
  mediaId: number | undefined
  sessionId: string | undefined
  isInWatchlist: boolean
}

interface WatchlistButtonProps {
  mediaId: number | undefined
  mediaType: string
  sessionId: string | undefined
}

export const WatchlistButton = ({
  mediaType,
  mediaId,
  sessionId,
}: WatchlistButtonProps) => {
  const { data: isInWatchlist, isLoading } = useQuery(
    `${mediaType}_${mediaId}_watchlist`,
    async () => {
      const response = await getAccountState({ mediaId, mediaType, sessionId })

      return response?.data.watchlist
    },
    { initialData: false },
  )

  const { mutate: mutateWatchlist } = useMutation({
    mutationFn: (media: MutationParams) => addToWatchList(media),
    onSuccess: (_data, variables, _context) => {
      queryClient.setQueryData(
        `${mediaType}_${mediaId}_watchlist`,
        variables.isInWatchlist,
      )
    },
  })

  const handleAddToWatchlist = () => {
    const media = {
      mediaType,
      mediaId,
      sessionId,
      isInWatchlist: !isInWatchlist,
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
    <>
      {sessionId ? (
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
      ) : (
        <button
          title="Loggin to interact!"
          className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
        >
          <BsBookmark className="text-xs sm:text-sm text-emerald-500" />
        </button>
      )}
    </>
  )
}
