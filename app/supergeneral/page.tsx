import Header from "@/components/Layout/Header";
import BlogCard from "@/components/Home/Insight";
import Footer from "@/components/Layout/Footer";
import Supergeneral from "@/components/Carrier/supergeneral";
export default function SuperGeneralPage() {
    return (
          <div className="min-h-screen flex flex-col">
                   <Header/>
                    <main className="pt-30 flex-1">
                 <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
                 Super General Air Conditioners Collection 
                 </h1>
               </main>
               <Supergeneral/>
\               <BlogCard/>
                   <Footer/>
       
               </div>
    )
}   