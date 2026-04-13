import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ brand: string }> } // ✅ IMPORTANT
) {
  try {
    await connectDB();

    const { brand } = await context.params;

    const products = await Product.find({
      brand: { $regex: `^${brand}$`, $options: "i" },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}