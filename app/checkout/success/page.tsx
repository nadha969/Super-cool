"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/context/cartcontext";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderNumber = searchParams.get("orderNumber");

  const { clearCart } = useCart();

  const [status, setStatus] = useState<
    "checking" | "paid" | "cod" | "pending" | "error"
  >("checking");

  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let active = true;

    async function verifyPayment() {
      // COD orders have an order number but no Stripe session ID.
      if (orderNumber && !sessionId) {
        if (active) {
          setStatus("cod");
          clearCart();
        }
        return;
      }

      // A Stripe redirect alone does not prove payment.
      if (!sessionId) {
        if (active) setStatus("error");
        return;
      }

      try {
        const response = await fetch(
          `/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to verify payment.");
        }

        if (active) {
          if (data.paymentStatus === "paid") {
            setStatus("paid");
            clearCart();
          } else {
            setStatus("pending");
          }
        }
      } catch (error) {
        console.error("Payment verification error:", error);

        if (active) setStatus("error");
      }
    }

    verifyPayment();

    return () => {
      active = false;
    };
  }, [sessionId, orderNumber]); // clearCart intentionally excluded

  const title = {
    checking: "Verifying your order...",
    paid: "Payment Successful!",
    cod: "Order Placed Successfully!",
    pending: "Payment Is Being Processed",
    error: "Unable to Confirm Your Order",
  }[status];

  const description = {
    checking: "Please wait while we check your order details.",
    paid:
      "Your online payment has been confirmed. Thank you for shopping with AcMart UAE!",
    cod:
      "Your order has been placed. Please pay when your order is delivered.",
    pending:
      "We have not confirmed your payment yet. Please wait before attempting another payment.",
    error:
      "We couldn't verify your order. Please contact our support team before placing another order.",
  }[status];

  const success = status === "paid" || status === "cod";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 pt-32">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
        <div
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl ${
            success
              ? "bg-green-100 text-green-600"
              : status === "error"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
          }`}
        >
          {success ? "✓" : status === "error" ? "!" : "…"}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-4 leading-7 text-gray-600">{description}</p>

        {orderNumber && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="mt-1 font-semibold text-gray-900">
              {orderNumber}
            </p>
          </div>
        )}

        {status === "pending" && (
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Check Again
          </button>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-[#1a2b6d] px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Continue Shopping
          </Link>

          {status === "error" && (
            <Link
              href="/cart"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              View Cart
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}