"use client";

import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { AiFillCaretRight, AiOutlineMenu } from "react-icons/ai";
import Cookies from "js-cookie";

export const Menu = () => {
  const sessionId = Cookies.get("token");

  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger asChild>
        <button>
          <AiOutlineMenu size={24} color="#10b981" />
        </button>
      </DropDownMenu.Trigger>
      <DropDownMenu.Portal className="z-20">
        <DropDownMenu.Content
          sideOffset={5}
          className="z-20 w-32 rounded-md border border-emerald-500 bg-neutral-500 py-2"
        >
          <DropDownMenu.Arrow className="fill-emerald-500" />
          <DropDownMenu.Sub>
            <DropDownMenu.SubTrigger className="flex cursor-pointer items-center justify-between p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
              Movies
              <span>
                <AiFillCaretRight />
              </span>
            </DropDownMenu.SubTrigger>
            <DropDownMenu.Portal>
              <DropDownMenu.SubContent
                sideOffset={5}
                className="z-20 w-32 rounded-md border border-emerald-500 bg-neutral-500 py-2"
              >
                <DropDownMenu.Arrow className="fill-emerald-500" />
                <Link href={"/movies/popular"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Popular
                  </DropDownMenu.Item>
                </Link>
                <Link href={"/movies/now_playing"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Now playing
                  </DropDownMenu.Item>
                </Link>
                <Link href={"/movies/upcoming"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Upcoming
                  </DropDownMenu.Item>
                </Link>
                <Link href={"/movies/top_rated"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Top rated
                  </DropDownMenu.Item>
                </Link>
              </DropDownMenu.SubContent>
            </DropDownMenu.Portal>
          </DropDownMenu.Sub>
          <DropDownMenu.Sub>
            <DropDownMenu.SubTrigger className="flex cursor-pointer items-center justify-between p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
              TV shows
              <span>
                <AiFillCaretRight />
              </span>
            </DropDownMenu.SubTrigger>
            <DropDownMenu.Portal>
              <DropDownMenu.SubContent
                sideOffset={5}
                className="z-20 w-32 rounded-md border border-emerald-500 bg-neutral-500 py-2"
              >
                <DropDownMenu.Arrow className="fill-emerald-500" />
                <Link href={"/tvshows/popular"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Popular
                  </DropDownMenu.Item>
                </Link>
                <Link href={"/tvshows/airing_today"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Airing today
                  </DropDownMenu.Item>
                </Link>
                <Link href={"/tvshows/on_the_air"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    On the air
                  </DropDownMenu.Item>
                </Link>
                <Link href={"/tvshows/top_rated"}>
                  <DropDownMenu.Item className="cursor-pointer p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Top rated
                  </DropDownMenu.Item>
                </Link>
              </DropDownMenu.SubContent>
            </DropDownMenu.Portal>
          </DropDownMenu.Sub>
          {sessionId && (
            <>
              <DropDownMenu.Sub>
                <Link href={"/favorites"}>
                  <DropDownMenu.SubTrigger className="flex cursor-pointer items-center justify-between p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Favorites
                  </DropDownMenu.SubTrigger>
                </Link>
              </DropDownMenu.Sub>
              <DropDownMenu.Sub>
                <Link href={"/watchlist"}>
                  <DropDownMenu.SubTrigger className="flex cursor-pointer items-center justify-between p-2 text-neutral-100 outline-none hover:bg-neutral-600 hover:text-emerald-500">
                    Watchlist
                  </DropDownMenu.SubTrigger>
                </Link>
              </DropDownMenu.Sub>
            </>
          )}
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
};
