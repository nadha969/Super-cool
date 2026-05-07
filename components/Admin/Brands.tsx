"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Brands({ refresh }: any) {
  const [brands, setBrands] = useState<any[]>([]);
  const [name, setName] = useState("");

  const loadBrands = async () => {
    const res = await fetch("/api/brands");
    const data = await res.json();

    setBrands(data);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const addBrand = async () => {
    const res = await fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      toast.success("Brand Added");

      setName("");

      loadBrands();

      refresh();
    }
  };

  const deleteBrand = async (id: string) => {
    const res = await fetch(`/api/brands?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Brand Deleted");

      loadBrands();

      refresh();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-5">
        Brands
      </h2>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Brand Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <button
          onClick={addBrand}
          className="bg-black text-white px-5 rounded-lg"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="flex justify-between border p-3 rounded-lg"
          >
            <p>{brand.name}</p>

            <button
              onClick={() => deleteBrand(brand._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}