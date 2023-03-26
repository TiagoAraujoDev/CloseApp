import { TvShow } from "types";

interface TvShowCardProps {
  tvshow: TvShow;
}

//  TODO: Create the component to display the tvshow
export function TvShowCard({ tvshow }: TvShowCardProps) {
  return (
    <div>
      <h1 className="text-neutral-100">{tvshow.original_name}</h1>
    </div>
  );
}
