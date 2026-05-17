"use client";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import { BASE_URL } from "@/lib/api";
import {
  use,
  useEffect,
  useState,
} from "react";

async function getProduct(
  product: string
) {
  const res = await fetch(
    `/api/products/${product}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  return res.json();
}

export default function ProductPage({
  params,
}: {
  params: Promise<{
    product: string;
  }>;
}) {
  // Unwrap params
  const { product } = use(params);

  const [item, setItem] =
    useState<any>(null);

    const [loading, setLoading] =
  useState(true);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    async function loadProduct() {
      const data =
        await getProduct(product);

      setItem(data);
 setLoading(false);
      // Set first image as main image
      if (
  data?.images?.length > 0
) {
  setSelectedImage(
    data.images[0]
  );
} else if (data?.image) {
  setSelectedImage(
    data.image
  );
}
    }

    loadProduct();
  }, [product]);

  if (!item) return null;

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-40">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Images Section */}
         {/* Images Section */}
<div>
  {/* Main Image */}
  <div className="relative w-full h-[450px] bg-gray-100 rounded-2xl overflow-hidden ">
    {(
      selectedImage ||
      item.images?.[0] ||
      item.image
    ) && (
      <Image
        src={
          selectedImage ||
          item.images?.[0] ||
          item.image
        }
        alt={item.name}
        fill
        className="object-contain p-4"
      />
    )}
  </div>

  {/* Thumbnail Images */}
  <div className="flex gap-3 mt-4 flex-wrap">
    {(
      item.images?.length
        ? item.images
        : item.image
        ? [item.image]
        : []
    ).map(
      (
        img: string,
        i: number
      ) => (
        <div
          key={i}
          onClick={() =>
            setSelectedImage(img)
          }
          className={`relative w-24 h-24 rounded-xl overflow-hidden border cursor-pointer transition-all duration-200
          
          ${
            selectedImage === img
              ? "border-blue-600"
              : "border-gray-300"
          }
        `}
        >
          <Image
            src={img}
            alt={`thumb-${i}`}
            fill
            className="object-contain p-2"
          />
        </div>
      )
    )}
  </div>
</div>
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {item.name}
            </h1>

            <p className="text-blue-600 font-semibold mb-3 uppercase">
              {item.brand}
            </p>

            {/* Price */}
            <div className="inline-block bg-green-100 text-green-700 font-bold px-4 py-2 rounded-lg mb-6 text-lg">
              AED{" "}
              {Number(
                item.price || 0
              ).toLocaleString()}
            </div>

            {/* Description */}
            <div className="text-gray-600 space-y-4">
              <p>
                {
                  item.description
                    ?.paragraph1
                }
              </p>

              <p>
                {
                  item.description
                    ?.paragraph2
                }
              </p>

              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {item.description?.bullets?.map(
                  (
                    point: string,
                    i: number
                  ) => (
                    <li key={i}>
                      {point}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}