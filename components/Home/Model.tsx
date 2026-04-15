import Image from "next/image";

export default function TrendingModels() {
  const products = [
    {
      title: "Carrier Wall Split AC",
      brand: "CARRIER",
      compressor: "Rotary Compressor",
      capacity: "18,000 BTU",
      price: "From 1,949 AED",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Carrier Wall Split AC",
      brand: "CARRIER",
      compressor: "Rotary Compressor",
      capacity: "18,000 BTU",
      price: "From 1,949 AED",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Carrier Wall Split AC",
      brand: "CARRIER",
      compressor: "Rotary Compressor",
      capacity: "18,000 BTU",
      price: "From 1,949 AED",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "Carrier Wall Split AC",
      brand: "CARRIER",
      compressor: "Rotary Compressor",
      capacity: "18,000 BTU",
      price: "From 1,949 AED",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  return (
    <section className="py-10">
      <h4 className="text-center text-xl font-semibold mb-8">
        Trending Models
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition p-4"
          >
            <div className="flex justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={250}
                height={200}
                className="object-contain"
              />
            </div>

            <h3 className="text-center font-semibold mt-3">
              {product.title}
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              {product.brand} <br />
              {product.compressor} <br />
              {product.capacity}
            </p>

            <h5 className="font-semibold mt-3">{product.price}</h5>

            <div className="text-center mt-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}