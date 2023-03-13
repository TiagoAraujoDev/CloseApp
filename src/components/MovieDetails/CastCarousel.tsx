import Image from "next/image";
import { Actor } from "types";

interface CastCarouselProps {
  cast: Actor[];
}

export function CastCarousel({ cast }: CastCarouselProps) {
  return (
    <section className="px-6 mb-6">
      <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
        Cast
      </h2>
      <div className="flex justify-between gap-2 w-full pb-3 overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
        {cast &&
          cast.map((actor) => {
            return (
              <div
                key={actor.id}
                className="min-w-[75px] sm:min-w-[125px] border rounded border-transparent overflow-hidden"
              >
                <div>
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt=""
                    width={185}
                    height={278}
                    className="object-contain min-h-fit"
                  />
                </div>
                <div className="min-h-fit py-2 px-1 flex flex-col bg-neutral-400">
                  <span className="text-xs sm:text-base whitespace-nowrap text-ellipsis overflow-hidden text-neutral-200">
                    {actor.original_name}
                  </span>
                  <span className="text-xs sm:text-base whitespace-nowrap text-ellipsis overflow-hidden text-neutral-700 font-semibold">
                    {actor.character}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
