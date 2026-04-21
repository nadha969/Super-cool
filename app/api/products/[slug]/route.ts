import { connectDB } from "@/lib/mongodb";
import Product from "@/model/product";
import { NextResponse } from "next/server";

// GET SINGLE PRODUCT
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
    
  }
}

// DELETE PRODUCT
export async function DELETE(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const deletedProduct = await Product.findOneAndDelete({ slug });

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}

// UPDATE PRODUCT
export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;
    const body = await req.json();

    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      {
        name: body.name,
        brand: body.brand,
        category: body.category,
        price: body.price,
        description: body.description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product updated successfully",
      success: true,
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}


