import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(
    `${BASE_URL}/api/brands/midea`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function Midea() {
  const products = await getProducts();

  const categories = [
    ...new Set(
      products.map((item: any) => item.category)
    ),
  ];

  return (
    <div>
      <Header />

      <main className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Midea Air Conditioners Collection
        </h1>
      </main>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg">
            Midea Air Conditioning Systems deliver reliable and efficient cooling
            solutions for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(
            (cat: any, index: number) => (
              <Link
                key={index}
                href={`/brands/midea/${cat}`}
                className="group border-2 border-[#4747ec] rounded-sm p-6 flex flex-col items-center justify-between bg-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-transparent"
              >
                <div className="relative w-full h-64 mb-6 overflow-hidden">
                  <Image
  src={
    products.find(
      (item: any) => item.category === cat
    )?.image || "/placeholder.jpg"
  }
  alt={cat}
  fill
  className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
/>
                </div>

                <h3 className="text-center font-bold text-[#1a1a1a] text-lg uppercase tracking-tight group-hover:text-[#4747ec] transition-colors">
                  Midea{" "}
                  {cat.replace("-", " ")} Collection
                </h3>
              </Link>
            )
          )}
        </div>
      </section>

      <BlogCard />
      <Footer />
    </div>
  );
}