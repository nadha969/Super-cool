
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Review from "@/model/review";

export const runtime = "nodejs";

type Context = {
  params: Promise<{ slug: string }>;
};

type AdminTokenPayload = {
  role?: string;
};

function verifyAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  const secret = process.env.JWT_ACCESS_SECRET;

  if (!token || !secret) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, secret) as AdminTokenPayload;
    return decoded.role === "admin";
  } catch {
    return false;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Context
) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in again." },
      { status: 401 }
    );
  }

  try {
    const { slug } = await params;

    if (!mongoose.isValidObjectId(slug)) {
      return NextResponse.json(
        { error: "Invalid review ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (body.status !== "approved") {
      return NextResponse.json(
        { error: "Invalid review status." },
        { status: 400 }
      );
    }

    await connectDB();

    const review = await Review.findByIdAndUpdate(
      slug,
      { status: "approved" },
      { new: true, runValidators: true }
    );

    if (!review) {
      return NextResponse.json(
        { error: "Review not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Review approved successfully.",
      review,
    });
  } catch (error) {
    console.error("Approve review error:", error);

    return NextResponse.json(
      { error: "Unable to approve review." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Context
) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in again." },
      { status: 401 }
    );
  }

  try {
    const { slug } = await params;

    if (!mongoose.isValidObjectId(slug)) {
      return NextResponse.json(
        { error: "Invalid review ID." },
        { status: 400 }
      );
    }

    await connectDB();

    const review = await Review.findByIdAndDelete(slug);

    if (!review) {
      return NextResponse.json(
        { error: "Review not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Review deleted successfully.",
    });
  } catch (error) {
    console.error("Delete review error:", error);

    return NextResponse.json(
      { error: "Unable to delete review." },
      { status: 500 }
    );
  }
}
