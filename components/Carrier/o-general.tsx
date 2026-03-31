import Image from "next/image";
import Link from "next/link";
interface Collection {
  title: string;
  imageSrc: string;
  href: string;
}

const collections: Collection[] = [
  {
    title: "O General Wall Split Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/collections/carrier-wall-split",
  },
  {
    title: "O General Standing AC Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/collections/carrier-floor-standing",
  },
  {
    title: "O General Ducted AC Collection",
    imageSrc:
      "https://tse2.mm.bing.net/th/id/OIP.errQJUuRIqXxhazbthZeegHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/collections/carrier-ducted",
  },
];

export default function OGeneral()
 {    
    return(
        <div>
              <section className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Description */}
      <div className="pb-10">
        <p className="text-center text-lg">
         O General Air Conditioning Systems deliver exceptional performance and reliability for UAE homes 
         and businesses. Engineered specifically for extreme climates, these robust units feature 
         corrosion-resistant components, powerful turbo cooling capabilities, and ultra-quiet operation 
         across their comprehensive range of split, window, cassette, and ducted systems. Designed for
          both residential and commercial applications, O General AC units provide superior cooling
           performance with outstanding durability, making them ideal for villas, apartments, offices
           , and commercial establishments throughout the UAE.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

            <h3 className="text-center font-bold text-[#1a1a1a] text-lg uppercase tracking-tight  transition-colors">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
        </div>
    )
}