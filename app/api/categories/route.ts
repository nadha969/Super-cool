import { connectDB } from "@/lib/mongodb";
import Category from "@/model/category";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET
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

// POST
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File;

    const slug = name.toLowerCase().trim().replaceAll(" ", "-");

    let imageUrl = "";

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = `data:${image.type};base64,${buffer.toString("base64")}`;

      const uploadRes = await cloudinary.uploader.upload(base64, {
        folder: "categories",
      });

      imageUrl = uploadRes.secure_url;
    }

    const category = await Category.create({
      name,
      slug,
      image: imageUrl,
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

// DELETE
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Category ID required" },
        { status: 400 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Category Deleted ✅",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}