'use client'

import { useContext } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'

import { AuthContext } from '@/context/AuthContext'
import {
  getAccountState,
  setAsFavorite,
} from '@/lib/axios/requests/interactions'

interface MutationParams {
  mediaType: string
  mediaId: number | undefined
  sessionId: string | undefined
}

interface FavoriteButtonProps {
  mediaId: number | undefined
  mediaType: string
}

export const FavoriteButton = ({ mediaType, mediaId }: FavoriteButtonProps) => {
  const { sessionId } = useContext(AuthContext)

  const { data: isFavorite, isLoading } = useQuery(
    `${mediaType}_${mediaId}_fav`,
    async () => {
      const response = await getAccountState({ mediaId, mediaType, sessionId })

      return response?.data.favorite
    },
    {
      notifyOnChangeProps: ['data'],
      refetchOnMount: false,
    },
  )

  const { mutate: mutateFavorite } = useMutation({
    mutationFn: (media: MutationParams) => setAsFavorite(media),
  })

  const handleAddAsFavorite = () => {
    const media = {
      mediaType,
      mediaId,
      sessionId,
    }
    mutateFavorite(media)
  }

  if (isLoading) {
    return (
      <button
        title="Mark as favorite!"
        className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110  cursor-pointer"
      >
        <AiOutlineHeart className="text-xs sm:text-base text-emerald-500" />
      </button>
    )
  }

  return (
    <button
      onClick={handleAddAsFavorite}
      title="Mark as favorite!"
      className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110  cursor-pointer"
    >
      {isFavorite ? (
        <AiFillHeart className="text-xs sm:text-base text-emerald-500" />
      ) : (
        <AiOutlineHeart className="text-xs sm:text-base text-emerald-500" />
      )}
    </button>
  )
}
