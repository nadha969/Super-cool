import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Daikin from "@/components/Carrier/daikin";

export default function DaikinPage(){
    return(
      <div className="min-h-screen flex flex-col">
        <Header />
      
        <main className="pt-30 flex-1">
          <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
            Daikin Air Conditioners Collection
          </h1>
        </main>
          <Daikin/>
        <Footer />
      </div>
    )
}