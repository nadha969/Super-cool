
"use client";

import { useCallback, useEffect, useState } from "react";

type Review = {
  _id: string;
  name: string;
  rating: number;
  message: string;
  status: "pending" | "approved";
  productSlug: string;
  createdAt: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const getAuthHeaders = useCallback((): HeadersInit => {
    const token = localStorage.getItem("accessToken");

    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }, []);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        headers: getAuthHeaders(),
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load reviews.");
      }

      setReviews(
        Array.isArray(data.reviews)
          ? data.reviews
          : Array.isArray(data)
            ? data
            : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

 
const handleAction = async (
  id: string,
  action: "approve" | "delete"
) => {
  if (action === "delete" &&
      !window.confirm("Delete this review permanently?")) {
    return;
  }

  const reviewId = String(id).trim();

  if (!/^[a-fA-F0-9]{24}$/.test(reviewId)) {
    setError(`Invalid review ID received: ${reviewId || "(empty)"}`);
    return;
  }

  setActionLoading(`${reviewId}-${action}`);
  setError("");

  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("Please log in to the admin dashboard again.");
    }

    const response = await fetch(
      `/api/reviews/${encodeURIComponent(reviewId)}`,
      {
        method: action === "approve" ? "PATCH" : "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          ...(action === "approve"
            ? { "Content-Type": "application/json" }
            : {}),
        },
        ...(action === "approve"
          ? { body: JSON.stringify({ status: "approved" }) }
          : {}),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to update review.");
    }

    await loadReviews();
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Something went wrong."
    );
  } finally {
    setActionLoading(null);
  }
};


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Customer Reviews
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review customer feedback and approve reviews before publishing.
          </p>
        </div> */}

        {/* <button
          onClick={() => void loadReviews()}
          disabled={loading}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Refresh
        </button> */}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
          No customer reviews found.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const rating = Math.max(
              0,
              Math.min(5, Number(review.rating) || 0)
            );

            return (
              <article
                key={review._id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>

                    <p className="mt-1 text-lg text-amber-500">
                      {"★".repeat(rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - rating)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({rating}/5)
                      </span>
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      review.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {review.status}
                  </span>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                  {review.message}
                </p>

                <p className="mt-3 break-all text-xs text-gray-500">
                  Product: {review.productSlug || "Not specified"}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : ""}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {review.status === "pending" && (
                    <button
                      onClick={() =>
                        void handleAction(review._id, "approve")
                      }
                      disabled={actionLoading !== null}
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading === `${review._id}-approve`
                        ? "Approving..."
                        : "Approve"}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      void handleAction(review._id, "delete")
                    }
                    disabled={actionLoading !== null}
                    className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading === `${review._id}-delete`
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
