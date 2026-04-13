"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    description: "",
  });

  // ---------------- LOAD DATA ----------------
  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();

    setProducts(Array.isArray(data) ? data : []);
  };

  const loadBrands = async () => {
    const res = await fetch("/api/brands");
    const data = await res.json();

    setBrands(
      Array.isArray(data)
        ? data
        : Array.isArray(data.brands)
        ? data.brands
        : []
    );
  };

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();

    setCategories(
      Array.isArray(data)
        ? data
        : Array.isArray(data.categories)
        ? data.categories
        : []
    );
  };

  useEffect(() => {
    loadProducts();
    loadBrands();
    loadCategories();
  }, []);

  // ---------------- ADD CATEGORY ----------------
  const addCategory = async () => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: category,
        slug: category.toLowerCase().replaceAll(" ", "-"),
        image: "",
      }),
    });

    const data = await res.json();
    alert(data.message || "Category Added");

    setCategory("");
    loadCategories();
  };

  // ---------------- ADD BRAND ----------------
  const addBrand = async () => {
    const res = await fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: brand,
        slug: brand.toLowerCase().replaceAll(" ", "-"),
        logo: "",
      }),
    });

    const data = await res.json();
    alert(data.message || "Brand Added");

    setBrand("");
    loadBrands();
  };

  // ---------------- ADD PRODUCT ----------------
  const addProduct = async () => {
    const slug = product.name.toLowerCase().replaceAll(" ", "-");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
        slug,
        specs: [],
        featured: false,
      }),
    });

    const data = await res.json();
    alert(data.message || "Product Added");

    setProduct({
      name: "",
      brand: "",
      category: "",
      image: "",
      description: "",
    });

    loadProducts();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      {/* ADD CATEGORY */}
      <div className="border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Add Category
        </h2>

        <input
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="Category Name"
          className="border p-3 rounded-xl w-full"
        />

        <button
          onClick={addCategory}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Add Category
        </button>
      </div>

      {/* ADD BRAND */}
      <div className="border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Add Brand
        </h2>

        <input
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          placeholder="Brand Name"
          className="border p-3 rounded-xl w-full"
        />

        <button
          onClick={addBrand}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Add Brand
        </button>
      </div>

      {/* ADD PRODUCT */}
      <div className="border rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Add Product
        </h2>

        <input
          value={product.name}
          onChange={(e) =>
            setProduct({
              ...product,
              name: e.target.value,
            })
          }
          placeholder="Product Name"
          className="border p-3 rounded-xl w-full"
        />

        {/* BRAND DROPDOWN */}
        <select
          value={product.brand}
          onChange={(e) =>
            setProduct({
              ...product,
              brand: e.target.value,
            })
          }
          className="border p-3 rounded-xl w-full"
        >
          <option value="">
            Select Brand
          </option>

          {brands.map((item: any) => (
            <option
              key={item._id}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* CATEGORY DROPDOWN */}
        <select
          value={product.category}
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
          className="border p-3 rounded-xl w-full"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((item: any) => (
            <option
              key={item._id}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          value={product.image}
          onChange={(e) =>
            setProduct({
              ...product,
              image: e.target.value,
            })
          }
          placeholder="Image URL"
          className="border p-3 rounded-xl w-full"
        />

        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
          placeholder="Description"
          className="border p-3 rounded-xl w-full"
        />

        <button
          onClick={addProduct}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Add Product
        </button>
      </div>

      {/* ALL PRODUCTS */}
      <div className="border rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          All Products
        </h2>

        <div className="grid gap-4">
          {products.map((item: any) => (
            <div
              key={item._id}
              className="border rounded-xl p-4"
            >
              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.brand} | {item.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}