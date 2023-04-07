'use client'

import { useContext } from 'react'
import { IoMdBookmark } from 'react-icons/io'
import { useMutation } from 'react-query'

import { AuthContext } from '@/context/AuthContext'
import { addToWatchList } from '@/lib/axios/requests/interactions'

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

  const { mutate: mutateWatchlist } = useMutation({
    mutationFn: (media: MutationParams) => addToWatchList(media),
  })

  const handleAddToWatchlist = () => {
    const media = {
      mediaType,
      mediaId,
      sessionId,
    }

    console.log(media)
    mutateWatchlist(media)
  }

  return (
    <button
      onClick={handleAddToWatchlist}
      title="Add to watchlist!"
      className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
    >
      <IoMdBookmark className="text-xs sm:text-base text-emerald-500" />
    </button>
  )
}
