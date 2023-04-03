'use client'

import * as DropDownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { CaretRight, List } from 'phosphor-react'

export const Menu = () => {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger asChild>
        <button>
          <List size={24} color="#10b981" />
        </button>
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal className="z-20">
        <DropDownMenu.Content
          sideOffset={5}
          className="bg-neutral-500 border border-emerald-500 rounded-md z-20 py-2 w-32"
        >
          <DropDownMenu.Arrow className="fill-emerald-500" />
          <DropDownMenu.Sub>
            <DropDownMenu.SubTrigger className="flex items-center justify-between hover:text-emerald-500  text-neutral-100 outline-none hover:bg-neutral-600 p-2 cursor-pointer">
              Movies
              <span>
                <CaretRight />
              </span>
            </DropDownMenu.SubTrigger>
            <DropDownMenu.Portal>
              <DropDownMenu.SubContent
                sideOffset={5}
                className="bg-neutral-500 z-20 py-2 w-32 rounded-md border border-emerald-500"
              >
                <DropDownMenu.Arrow className="fill-emerald-500" />
                <Link href={'/movies/popular'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Popular
                  </DropDownMenu.Item>
                </Link>
                <Link href={'/movies/now_playing'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Now playing
                  </DropDownMenu.Item>
                </Link>
                <Link href={'/movies/upcoming'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Upcoming
                  </DropDownMenu.Item>
                </Link>
                <Link href={'/movies/top_rated'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Top rated
                  </DropDownMenu.Item>
                </Link>
              </DropDownMenu.SubContent>
            </DropDownMenu.Portal>
          </DropDownMenu.Sub>
          <DropDownMenu.Sub>
            <DropDownMenu.SubTrigger className="flex items-center justify-between hover:text-emerald-500 text-neutral-100 outline-none hover:bg-neutral-600 p-2 cursor-pointer">
              TV shows
              <span>
                <CaretRight />
              </span>
            </DropDownMenu.SubTrigger>
            <DropDownMenu.Portal>
              <DropDownMenu.SubContent
                sideOffset={5}
                className="bg-neutral-500 z-20 py-2 w-32 rounded-md border border-emerald-500"
              >
                <DropDownMenu.Arrow className="fill-emerald-500" />
                <Link href={'/tvshows/popular'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Popular
                  </DropDownMenu.Item>
                </Link>
                <Link href={'/tvshows/airing_today'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Airing today
                  </DropDownMenu.Item>
                </Link>
                <Link href={'/tvshows/on_the_air'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    On the air
                  </DropDownMenu.Item>
                </Link>
                <Link href={'/tvshows/top_rated'}>
                  <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                    Top rated
                  </DropDownMenu.Item>
                </Link>
              </DropDownMenu.SubContent>
            </DropDownMenu.Portal>
          </DropDownMenu.Sub>
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  )
}
