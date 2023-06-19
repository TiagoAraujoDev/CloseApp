import { Review } from "types";
import Image from "next/image";
import {
  AiFillStar,
} from "react-icons/ai";
import { MdRateReview } from "react-icons/md";

import { treatAvatarPath } from "@/utils/treatReviewAuthorAvatarPath";
import { formatDate } from "@/utils/formatDate";

interface ReviewsProps {
  mediaReviews: Review[];
}

const Reviews = ({ mediaReviews }: ReviewsProps) => {
  //  NOTE: See if it makes sense to break down into smaller components
  return (
    <section className="mb-6 px-6">
      <h2 className="mb-4 text-center text-lg font-semibold text-neutral-100 md:text-2xl">
        Reviews
        <span className="ml-1 text-sm text-neutral-300 sm:text-base md:text-lg">
          ({mediaReviews.length})
        </span>
      </h2>
      <div>
        {mediaReviews.length > 0 ? (
          mediaReviews.map((review) => (
            <div
              key={review.id}
              className="mb-3 space-y-2 rounded bg-neutral-600 py-4 px-3 shadow shadow-neutral-700 last:mb-0"
            >
              {/** Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src={`http://www.gravatar.com/avatar${treatAvatarPath(
                      review.author_details.avatar_path,
                    )}`}
                    width={80}
                    height={80}
                    alt=""
                    className="h-7 w-7 rounded-full"
                  />
                  <span className="text-sm font-semibold text-neutral-200">
                    {review.author}
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded bg-neutral-700 py-0 px-1 shadow-md shadow-neutral-800">
                  <AiFillStar color="yellow" />
                  <span className="text-neutral-300">
                    {review.author_details.rating
                      ? review.author_details.rating
                      : "-"}
                  </span>
                </div>
              </div>
              {/** Content */}
              <p className="overflow-hidden text-base text-neutral-200">
                {review.content}
              </p>
              <div className="text-right text-sm italic text-neutral-400">
                {formatDate(review.created_at.slice(0, 10))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <MdRateReview className="text-5xl text-neutral-500" />
            <p className="text-base font-bold text-neutral-300">
              There are no reviews yet!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Reviews };
