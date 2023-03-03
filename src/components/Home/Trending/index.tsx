'use client'

import { useState } from 'react'
import * as ToogleGroup from '@radix-ui/react-toggle-group'

import { CardsCarousel } from '@/components/CardsCarousel'

export interface TrendingProps {
  moviesDay?: {
    id: number
    original_title: string
    release_date: string
    backdrop_path: string
    poster_path: string
  }[]
  moviesWeek?: {
    id: number
    original_title: string
    release_date: string
    backdrop_path: string
    poster_path: string
  }[]
  tvshowsDay?: {
    id: number
    original_name: string
    first_air_date: string
    backdrop_path: string
    poster_path: string
  }[]
  tvshowsWeek?: {
    id: number
    original_name: string
    first_air_date: string
    backdrop_path: string
    poster_path: string
  }[]
  periods: string[]
}

export function Trending({
  moviesDay,
  moviesWeek,
  tvshowsDay,
  tvshowsWeek,
  periods,
}: TrendingProps) {
  const [period, setPeriod] = useState(periods[0])
  let shouldRenderMovie = false
  let shouldRenderTV = false
  let headerTitle = ''

  if (moviesDay || moviesWeek) {
    shouldRenderMovie = true
    headerTitle = 'Trending Movies'
  } else {
    shouldRenderTV = true
    headerTitle = 'Trending TV shows'
  }
  console.log('movie', shouldRenderMovie)
  console.log('tv', shouldRenderTV)
  return (
    <section className="flex flex-col gap-3 mb-6 last:mb-0">
      <div className="flex items-center justify-between">
        <span className="text-neutral-100 font-bold text-xl md:text-2xl">
          {headerTitle}
        </span>
        <ToogleGroup.Root
          className="flex items-center w-fit"
          type="single"
          defaultValue={period}
          onValueChange={(value) => {
            if (value) setPeriod(value)
          }}
        >
          {periods.map((period, index) => {
            return (
              <ToogleGroup.Item
                className="bg-neutral-200 text-neutral-800 border border-neutral-800 first:rounded-tl first:rounded-bl last:rounded-br last:rounded-tr py-1 px-3 overflow-hidden radix-state-on:bg-emerald-500 radix-state-on:text-neutral-50"
                key={index}
                value={period}
              >
                {period}
              </ToogleGroup.Item>
            )
          })}
        </ToogleGroup.Root>
      </div>
      {period === 'day' && shouldRenderMovie && (
        <CardsCarousel movies={moviesDay} />
      )}
      {period === 'week' && shouldRenderMovie && (
        <CardsCarousel movies={moviesWeek} />
      )}
      {period === 'day' && shouldRenderTV && (
        <CardsCarousel tvshows={tvshowsDay} />
      )}
      {period === 'week' && shouldRenderTV && (
        <CardsCarousel tvshows={tvshowsWeek} />
      )}
    </section>
  )
}
