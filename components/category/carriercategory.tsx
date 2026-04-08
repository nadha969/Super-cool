"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: "1",
    name: "Carrier Floor Standing Split AC 4.0 Ton",
    brand: "Carrier",
    price: 120000,
    image: "/assets/ac1.png",
  },
  {
    id: "2",
    name: "Carrier Floor Standing Split AC 5.0 Ton",
    brand: "Carrier",
    price: 150000,
    image: "/assets/ac2.png",
  },
];

export default function Carriercategory({ brand, category }: any) {
  const [selectedBrand, setSelectedBrand] = useState("");

  return (
    <div className="px-6 lg:px-16 py-10 bg-gray-50 min-h-screen">
      
      {/* 🔹 Title */}
      <h1 className="text-3xl font-bold text-center mb-8 capitalize">
        {brand} {category.replace("-", " ")} AC
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 🔹 Sidebar Filter */}
        <div className="bg-white p-6 rounded-2xl border h-fit">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Brands</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => setSelectedBrand("Carrier")}
              />
              Carrier
            </label>
          </div>

          <div>
            <h3 className="font-medium mb-2">Price</h3>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        </div>

        {/* 🔹 Products Section */}
        <div className="lg:col-span-3">
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {products.length} Products
            </p>

            <select className="border px-3 py-2 rounded-lg text-sm">
              <option>Sort by: Featured</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border p-4 hover:shadow-md transition"
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h2 className="font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  {product.brand}
                </p>

                <p className="font-bold text-lg text-blue-600">
                  ₹{product.price}
                </p>

                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
                  View Details
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}