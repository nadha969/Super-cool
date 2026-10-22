
import { NextResponse } from "next/server";
import Stripe from "stripe";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Order from "@/model/order";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { message: "Missing Stripe webhook configuration." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Stripe signature verification failed:", error);

    return NextResponse.json(
      { message: "Invalid webhook signature." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status !== "paid") {
          break;
        }

        const orderId = session.metadata?.orderId;

        if (!orderId || !mongoose.isValidObjectId(orderId)) {
          console.error("Invalid or missing orderId in Stripe metadata");
          return NextResponse.json(
            { message: "Invalid order reference." },
            { status: 400 }
          );
        }

        // Match the session to its order and verify the amount.
        const order = await Order.findOne({
          _id: orderId,
          orderNumber: session.metadata?.orderNumber,
          stripeSessionId: session.id,
          paymentMethod: "stripe",
        });

        if (!order) {
          console.error("Order not found for Stripe session:", session.id);
          return NextResponse.json(
            { message: "Order not found." },
            { status: 404 }
          );
        }

        if (
          session.currency !== order.currency.toLowerCase() ||
          session.amount_total !== Math.round(order.totalAmount * 100)
        ) {
          console.error("Stripe amount or currency mismatch:", session.id);
          return NextResponse.json(
            { message: "Payment amount verification failed." },
            { status: 400 }
          );
        }

        // Never downgrade or reconfirm an already-paid order.
        if (order.paymentStatus !== "paid") {
          order.paymentStatus = "paid";
          order.orderStatus = "confirmed";
          await order.save();
        }

        break;
      }

      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        await Order.findOneAndUpdate(
          {
            stripeSessionId: session.id,
            paymentMethod: "stripe",
            paymentStatus: "pending",
          },
          {
            $set: {
              paymentStatus: "failed",
            },
          }
        );

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return NextResponse.json(
      { message: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
