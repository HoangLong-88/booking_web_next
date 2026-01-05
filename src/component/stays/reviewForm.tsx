import { useState } from "react"
import { Label } from "../ui/label"
import { useSubmitReview } from "@/hook/reviews/useSubmitReview"
import { StarRating } from "../ui/Rating"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers/authProvider"
import { CustomButton } from "../ui/Button"
interface ReviewFormProps {
  serviceID: string;
  onSuccess?: () => void;
}

function ReviewForm({ serviceID, onSuccess }: ReviewFormProps) {
    const { user } = useAuth();
    const router  = useRouter();
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const { submitReview, loading } = useSubmitReview();
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault()
           if (!user) {
            router.push("/auth");
            return;
            }
          if (!comment.trim()) return
          await submitReview({
            serviceID,
            rating,
            review: comment.trim(),
            });
            onSuccess?.()
          setComment('')
          setRating(5)
        }}
        className="space-y-2"
        aria-label="Submit a review"
      >
        <div>
          <Label className="!relative !mb-1">Your rating</Label>
          <StarRating rating={rating} onChange={setRating} />
        </div>

        <div>
          <Label className="!relative !mb-1">Your review</Label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm min-h-[88px] peer placeholder-transparent"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <CustomButton 
          type="submit" 
          disabled={loading} 
          className="px-4 py-2 bg-emerald-700 text-white rounded-md"
          >
            {loading ? 'Posting...' : 'Post review'}
          </CustomButton>
          <div className="text-sm text-slate-500">Be constructive and concise.</div>
        </div>
      </form>
    )
  }
export { ReviewForm }