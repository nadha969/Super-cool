import Carrier from "@/components/Carrier/carrier";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default function CarrierPage(){
    return(
 <div className="min-h-screen flex flex-col">
  <Header />

  <main className="pt-30 flex-1">
    <h1 className="text-center text-3xl font-semibold bg-gray-100 py-10">
      Carrier Air Conditioners Collection
    </h1>
  </main>
    <Carrier/>
  <Footer />
</div>
    )
}