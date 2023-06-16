import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillStar,
  AiFillTwitterSquare,
} from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'
import { MdRateReview } from 'react-icons/md'
import { Actor, Crew, ExternalIds, MovieDetails, Review } from 'types'

import { formatDate } from '@/utils/formatDate'
import {
  getMovieCredits,
  getMovieDetails,
  getMovieExternalIds,
  getMovieReviews,
} from '@/lib/axios/requests/movies'
import { treatAvatarPath } from '@/utils/treatReviewAuthorAvatarPath'
import { convertCodeToLang } from '@/utils/convertCodeToLang'
import { formatCurrency } from '@/utils/formatCurrency'

import { Interactables } from '@/components/MediaDetails/Interactables'

import placeholderBackdrop from '../../../../public/placeholderBackdrop.png'
import placeholderPoster from '../../../../public/placeholderPoster.png'

interface MovieDetailsProps {
  params: {
    id: number
  }
}

export async function generateMetadata({
  params,
}: MovieDetailsProps): Promise<Metadata> {
  const movieDetailsResponse = await getMovieDetails(params.id)
  const title = movieDetailsResponse?.data.title

  return { title: `Movie | ${title}` }
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
  ])

  const movieDetails: MovieDetails = movieDetailsResponse?.data
  const externalIds: ExternalIds = movieExternalIdsResponse?.data
  const movieReviews: Review[] = movieReviewsResponse?.data.results
  const cast: Actor[] = movieCreditsResponse?.data.cast
  const crew: Crew[] = movieCreditsResponse?.data.crew

  if (crew) crew.length = 5
  if (cast) cast.length = 10

  if (!movieDetails || !movieReviews || !externalIds || !cast || !crew) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ImSpinner2 className="animate-spin text-xl text-neutral-100" />
      </div>
    )
  }

  return (
    <main className="mx-auto min-h-full max-w-screen-xl text-neutral-100">
      {/** Banner */}
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
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cast carousel */}
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
              )
            })}
        </div>
      </section>
      {/* Informations */}
      <section className="mb-6 px-6">
        <h2 className="mb-1 text-lg font-semibold text-neutral-100 md:text-2xl">
          Informations
        </h2>
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
              Status
            </h3>
            <span className="text-xs text-neutral-300 md:text-base">
              {movieDetails.status}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
              Original Language
            </h3>
            <span className="text-xs text-neutral-300 md:text-base">
              {convertCodeToLang(movieDetails.original_language)}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
              Budget
            </h3>
            <span className="text-xs text-neutral-300 md:text-base">
              {movieDetails.budget !== 0
                ? `${formatCurrency(movieDetails.budget)}`
                : '-'}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
              Revenue
            </h3>
            <span className="text-xs text-neutral-300 md:text-base">
              {movieDetails.revenue !== 0
                ? `${formatCurrency(movieDetails.revenue)}`
                : '-'}
            </span>
          </div>
        </div>
      </section>
      {/* External links */}
      <section className="mb-8 px-6">
        <h2 className="mb-1 text-lg font-semibold text-neutral-100 md:text-2xl">
          External Links
        </h2>
        <div className="flex items-center">
          {externalIds.facebook_id ? (
            <Link
              target={'_blank'}
              href={`https://www.facebook.com/${externalIds.facebook_id}`}
            >
              <AiFillFacebook size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <AiFillFacebook size={24} className="cursor-not-allowed" />
          )}
          {externalIds.instagram_id ? (
            <Link
              target={'_blank'}
              href={`https://www.instagram.com/${externalIds.instagram_id}`}
            >
              <AiFillInstagram size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <AiFillInstagram size={24} className="cursor-not-allowed" />
          )}
          {externalIds.twitter_id ? (
            <Link
              target={'_blank'}
              href={`https://www.twitter.com/${externalIds.twitter_id}`}
            >
              <AiFillTwitterSquare size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <AiFillTwitterSquare size={24} className="cursor-not-allowed" />
          )}
        </div>
      </section>
      {/* Separator  */}
      <section className="mb-6 px-6">
        <div className="mx-auto h-2 rounded-t border-t border-emerald-500"></div>
      </section>
      {/* Reviews */}
      <section className="mb-6 px-6">
        <h2 className="mb-4 text-center text-lg font-semibold text-neutral-100 md:text-2xl">
          Reviews
          <span className="ml-1 text-sm text-neutral-300 sm:text-base md:text-lg">
            ({movieReviews.length})
          </span>
        </h2>
        <div>
          {movieReviews.length > 0 ? (
            movieReviews.map((review) => (
              <div
                key={review.id}
                className="mb-3 space-y-2 rounded bg-neutral-600 py-4 px-3 shadow shadow-neutral-700 last:mb-0"
              >
                {/** Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Image
                      src={`http://www.gravatar.com/avatar${treatAvatarPath(
                        review.author_details.avatar_path,
                      )}`}
                      width={80}
                      height={80}
                      alt=""
                      className="h-7 w-7 rounded-full"
                    />
                    <span className="text-sm font-semibold text-neutral-200">
                      {review.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 rounded bg-neutral-700 py-0 px-1 shadow-md shadow-neutral-800">
                    <AiFillStar color="yellow" />
                    <span className="text-neutral-300">
                      {review.author_details.rating
                        ? review.author_details.rating
                        : '-'}
                    </span>
                  </div>
                </div>
                {/** Content */}
                <p className="overflow-hidden text-base text-neutral-200">
                  {review.content}
                </p>
                <div className="text-right text-sm italic text-neutral-400">
                  {formatDate(review.created_at.slice(0, 10))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <MdRateReview className="text-5xl text-neutral-500" />
              <p className="text-base font-bold text-neutral-300">
                There are no reviews yet!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
