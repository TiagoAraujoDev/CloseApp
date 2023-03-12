import Image from "next/image";
import { MovieDetails } from "types";

import { getMovieDetails } from "@/utils/requests/movies";
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
  const response = await getMovieDetails(params.id);
  const movieDetails: MovieDetails = response?.data;

  console.log(JSON.stringify(movieDetails, null, 2));

  return (
    <main className="text-neutral-100 max-w-screen-xl mx-auto">
      <section className="min-w-full relative">
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
          <div className="w-full h-full bg-transparent flex items-start gap-4">
            <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
              <Image
                src={`https://www.themoviedb.org/t/p/w780${movieDetails.poster_path}`}
                alt=""
                width={780}
                height={1170}
                className="object-contain flex-1 border border-neutral-400 shadow-lg rounded overflow-hidden"
              />
            </div>
            {/** Infos */}
            <div className="flex-1">
              {/** Header */}
              <div className="flex items-center gap-1">
                <h1 className="text-neutral-100 text-base sm:text-lg md:text-2xl font-medium">
                  {movieDetails.original_title}
                </h1>
                <span className="text-neutral-400 text-base sm:text-lg md:text-2xl hidden sm:block">
                  ({movieDetails.release_date.slice(0, 4)})
                </span>
              </div>
              {/** Infos */}
              <div className="flex items-center">
                <span className="text-neutral-300 text-xs mr-1">
                  {movieDetails.release_date}
                </span>
                <span className="text-lg">&middot;</span>
                <span className="text-neutral-300 text-xs ml-1 flex gap-1 items-center">
                  {movieDetails.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </span>
                <span className="hidden text-lg sm:inline-block">&middot;</span>
                <span className="hidden sm:inline-block text-neutral-300 text-xs mr-1">
                  {movieDetails.runtime}
                </span>
              </div>
              {/** Intaractive */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarFilledSVG />
                  <span className="text-xs">{movieDetails.vote_average}</span>
                  <span className="text-lg">&middot;</span>
                  <span className="text-xs">
                    {movieDetails.vote_count} votes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-700 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer">
                    <BookmarkSVG />
                  </div>
                  <div className="bg-neutral-700 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer">
                    <HeartSVG />
                  </div>
                  <div className="bg-neutral-700 w-4 h-4 rounded-full flex items-center justify-center cursor-pointer">
                    <StarSVG />
                  </div>
                </div>
              </div>
              {/** Tagline */}
              <div className="hidden sm:block text-neutral-400 text-sm italic">
                {movieDetails.tagline}
              </div>
              {/** Sinopse */}
              <div className="flex flex-col w-56">
                <h2 className="text-sm text-neutral-200 font-medium">
                  Sinopse
                </h2>
                {movieDetails.overview && (
                  <p
                    title={movieDetails.overview}
                    className="text-xs text-neutral-200 whitespace-nowrap text-ellipsis overflow-hidden "
                  >
                    {movieDetails.overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
