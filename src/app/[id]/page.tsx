import { Actor, Crew, MovieDetails } from "types";

import { getMovieCredits, getMovieDetails } from "@/utils/requests/movies";
import { BannerInfo } from "@/components/MovieDetails/BannerInfo";

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
      <BannerInfo movieDetails={movieDetails} crew={crew} />
    </main>
  );
}
