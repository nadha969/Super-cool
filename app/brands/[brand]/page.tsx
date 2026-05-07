import Carrier from "@/components/Carrier/carrier";
import Daikin from "@/components/Carrier/daikin";
import TCLCollection from "@/components/Carrier/diakool";
import Midea from "@/components/Carrier/midea";
import OGeneral from "@/components/Carrier/o-general";
import Supergeneral from "@/components/Carrier/supergeneral";

export default async function BrandPage({ params }: any) {
  const { brand } = await params;

  if (brand === "carrier") {
    return <Carrier />;
  }

  if (brand === "midea") {
    return <Midea />;
  }
   if (brand === "daikin") {
    return <Daikin />;
  }

    if (brand === "o-general") {
    return <OGeneral />;
  }
    
   if (brand === "tcl") {
    return <TCLCollection />;
  }

   if (brand === "supergeneral") {
    return <Supergeneral />;
  }

  return <div>Brand not found</div>;
}