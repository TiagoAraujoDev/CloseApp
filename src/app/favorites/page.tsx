'use client'

import { useContext, useState } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { AuthContext } from '@/context/AuthContext'

import { CardsSkeleton } from '@/components/Loading/CardsSkeleton'
import { FavoritesContainer } from '@/components/Favorites/FavoritesContainer'

export default function FavoritePage() {
  const { sessionId } = useContext(AuthContext)
  const [mediaType, setMediaType] = useState('movies')

  if (!sessionId)
    return (
      <section className="max-w-5xl myMinHeight px-16 my-8 mx-auto">
        <div className="min-w-full flex items-end justify-between mb-4">
          <h1 className="text-base md:text-lg font-bold ">MyFavorites</h1>
          <ToggleGroup.Root
            type="single"
            defaultValue="movies"
            className="text-sm rounded space-x-2"
            disabled={true}
          >
            <ToggleGroup.Item
              value="movies"
              className="radix-state-on:border-b radix-state-on:border-emerald-500"
            >
              Movies
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="tv"
              className="radix-state-on:border-b radix-state-on:border-emerald-500"
            >
              Tvshows
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <CardsSkeleton />
      </section>
    )

  return (
    <section className="max-w-5xl myMinHeight px-16 my-8 mx-auto">
      <div className="min-w-full flex items-end justify-between mb-4">
        <h1 className="text-base md:text-lg font-bold ">MyFavorites</h1>
        <ToggleGroup.Root
          onValueChange={(value: string) => setMediaType(value)}
          type="single"
          defaultValue="movies"
          className="text-sm rounded space-x-2"
        >
          <ToggleGroup.Item
            value="movies"
            className="radix-state-on:border-b radix-state-on:border-emerald-500"
          >
            Movies
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="tv"
            className="radix-state-on:border-b radix-state-on:border-emerald-500"
          >
            Tvshows
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      {sessionId && (
        <FavoritesContainer mediaType={mediaType} sessionId={sessionId} />
      )}
    </section>
  )
}
