import Image from "next/image";
import Link from "next/link";

interface Collection {
  title: string;
  imageSrc: string;
  href: string;
}

const collections: Collection[] = [
  {
    title: "Carrier Wall Split Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/collections/carrier-wall-split",
  },
  {
    title: "Carrier Floor Standing AC Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/collections/carrier-floor-standing",
  },
  {
    title: "Carrier Ducted AC Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/collections/carrier-ducted",
  },
];

export default function Carrier() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="pb-10">
            <p className="text-center text-lg">Carrier Air Conditioners deliver reliable cooling for UAE homes and businesses. Featuring inverter technology, corrosion-resistant components, and high-temperature operation, these energy-efficient systems include split, ducted, cassette, and VRF units. Ideal for both residential and commercial use, Carrier AC units reduce energy costs while maintaining optimal comfort in extreme climates</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group border-2 border-[#82C341] rounded-sm p-6 flex flex-col items-center justify-between bg-white
            transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:border-transparent"
          >
            <div className="relative w-full h-64 mb-6 overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="text-center font-bold text-[#1a1a1a] text-lg uppercase tracking-tight group-hover:text-[#82C341] transition-colors">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}