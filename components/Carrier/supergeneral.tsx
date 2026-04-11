import Image from "next/image";
import Link from "next/link";
import BlogCard from "../Home/Insight";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

interface Collection {
  title: string;
  imageSrc: string;
  href: string;
}

const collections: Collection[] = [
  {
    title: "Super General Wall Split AC Collection",
    imageSrc: "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/brands/supergeneral/wall-split",
  },
  {
    title: "Super General Ducted AC Collection",
    imageSrc: "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/brands/supergeneral/ducted",
  },
];

export default function SuperGeneral() {
  return (
    <div>
      <Header/>
      <div className="pt-30 flex-1">
        <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Super General Air Conditioners Collection
        </h1>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* Description */}
        <div className="pb-10">
          <p className="text-center text-lg leading-relaxed max-w-5xl mx-auto">
            Super General Air Conditioning Systems provide dependable cooling performance for UAE
            homes and businesses. Featuring reliable compressor technology, eco-friendly R-410A 
            refrigerant, and efficient operation, these durable units include window, split, and
            portable systems. Designed for residential and light commercial applications, 
            Super General AC units deliver consistent cooling with solid energy efficiency, 
            making them suitable for apartments, villas, and offices across the UAE.
          </p>
        </div>

        {/* Grid - Uses md:grid-cols-2 since you have two items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group border-2 border-[#ebebebfd] rounded-sm p-6 flex flex-col items-center justify-between bg-white
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

              <h3 className="text-center font-bold text-[#1a1a1a] text-lg uppercase tracking-tight transition-colors">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
      
      <BlogCard />
      <Footer/>
    </div>
  );
}