import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    title: "How Does AC Compressor Work?",
    date: "October 18, 2025",
    excerpt:
      "The compressor is the core of your air conditioning system. It circulates refrigerant between the indoor and outdoor coils, enabling heat transfer that keeps your home cool.",
    image:
      "https://shop.supercooluae.com/cdn/shop/files/Wall_Split_Banner_0e2238e5-55af-497a-b4f0-38dceb5275ae.webp",
    slug: "ac-compressor-work",
  },
  {
    title: "Explore Everything You Need to Know About Carrier",
    date: "October 11, 2025",
    excerpt:
      "In large buildings across Dubai and the UAE, cooling needs go far beyond what standard split or DX systems can handle.",
    image:
      "https://shop.supercooluae.com/cdn/shop/files/Wall_Split_Banner_0e2238e5-55af-497a-b4f0-38dceb5275ae.webp",
    slug: "carrier-guide",
  },
  {
    title: "Why Carrier ACs Are the Smartest Choice",
    date: "October 3, 2025",
    excerpt:
      "Dubai isn’t just about extreme heat, it’s also about unbearable humidity. Carrier systems are built for these conditions.",
    image:
      "https://shop.supercooluae.com/cdn/shop/files/Wall_Split_Banner_0e2238e5-55af-497a-b4f0-38dceb5275ae.webp",
    slug: "carrier-smart-choice",
  },
];

export default function BlogCard() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="py-10">
            <p className="text-center font-semibold text-2xl text-gray-700">Latest News & Insights</p>
        </div>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <Link key={index} href={`/blogs/${post.slug}`}>
            <div className="bg-white  rounded-md overflow-hidden hover:shadow-lg transition duration-300 group">

              {/* Image */}
              <div className="relative w-full h-60">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 ">
                  {post.title}
                </h3>

                <p className="text-xs uppercase text-gray-600 mb-4">
                  {post.date}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}