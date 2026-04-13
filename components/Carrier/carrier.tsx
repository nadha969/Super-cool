import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(
    `${BASE_URL}/api/brands/carrier`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function Carrier() {
  const products = await getProducts();

  const categories = [
    ...new Set(products.map((item: any) => item.category)),
  ];

  return (
    <div>
      <Header />

      <main className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Carrier Air Conditioners Collection
        </h1>
      </main>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg">
            Carrier Air Conditioners deliver reliable cooling...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat: any, index: number) => (
            <Link
              key={index}
              href={`/brands/carrier/${cat}`}
              className="group border-2 border-[#82C341] rounded-sm p-6 flex flex-col items-center justify-between bg-white hover:shadow-2xl"
            >
              <div className="relative w-full h-64 mb-6 overflow-hidden">
                <Image
                  src={products[0]?.image || "/placeholder.jpg"}
                  alt={cat}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <h3 className="text-center font-bold text-lg uppercase">
                {cat}
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