
"use client";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "@/context/cartcontext";
import ReviewsPage from "@/components/category/Productreview";
import { useRouter } from "next/navigation";

async function getProduct(product: string) {
  const res = await fetch(`/api/products/${product}`, {
    cache: "no-store",
  });

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
  const { product } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);

      try {
        const data = await getProduct(product);

        if (cancelled) return;

        setItem(data);

        if (data?.images?.length > 0) {
          setSelectedImage(data.images[0]);
        } else if (data?.image) {
          setSelectedImage(data.image);
        } else {
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Failed to load product:", error);

        if (!cancelled) {
          setItem(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [product]);

  

const handleAddToCart = () => {
  if (item?.outOfStock) {
    toast.error("This product is out of stock");
    return;
  }

  const productId = String(item?._id ?? item?.id ?? "");
  const slug = String(item?.slug ?? "").trim();

  if (!productId) {
    toast.error("Product ID is missing");
    return;
  }

  if (!slug) {
    toast.error("Product slug is missing");
    return;
  }

  const originalPrice = Number(item.price);
  const discount = Number(item.discount || 0);

  const finalPrice = item.discount
    ? Math.round(
        originalPrice - (originalPrice * discount) / 100
      )
    : originalPrice;

  addToCart({
    productId,
    slug,
    name: item.name,
    price: finalPrice,
    image:
      selectedImage ||
      item.images?.[0] ||
      item.image ||
      "",
  });

  toast.success("Product added to cart!");

  router.push("/cart");
};



  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-[50vh] pt-40 text-center">
          Loading product...
        </main>
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Header />
        <main className="min-h-[50vh] px-6 pt-40 text-center">
          <h1 className="text-2xl font-bold">
            Product not found
          </h1>
          <p className="mt-2 text-gray-500">
            This product may have been removed or is unavailable.
          </p>
        </main>
      </>
    );
  }

  const productImages: string[] = item.images?.length
    ? item.images
    : item.image
      ? [item.image]
      : [];

  return (
    <div>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10 pt-40">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Product Images */}
          <div>
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl bg-gray-100">
              {(selectedImage || productImages[0]) && (
                <Image
                  src={selectedImage || productImages[0]}
                  alt={item.name || "Product image"}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="mt-4 flex flex-wrap gap-3">
              {productImages.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  aria-label={`View product image ${i + 1}`}
                  aria-pressed={selectedImage === img}
                  className={`relative h-24 w-24 overflow-hidden rounded-xl border transition ${
                    selectedImage === img
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${item.name || "Product"} thumbnail ${i + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold">
                {item.name}
              </h1>

              {item.outOfStock && (
                <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                  OUT OF STOCK
                </span>
              )}
            </div>

            <p className="mb-3 font-semibold uppercase text-blue-600">
              {item.brand}
            </p>

            {/* Price */}
            <div className="mb-6">
              {item.discount ? (
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-2xl font-medium text-gray-400 line-through">
                    AED {Number(item.price || 0).toLocaleString()}
                  </span>

                  <div className="inline-block rounded-lg bg-green-100 px-4 py-2 text-2xl font-bold text-green-700">
                    AED{" "}
                    {Math.round(
                      Number(item.price || 0) -
                        (Number(item.price || 0) *
                          Number(item.discount)) /
                          100
                    ).toLocaleString()}

                    <span className="ml-1 text-xs">
                      +5% VAT
                    </span>
                  </div>

                  <div className="rounded-full bg-[#1a2b6d] px-3 py-1 text-sm font-bold text-white">
                    {item.discount}% OFF
                  </div>
                </div>
              ) : (
                <div className="inline-block rounded-lg bg-green-100 px-4 py-2 text-lg font-bold text-green-700">
                  AED {Number(item.price || 0).toLocaleString()}
                  <span className="ml-1 text-xs">
                    +5% VAT
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-600">
              <p>{item.description?.paragraph1}</p>
              <p>{item.description?.paragraph2}</p>

              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                {item.description?.bullets?.map(
                  (point: string, i: number) => (
                    <li key={i}>{point}</li>
                  )
                )}
              </ul>
            </div>

            {/* Add to Cart and WhatsApp Enquiry */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={Boolean(item.outOfStock)}
                className="inline-flex items-center justify-center rounded-full bg-[#1a2b6d] px-7 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {item.outOfStock ? "Out of Stock" : "Add to Cart"}
              </button>

              <a
                href="https://api.whatsapp.com/send?phone=+971547400992"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#17416b] px-6 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
              >
                <FaWhatsapp size={20} />
                For Enquiry
              </a>
            </div>

            {/* Shop With Confidence */}
            <section className="mt-8 border-t border-gray-200 text-gray-700">
              <div className="mx-auto max-w-4xl px-6 py-5">
                <h2 className="mb-6 text-xl font-bold tracking-wide">
                  SHOP WITH CONFIDENCE
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-4xl">🚚</div>
                    <h3 className="text-lg font-bold">
                      Fast Delivery
                    </h3>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-4xl">🛡️</div>
                    <h3 className="text-lg font-bold">
                      Secure Payments
                    </h3>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-4xl">✓</div>
                    <h3 className="text-lg font-bold">
                      Trusted Quality
                    </h3>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mt-8">
          <ReviewsPage productSlug={product} />
        </div>
      </main>

    </div>
  );
}
