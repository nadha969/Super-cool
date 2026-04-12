import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const products = await Product.find({
      category: slug,
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching category products" },
      { status: 500 }
    );
  }
}