import { Actor, Crew, MovieDetails } from "types";

import {
  getConfig,
  getMovieCredits,
  getMovieDetails,
} from "@/utils/requests/movies";

import { BannerInfo } from "@/components/MovieDetails/BannerInfo";
import { CastCarousel } from "@/components/MovieDetails/CastCarousel";

interface ShowDetailsProps {
  params: {
    id: number;
  };
}

export default async function ShowDetails({ params }: ShowDetailsProps) {
  const movieDetailsResponse = await getMovieDetails(params.id);
  const movieCreditsResponse = await getMovieCredits(params.id);
  const configResponse = await getConfig();

  const config = configResponse?.data;
  console.log(config);

  const movieDetails: MovieDetails = movieDetailsResponse?.data;
  const cast: Actor[] = movieCreditsResponse?.data.cast;
  const crew: Crew[] = movieCreditsResponse?.data.crew;
  crew.length = 5;
  cast.length = 10;

  console.log(JSON.stringify(movieDetails, null, 2));

  return (
    <main className="text-neutral-100 max-w-screen-xl min-h-full mx-auto">
      <BannerInfo movieDetails={movieDetails} crew={crew} />
      <CastCarousel cast={cast} />
      <section className="px-6 mb-6">
        <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
          Informations
        </h2>
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Status
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              {movieDetails.status}
            </span>
          </div>
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Original Language
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              {movieDetails.original_language}
            </span>
          </div>
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Budget
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              ${movieDetails.budget}
            </span>
          </div>
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Revenue
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              ${movieDetails.revenue}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
