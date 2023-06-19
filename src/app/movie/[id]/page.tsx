import { Actor, Crew, ExternalIds, MovieDetails, Review } from "types";
import type { Metadata } from "next";
import { ImSpinner2 } from "react-icons/im";

import {
  getMovieCredits,
  getMovieDetails,
  getMovieExternalIds,
  getMovieReviews,
} from "@/lib/axios/requests/movies";

import { BannerDetails } from "@/components/MediaDetails/BannerDetails";
import { CastCarousel } from "@/components/MediaDetails/CastCarousel";
import { MovieInformation } from "@/components/MediaDetails/MovieInformation";
import { MediaExternalLinks } from "@/components/MediaDetails/MediaExternalLinks";
import { SeparatorLine } from "@/components/UI";
import { Reviews } from "@/components/MediaDetails/Reviews";

interface MovieDetailsProps {
  params: {
    id: number
  }
}

export async function generateMetadata({
  params,
}: MovieDetailsProps): Promise<Metadata> {
  const movieDetailsResponse = await getMovieDetails(params.id);
  const title = movieDetailsResponse?.data.title;

  return { title: `Movie | ${title}` };
}

export default async function MovieDetailsPage({ params }: MovieDetailsProps) {
  const [
    movieDetailsResponse,
    movieCreditsResponse,
    movieExternalIdsResponse,
    movieReviewsResponse,
  ] = await Promise.all([
    getMovieDetails(params.id),
    getMovieCredits(params.id),
    getMovieExternalIds(params.id),
    getMovieReviews(params.id),
  ]);

  const movieDetails: MovieDetails = movieDetailsResponse?.data;
  const externalIds: ExternalIds = movieExternalIdsResponse?.data;
  const movieReviews: Review[] = movieReviewsResponse?.data.results;
  const cast: Actor[] = movieCreditsResponse?.data.cast;
  const crew: Crew[] = movieCreditsResponse?.data.crew;

  if (crew) crew.length = 5;
  if (cast) cast.length = 10;

  if (!movieDetails || !movieReviews || !externalIds || !cast || !crew) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ImSpinner2 className="animate-spin text-xl text-neutral-100" />
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-full max-w-screen-xl text-neutral-100">
      {/** Banner */}
      <BannerDetails movieDetails={movieDetails} crew={crew} />
      {/* Cast carousel */}
      <CastCarousel cast={cast} />
      {/* Informations */}
      <MovieInformation movieDetails={movieDetails} />
      {/* External links */}
      <MediaExternalLinks externalIds={externalIds} />
      {/* Separator  */}
      <SeparatorLine />
      {/* Reviews */}
      <Reviews mediaReviews={movieReviews} />
    </main>
  );
}
