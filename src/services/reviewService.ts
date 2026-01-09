import type { SubmitReviewPayload } from "@/types/review";
import { getToken } from "@/utils/storeLoginToken";

export const reviewService = {
  submitReview: async (payload: SubmitReviewPayload) => {
    const { serviceID, ...body } = payload;
    const token = getToken();
    const res = await fetch(`/api/services/${serviceID}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to submit review");
    }

    return res.json();
  },
  deleteReview: async (reviewID: string) => {
    const token = getToken();
    const res = await fetch(`/api/reviews/${reviewID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete review");
    }

    return res.json();
  }
};
