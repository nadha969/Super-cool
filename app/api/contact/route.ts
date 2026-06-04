import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Contact from "@/model/contact";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      firstName,
      lastName,
      email,
      phone,
      message,
    } = await req.json();

    // Save to MongoDB
    await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    // Email transporter
  const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 587,
  secure: false,
  auth: {
    user: "sales@acmartuae.com",
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.verify();
console.log("SMTP VERIFIED");
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "sales@acmartuae.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>

        <p><strong>Name:</strong> ${firstName} ${lastName}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Phone:</strong> ${phone}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: any) {
    console.error("CONTACT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to send message",
      },
      { status: 500 }
    );
  }
}