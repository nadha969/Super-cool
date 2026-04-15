export default function Header({ title }: any) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold capitalize">
        {title.replace("-", " ")}
      </h2>
      <p className="text-gray-500 mt-1">
        Manage your store professionally
      </p>
    </div>
  );
}