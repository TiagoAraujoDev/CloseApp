"use client";

import { AiFillStar } from "react-icons/ai";
import * as Popover from "@radix-ui/react-popover";

import { RatingStars } from "./RatingStars";
import { SessionButton } from "@/components/Header/components/SessionButton";

interface RatingButtonProps {
  mediaId: number | undefined;
  mediaType: string;
  sessionId: string | undefined;
}

export const RatingButton = ({
  mediaId,
  mediaType,
  sessionId,
}: RatingButtonProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          title="Rate it!"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
        >
          <AiFillStar className="text-xs text-emerald-500 sm:text-base" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded border border-emerald-500 bg-neutral-600 p-2 outline-transparent">
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
  );
};
