import type { Metadata } from "next";
import CheckoutPage from "@/components/checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout | Popy Library",
  description: "Complete your purchase securely through Popy Library checkout.",
};

const Checkout = () => {
  return <CheckoutPage />;
};

export default Checkout;
