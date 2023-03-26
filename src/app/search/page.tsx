import { SearchDisplay } from "@/components/Search/SearchDisplay";

export default async function SearchPage() {
  return (
    <main className="flex flex-col items-center justify-center max-w-5xl px-16 mx-auto">
      <SearchDisplay />
    </main>
  );
}
