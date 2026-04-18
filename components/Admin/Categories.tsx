"use client";

import { useEffect, useState } from "react";
import { FolderPlus, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";


export default function Categories({ refresh }: any) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [deleting, setDeleting] = useState("");

  // Load Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        cache: "no-store",
      });

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
fetchCategories();
refresh?.();  }, []);

  // Add Category
  const save = async () => {
    if (!name.trim()) {
      return toast.warning("Enter category name");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/categories", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setName("");
        setImage(null);
        setPreview("");
        fetchCategories();
        toast.success("Category Added ✅");
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete Category
  const deleteCategory = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    setDeleting(id);

    try {
      const res = await fetch(
        `/api/categories?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchCategories();
        refresh?.();
        toast.success("Deleted ✅");
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting("");
    }
  };

  const handleImage = (file: File | null) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-8">
      {/* Add Category */}
      <div className="bg-white p-6 rounded-2xl  shadow-sm max-w-xl space-y-4">
        <div className="flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold">
            Add Category
          </h2>
        </div>

        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleImage(
              e.target.files?.[0] || null
            )
          }
          className="w-full border p-3 rounded-xl"
        />

        {preview && (
          <div className="relative w-full h-48 border rounded-xl overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        )}

        <button
          onClick={save}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-xl w-full"
        >
          {loading
            ? "Saving..."
            : "Add Category"}
        </button>
      </div>

      {/* Display Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          All Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((item) => (
            <div
              key={item._id}
              className="shadow p-4 bg-white shadow-sm"
            >
              <div className="relative w-full h-40 bg-gray-100  overflow-hidden">
          <Image
            src={
              item.image
                ? item.image.startsWith("/")
                  ? item.image
                  : `/categories/${item.image}`
                : "/placeholder.jpg"
            }
            alt={item.name}
            fill
            className="w-100 h-50"/></div>

           <div className="flex items-center justify-between mt-3">
  <h3 className="font-semibold text-lg text-gray-800 truncate">
    {item.name}
  </h3>

  <button
    onClick={() => deleteCategory(item._id)}
    disabled={deleting === item._id}
    className=" text-red-500 p-2 rounded-lg flex items-center justify-center cursor-pointer"
  >
    <Trash2 className="w-4 h-4" />
  </button>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}