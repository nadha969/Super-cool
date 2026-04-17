import { connectDB } from "@/lib/mongodb";
import Category from "@/model/category";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

      const fileName =
        Date.now() + "-" + image.name.replaceAll(" ", "-");

      const uploadPath = path.join(
        process.cwd(),
        "public/categories",
        fileName
      );

      fs.writeFileSync(uploadPath, buffer);

      imageUrl = `/categories/${fileName}`;
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

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Delete image file
    if (category.image) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        category.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
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