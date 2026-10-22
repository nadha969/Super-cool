
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/Layout/Conditionallayoyt";
import { ToastContainer } from "react-toastify";
import WhatsAppButton from "@/components/category/Whatsappbutton";
import { CartProvider } from "@/context/cartcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ac mart UAE",
  description: "Best Air Conditioner Products in UAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>

          <WhatsAppButton />
          <ToastContainer
            position="top-right"
            autoClose={2000}
          />
        </CartProvider>
      </body>
    </html>
  );
}
