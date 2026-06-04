import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    let products = await Product.find({hidden:false,
      featured: true,
    }).limit(16);

    if (products.length === 0) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(16);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}