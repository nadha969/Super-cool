import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
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
  const res = await fetch(`${BASE_URL}/api/brands/o-general`, {
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

export default async function OGeneral() {
  const products = await getProducts();
  const allCategories = await getCategories();

  const usedCategories = [
    ...new Set(products.map((item) => item.category)),
  ];

  const categoryData = usedCategories.map((cat) => {
    const matched = allCategories.find(
      (c) => c.slug === cat
    );

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
          O General Air Conditioners Collection
        </h1>
      </main>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg text-gray-600 max-w-4xl mx-auto">
            O General Air Conditioning Systems deliver exceptional
            performance and reliability for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryData.map((cat, index) => (
            <Link
              key={index}
              href={`/brands/o-general/${cat.slug}`}
              className="group border-2 border-[#ebebebfd] rounded-xl p-6 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-transparent"
            >
              <div className="relative w-full h-64 mb-6 overflow-hidden rounded-xl bg-gray-50">
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
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="text-center font-bold text-lg uppercase text-[#1a1a1a] tracking-tight">
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