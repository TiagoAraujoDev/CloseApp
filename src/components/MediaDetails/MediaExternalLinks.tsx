import { ExternalIds } from "types";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

interface MediaExternalLinksProps {
  externalIds: ExternalIds;
}

const MediaExternalLinks = ({ externalIds }: MediaExternalLinksProps) => {
  return (
    <section className="mb-8 px-6">
      <h2 className="mb-1 text-lg font-semibold text-neutral-100 md:text-2xl">
        External Links
      </h2>
      <div className="flex items-center">
        {externalIds.facebook_id ? (
          <Link
            target={"_blank"}
            href={`https://www.facebook.com/${externalIds.facebook_id}`}
          >
            <AiFillFacebook size={24} className="cursor-pointer" />
          </Link>
        ) : (
          <AiFillFacebook size={24} className="cursor-not-allowed" />
        )}
        {externalIds.instagram_id ? (
          <Link
            target={"_blank"}
            href={`https://www.instagram.com/${externalIds.instagram_id}`}
          >
            <AiFillInstagram size={24} className="cursor-pointer" />
          </Link>
        ) : (
          <AiFillInstagram size={24} className="cursor-not-allowed" />
        )}
        {externalIds.twitter_id ? (
          <Link
            target={"_blank"}
            href={`https://www.twitter.com/${externalIds.twitter_id}`}
          >
            <AiFillTwitterSquare size={24} className="cursor-pointer" />
          </Link>
        ) : (
          <AiFillTwitterSquare size={24} className="cursor-not-allowed" />
        )}
      </div>
    </section>
  );
};

export { MediaExternalLinks };
