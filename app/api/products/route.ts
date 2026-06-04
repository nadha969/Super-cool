import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const rawSlug = formData.get("slug") as string;

const slug = rawSlug
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
    const brand = formData.get("brand") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const discount = formData.get("discount");

    const descriptionRaw = formData.get(
      "description"
    ) as string;

    // Get all images
    const imageFiles = formData.getAll(
      "images"
    ) as File[];

    const imageUrls: string[] = [];

    // Upload all images
    for (const file of imageFiles) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;

      const uploadRes =
        await cloudinary.uploader.upload(
          base64,
          {
            folder: "products",
          }
        );

      imageUrls.push(
        uploadRes.secure_url
      );
    }

    const description = JSON.parse(
      descriptionRaw
    );

    const product =
      await Product.create({
        name,
        slug:
          slug + "-" + Date.now(),
        brand,
        category,
        price,
        discount,

        // Save images array
        images: imageUrls,

        description,
      });

    return NextResponse.json(
      product
    );
  } catch (error) {
    console.error(
      "POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Upload Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();

  const products =
    await Product.find({ hidden: false }).sort({
      createdAt: -1,
    });

  return NextResponse.json(
    products
  );
}