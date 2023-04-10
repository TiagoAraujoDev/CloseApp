'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@/lib/ReactQuery'
import { AuthContextProvider } from '@/context/AuthContext'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
