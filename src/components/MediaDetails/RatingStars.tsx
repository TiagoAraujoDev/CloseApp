'use client'

import { rateMedia } from '@/lib/axios/requests/interactions'
import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useMutation } from 'react-query'

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
  const [rating, setRating] = useState(0)

  const { mutate } = useMutation({
    mutationFn: (mediaInfo: any) => rateMedia(mediaInfo),
  })

  const handleRating = (rating: number) => {
    mutate({ mediaType, mediaId, sessionId, rating })
  }

  const handleStarClick = (newRating: number) => {
    setRating(newRating)
    handleRating(newRating)
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {[1, 2, 3, 4, 5].map((starNumber) => (
        <span
          key={starNumber}
          className="hover:scale-110 cursor-pointer"
          onClick={() => handleStarClick(starNumber)}
        >
          {starNumber <= rating ? (
            <AiFillStar color="yellow" size={18} />
          ) : (
            <AiOutlineStar color="yellow" size={18} />
          )}
        </span>
      ))}
    </div>
  )
}
