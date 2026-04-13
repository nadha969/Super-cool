import Image from "next/image";
import Link from "next/link";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(
    `${BASE_URL}/api/brands/daikin`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function Daikin() {
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
          Daikin Air Conditioners Collection
        </h1>
      </main>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
          <p className="text-center text-lg leading-relaxed max-w-5xl mx-auto">
            Daikin Air Conditioning Systems provide exceptional cooling solutions
            for homes and businesses with advanced inverter technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map(
            (cat: any, index: number) => (
              <Link
                key={index}
                href={`/brands/daikin/${cat}`}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-center">
                  <Image
                    src={
                      products[0]?.image ||
                      "/placeholder.jpg"
                    }
                    alt={cat}
                    width={400}
                    height={250}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-center mt-6 font-semibold text-lg capitalize">
                  Daikin{" "}
                  {cat.replace("-", " ")} Collection
                </h3>
              </Link>
            )
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}