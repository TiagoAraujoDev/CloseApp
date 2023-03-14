import { MovieDetails } from "types";

interface InfosProps {
  movieDetails: MovieDetails;
}

export function Infos({ movieDetails }: InfosProps) {
  return (
    <section className="px-6 mb-6">
      <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
        Informations
      </h2>
      <div className="grid grid-cols-2">
        <div>
          <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
            Status
          </h3>
          <span className="text-xs md:text-base text-neutral-300">
            {movieDetails.status}
          </span>
        </div>
        <div>
          <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
            Original Language
          </h3>
          <span className="text-xs md:text-base text-neutral-300">
            {movieDetails.original_language}
          </span>
        </div>
        <div>
          <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
            Budget
          </h3>
          <span className="text-xs md:text-base text-neutral-300">
            ${movieDetails.budget}
          </span>
        </div>
        <div>
          <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
            Revenue
          </h3>
          <span className="text-xs md:text-base text-neutral-300">
            ${movieDetails.revenue}
          </span>
        </div>
      </div>
    </section>
  );
}
