"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Admin/Sidebar";
import Header from "@/components/Admin/Header";
import Overview from "@/components/Admin/Overview";
import ProductList from "@/components/Admin/ProducList";
import AddProduct from "@/components/Admin/Addproduct";
import Categories from "@/components/Admin/Categories";
import Brands from "@/components/Admin/Brands";

export default function DashboardPage() {
  const router = useRouter();

  const [tab, setTab] = useState("overview");

 const [products, setProducts] = useState<any[]>([]);
const [brands, setBrands] = useState<any[]>([]);
const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    const p = await fetch("/api/products").then(res => res.json());
    const b = await fetch("/api/brands").then(res => res.json());
    const c = await fetch("/api/categories").then(res => res.json());

    setProducts(Array.isArray(p) ? p : []);
    setBrands(Array.isArray(b) ? b : b.brands || []);
    setCategories(Array.isArray(c) ? c : c.categories || []);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar tab={tab} setTab={setTab} logout={logout} />

      <main className="flex-1 p-8">
        <Header title={tab} />

        {tab === "overview" && (
          <Overview
            products={products}
            brands={brands}
            categories={categories}
          />
        )}

       {tab === "products" && (
  <ProductList
    products={products}
    brands={brands}
    categories={categories}
  />
)}

        {tab === "add-product" && (
          <AddProduct
            brands={brands}
            categories={categories}
            refresh={loadData}
          />
        )}

        {tab === "categories" && (
          <Categories refresh={loadData} />
        )}
        {tab === "brands" && (
  <Brands refresh={loadData} />
)}
      </main>
    </div>
  );
}