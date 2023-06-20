import { Actor } from "types";
import { memo } from "react";
import Image from "next/image";

import placeholderPoster from "../../../public/placeholderPoster.png";

interface CastCarouselProps {
  cast: Actor[];
}

const CastCarouselComponent = ({ cast }: CastCarouselProps) => {
  return (
    <section className="mb-6 px-6">
      <h2 className="mb-1 text-lg font-semibold text-neutral-100 md:text-2xl">
        Cast
      </h2>
      <div className="flex w-full justify-start gap-2 overflow-auto pb-3 scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-emerald-500">
        {cast &&
          cast.map((actor) => {
            return (
              <div
                key={actor.id}
                className="flex min-w-[75px] flex-col overflow-hidden rounded border border-transparent sm:min-w-[125px]"
              >
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt=""
                    width={185}
                    height={278}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={placeholderPoster}
                    alt=""
                    width={185}
                    height={278}
                    className="flex-1 object-contain"
                  />
                )}
                <div className="flex min-h-fit flex-col bg-neutral-400 py-2 px-1">
                  <span
                    title={actor.original_name}
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-200 sm:text-base"
                  >
                    {actor.original_name}
                  </span>
                  <span
                    title={actor.character}
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold text-neutral-700 sm:text-base"
                  >
                    {actor.character}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

const CastCarousel = memo(CastCarouselComponent);
export { CastCarousel };
