import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(
    `${BASE_URL}/api/brands/supergeneral`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function SuperGeneral() {
  const products = await getProducts();

  const categories = [
    ...new Set(
      products.map((item: any) => item.category)
    ),
  ];

  return (
    <div>
      <Header />

      <div className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Super General Air Conditioners Collection
        </h1>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg leading-relaxed max-w-5xl mx-auto">
            Super General Air Conditioning Systems provide dependable cooling
            performance for homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map(
            (cat: any, index: number) => (
              <Link
                key={index}
                href={`/brands/supergeneral/${cat}`}
                className="group border-2 border-[#ebebebfd] rounded-sm p-6 flex flex-col items-center justify-between bg-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-transparent"
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

                <h3 className="text-center font-bold text-[#1a1a1a] text-lg uppercase tracking-tight">
                  Super General{" "}
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