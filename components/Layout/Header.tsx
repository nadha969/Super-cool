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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/">
              <Image
                src="/logo/acmartbg.png"
                alt="Ac mart"
                width={130}
                height={60}
                className="h-[42px] w-auto sm:h-[50px] md:h-[55px] object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">
            <Link className="hover:underline hover:text-black" href="/">Home</Link>
            <Link className="hover:underline hover:text-black" href="/brands/carrier">Carrier</Link>
            <Link className="hover:underline hover:text-black" href="/brands/daikin">Daikin</Link>
            <Link className="hover:underline hover:text-black" href="/brands/midea">Midea</Link>
            <Link className="hover:underline hover:text-black" href="/brands/general">O General</Link>
            <Link className="hover:underline hover:text-black" href="/brands/tcl">TCL</Link>
            <Link className="hover:underline hover:text-black" href="/brands/supergeneral">Super General</Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-gray-700 shrink-0">
            {/* <Search size={20} className="cursor-pointer hidden sm:block hover:text-black" />
            <User size={20} className="cursor-pointer hidden sm:block hover:text-black" />
            <ShoppingBag size={20} className="cursor-pointer hover:text-black" /> */}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t bg-white shadow-md">
            <nav className="flex flex-col gap-4 p-5 text-gray-700 font-medium">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/brands/carrier" onClick={() => setMenuOpen(false)}>Carrier</Link>
              <Link href="/brands/daikin" onClick={() => setMenuOpen(false)}>Daikin</Link>
              <Link href="/brands/midea" onClick={() => setMenuOpen(false)}>Midea</Link>
              <Link href="/brands/general" onClick={() => setMenuOpen(false)}>O General</Link>
              <Link href="/brands/tcl" onClick={() => setMenuOpen(false)}>TCL</Link>
              <Link href="/brands/supergeneral" onClick={() => setMenuOpen(false)}>Super General</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}