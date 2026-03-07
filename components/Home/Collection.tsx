import Image from "next/image";

export default function Collection() {
  const items = [
    {
      title: "FLOOR STAND",
      img: "https://retail.mideasouthafrica.com/wp-content/uploads/midea_Floor_standing-2-1.png",
    },
    {
      title: "WINDOW AC",
      img: "https://i5.walmartimages.com/asr/de85ce3a-e7fa-470a-9dcf-2a61cb481a2b_1.ccb638382c7bb85af4c6b01e373ef4c3.jpeg",
    },
    {
      title: "WALL SPLIT",
      img: "https://tse1.mm.bing.net/th/id/OIP.fuCWH-RU4QRR66gsTJ0c8AHaFG",
    },
    {
      title: "CASSETTE AC",
      img: "https://www.generalcool.ae/wp-content/uploads/2023/08/Cassette.jpg",
    },
    {
      title: "AIR CURTAINS",
      img: "https://tse3.mm.bing.net/th/id/OIP.GLxrAOlk6vJiZmVd6gz1fAHaFj",
    },
    {
      title: "DUCTED UNITS",
      img: "https://tse4.mm.bing.net/th/id/OIP.U4RcQbi-5bXjhx46RUw10AHaEO",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
        <h4 className='text-center my-5 text-2xl text-gray-700 font-semibold'>Shop By Collecions</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {items.map((item, index) => (
          <div
            key={index}
            className="border-2 border-green-700 rounded-lg h-[260px] flex flex-col items-center justify-start p-3 hover:shadow-lg transition"
          >
            <h5 className="text-center pt-3 text-blue-900 font-semibold">
              {item.title}
            </h5>

            <div className="relative w-full h-[150px] mt-3">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}