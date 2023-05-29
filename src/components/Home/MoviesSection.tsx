'use client'

import { memo, useCallback, useState } from 'react'
import { useQuery } from 'react-query'

import { getMovies } from '@/lib/axios/requests/movies'

import Carousel from '@/components/Home/Carousel'
import CarouselSkeleton from '@/components/Loading/CarouselSkeleton'
import ToggleCarousel from '@/components/Home/ToggleCarousel'

export interface MoviesProps {
  labels: string[]
}

function MovieSection({ labels }: MoviesProps) {
  const [label, setLabel] = useState(labels[0])

  const queryKey = `${label}_movies`

  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const response = await getMovies(label)
      const movies = response?.data.results

      return movies
    },
    {
      refetchOnMount: false,
      staleTime: 60 * 60 * 2, // 2 hours
    },
  )

  const handleToggleClick = useCallback((label: string) => {
    setLabel(label)
  }, [])

  if (isLoading) {
    return <CarouselSkeleton labels={labels} label={label} title="Movies" />
  }

  return (
    <section className="mb-10 flex flex-col gap-3 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-neutral-100 md:text-2xl">
          Movies
        </span>
        <ToggleCarousel
          labels={labels}
          currentLabel={label}
          onToggleChange={handleToggleClick}
        />
      </div>
      {data && <Carousel movies={data} />}
    </section>
  )
}

export default memo(MovieSection)
