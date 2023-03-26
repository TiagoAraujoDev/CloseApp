import { Movie } from "types";

interface MovieCardProps {
  movie: Movie;
}

//  TODO: Create the component to display the movie
export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <h1 className="text-neutral-100">{movie.title}</h1>
    </div>
  );
}
