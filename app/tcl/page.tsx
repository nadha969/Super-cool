import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import DiakoolCollection from "@/components/Carrier/diakool";
export default function DiakoolPge(){
    return(
         <div className="min-h-screen flex flex-col">
                    <Header/>
                     <main className="pt-30 flex-1">
                  <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
                 Diakool 
                  </h1>
                </main>
                <DiakoolCollection/>
                    <Footer/>
        
                </div>
    )
}   