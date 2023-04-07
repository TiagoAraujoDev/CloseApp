'use client'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useMutation, useQuery } from 'react-query'

import { getAccountState, rateMedia } from '@/lib/axios/requests/interactions'

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
  //  BUG: Update the stars ui after click on the star
  const {
    data: rating,
    isLoading,
    refetch,
  } = useQuery(
    `${mediaType}_${mediaId}_rating`,
    async () => {
      const response = await getAccountState({ mediaId, mediaType, sessionId })

      const rating = Math.floor(response?.data.rated.value / 2)
      return rating
    },
    {
      notifyOnChangeProps: ['data'],
    },
  )

  console.log('previousRating', rating)
  const { mutate } = useMutation({
    mutationFn: (mediaInfo: any) => rateMedia(mediaInfo),
  })

  const handleStarClick = (rating: number) => {
    mutate({ mediaType, mediaId, sessionId, rating })
    refetch()
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
          {starNumber <= rating! ? (
            <AiFillStar color="yellow" size={18} />
          ) : (
            <AiOutlineStar color="yellow" size={18} />
          )}
        </span>
      ))}
    </div>
  )
}
