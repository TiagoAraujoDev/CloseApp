import Link from 'next/link'
import { MdLocalMovies } from 'react-icons/md'

import { Menu } from '@/components/Header/components/Menu'
import { SearchInput } from '@/components/Header/components/SearchInput'
import { LogginButton } from '@/components/Header/components/LogginButton'

export function Header() {
  return (
    <header className="h-16 bg-neutral-700 sticky top-0 z-10 p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-between gap-4">
        <Link
          href="/"
          title="Home"
          className="text-emerald-500 font-bold text-xl flex items-center justify-center gap-1"
        >
          <span>CloseApp</span>
          <MdLocalMovies />
        </Link>
        <div className="hidden sm:block flex-1">
          <SearchInput />
        </div>
        <nav className="flex items-center justify-between gap-2">
          <LogginButton />
          <Menu />
        </nav>
      </div>
    </header>
  )
}
