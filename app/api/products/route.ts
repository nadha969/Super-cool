import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const brand = formData.get("brand") as string;
    const category = formData.get("category") as string;
    const descriptionRaw = formData.get("description") as string;
    const file = formData.get("image") as File | null;

    let imageUrl = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = Date.now() + "-" + file.name;

      const uploadPath = path.join(
        process.cwd(),
        "public/products"
      );

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      fs.writeFileSync(
        path.join(uploadPath, fileName),
        buffer
      );

      imageUrl = "/products/" + fileName;
    }

    const description = JSON.parse(descriptionRaw);

    const product = await Product.create({
      name,
      slug: slug + "-" + Date.now(),
      brand,
      category,
      image: imageUrl,
      description,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Upload Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  const products = await Product.find().sort({
    createdAt: -1,
  });

  return NextResponse.json(products);
}