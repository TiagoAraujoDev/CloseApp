import { api } from "@/lib/axios";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const response = await api.get(
    `search/multi?api_key=${apiKey}&query=${searchParams?.terms}&page=1`,
  );

  const shows = response?.data.results;

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-2xl text-white">
        {shows.length ? JSON.stringify(shows, null, 2) : "no movie find"}
      </h1>
    </div>
  );
}
