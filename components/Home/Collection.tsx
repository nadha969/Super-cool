"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Collection() {
  const items = [
    {
      title: "FLOOR STAND",
      slug: "floor-stand",
      img: "https://retail.mideasouthafrica.com/wp-content/uploads/midea_Floor_standing-2-1.png",
    },
    {
      title: "WINDOW AC",
      slug: "window-ac",
      img: "https://i5.walmartimages.com/asr/de85ce3a-e7fa-470a-9dcf-2a61cb481a2b_1.ccb638382c7bb85af4c6b01e373ef4c3.jpeg",
    },
    {
      title: "WALL SPLIT",
      slug: "wall-split",
      img: "https://tse1.mm.bing.net/th/id/OIP.fuCWH-RU4QRR66gsTJ0c8AHaFG",
    },
    {
      title: "CASSETTE AC",
      slug: "casette",
      img: "https://www.generalcool.ae/wp-content/uploads/2023/08/Cassette.jpg",
    },
    {
      title: "AIR CURTAINS",
      slug: "air-curtains",
      img: "https://tse3.mm.bing.net/th/id/OIP.GLxrAOlk6vJiZmVd6gz1fAHaFj",
    },
    {
      title: "DUCTED UNITS",
      slug: "ducted-units",
      img: "https://tse4.mm.bing.net/th/id/OIP.U4RcQbi-5bXjhx46RUw10AHaEO",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Animated Heading */}
      <motion.h4
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center my-5 text-2xl text-gray-700 font-semibold"
      >
        Shop By Collections
      </motion.h4>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <Link
              href={`/categories/${item.slug}`}
              className="border-2 border-[#243f5a] rounded-lg h-[260px] flex flex-col items-center justify-start p-3 hover:shadow-xl hover:-translate-y-2 transition duration-300 bg-white"
            >
              <h5 className="text-center pt-3 text-[#05305C] font-semibold">
                {item.title}
              </h5>

              <motion.div
                whileHover={{ scale: 1.08 }}
                className="relative w-full h-[150px] mt-3"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}