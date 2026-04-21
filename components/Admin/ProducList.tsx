"use client";

import { useState } from "react";
import {
  Trash2,
  Loader2,
  Package,
  X,
  Pencil,
  Save,
  Plus,
} from "lucide-react";

export default function ProductList({
  products,
  brands,
  categories,
}: any) {
  const [list, setList] = useState(products || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<any | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const openModal = (item: any) => {
    setSelected(JSON.parse(JSON.stringify(item)));
    setEditing(false);
  };

  const closeModal = () => {
    setSelected(null);
    setEditing(false);
  };

  const handleDelete = async (
    slug: string,
    name: string
  ) => {
    const confirmed = window.confirm(
      `Delete "${name}" ?`
    );
    if (!confirmed) return;

    try {
      setLoadingId(slug);

      const res = await fetch(
        `/api/products/${slug}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setList((prev: any) =>
          prev.filter(
            (item: any) => item.slug !== slug
          )
        );

        if (selected?.slug === slug) {
          closeModal();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await fetch(
        `/api/products/${selected.slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selected),
        }
      );

      if (res.ok) {
        setList((prev: any) =>
          prev.map((item: any) =>
            item.slug === selected.slug
              ? selected
              : item
          )
        );

        setEditing(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const updateBullet = (
    index: number,
    value: string
  ) => {
    const updated = [
      ...(selected.description?.bullets || []),
    ];

    updated[index] = value;

    setSelected({
      ...selected,
      description: {
        ...selected.description,
        bullets: updated,
      },
    });
  };

  const addBullet = () => {
    setSelected({
      ...selected,
      description: {
        ...selected.description,
        bullets: [
          ...(selected.description?.bullets ||
            []),
          "",
        ],
      },
    });
  };

  const removeBullet = (index: number) => {
    const updated = (
      selected.description?.bullets || []
    ).filter(
      (_: any, i: number) => i !== index
    );

    setSelected({
      ...selected,
      description: {
        ...selected.description,
        bullets: updated.length
          ? updated
          : [""],
      },
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b bg-gradient-to-r from-slate-50 to-white">
          {/* <h2 className="text-xl font-bold text-slate-800">
            Product Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            View, edit and manage products
          </p> */}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Brand
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {list.length > 0 ? (
                list.map((item: any) => (
                  <tr
                    key={item._id}
                    onClick={() =>
                      openModal(item)
                    }
                    className="hover:bg-blue-50/40 cursor-pointer transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                          <Package className="w-4 h-4" />
                        </div>

                        <span className="font-semibold text-slate-800">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {item.brand}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-700">
                     {item.price || "-"}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(
                            item.slug,
                            item.name
                          );
                        }}
                        disabled={
                          loadingId ===
                          item.slug
                        }
                        className="inline-flex items-center justify-center p-2 rounded-xl text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                      >
                        {loadingId ===
                        item.slug ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-400"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl max-h-[95vh] overflow-y-auto relative">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Product Details
                </h3>
                <p className="text-sm text-slate-500">
                  Manage product
                  information
                </p>
              </div>

              <div className="flex items-center gap-3">
                {!editing ? (
                  <button
                    onClick={() =>
                      setEditing(true)
                    }
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save
                  </button>
                )}

                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8">
              {/* Top Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Product Name">
                  <InputField
                    editing={editing}
                    value={selected.name}
                    onChange={(
                      v: string
                    ) =>
                      setSelected({
                        ...selected,
                        name: v,
                      })
                    }
                  />
                </Field>

                <Field label="Price">
                  <InputField
                    editing={editing}
                    value={selected.price}
                    onChange={(
                      v: string
                    ) =>
                      setSelected({
                        ...selected,
                        price: v,
                      })
                    }
                  />
                </Field>

                <Field label="Brand">
                  {editing ? (
                    <select
                      value={
                        selected.brand
                      }
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          brand:
                            e.target
                              .value,
                        })
                      }
                      className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {brands.map(
                        (b: any) => (
                          <option
                            key={b._id}
                            value={
                              b.slug
                            }
                          >
                            {b.name}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <ReadOnlyText
                      value={
                        selected.brand
                      }
                    />
                  )}
                </Field>

                <Field label="Category">
                  {editing ? (
                    <select
                      value={
                        selected.category
                      }
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          category:
                            e.target
                              .value,
                        })
                      }
                      className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(
                        (c: any) => (
                          <option
                            key={c._id}
                            value={
                              c.slug
                            }
                          >
                            {c.name}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <ReadOnlyText
                      value={
                        selected.category
                      }
                    />
                  )}
                </Field>
              </div>

              {/* Description */}
              <Field label="Description Paragraph 1">
                <TextAreaField
                  editing={editing}
                  value={
                    selected
                      .description
                      ?.paragraph1
                  }
                  onChange={(
                    v: string
                  ) =>
                    setSelected({
                      ...selected,
                      description:
                        {
                          ...selected.description,
                          paragraph1:
                            v,
                        },
                    })
                  }
                />
              </Field>

              <Field label="Description Paragraph 2">
                <TextAreaField
                  editing={editing}
                  value={
                    selected
                      .description
                      ?.paragraph2
                  }
                  onChange={(
                    v: string
                  ) =>
                    setSelected({
                      ...selected,
                      description:
                        {
                          ...selected.description,
                          paragraph2:
                            v,
                        },
                    })
                  }
                />
              </Field>

              {/* Bullet Points */}
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-3">
                  Bullet Points
                </label>

                <div className="space-y-3">
                  {(
                    selected
                      .description
                      ?.bullets || []
                  ).map(
                    (
                      bullet: string,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="flex gap-2"
                      >
                        {editing ? (
                          <>
                            <input
                              type="text"
                              value={
                                bullet
                              }
                              onChange={(
                                e
                              ) =>
                                updateBullet(
                                  index,
                                  e
                                    .target
                                    .value
                                )
                              }
                              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                              onClick={() =>
                                removeBullet(
                                  index
                                )
                              }
                              className="px-4 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <div className="w-full p-3 rounded-xl bg-slate-50 text-slate-700">
                            • {bullet}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </div>

                {editing && (
                  <button
                    onClick={addBullet}
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Bullet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Components */

function Field({
  label,
  children,
}: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function InputField({
  editing,
  value,
  onChange,
}: any) {
  return editing ? (
    <input
      type="text"
      value={value || ""}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
    />
  ) : (
    <ReadOnlyText value={value} />
  );
}

function TextAreaField({
  editing,
  value,
  onChange,
}: any) {
  return editing ? (
    <textarea
      value={value || ""}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="w-full border border-slate-200 p-3 rounded-xl h-32 resize-none outline-none focus:ring-2 focus:ring-blue-500"
    />
  ) : (
    <div className="p-3 rounded-xl bg-slate-50 text-slate-700 whitespace-pre-line">
      {value || "-"}
    </div>
  );
}

function ReadOnlyText({
  value,
}: any) {
  return (
    <div className="p-3 rounded-xl bg-slate-50 text-slate-700">
      {value || "-"}
    </div>
  );
}