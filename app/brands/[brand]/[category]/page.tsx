import Carriercategory from "@/components/category/carriercategory";

export default async function Page({ params }: any) {
  const { brand, category } = await params;

  return <Carriercategory brand={brand} category={category} />;
}