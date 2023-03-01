import Link from 'next/link'

import { FilmStripSVG, LogginSVG, MagnifyingGlassSVG } from '../icons'
import { Menu } from './components/Menu'

export function Header() {
  return (
    <header className="bg-neutral-700 sticky top-0 z-10 shadow-2xl p-4">
      <div className="max-w-5xl mx-auto flex items-center justify-around sm:justify-between gap-4">
        <Link
          href="/"
          className="text-emerald-500 font-bold text-xl flex items-center justify-center gap-1"
        >
          <span>CloseApp</span>
          <FilmStripSVG />
        </Link>
        <div className="hidden sm:flex items-center justify-between flex-grow focus:border focus:border-emerald-500 rounded-full bg-neutral-800 px-4 py-2 sm:max-w-xs md:max-w-xl h-9 shadow-2xl">
          <input
            type="text"
            className="bg-transparent outline-none w-full placeholder:text-zinc-400 text-neutral-100"
            placeholder="Search for movies and TV shows..."
          />
          <MagnifyingGlassSVG />
        </div>
        <nav className="flex items-center justify-between gap-2">
          <button>
            <LogginSVG />
          </button>
          <Menu />
        </nav>
      </div>
    </header>
  )
}
