
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import Review from "@/model/review";

export const runtime = "nodejs";

type AdminTokenPayload = {
  id?: string;
  email?: string;
  role?: string;
};

// Verify admin JWT token
function isAdmin(request: NextRequest): boolean {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return false;
    }

    const token = authHeader.slice(7);
    const secret = process.env.JWT_ACCESS_SECRET;

    if (!secret) {
      console.error("JWT_ACCESS_SECRET is not configured.");
      return false;
    }

    const decoded = jwt.verify(
      token,
      secret
    ) as AdminTokenPayload;

    return decoded.role === "admin";
  } catch (error) {
    console.error("Admin authentication failed:", error);
    return false;
  }
}

// GET reviews
// Admin: all reviews
// Public: approved reviews only, optionally filtered by productSlug
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get("authorization");
    const hasToken = Boolean(authHeader);

    if (hasToken && !isAdmin(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const admin = isAdmin(request);

    const productSlug =
      request.nextUrl.searchParams
        .get("productSlug")
        ?.trim();

    const filter: Record<string, unknown> = admin
      ? {}
      : { status: "approved" };

    if (productSlug) {
      filter.productSlug = productSlug;
    }

   
const reviews = await Review.find(filter)
  .sort({ createdAt: -1 })
  .lean();

console.log(
  "Review ID check:",
  reviews.map((review) => ({
    id: String(review._id),
    idType: typeof review._id,
    productSlug: review.productSlug,
  }))
);


    console.log("Admin request:", admin);
    console.log("Product slug:", productSlug || "all");
    console.log("Reviews found:", reviews.length);

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Review fetch error:", error);

    return NextResponse.json(
      { error: "Unable to load reviews." },
      { status: 500 }
    );
  }
}

// POST a new review
// All new reviews require admin approval
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const productSlug =
      typeof body.productSlug === "string"
        ? body.productSlug.trim()
        : "";

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const rating = Number(body.rating);

    if (
      !productSlug ||
      productSlug.length > 200 ||
      name.length < 2 ||
      name.length > 80 ||
      message.length < 3 ||
      message.length > 1500 ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          error:
            "Enter a valid product, name, rating and review.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const review = await Review.create({
      productSlug,
      name,
      message,
      rating,
      status: "pending",
    });

    return NextResponse.json(
      {
        message: "Review submitted for approval.",
        reviewId: review._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST review error:", error);

    return NextResponse.json(
      { error: "Unable to submit review." },
      { status: 500 }
    );
  }
}
