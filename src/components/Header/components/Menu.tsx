"use client";

import * as DropDownMenu from "@radix-ui/react-dropdown-menu";
import { CaretRight, List } from "phosphor-react";

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
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Popular
                </DropDownMenu.Item>
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Now playing
                </DropDownMenu.Item>
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Up comming
                </DropDownMenu.Item>
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Top rated
                </DropDownMenu.Item>
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
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Popular
                </DropDownMenu.Item>
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Airing today
                </DropDownMenu.Item>
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  On the air
                </DropDownMenu.Item>
                <DropDownMenu.Item className="p-2 outline-none cursor-pointer hover:bg-neutral-600 text-neutral-100 hover:text-emerald-500">
                  Top rated
                </DropDownMenu.Item>
              </DropDownMenu.SubContent>
            </DropDownMenu.Portal>
          </DropDownMenu.Sub>
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
};
