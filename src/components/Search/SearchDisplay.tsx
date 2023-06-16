'use client'

import React, { useEffect, useState } from 'react'
import { Movie, TvShow } from 'types'
import { useInfiniteQuery } from 'react-query'
import { useSearchParams } from 'next/navigation'
import { ImSpinner2 } from 'react-icons/im'
import { BsArrowDownCircle } from 'react-icons/bs'

import { search } from '@/lib/axios/requests/search'

import { MovieCard } from '@/components/MovieCard'
import { TvShowCard } from '@/components/TvShowCard'
import SearchSkeleton from '@/components/Loading/SearchSkeleton'

export function SearchDisplay() {
  const searchParams = useSearchParams()

  const [mediaType, setMediaType] = useState('movie')
  const [movieResultCount, setMovieResultCount] = useState(0)
  const [tvshowResultCount, setTvshowResultCount] = useState(0)
  const [query, setQuery] = useState<string | null>('')

  const searchQuery = searchParams ? searchParams.get('terms') : null

  useEffect(() => {
    setQuery(searchQuery)
  }, [searchQuery])

  const moviesQuery = useInfiniteQuery(
    'movies_search_' + query,
    async ({ pageParam = 1 }) => {
      const response = await search(query, 'movie', pageParam)

      return response
    },
    {
      getNextPageParam: (lastPage, _pages) =>
        lastPage?.data.page < lastPage?.data.total_pages
          ? lastPage?.data.page + 1
          : null,
    },
  )

  const tvshowsQuery = useInfiniteQuery(
    'tvshows_search_' + query,
    async ({ pageParam = 1 }) => {
      const response = await search(query, 'tv', pageParam)

      return response
    },
    {
      getNextPageParam: (lastPage, _pages) =>
        lastPage?.data.page < lastPage?.data.total_pages
          ? lastPage?.data.page + 1
          : null,
    },
  )

  useEffect(() => {
    if (moviesQuery.isSuccess && tvshowsQuery.isSuccess) {
      setMovieResultCount(moviesQuery.data?.pages[0]?.data.total_results)
      setTvshowResultCount(tvshowsQuery.data?.pages[0]?.data.total_results)
    }
    // eslint-disable-next-line
  }, [moviesQuery, tvshowsQuery])

  if (moviesQuery.status === 'loading' || tvshowsQuery.status === 'loading') {
    return <SearchSkeleton />
  } else if (
    moviesQuery.status === 'error' ||
    tvshowsQuery.status === 'error'
  ) {
    return (
      <div>
        Error: <span>{String(moviesQuery.error || tvshowsQuery.error)}</span>
      </div>
    )
  }

  return (
    <>
      <div className="my-4 mx-auto w-full overflow-hidden rounded bg-neutral-500 md:w-80">
        <h2 className="bg-emerald-500 p-4 text-center text-base font-semibold text-white md:text-xl">
          Search results
        </h2>
        <div className="flex flex-col py-2">
          <button
            className={`flex items-center justify-between border-gray-300 p-2 text-sm text-white md:text-base 
             ${
               mediaType === 'movie'
                 ? 'bg-emerald-500 font-semibold'
                 : 'hover:bg-neutral-600'
             }`}
            onClick={() => setMediaType('movie')}
          >
            Movie
            <span
              className={`flex items-center justify-center rounded bg-neutral-200 px-2 py-1 text-[10px]  
               font-normal leading-none text-neutral-600 shadow shadow-neutral-800 md:text-sm`}
            >
              {movieResultCount || '0'}
            </span>
          </button>
          <button
            className={`flex items-center justify-between border-gray-300 p-2 text-sm text-white md:text-base 
             ${
               mediaType === 'tv'
                 ? 'bg-emerald-500 font-semibold'
                 : 'hover:bg-neutral-600'
             }`}
            onClick={() => setMediaType('tv')}
          >
            Tv
            <span
              className={`flex items-center justify-center rounded bg-neutral-200 px-2 py-1 text-[10px]  
               font-normal leading-none text-neutral-600 shadow shadow-neutral-800 md:text-sm`}
            >
              {tvshowResultCount || '0'}
            </span>
          </button>
        </div>
      </div>
      <>
        {mediaType === 'movie' ? (
          <>
            {moviesQuery.data?.pages.map((group, i) => (
              <div className="w-full" key={i}>
                {group?.data.results.map((movie: Movie, index: number) => (
                  <MovieCard key={index} movie={movie} />
                ))}
              </div>
            ))}
            <div className="mx-auto w-fit">
              <button
                className="my-4"
                onClick={() => moviesQuery.fetchNextPage()}
                disabled={
                  !moviesQuery.hasNextPage || moviesQuery.isFetchingNextPage
                }
              >
                {moviesQuery.isFetchingNextPage ? (
                  <ImSpinner2 className="animate-spin text-3xl text-emerald-500" />
                ) : moviesQuery.hasNextPage ? (
                  <BsArrowDownCircle className="animate-bounce text-3xl text-emerald-500" />
                ) : (
                  <span className="text-base text-red-500">
                    No more results
                  </span>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            {tvshowsQuery.data?.pages.map((group, i) => (
              <div className="w-full" key={i}>
                {group?.data.results.map((tvshow: TvShow, index: number) => (
                  <TvShowCard key={index} tvshow={tvshow} />
                ))}
              </div>
            ))}
            <div className="mx-auto w-fit">
              <button
                className="my-4"
                onClick={() => tvshowsQuery.fetchNextPage()}
                disabled={
                  !tvshowsQuery.hasNextPage || tvshowsQuery.isFetchingNextPage
                }
              >
                {tvshowsQuery.isFetchingNextPage ? (
                  <ImSpinner2 className="animate-spin text-3xl text-emerald-500" />
                ) : tvshowsQuery.hasNextPage ? (
                  <BsArrowDownCircle className="animate-bounce text-3xl text-emerald-500" />
                ) : (
                  <span className="text-base text-red-500">
                    No more results
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </>
    </>
  )
}
