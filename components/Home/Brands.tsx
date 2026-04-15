import Image from "next/image";
import Link from "next/link";

export default function Brands() {
  const brands = [
    {
      name: "carrier",
      image: "https://tse2.mm.bing.net/th/id/OIP.wwwr3EQLi6eZqaV2Br7HlAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "general",
      image: "https://top10gears.com/wp-content/uploads/2019/06/ogeneral.png",
    },
    {
      name: "daikin",
      image: "https://tse1.mm.bing.net/th/id/OIP.OsdOkmLjBtgjiRaxB09S0gHaBj?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "supergeneral",
      image: "https://tse4.mm.bing.net/th/id/OIP.ooHds0sZmQ9G5lXX3675VgHaBs?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "midea",
      image: "https://tse2.mm.bing.net/th/id/OIP.Ago0ZNmTbMk2HNgQpS7jCQHaC_?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  return (
    <section className="py-10">
      <h4 className="text-center text-2xl font-semibold mb-10 text-gray-700">
        Shop By Brands
      </h4>

      <div className="flex flex-wrap justify-center gap-6">
        {brands.map((brand, index) => (
          <Link key={index} href={`/brands/${brand.name}`}>
            <div className="w-[190px] h-[190px] border-2 border-gray-400 rounded-full flex items-center justify-center p-6 hover:shadow-lg transition cursor-pointer">
              <Image
                src={brand.image}
                alt={brand.name}
                width={120}
                height={80}
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}