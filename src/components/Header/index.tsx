import Link from "next/link";
import { MdLocalMovies } from "react-icons/md";

import { Menu } from "@/components/Header/components/Menu";
import { SearchInput } from "@/components/Header/components/SearchInput";
import { SessionButton } from "@/components/Header/components/SessionButton";

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-16 bg-neutral-700 p-4">
      <div className="mx-auto flex max-w-5xl items-center justify-around gap-4 sm:justify-between">
        <Link
          href="/"
          title="Home"
          className="flex items-center justify-center gap-1 text-xl font-bold text-emerald-500"
        >
          <span>CloseApp</span>
          <MdLocalMovies />
        </Link>
        <div className="hidden flex-1 sm:block">
          <SearchInput />
        </div>
        <nav className="flex items-center justify-between gap-2">
          <SessionButton />
          <Menu />
        </nav>
      </div>
    </header>
  );
}
