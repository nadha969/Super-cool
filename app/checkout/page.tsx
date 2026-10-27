"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartcontext";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const vat = Math.round(subtotal * 5) / 100;

const stripeFee =
  Math.round((subtotal + vat) * 3) / 100;

const total = subtotal + vat + stripeFee;

  const formatPrice = (price: number) =>
    `AED ${price.toLocaleString("en-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (items.length === 0) {
      toast.error("Your cart is empty");
      router.push("/cart");
      return;
    }

    // The checkout API requires product slugs.
    const cartItems = items as (typeof items[number] & {
      slug?: string;
    })[];

    if (cartItems.some((item) => !item.slug?.trim())) {
      toast.error(
        "Product information is missing. Please update your cart and try again."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          items: cartItems.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
          })),
          paymentMethod: "stripe",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      if (!data.url) {
        throw new Error("Stripe payment URL was not returned");
      }

      // Redirect the customer to Stripe's secure checkout.
      window.location.href = data.url;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mt-2 text-gray-500">
            Enter your delivery details to complete your order.
            No customer account is required.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-4 text-5xl">🛒</div>
            <h2 className="text-xl font-bold">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">
              Add products before proceeding to checkout.
            </p>
            <button
              type="button"
              onClick={() => router.push("/cart")}
              className="mt-6 rounded-lg bg-[#1a2b6d] px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Return to Cart
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid items-start gap-8 lg:grid-cols-3">
              <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Delivery Information
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={customer.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={customer.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern="[+]?[0-9\s()-]{7,20}"
                      value={customer.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      required
                      minLength={5}
                      rows={3}
                      value={customer.address}
                      onChange={handleChange}
                      placeholder="Building, street name, apartment or villa"
                      className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Emirate / City *
                    </label>
                    <select
                      id="city"
                      name="city"
                      required
                      value={customer.city}
                      onChange={(e) =>
                        setCustomer((previous) => ({
                          ...previous,
                          city: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select Emirate</option>
                      <option value="Abu Dhabi">Abu Dhabi</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Sharjah">Sharjah</option>
                      <option value="Ajman">Ajman</option>
                      <option value="Umm Al Quwain">Umm Al Quwain</option>
                      <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                      <option value="Fujairah">Fujairah</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="postalCode"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Postal Code (Optional)
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      autoComplete="postal-code"
                      value={customer.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code, if applicable"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="notes"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={2}
                      value={customer.notes}
                      onChange={handleChange}
                      placeholder="Delivery instructions or additional information"
                      className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </section>

              <aside className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg bg-gray-100 object-contain p-1"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                          🛍️
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 font-semibold text-[#1a2b6d]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-5">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    Payment Method
                  </h3>

                  <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <span className="text-xl" aria-hidden="true">
                      🔒
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">
                        Secure Online Payment
                      </p>
                      <p className="mt-1 text-sm text-gray-600">
                        Pay securely through Stripe.
                      </p>
                    </div>
                  </div>
                </div>

              <div className="flex justify-between gap-3 text-gray-600">
  <span>Subtotal</span>
  <span>{formatPrice(subtotal)}</span>
</div>

<div className="flex justify-between gap-3 text-gray-600">
  <span>VAT (5%)</span>
  <span>{formatPrice(vat)}</span>
</div>

<div className="flex justify-between gap-3 text-gray-600">
  <span>Payment Processing Fee (3%)</span>
  <span>{formatPrice(stripeFee)}</span>
</div>

<div className="flex justify-between gap-3 border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
  <span>Total</span>
  <span>{formatPrice(total)}</span>
</div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-xl bg-[#1a2b6d] px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Redirecting to Stripe..." : "Continue to Payment"}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => router.push("/cart")}
                  className="mt-3 w-full rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  Back to Cart
                </button>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Secure payment · Guest checkout · No account required
                </p>
              </aside>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}