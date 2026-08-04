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
              src="/logo/acmartbg.png"
              alt="Super Cool"
              width={150}
              height={60}
            />
  <a
    href="tel:+971555661042"
    className="text-gray-700 underline cursor-pointer"
  >
   +971 555 66 1042
  </a><br /> 
       <div className="mt-4">
          <a
  href="mailto:sales@acmartuae.com"
   className="text-gray-700 underline cursor-pointer ">
  sales@acmartuae.com</a>
       </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Quick links</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/privacypolicy">Privacy Policy</Link></li>
              <li><Link href="/refundpolicy">Refund Policy</Link></li>
              <li><Link href="/termsandconditions">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Collections</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/categories/wall-split">Wall Split</Link></li>
              <li><Link href="/categories/window">Window AC</Link></li>
              <li><Link href="/categories/floor-stand">Floor Standing</Link></li>
              <li><Link href="/categories/cassatte">Cassette AC</Link></li>
              <li><Link href="/categories/ducted-unit">Ducted Units</Link></li>
              <li><Link href="/categories/package-unit">Package Unit</Link></li>

            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900">Brands</h3>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/brands/carrier">Carrier</Link></li>
              <li><Link href="/brands/daikin">Daikin</Link></li>
              <li><Link href="/brands/midea">Midea</Link></li>
              <li><Link href="/brands/supergeneral">Super General</Link></li>
              <li><Link href="/brands/o-general">O General</Link></li>
              <li><Link href="/brands/lg">LG</Link></li>
              <li><Link href="/brands/tcl">TCL</Link></li>
              <li><Link href="/brands/finpower">Finpower</Link></li>
              <li><Link href="/brands/hisense">Hisense</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Social Section */}
      <div className="bg-[#05305C] py-6">
        <div className="flex justify-center gap-6 text-white">
          {/* <Facebook className="cursor-pointer hover:scale-110 transition" />
          <Instagram className="cursor-pointer hover:scale-110 transition" />
          <Linkedin className="cursor-pointer hover:scale-110 transition" /> */}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#17416b] text-center text-white text-sm py-4">
      © {new Date().getFullYear()} Acmart Uae. All rights reserved.
      </div>

    </footer>
  );
}