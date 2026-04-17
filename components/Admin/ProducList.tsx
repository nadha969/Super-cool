"use client";

import { useState } from "react";
import { Trash2, Loader2, Package } from "lucide-react";

export default function ProductList({ products }: any) {
  const [list, setList] = useState(products);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (slug: string, name: string) => {
    // Basic confirmation dialog
    const confirmed = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmed) return;

    try {
      setLoadingId(slug);

      const res = await fetch(`/api/products/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setList((prev: any) =>
          prev.filter((item: any) => item.slug !== slug)
        );
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Brand</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {list.length > 0 ? (
              list.map((item: any) => (
                <tr key={item._id} className="group hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Package size={18} />
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.brand}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(item.slug, item.name)}
                      disabled={loadingId === item.slug}
                      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                      title="Delete Product"
                    >
                      {loadingId === item.slug ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}