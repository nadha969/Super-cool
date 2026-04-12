import { connectDB } from "@/lib/mongodb";
import Brand from "@/model/brand";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, slug, logo } = await req.json();

    const brand = await Brand.create({
      name,
      slug,
      logo,
    });

    return NextResponse.json({
      message: "Brand Added ✅",
      brand,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding brand", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  const brands = await Brand.find().sort({ createdAt: -1 });

  return NextResponse.json(brands);
}