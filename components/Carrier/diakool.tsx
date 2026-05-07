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

// Fetch Products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/tcl`, {
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

export default async function TCL() {
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
          TCL Air Conditioners Collection
        </h1>
      </main>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto">
            TCL Air Conditioning Systems deliver smart, reliable and efficient
            cooling solutions for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/tcl/${cat.slug}`}
              className="group relative rounded-2xl bg-white p-6 shadow-sm border border-gray-200 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Animated top border */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-[#05305C] group-hover:w-full transition-all duration-500"></div>

              {/* Animated glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-sky-100 opacity-0 group-hover:opacity-100 transition duration-500"></div>

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
                  className="object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-center font-bold text-lg uppercase text-gray-800 group-hover:text-[#05305C] transition-colors duration-300">
                {cat.name} COLLECTIONS
              </h3>

              {/* Arrow */}
              <div className="relative z-10 mt-4 text-center text-[#05305C] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}