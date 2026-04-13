import Image from "next/image";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BASE_URL } from "@/lib/api";

async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const allProducts = await getProducts();

  // ✅ ONLY CATEGORY FILTER (ALL BRANDS)
  const filteredProducts = allProducts.filter(
    (p: any) =>
      p.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div>
      <Header />

      <div className="p-10">
        <h1 className="text-2xl font-bold text-center mb-6">
          {category.replace("-", " ")} (All Brands)
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <div key={product._id} className="border p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-contain"
              />
              <h2>{product.name}</h2>
              <p>{product.brand}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}