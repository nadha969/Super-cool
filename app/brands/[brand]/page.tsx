import Carrier from "@/components/Carrier/carrier";
import Daikin from "@/components/Carrier/daikin";
import TCLCollection from "@/components/Carrier/diakool";
import Gree from "@/components/Carrier/gree";
import Hisense from "@/components/Carrier/hisense";
import Hitachi from "@/components/Carrier/hitachi";
import LG from "@/components/Carrier/lg";
import Midea from "@/components/Carrier/midea";
import Mitsubishi from "@/components/Carrier/mitsubishi";
import OGeneral from "@/components/Carrier/o-general";
import Supergeneral from "@/components/Carrier/supergeneral";
import Trane from "@/components/Carrier/trane";

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
   if (brand === "lg") {
    return <LG />;
   }
   if(brand==="hisense"){
    return<Hisense/>
   }
   if(brand==="hitachi"){
    return<Hitachi/>
   }
   if(brand==="trane"){
    return<Trane/>
   }
   if(brand==="gree"){
     return<Gree/>
   }
    if(brand==="mitsubishi"){
     return<Mitsubishi/>
   }
  return <div>Brand not found</div>;
}