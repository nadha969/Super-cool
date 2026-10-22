
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/mongodb";
import Order from "@/model/order";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId || !sessionId.startsWith("cs_")) {
      return NextResponse.json(
        { message: "Invalid checkout session." },
        { status: 400 }
      );
    }

    // Retrieve the actual payment session from Stripe.
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const orderId = session.metadata?.orderId;
    const orderNumber = session.metadata?.orderNumber;

    if (!orderId || !mongoose.isValidObjectId(orderId) || !orderNumber) {
      return NextResponse.json(
        { message: "Order information is missing." },
        { status: 400 }
      );
    }

    await connectDB();

    const order = await Order.findOne({
      _id: orderId,
      orderNumber,
      stripeSessionId: session.id,
      paymentMethod: "stripe",
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    // Confirm amount and currency before reporting payment status.
    if (
      session.currency !== order.currency.toLowerCase() ||
      session.amount_total !== Math.round(order.totalAmount * 100)
    ) {
      return NextResponse.json(
        { message: "Payment amount verification failed." },
        { status: 400 }
      );
    }

    if (session.payment_status === "paid") {
      if (order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        await order.save();
      }

      return NextResponse.json({
        paymentStatus: "paid",
        orderNumber: order.orderNumber,
      });
    }

    return NextResponse.json({
      paymentStatus: "pending",
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      { message: "Unable to verify payment right now." },
      { status: 500 }
    );
  }
}
