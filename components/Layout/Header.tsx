"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed z-50 top-0 left-0">

      {/* Top Welcome Bar */}
      <div className="bg-blue-900 text-white text-center text-sm py-2 tracking-wide">
        WELCOME TO OUR STORE
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="https://shop.supercooluae.com/cdn/shop/files/Super_Cool_Ai_Conditioning_Trading_LLC.png?v=1747037695&width=600"
              alt="Super Cool"
              width={140}
              height={40}
              className="w-[110px] md:w-[140px]"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <Link className="hover:underline hover:text-black" href="/">Home</Link>
            <Link className="hover:underline hover:text-black" href="/carrier">Carrier</Link>
            <Link className="hover:underline hover:text-black" href="/daikin">Daikin</Link>
            <Link className="hover:underline hover:text-black" href="/midea">Midea</Link>
            <Link className="hover:underline hover:text-black" href="/o-general">O General</Link>
            <Link className="hover:underline hover:text-black" href="/diakool">Diakool</Link>
            <Link className="hover:underline hover:text-black" href="/super-general">Super General</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5 text-gray-700">

            <Search size={20} className="cursor-pointer hidden sm:block" />
            <User size={20} className="cursor-pointer hidden sm:block" />
            <ShoppingBag size={20} className="cursor-pointer" />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t bg-white">
            <nav className="flex flex-col gap-4 p-5 text-gray-700 font-medium">
              <Link href="/">Home</Link>
              <Link href="/carrier">Carrier</Link>
              <Link href="/daikin">Daikin</Link>
              <Link href="/midea">Midea</Link>
              <Link href="/o-general">O General</Link>
              <Link href="/diakool">Diakool</Link>
              <Link href="/super-general">Super General</Link>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}