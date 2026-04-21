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

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/daikin`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function Daikin() {
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
      <main className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Daikin Air Conditioners Collection
        </h1>
      </main>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto">
            Daikin Air Conditioning Systems provide exceptional cooling
            solutions for homes and businesses with advanced inverter
            technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/daikin/${cat.slug}`}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>

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
                  className="object-contain p-4 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-center font-bold text-lg uppercase text-gray-800 group-hover:text-[#05305C] transition-colors duration-300">
                {cat.name}
              </h3>

              {/* Bottom Border Animation */}
              <div className="mt-4 h-0.5 w-0 bg-[#05305C] mx-auto group-hover:w-24 transition-all duration-500"></div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}