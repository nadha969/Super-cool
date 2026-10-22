
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import Order from "@/model/order";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const VAT_RATE = 0.05;

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { items, customer, paymentMethod } = body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address ||
      !customer?.city ||
      !["stripe", "cod"].includes(paymentMethod)
    ) {
      return NextResponse.json(
        { message: "Please provide valid order and customer details." },
        { status: 400 }
      );
    }

    // Fetch products and calculate prices from MongoDB.
    const orderItems = [];

    for (const item of items) {
      const slug =
        typeof item?.slug === "string" ? item.slug.trim() : "";
      const quantity = Number(item?.quantity);

      if (
        !slug ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return NextResponse.json(
          { message: "Invalid product or quantity." },
          { status: 400 }
        );
      }

      const product = await Product.findOne({
        slug,
        hidden: { $ne: true },
        outOfStock: { $ne: true },
      }).lean();

      if (!product) {
        return NextResponse.json(
          { message: `Product unavailable: ${slug}` },
          { status: 400 }
        );
      }

      const price = Number(product.price);

      if (!Number.isFinite(price) || price <= 0) {
        return NextResponse.json(
          { message: `Invalid price for ${product.name}` },
          { status: 400 }
        );
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        image: product.images?.[0] || "",
        price,
        quantity,
      });
    }

    // Calculate subtotal in fils to avoid currency rounding errors.
    const subtotalInFils = orderItems.reduce(
      (total, item) =>
        total + Math.round(item.price * 100) * item.quantity,
      0
    );

    // Calculate 5% VAT.
    const vatInFils = Math.round(subtotalInFils * VAT_RATE);

    // Final total includes VAT.
    const totalInFils = subtotalInFils + vatInFils;

    const subtotal = subtotalInFils / 100;
    const vatAmount = vatInFils / 100;
    const totalAmount = totalInFils / 100;

    const orderNumber = `ACM-${Date.now()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const order = await Order.create({
      orderNumber,
      customer: {
        name: String(customer.name).trim(),
        email: String(customer.email).trim(),
        phone: String(customer.phone).trim(),
        address: String(customer.address).trim(),
        city: String(customer.city).trim(),
      },
      items: orderItems,
      totalAmount,
      currency: "aed",
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    // Cash on Delivery: VAT is included in the saved total.
    if (paymentMethod === "cod") {
      return NextResponse.json({
        message: "Order placed successfully.",
        orderNumber: order.orderNumber,
        subtotal,
        vatAmount,
        totalAmount,
      });
    }

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      await Order.findByIdAndDelete(order._id);

      return NextResponse.json(
        { message: "Website URL is not configured." },
        { status: 500 }
      );
    }

    // Stripe receives product prices plus a separate VAT line item.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: String(customer.email).trim(),

      line_items: [
        ...orderItems.map((item) => ({
          price_data: {
            currency: "aed",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: "VAT (5%)",
            },
            unit_amount: vatInFils,
          },
          quantity: 1,
        },
      ],

      metadata: {
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
      },

      success_url: `${baseUrl.replace(/\/$/, "")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl.replace(/\/$/, "")}/checkout/cancel`,
    });

    order.stripeSessionId = session.id;
    await order.save();

    return NextResponse.json({
      url: session.url,
      orderNumber: order.orderNumber,
      subtotal,
      vatAmount,
      totalAmount,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return NextResponse.json(
      { message: "Unable to process checkout right now." },
      { status: 500 }
    );
  }
}
