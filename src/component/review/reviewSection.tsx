import type { Review } from "@/types/review";
import { ReviewCard } from "./reviewCard";

interface ReviewsSectionProps {
  reviews: Review[];
  onReviewDeleted?: () => void;
}

export default function ReviewsSection({ reviews, onReviewDeleted }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} onDeleted={onReviewDeleted}/>
      ))}
    </div>
  );
}
