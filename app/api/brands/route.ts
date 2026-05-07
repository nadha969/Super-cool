import { connectDB } from "@/lib/mongodb";
import Brand from "@/model/brand";
import { NextResponse } from "next/server";

// GET BRANDS
export async function GET() {
  try {
    await connectDB();

    const brands = await Brand.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(brands);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ADD BRAND
export async function POST(req: Request) {
  try {
    await connectDB();

    const { name } = await req.json();

    const slug = name
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-");

    const brand = await Brand.create({
      name,
      slug,
    });

    return NextResponse.json({
      message: "Brand Added",
      brand,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// DELETE BRAND
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    await Brand.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Brand Deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}