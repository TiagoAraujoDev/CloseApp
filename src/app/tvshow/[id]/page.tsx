import type { Metadata } from "next";
import { Actor, Crew, ExternalIds, Review, TvShowDetails } from "types";
import { ImSpinner2 } from "react-icons/im";

import {
  getTvShowCredits,
  getTvShowExternalIds,
  getTvShowReviews,
  getTvShowsDetails,
} from "@/lib/axios/requests/tvshows";

import { BannerDetails } from "@/components/MediaDetails/BannerDetails";
import { CastCarousel } from "@/components/MediaDetails/CastCarousel";
import { MediaExternalLinks } from "@/components/MediaDetails/MediaExternalLinks";
import { MediaInformation } from "@/components/MediaDetails/MediaInformation";
import { Reviews } from "@/components/MediaDetails/Reviews";
import { SeparatorLine } from "@/components/UI";

interface TvshowDetailsProps {
  params: {
    id: number;
  };
}

export async function generateMetadata({
  params,
}: TvshowDetailsProps): Promise<Metadata> {
  const tvshowDetailsResponse = await getTvShowsDetails(params.id);
  const title = tvshowDetailsResponse?.data.original_name;

  return { title: `Tvshow | ${title}` };
}

export default async function TvShowDetailsPage({
  params,
}: TvshowDetailsProps) {
  const [
    tvShowDetailsResponse,
    tvShowCreditsResponse,
    tvShowExternalIdsResponse,
    tvShowReviewsResponse,
  ] = await Promise.all([
    getTvShowsDetails(params.id),
    getTvShowCredits(params.id),
    getTvShowExternalIds(params.id),
    getTvShowReviews(params.id),
  ]);

  const tvShowDetails: TvShowDetails = tvShowDetailsResponse?.data;
  const externalIds: ExternalIds = tvShowExternalIdsResponse?.data;
  const reviews: Review[] = tvShowReviewsResponse?.data.results;
  const crew: Crew[] = tvShowCreditsResponse?.data.crew;
  const cast: Actor[] = tvShowCreditsResponse?.data.cast;

  if (crew) crew.length = 5;
  if (cast) cast.length = 10;

  if (!tvShowDetails) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ImSpinner2 className="animate-spin text-xl text-neutral-100" />
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-full max-w-screen-xl text-neutral-100">
      {/** Banner */}
      <BannerDetails tvshowDetails={tvShowDetails} crew={crew} />
      {/* Cast carousel */}
      <CastCarousel cast={cast} />
      {/* Informations */}
      <MediaInformation tvshowDetails={tvShowDetails} />
      {/* External links */}
      <MediaExternalLinks externalIds={externalIds} />
      {/* Separator  */}
      <SeparatorLine />
      {/* Reviews */}
      <Reviews mediaReviews={reviews} />
    </main>
  );
}
