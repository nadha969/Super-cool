"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  Upload,
  PackagePlus,
  Info,
  Tag,
  Layers,
  ListChecks,
  X,
} from "lucide-react";

export default function AddProduct({ brands, categories, refresh }: any) {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    paragraph1: "",
    paragraph2: "",
    bullets: [""],
  });

  // 1. Changed state to an array to handle multiple files
  const [images, setImages] = useState<File[]>([]);

  const updateBullet = (index: number, value: string) => {
    const updated = [...product.bullets];
    updated[index] = value;
    setProduct({ ...product, bullets: updated });
  };

  const addBullet = () => {
    setProduct({
      ...product,
      bullets: [...product.bullets, ""],
    });
  };

  const removeBullet = (index: number) => {
    const updated = product.bullets.filter((_: any, i: number) => i !== index);
    setProduct({
      ...product,
      bullets: updated.length ? updated : [""],
    });
  };

  // Helper to handle multiple image selections
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  // Helper to remove an image from the selection queue
  const removeImage = (indexToRemove: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== indexToRemove));
  };

  const save = async () => {
    if (!product.name || !product.brand) {
      return toast.error("Please fill required fields");
    }

    setLoading(true);

    const slug = product.name.toLowerCase().trim().replaceAll(" ", "-");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("slug", slug);

    formData.append(
      "description",
      JSON.stringify({
        paragraph1: product.paragraph1,
        paragraph2: product.paragraph2,
        bullets: product.bullets.filter((item) => item.trim() !== ""),
      })
    );

    // 2. Loop through the array and append each image to FormData
    // Note: The backend should look for the array key, typically "images"
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        refresh();

        setProduct({
          name: "",
          brand: "",
          category: "",
          price: "",
          paragraph1: "",
          paragraph2: "",
          bullets: [""],
        });

        setImages([]); // Reset images array
        toast.success("Product Added Successfully!");
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-6 shadow border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PackagePlus className="w-6 h-6 text-blue-600" />
          Add New Product
        </h2>
      </div>

      <div className="p-8 space-y-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Product Name *
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Multiple Images Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Product Images
            </label>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              multiple // Added multiple attribute here
              onChange={handleImageChange}
            />

            <label
              htmlFor="file-upload"
              className="flex items-center justify-between w-full border border-dashed border-slate-300 p-3 rounded-lg cursor-pointer hover:bg-slate-50"
            >
              <span className="text-sm text-slate-500 truncate">
                {images.length > 0
                  ? `${images.length} image(s) selected`
                  : "Choose images"}
              </span>
              <Upload className="w-5 h-5 text-slate-400" />
            </label>

            {/* Render Image Previews/Chips */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium max-w-xs group"
                  >
                    <span className="truncate max-w-[140px]">{img.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Brand
            </label>

            <select
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
              className="w-full border border-slate-200 p-3 rounded-lg"
            >
              <option value="">Select Brand</option>
              {brands.map((b: any) => (
                <option key={b._id} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <Layers className="w-4 h-4" />
              Category
            </label>

            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="w-full border border-slate-200 p-3 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => (
                <option key={c._id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">
            ₹ Price
          </label>
          <input
            type="number"
            placeholder="Enter price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Paragraph 1 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <Info className="w-4 h-4" />
            Description Paragraph 1
          </label>
          <textarea
            value={product.paragraph1}
            onChange={(e) =>
              setProduct({ ...product, paragraph1: e.target.value })
            }
            className="w-full border border-slate-200 p-4 rounded-lg h-28 resize-none"
          />
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Description Paragraph 2
          </label>
          <textarea
            value={product.paragraph2}
            onChange={(e) =>
              setProduct({ ...product, paragraph2: e.target.value })
            }
            className="w-full border border-slate-200 p-4 rounded-lg h-28 resize-none"
          />
        </div>

        {/* Bullet Points */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <ListChecks className="w-4 h-4" />
            Bullet Points
          </label>

          {product.bullets.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder={`Bullet Point ${index + 1}`}
                value={item}
                onChange={(e) => updateBullet(index, e.target.value)}
                className="w-full border border-slate-200 p-3 rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeBullet(index)}
                className="px-4 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addBullet}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium"
          >
            + Add Bullet Point
          </button>
        </div>

        {/* Save */}
        <button
          onClick={save}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
            loading
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}