"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";

async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/api/trending`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

export default function TrendingModels() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchTrending().then(setProducts);
  }, []);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Featured Collection
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Trending Models
          </h2>

          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }} // 👈 mobile click animation
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Image */}
              <Link
                href={`/brands/${product.brand}/${product.category}/${product.slug}`}
              >
                <div className="relative h-64 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.jpg"}
                    alt={product.name}
                    width={260}
                    height={220}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs uppercase text-blue-600 font-semibold">
                    {product.brand}
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2 min-h-[56px]">
                    {product.name}
                  </h3>

                  <h5 className="text-xl font-bold text-blue-600 mt-3">
                    AED {product.price}
                  </h5>
                </div>
              </Link>

              {/* Button */}
              <div className="px-5 pb-5">
                <Link
                  href={`/brands/${product.brand}/${product.category}/${product.slug}`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty */}
        {products.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No trending products found.
          </div>
        )}
      </div>
    </section>
  );
}