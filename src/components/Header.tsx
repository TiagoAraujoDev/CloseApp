import Link from 'next/link'

import { FilmStripSVG, MagnifyingGlassSVG } from './icons'

export function Header() {
  return (
    <header className="w-full h-16 bg-neutral-700 flex items-center justify-between px-4">
      <Link
        href="/"
        className="text-emerald-500 font-bold text-xl flex items-center justify-center gap-1"
      >
        <span>CloseApp</span>
        <FilmStripSVG />
      </Link>
      <div className="flex items-center justify-between border border-emerald-500 outline-1 outline-emerald-500 rounded-lg bg-neutral-900 px-4 py-2 w-[600px] text-zinc-500">
        <input
          type="text"
          className="bg-transparent border-none outline-none w-[550px]"
          placeholder="Search for movies and TV shows..."
        />
        <MagnifyingGlassSVG />
      </div>
      <nav>
        <button>loginn</button>
        <button>menu</button>
      </nav>
    </header>
  )
}
