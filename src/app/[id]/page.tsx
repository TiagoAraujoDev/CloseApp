import Image from "next/image";
import { MovieDetails } from "types";

import { getConfig, getMovieDetails } from "@/utils/requests/movies";

interface ShowDetailsProps {
  params: {
    id: number;
  };
}

export default async function ShowDetails({ params }: ShowDetailsProps) {
  const config = await getConfig();
  console.log(config?.data);

  const response = await getMovieDetails(params.id);
  const movieDetails: MovieDetails = response?.data;

  return (
    <main className="text-neutral-100 max-w-screen-xl mx-auto">
      <section className="min-w-full relative">
        <div className="">
          <Image
            src={`https://www.themoviedb.org/t/p/w1280${movieDetails.backdrop_path}`}
            alt=""
            width={1280}
            height={720}
            className="object-contain"
          />
        </div>
        <div className="w-full h-full bg-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-16 px-6">
          {/** Container flex */}
          <div className="w-full h-full bg-transparent flex items-center">
            <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
              <Image
                src={`https://www.themoviedb.org/t/p/w780${movieDetails.poster_path}`}
                alt=""
                width={780}
                height={1170}
                className="object-contain flex-1 border border-neutral-400 shadow-lg rounded overflow-hidden"
              />
            </div>
            {/** Infos */}
            <div className=""></div>
          </div>
        </div>
      </section>
    </main>
  );
}
