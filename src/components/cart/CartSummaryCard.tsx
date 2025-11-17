import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/redux/feature/cart/cartSlice";
import Link from "next/link";

interface CartSummaryCardProps {
  items: CartItem[];
}

const CartSummaryCard = ({ items }: CartSummaryCardProps) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <Card className="border-border/60 bg-background/80 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Order summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">৳{subtotal}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-base font-semibold text-foreground">
          <span>Total</span>
          <span>৳{total}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" disabled={items.length === 0}>
          <Link className="w-full" href="/checkout">
            Proceed to checkout
          </Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Secure payment powered by SSL Commerz. Estimated delivery within 2-3
          business days.
        </p>
      </CardFooter>
    </Card>
  );
};

export default CartSummaryCard;
