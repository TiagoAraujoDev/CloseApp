import type { Metadata } from 'next'

import { SearchDisplay } from '@/components/Search/SearchDisplay'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search page',
}

export default async function SearchPage() {
  return (
    <main className="max-w-5xl myMinHeight px-16 my-8 mx-auto">
      <SearchDisplay />
    </main>
  )
}
