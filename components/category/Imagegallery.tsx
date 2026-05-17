"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string | string[];
  altText: string;
}

export default function ImageGallery({ images, altText }: ImageGalleryProps) {
  // Normalize images into an array safely
  const imageList = Array.isArray(images)
    ? images
    : images
    ? [images]
    : ["/placeholder.jpg"]; // Fallback if no images exist

  const [activeImage, setActiveImage] = useState(imageList[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Feature Image */}
      <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-100">
        <Image
          src={activeImage}
          alt={altText}
          fill
          priority
          className="object-contain p-2 transition-all duration-300 ease-in-out"
        />
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin">
          {imageList.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(imgUrl)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden bg-gray-50 border-2 flex-shrink-0 transition-all ${
                activeImage === imgUrl
                  ? "border-blue-600 ring-2 ring-blue-100 scale-95"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${altText} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}