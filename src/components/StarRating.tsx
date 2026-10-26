import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductRating {
  value: number;
  count: number;
}

/** Reads the Judge.me rating Shopify stores as a JSON metafield, e.g. {"value":"4.8","scale_max":"5.0"}. */
export function parseRating(product: {
  rating?: { value: string } | null;
  ratingCount?: { value: string } | null;
}): ProductRating | null {
  if (!product.rating?.value || !product.ratingCount?.value) return null;
  try {
    const value = Number(JSON.parse(product.rating.value).value);
    const count = Number(product.ratingCount.value);
    return value > 0 && count > 0 ? { value, count } : null;
  } catch {
    return null;
  }
}

interface StarRatingProps {
  rating: ProductRating;
  size?: "sm" | "md";
  className?: string;
}

const StarRating = ({ rating, size = "sm", className }: StarRatingProps) => {
  const iconSize = size === "sm" ? 12 : 16;
  const label = `Rated ${rating.value.toFixed(1)} out of 5 from ${rating.count} review${rating.count === 1 ? "" : "s"}`;
  return (
    <div className={cn("flex items-center gap-1.5", className)} role="img" aria-label={label} title={label}>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={iconSize}
            className={i <= Math.round(rating.value) ? "fill-barn-red text-barn-red" : "text-charcoal/25"}
          />
        ))}
      </div>
      <span className={cn("font-body text-charcoal-light", size === "sm" ? "text-xs" : "text-sm")} aria-hidden="true">
        {rating.value.toFixed(1)} ({rating.count} review{rating.count === 1 ? "" : "s"})
      </span>
    </div>
  );
};

export default StarRating;
