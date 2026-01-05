import { useState } from "react"
import { Star } from "lucide-react"

type StarRatingProps = {
  rating: number
  onChange?: (value: number) => void
  readonly?: boolean
}

export function StarRating({
  rating,
  onChange,
  readonly = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)

  const displayRating = hoverRating ?? rating

  return (
    <div
      className="flex gap-1"
      onMouseLeave={() => setHoverRating(null)}
      aria-label="Star rating"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1
        const isFilled = starValue <= displayRating

        return (
          <Star
            key={i}
            size={20}
            className={`transition-colors ${
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${!readonly ? "cursor-pointer" : ""}`}
            onMouseEnter={() => !readonly && setHoverRating(starValue)}
            onClick={() => !readonly && onChange?.(starValue)}
          />
        )
      })}
    </div>
  )
}
