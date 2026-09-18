import Image from "next/image";
import Link from "next/link";
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

// Fetch Mitsubishi Products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/mitsubishi`, {
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

export default async function Mitsubishi() {
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
    <div className="bg-white">
      <Header />

      {/* Hero */}
      <main className="pt-30">
        <section className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-blue-50 py-16">
          {/* Decorative shapes */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-100 rounded-full opacity-40 blur-3xl" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <span className="inline-block mb-4 px-5 py-2 rounded-full bg-[#05305C] text-white text-sm font-medium tracking-wide animate-pulse">
              MITSUBISHI
            </span>

            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
              Mitsubishi Air Conditioners
            </h1>

            <div className="mx-auto mt-5 h-1 w-16 bg-[#05305C] rounded-full" />

            <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Explore Mitsubishi air conditioning systems designed to deliver
              powerful, efficient and comfortable cooling for modern spaces.
            </p>
          </div>
        </section>
      </main>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-[0.25em] text-[#05305C] uppercase mb-3">
            Explore Collection
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Mitsubishi AC Categories
          </h2>

          <div className="mx-auto mt-4 w-20 h-[2px] bg-gray-300" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/mitsubishi/${cat.slug}`}
              className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden
              transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
            >
              {/* Top Accent */}
              <div
                className="absolute top-0 left-0 h-1 bg-[#05305C] w-0
                group-hover:w-full transition-all duration-700 z-20"
              />

              {/* Image */}
              <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
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
                  className="
                    object-contain p-5
                    transition-all duration-700 ease-out
                    group-hover:scale-110
                    group-hover:-rotate-2
                  "
                />

                {/* Image Overlay */}
                <div
                  className="
                    absolute inset-0 bg-[#05305C]/5
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                  "
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h3
                  className="
                    font-bold text-lg uppercase text-gray-800
                    transition-all duration-500
                    group-hover:text-[#05305C]
                    group-hover:tracking-wider
                  "
                >
                  {cat.name}
                </h3>

                <p
                  className="
                    text-sm text-gray-500 mt-2
                    opacity-0 translate-y-2
                    group-hover:opacity-100
                    group-hover:translate-y-0
                    transition-all duration-500
                  "
                >
                  View Products
                </p>

                {/* Arrow */}
                <div
                  className="
                    mt-4 mx-auto w-9 h-9 rounded-full
                    border border-gray-300
                    flex items-center justify-center
                    text-gray-500
                    group-hover:bg-[#05305C]
                    group-hover:text-white
                    group-hover:border-[#05305C]
                    group-hover:translate-x-1
                    transition-all duration-500
                  "
                >
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

