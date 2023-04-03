'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/lib/ReactQuery'
import { AuthContextProvider } from '@/context/AuthContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  )
}
