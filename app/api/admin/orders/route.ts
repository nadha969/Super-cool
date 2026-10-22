
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/model/order";

export const runtime = "nodejs";

const allowedStatuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const search = request.nextUrl.searchParams.get("search")?.trim() || "";
    const status = request.nextUrl.searchParams.get("status") || "All";

    const filter: Record<string, unknown> = {};

    if (status !== "All") {
      if (!allowedStatuses.includes(status as (typeof allowedStatuses)[number])) {
        return NextResponse.json(
          { message: "Invalid order status." },
          { status: 400 }
        );
      }

      filter.orderStatus = status;
    }

    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
      ];
    }

    const [orders, totalOrders, pendingOrders, deliveredOrders] =
      await Promise.all([
        Order.find(filter).sort({ createdAt: -1 }).lean(),
        Order.countDocuments(),
        Order.countDocuments({ orderStatus: "pending" }),
        Order.countDocuments({ orderStatus: "delivered" }),
      ]);

    return NextResponse.json({
      orders,
      stats: { totalOrders, pendingOrders, deliveredOrders },
    });
  } catch (error) {
    console.error("Admin orders GET error:", error);
    return NextResponse.json(
      { message: "Unable to fetch orders." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderStatus } = body;

    if (
      typeof orderId !== "string" ||
      !/^[a-f\d]{24}$/i.test(orderId) ||
      !allowedStatuses.includes(orderStatus)
    ) {
      return NextResponse.json(
        { message: "Invalid order ID or status." },
        { status: 400 }
      );
    }

    await connectDB();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    // Prevent an admin status update from marking an unpaid order
    // as confirmed, processing, shipped, or delivered.
    if (
      ["confirmed", "processing", "shipped", "delivered"].includes(orderStatus) &&
      order.paymentStatus !== "paid"
    ) {
      return NextResponse.json(
        { message: "Only paid orders can be confirmed or fulfilled." },
        { status: 400 }
      );
    }

    order.orderStatus = orderStatus;
    await order.save();

    return NextResponse.json({
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Admin orders PATCH error:", error);
    return NextResponse.json(
      { message: "Unable to update order status." },
      { status: 500 }
    );
  }
}
