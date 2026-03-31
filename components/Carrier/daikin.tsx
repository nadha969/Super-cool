import Image from "next/image";

export default function Daikin() {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Description */}
        <div className="pb-10">
          <p className="text-center text-lg  leading-relaxed max-w-5xl mx-auto">
            Daikin Air Conditioning Systems provide exceptional cooling solutions
            for UAE homes and businesses. Featuring advanced inverter technology,
            eco-friendly R-32 refrigerant, and whisper-quiet operation, these
            energy-efficient units include wall-mounted, ducted, cassette, and
            VRV systems.
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
              Daikin Wall Split AC Collection
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
              Daikin Ducted AC Collection
            </h3>
          </div>

        </div>
      </section>
    </div>
  );
}