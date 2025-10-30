import type { Metadata } from "next";
import CartPage from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Your Cart | Popy Library",
  description: "Review the items in your Popy Library cart and proceed to checkout securely.",
};

const Cart = () => {
  return <CartPage />;
};

export default Cart;