import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

type Product = {
  category: string;
  image?: string;
};

type Category = {
  name: string;
  slug: string;
  image?: string;
};

// Fetch products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/carrier`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

// Fetch categories
async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

export default async function Carrier() {
  const products = await getProducts();
  const allCategories = await getCategories();

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

  // Unique product categories only
  const usedCategories = [
    ...new Set(products.map((item) => item.category)),
  ];

  // Match with category collection
  const categoryData = usedCategories.map((cat) => {
    const matched = allCategories.find(
      (c) => c.slug === cat
    );

    return {
      name: matched?.name || cat,
      slug: cat,
      image:
        matched?.image || "/placeholder.jpg",
    };
  });

  return (
    <div>
      <Header />

      {/* Hero */}
      <main className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Carrier Air Conditioners Collection
        </h1>
      </main>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg text-gray-600">
            Carrier Air Conditioners deliver
            reliable cooling solutions with
            advanced technology, energy
            efficiency, and premium comfort for
            homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/carrier/${cat.slug}`}
              className="group border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl bg-gray-50">
      <Image
  src={
    cat.image
      ? cat.image.startsWith("/")
        ? cat.image
        : `/categories/${cat.image}`
      : "/placeholder.jpg"
  }
  alt={cat.name}
  fill
  className="object-contain p-4"
/>
              </div>

              <h3 className="text-center font-bold text-lg uppercase text-gray-800">
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