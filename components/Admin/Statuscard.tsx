export default function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}