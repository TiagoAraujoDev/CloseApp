'use client'

import { Movie, TvShow } from 'types'
import { useQuery } from 'react-query'
import { MdFavorite } from 'react-icons/md'

import { getAccountFavorites } from '@/lib/axios/requests/interactions'

import { MovieCard } from '@/components/MovieCard'
import { CardsSkeleton } from '@/components/Loading/CardsSkeleton'
import { TvShowCard } from '@/components/TvShowCard'

interface FavoritesContainerProps {
  sessionId: string
  mediaType: string
}

export const FavoritesContainer = ({
  sessionId,
  mediaType,
}: FavoritesContainerProps) => {
  const {
    data: favorites,
    isLoading,
    isSuccess,
  } = useQuery(`favorites_${mediaType}`, async () => {
    const response = await getAccountFavorites({ sessionId, mediaType })

    return response?.data.results
  })

  if (isLoading) {
    return <CardsSkeleton />
  }

  return (
    <>
      {isSuccess &&
        favorites.length > 0 &&
        mediaType === 'movies' &&
        favorites.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      {isSuccess &&
        favorites.length > 0 &&
        mediaType === 'tv' &&
        favorites.map((tvshow: TvShow) => (
          <TvShowCard key={tvshow.id} tvshow={tvshow} />
        ))}
      {isSuccess && favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-full">
          <MdFavorite size={64} className="text-neutral-400" />
          <h1 className="text-xl text-neutral-300">
            You haven&apos;t added any favorite{' '}
            {mediaType === 'movies' ? 'movies' : 'Tv shows'}.
          </h1>
        </div>
      )}
    </>
  )
}
