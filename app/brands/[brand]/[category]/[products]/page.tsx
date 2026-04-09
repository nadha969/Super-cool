import Image from "next/image";

const products = [
  {
    id: "1",
    name: "Carrier Wall Split AC",
    brand: "carrier",
    category: "wall-split",
    price: 35000,
    originalPrice: 38000,
    image: "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    images: ["/assets/ac1.png", "/assets/ac1.png", "/assets/ac1.png"],
    description:
      "High performance AC with energy efficient cooling for homes and offices.",
    specs: [
      "Cooling Capacity: 12,000 BTU",
      "Compressor: Rotary",
      "Energy Efficient",
    ],
  },
  {
    id: "2",
    name: "Carrier Floor Standing AC",
    brand: "carrier",
    category: "floor-standing",
    price: 120000,
    originalPrice: 125000,
    image: "/assets/ac2.png",
    images: ["/assets/ac2.png", "/assets/ac2.png", "/assets/ac2.png"],
    description:
      "Perfect for large spaces like offices and halls with powerful cooling.",
    specs: [
      "Cooling Capacity: 48,000 BTU",
      "Compressor: Scroll",
      "High Performance",
    ],
  },
  {
    id: "3",
    name: "Carrier Ducted AC",
    brand: "carrier",
    category: "ducted",
    price: 150000,
    originalPrice: 155000,
    image: "https://tse3.mm.bing.net/th/id/OIP.BkPqnk7Ybf9fdtuZZxpnJAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    images: ["/assets/ac1.png", "/assets/ac1.png", "/assets/ac1.png"],
    description:
      "High performance AC with energy efficient cooling for homes and offices.",
    specs: [
      "Cooling Capacity: 12,000 BTU",
      "Compressor: Rotary",
      "Energy Efficient",
    ],
  },
];

export default async function ProductPage({ params }: any) {
  const { product } = await params;

  const item = products.find((p) => p.id === product);

  if (!item) return <div>Product not found</div>;

  return (
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

          {/* Thumbnails */}
          {/* <div className="flex gap-4 mt-4">
            {item.images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 border rounded-full overflow-hidden">
                <Image src={img} alt="thumb" fill className="object-contain" />
              </div>
            ))}
          </div> */}
        </div>

        {/* RIGHT - Details */}
        <div>
          
          <h1 className="text-3xl font-bold mb-4">
            {item.name}
          </h1>

          {/* Brand */}
          <p className="text-blue-600 font-semibold mb-4 uppercase">
            {item.brand}
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-blue-600">
              ₹{item.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{item.originalPrice}
            </span>
            <span className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full">
              Sale
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {item.description}
          </p>

          {/* Specs */}
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {item.specs.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}