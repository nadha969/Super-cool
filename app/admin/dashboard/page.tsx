"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Tag, 
  Package, 
  LogOut, 
  Layers 
} from "lucide-react"; 

export default function Dashboard() {
  const router = useRouter();
  
  // UI State
  const [activeTab, setActiveTab] = useState("overview");

  // Data State
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

  // ---------------- AUTH & LOAD ----------------
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadProducts();
    loadBrands();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  const loadBrands = async () => {
    const res = await fetch("/api/brands");
    const data = await res.json();
    setBrands(Array.isArray(data) ? data : data.brands || []);
  };

  const loadCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(Array.isArray(data) ? data : data.categories || []);
  };

  // ---------------- ACTIONS ----------------
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/admin/login");
  };

  const addCategory = async () => {
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: category,
        slug: category.toLowerCase().replaceAll(" ", "-"),
        image: "",
      }),
    });
    setCategory("");
    loadCategories();
    alert("Category Added");
  };

  const addProduct = async () => {
    const slug = product.name.toLowerCase().replaceAll(" ", "-");
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, slug, specs: [], featured: false }),
    });
    setProduct({ name: "", brand: "", category: "", image: "", description: "" });
    loadProducts();
    alert("Product Added");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">AdminPanel</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={20}/>} 
            label="Overview" 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <SidebarItem 
            icon={<Package size={20}/>} 
            label="Products" 
            active={activeTab === "products"} 
            onClick={() => setActiveTab("products")} 
          />
          <SidebarItem 
            icon={<Layers size={20}/>} 
            label="Categories" 
            active={activeTab === "categories"} 
            onClick={() => setActiveTab("categories")} 
          />
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
          <p className="text-gray-500">Manage your store inventory and settings.</p>
        </header>

        {/* CONDITIONAL RENDERING BASED ON TAB */}
        <div className="max-w-5xl">
          {activeTab === "overview" && (
            <div className="grid grid-cols-3 gap-6">
              <StatCard title="Total Products" value={products.length} color="bg-blue-500" />
              <StatCard title="Categories" value={categories.length} color="bg-purple-500" />
              <StatCard title="Brands" value={brands.length} color="bg-orange-500" />
            </div>
          )}

          {activeTab === "categories" && (
             <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                <div className="flex gap-4">
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category Name"
                    className="flex-1 border p-3 rounded-xl focus:ring-2 ring-blue-100 outline-none"
                  />
                  <button onClick={addCategory} className="bg-black text-white px-6 py-3 rounded-xl">
                    Add
                  </button>
                </div>
             </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Product Form */}
              <div className="bg-white border rounded-2xl p-6 shadow-sm grid grid-cols-2 gap-4">
                <input
                  value={product.name}
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                  placeholder="Product Name"
                  className="col-span-2 border p-3 rounded-xl"
                />
                <select 
                  className="border p-3 rounded-xl"
                  onChange={(e) => setProduct({...product, brand: e.target.value})}
                >
                  <option value="">Select Brand</option>
                  {brands.map(b => <option key={b._id} value={b.slug}>{b.name}</option>)}
                </select>
                <select 
                  className="border p-3 rounded-xl"
                  onChange={(e) => setProduct({...product, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c._id} value={c.slug}>{c.name}</option>)}
                </select>
                <button onClick={addProduct} className="col-span-2 bg-blue-600 text-white p-3 rounded-xl">
                  Save Product
                </button>
              </div>

              {/* Product List */}
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr key={item._id} className="border-b last:border-0">
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4 text-gray-600">{item.brand}</td>
                        <td className="p-4 text-gray-600">{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

function SidebarItem({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
        active 
          ? "bg-blue-50 text-blue-600 font-semibold" 
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h4 className="text-2xl font-bold mt-2">{value}</h4>
      <div className={`h-1 w-12 mt-4 rounded-full ${color}`} />
    </div>
  );
}