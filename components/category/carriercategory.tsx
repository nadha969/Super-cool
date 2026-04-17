import Image from "next/image";
import Link from "next/link";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Carriercategory({
  brand,
  category,
}: {
  brand: string;
  category: string;
}) {
  const allProducts = await getProducts();

  const filteredProducts = allProducts.filter(
    (p: any) =>
      p.brand?.toLowerCase() === brand.toLowerCase() &&
      p.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-50 px-6 lg:px-16 py-10">
        <h1 className="text-3xl font-bold text-center mb-10 capitalize mt-25">
          {brand} {category.replace("-", " ")} AC
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <div className="relative p-6">
                <div className="relative w-full h-40">
                          <Image
  src={
    product.image?.startsWith("http")
      ? product.image
      : product.image?.startsWith("/")
      ? product.image
      : `/products/${product.image || "placeholder.jpg"}`
  }
  alt="product"
  fill
  className="object-contain"
/>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-lg mb-1">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 mb-3 uppercase">
                  {product.brand}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/brands/${brand}/${category}/${product.slug}`}
                    className="block text-center bg-[#1a2b6d] text-white py-2 rounded-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p>No products found</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}