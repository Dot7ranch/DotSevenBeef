import { useState } from "react";
import { BadgeCheck, Star } from "lucide-react";
import StarRating, { type ProductRating } from "@/components/StarRating";
import type { Review } from "@/lib/judgeme";

export const INITIAL_REVIEWS_SHOWN = 6;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
};

interface ProductReviewsProps {
  reviews: Review[];
  rating: ProductRating | null;
}

const ProductReviews = ({ reviews, rating }: ProductReviewsProps) => {
  const [showAll, setShowAll] = useState(false);
  if (reviews.length === 0) return null;

  const shown = showAll ? reviews : reviews.slice(0, INITIAL_REVIEWS_SHOWN);

  return (
    <section id="reviews" className="mt-16 border-t border-charcoal/10 pt-12" aria-labelledby="reviews-heading">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <h2 id="reviews-heading" className="font-display text-2xl md:text-3xl font-bold text-charcoal uppercase tracking-wider">
          Customer Reviews
        </h2>
        {rating && <StarRating rating={rating} size="md" />}
      </div>

      <ul className="grid gap-6 md:grid-cols-2">
        {shown.map((review) => (
          <li key={review.id} className="bg-cream-dark rounded-lg p-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    aria-hidden="true"
                    className={i <= review.rating ? "fill-barn-red text-barn-red" : "text-charcoal/25"}
                  />
                ))}
              </div>
              {review.date && (
                <time dateTime={review.date} className="font-body text-xs text-charcoal-light">
                  {formatDate(review.date)}
                </time>
              )}
            </div>
            {review.title && <h3 className="font-body font-semibold text-charcoal mb-2">{review.title}</h3>}
            {review.body && (
              <p className="font-body text-charcoal-light leading-relaxed whitespace-pre-line">{review.body}</p>
            )}
            <p className="font-body text-sm text-charcoal mt-4 flex items-center gap-1.5">
              {review.author}
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-xs text-charcoal-light">
                  <BadgeCheck size={14} className="text-barn-red" aria-hidden="true" /> Verified buyer
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>

      {reviews.length > INITIAL_REVIEWS_SHOWN && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="font-body text-sm font-semibold uppercase tracking-wider text-barn-red hover:underline"
          >
            {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
