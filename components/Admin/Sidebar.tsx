import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Layers,
  LogOut,
  Tag
} from "lucide-react";

export default function Sidebar({ tab, setTab, logout }: any) {
  const menu = [
    { name: "overview", icon: <LayoutDashboard size={18} /> },
    { name: "products", icon: <Package size={18} /> },
    { name: "add-product", icon: <PlusCircle size={18} /> },
    { name: "categories", icon: <Layers size={18} /> },
    // { name: "brands", icon: <Tag size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl border-r p-5">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Admin Panel
      </h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.name}
            onClick={() => setTab(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl capitalize transition ${
              tab === item.name
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.icon}
            {item.name.replace("-", " ")}
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}