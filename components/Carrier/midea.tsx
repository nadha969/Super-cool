import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";

interface Collection {
  title: string;
  imageSrc: string;
  href: string;
}

const collections: Collection[] = [
  {
    title: "Midea Wall Split Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/brands/midea/wall-split",
  },
  {
    title: "Midea Floor Standing AC Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/brands/midea/floor-standing",
  },
  {
    title: "Midea Ducted AC Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/brands/midea/ducted",
  },
];

export default function Midea() {
  return (
   <div>
     <main className="pt-30 flex-1">
          <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10 ">
          Midea Air Conditioners Collection 
          </h1>
        </main>
     <section className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Description */}
      <div className="pb-10">
        <p className="text-center text-lg">
          Midea Air Conditioning Systems deliver reliable and efficient cooling
          solutions perfect for UAE homes and businesses. Featuring inverter
          technology, eco-friendly refrigerant, and quiet operation, these units
          include split, ducted, and floor-standing systems. Ideal for residential
          and commercial use, Midea AC units ensure energy savings and comfort.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group border-2 border-[#4747ec] rounded-sm p-6 flex flex-col items-center justify-between bg-white
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

            <h3 className="text-center font-bold text-[#1a1a1a] text-lg uppercase tracking-tight group-hover:text-[#4747ec] transition-colors">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
    <BlogCard/>
   </div>
  );
}