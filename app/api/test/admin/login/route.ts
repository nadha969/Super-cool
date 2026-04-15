import { connectDB } from "@/lib/mongodb";
import Admin from "@/model/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }

    // Access Token (short life)
    const accessToken = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    // Refresh Token (long life)
    const refreshToken = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Login Success ✅",
      accessToken,
    });

    // Store refresh token in cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  }  catch (error: any) {
  console.error("LOGIN ERROR:", error);
  
  return NextResponse.json(
    {
      message: "Server Error",
      error: error.message,
    },
    { status: 500 }
  );
}
}
