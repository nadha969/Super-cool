"use client";

import { useState } from "react";

export default function Categories({ refresh }: any) {
  const [name, setName] = useState("");

  const save = async () => {
    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        slug: name.toLowerCase().replaceAll(" ", "-"),
        image: "",
      }),
    });

    setName("");
    refresh();
    alert("Category Added");
  };

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm max-w-xl">
      <input
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-3 rounded-xl mb-4"
      />

      <button
        onClick={save}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Add Category
      </button>
    </div>
  );
}