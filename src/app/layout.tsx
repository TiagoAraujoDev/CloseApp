import { Metadata } from 'next'
import { ReactNode } from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/Providers'

import './globals.css'

export const metadata: Metadata = {
  title: 'CloseApp',
  description: 'The movies and TV shows most popular',
}

interface LayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="text-white bg-neutral-900 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
