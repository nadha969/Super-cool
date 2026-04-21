import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

type Product = {
  category: string;
};

type Category = {
  name: string;
  slug: string;
  image?: string;
};

// Fetch Products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/supergeneral`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

// Fetch Categories
async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export default async function SuperGeneral() {
  const products = await getProducts();
  const allCategories = await getCategories();

  const usedCategories = [
    ...new Set(products.map((item) => item.category)),
  ];

  const categoryData = usedCategories.map((cat) => {
    const matched = allCategories.find((c) => c.slug === cat);

    return {
      name: matched?.name || cat,
      slug: cat,
      image: matched?.image || "/placeholder.jpg",
    };
  });

  return (
    <div>
      <Header />

      {/* Hero */}
      <div className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Super General Air Conditioners Collection
        </h1>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg text-gray-600 max-w-5xl mx-auto">
            Super General Air Conditioning Systems provide dependable cooling
            performance for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/supergeneral/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98]"
            >
              {/* Animated Side Bar */}
              <div className="absolute left-0 top-0 h-full w-0 bg-gradient-to-b from-blue-500 to-[#05305C] transition-all duration-500 group-hover:w-2"></div>

              {/* Floating Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Image */}
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl bg-gray-50 z-10">
                <Image
                  src={
                    cat.image
                      ? cat.image.startsWith("http")
                        ? cat.image
                        : cat.image.startsWith("/")
                        ? cat.image
                        : `/categories/${cat.image}`
                      : "/placeholder.jpg"
                  }
                  alt={cat.name}
                  fill
                  className="object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-1"
                />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-center font-bold text-lg uppercase text-gray-800 tracking-tight transition-all duration-300 group-hover:text-[#05305C]">
                {cat.name}
              </h3>

              {/* Bottom Animated Line */}
              <div className="relative z-10 mx-auto mt-3 h-[2px] w-0 bg-[#05305C] transition-all duration-500 group-hover:w-20"></div>
            </Link>
          ))}
        </div>
      </section>

      <BlogCard />
      <Footer />
    </div>
  );
}