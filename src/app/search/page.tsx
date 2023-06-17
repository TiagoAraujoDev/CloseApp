import type { Metadata } from "next";

import { SearchDisplay } from "@/components/Search/SearchDisplay";

export const metadata: Metadata = {
  title: "Search",
  description: "Search page",
};

export default async function SearchPage() {
  return (
    <main className="myMinHeight my-8 mx-auto max-w-5xl px-16">
      <SearchDisplay />
    </main>
  );
}
