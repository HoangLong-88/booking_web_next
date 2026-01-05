import type { Review } from "@/types/review";
import { StarRating } from "../ui/Rating";
import { Card } from "../ui/Card";
import { EllipsisVertical, Trash2 } from 'lucide-react';
import { useAuth } from "@/app/providers/authProvider";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CustomButton } from "../ui/Button";
import { useDeleteReview } from "@/hook/reviews/useDeleteReview";

interface ReviewCardProps {
  review: Review;
  onDeleted?: () => void;
}

export function ReviewCard({ review, onDeleted }: ReviewCardProps) {
  const { user } = useAuth()
  const { handleDelete } = useDeleteReview();
  const onDeleteClick = async () => {
      await handleDelete(review.id);
      onDeleted?.();
    };
  return (
    <Card className="flex gap-4  max-w-5xl  rounded-lg border p-4">
      {/* Avatar */}
      <img
        src={review.user.avatar_url ?? '/images/default-avatar.png'}
        alt={review.user.name ?? "User"}
        className="h-10 w-10 rounded-full object-cover"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
            {/* Bên trái */}
            <p className="font-medium">
              {review.user.name ?? "Anonymous"}
            </p>

            {/* Bên phải */}
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} readonly />
              {user?.id === review.user.id && (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <EllipsisVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-40 p-1">
                  <CustomButton
                    variant="secondary"
                    className="w-full justify-start text-red-600 hover:bg-red-50"
                    onClick={() => onDeleteClick()}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete review
                  </CustomButton>
                </PopoverContent>
              </Popover>
    )}
            </div>
        </div>


        <p className="mt-1 text-sm text-gray-600">
          {review.review}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          {new Date(review.created_at).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
}
