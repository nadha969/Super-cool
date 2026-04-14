import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const allProducts = await getProducts();

  const filteredProducts = allProducts.filter(
    (p: any) => p.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pt-30">
        <main className="max-w-7xl mx-auto p-6">
          
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold capitalize text-gray-900">
              {category.replace("-", " ")}
            </h1>
            <p className="text-gray-500 mt-2">
              Discover our premium collection
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative p-6 bg-white">
                  <span className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Sale
                  </span>

                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Info */}
                <div className="p-6 pt-0 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold leading-tight mb-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 font-semibold mb-4 tracking-wider uppercase">
                    {product.brand}
                  </p>

                  {/* Specs */}
                  <div className="text-sm text-gray-600 mb-6 space-y-1">
                    {product.specs?.map((item: string, i: number) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="mt-auto border-t border-dashed border-gray-200 pt-4">
                    <Link
                      href={`/brands/${product.brand}/${category}`}
                      className="block text-center w-full bg-[#1a2b6d] hover:bg-[#121e4d] text-white font-bold py-3 px-6 rounded-full transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}