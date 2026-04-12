import { connectDB } from "@/lib/mongodb";
import Admin from "@/model/admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const hashedPassword = await bcrypt.hash("12345678", 10);

  await Admin.create({
    email: "admin@gmail.com",
    password: hashedPassword,
  });

  return NextResponse.json({ message: "Admin Created ✅" });
}