import { useState } from "react";
import { reviewService } from "@/services/reviewService";
import type { SubmitReviewPayload } from "@/types/review";

export function useSubmitReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (payload: SubmitReviewPayload) => {
    try {
      setLoading(true);
      setError(null);

      const data = await reviewService.submitReview(payload);

      return data;
    } catch (err: unknown) {
      if (err instanceof Error ){ 
        setError(err.message || "Submit failed");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitReview,
    loading,
    error,
  };
}