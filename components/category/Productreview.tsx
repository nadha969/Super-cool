
"use client";

import { FormEvent, useEffect, useState } from "react";

type Review = {
  _id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
};

type ReviewsPageProps = {
  productSlug: string;
};

type Toast = {
  message: string;
  type: "success" | "error";
};

export default function ReviewsPage({
  productSlug,
}: ReviewsPageProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [hoverRating, setHoverRating] = useState(0);
  const [toast, setToast] = useState<Toast | null>(null);

  // Automatically hide the toast after 4 seconds.
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Load approved reviews for this product.
  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      setLoadingReviews(true);

      try {
        const response = await fetch(
          `/api/reviews?productSlug=${encodeURIComponent(productSlug)}`,
          { cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load reviews.");
        }

        if (!cancelled) {
          setReviews(
            Array.isArray(data.reviews) ? data.reviews : []
          );
        }
      } catch {
        if (!cancelled) {
          setReviews([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingReviews(false);
        }
      }
    }

    void loadReviews();

    return () => {
      cancelled = true;
    };
  }, [productSlug]);

  // Submit a customer review.
  async function submitReview(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setToast(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productSlug,
          name: name.trim(),
          rating,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to submit your review."
        );
      }

      // Reset the form after successful submission.
      setName("");
      setRating(5);
      setHoverRating(0);
      setMessage("");

      setToast({
        type: "success",
        message:
          "Review submitted successfully! It will appear after admin approval.",
      });
    } catch (error) {
      setToast({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (total, review) => total + review.rating,
          0
        ) / reviews.length
      : 0;

  return (
    <section className="relative mx-auto mt-14 max-w-6xl border-t border-slate-200 pt-10 sm:mt-20 sm:pt-14">
      {/* Toast notification */}
      {toast && (
        <div
          key={`${toast.type}-${toast.message}`}
          role={toast.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-xl sm:right-6 sm:top-6 ${
            toast.type === "success"
              ? "border-green-200"
              : "border-red-200"
          }`}
        >
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
              toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {toast.type === "success" ? "✓" : "!"}
          </div>

          <div className="flex-1 pt-1">
            <p
              className={`text-sm font-semibold ${
                toast.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {toast.type === "success"
                ? "Success"
                : "Something went wrong"}
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-600">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Close notification"
            className="rounded-md px-1 text-xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Heading */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Customer Reviews
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Real feedback from customers to help you make a confident
              choice.
            </p>
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-3xl font-bold text-slate-900">
                {averageRating.toFixed(1)}
              </span>

              <div>
                <div
                  className="text-lg tracking-wide text-amber-500"
                  aria-label={`${averageRating.toFixed(1)} out of 5 stars`}
                >
                  ★★★★★
                </div>

                <p className="text-xs text-slate-500">
                  Based on {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-10">
        {/* Customer reviews */}
        <div className="order-2 space-y-4 lg:order-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              What customers say
            </h3>

            <span className="text-sm text-slate-500">
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>

          {loadingReviews ? (
            <div className="space-y-3">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 p-5"
                >
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="mt-4 h-3 w-full rounded bg-slate-100" />
                  <div className="mt-2 h-3 w-3/4 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            reviews.map((review) => {
              const safeRating = Math.max(
                0,
                Math.min(5, Math.round(review.rating))
              );

              return (
                <article
                  key={review._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow duration-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-bold text-blue-700">
                        {review.name.trim().charAt(0).toUpperCase() ||
                          "C"}
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate font-semibold text-slate-900">
                          {review.name}
                        </h4>
                      </div>
                    </div>

                    <span
                      className="shrink-0 text-sm tracking-wider text-amber-500"
                      aria-label={`${safeRating} out of 5 stars`}
                    >
                      {"★".repeat(safeRating)}
                      <span className="text-slate-200">
                        {"★".repeat(5 - safeRating)}
                      </span>
                    </span>
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                    {review.message}
                  </p>

                  <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
                    {review.createdAt
                      ? new Date(
                          review.createdAt
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                <span className="text-amber-500">★</span>
              </div>

              <h4 className="mt-4 font-semibold text-slate-900">
                Be the first to share your experience
              </h4>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Have you tried this product? Share your feedback and help
                other customers.
              </p>
            </div>
          )}
        </div>

        {/* Review form */}
        <div className="order-1 lg:order-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Your opinion matters
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                Write a review
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Tell us about your experience with this product.
              </p>
            </div>

            <form onSubmit={submitReview} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Your name
                </span>

                <input
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                  placeholder="Enter your name"
                />
              </label>

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-slate-700">
                  Your rating
                </legend>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      aria-pressed={rating === star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onFocus={() => setHoverRating(star)}
                      onBlur={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="rounded-md p-1 text-3xl leading-none transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <span
                        className={
                          star <= (hoverRating || rating)
                            ? "text-amber-400"
                            : "text-slate-200"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}

                  <span className="ml-2 text-sm font-medium text-slate-600">
                    {rating} out of 5
                  </span>
                </div>
              </fieldset>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Your review
                </span>

                <textarea
                  required
                  minLength={3}
                  maxLength={1500}
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                  placeholder="What did you like about this product?"
                />

                <span className="mt-1 block text-right text-xs text-slate-400">
                  {message.length}/1500
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-700/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Submitting review...
                  </>
                ) : (
                  "Submit review"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
