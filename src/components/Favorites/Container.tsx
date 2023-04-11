'use client'

import { Movie } from 'types'
import { useQuery } from 'react-query'

import { getAccountFavorites } from '@/lib/axios/requests/interactions'

import { MovieCard } from '@/components/MovieCard'
import { CardsSkeleton } from '../Loading/CardsSkeleton'

interface FavoritesContainerProps {
  sessionId: string
}

export const FavoritesContainer = ({ sessionId }: FavoritesContainerProps) => {
  const mediaType = 'movies'
  const { data, isLoading, isSuccess } = useQuery(
    `favorites_${mediaType}`,
    async () => {
      const response = await getAccountFavorites({ sessionId, mediaType })

      return response
    },
    {
      retry: true,
    },
  )
  console.log('favorite sessionId: ', sessionId)

  console.log('data: ', data)

  if (isLoading) {
    return <CardsSkeleton />
  }

  return (
    <>
      {isSuccess &&
        data?.data.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </>
  )
}
