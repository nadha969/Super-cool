import Image from "next/image";
import Link from "next/link";
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

// Fetch Finpower Products
async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/brands/finpower`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

// Fetch Categories
async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

export default async function Finpower() {
  const products = await getProducts();
  const allCategories = await getCategories();

  if (!products || products.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-20 text-xl">
          No Finpower products found
        </div>
        <Footer />
      </div>
    );
  }

  const usedCategories = [...new Set(products.map((item) => item.category))];

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

      {/* Hero Section */}
      <main className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Finpower Air Conditioners Collection
        </h1>
      </main>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Finpower Air Conditioners are designed to deliver powerful cooling,
            superior energy efficiency, and long-lasting performance. Whether
            for homes, offices, or commercial spaces, Finpower offers reliable
            climate control with advanced technology and modern design.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/finpower/${cat.slug}`}
              className="group relative border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-100 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Category Image */}
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
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Category Name */}
              <h3 className="relative z-10 text-center font-bold text-lg uppercase text-gray-800 group-hover:text-[#0F766E] transition-colors duration-300">
                {cat.name}
              </h3>

              {/* Animated Underline */}
              <div className="relative z-10 mt-4 h-1 w-0 bg-[#0F766E] mx-auto rounded-full group-hover:w-20 transition-all duration-500"></div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}