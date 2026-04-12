import { connectDB } from "@/lib/mongodb";
import Category from "@/model/category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, slug, image } = await req.json();

    const category = await Category.create({
      name,
      slug,
      image,
    });

    return NextResponse.json({
      message: "Category Added ✅",
      category,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding category", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  const categories = await Category.find().sort({ createdAt: -1 });

  return NextResponse.json(categories);
}