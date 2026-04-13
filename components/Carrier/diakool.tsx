import React from "react";
import Link from "next/link";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(
    `${BASE_URL}/api/brands/tcl`,
    { cache: "no-store" }
  );

  return res.json();
}

const TCLCollection = async () => {
  const products = await getProducts();

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pt-30">
        <main className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <section className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: any) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
                  >
                    <div className="relative p-6 bg-white">
                      <span className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Sale
                      </span>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain"
                      />
                    </div>

                    <div className="p-6 pt-0 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold leading-tight mb-1">
                        {product.name}
                      </h3>

                      <p className="text-xs text-gray-500 font-semibold mb-4 tracking-wider uppercase">
                        {product.brand}
                      </p>

                      <div className="text-sm text-gray-600 mb-6 space-y-1">
                        {product.specs?.map(
                          (
                            item: string,
                            i: number
                          ) => (
                            <p key={i}>{item}</p>
                          )
                        )}
                      </div>

                      <div className="mt-auto border-t border-dashed border-gray-200 pt-4">
                        <Link
                          href={`/brands/tcl/${product.category}/${product.slug}`}
                          className="block text-center w-full bg-[#1a2b6d] hover:bg-[#121e4d] text-white font-bold py-3 px-6 rounded-full transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <p>No products found</p>
              )}
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TCLCollection;