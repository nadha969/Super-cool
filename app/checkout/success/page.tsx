import { Suspense } from "react";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p>Loading order details...</p>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}