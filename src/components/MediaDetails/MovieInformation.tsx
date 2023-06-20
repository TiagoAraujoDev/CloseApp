import { MovieDetails } from "types";
import { memo } from "react";

import { convertCodeToLang } from "@/utils/convertCodeToLang";
import { formatCurrency } from "@/utils/formatCurrency";

interface MovieInformationProps {
  movieDetails: MovieDetails;
}

const MovieInformationComponent = ({ movieDetails }: MovieInformationProps) => {
  return (
    <section className="mb-6 px-6">
      <h2 className="mb-1 text-lg font-semibold text-neutral-100 md:text-2xl">
        Informations
      </h2>
      <div className="grid grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
            Status
          </h3>
          <span className="text-xs text-neutral-300 md:text-base">
            {movieDetails.status}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
            Original Language
          </h3>
          <span className="text-xs text-neutral-300 md:text-base">
            {convertCodeToLang(movieDetails.original_language)}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
            Budget
          </h3>
          <span className="text-xs text-neutral-300 md:text-base">
            {movieDetails.budget !== 0
              ? `${formatCurrency(movieDetails.budget)}`
              : "-"}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-100 md:text-lg">
            Revenue
          </h3>
          <span className="text-xs text-neutral-300 md:text-base">
            {movieDetails.revenue !== 0
              ? `${formatCurrency(movieDetails.revenue)}`
              : "-"}
          </span>
        </div>
      </div>
    </section>
  );
};

const MovieInformation = memo(MovieInformationComponent);
export { MovieInformation };
