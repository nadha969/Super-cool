import StatCard from "./Statuscard";

export default function Overview({
  products,
  brands,
  categories,
}: any) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard title="Products" value={products.length} />
      <StatCard title="Brands" value={brands.length} />
      <StatCard title="Categories" value={categories.length} />
    </div>
  );
}