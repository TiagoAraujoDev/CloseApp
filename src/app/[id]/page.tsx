import { Actor, Crew, ExternalIds, MovieDetails, Review } from "types";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

import {
  getMovieCredits,
  getMovieDetails,
  getMovieExternalIds,
  getMovieReviews,
} from "@/utils/requests/movies";

import { BannerInfo } from "@/components/MovieDetails/BannerInfo";
import { CastCarousel } from "@/components/MovieDetails/CastCarousel";
import { Infos } from "@/components/MovieDetails/Infos";
import Link from "next/link";
import Image from "next/image";

interface ShowDetailsProps {
  params: {
    id: number;
  };
}

export default async function ShowDetails({ params }: ShowDetailsProps) {
  const movieDetailsResponse = await getMovieDetails(params.id);
  const movieCreditsResponse = await getMovieCredits(params.id);
  const movieExternalIdsResponse = await getMovieExternalIds(params.id);
  const movieReviewsResponse = await getMovieReviews(params.id);

  const movieDetails: MovieDetails = movieDetailsResponse?.data;
  const externalIds: ExternalIds = movieExternalIdsResponse?.data;
  const movieReviews: Review[] = movieReviewsResponse?.data.results;
  const cast: Actor[] = movieCreditsResponse?.data.cast;
  const crew: Crew[] = movieCreditsResponse?.data.crew;

  if (crew) crew.length = 5;
  if (cast) cast.length = 10;

  // console.log(JSON.stringify(movieReviews[0], null, 2));

  if (!movieDetails) {
    return <h1>loading...</h1>;
  }

  return (
    <main className="text-neutral-100 max-w-screen-xl min-h-full mx-auto">
      <BannerInfo movieDetails={movieDetails} crew={crew} />
      <CastCarousel cast={cast} />
      <Infos movieDetails={movieDetails} />
      <section className="px-6 mb-6">
        <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
          External Links
        </h2>
        <div className="flex items-center">
          {externalIds.facebook_id ? (
            <Link
              target={"_blank"}
              href={`https://www.facebook.com/${externalIds.facebook_id}`}
            >
              <AiFillFacebook size={24} />
            </Link>
          ) : (
            <Link target={"_blank"} href={""}>
              <AiFillFacebook size={24} />
            </Link>
          )}
          {externalIds.instagram_id ? (
            <Link
              target={"_blank"}
              href={`https://www.instagram.com/${externalIds.instagram_id}`}
            >
              <AiFillInstagram size={24} />
            </Link>
          ) : (
            <Link target={"_blank"} href={""}>
              <AiFillInstagram size={24} />
            </Link>
          )}
          {externalIds.twitter_id ? (
            <Link
              target={"_blank"}
              href={`https://www.twitter.com/${externalIds.twitter_id}`}
            >
              <AiFillTwitterSquare size={24} />
            </Link>
          ) : (
            <Link target={"_blank"} href={""}>
              <AiFillTwitterSquare size={24} />
            </Link>
          )}
        </div>
      </section>
      <section className="px-6 mb-6">
        <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
          Reviews
          <span className="text-sm sm:text-base md:text-lg text-neutral-300 ml-1">
            ({movieReviews.length})
          </span>
        </h2>
        <div>
          {movieReviews.map((review) => (
            <div key={review.id}>
              <Image
                src={`https://www.themoviedb.org/t/p/w185${review.author_details.avatar_path}`}
                width={80}
                height={80}
                alt=""
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
