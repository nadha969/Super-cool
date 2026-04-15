"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Upload, PackagePlus, Info, Tag, Layers } from "lucide-react"; // Optional: Install lucide-react

export default function AddProduct({ brands, categories, refresh }: any) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const save = async () => {
    if (!product.name || !product.brand) return toast.error("Please fill required fields");
    
    setLoading(true);
    const slug = product.name.toLowerCase().trim().replaceAll(" ", "-");

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value));
    formData.append("slug", slug);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        refresh();
        setProduct({ name: "", brand: "", category: "", description: "" });
        setImage(null);
        toast.success("Product Added Successfully!");
      }
    } catch (error) {
      console.error("Save failed", error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden ">
      {/* Header */}
      <div className="bg-slate-50 p-6 shadow border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PackagePlus className="w-6 h-6 text-blue-600" />
          Add New Product
        </h2>
      </div>

      <div className="p-8 space-y-6">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full border border-slate-200 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Product Image</label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              <label 
                htmlFor="file-upload"
                className="flex items-center justify-between w-full border border-dashed border-slate-300 p-3 rounded-lg cursor-pointer hover:bg-slate-50 transition"
              >
                <span className="text-sm text-slate-500 truncate">
                  {image ? image.name : "Choose an image..."}
                </span>
                <Upload className="w-5 h-5 text-slate-400" />
              </label>
            </div>
          </div>

          {/* Brand Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <Tag className="w-4 h-4" /> Brand
            </label>
            <select
              value={product.brand}
              onChange={(e) => setProduct({ ...product, brand: e.target.value })}
              className="w-full border border-slate-200 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Brand</option>
              {brands.map((b: any) => (
                <option key={b._id} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              <Layers className="w-4 h-4" /> Category
            </label>
            <select
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              className="w-full border border-slate-200 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => (
                <option key={c._id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
            <Info className="w-4 h-4" /> Description
          </label>
          <textarea
            placeholder="Describe the product features and benefits..."
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="w-full border border-slate-200 p-4 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={save}
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
            loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200"
          }`}
        >
          {loading ? "Processing..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}