import Collection from "@/components/Home/Collection";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Image from "next/image";
import Brands from "@/components/Home/Brands";
import Model from "@/components/Home/Model";
import BlogCard from "@/components/Home/Insight";
export default function Home() {
  return (
  <div>
    <Header/>
    <div className="mt-20">
       <Image
          src="/logo/homeimage.jpeg"
          alt="Wall Split Banner"
          width={400}
          height={200}
          unoptimized
          className="w-full " />
    </div>
    <Collection/>
    <Brands/>
    <Model/>
    <BlogCard/>
    <Footer/>
  </div>
  );
}