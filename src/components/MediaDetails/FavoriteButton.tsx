"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";

import {
  getAccountState,
  setAsFavorite,
} from "@/lib/axios/requests/interactions";
import { queryClient } from "@/lib/ReactQuery";

interface MutationParams {
  mediaType: string
  mediaId: number | undefined
  sessionId: string | undefined
  isFavorite: boolean
}

interface FavoriteButtonProps {
  mediaId: number | undefined
  mediaType: string
  sessionId: string | undefined
}

export const FavoriteButton = ({
  mediaType,
  mediaId,
  sessionId,
}: FavoriteButtonProps) => {
  const { data: isFavorite, isLoading } = useQuery(
    `${mediaType}_${mediaId}_fav`,
    async () => {
      const response = await getAccountState({ mediaId, mediaType, sessionId });

      return response?.data.favorite;
    },
    { initialData: false },
  );

  const { mutate: mutateFavorite } = useMutation({
    mutationFn: (media: MutationParams) => setAsFavorite(media),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        `${mediaType}_${mediaId}_fav`,
        variables.isFavorite,
      );
    },
  });

  const handleAddAsFavorite = () => {
    const media = {
      mediaType,
      mediaId,
      sessionId,
      isFavorite: !isFavorite,
    };
    mutateFavorite(media);
  };

  if (isLoading) {
    return (
      <button
        title="Mark as favorite!"
        className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
      >
        <AiOutlineHeart className="text-xs text-emerald-500 sm:text-base" />
      </button>
    );
  }

  return (
    <>
      {sessionId ? (
        <button
          onClick={handleAddAsFavorite}
          title="Mark as favorite!"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
        >
          {isFavorite ? (
            <AiFillHeart className="text-xs text-emerald-500 sm:text-base" />
          ) : (
            <AiOutlineHeart className="text-xs text-emerald-500 sm:text-base" />
          )}
        </button>
      ) : (
        <button
          title="Loggin to interact!"
          className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
        >
          <AiOutlineHeart className="text-xs text-emerald-500 sm:text-base" />
        </button>
      )}
    </>
  );
};
