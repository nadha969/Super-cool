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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;

  const currentReviews = reviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

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

      const fetchedReviews: Review[] = Array.isArray(data.reviews)
        ? data.reviews
        : Array.isArray(data)
          ? data
          : [];

      setReviews(fetchedReviews);

      // Keep the current page valid after reviews change.
      setCurrentPage((page) =>
        Math.min(page, Math.max(1, Math.ceil(fetchedReviews.length / reviewsPerPage)))
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
    if (
      action === "delete" &&
      !window.confirm("Delete this review permanently?")
    ) {
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
        throw new Error(
          "Please log in to the admin dashboard again."
        );
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
        <>
          <div className="space-y-4">
            {currentReviews.map((review) => {
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–
                {Math.min(
                  startIndex + reviewsPerPage,
                  reviews.length
                )}{" "}
                of {reviews.length} reviews
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={
                      currentPage === page ? "page" : undefined
                    }
                    className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium ${
                      currentPage === page
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
