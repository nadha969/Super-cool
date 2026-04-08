import Image from "next/image";
import BlogCard from "../Home/Insight";
export default function Supergeneral(){
    return(
            <div>
                <main className="pt-30 flex-1">
                 <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
                 Super General Air Conditioners Collection 
                 </h1>
               </main>
              <section className="max-w-7xl mx-auto px-4 py-12">
                
                {/* Description */}
                <div className="pb-10">
                  <p className="text-center text-lg  leading-relaxed max-w-5xl mx-auto">
                  Super General Air Conditioning Systems provide dependable cooling performance for UAE
                   homes and businesses. Featuring reliable compressor technology, eco-friendly R-410A 
                   refrigerant, and efficient operation, these durable units include window, split, and
                    portable systems. Designed for residential and light commercial applications, 
                    Super General AC units deliver consistent cooling with solid energy efficiency, 
                    making them suitable for apartments, villas, and offices across the UAE
                  </p>
                </div>
        
                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex justify-center">
                      <Image
                        src="https://shop.supercooluae.com/cdn/shop/files/Wall_Split_Banner_0e2238e5-55af-497a-b4f0-38dceb5275ae.webp" 
                        alt="Wall Split AC"
                        width={400}
                        height={250}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center mt-6 font-semibold text-lg">
                     Super General Wall Split AC Collection
                    </h3>
                  </div>
        
                  {/* Card 2 */}
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                    <div className="flex justify-center">
                      <Image
                        src="/images/ducted-ac.png"
                        alt="Ducted AC"
                        width={400}
                        height={250}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center mt-6 font-semibold text-lg">
                      Super General Ducted AC Collection
                    </h3>
                  </div>
        
                </div>
              </section>
              <BlogCard/>
            </div>
    )
}