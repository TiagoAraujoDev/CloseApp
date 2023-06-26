import { cookies } from "next/headers";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

import { RatingButton } from "@/components/MediaDetails/Interactables/RatingButton";
import { WatchlistButton } from "@/components/MediaDetails/Interactables/WatchlistButton";
import { FavoriteButton } from "@/components/MediaDetails/Interactables/FavoriteButton";

interface InteractableProps {
  voteAverage: number | undefined;
  voteCount: number | undefined;
  movieId?: number;
  tvshowId?: number;
}

const Interactables = async ({
  voteAverage,
  voteCount,
  movieId,
  tvshowId,
}: InteractableProps) => {
  const sessionId = cookies().get("token")?.value;
  const mediaType = movieId ? "movie" : "tv";
  const id = movieId || tvshowId;

  return (
    <div className="flex items-center gap-2 sm:mb-2">
      <div className="flex items-center gap-1">
        <AiFillStar className="flex items-center justify-center text-xs text-yellow-400 sm:text-base md:text-lg" />
        <span className="flex items-center justify-center text-xs sm:text-base md:text-lg">
          {voteAverage?.toFixed(2)}
        </span>
        <span className="text-lg">&middot;</span>
        <span className="flex items-center justify-center text-xs sm:text-base md:text-lg">
          {voteCount} votes
        </span>
      </div>
      <div className="flex items-center gap-2">
        {sessionId ? (
          <WatchlistButton
            sessionId={sessionId}
            mediaId={id}
            mediaType={mediaType}
          />
        ) : (
          <button
            title="Loggin to interact!"
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
          >
            <BsBookmark className="text-xs text-emerald-500 sm:text-sm" />
          </button>
        )}
        {sessionId ? (
          <FavoriteButton
            sessionId={sessionId}
            mediaId={id}
            mediaType={mediaType}
          />
        ) : (
          <button
            title="Loggin to interact!"
            className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-neutral-700 text-xs hover:scale-110 sm:h-6 sm:w-6 sm:text-base md:h-8 md:w-8 md:text-xl"
          >
            <AiOutlineHeart className="text-xs text-emerald-500 sm:text-base" />
          </button>
        )}
        <RatingButton
          mediaId={id}
          mediaType={mediaType}
          sessionId={sessionId}
        />
      </div>
    </div>
  );
};

export { Interactables };
