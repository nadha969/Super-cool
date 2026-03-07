"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full">

      {/* Top Footer */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo + Contact */}
          <div className="space-y-4">
            <Image
              src="https://shop.supercooluae.com/cdn/shop/files/Super_Cool_Ai_Conditioning_Trading_LLC.png?v=1747037695&width=600"
              alt="Super Cool"
              width={150}
              height={60}
            />

            <p className="text-gray-700 underline cursor-pointer">
              04 328 1682
            </p>

            <p className="text-gray-700 underline cursor-pointer">
              0508766830
            </p>

            <p className="text-gray-700 underline cursor-pointer">
              sales@supercooluae.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Quick links</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Refund Policy</Link></li>
              <li><Link href="#">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Collections</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="#">Wall Split</Link></li>
              <li><Link href="#">Window AC</Link></li>
              <li><Link href="#">Floor Standing</Link></li>
              <li><Link href="#">Cassette AC</Link></li>
              <li><Link href="#">Ducted Units</Link></li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Brands</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="#">Carrier</Link></li>
              <li><Link href="#">Daikin</Link></li>
              <li><Link href="#">Midea</Link></li>
              <li><Link href="#">Super General</Link></li>
              <li><Link href="#">O General</Link></li>
              <li><Link href="#">Diakool</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Social Section */}
      <div className="bg-blue-900 py-6">
        <div className="flex justify-center gap-6 text-white">
          <Facebook className="cursor-pointer hover:scale-110 transition" />
          <Instagram className="cursor-pointer hover:scale-110 transition" />
          <Linkedin className="cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-blue-950 text-center text-white text-sm py-4">
        © Copyright 2025. Powered by Super Cool Air Conditioning Trading LLC
      </div>

    </footer>
  );
}