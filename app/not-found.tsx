"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      {/* Visual Element */}
      <div className="mb-8">
        <h1 className="text-9xl font-extrabold text-gray-100 sm:text-[12rem] select-none">
          404
        </h1>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist. Check the URL or head back to the home page.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all text-center"
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all"
          >
            <MoveLeft size={18} />
            Go Back
          </button>
        </div>
      </div>

    
    </div>
  );
}