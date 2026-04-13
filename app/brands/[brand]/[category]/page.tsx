import CarrierCategory from "@/components/category/carriercategory";

export default async function Page({
  params,
}: {
  params: Promise<{
    brand: string;
    category: string;
  }>;
}) {
  const { brand, category } = await params;

  return (
    <CarrierCategory
      brand={brand}
      category={category}
    />
  );
}