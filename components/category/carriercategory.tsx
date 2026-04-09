"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const products = [
  {
    id: "1",
    name: "Carrier Wall Split AC",
    brand: "carrier",
    category: "wall-split",
    price: 35000,
    originalPrice: 38000,
    image: "https://tse2.mm.bing.net/th/id/OIP.6J0LHQVqekI5oYtJFv4BPQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    features: "Rotary Compressor",
    btu: "12,000 BTU",
  },
  {
    id: "2",
    name: "Carrier Floor Standing AC",
    brand: "carrier",
    category: "floor-standing",
    price: 120000,
    originalPrice: 125000,
    image: "https://tse4.mm.bing.net/th/id/OIP.puOtPAYU2LV1KM0AlVTHFwHaFz?rs=1&pid=ImgDetMain&o=7&rm=3",
    features: "Rotary Compressor",
    btu: "24,000 BTU",
  },
  {
    id: "3",
    name: "Carrier Ducted AC",
    brand: "carrier",
    category: "ducted",
    price: 150000,
    originalPrice: 155000,
    image: "https://tse3.mm.bing.net/th/id/OIP.BkPqnk7Ybf9fdtuZZxpnJAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    features: "Rotary Compressor",
    btu: "36,000 BTU",
  },
];

export default function Carriercategory({ brand, category }: any) {
  const [selectedBrand, setSelectedBrand] = useState("");

  // ✅ FILTER
  const filteredProducts = products.filter(
    (p) => p.brand === brand && p.category === category
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 lg:px-16 py-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10 capitalize mt-25">
        {brand} {category.replace("-", " ")} AC
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Sidebar */}
     

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative p-6">
                  <span className="absolute top-3 right-3 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                    Sale
                  </span>

                  <div className="relative w-full h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">

                  <h3 className="font-bold text-lg mb-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mb-3 uppercase">
                    {product.brand}
                  </p>

                  <div className="text-sm text-gray-600 mb-4">
                    <p>{product.features}</p>
                    <p>{product.btu}</p>
                  </div>

                  <div className="mt-auto">
                  

                    {/* ✅ LINK TO DETAIL PAGE */}
                    <Link
                      href={`/brands/${brand}/${category}/${product.id}`}
                      className="block text-center bg-[#1a2b6d] text-white py-2 rounded-full hover:bg-[#121e4d]"
                    >
                      View Details
                    </Link>
                  </div>

                </div>
              </div>
            ))}

            {/* Empty */}
            {filteredProducts.length === 0 && (
              <p>No products found</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}