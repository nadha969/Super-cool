import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

// ✅ Product type
type Product = {
  category: string;
  image?: string;
};

// ✅ Fetch products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/carrier`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

export default async function Carrier() {
  const products = await getProducts();

  // ✅ Empty state
  if (!products || products.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-20 text-xl">
          No products found
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Unique categories
  const categories = [...new Set(products.map((item) => item.category))];

  // ✅ Map category → image
  const categoryData = categories.map((cat) => {
    const product = products.find((p) => p.category === cat);

    return {
      name: cat,
      image: product?.image || "/placeholder.jpg",
    };
  });

  return (
    <div>
      <Header />

      {/* HERO */}
      <main className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Carrier Air Conditioners Collection
        </h1>
      </main>

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg">
            Carrier Air Conditioners deliver reliable cooling...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/carrier/${cat.name}`}
              className="group border-2 border-[#82C341] rounded-sm p-6 flex flex-col items-center justify-between bg-white hover:shadow-2xl"
            >
              <div className="relative w-full h-64 mb-6 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <h3 className="text-center font-bold text-lg uppercase">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <BlogCard />
      <Footer />
    </div>
  );
}