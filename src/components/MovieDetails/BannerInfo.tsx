import { Crew, MovieDetails } from "types";

interface BannerInfoProps {
  movieDetails: MovieDetails;
  crew: Crew[];
}

export function BannerInfo({ movieDetails, crew }: BannerInfoProps) {
  return <h1>banner</h1>;
}
