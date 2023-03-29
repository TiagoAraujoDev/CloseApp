import Link from "next/link";
import Image from "next/image";
import { TvShow } from "types";
import { AiFillStar } from "react-icons/ai";

import { shortenText } from "@/utils/shortenText";
import { formatDate } from "@/utils/formatDate";

import placeholderPoster from "../../../public/placeholderPoster.png";

interface TvShowCardProps {
  tvshow: TvShow;
}

export function TvShowCard({ tvshow }: TvShowCardProps) {
  return (
    <Link
      className="flex items-center border border-neutral-100 hover:border-emerald-500 rounded-lg w-full mb-3 cursor-pointer overflow-hidden"
      href={`/tvshow/${tvshow.id}`}
    >
      {tvshow.poster_path ? (
        <Image
          className="w-24 sm:w-32 h-auto mx-auto"
          src={`https://image.tmdb.org/t/p/original${tvshow.poster_path}`}
          width={185}
          height={278}
          alt=""
        />
      ) : (
        <Image
          className="w-24 sm:w-32 h-auto mx-auto"
          src={placeholderPoster}
          width={185}
          height={278}
          alt=""
        />
      )}
      <div className="flex-1 px-2 py-2">
        <h1 className="text-neutral-100 text-base md:text-lg font-bold">
          {tvshow.original_name}
        </h1>
        <span className="block text-neutral-400 text-sm md:text-base italic">
          {formatDate(tvshow.first_air_date)}
        </span>
        <span className="hidden md:block text-base text-neutral-100 font-normal">
          {shortenText(tvshow.overview)}
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <AiFillStar size={16} className="text-yellow-500 mr-1" />
            <span className="text-sm md:text-base text-neutral-200 font-normal">
              {tvshow.vote_average.toFixed(2)}
            </span>
          </div>
          <span className="w-1 h-1 block rounded-full bg-neutral-200"></span>
          <span className="text-sm md:text-base text-neutral-200 font-normal">
            {tvshow.vote_count} votes
          </span>
        </div>
      </div>
    </Link>
  );
}
