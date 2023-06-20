import { Crew, MovieDetails } from "types";
import { memo } from "react";
import Image from "next/image";

import { Interactables } from "../Interactables";

import placeholderBackdrop from "../../../../public/placeholderBackdrop.png";
import placeholderPoster from "../../../../public/placeholderPoster.png";

interface BannerDetailsProps {
  movieDetails: MovieDetails;
  crew: Crew[];
}

const BannerDetailsComponent = ({ movieDetails, crew }: BannerDetailsProps) => {
  //  NOTE: Extract into smallest components
  return (
    <section className="relative mb-4 min-w-full">
      {/** Background */}
      {movieDetails.backdrop_path ? (
        <Image
          src={`https://www.themoviedb.org/t/p/w1280${movieDetails.backdrop_path}`}
          alt=""
          width={1280}
          height={720}
          className="object-contain opacity-30"
        />
      ) : (
        <Image src={placeholderBackdrop} alt="" width={1280} height={720} />
      )}
      <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-transparent py-8 px-4 sm:py-10 sm:px-5 md:py-16 md:px-6">
        {/** Container flex */}
        <div className="flex h-full w-full items-center gap-4 bg-transparent">
          {movieDetails.poster_path ? (
            <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
              <Image
                src={`https://www.themoviedb.org/t/p/w780${movieDetails.poster_path}`}
                alt=""
                width={780}
                height={1170}
                className="flex-1 overflow-hidden rounded border border-neutral-300/50 object-contain shadow-xl shadow-neutral-300/30"
              />
            </div>
          ) : (
            <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
              <Image
                src={placeholderPoster}
                alt=""
                width={780}
                height={1170}
                className="flex-1 overflow-hidden rounded border border-neutral-300/50 object-contain shadow-xl shadow-neutral-300/30"
              />
            </div>
          )}
          {/** Infos */}
          <div className="flex-1">
            {/** Header */}
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-medium text-neutral-100 sm:text-lg md:text-2xl lg:text-3xl">
                {movieDetails.original_title}
              </h1>
              <span className="hidden text-base text-neutral-400 sm:block sm:text-lg md:text-2xl">
                ({movieDetails.release_date.slice(0, 4)})
              </span>
            </div>
            {/** Infos */}
            <div className="flex flex-col sm:mb-1 sm:flex-row sm:items-center sm:gap-1">
              <span className="text-xs text-neutral-300 sm:text-base">
                {movieDetails.release_date}
              </span>
              <span className="hidden text-lg sm:block">&middot;</span>
              <span className="flex items-center gap-1 text-xs text-neutral-300 sm:text-base">
                {movieDetails.genres.map((genre, index) => (
                  <span className="underline" key={index}>
                    {genre.name}
                  </span>
                ))}
              </span>
              <span className="hidden text-lg sm:block">&middot;</span>
              <span className="hidden text-xs text-neutral-300 sm:inline-block sm:text-base">
                {movieDetails.runtime} min
              </span>
            </div>
            {/** Intaractive: ClientComponent */}
            <Interactables
              voteAverage={movieDetails.vote_average}
              voteCount={movieDetails.vote_count}
              movieId={movieDetails.id}
            />
            {/** Tagline */}
            <p className="mb-2 hidden text-base italic text-neutral-400 sm:block lg:text-lg">
              {movieDetails.tagline}
            </p>
            {/** Sinopse */}
            <div className="flex w-56 flex-col sm:mb-2 sm:w-full">
              <h2 className="text-xs font-medium text-neutral-200 sm:text-base lg:text-2xl">
                Sinopse
              </h2>
              {movieDetails.overview && (
                <p
                  title={movieDetails.overview}
                  className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-200 sm:whitespace-normal sm:text-sm lg:text-lg"
                >
                  {movieDetails.overview}
                </p>
              )}
            </div>
            {/** Crew */}
            <div className="hidden grid-cols-3 md:grid">
              {crew.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col items-start">
                    <span className="text-sm text-neutral-100 sm:text-base">
                      {item.original_name}
                    </span>
                    <span className="text-sm font-medium text-neutral-400 sm:text-base">
                      {item.job}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BannerDetails = memo(BannerDetailsComponent);
export { BannerDetails };
