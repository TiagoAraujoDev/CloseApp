'use client'

import { createContext, ReactNode } from 'react'

interface TrendingMoviesProviderProps {
  children: ReactNode
}

const TrendingMovies = createContext({})

export function TrendingMoviesProvider({
  children,
}: TrendingMoviesProviderProps) {
  const getTrendingMovies = (type: string, period: string) => {
    // ...
  }

  return (
    <TrendingMovies.Provider value={{ getTrendingMovies }}>
      {children}
    </TrendingMovies.Provider>
  )
}
