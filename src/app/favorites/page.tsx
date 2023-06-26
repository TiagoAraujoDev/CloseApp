"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { FavoritesContainer } from "@/components/FavoritesAndWatchlist/Favorites/FavoritesContainer";

export default function FavoritePage() {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [mediaType, setMediaType] = useState("movies");

  useEffect(() => {
    const sessionId = Cookies.get("token");
    setSessionId(sessionId);
  }, [sessionId]);

  return (
    <section className="myMinHeight my-8 mx-auto max-w-5xl px-16">
      <div className="mb-4 flex min-w-full items-end justify-between">
        <h1 className="text-base font-bold md:text-lg">MyFavorites</h1>
        <ToggleGroup.Root
          onValueChange={(value: string) => setMediaType(value)}
          type="single"
          defaultValue="movies"
          className="space-x-2 rounded text-sm"
        >
          <ToggleGroup.Item
            value="movies"
            className="radix-state-on:border-b radix-state-on:border-emerald-500"
          >
            Movies
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="tv"
            className="radix-state-on:border-b radix-state-on:border-emerald-500"
          >
            Tvshows
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </div>
      {sessionId && (
        <FavoritesContainer mediaType={mediaType} sessionId={sessionId} />
      )}
    </section>
  );
}
