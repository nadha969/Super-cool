"use client";

import { useCallback, useEffect, useState } from "react";

type Order = {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

type Stats = {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
};

const statuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;

  const currentOrders = orders.slice(
    startIndex,
    startIndex + ordersPerPage
  );

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (status !== "All") {
        params.set("status", status);
      }

      const response = await fetch(
        `/api/admin/orders?${params.toString()}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load orders.");
      }

      const fetchedOrders: Order[] = data.orders || [];

      setOrders(fetchedOrders);

      setStats(
        data.stats || {
          totalOrders: 0,
          pendingOrders: 0,
          deliveredOrders: 0,
        }
      );

      // Keep the current page valid when the results change.
      setCurrentPage((page) =>
        Math.min(
          page,
          Math.max(1, Math.ceil(fetchedOrders.length / ordersPerPage))
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchOrders();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchOrders]);

  async function updateStatus(
    orderId: string,
    orderStatus: string
  ) {
    setUpdatingId(orderId);
    setError("");

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {}),
        },
        body: JSON.stringify({ orderId, orderStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update order.");
      }

      await fetchOrders();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update order."
      );
    } finally {
      setUpdatingId("");
    }
  }

  function formatMoney(amount: number, currency: string) {
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: (currency || "AED").toUpperCase(),
    }).format(amount);
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 pt-12 sm:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Order statistics */}
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Orders", value: stats.totalOrders },
            { label: "Pending Orders", value: stats.pendingOrders },
            { label: "Delivered Orders", value: stats.deliveredOrders },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-gray-500">
                {item.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search and filters */}
        <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Search order number or customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="All">All statuses</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>

            <button
              onClick={() => void fetchOrders()}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Orders table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="border-b bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Order Status</th>
                  <th className="p-4">Update Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-gray-500"
                    >
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-8 text-center text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  currentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-0"
                    >
                      <td className="p-4">
                        <p className="font-semibold">
                          {order.orderNumber}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </td>

                      <td className="p-4">
                        <p className="font-medium">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer.phone}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer.city}
                        </p>
                      </td>

                      <td className="p-4 text-sm">
                        {order.items.map((item, index) => (
                          <p key={`${item.name}-${index}`}>
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                      </td>

                      <td className="p-4 font-semibold">
                        {formatMoney(
                          order.totalAmount,
                          order.currency
                        )}
                      </td>

                      <td className="p-4">
                        <p className="capitalize">
                          {order.paymentMethod}
                        </p>

                        <span
                          className={`text-sm font-medium ${
                            order.paymentStatus === "paid"
                              ? "text-green-600"
                              : order.paymentStatus === "failed"
                                ? "text-red-600"
                                : "text-amber-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="p-4 capitalize">
                        {order.orderStatus}
                      </td>

                      <td className="p-4">
                        <select
                          value={order.orderStatus}
                          disabled={updatingId === order._id}
                          onChange={(e) =>
                            void updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-gray-300 p-2 disabled:opacity-50"
                        >
                          {statuses.map((item) => (
                            <option key={item} value={item}>
                              {item.charAt(0).toUpperCase() +
                                item.slice(1)}
                            </option>
                          ))}
                        </select>

                        {updatingId === order._id && (
                          <p className="mt-1 text-xs text-gray-500">
                            Updating...
                          </p>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && orders.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1}–
                {Math.min(
                  startIndex + ordersPerPage,
                  orders.length
                )}{" "}
                of {orders.length} orders
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1)
                    )
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
                    className={`min-w-10 rounded-lg border px-3 py-2 text-sm font-medium ${
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
        </div>
      </div>
    </main>
  );
}
