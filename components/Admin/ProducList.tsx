export default function ProductList({ products }: any) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Brand</th>
            <th className="p-4 text-left">Category</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item: any) => (
            <tr key={item._id} className="border-b">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.brand}</td>
              <td className="p-4">{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}