import Midea from "@/components/Carrier/midea";
import BlogCard from "@/components/Home/Insight";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default function MideaPage(){
    return(
        <div className="min-h-screen flex flex-col">
            <Header/>
             <main className="pt-30 flex-1">
          <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
          Midea Air Conditioners Collection 
          </h1>
        </main>
        <Midea/>
        <BlogCard/>
            <Footer/>

        </div>
    )
}