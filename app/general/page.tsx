import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import BlogCard from "@/components/Home/Insight";
import OGeneral from "@/components/Carrier/o-general";
export default function GeneralPage(){
    return(
        <div className="min-h-screen flex flex-col">
            <Header/>
             <main className="pt-30 flex-1">
          <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
       O General Air Conditioners Collection 
          </h1>
        </main>
         <OGeneral/>
        <BlogCard/>
            <Footer/>   
            </div>
    )
}