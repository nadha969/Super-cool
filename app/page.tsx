import Collection from "@/components/Home/Collection";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import Brands from "@/components/Home/Brands";
import Model from "@/components/Home/Model";
export default function Home() {
  return (
  <div>
    <Header/>
    <div className="mt-20">
       <Image
          src="https://shop.supercooluae.com/cdn/shop/files/Wall_Split_Banner_0e2238e5-55af-497a-b4f0-38dceb5275ae.webp?v=1750079193&width=3840"
          alt="Wall Split Banner"
          width={1920}
          height={600}
          className="w-full h-auto" />
    </div>
    <Collection/>
    <Brands/>
    <Model/>
    <Footer/>
  </div>
  );
}