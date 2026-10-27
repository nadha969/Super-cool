
"use client";

import { useCart } from "@/context/cartcontext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CartPage() {
  const router = useRouter();

  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // VAT: 5%
  const vat = subtotal * 0.05;

  // Payment processing fee: 3% of subtotal + VAT
  const stripeFee = (subtotal + vat) * 0.03;

  // Final total
  const total = subtotal + vat + stripeFee;

  const formatPrice = (price: number) =>
    `AED ${price.toLocaleString("en-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    toast.success("Product removed from cart");
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="mt-2 text-gray-500">
              {items.length}{" "}
              {items.length === 1 ? "product" : "products"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Continue Shopping
          </button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-6xl">🛒</div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Add some products to your cart to get started.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 rounded-lg bg-[#1a2b6d] px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* Cart Products */}
            <section className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  {/* Product Image */}
                  <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:w-32">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        No image
                      </span>
                    )}
                  </div>

                  {/* Product Information */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="mt-2 font-bold text-[#1a2b6d]">
                      {formatPrice(item.price)}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.productId)}
                      className="mt-3 text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 self-start rounded-lg border border-gray-200 p-1 sm:self-center">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1
                        )
                      }
                      className="h-9 w-9 rounded-md text-xl hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1
                        )
                      }
                      className="h-9 w-9 rounded-md text-xl hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right sm:min-w-28">
                    <p className="text-sm text-gray-500">
                      Item total
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared");
                  }}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </button>
              </div>
            </section>

            {/* Order Summary */}
            <aside className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span>VAT (5%)</span>
                  <span>{formatPrice(vat)}</span>
                </div>

                <div className="flex justify-between gap-4 text-gray-600">
                  <span className="text-xs">Payment Processing Fee (3%)</span>
                  <span className="text-xs">{formatPrice(stripeFee)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between gap-4 text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-6 w-full rounded-xl bg-[#1a2b6d] px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Secure checkout. Final tax and delivery charges will be
                confirmed before payment.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
