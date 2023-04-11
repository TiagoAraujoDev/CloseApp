'use client'

import { useContext } from 'react'

import { FavoritesContainer } from '@/components/Favorites/Container'
import { AuthContext } from '@/context/AuthContext'
import { CardsSkeleton } from '@/components/Loading/CardsSkeleton'

export default function FavoritePage() {
  const { sessionId } = useContext(AuthContext)

  if (!sessionId)
    return (
      <section className="max-w-5xl myMinHeight px-16 my-8 mx-auto">
        <h1>Favorites</h1>
        <CardsSkeleton />
      </section>
    )
  return (
    <section className="max-w-5xl myMinHeight px-16 my-8 mx-auto">
      <h1 className="text-lg font-bold mb-4">Favorites</h1>
      {sessionId && <FavoritesContainer sessionId={sessionId} />}
    </section>
  )
}
