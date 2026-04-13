import { connectDB } from "@/lib/mongodb";
import Category from "@/model/category";
import { NextResponse } from "next/server";

// GET all categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ADD category
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const slug = body.name
      .toLowerCase()
      .replaceAll(" ", "-");

    const category = await Category.create({
      name: body.name,
      slug,
      image: body.image || "",
    });

    return NextResponse.json({
      message: "Category Added ✅",
      category,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}