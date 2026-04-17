import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import { BASE_URL } from "@/lib/api";

async function getProduct(product: string) {
  const res = await fetch(
    `${BASE_URL}/api/products/${product}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{
    product: string;
  }>;
}) {
  const { product } = await params;

  const item = await getProduct(product);

  if (!item) {
    return (
      <div className="p-10">
        Product not found
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-40">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="relative w-full h-[400px] bg-gray-100 rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
<div>
  <h1 className="text-3xl font-bold mb-4">
    {item.name}
  </h1>

  <p className="text-blue-600 font-semibold mb-4 uppercase">
    {item.brand}
  </p>

  <div className="text-gray-600 mb-6 space-y-4">
    <p>{item.description?.paragraph1}</p>

    <p>{item.description?.paragraph2}</p>

    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      {item.description?.bullets?.map(
        (point: string, i: number) => (
          <li key={i}>{point}</li>
        )
      )}
    </ul>
  </div>
</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}