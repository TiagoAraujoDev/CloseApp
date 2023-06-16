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
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-sm hover:scale-110 sm:h-6 sm:w-6 sm:text-lg md:h-8 md:w-8 md:text-xl"
      >
        <BsBookmark className="text-xs text-emerald-500 sm:text-base" />
      </button>
    )
  }

  return (
    <>
      {sessionId ? (
        <button
          onClick={handleAddToWatchlist}
          title="Add to watchlist!"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
        >
          {isInWatchlist ? (
            <BsBookmarkFill className="text-xs text-emerald-500 sm:text-sm" />
          ) : (
            <BsBookmark className="text-xs text-emerald-500 sm:text-sm" />
          )}
        </button>
      ) : (
        <button
          title="Loggin to interact!"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
        >
          <BsBookmark className="text-xs text-emerald-500 sm:text-sm" />
        </button>
      )}
    </>
  )
}
