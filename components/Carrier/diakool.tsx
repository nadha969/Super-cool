import React from 'react';
import { Search, ShoppingBag, User, ChevronDown, Menu } from 'lucide-react';

const DiakoolCollection = () => {
  const products = [
    {
      id: 1,
      name: "Diakool Wall Split 1 Ton AC - DK-12ST3",
      brand: "DIAKOOL",
      features: "Rotary Compressor",
      btu: "12,000 BTU",
      price: "899 AED",
      originalPrice: "950 AED",
      image: "/api/placeholder/400/300" 
    },
    {
      id: 2,
      name: "Diakool Wall Split AC 1.5 Ton - DK-18ST3",
      brand: "DIAKOOL",
      features: "Rotary Compressor",
      btu: "18,000 BTU",
      price: "1,199 AED",
      originalPrice: "1,250 AED",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      name: "Diakool Wall Split AC - DK-24ST3 2.0 Ton",
      brand: "DIAKOOL",
      features: "Rotary Compressor",
      btu: "24,000 BTU",
      price: "1,499 AED",
      originalPrice: "1,550 AED",
      image: "/api/placeholder/400/300"
    },
     {
      id: 4,
      name: "Diakool Wall Split AC - DK-24ST3 2.0 Ton",
      brand: "DIAKOOL",
      features: "Rotary Compressor",
      btu: "24,000 BTU",
      price: "1,499 AED",
      originalPrice: "1,550 AED",
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-8">
                  

          {/* Product Grid Section */}
          <section className="flex-1">
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  {/* Image Container */}
                  <div className="relative p-6 bg-white">
                    <span className="absolute top-4 right-4 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Sale
                    </span>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold leading-tight mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mb-4 tracking-wider">
                      {product.brand}
                    </p>
                    
                    <div className="text-sm text-gray-600 mb-6 space-y-1">
                      <p>{product.features}</p>
                      <p>{product.btu}</p>
                    </div>

                    <div className="mt-auto border-t border-dashed border-gray-200 pt-4">
                      <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-xl font-bold">From {product.price}</span>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      </div>

                      <button className="w-full bg-[#1a2b6d] hover:bg-[#121e4d] text-white font-bold py-3 px-6 rounded-full transition-colors">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default DiakoolCollection;