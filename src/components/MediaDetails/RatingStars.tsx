'use client'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'

import { getAccountState, rateMedia } from '@/lib/axios/requests/interactions'
import { queryClient } from '@/lib/ReactQuery'

interface RatingStarsProps {
  sessionId: string | undefined
  mediaId: number | undefined
  mediaType: string
}

export const RatingStars = ({
  sessionId,
  mediaType,
  mediaId,
}: RatingStarsProps) => {
  const { data: prevRating, isLoading } = useQuery(
    `${mediaType}_${mediaId}_rating`,
    async () => {
      const response = await getAccountState({ mediaId, mediaType, sessionId })

      const rating = Math.floor(response?.data.rated.value / 2)
      return rating
    },
    {
      notifyOnChangeProps: ['data'],
      cacheTime: 1,
    },
  )

  const { mutate } = useMutation({
    mutationFn: (mediaInfo: any) => rateMedia(mediaInfo),
  })

  const handleStarClick = async (rating: number) => {
    mutate({ mediaType, mediaId, sessionId, rating })
    queryClient.setQueryData(`${mediaType}_${mediaId}_rating`, rating)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <span key={starNumber} className="hover:scale-110 cursor-pointer">
            <AiOutlineStar color="yellow" size={18} />
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <span
          key={starNumber}
          className="hover:scale-110 cursor-pointer"
          onClick={() => handleStarClick(starNumber)}
        >
          {starNumber <= prevRating! ? (
            <AiFillStar color="yellow" size={18} />
          ) : (
            <AiOutlineStar color="yellow" size={18} />
          )}
        </span>
      ))}
    </div>
  )
}
