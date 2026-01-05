import { useState } from "react";
import { reviewService } from "@/services/reviewService";
import type { SubmitReviewPayload } from "@/types/review";

export function useDeleteReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (reviewID: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await reviewService.deleteReview(reviewID);

      return data;
    } catch (err: unknown) {
      if (err instanceof Error ){ 
        setError(err.message || "Delete failed");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDelete,
    loading,
    error,
  };
}