'use client'

import { useContext, useState } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { AuthContext } from '@/context/AuthContext'

import CardsSkeleton from '@/components/Loading/CardsSkeleton'
import { WatchlistContainer } from '@/components/Watchlist/WatchlistContainer'

export default function WatchlistPage() {
  const { sessionId } = useContext(AuthContext)
  const [mediaType, setMediaType] = useState('movies')

  if (!sessionId)
    return (
      <section className="myMinHeight my-8 mx-auto max-w-5xl px-16">
        <div className="mb-4 flex min-w-full items-end justify-between">
          <h1 className="text-base font-bold md:text-lg">MyFavorites</h1>
          <ToggleGroup.Root
            type="single"
            defaultValue="movies"
            className="space-x-2 rounded text-sm"
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
    <section className="myMinHeight my-8 mx-auto flex max-w-5xl flex-col items-center justify-center px-16">
      <div className="mb-4 flex min-w-full items-end justify-between">
        <h1 className="text-base font-bold md:text-lg">MyWatchlist</h1>
        <ToggleGroup.Root
          onValueChange={(value: string) => setMediaType(value)}
          type="single"
          defaultValue="movies"
          className="space-x-2 rounded text-sm"
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
        <WatchlistContainer mediaType={mediaType} sessionId={sessionId} />
      )}
    </section>
  )
}
