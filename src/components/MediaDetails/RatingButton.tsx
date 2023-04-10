'use client'

import { useContext } from 'react'
import { AiFillStar } from 'react-icons/ai'
import * as Popover from '@radix-ui/react-popover'

import { AuthContext } from '@/context/AuthContext'
import { RatingStars } from '@/components/MediaDetails/RatingStars'
import { SessionButton } from '../Header/components/SessionButton'

interface RatingButtonProps {
  mediaId: number | undefined
  mediaType: string
}

export const RatingButton = ({ mediaId, mediaType }: RatingButtonProps) => {
  const { sessionId } = useContext(AuthContext)

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          title="Rate it!"
          className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer"
        >
          <AiFillStar className="text-xs sm:text-base text-emerald-500" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-neutral-600 p-2 rounded border border-emerald-500 outline-transparent">
          {sessionId ? (
            <RatingStars
              mediaType={mediaType}
              mediaId={mediaId}
              sessionId={sessionId}
            />
          ) : (
            <div className="flex items-center justify-between gap-2 p-2">
              <span className="text-white">Loggin</span>
              <SessionButton />
            </div>
          )}
          <Popover.Arrow className="fill-emerald-500" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
