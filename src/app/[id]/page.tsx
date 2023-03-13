import Image from "next/image";
import { Actor, Crew, MovieDetails } from "types";

import { getMovieCredits, getMovieDetails } from "@/utils/requests/movies";
import {
  BookmarkSVG,
  HeartSVG,
  StarFilledSVG,
  StarSVG,
} from "@/components/Icons";

interface ShowDetailsProps {
  params: {
    id: number;
  };
}

export default async function ShowDetails({ params }: ShowDetailsProps) {
  const movieDetailsResponse = await getMovieDetails(params.id);
  const movieDetails: MovieDetails = movieDetailsResponse?.data;

  const movieCreditsResponse = await getMovieCredits(params.id);
  const cast: Actor[] = movieCreditsResponse?.data.cast;
  const crew: Crew[] = movieCreditsResponse?.data.crew;
  crew.length = 5;

  console.log("cast", JSON.stringify(cast, null, 2));

  return (
    <main className="text-neutral-100 max-w-screen-xl mx-auto">
      <section className="min-w-full relative">
        {/** Background */}
        <div className="">
          <Image
            src={`https://www.themoviedb.org/t/p/w1280${movieDetails.backdrop_path}`}
            alt=""
            width={1280}
            height={720}
            className="object-contain opacity-50"
          />
        </div>
        <div className="w-full h-full bg-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-4 sm:py-10 sm:px-5 md:py-16 md:px-6">
          {/** Container flex */}
          <div className="w-full h-full bg-transparent flex items-center gap-4">
            <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
              <Image
                src={`https://www.themoviedb.org/t/p/w780${movieDetails.poster_path}`}
                alt=""
                width={780}
                height={1170}
                className="object-contain flex-1 shadow-neutral-300/30 border border-neutral-300/50 shadow-xl rounded overflow-hidden"
              />
            </div>
            {/** Infos */}
            <div className="flex-1">
              {/** Header */}
              <div className="flex items-center gap-1">
                <h1 className="text-neutral-100 text-sm sm:text-lg md:text-2xl lg:text-3xl font-medium">
                  {movieDetails.original_title}
                </h1>
                <span className="text-neutral-400 text-base sm:text-lg md:text-2xl hidden sm:block">
                  ({movieDetails.release_date.slice(0, 4)})
                </span>
              </div>
              {/** Infos */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 sm:mb-1">
                <span className="text-neutral-300 text-xs sm:text-base">
                  {movieDetails.release_date}
                </span>
                <span className="text-lg hidden sm:block">&middot;</span>
                <span className="text-neutral-300 text-xs sm:text-base flex gap-1 items-center">
                  {movieDetails.genres.map((genre, index) => (
                    <span className="underline" key={index}>
                      {genre.name}
                    </span>
                  ))}
                </span>
                <span className="hidden text-lg sm:block">&middot;</span>
                <span className="hidden sm:inline-block text-neutral-300 text-xs sm:text-base">
                  {movieDetails.runtime} min
                </span>
              </div>
              {/** Intaractive */}
              <div className="flex items-center gap-2 sm:mb-2">
                <div className="flex items-center gap-1">
                  <div className="text-xs sm:text-base md:text-lg flex items-center justify-center animate-pulse">
                    <StarFilledSVG />
                  </div>
                  <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
                    {movieDetails.vote_average.toFixed(2)}
                  </span>
                  <span className="text-lg">&middot;</span>
                  <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
                    {movieDetails.vote_count} votes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer">
                    <BookmarkSVG />
                  </div>
                  <div className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer">
                    <HeartSVG />
                  </div>
                  <div className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer">
                    <StarSVG />
                  </div>
                </div>
              </div>
              {/** Tagline */}
              <p className="hidden sm:block text-neutral-400 text-base lg:text-lg italic mb-2">
                {movieDetails.tagline}
              </p>
              {/** Sinopse */}
              <div className="flex flex-col w-56 sm:w-full sm:mb-2">
                <h2 className="text-sm sm:text-base lg:text-2xl text-neutral-200 font-medium">
                  Sinopse
                </h2>
                {movieDetails.overview && (
                  <p
                    title={movieDetails.overview}
                    className="text-xs sm:text-sm lg:text-lg text-neutral-200 whitespace-nowrap sm:whitespace-normal text-ellipsis overflow-hidden"
                  >
                    {movieDetails.overview}
                  </p>
                )}
              </div>
              {/** Crew */}
              <div className="hidden md:grid grid-cols-3">
                {crew.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col items-start">
                      <span className="text-sm text-neutral-100 sm:text-base">
                        {item.original_name}
                      </span>
                      <span className="text-sm text-neutral-400 font-medium sm:text-base">
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
    </main>
  );
}
